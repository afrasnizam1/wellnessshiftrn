import type { InAppGuideDestination } from '../components/home/InAppGuideModal';

/** Highlighted first action in the post-signup app tour, based on primary wellness goal. */
export function getContextualGuideDestination(primaryGoal?: string | null): InAppGuideDestination {
  switch (primaryGoal) {
    case 'sleep':
    case 'stress':
    case 'mental':
    case 'habits':
      return 'dailyCheckIn';
    case 'fitness':
    case 'nutrition':
    case 'condition':
    case 'lose_weight':
    case 'gain_weight':
    case 'maintain_weight':
    case 'build_muscle':
      return 'fitness';
    case 'clinician':
      return 'more';
    default:
      return 'dailyCheckIn';
  }
}

export function getContextualGuideCopy(primaryGoal?: string | null): {
  title: string;
  body: string;
  cta: string;
} {
  const destination = getContextualGuideDestination(primaryGoal);
  if (destination === 'more') {
    return {
      title: 'Connect with your GP-referred clinician',
      body: 'Clinician linking is only for patients with a health issue whose GP referred them. Open My Care and enter the invite code they gave you.',
      cta: 'Open My Care',
    };
  }
  if (destination === 'fitness') {
    return {
      title: 'Your Fitness Hub is ready',
      body: 'Based on your goals, start with a guided module tailored to you.',
      cta: 'Open Fitness Hub',
    };
  }
  return {
    title: 'Start with a quick check-in',
    body: 'One tap each day keeps your plan personalised and builds your streak.',
    cta: 'Daily check-in',
  };
}
