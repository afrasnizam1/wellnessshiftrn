import type { IoniconName } from '../theme/icons';

export type MeditationTechnique = {
  id: string;
  name: string;
  desc: string;
  icon: IoniconName;
  cues: string[];
  closingCue: string;
};

export const MEDITATION_TECHNIQUES: MeditationTechnique[] = [
  {
    id: 'focus',
    name: 'Breath Focus',
    desc: 'Train attention on the breath',
    icon: 'flower-outline',
    cues: [
      'Settle into a comfortable position. Soften your shoulders.',
      'Feel the breath at your nostrils or the rise of your belly.',
      'When the mind wanders — and it will — gently return without judgement.',
      'Each return is the practice. You are doing it correctly.',
      'Let the breath find its natural rhythm. Simply observe.',
    ],
    closingCue: 'Take one deeper breath. Notice how you feel compared to when you started.',
  },
  {
    id: 'body',
    name: 'Body Scan',
    desc: 'Release tension from head to toe',
    icon: 'body-outline',
    cues: [
      'Close your eyes. Take three slow breaths to arrive.',
      'Bring attention to the top of your head — notice any sensation.',
      'Move slowly: forehead, jaw, neck, shoulders, arms, hands.',
      'Scan chest, belly, hips, legs, feet. Soften each area on the exhale.',
      'Rest in whole-body awareness for a few breaths.',
    ],
    closingCue: 'Wiggle fingers and toes. Open your eyes slowly when ready.',
  },
  {
    id: 'loving',
    name: 'Loving Kindness',
    desc: 'Cultivate warmth toward yourself',
    icon: 'heart-outline',
    cues: [
      'Place a hand on your heart if that feels comfortable.',
      'Silently repeat: "May I be safe. May I be healthy. May I live with ease."',
      'Picture someone you care for. Wish them the same phrases.',
      'Extend kindness to someone neutral — a neighbour, colleague.',
      'Return to yourself. Let the phrases settle like a warm light.',
    ],
    closingCue: 'Carry this kindness into the next thing you do.',
  },
  {
    id: 'open',
    name: 'Open Awareness',
    desc: 'Notice without grasping',
    icon: 'leaf-outline',
    cues: [
      'Sit with eyes softly open or closed.',
      'Sounds arise and pass — no need to label them good or bad.',
      'Thoughts are clouds passing through sky. You are the sky.',
      'Sensations, emotions, images — welcome all, push away none.',
      'Rest in spacious awareness for these final moments.',
    ],
    closingCue: 'Notice one thing you are grateful for right now.',
  },
];

export function getMeditationCue(techniqueId: string, elapsedSeconds: number, totalSeconds: number): string {
  const technique = MEDITATION_TECHNIQUES.find((t) => t.id === techniqueId) ?? MEDITATION_TECHNIQUES[0];
  const progress = totalSeconds > 0 ? elapsedSeconds / totalSeconds : 0;
  if (progress >= 0.95) return technique.closingCue;
  const index = Math.min(
    Math.floor(progress * technique.cues.length),
    technique.cues.length - 1,
  );
  return technique.cues[index];
}

/** @deprecated Prefer importing from breathingTechniques.ts */
export { BREATHING_COACHING } from './breathingTechniques';
