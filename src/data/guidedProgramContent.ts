import type { FitnessModule } from '../types';

export type GuidedStep = {
  title: string;
  duration?: string;
  description: string;
};

export type GuidedProgram = {
  intro: string;
  warmup?: string;
  steps: GuidedStep[];
  cooldown?: string;
  tips: string[];
};

export const GUIDED_PROGRAMS: Record<string, GuidedProgram> = {
  'workout-library': {
    intro: 'Choose a session that matches your energy today. Start lighter if you are new or returning after a break.',
    warmup: '5 minutes of brisk walking, arm circles, and hip openers.',
    steps: [
      { title: 'Bodyweight circuit', duration: '20 min', description: 'Squats, push-ups (or wall push-ups), lunges, and plank — 3 rounds, 45s work / 15s rest.' },
      { title: 'Core finisher', duration: '8 min', description: 'Dead bug, bird dog, and side plank — 2 rounds each side.' },
      { title: 'Cool-down stretch', duration: '5 min', description: 'Hamstrings, hip flexors, chest, and shoulders — hold 30s each.' },
    ],
    tips: ['Form beats speed — stop a rep before your posture breaks down.', 'Log how you feel in a recovery tracker to spot patterns.'],
  },
  'sports-injury': {
    intro: 'Use the RICE protocol in the first 48–72 hours after an acute sports injury, then gradually reload movement.',
    steps: [
      { title: 'Rest', description: 'Avoid painful movements. Light activity is fine once pain allows.' },
      { title: 'Ice', duration: '15–20 min', description: 'Apply a cold pack every 2–3 hours in the first day.' },
      { title: 'Compression & elevation', description: 'Support the area and raise it above heart level when resting.' },
      { title: 'Return to play', description: 'Progress through pain-free range of motion before sport-specific drills.' },
    ],
    tips: ['Seek urgent care for severe swelling, deformity, or inability to bear weight.', 'A physiotherapist can guide safe return-to-sport timelines.'],
  },
  'senior-fitness': {
    intro: 'Low-impact strength and balance work reduces fall risk and supports independence.',
    warmup: 'March in place and gentle neck/shoulder rolls for 3 minutes.',
    steps: [
      { title: 'Sit-to-stand', duration: '2 × 10', description: 'Use a sturdy chair. Stand without pushing off hands if possible.' },
      { title: 'Heel-to-toe walk', duration: '20 steps', description: 'Walk a straight line slowly, near a wall for support.' },
      { title: 'Standing calf raises', duration: '2 × 12', description: 'Hold a counter for balance. Rise slowly, lower with control.' },
      { title: 'Balance hold', duration: '30s each leg', description: 'Single-leg stand near support — build time gradually.' },
    ],
    cooldown: 'Gentle ankle circles and seated hamstring stretch.',
    tips: ['Exercise on non-slip footwear. Stop if dizzy.', 'Consistency 3× weekly beats occasional intense sessions.'],
  },
  'walking-running': {
    intro: 'Build aerobic fitness with a walk–run plan that limits injury risk.',
    steps: [
      { title: 'Week 1–2', duration: '20 min', description: 'Walk briskly 5 days per week. Add 5 minutes weekly.' },
      { title: 'Week 3–4', description: 'Alternate 2 min walk / 1 min easy jog for 20 minutes.' },
      { title: 'Week 5+', description: 'Progress jog intervals to 5 minutes with 1-minute walks between.' },
    ],
    tips: ['Invest in supportive shoes replaced every 500–800 km.', 'Track steps in the Fitness Hub activity section.'],
  },
  'pre-post-natal': {
    intro: 'Pregnancy-safe movement supports mood, sleep, and delivery recovery. Always follow your midwife or obstetrician’s guidance.',
    warmup: 'Pelvic floor awareness breath — inhale relax, exhale gentle lift.',
    steps: [
      { title: 'Cat–cow mobility', duration: '8 reps', description: 'On hands and knees, slow spinal flexion and extension.' },
      { title: 'Supported squats', duration: '2 × 10', description: 'Hold a stable surface. Depth only as comfortable.' },
      { title: 'Side-lying leg lifts', duration: '2 × 12 each', description: 'Strengthen glutes and hip stabilisers.' },
      { title: 'Postnatal breathing', duration: '5 min', description: 'Diaphragmatic breathing to reconnect core after delivery.' },
    ],
    tips: ['Avoid supine exercises late in pregnancy if dizzy.', 'Stop for bleeding, pain, or contractions.'],
  },
  'arthritis-exercises': {
    intro: 'Gentle, regular movement lubricates joints and reduces stiffness — the goal is motion, not pain.',
    warmup: 'Warm shower or 5 minutes of easy walking first.',
    steps: [
      { title: 'Range-of-motion circles', duration: '10 each direction', description: 'Shoulders, wrists, ankles — slow and controlled.' },
      { title: 'Water or chair squats', duration: '2 × 8', description: 'Partial depth only — no sharp joint pain.' },
      { title: 'Tai chi or yoga flow', duration: '10 min', description: 'Slow weight shifts improve balance and joint mobility.' },
    ],
    tips: ['Ice after activity if joints swell. Heat before if stiff.', 'Pair with anti-inflammatory nutrition where appropriate.'],
  },
  'rehab-exercises': {
    intro: 'Rehabilitation rebuilds strength and coordination after injury or surgery — progress only when pain-free.',
    steps: [
      { title: 'Isometrics', duration: '5 × 10s holds', description: 'Muscle contraction without joint movement — safe early phase.' },
      { title: 'Controlled range', duration: '2 × 12', description: 'Move through pain-free arc only. No bouncing.' },
      { title: 'Balance & proprioception', duration: '3 min', description: 'Single-leg stand, tandem walk — essential before sport return.' },
    ],
    tips: ['Follow your physio’s protocol if you have one.', 'Log recovery days in the Recovery Tracker.'],
  },
  'mindfulness-toolkit': {
    intro: 'A practical set of brief practices you can use anywhere when stress rises.',
    steps: [
      { title: '60-second body scan', duration: '1 min', description: 'Notice feet, legs, belly, chest, jaw — soften each on the exhale.' },
      { title: '5-4-3-2-1 grounding', duration: '2 min', description: 'Name 5 things you see, 4 feel, 3 hear, 2 smell, 1 taste.' },
      { title: 'Loving-kindness phrase', duration: '3 min', description: 'Repeat: "May I be safe, may I be well, may I be at ease."' },
    ],
    tips: ['Open the Breathing Exercises module for guided box breathing.', 'Short daily practice beats occasional long sessions.'],
  },
  mindfulness: {
    intro: 'Mindfulness trains attention on the present moment without judgement — a skill that strengthens with repetition.',
    steps: [
      { title: 'Anchor on breath', duration: '5 min', description: 'Feel air at the nostrils or belly rise. Return gently when distracted.' },
      { title: 'Open awareness', duration: '5 min', description: 'Notice sounds, sensations, and thoughts as passing events.' },
      { title: 'Everyday mindfulness', duration: 'ongoing', description: 'One routine activity (tea, shower, walk) done with full attention.' },
    ],
    tips: ['Use the Meditation Timer for structured sessions.', 'Judging your practice is just another thought — notice and return.'],
  },
  yoga: {
    intro: 'Yoga blends breath, strength, and flexibility. Move within your range and modify as needed.',
    warmup: 'Child’s pose and cat–cow for 2 minutes.',
    steps: [
      { title: 'Sun salutation A', duration: '5 rounds', description: 'Mountain, forward fold, plank, upward dog, downward dog — flow with breath.' },
      { title: 'Warrior II & triangle', duration: '30s each side', description: 'Build leg strength and side-body length.' },
      { title: 'Seated twist & forward fold', duration: '1 min each', description: 'Release spine and hamstrings.' },
      { title: 'Savasana', duration: '5 min', description: 'Lie still — integration is part of the practice.' },
    ],
    tips: ['Blocks and cushions make poses accessible.', 'PRO feature — explore Pilates-style core work on rest days.'],
  },
  breathing: {
    intro: 'Controlled breathing is one of the fastest ways to shift your nervous system from stress to calm — backed by clinical research on heart-rate variability and anxiety reduction.',
    steps: [
      { title: 'Box breathing', duration: '4 min', description: 'Inhale 4s, hold 4s, exhale 4s, hold 4s — repeat 4 cycles. Used by Navy SEALs and clinicians for acute stress.' },
      { title: 'Extended exhale', duration: '3 min', description: 'Inhale 4 counts, exhale 6 counts. Longer exhale activates the parasympathetic "rest and digest" response.' },
      { title: '4-7-8 for sleep', duration: '4 cycles', description: 'Inhale 4, hold 7, exhale 8 through the mouth. Ideal during your wind-down routine.' },
      { title: 'Daily anchor', duration: '1 min', description: 'Three conscious breaths before meals, meetings, or bed — build the habit of pausing.' },
    ],
    tips: ['Practice seated or lying down first.', 'Stop if dizzy — return to normal breathing.', 'Pair with the Breathing Exercise screen for guided timing.'],
  },
  meditation: {
    intro: 'Meditation trains attention and emotional regulation. Even 3 minutes daily changes brain connectivity over weeks — consistency matters more than duration.',
    steps: [
      { title: 'Breath anchor', duration: '3 min', description: 'Count breaths 1–10. When distracted, gently restart. Each return is success.' },
      { title: 'Body scan', duration: '7 min', description: 'Move attention from head to toes, softening tension on each exhale.' },
      { title: 'Loving-kindness', duration: '5 min', description: '"May I be safe, may I be well, may I live with ease" — extend to someone you care about.' },
      { title: 'Open awareness', duration: '5 min', description: 'Notice sounds, thoughts, and sensations without pushing them away.' },
    ],
    tips: ['Use the Meditation Timer for structured sessions.', 'Same time and place builds habit faster.', 'Judging your practice is just another thought — notice and return.'],
  },
  stretching: {
    intro: 'Mobility work maintains range of motion, reduces injury risk, and counteracts desk posture. Never stretch into pain — gentle tension is the target.',
    warmup: '2 minutes marching in place or light walking.',
    steps: [
      { title: 'Neck & shoulders', duration: '2 min', description: 'Ear-to-shoulder stretches, chin tucks, shoulder rolls — 30s each side.' },
      { title: 'Hip flexor opener', duration: '90s each', description: 'Half-kneeling lunge, tuck pelvis slightly, breathe into the front of the hip.' },
      { title: 'Hamstrings & calves', duration: '2 min', description: 'Standing or seated forward fold — micro-bend knees if needed.' },
      { title: 'Thoracic rotation', duration: '8 each side', description: 'On all fours, hand behind head, rotate upper back — unlocks desk stiffness.' },
    ],
    cooldown: '60 seconds child\'s pose or supine knee hug.',
    tips: ['Best after exercise or a warm shower.', 'Try the Desk Breaker program for daily office mobility.'],
  },
  'sleep-tools': {
    intro: 'Quality sleep is the foundation of recovery, mood, and metabolic health. These tools help you quantify debt and build a sustainable wind-down.',
    steps: [
      { title: 'Calculate sleep debt', duration: '3 min', description: 'Use the Sleep Debt Calculator — aim to close gaps gradually, not in one marathon lie-in.' },
      { title: 'Wind-down routine', duration: '20 min', description: 'Dim lights, no screens, light stretch, 4-7-8 breathing — same sequence nightly.' },
      { title: 'Sleep environment audit', duration: '10 min', description: 'Cool (~18°C), dark, quiet room. Phone outside bedroom if possible.' },
      { title: 'Morning light', duration: '5 min', description: 'Outdoor light within 30 minutes of waking anchors your circadian rhythm.' },
    ],
    tips: ['Caffeine cutoff 8 hours before bed.', 'Alcohol fragments sleep — limit evening intake.', 'Start the 21-Day Sleep Improvement program for structured support.'],
  },
};

