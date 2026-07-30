import type { FitnessModule } from '../types';
import { BRAIN_GAMES } from './brainGameContent';
import { getGuidedProgram } from './guidedProgramContent';
import { resolveHealthTopicContent } from './healthTopicContent';

export type ModulePreview = {
  summary: string;
  whatYouLearn: string[];
  duration: string;
  level: string;
};

const CATEGORY_DEFAULTS: Record<string, Partial<ModulePreview>> = {
  mindBody: {
    level: 'All levels',
    duration: '5–15 min',
  },
  education: {
    level: 'Self-paced',
    duration: '8–12 min read',
  },
  workouts: {
    level: 'Beginner–intermediate',
    duration: '20–35 min',
  },
  calculators: {
    level: 'Quick tool',
    duration: '2–5 min',
  },
  brainGames: {
    level: 'All levels',
    duration: '3–8 min per game',
  },
};

export function getModulePreview(module: FitnessModule): ModulePreview {
  const defaults = CATEGORY_DEFAULTS[module.category] ?? { level: 'All levels', duration: '10 min' };

  if (module.category === 'education') {
    const content = resolveHealthTopicContent(module.id, module.title, module.subtitle);
    const firstSection = content.sections[0];
    return {
      summary: firstSection?.body.split('\n')[0] ?? module.subtitle,
      whatYouLearn: content.sections.map((s) => s.heading),
      duration: defaults.duration ?? '10 min read',
      level: defaults.level ?? 'Self-paced',
    };
  }

  if (module.category === 'mindBody' || module.category === 'workouts') {
    const program = getGuidedProgram(module);
    return {
      summary: program.intro,
      whatYouLearn: program.steps.map((s) => s.title),
      duration: program.steps[0]?.duration ?? defaults.duration ?? '15 min',
      level: defaults.level ?? 'All levels',
    };
  }

  if (module.category === 'brainGames') {
    const game = BRAIN_GAMES.find((g) => g.id === module.id);
    if (game) {
      return {
        summary: game.benefit,
        whatYouLearn: [game.domainLabel, game.sessionTip, 'Session scoring with streaks and difficulty tiers'],
        duration: game.estMinutes,
        level: defaults.level ?? 'All levels',
      };
    }
  }

  if (module.category === 'calculators') {
    const CALC_PREVIEWS: Record<string, { summary: string; whatYouLearn: string[] }> = {
      'stress-assessment': {
        summary: 'Rate work stress, sleep, mood, and physical tension to get a personalised stress score and coping tips.',
        whatYouLearn: ['Your composite stress level', 'Which domain needs attention', 'Recommended next steps in the app'],
      },
      'strength-assessment': {
        summary: 'Benchmark push-ups, plank, and squats against age-adjusted norms for upper and lower body strength.',
        whatYouLearn: ['Upper vs lower body scores', 'Overall strength rating', 'Workout recommendations'],
      },
    };
    const preview = CALC_PREVIEWS[module.id];
    if (preview) {
      return { ...preview, duration: '3–5 min', level: 'Self-assessment' };
    }
  }

  return {
    summary: module.subtitle,
    whatYouLearn: [
      'Evidence-based guidance tailored to your goals',
      'Practical steps you can apply today',
      'Track progress in your wellness dashboard',
    ],
    duration: defaults.duration ?? '10 min',
    level: defaults.level ?? 'All levels',
  };
}
