export type BrainGameId =
  | 'memory-match' | 'reaction-time' | 'quick-math' | 'color-match' | 'word-recall'
  | 'pattern-recognition' | 'number-sequence' | 'attention-switch' | 'speed-reading'
  | 'focus-training' | 'visual-puzzle' | 'mental-rotation';

export type CognitiveDomain = 'memory' | 'attention' | 'processing' | 'executive' | 'visual';

export type BrainGameMeta = {
  id: BrainGameId;
  title: string;
  icon: string;
  color: string;
  desc: string;
  domain: CognitiveDomain;
  domainLabel: string;
  benefit: string;
  sessionTip: string;
  estMinutes: string;
};

export const BRAIN_GAMES: BrainGameMeta[] = [
  { id: 'memory-match', title: 'Memory Match', icon: '🃏', color: '#8C59BF', desc: 'Flip cards to find matching pairs — trains working memory', domain: 'memory', domainLabel: 'Working memory', benefit: 'Strengthens short-term recall used in learning and daily tasks', sessionTip: 'Say each symbol aloud when you flip — dual coding boosts retention', estMinutes: '3–5 min' },
  { id: 'reaction-time', title: 'Reaction Time', icon: '⚡', color: '#F39C12', desc: 'Five-trial reflex test with personalised feedback', domain: 'processing', domainLabel: 'Processing speed', benefit: 'Tracks alertness and psychomotor speed — useful for driving and sport', sessionTip: 'Rest your finger on the screen edge; don\'t anticipate the green', estMinutes: '2 min' },
  { id: 'quick-math', title: 'Quick Math', icon: '🔢', color: '#27AE60', desc: 'Mental arithmetic with easy, medium, and hard tiers', domain: 'processing', domainLabel: 'Numerical fluency', benefit: 'Keeps arithmetic circuits sharp and supports quick decision-making', sessionTip: 'Start on Easy for a warm-up, then push to Medium for 5+ streak', estMinutes: '3–6 min' },
  { id: 'color-match', title: 'Color Match', icon: '🎨', color: '#1ABC9C', desc: 'Stroop test — match ink colour to the word, not what it says', domain: 'executive', domainLabel: 'Cognitive flexibility', benefit: 'Trains inhibition — ignoring misleading information under pressure', sessionTip: 'Focus on the ink colour only; ignore the letters', estMinutes: '3 min' },
  { id: 'word-recall', title: 'Word Recall', icon: '💬', color: '#9B59B6', desc: 'Memorise themed word lists, then type them from memory', domain: 'memory', domainLabel: 'Verbal memory', benefit: 'Mimics list-learning used in appointments, shopping, and study', sessionTip: 'Group words into a story or image while studying', estMinutes: '4 min' },
  { id: 'pattern-recognition', title: 'Pattern Recognition', icon: '🔷', color: '#3498DB', desc: 'Memorise a grid pattern, then pick the correct match', domain: 'visual', domainLabel: 'Visual memory', benefit: 'Supports spatial reasoning and detail retention', sessionTip: 'Scan row-by-row, not randomly — systematic encoding helps', estMinutes: '4 min' },
  { id: 'number-sequence', title: 'Number Sequence', icon: '🔟', color: '#E74C3C', desc: 'Arithmetic, geometric, and alternating sequences', domain: 'executive', domainLabel: 'Logical reasoning', benefit: 'Pattern detection transfers to problem-solving and planning', sessionTip: 'Check the gap between numbers before guessing the rule', estMinutes: '3–5 min' },
  { id: 'attention-switch', title: 'Attention Switch', icon: '🔄', color: '#E67E22', desc: 'Rapidly switch between number, colour, and wellness rules', domain: 'attention', domainLabel: 'Task switching', benefit: 'Builds mental agility when juggling multiple demands', sessionTip: 'Read the rule label at the top before each answer', estMinutes: '3 min' },
  { id: 'speed-reading', title: 'Speed Reading', icon: '📖', color: '#2C3E50', desc: 'Wellness passages with comprehension checks and WPM tracking', domain: 'processing', domainLabel: 'Reading fluency', benefit: 'Pairs faster reading with comprehension — not speed alone', sessionTip: 'Use your finger to guide your eyes; re-read only if needed', estMinutes: '5–8 min' },
  { id: 'focus-training', title: 'Focus Training', icon: '🎯', color: '#2980B9', desc: 'Tap wellness targets; avoid red distractions for 30 seconds', domain: 'attention', domainLabel: 'Selective attention', benefit: 'Trains filtering distractions — key for deep work and meditation', sessionTip: 'Keep eyes on the arena centre; use peripheral vision', estMinutes: '2 min' },
  { id: 'visual-puzzle', title: 'Visual Puzzle', icon: '🧩', color: '#8E44AD', desc: 'Memorise and recreate expanding grid patterns', domain: 'visual', domainLabel: 'Spatial memory', benefit: 'Challenges visual working memory as grids grow larger', sessionTip: 'Anchor corners first, then fill the middle cells', estMinutes: '5 min' },
  { id: 'mental-rotation', title: 'Mental Rotation', icon: '🔀', color: '#16A085', desc: 'Identify the same shape rotated among distractors', domain: 'visual', domainLabel: 'Spatial rotation', benefit: 'Used in navigation, sport, and mechanical reasoning', sessionTip: 'Mentally rotate the target 90° at a time', estMinutes: '4 min' },
];

