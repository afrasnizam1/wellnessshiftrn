import type { IoniconName } from '../theme/icons';
import { Colors } from '../theme';

export type BreathingTechnique = {
  id: string;
  name: string;
  shortLabel: string;
  /** One-line chip subtitle */
  desc: string;
  /** Why this pattern helps (shown before start) */
  benefit: string;
  /** Best situations to use it */
  bestFor: string;
  inhale: number;
  holdIn: number;
  exhale: number;
  rest: number;
  color: string;
  /** Optional safety note */
  caution?: string;
};

/** Evidence-informed techniques — timings drive the animated coach. */
export const BREATHING_TECHNIQUES: BreathingTechnique[] = [
  {
    id: 'box',
    name: 'Box Breathing',
    shortLabel: 'Box',
    desc: 'Equal 4-4-4-4 — calm focus under pressure',
    benefit:
      'Balances inhale and exhale so heart-rate variability steadies. Used by athletes, clinicians, and first responders for acute stress without sedation.',
    bestFor: 'Meetings, exams, spikes of anxiety, resetting mid-day',
    inhale: 4,
    holdIn: 4,
    exhale: 4,
    rest: 4,
    color: Colors.fitness,
  },
  {
    id: '478',
    name: '4-7-8 Breathing',
    shortLabel: '4-7-8',
    desc: 'Long exhale — classic wind-down pattern',
    benefit:
      'The long mouth exhale lengthens the out-breath, which strongly activates the parasympathetic (“rest and digest”) branch and lowers arousal before sleep.',
    bestFor: 'Bedtime, racing thoughts, winding down after screens',
    inhale: 4,
    holdIn: 7,
    exhale: 8,
    rest: 0,
    color: Colors.mental,
    caution: 'If the hold feels hard, shorten it — never strain.',
  },
  {
    id: 'calm',
    name: 'Extended Exhale',
    shortLabel: 'Calm',
    desc: 'Inhale 4 · exhale 6 — gentle relaxation',
    benefit:
      'A longer exhale than inhale is one of the fastest ways to signal safety to the brain stem. Ideal when you want calm without holding the breath.',
    bestFor: 'Daily stress, desk breaks, after arguments',
    inhale: 4,
    holdIn: 0,
    exhale: 6,
    rest: 0,
    color: Colors.mindfulness,
  },
  {
    id: 'belly',
    name: 'Diaphragmatic Breath',
    shortLabel: 'Belly',
    desc: 'Belly-led breathing — foundation skill',
    benefit:
      'Engages the diaphragm instead of shallow chest breathing. Improves oxygen exchange, reduces neck/shoulder tension, and trains the body out of “panic breathing”.',
    bestFor: 'Beginners, anxiety with tight chest, posture reset',
    inhale: 4,
    holdIn: 0,
    exhale: 5,
    rest: 1,
    color: '#5DADE2',
  },
  {
    id: 'coherent',
    name: 'Coherent Breathing',
    shortLabel: 'Coherent',
    desc: '~5–6 breaths/min for heart–brain sync',
    benefit:
      'Breathing near 5–6 cycles per minute maximises heart-rate variability for many people — a marker of resilience and emotional regulation.',
    bestFor: 'Daily practice, focus, recovery after hard workouts',
    inhale: 5,
    holdIn: 0,
    exhale: 5,
    rest: 0,
    color: '#27AE60',
  },
  {
    id: 'sigh',
    name: 'Physiological Sigh',
    shortLabel: 'Sigh',
    desc: 'Double inhale + long exhale — fast reset',
    benefit:
      'A double inhale (second sip through the nose) reinflates collapsed alveoli; the long exhale drops CO₂ and rapidly reduces stress arousal — often within 1–3 cycles.',
    bestFor: 'Panic edges, overwhelm, quick calm before a call',
    inhale: 2,
    holdIn: 1,
    exhale: 6,
    rest: 0,
    color: '#E67E22',
    caution: 'The “hold” is a short second sip of air through the nose, then a long soft exhale.',
  },
  {
    id: 'energy',
    name: 'Energising Breath',
    shortLabel: 'Energy',
    desc: 'Short 2-2 rhythm — morning alertness',
    benefit:
      'Faster, even breaths raise sympathetic tone slightly and can lift fog — useful when you need activation, not sedation.',
    bestFor: 'Morning wake-up, pre-workout, afternoon slump',
    inhale: 2,
    holdIn: 0,
    exhale: 2,
    rest: 0,
    color: Colors.physical,
    caution: 'Avoid late evening — may feel stimulating. Stop if dizzy.',
  },
];