export function getGuidedProgram(module: FitnessModule): GuidedProgram {
  const program = GUIDED_PROGRAMS[module.id];
  if (program) return program;

  const categoryIntros: Record<string, string> = {
    mindBody: `${module.title} combines evidence-based movement and awareness practices. Start with the first step and progress at your own pace.`,
    education: `This module gives you clinician-reviewed information about ${module.title.toLowerCase()} — practical, actionable, and designed for real life.`,
    workouts: `This session builds strength, endurance, and confidence. Warm up, work at your level, and cool down — recovery is part of training.`,
    calculators: `Use this tool to understand your numbers and make informed decisions. Data supports conversation with your healthcare team.`,
    brainGames: `Cognitive training supports focus, memory, and mental agility. Short daily sessions compound over weeks.`,
  };

  return {
    intro: categoryIntros[module.category] ?? module.subtitle,
    steps: [
      { title: 'Prepare', duration: '2 min', description: 'Find a quiet space, set your intention, and gather anything you need (mat, water, journal).' },
      { title: 'Core practice', duration: '10–15 min', description: `Follow the guided steps for ${module.title}. Pause or modify if anything causes pain.` },
      { title: 'Integrate', duration: '2 min', description: 'Note one takeaway in your mind or journal. Plan when you will repeat this practice.' },
    ],
    tips: [
      'Short regular sessions beat occasional long ones.',
      'Consult your clinician before starting if you have a medical condition.',
      'Explore related modules in the Fitness Hub for deeper learning.',
    ],
  };
}