export function shuffle<T>(items: T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ─── Memory Match ─────────────────────────────────────────────────────────────

export type MemoryDeck = { id: string; name: string; pairs: string[] };

export const MEMORY_DECKS: MemoryDeck[] = [
  { id: 'wellness', name: 'Wellness', pairs: ['🧘', '💧', '🥗', '😴', '🚶', '❤️', '🧠', '🌿'] },
  { id: 'nature', name: 'Nature', pairs: ['🌲', '🌊', '☀️', '🌙', '🦋', '🌸', '🍃', '⛰️'] },
  { id: 'fitness', name: 'Fitness', pairs: ['🏃', '💪', '🧘', '⚽', '🏊', '🚴', '🤸', '🥊'] },
  { id: 'mind', name: 'Mind & Mood', pairs: ['😊', '🧠', '💭', '✨', '🎯', '🌈', '🔔', '📓'] },
];

export function pickMemoryDeck(): MemoryDeck {
  return MEMORY_DECKS[Math.floor(Math.random() * MEMORY_DECKS.length)];
}

// ─── Color Match (Stroop) ─────────────────────────────────────────────────────

export const COLOR_WORDS = [
  { word: 'RED', color: '#E74C3C' },
  { word: 'BLUE', color: '#3498DB' },
  { word: 'GREEN', color: '#27AE60' },
  { word: 'YELLOW', color: '#F1C40F' },
  { word: 'PURPLE', color: '#9B59B6' },
  { word: 'ORANGE', color: '#E67E22' },
  { word: 'PINK', color: '#E91E63' },
  { word: 'TEAL', color: '#1ABC9C' },
  { word: 'BROWN', color: '#795548' },
  { word: 'GREY', color: '#95A5A6' },
];

// ─── Word Recall ──────────────────────────────────────────────────────────────

export type WordListTier = 'easy' | 'medium' | 'hard';

export const WORD_LISTS: Record<WordListTier, string[][]> = {
  easy: [
    ['water', 'sleep', 'walk', 'fruit'],
    ['calm', 'breath', 'rest', 'smile'],
    ['yoga', 'salad', 'steps', 'sun'],
    ['tea', 'stretch', 'fresh', 'light'],
    ['herbs', 'quiet', 'warm', 'green'],
  ],
  medium: [
    ['hydration', 'meditation', 'protein', 'circadian'],
    ['mindfulness', 'resilience', 'aerobic', 'recovery'],
    ['gratitude', 'posture', 'antioxidant', 'balance'],
    ['cortisol', 'flexibility', 'omega-3', 'routine'],
    ['serotonin', 'endurance', 'fermented', 'clarity'],
  ],
  hard: [
    ['parasympathetic', 'mitochondria', 'hippocampus', 'inflammation'],
    ['neuroplasticity', 'glycaemic', 'proprioception', 'homeostasis'],
    ['autophagy', 'baroreceptor', 'prefrontal', 'microbiome'],
    ['telomere', 'isometric', 'circadian', 'dopaminergic'],
    ['vagal', 'anaerobic', 'myofascial', 'catecholamine'],
  ],
};

export function pickWordList(tier: WordListTier = 'medium'): string[] {
  const pool = WORD_LISTS[tier];
  return pool[Math.floor(Math.random() * pool.length)];
}

// ─── Speed Reading ────────────────────────────────────────────────────────────

export type ReadingPassage = {
  id: string;
  title: string;
  text: string;
  q: string;
  options: string[];
  answer: number;
  insight: string;
};

export const READING_PASSAGES: ReadingPassage[] = [
  { id: 'exercise', title: 'Physical Activity', text: 'Regular physical activity strengthens the heart, improves circulation, and helps maintain a healthy weight. Even 30 minutes of moderate exercise most days can significantly reduce the risk of chronic disease. Movement also releases endorphins that improve mood within minutes.', q: 'How much moderate exercise is recommended most days?', options: ['10 minutes', '30 minutes', '60 minutes'], answer: 1, insight: '150 minutes weekly (≈30 min × 5 days) is the WHO baseline for adults.' },
  { id: 'sleep', title: 'Sleep & Cognition', text: 'Sleep is essential for memory consolidation and emotional regulation. Adults typically need 7 to 9 hours per night. Consistent sleep schedules support better mood and cognitive performance. Deep sleep is when the brain clears metabolic waste and repairs tissue.', q: 'How many hours of sleep do adults typically need?', options: ['5–6 hours', '7–9 hours', '10–12 hours'], answer: 1, insight: 'Under 7 hours consistently raises risk of impaired focus and mood.' },
  { id: 'stress', title: 'Stress Response', text: 'Chronic stress elevates cortisol, which can disrupt sleep, digestion, and immune function. Slow breathing activates the parasympathetic nervous system within minutes. A 10-minute walk can lower cortisol as effectively as some short-term interventions.', q: 'What quickly activates the calming nervous system?', options: ['Fast shallow breathing', 'Slow controlled breathing', 'Holding your breath'], answer: 1, insight: 'Extended exhales (e.g. 4-7-8) signal safety to the brain.' },
  { id: 'hydration', title: 'Hydration', text: 'Even mild dehydration of 1–2% body weight impairs concentration, mood, and reaction time. Water transports nutrients, regulates temperature, and supports joint lubrication. Urine colour is a practical guide — pale yellow suggests adequate hydration.', q: 'At what dehydration level does cognition suffer?', options: ['1–2% body weight', '5–10%', 'Only when thirsty'], answer: 0, insight: 'Thirst often appears after cognitive effects have already begun.' },
  { id: 'protein', title: 'Protein & Recovery', text: 'Dietary protein provides amino acids for muscle repair, immune function, and enzyme production. Active adults often benefit from 1.2–1.6 grams per kilogram of body weight daily. Spreading protein across meals supports steady muscle protein synthesis.', q: 'What range helps active adults?', options: ['0.4–0.6 g/kg', '1.2–1.6 g/kg', '3.0+ g/kg'], answer: 1, insight: 'More is not always better — excess is oxidised or stored.' },
  { id: 'gut', title: 'Gut Health', text: 'The gut microbiome influences immunity, mood via the gut–brain axis, and nutrient absorption. Eating 30 different plant foods weekly supports bacterial diversity. Fermented foods like yogurt and kimchi add beneficial live cultures.', q: 'How many plant foods weekly support microbiome diversity?', options: ['10', '20', '30'], answer: 2, insight: 'Variety matters more than any single superfood.' },
  { id: 'heart', title: 'Heart Health', text: 'Cardiovascular disease remains a leading cause of mortality worldwide. At least 150 minutes of moderate aerobic activity weekly strengthens the heart muscle. Managing blood pressure below 120/80 mmHg and limiting sodium reduces long-term risk.', q: 'What weekly aerobic target supports heart health?', options: ['60 minutes', '150 minutes', '300 minutes minimum'], answer: 1, insight: 'Brisk walking counts — intensity matters alongside duration.' },
  { id: 'mindfulness', title: 'Mindfulness', text: 'Mindfulness training strengthens attention regulation and reduces rumination. Even 5 minutes daily of breath-focused practice can lower perceived stress over 8 weeks. The goal is noticing distraction without judgment, then returning to the anchor.', q: 'What is the core skill mindfulness develops?', options: ['Eliminating all thoughts', 'Noticing distraction and returning', 'Analysing every emotion'], answer: 1, insight: 'It\'s a skill of return, not thought suppression.' },
  { id: 'vitamin-d', title: 'Vitamin D', text: 'Vitamin D supports bone health, immune function, and mood regulation. Many people in northern latitudes are deficient, especially in winter. Safe sun exposure, oily fish, and fortified foods help; supplementation may be needed after a blood test.', q: 'Who is most at risk of low vitamin D?', options: ['Equatorial residents year-round', 'Northern latitude winter dwellers', 'Only elderly hospital patients'], answer: 1, insight: 'Latitude, skin tone, and indoor work all affect synthesis.' },
  { id: 'sitting', title: 'Sedentary Behaviour', text: 'Prolonged sitting is linked to higher mortality independent of exercise. Breaking up sitting every 30–60 minutes with brief movement improves glucose metabolism and reduces musculoskeletal stiffness. Standing desks help, but movement breaks matter more.', q: 'How often should you break up prolonged sitting?', options: ['Every 4 hours', 'Every 30–60 minutes', 'Only at lunch'], answer: 1, insight: 'A 2-minute walk resets metabolism better than standing alone.' },
  { id: 'caffeine', title: 'Caffeine & Sleep', text: 'Caffeine has a half-life of roughly 5–6 hours in most adults. Consuming it after 2 pm can delay sleep onset and reduce deep sleep stages. Individual sensitivity varies — some metabolise caffeine faster due to genetics.', q: 'When is a common cutoff to protect sleep?', options: ['After 2 pm', 'After 8 pm only', 'Caffeine does not affect sleep'], answer: 0, insight: 'Track your own cutoff — sensitivity varies widely.' },
  { id: 'social', title: 'Social Connection', text: 'Strong social bonds are associated with lower mortality, better immune function, and reduced depression risk. Quality matters more than quantity — a few trusted relationships outperform many superficial contacts. Loneliness is a modifiable health risk.', q: 'What matters more for health outcomes?', options: ['Number of social media followers', 'Quality of close relationships', 'Attending events weekly'], answer: 1, insight: 'One meaningful conversation can shift your stress biology.' },
  { id: 'fiber', title: 'Dietary Fibre', text: 'Fibre slows glucose absorption, feeds beneficial gut bacteria, and supports bowel regularity. Adults should aim for roughly 25–30 grams daily from whole grains, legumes, vegetables, and fruit. Most Western diets fall well short of this target.', q: 'What is the daily fibre target for adults?', options: ['10–15 g', '25–30 g', '50+ g'], answer: 1, insight: 'Increase gradually and drink water to avoid bloating.' },
  { id: 'blue-light', title: 'Screen & Sleep', text: 'Blue-rich light from screens suppresses melatonin production, delaying sleep onset. A 60-minute screen curfew before bed, dim warm lighting, and night-mode settings all help. Reading on paper or listening to audio avoids the alerting effect.', q: 'What helps protect melatonin before bed?', options: ['Bright overhead lighting', '60-minute screen curfew', 'Checking email in bed'], answer: 1, insight: 'Consistency of wind-down matters as much as duration.' },
  { id: 'strength', title: 'Resistance Training', text: 'Strength training preserves muscle mass, bone density, and metabolic health across the lifespan. Two sessions per week targeting major muscle groups meets minimum guidelines. Progressive overload — gradually increasing load — drives continued adaptation.', q: 'How often should adults strength train minimally?', options: ['Daily only', '2× per week', 'Once a month'], answer: 1, insight: 'Recovery days are when muscle actually rebuilds.' },
];

export function pickReadingSession(count = 5): ReadingPassage[] {
  return shuffle(READING_PASSAGES).slice(0, count);
}

export function estimateWpm(wordCount: number, seconds: number): number {
  if (seconds <= 0) return 0;
  return Math.round((wordCount / seconds) * 60);
}

// ─── Mental Rotation ──────────────────────────────────────────────────────────

export const MENTAL_ROTATION_SHAPES: [number, number][][] = [
  [[0, 0], [1, 0], [1, 1], [2, 1]],
  [[0, 0], [0, 1], [1, 1], [2, 1]],
  [[1, 0], [0, 1], [1, 1], [2, 0]],
  [[0, 0], [1, 0], [2, 0], [1, 1], [1, 2]],
  [[0, 0], [1, 0], [0, 1], [1, 1], [2, 1]],
  [[0, 1], [1, 0], [1, 1], [2, 1], [2, 2]],
  [[0, 0], [0, 1], [1, 0], [2, 0], [2, 1]],
  [[1, 0], [0, 0], [1, 1], [2, 1], [2, 2]],
];

// ─── Attention Switch ─────────────────────────────────────────────────────────

export type AttentionPrompt = {
  rule: string;
  question: string;
  answerYes: boolean;
};

export function generateAttentionPrompt(): AttentionPrompt {
  const types = ['parity', 'primary', 'divisible', 'wellness', 'vowel'] as const;
  const type = types[Math.floor(Math.random() * types.length)];

  if (type === 'parity') {
    const n = Math.floor(Math.random() * 12) + 2;
    return { rule: 'Number rule', question: `Is ${n} even?`, answerYes: n % 2 === 0 };
  }
  if (type === 'divisible') {
    const n = Math.floor(Math.random() * 50) + 10;
    return { rule: 'Number rule', question: `Is ${n} divisible by 3?`, answerYes: n % 3 === 0 };
  }
  if (type === 'primary') {
    const colors = ['RED', 'BLUE', 'GREEN', 'YELLOW', 'PURPLE', 'ORANGE'];
    const c = colors[Math.floor(Math.random() * colors.length)];
    return { rule: 'Colour rule', question: `Is ${c} a primary colour (RYB)?`, answerYes: c === 'RED' || c === 'BLUE' || c === 'YELLOW' };
  }
  if (type === 'wellness') {
    const items = [
      { q: 'Does meditation reduce cortisol?', yes: true },
      { q: 'Is 4 hours of sleep optimal for adults?', yes: false },
      { q: 'Does walking count as moderate exercise?', yes: true },
      { q: 'Is dehydration harmless below 5%?', yes: false },
      { q: 'Does protein support muscle repair?', yes: true },
      { q: 'Is chronic stress good for immunity?', yes: false },
    ];
    const item = items[Math.floor(Math.random() * items.length)];
    return { rule: 'Wellness fact', question: item.q, answerYes: item.yes };
  }
  const vowels = ['A', 'E', 'I', 'O', 'U'];
  const letters = ['B', 'M', 'R', 'T', 'S', 'K', 'P', 'D'];
  const pool = Math.random() > 0.5 ? vowels : letters;
  const letter = pool[Math.floor(Math.random() * pool.length)];
  return { rule: 'Letter rule', question: `Is "${letter}" a vowel?`, answerYes: vowels.includes(letter) };
}

// ─── Quick Math ───────────────────────────────────────────────────────────────

export type MathDifficulty = 'easy' | 'medium' | 'hard';

export function generateMathQuestion(difficulty: MathDifficulty): { q: string; ans: number } {
  if (difficulty === 'easy') {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    const add = Math.random() > 0.4;
    return add ? { q: `${a} + ${b}`, ans: a + b } : { q: `${Math.max(a, b)} − ${Math.min(a, b)}`, ans: Math.max(a, b) - Math.min(a, b) };
  }
  if (difficulty === 'medium') {
    const ops = ['+', '−', '×'] as const;
    const op = ops[Math.floor(Math.random() * ops.length)];
    const a = Math.floor(Math.random() * 15) + 5;
    const b = Math.floor(Math.random() * 12) + 2;
    if (op === '+') return { q: `${a} + ${b}`, ans: a + b };
    if (op === '−') return { q: `${a + b} − ${b}`, ans: a };
    return { q: `${a} × ${b}`, ans: a * b };
  }
  const a = Math.floor(Math.random() * 12) + 8;
  const b = Math.floor(Math.random() * 8) + 3;
  const c = Math.floor(Math.random() * 5) + 2;
  const variants = [
    { q: `${a} × ${b} + ${c}`, ans: a * b + c },
    { q: `(${a} + ${b}) × ${c}`, ans: (a + b) * c },
    { q: `${a * b} ÷ ${b}`, ans: a },
  ];
  return variants[Math.floor(Math.random() * variants.length)];
}

// ─── Number Sequence ──────────────────────────────────────────────────────────

export type SequenceType = 'arithmetic' | 'geometric' | 'alternating';

export function generateNumberSequence(): { seq: number[]; next: number; hint: string } {
  const type: SequenceType = (['arithmetic', 'geometric', 'alternating'] as const)[Math.floor(Math.random() * 3)];

  if (type === 'arithmetic') {
    const start = Math.floor(Math.random() * 15) + 2;
    const step = Math.floor(Math.random() * 6) + 2;
    const seq = [start, start + step, start + step * 2, start + step * 3];
    return { seq, next: start + step * 4, hint: 'Add the same amount each step' };
  }
  if (type === 'geometric') {
    const start = Math.floor(Math.random() * 4) + 2;
    const ratio = Math.floor(Math.random() * 2) + 2;
    const seq = [start, start * ratio, start * ratio * ratio, start * ratio * ratio * ratio];
    return { seq, next: start * ratio ** 4, hint: 'Multiply by the same factor each step' };
  }
  const a = Math.floor(Math.random() * 8) + 3;
  const b = Math.floor(Math.random() * 8) + 5;
  const seq = [a, b, a + 2, b + 2];
  return { seq, next: a + 4, hint: 'Two alternating patterns interleaved' };
}

// ─── Reaction feedback ────────────────────────────────────────────────────────

export function reactionFeedback(ms: number): { label: string; tip: string } {
  if (ms < 200) return { label: 'Exceptional', tip: 'Elite athlete range — stay rested to maintain this' };
  if (ms < 250) return { label: 'Excellent', tip: 'Sharp reflexes — great for sport and alertness' };
  if (ms < 320) return { label: 'Good', tip: 'Solid average — sleep and hydration help shave ms' };
  if (ms < 400) return { label: 'Average', tip: 'Try after better sleep; fatigue slows reaction time' };
  return { label: 'Slow', tip: 'Check sleep, caffeine timing, and stress — all affect speed' };
}

export function averageReactionScore(times: number[]): number {
  if (times.length === 0) return 0;
  const avg = times.reduce((a, b) => a + b, 0) / times.length;
  return Math.max(0, Math.round(1000 - avg));
}