export const BREATHING_WHY_IT_MATTERS: {
  title: string;
  body: string;
  icon: IoniconName;
}[] = [
  {
    title: 'Shifts your nervous system',
    body: 'Slow, controlled breathing activates the parasympathetic system — lowering heart rate and muscle tension within minutes.',
    icon: 'pulse-outline',
  },
  {
    title: 'Calms stress chemistry',
    body: 'Steady breathing can reduce perceived stress and help cortisol settle after acute spikes, without medication.',
    icon: 'leaf-outline',
  },
  {
    title: 'Sharpens focus & sleep',
    body: 'Box and coherent patterns support concentration; 4-7-8 and extended exhales help you fall asleep faster.',
    icon: 'moon-outline',
  },
  {
    title: 'Always available',
    body: 'No equipment. Use a quiet corner, commute, or bed — 3–4 cycles often create a noticeable shift.',
    icon: 'sparkles-outline',
  },
];

export const BREATHING_COACHING: Record<
  string,
  { intro: string; phases: Record<string, string> }
> = {
  box: {
    intro: 'Box breathing balances the nervous system — used by athletes and clinicians for calm focus.',
    phases: {
      inhale: 'Breathe in slowly through the nose for 4. Fill the belly, then chest.',
      hold: 'Hold gently — no strain. Feel the stillness.',
      exhale: 'Release slowly for 4. Let shoulders drop.',
      rest: 'Pause empty for 4. Prepare for the next cycle.',
    },
  },
  '478': {
    intro: '4-7-8 breathing activates the parasympathetic response — ideal before sleep.',
    phases: {
      inhale: 'Quiet inhale through the nose for 4.',
      hold: 'Hold for 7. Stay soft in the jaw and belly.',
      exhale: 'Audible exhale through the mouth for 8. Release tension.',
      rest: 'Pause naturally before the next cycle.',
    },
  },
  calm: {
    intro: 'Extended exhale signals safety to your nervous system — simple and powerful.',
    phases: {
      inhale: 'Gentle 4-count inhale through the nose.',
      exhale: 'Slow 6-count exhale — longer than the inhale.',
      rest: 'Rest in calm.',
    },
  },
  belly: {
    intro: 'Place one hand on your belly. It should rise on the inhale more than your chest.',
    phases: {
      inhale: 'Nose inhale for 4 — expand the belly outward.',
      exhale: 'Soft exhale for 5 — belly falls. Release jaw and shoulders.',
      rest: 'Brief pause. Keep the next breath easy.',
    },
  },
  coherent: {
    intro: 'Even 5-and-5 breathing — aim for smooth edges, not force.',
    phases: {
      inhale: 'Smooth nasal inhale for 5. No rush.',
      exhale: 'Matching 5-count exhale. Soften the face.',
      rest: 'Flow straight into the next inhale.',
    },
  },
  sigh: {
    intro: 'Physiological sigh: double nasal inhale, then a long relaxing exhale.',
    phases: {
      inhale: 'First inhale through the nose — fill about 70%.',
      hold: 'Second short sip through the nose — top up the lungs.',
      exhale: 'Long soft exhale through the mouth or nose for 6. Empty fully.',
      rest: 'Notice the drop in tension.',
    },
  },
  energy: {
    intro: 'Quick rhythmic breathing increases alertness — use in the morning, not before bed.',
    phases: {
      inhale: 'Sharp 2-count nasal inhale.',
      exhale: 'Quick 2-count exhale.',
      rest: 'Keep a steady, comfortable rhythm.',
    },
  },
};

export function getBreathingTechnique(id: string): BreathingTechnique {
  return BREATHING_TECHNIQUES.find((t) => t.id === id) ?? BREATHING_TECHNIQUES[0];
}
