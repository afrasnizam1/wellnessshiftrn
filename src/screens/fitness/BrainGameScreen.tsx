// src/screens/fitness/BrainGameScreen.tsx — multi-game hub + fully playable games
import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, TextInput,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../theme';
import AppScreen from '../../components/common/AppScreen';
import { useAppStore } from '../../store';
import { gamificationService } from '../../services/gamificationService';
import {
  type BrainGameId,
  BRAIN_GAMES,
  COLOR_WORDS,
  MENTAL_ROTATION_SHAPES,
  type MathDifficulty,
  type WordListTier,
  averageReactionScore,
  estimateWpm,
  generateAttentionPrompt,
  generateMathQuestion,
  generateNumberSequence,
  pickMemoryDeck,
  pickReadingSession,
  pickWordList,
  reactionFeedback,
  shuffle,
} from '../../data/brainGameContent';

type GameId = BrainGameId;
const GAMES = BRAIN_GAMES;

// ─── Memory Match ─────────────────────────────────────────────────────────────
function MemoryMatch({ onScore }: { onScore: (s: number) => void }) {
  const [sel, setSel] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matched, setMatched] = useState(0);
  const [locked, setLocked] = useState(false);
  const [done, setDone] = useState(false);
  const [deck] = useState(() => pickMemoryDeck());
  const pairCount = deck.pairs.length;

  const initCards = useCallback(() =>
    shuffle([...deck.pairs, ...deck.pairs].map((e, i) => ({ id: i, emoji: e, flipped: false, matched: false }))),
  [deck]);

  const [cards, setCards] = useState(initCards);

  const reset = () => {
    setCards(initCards());
    setSel([]); setMoves(0); setMatched(0); setLocked(false); setDone(false);
  };

  const flip = (idx: number) => {
    if (locked || cards[idx].flipped || cards[idx].matched) return;
    const nc = cards.map((c, i) => i === idx ? { ...c, flipped: true } : c);
    const ns = [...sel, idx];
    setCards(nc); setSel(ns);
    if (ns.length === 2) {
      setLocked(true); setMoves(m => m + 1);
      if (nc[ns[0]].emoji === nc[ns[1]].emoji) {
        setTimeout(() => {
          const mc = nc.map((c, i) => (i === ns[0] || i === ns[1]) ? { ...c, matched: true } : c);
          setCards(mc); setSel([]); setLocked(false);
          const nm = matched + 1;
          setMatched(nm);
          if (nm === pairCount) { setDone(true); onScore(Math.max(100, 600 - moves * 8)); }
        }, 300);
      } else {
        setTimeout(() => {
          setCards(nc.map((c, i) => (i === ns[0] || i === ns[1]) ? { ...c, flipped: false } : c));
          setSel([]); setLocked(false);
        }, 700);
      }
    }
  };

  return (
    <View style={styles.gameWrap}>
      <Text style={styles.gameStat}>{deck.name} deck · Moves: {moves} · Matched: {matched}/{pairCount}</Text>
      <View style={styles.memGrid}>
        {cards.map((c, i) => (
          <TouchableOpacity key={c.id} style={[styles.memCard, c.matched && styles.memCardDone, c.flipped && styles.memCardFlipped]} onPress={() => flip(i)}>
            <Text style={styles.memCardText}>{c.flipped || c.matched ? c.emoji : '❓'}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {done && (
        <>
          <Text style={styles.doneMsg}>🏆 Complete! Moves: {moves}</Text>
          <TouchableOpacity style={styles.mathBtn} onPress={reset}><Text style={styles.mathBtnText}>New deck</Text></TouchableOpacity>
        </>
      )}
    </View>
  );
}

// ─── Reaction Time ────────────────────────────────────────────────────────────
const REACTION_TRIALS = 5;

function ReactionTime({ onScore }: { onScore: (s: number) => void }) {
  const [phase, setPhase] = useState<'wait' | 'ready' | 'go' | 'result' | 'summary'>('wait');
  const [ms, setMs] = useState(0);
  const [trial, setTrial] = useState(0);
  const [times, setTimes] = useState<number[]>([]);
  const t1 = useRef<ReturnType<typeof setTimeout> | null>(null);
  const t2 = useRef<number>(0);

  const start = () => {
    setPhase('ready');
    setTrial(0);
    setTimes([]);
    const delay = 1500 + Math.random() * 3000;
    t1.current = setTimeout(() => { setPhase('go'); t2.current = Date.now(); }, delay);
  };

  const startNextTrial = () => {
    setPhase('ready');
    const delay = 1200 + Math.random() * 2800;
    t1.current = setTimeout(() => { setPhase('go'); t2.current = Date.now(); }, delay);
  };

  const tap = () => {
    if (phase === 'ready') { if (t1.current) clearTimeout(t1.current); setPhase('wait'); return; }
    if (phase === 'go') {
      const rt = Date.now() - t2.current;
      setMs(rt);
      const nextTimes = [...times, rt];
      setTimes(nextTimes);
      const nextTrial = trial + 1;
      setTrial(nextTrial);
      if (nextTrial >= REACTION_TRIALS) {
        setPhase('summary');
        onScore(averageReactionScore(nextTimes));
      } else {
        setPhase('result');
      }
    }
  };

  const feedback = reactionFeedback(ms);
  const BG = phase === 'go' ? '#27AE60' : phase === 'ready' ? '#E74C3C' : Colors.surface;

  if (phase === 'summary' && times.length > 0) {
    const avg = Math.round(times.reduce((a, b) => a + b, 0) / times.length);
    const best = Math.min(...times);
    const summary = reactionFeedback(avg);
    return (
      <View style={styles.gameWrap}>
        <Text style={styles.doneMsg}>⚡ Session complete</Text>
        <Text style={styles.gameStat}>Average: {avg}ms · Best: {best}ms</Text>
        <Text style={styles.benefitText}>{summary.label} — {summary.tip}</Text>
        <TouchableOpacity style={styles.mathBtn} onPress={start}><Text style={styles.mathBtnText}>Play again</Text></TouchableOpacity>
      </View>
    );
  }

  return (
    <TouchableOpacity style={[styles.reactionBox, { backgroundColor: BG }]} onPress={phase === 'wait' ? start : phase === 'result' ? startNextTrial : tap} activeOpacity={0.9}>
      <Text style={styles.reactionEmoji}>{phase === 'go' ? '⚡' : phase === 'ready' ? '⏳' : '👆'}</Text>
      <Text style={styles.reactionLabel}>
        {phase === 'wait' ? 'Tap to start · 5 trials' : phase === 'ready' ? `Trial ${trial + 1}/${REACTION_TRIALS} — wait for green…` : phase === 'go' ? 'TAP NOW!' : `${ms}ms — ${feedback.label}`}
      </Text>
      {phase === 'result' && <Text style={styles.gameStat}>{feedback.tip}</Text>}
      {phase === 'result' && <TouchableOpacity style={styles.retryBtn} onPress={startNextTrial}><Text style={styles.retryBtnText}>Next trial →</Text></TouchableOpacity>}
    </TouchableOpacity>
  );
}

// ─── Quick Math ───────────────────────────────────────────────────────────────
function QuickMath({ onScore }: { onScore: (s: number) => void }) {
  const [difficulty, setDifficulty] = useState<MathDifficulty>('medium');
  const genQ = () => generateMathQuestion(difficulty);
  const [q, setQ] = useState(genQ);
  const [input, setInput] = useState('');
  const [streak, setStreak] = useState(0);
  const [best, setBest] = useState(0);
  const [feedback, setFeedback] = useState('');

  const check = () => {
    const correct = parseInt(input, 10) === q.ans;
    setFeedback(correct ? '✓ Correct!' : `✗ Answer was ${q.ans}`);
    if (correct) {
      const ns = streak + 1;
      setStreak(ns);
      setBest((b) => Math.max(b, ns));
      onScore(10 * ns);
    } else setStreak(0);
    setTimeout(() => { setQ(genQ()); setInput(''); setFeedback(''); }, 900);
  };

  return (
    <View style={styles.gameWrap}>
      <View style={styles.tierRow}>
        {(['easy', 'medium', 'hard'] as MathDifficulty[]).map((d) => (
          <TouchableOpacity key={d} style={[styles.tierChip, difficulty === d && styles.tierChipOn]} onPress={() => { setDifficulty(d); setQ(generateMathQuestion(d)); setStreak(0); }}>
            <Text style={[styles.tierChipText, difficulty === d && styles.tierChipTextOn]}>{d}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.gameStat}>Streak: {streak} · Best: {best}</Text>
      <Text style={styles.mathQ}>{q.q} = ?</Text>
      {feedback ? <Text style={[styles.mathFeedback, { color: feedback.startsWith('✓') ? Colors.success : Colors.error }]}>{feedback}</Text> : null}
      <TextInput
        style={styles.mathInput}
        value={input}
        onChangeText={setInput}
        keyboardType="numbers-and-punctuation"
        placeholder="Your answer"
        placeholderTextColor={Colors.textTertiary}
        returnKeyType="done"
        onSubmitEditing={check}
      />
      <TouchableOpacity style={[styles.mathBtn, !input && { opacity: 0.4 }]} onPress={check} disabled={!input}>
        <Text style={styles.mathBtnText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

// ─── Color Match ──────────────────────────────────────────────────────────────
function ColorMatch({ onScore }: { onScore: (s: number) => void }) {
  const gen = () => {
    const w = COLOR_WORDS[Math.floor(Math.random() * COLOR_WORDS.length)];
    const c = COLOR_WORDS[Math.floor(Math.random() * COLOR_WORDS.length)];
    return { word: w.word, displayColor: c.color, correct: w.color === c.color };
  };
  const [item, setItem] = useState(gen);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [feedback, setFeedback] = useState('');
  const maxRounds = 12;

  const answer = (yes: boolean) => {
    const right = yes === item.correct;
    setFeedback(right ? '✓' : '✗');
    if (right) { setScore(s => s + 1); onScore(10); }
    const nr = round + 1;
    setRound(nr);
    if (nr >= maxRounds) return;
    setTimeout(() => { setItem(gen()); setFeedback(''); }, 600);
  };

  if (round >= maxRounds) {
    return (
      <View style={styles.gameWrap}>
        <Text style={styles.doneMsg}>🎨 {score}/{maxRounds} correct</Text>
        <Text style={styles.benefitText}>{score >= 10 ? 'Strong inhibition — Stroop mastered!' : 'Focus on ink colour only, ignore the word'}</Text>
        <TouchableOpacity style={styles.mathBtn} onPress={() => { setRound(0); setScore(0); setItem(gen()); setFeedback(''); }}>
          <Text style={styles.mathBtnText}>Play again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.gameWrap}>
      <Text style={styles.gameStat}>Round {round + 1}/{maxRounds} · Score: {score} · Does the INK colour match the WORD?</Text>
      <View style={styles.colorQuestion}>
        <Text style={[styles.colorWord, { color: item.displayColor }]}>{item.word}</Text>
        {feedback ? <Text style={[styles.colorFeedback, { color: feedback === '✓' ? Colors.success : Colors.error }]}>{feedback}</Text> : null}
      </View>
      <View style={styles.colorBtns}>
        <TouchableOpacity style={[styles.colorBtn, { backgroundColor: Colors.success }]} onPress={() => answer(true)}>
          <Text style={styles.colorBtnText}>Yes ✓</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.colorBtn, { backgroundColor: Colors.error }]} onPress={() => answer(false)}>
          <Text style={styles.colorBtnText}>No ✗</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ─── Word Recall ──────────────────────────────────────────────────────────────
function WordRecall({ onScore }: { onScore: (s: number) => void }) {
  const [tier, setTier] = useState<WordListTier>('medium');
  const [words, setWords] = useState(() => pickWordList('medium'));
  const [phase, setPhase] = useState<'study' | 'recall' | 'result'>('study');
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState('');
  const [correct, setCorrect] = useState(0);
  const [results, setResults] = useState<boolean[]>([]);

  const restart = (nextTier: WordListTier) => {
    setTier(nextTier);
    setWords(pickWordList(nextTier));
    setPhase('study');
    setIdx(0);
    setInput('');
    setCorrect(0);
    setResults([]);
  };

  const nextWord = () => {
    if (idx < words.length - 1) setIdx(i => i + 1);
    else setPhase('recall');
  };

  const checkWord = () => {
    const ok = input.trim().toLowerCase() === words[idx].toLowerCase();
    const nr = [...results, ok];
    if (ok) { setCorrect(c => c + 1); onScore(25); }
    setResults(nr);
    setInput('');
    if (idx < words.length - 1) setIdx(i => i + 1);
    else setPhase('result');
  };

  if (phase === 'study') return (
    <View style={styles.gameWrap}>
      <View style={styles.tierRow}>
        {(['easy', 'medium', 'hard'] as WordListTier[]).map((d) => (
          <TouchableOpacity key={d} style={[styles.tierChip, tier === d && styles.tierChipOn]} onPress={() => restart(d)}>
            <Text style={[styles.tierChipText, tier === d && styles.tierChipTextOn]}>{d}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.gameStat}>Memorise these words ({idx + 1}/{words.length})</Text>
      <Text style={styles.recallWord}>{words[idx]}</Text>
      <TouchableOpacity style={styles.mathBtn} onPress={nextWord}>
        <Text style={styles.mathBtnText}>{idx < words.length - 1 ? 'Next word →' : 'Start recall'}</Text>
      </TouchableOpacity>
    </View>
  );

  if (phase === 'recall') return (
    <View style={styles.gameWrap}>
      <Text style={styles.gameStat}>Type word {idx + 1}/{words.length}</Text>
      <TextInput
        style={styles.mathInput}
        value={input}
        onChangeText={setInput}
        placeholder="Type the word..."
        placeholderTextColor={Colors.textTertiary}
        autoCapitalize="none"
        returnKeyType="done"
        onSubmitEditing={checkWord}
      />
      <TouchableOpacity style={[styles.mathBtn, !input && { opacity: 0.4 }]} onPress={checkWord} disabled={!input}>
        <Text style={styles.mathBtnText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.gameWrap}>
      <Text style={styles.doneMsg}>✅ {correct}/{words.length} correct!</Text>
      <Text style={styles.benefitText}>{correct === words.length ? 'Perfect recall — try Hard next!' : 'Tip: link words into a vivid mental story'}</Text>
      {words.map((w, i) => (
        <View key={w} style={styles.resultRow}>
          <Text style={[styles.resultIcon, { color: results[i] ? Colors.success : Colors.error }]}>
            {results[i] ? '✓' : '✗'}
          </Text>
          <Text style={styles.resultWord}>{w}</Text>
        </View>
      ))}
      <TouchableOpacity style={styles.mathBtn} onPress={() => restart(tier)}><Text style={styles.mathBtnText}>New list</Text></TouchableOpacity>
    </View>
  );
}

// ─── Pattern Recognition ──────────────────────────────────────────────────────
function PatternRecognition({ onScore }: { onScore: (s: number) => void }) {
  const [pattern, setPattern] = useState<number[]>([]);
  const [phase, setPhase] = useState<'show' | 'pick'>('show');
  const [options, setOptions] = useState<number[][]>([]);
  const [score, setScore] = useState(0);

  const newRound = useCallback(() => {
    const cells = Array.from({ length: 9 }, () => (Math.random() > 0.55 ? 1 : 0));
    const wrong = [...cells];
    const flipIdx = Math.floor(Math.random() * 9);
    wrong[flipIdx] = wrong[flipIdx] === 1 ? 0 : 1;
    const opts = shuffle([cells, wrong, Array.from({ length: 9 }, () => (Math.random() > 0.5 ? 1 : 0))]);
    setPattern(cells);
    setOptions(opts);
    setPhase('show');
    setTimeout(() => setPhase('pick'), 1200);
  }, []);

  useEffect(() => { newRound(); }, [newRound]);

  const pick = (opt: number[]) => {
    const right = opt.every((v, i) => v === pattern[i]);
    if (right) { setScore((s) => s + 1); onScore(20); }
    newRound();
  };

  return (
    <View style={styles.gameWrap}>
      <Text style={styles.gameStat}>Score: {score} · {phase === 'show' ? 'Memorise the pattern' : 'Which pattern matched?'}</Text>
      {phase === 'show' ? (
        <View style={styles.patternGrid}>
          {pattern.map((c, i) => (
            <View key={i} style={[styles.patternCell, c === 1 && styles.patternCellOn]} />
          ))}
        </View>
      ) : (
        <View style={styles.patternOptions}>
          {options.map((opt, oi) => (
            <TouchableOpacity key={oi} style={styles.patternOption} onPress={() => pick(opt)}>
              <View style={styles.patternGridSmall}>
                {opt.map((c, i) => (
                  <View key={i} style={[styles.patternCellSmall, c === 1 && styles.patternCellOn]} />
                ))}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

// ─── Number Sequence ──────────────────────────────────────────────────────────
function NumberSequence({ onScore }: { onScore: (s: number) => void }) {
  const [q, setQ] = useState(generateNumberSequence);
  const [input, setInput] = useState('');
  const [streak, setStreak] = useState(0);
  const [msg, setMsg] = useState('');

  const check = () => {
    const ok = parseInt(input, 10) === q.next;
    setMsg(ok ? '✓ Correct!' : `✗ Answer: ${q.next}`);
    if (ok) { setStreak((s) => s + 1); onScore(15); } else setStreak(0);
    setTimeout(() => { setQ(generateNumberSequence()); setInput(''); setMsg(''); }, 800);
  };

  return (
    <View style={styles.gameWrap}>
      <Text style={styles.gameStat}>Streak: {streak} · {q.hint}</Text>
      <Text style={styles.mathQ}>{q.seq.join(', ')}, ?</Text>
      {msg ? <Text style={styles.mathFeedback}>{msg}</Text> : null}
      <TextInput style={styles.mathInput} value={input} onChangeText={setInput} keyboardType="number-pad" placeholder="Next number" placeholderTextColor={Colors.textTertiary} onSubmitEditing={check} />
      <TouchableOpacity style={styles.mathBtn} onPress={check}><Text style={styles.mathBtnText}>Submit</Text></TouchableOpacity>
    </View>
  );
}

// ─── Attention Switch ─────────────────────────────────────────────────────────
function AttentionSwitch({ onScore }: { onScore: (s: number) => void }) {
  const [prompt, setPrompt] = useState(generateAttentionPrompt);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const maxRounds = 15;

  const answer = (yes: boolean) => {
    if (yes === prompt.answerYes) { setScore((s) => s + 1); onScore(10); }
    const nr = round + 1;
    setRound(nr);
    if (nr < maxRounds) setPrompt(generateAttentionPrompt());
  };

  if (round >= maxRounds) {
    return (
      <View style={styles.gameWrap}>
        <Text style={styles.doneMsg}>🔄 {score}/{maxRounds} correct</Text>
        <TouchableOpacity style={styles.mathBtn} onPress={() => { setRound(0); setScore(0); setPrompt(generateAttentionPrompt()); }}>
          <Text style={styles.mathBtnText}>Play again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.gameWrap}>
      <Text style={styles.gameStat}>Round {round + 1}/{maxRounds} · Score: {score}</Text>
      <Text style={styles.domainChip}>{prompt.rule}</Text>
      <Text style={styles.recallWord}>{prompt.question}</Text>
      <View style={styles.colorBtns}>
        <TouchableOpacity style={[styles.colorBtn, { backgroundColor: Colors.success }]} onPress={() => answer(true)}><Text style={styles.colorBtnText}>Yes</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.colorBtn, { backgroundColor: Colors.error }]} onPress={() => answer(false)}><Text style={styles.colorBtnText}>No</Text></TouchableOpacity>
      </View>
    </View>
  );
}

// ─── Speed Reading ────────────────────────────────────────────────────────────
function SpeedReading({ onScore }: { onScore: (s: number) => void }) {
  const [session] = useState(() => pickReadingSession(5));
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<'read' | 'quiz' | 'done'>('read');
  const [correct, setCorrect] = useState(0);
  const [readStart, setReadStart] = useState(Date.now());
  const [wpm, setWpm] = useState(0);
  const passage = session[idx];

  useEffect(() => {
    if (phase === 'read') {
      setReadStart(Date.now());
      const t = setTimeout(() => setPhase('quiz'), 12000);
      return () => clearTimeout(t);
    }
  }, [phase, idx]);

  const finishReading = () => {
    const words = passage.text.split(/\s+/).length;
    setWpm(estimateWpm(words, (Date.now() - readStart) / 1000));
    setPhase('quiz');
  };

  const pick = (oi: number) => {
    if (oi === passage.answer) { setCorrect((c) => c + 1); onScore(30); }
    if (idx < session.length - 1) { setIdx((i) => i + 1); setPhase('read'); }
    else setPhase('done');
  };

  if (phase === 'read') {
    return (
      <View style={styles.gameWrap}>
        <Text style={styles.gameStat}>Passage {idx + 1}/{session.length} · {passage.title}</Text>
        <Text style={styles.passageText}>{passage.text}</Text>
        <TouchableOpacity style={styles.mathBtn} onPress={finishReading}><Text style={styles.mathBtnText}>Done reading</Text></TouchableOpacity>
      </View>
    );
  }
  if (phase === 'quiz') {
    return (
      <View style={styles.gameWrap}>
        <Text style={styles.gameStat}>{wpm > 0 ? `~${wpm} WPM` : ''}</Text>
        <Text style={styles.recallWord}>{passage.q}</Text>
        {passage.options.map((o, i) => (
          <TouchableOpacity key={o} style={styles.gameCard} onPress={() => pick(i)}>
            <Text style={styles.gameCardTitle}>{o}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }
  return (
    <View style={styles.gameWrap}>
      <Text style={styles.doneMsg}>📖 {correct}/{session.length} correct</Text>
      <Text style={styles.benefitText}>Last insight: {session[session.length - 1].insight}</Text>
    </View>
  );
}

// ─── Focus Training ───────────────────────────────────────────────────────────
type FocusTarget = { id: number; x: number; y: number; size: number; type: 'primary' | 'distraction' };

function FocusTraining({ onScore }: { onScore: (s: number) => void }) {
  const [phase, setPhase] = useState<'idle' | 'playing' | 'done'>('idle');
  const [targets, setTargets] = useState<FocusTarget[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [level, setLevel] = useState(1);

  const spawnTargets = useCallback((lvl: number) => {
    const count = 3 + lvl;
    const next: FocusTarget[] = [];
    for (let i = 0; i < count; i++) {
      next.push({
        id: i,
        x: 10 + Math.random() * 70,
        y: 10 + Math.random() * 70,
        size: 44 + Math.random() * 16,
        type: Math.random() > 0.35 ? 'primary' : 'distraction',
      });
    }
    setTargets(next);
  }, []);

  useEffect(() => {
    if (phase !== 'playing') return;
    if (timeLeft <= 0) { setPhase('done'); return; }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [phase, timeLeft]);

  useEffect(() => {
    if (phase === 'playing' && targets.length === 0) spawnTargets(level);
  }, [phase, targets.length, level, spawnTargets]);

  const start = () => {
    setScore(0); setLevel(1); setTimeLeft(30); setPhase('playing');
    spawnTargets(1);
  };

  const tap = (target: FocusTarget) => {
    if (phase !== 'playing') return;
    if (target.type === 'primary') {
      const ns = score + 10;
      setScore(ns);
      onScore(10);
      if (ns % 50 === 0) {
        const nl = level + 1;
        setLevel(nl);
        spawnTargets(nl);
      } else {
        setTargets((ts) => ts.filter((t) => t.id !== target.id));
      }
    } else {
      setScore((s) => Math.max(0, s - 5));
    }
  };

  if (phase === 'idle') {
    return (
      <View style={styles.gameWrap}>
        <Text style={styles.recallWord}>Focus Training</Text>
        <Text style={styles.gameStat}>Tap blue targets · Avoid red distractions · 30 seconds</Text>
        <TouchableOpacity style={styles.mathBtn} onPress={start}><Text style={styles.mathBtnText}>Start</Text></TouchableOpacity>
      </View>
    );
  }
  if (phase === 'done') {
    return (
      <View style={styles.gameWrap}>
        <Text style={styles.doneMsg}>🎯 Score: {score}</Text>
        <TouchableOpacity style={styles.mathBtn} onPress={start}><Text style={styles.mathBtnText}>Play again</Text></TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.gameWrap}>
      <Text style={styles.gameStat}>Score: {score} · Level: {level} · Time: {timeLeft}s</Text>
      <View style={styles.focusArena}>
        {targets.map((t) => (
          <TouchableOpacity
            key={t.id}
            style={[
              styles.focusTarget,
              {
                left: `${t.x}%`,
                top: `${t.y}%`,
                width: t.size,
                height: t.size,
                borderRadius: t.size / 2,
                backgroundColor: t.type === 'primary' ? '#3498DB' : '#E74C3C',
              },
            ]}
            onPress={() => tap(t)}
          />
        ))}
      </View>
    </View>
  );
}

// ─── Visual Puzzle ────────────────────────────────────────────────────────────
function makePattern(size: number): boolean[][] {
  return Array.from({ length: size }, () =>
    Array.from({ length: size }, () => Math.random() > 0.55)
  );
}

function VisualPuzzle({ onScore }: { onScore: (s: number) => void }) {
  const [level, setLevel] = useState(1);
  const [gridSize, setGridSize] = useState(3);
  const [target, setTarget] = useState<boolean[][]>(() => makePattern(3));
  const [user, setUser] = useState<boolean[][]>(() => makePattern(3).map((r) => r.map(() => false)));
  const [phase, setPhase] = useState<'memorise' | 'build' | 'result'>('memorise');
  const [timer, setTimer] = useState(5);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [msg, setMsg] = useState('');

  const newRound = useCallback((lvl: number) => {
    const size = Math.min(5, 2 + Math.floor(lvl / 2));
    const pat = makePattern(size);
    setGridSize(size);
    setTarget(pat);
    setUser(Array.from({ length: size }, () => Array.from({ length: size }, () => false)));
    setPhase('memorise');
    setTimer(4 + size);
    setMsg('Memorise the pattern');
  }, []);

  useEffect(() => { newRound(1); }, [newRound]);

  useEffect(() => {
    if (phase !== 'memorise') return;
    if (timer <= 0) { setPhase('build'); setMsg('Recreate the pattern'); return; }
    const t = setTimeout(() => setTimer((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [phase, timer]);

  const toggle = (r: number, c: number) => {
    if (phase !== 'build') return;
    setUser((u) => u.map((row, ri) => row.map((cell, ci) => (ri === r && ci === c ? !cell : cell))));
  };

  const submit = () => {
    const ok = target.every((row, r) => row.every((cell, c) => cell === user[r][c]));
    if (ok) {
      const ns = score + level * 20;
      setScore(ns);
      onScore(level * 20);
      const nl = level + 1;
      setLevel(nl);
      setMsg('✓ Correct!');
      setTimeout(() => newRound(nl), 700);
    } else {
      const nl = lives - 1;
      setLives(nl);
      setMsg('✗ Not quite');
      if (nl <= 0) setPhase('result');
      else setTimeout(() => newRound(level), 700);
    }
  };

  if (phase === 'result') {
    return (
      <View style={styles.gameWrap}>
        <Text style={styles.doneMsg}>Final score: {score}</Text>
        <TouchableOpacity style={styles.mathBtn} onPress={() => { setLives(3); setScore(0); setLevel(1); newRound(1); }}>
          <Text style={styles.mathBtnText}>Play again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.gameWrap}>
      <Text style={styles.gameStat}>Level {level} · Score: {score} · Lives: {'❤️'.repeat(lives)}</Text>
      <Text style={styles.mathFeedback}>{phase === 'memorise' ? `${msg} (${timer}s)` : msg}</Text>
      <View style={styles.visualGrid}>
        {Array.from({ length: gridSize }).map((_, r) => (
          <View key={r} style={styles.visualRow}>
            {Array.from({ length: gridSize }).map((__, c) => {
              const on = phase === 'memorise' ? target[r][c] : user[r][c];
              return (
                <TouchableOpacity
                  key={c}
                  style={[styles.visualCell, on && styles.visualCellOn]}
                  onPress={() => toggle(r, c)}
                  disabled={phase === 'memorise'}
                />
              );
            })}
          </View>
        ))}
      </View>
      {phase === 'build' && (
        <View style={styles.colorBtns}>
          <TouchableOpacity style={[styles.colorBtn, { backgroundColor: Colors.textTertiary }]} onPress={() => setUser((u) => u.map((row) => row.map(() => false)))}>
            <Text style={styles.colorBtnText}>Clear</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.colorBtn, { backgroundColor: Colors.primary }]} onPress={submit}>
            <Text style={styles.colorBtnText}>Submit</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

// ─── Mental Rotation ──────────────────────────────────────────────────────────

function rotateShape(points: [number, number][], deg: number): [number, number][] {
  const rad = (deg * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  return points.map(([x, y]) => {
    const nx = Math.round(x * cos - y * sin);
    const ny = Math.round(x * sin + y * cos);
    return [nx, ny] as [number, number];
  });
}

function ShapePreview({ points, color }: { points: [number, number][]; color: string }) {
  const xs = points.map((p) => p[0]);
  const ys = points.map((p) => p[1]);
  const minX = Math.min(...xs);
  const minY = Math.min(...ys);
  const maxX = Math.max(...xs);
  const maxY = Math.max(...ys);
  const cell = 22;
  return (
    <View style={{ width: (maxX - minX + 1) * cell + 8, height: (maxY - minY + 1) * cell + 8, position: 'relative' }}>
      {points.map(([x, y], i) => (
        <View
          key={i}
          style={{
            position: 'absolute',
            left: (x - minX) * cell + 4,
            top: (y - minY) * cell + 4,
            width: cell - 2,
            height: cell - 2,
            borderRadius: 4,
            backgroundColor: color,
          }}
        />
      ))}
    </View>
  );
}

function MentalRotation({ onScore }: { onScore: (s: number) => void }) {
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [base, setBase] = useState<[number, number][]>(MENTAL_ROTATION_SHAPES[0]);
  const [options, setOptions] = useState<[number, number][][]>([]);
  const [correctIdx, setCorrectIdx] = useState(0);
  const [msg, setMsg] = useState('Which shape is the same, rotated?');

  const newRound = useCallback((lvl: number) => {
    const shape = MENTAL_ROTATION_SHAPES[Math.floor(Math.random() * MENTAL_ROTATION_SHAPES.length)];
    const rot = [90, 180, 270][Math.floor(Math.random() * 3)];
    const correct = rotateShape(shape, rot);
    const wrongs = [
      rotateShape(shape, rot + 45),
      rotateShape([...shape].reverse(), rot),
      rotateShape(shape, rot + 120),
    ];
    const opts = shuffle([correct, ...wrongs.slice(0, 3)]);
    const ci = opts.findIndex((o) => JSON.stringify(o) === JSON.stringify(correct));
    setBase(shape);
    setOptions(opts);
    setCorrectIdx(ci);
    setMsg('Which shape is the same, rotated?');
    setLevel(lvl);
  }, []);

  useEffect(() => { newRound(1); }, [newRound]);

  const pick = (idx: number) => {
    if (idx === correctIdx) {
      const ns = score + 25;
      setScore(ns);
      onScore(25);
      newRound(level + 1);
    } else {
      const nl = lives - 1;
      setLives(nl);
      setMsg('✗ Try again');
      if (nl <= 0) setMsg('Game over');
      else setTimeout(() => newRound(level), 600);
    }
  };

  if (lives <= 0) {
    return (
      <View style={styles.gameWrap}>
        <Text style={styles.doneMsg}>Final score: {score}</Text>
        <TouchableOpacity style={styles.mathBtn} onPress={() => { setLives(3); setScore(0); newRound(1); }}>
          <Text style={styles.mathBtnText}>Play again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.gameWrap}>
      <Text style={styles.gameStat}>Level {level} · Score: {score} · Lives: {'❤️'.repeat(lives)}</Text>
      <Text style={styles.gameStat}>{msg}</Text>
      <Text style={styles.gameStat}>Target shape</Text>
      <ShapePreview points={base} color={Colors.primary} />
      <View style={styles.rotationOptions}>
        {options.map((opt, i) => (
          <TouchableOpacity key={i} style={styles.rotationOption} onPress={() => pick(i)}>
            <ShapePreview points={opt} color="#9B59B6" />
            <Text style={styles.gameStat}>{i + 1}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// ─── Main screen ──────────────────────────────────────────────────────────────

export default function BrainGameScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { user } = useAppStore();
  const initId = (route.params?.gameId ?? '') as GameId;
  const [activeGame, setActiveGame] = useState<GameId | null>(
    GAMES.find(g => g.id === initId) ? initId : null
  );
  const [totalScore, setTotalScore] = useState(0);
  const recordedSession = useRef(false);

  const addScore = (s: number) => {
    setTotalScore((prev) => {
      const next = prev + s;
      if (!recordedSession.current && next >= 50 && user?.uid) {
        recordedSession.current = true;
        gamificationService.recordEvent(user.uid, 'brainGamesCompleted').catch(() => {});
      }
      return next;
    });
  };

  const exitGame = () => {
    setActiveGame(null);
    setTotalScore(0);
    recordedSession.current = false;
  };

  const startGame = (id: GameId) => {
    setTotalScore(0);
    recordedSession.current = false;
    setActiveGame(id);
  };

  const renderGame = () => {
    switch (activeGame) {
      case 'memory-match':  return <MemoryMatch onScore={addScore} />;
      case 'reaction-time': return <ReactionTime onScore={addScore} />;
      case 'quick-math':    return <QuickMath onScore={addScore} />;
      case 'color-match':   return <ColorMatch onScore={addScore} />;
      case 'word-recall':   return <WordRecall onScore={addScore} />;
      case 'pattern-recognition': return <PatternRecognition onScore={addScore} />;
      case 'number-sequence': return <NumberSequence onScore={addScore} />;
      case 'attention-switch': return <AttentionSwitch onScore={addScore} />;
      case 'speed-reading': return <SpeedReading onScore={addScore} />;
      case 'focus-training': return <FocusTraining onScore={addScore} />;
      case 'visual-puzzle': return <VisualPuzzle onScore={addScore} />;
      case 'mental-rotation': return <MentalRotation onScore={addScore} />;
      default: return null;
    }
  };

  const activeInfo = GAMES.find(g => g.id === activeGame);

  return (
    <AppScreen style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => activeGame ? exitGame() : navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{activeInfo?.title ?? 'Brain Games'}</Text>
        {activeGame && <Text style={styles.scoreChip}>{totalScore} pts</Text>}
        {!activeGame && <View style={{ width: 60 }} />}
      </View>

      {!activeGame ? (
        <ScrollView contentContainerStyle={styles.gameList}>
          <Text style={styles.gameListTitle}>Brain training</Text>
          <Text style={styles.gameListSub}>12 games targeting memory, attention, speed, and reasoning — backed by cognitive science</Text>
          {GAMES.map((g) => (
            <TouchableOpacity key={g.id} style={styles.gameCard} onPress={() => startGame(g.id)}>
              <View style={[styles.gameCardIcon, { backgroundColor: g.color + '22' }]}>
                <Text style={{ fontSize: 28 }}>{g.icon}</Text>
              </View>
              <View style={styles.gameCardInfo}>
                <Text style={styles.gameCardTitle}>{g.title}</Text>
                <Text style={styles.domainTag}>{g.domainLabel} · {g.estMinutes}</Text>
                <Text style={styles.gameCardDesc}>{g.desc}</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <ScrollView contentContainerStyle={styles.gameContainer} keyboardShouldPersistTaps="handled">
          {activeInfo ? (
            <View style={styles.gameIntro}>
              <Text style={styles.benefitText}>{activeInfo.benefit}</Text>
              <Text style={styles.tipText}>💡 {activeInfo.sessionTip}</Text>
            </View>
          ) : null}
          {renderGame()}
        </ScrollView>
      )}
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: Spacing.base, paddingVertical: Spacing.md, backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.border },
  backBtn: { width: 40 },
  backText: { fontSize: 32, color: Colors.primary, lineHeight: 38 },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  scoreChip: { backgroundColor: Colors.primary, color: Colors.white, fontSize: Typography.size.xs, fontWeight: '700', paddingHorizontal: Spacing.sm, paddingVertical: 4, borderRadius: Radius.xl, overflow: 'hidden' },

  gameList: { padding: Spacing.base, gap: Spacing.md },
  gameListTitle: { fontSize: Typography.size.lg, fontWeight: '700', color: Colors.text },
  gameListSub: { fontSize: Typography.size.sm, color: Colors.textSecondary, lineHeight: 20, marginBottom: Spacing.xs },
  gameCard: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, backgroundColor: Colors.white, borderRadius: Radius.lg, padding: Spacing.base, ...Shadow.sm },
  gameCardIcon: { width: 52, height: 52, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  gameCardInfo: { flex: 1, gap: 2 },
  gameCardTitle: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  domainTag: { fontSize: Typography.size.xs, color: Colors.primary, fontWeight: '600' },
  gameCardDesc: { fontSize: Typography.size.xs, color: Colors.textSecondary, marginTop: 2, lineHeight: 16 },
  chevron: { fontSize: 20, color: Colors.textTertiary },

  gameContainer: { padding: Spacing.base, flexGrow: 1 },
  gameIntro: { gap: Spacing.sm, marginBottom: Spacing.md, padding: Spacing.md, backgroundColor: Colors.primaryBg, borderRadius: Radius.lg },
  benefitText: { fontSize: Typography.size.sm, color: Colors.textSecondary, textAlign: 'center', lineHeight: 20 },
  tipText: { fontSize: Typography.size.xs, color: Colors.textTertiary, textAlign: 'center', lineHeight: 18 },
  domainChip: { fontSize: Typography.size.xs, color: Colors.primary, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
  tierRow: { flexDirection: 'row', gap: Spacing.sm },
  tierChip: { paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm, borderRadius: Radius.xl, borderWidth: 1.5, borderColor: Colors.border },
  tierChipOn: { backgroundColor: Colors.primaryBg, borderColor: Colors.primary },
  tierChipText: { fontSize: Typography.size.xs, color: Colors.textSecondary, fontWeight: '600', textTransform: 'capitalize' },
  tierChipTextOn: { color: Colors.primary },
  gameWrap: { gap: Spacing.lg, alignItems: 'center', paddingTop: Spacing.xl },
  gameStat: { fontSize: Typography.size.sm, color: Colors.textSecondary, textAlign: 'center' },
  doneMsg: { fontSize: Typography.size.xl, fontWeight: '700', color: Colors.success, textAlign: 'center' },

  // Memory match
  memGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm, justifyContent: 'center' },
  memCard: { width: 72, height: 72, backgroundColor: Colors.primary, borderRadius: Radius.lg, alignItems: 'center', justifyContent: 'center' },
  memCardFlipped: { backgroundColor: Colors.primaryBg, borderWidth: 2, borderColor: Colors.primary },
  memCardDone: { backgroundColor: Colors.success + '22', borderWidth: 2, borderColor: Colors.success },
  memCardText: { fontSize: 28 },

  // Reaction
  reactionBox: { width: '100%', height: 280, borderRadius: Radius.xl, alignItems: 'center', justifyContent: 'center', gap: Spacing.md },
  reactionEmoji: { fontSize: 64 },
  reactionLabel: { fontSize: Typography.size.xl, fontWeight: '700', color: Colors.white, textAlign: 'center' },
  retryBtn: { marginTop: Spacing.md, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: Radius.xl, paddingHorizontal: Spacing.xl, paddingVertical: Spacing.sm },
  retryBtnText: { color: Colors.white, fontWeight: '700' },

  // Math
  mathQ: { fontSize: 48, fontWeight: '700', color: Colors.text },
  mathFeedback: { fontSize: Typography.size.lg, fontWeight: '700' },
  mathInput: { borderWidth: 2, borderColor: Colors.border, borderRadius: Radius.lg, paddingHorizontal: Spacing.xl, paddingVertical: Spacing.md, fontSize: 28, fontWeight: '700', color: Colors.text, textAlign: 'center', width: '60%' },
  mathBtn: { backgroundColor: Colors.primary, borderRadius: Radius.xl, paddingHorizontal: Spacing.xl, paddingVertical: Spacing.md },
  mathBtnText: { color: Colors.white, fontSize: Typography.size.base, fontWeight: '700' },

  // Color match
  colorQuestion: { alignItems: 'center', paddingVertical: Spacing.xl, gap: Spacing.md },
  colorWord: { fontSize: 56, fontWeight: '900' },
  colorFeedback: { fontSize: Typography.size['2xl'], fontWeight: '700' },
  colorBtns: { flexDirection: 'row', gap: Spacing.lg },
  colorBtn: { borderRadius: Radius.xl, paddingHorizontal: Spacing.xl, paddingVertical: Spacing.base },
  colorBtnText: { color: Colors.white, fontSize: Typography.size.base, fontWeight: '700' },

  // Word recall
  recallWord: { fontSize: 42, fontWeight: '700', color: Colors.primary, textAlign: 'center' },
  resultRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  resultIcon: { fontSize: 20, fontWeight: '700' },
  resultWord: { fontSize: Typography.size.base, color: Colors.text },

  patternGrid: { flexDirection: 'row', flexWrap: 'wrap', width: 156, gap: 6 },
  patternCell: { width: 48, height: 48, borderRadius: 8, backgroundColor: Colors.border },
  patternCellOn: { backgroundColor: Colors.primary },
  patternOptions: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md, justifyContent: 'center' },
  patternOption: { padding: Spacing.sm, backgroundColor: Colors.white, borderRadius: Radius.lg, ...Shadow.sm },
  patternGridSmall: { flexDirection: 'row', flexWrap: 'wrap', width: 72, gap: 3 },
  patternCellSmall: { width: 22, height: 22, borderRadius: 4, backgroundColor: Colors.border },
  passageText: { fontSize: Typography.size.base, color: Colors.text, lineHeight: 24, textAlign: 'center', paddingHorizontal: Spacing.md },

  focusArena: { width: '100%', height: 320, backgroundColor: Colors.surface, borderRadius: Radius.xl, position: 'relative', overflow: 'hidden' },
  focusTarget: { position: 'absolute' },

  visualGrid: { gap: 4 },
  visualRow: { flexDirection: 'row', gap: 4 },
  visualCell: { width: 48, height: 48, borderRadius: 8, backgroundColor: Colors.border },
  visualCellOn: { backgroundColor: Colors.primary },

  rotationOptions: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md, justifyContent: 'center' },
  rotationOption: { alignItems: 'center', padding: Spacing.sm, backgroundColor: Colors.white, borderRadius: Radius.lg, ...Shadow.sm },
});
