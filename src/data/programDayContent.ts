export type ProgramDayLesson = {
  day: number;
  title: string;
  focus: string;
  durationMinutes: number;
  instructions: string[];
  reflection?: string;
};

const WEEK_ONE: Record<string, ProgramDayLesson[]> = {
  stress_reset_30: [
    { day: 1, title: 'Anchor your breath', focus: 'Foundation', durationMinutes: 5, instructions: ['Complete one 4-4-4-4 box breathing cycle in Breathing Exercises', 'Notice where you hold tension — jaw, shoulders, or belly', 'Set a single daily reminder for the same time tomorrow'], reflection: 'What triggered stress today, and how did your body respond?' },
    { day: 2, title: 'Body scan reset', focus: 'Awareness', durationMinutes: 8, instructions: ['Use Meditation Timer — Body Scan for 5 minutes', 'Walk 10 minutes without your phone', 'Write one sentence: "Today I felt…"'], reflection: 'Which body area carried the most stress?' },
    { day: 3, title: 'Ground in the present', focus: 'Grounding', durationMinutes: 6, instructions: ['Practice 5-4-3-2-1 grounding (see Mindfulness Toolkit)', 'Limit news/social scrolling to two 15-minute blocks', 'End the day with 3 minutes of calm breathing'], reflection: 'What pulled you out of the present today?' },
    { day: 4, title: 'Move to release', focus: 'Movement', durationMinutes: 15, instructions: ['10-minute walk or gentle yoga flow', 'Stretch hip flexors and chest — common stress storage areas', 'Hydrate — dehydration amplifies cortisol'], reflection: 'How did movement change your mood?' },
    { day: 5, title: 'Compassion break', focus: 'Self-talk', durationMinutes: 7, instructions: ['3-minute loving-kindness meditation', 'Replace one self-critical thought with a kinder alternative', 'Message someone you trust — connection lowers stress'], reflection: 'What would you say to a friend feeling how you feel?' },
    { day: 6, title: 'Digital boundary', focus: 'Recovery', durationMinutes: 10, instructions: ['No screens 30 minutes before bed', 'List tomorrow\'s top 3 priorities — not 10', 'Evening box breathing in dim light'], reflection: 'What boundary protected your calm today?' },
    { day: 7, title: 'Week one review', focus: 'Reflection', durationMinutes: 12, instructions: ['Review your week — which tool helped most?', 'Pick your default stress tool for busy days', 'Plan next week\'s non-negotiable 5-minute practice'], reflection: 'Stress score 1–10 now vs day 1?' },
  ],
  sleep_improvement: [
    { day: 1, title: 'Sleep schedule', focus: 'Timing', durationMinutes: 5, instructions: ['Pick a fixed wake time for the next 21 days', 'Set a bedtime alarm 8 hours before wake', 'Log last night\'s sleep in Sleep Debt Calculator'], reflection: 'How consistent was your sleep last week?' },
    { day: 2, title: 'Wind-down ritual', focus: 'Routine', durationMinutes: 20, instructions: ['Create a 20-minute pre-bed sequence: dim lights → stretch → read', 'No caffeine after 2pm', 'Try 4-7-8 breathing once in bed'], reflection: 'What activity most disrupts your wind-down?' },
    { day: 3, title: 'Bedroom environment', focus: 'Environment', durationMinutes: 10, instructions: ['Cool room (~18°C), dark curtains or eye mask', 'Phone charges outside bedroom if possible', 'Reserve bed for sleep — not work'], reflection: 'Rate your bedroom 1–10 for sleep quality.' },
    { day: 4, title: 'Light & circadian rhythm', focus: 'Light', durationMinutes: 8, instructions: ['Get outdoor light within 30 minutes of waking', 'Avoid bright screens 60 minutes before bed', 'Short walk after lunch if energy dips'], reflection: 'When did you feel most alert today?' },
    { day: 5, title: 'Evening nutrition', focus: 'Food', durationMinutes: 5, instructions: ['Finish main meal 3 hours before bed', 'Limit alcohol — it fragments sleep architecture', 'Herbal tea or water only after dinner'], reflection: 'Did any food or drink affect sleep onset?' },
    { day: 6, title: 'Mind quieting', focus: 'Racing thoughts', durationMinutes: 12, instructions: ['Brain dump worries on paper before bed', '5-minute body scan meditation', 'If awake >20 min, get up briefly then return'], reflection: 'What thoughts kept you awake recently?' },
    { day: 7, title: 'Sleep review', focus: 'Progress', durationMinutes: 10, instructions: ['Compare sleep debt trend in calculator', 'Keep the two habits that helped most', 'Adjust bedtime by 15 min if needed'], reflection: 'One change to protect this week.' },
  ],
  fitness_kickstart: [
    { day: 1, title: 'Baseline walk', focus: 'Start moving', durationMinutes: 15, instructions: ['Brisk 15-minute walk — conversational pace', 'Note steps in activity dashboard', 'Stretch calves and quads 2 minutes'], reflection: 'Energy before vs after the walk?' },
    { day: 2, title: 'Strength intro', focus: 'Foundation', durationMinutes: 12, instructions: ['2 rounds: 8 squats, 8 wall push-ups, 20s plank', 'Rest 60s between rounds', 'Focus on form, not speed'], reflection: 'Which exercise felt hardest?' },
    { day: 3, title: 'Active recovery', focus: 'Mobility', durationMinutes: 10, instructions: ['10-minute stretching routine module', 'Walk 10 minutes', 'Hydrate — 2 glasses before lunch'], reflection: 'How does recovery feel vs day 2?' },
    { day: 4, title: 'Build the habit', focus: 'Consistency', durationMinutes: 18, instructions: ['Repeat day 2 circuit + add 5 min walk', 'Schedule workouts in calendar as appointments', 'Lay out clothes/shoes the night before'], reflection: 'What time of day works best?' },
    { day: 5, title: 'Cardio push', focus: 'Heart', durationMinutes: 20, instructions: ['20-minute walk with 3×1-minute faster intervals', 'Cool down stretch', 'Log how you feel 1–10'], reflection: 'Did intervals feel manageable?' },
    { day: 6, title: 'Full body', focus: 'Integration', durationMinutes: 20, instructions: ['Workout Library guided session — bodyweight circuit', 'Modify exercises as needed', 'Celebrate showing up'], reflection: 'What would make next week easier?' },
    { day: 7, title: 'Week one complete', focus: 'Review', durationMinutes: 15, instructions: ['Review step count trend', 'Set next week\'s 3 session days', 'Choose one progression — +2 reps or +5 min walk'], reflection: 'Biggest win this week?' },
  ],
  mindfulness_21: [
    { day: 1, title: 'First breath', focus: 'Attention', durationMinutes: 3, instructions: ['3-minute breath-focus meditation', 'Count breaths 1–10, restart when distracted', 'Same time and place daily builds the habit'], reflection: 'How many times did attention wander?' },
    { day: 2, title: 'Gentle expansion', focus: 'Duration', durationMinutes: 5, instructions: ['5-minute breath meditation', 'Notice sounds without labelling good/bad', 'One mindful meal — no screens'], reflection: 'What did you notice while eating?' },
    { day: 3, title: 'Body awareness', focus: 'Sensation', durationMinutes: 7, instructions: ['Body scan meditation 7 minutes', 'Pause three times today for one conscious breath', 'Brief walk noticing feet on ground'], reflection: 'Where did you feel calm in the body?' },
    { day: 4, title: 'Open awareness', focus: 'Thoughts', durationMinutes: 8, instructions: ['Open awareness practice 8 minutes', 'Label thoughts "thinking" and return to breath', 'Journal one line about mood'], reflection: 'Are thoughts louder on stressful days?' },
    { day: 5, title: 'Loving-kindness', focus: 'Compassion', durationMinutes: 7, instructions: ['Loving-kindness meditation for self and someone neutral', 'Offer yourself one kind phrase today', 'Reduce multitasking by 20%'], reflection: 'How did kindness practice feel?' },
    { day: 6, title: 'Everyday mindfulness', focus: 'Integration', durationMinutes: 10, instructions: ['One routine activity done with full attention (shower, tea, walk)', '10-minute sit', 'Notice urge to rush — slow one task'], reflection: 'Which routine suits mindful attention?' },
    { day: 7, title: 'Week one reflection', focus: 'Habit', durationMinutes: 10, instructions: ['Review sessions completed', 'Pick default technique for busy days', 'Plan next week\'s daily slot'], reflection: 'What surprised you about practice?' },
  ],
  nutrition_foundations: [
    { day: 1, title: 'Hydration baseline', focus: 'Foundation', durationMinutes: 5, instructions: ['Log water intake in Hydration Tracker — aim for 6–8 glasses', 'Drink one glass before each main meal', 'Replace one sugary drink with water or herbal tea'], reflection: 'How often do you drink without noticing thirst?' },
    { day: 2, title: 'Protein at breakfast', focus: 'Macros', durationMinutes: 8, instructions: ['Include 20g+ protein at breakfast (eggs, yogurt, or tofu)', 'Pair with fibre — oats, fruit, or wholegrain toast', 'Notice energy levels 2 hours after eating'], reflection: 'Did protein reduce mid-morning hunger?' },
    { day: 3, title: 'Colour on your plate', focus: 'Vegetables', durationMinutes: 10, instructions: ['Add two different coloured vegetables to lunch and dinner', 'Aim for half the plate as plants at one meal', 'Try one new vegetable or preparation method'], reflection: 'Which veg did you enjoy most?' },
    { day: 4, title: 'Mindful eating', focus: 'Awareness', durationMinutes: 12, instructions: ['One meal eaten without screens — chew slowly', 'Rate hunger 1–10 before and after eating', 'Stop at comfortable fullness, not stuffed'], reflection: 'Did you notice fullness cues earlier?' },
    { day: 5, title: 'Smart snacking', focus: 'Balance', durationMinutes: 7, instructions: ['Plan two protein+fibre snacks (e.g. apple + nut butter)', 'Pre-portion snacks to avoid grazing', 'Hydrate before reaching for a snack'], reflection: 'Were you hungry or bored?' },
    { day: 6, title: 'Meal prep lite', focus: 'Planning', durationMinutes: 20, instructions: ['Open Meal Planner — build tomorrow\'s meals', 'Prep one batch item (grains, roasted veg, or protein)', 'Write a short grocery list for 3 days'], reflection: 'What saved the most time?' },
    { day: 7, title: 'Week one review', focus: 'Habits', durationMinutes: 10, instructions: ['Review which nutrition habit felt easiest', 'Keep two habits for week two', 'Read Nutrition Basics guide in Fitness Hub'], reflection: 'One food change to protect this week?' },
  ],
  anxiety_toolkit: [
    { day: 1, title: 'Grounding anchor', focus: 'Safety', durationMinutes: 6, instructions: ['Practice 5-4-3-2-1 grounding when anxiety rises', 'Name 5 things you see, 4 hear, 3 feel, 2 smell, 1 taste', 'Box breathing for 4 cycles after grounding'], reflection: 'Did grounding shift intensity even slightly?' },
    { day: 2, title: 'Worry time box', focus: 'Thoughts', durationMinutes: 10, instructions: ['Schedule 15 minutes as designated "worry time"', 'Write worries on paper — postpone outside that window', 'Close the session with 3 calm breaths'], reflection: 'Were worries easier to contain?' },
    { day: 3, title: 'Breath for anxiety', focus: 'Physiology', durationMinutes: 8, instructions: ['Extended exhale breathing: inhale 4, exhale 6 — 5 minutes', 'Relax jaw and drop shoulders on each exhale', 'Use before a known trigger if possible'], reflection: 'Where do you hold anxiety in the body?' },
    { day: 4, title: 'Thought challenge', focus: 'CBT', durationMinutes: 12, instructions: ['Pick one anxious thought — write evidence for and against', 'Ask: "What would I tell a friend?"', 'Create a balanced alternative thought'], reflection: 'How realistic was the original thought?' },
    { day: 5, title: 'Gentle exposure', focus: 'Courage', durationMinutes: 15, instructions: ['Choose one small avoided task (call, email, short outing)', 'Break into smallest step and complete it', 'Celebrate completion — avoidance feeds anxiety'], reflection: 'What was worse: anticipation or action?' },
    { day: 6, title: 'Body release', focus: 'Somatic', durationMinutes: 12, instructions: ['10-minute walk or progressive muscle relaxation', 'Shake out hands and arms for 30 seconds', 'Limit caffeine after 2pm'], reflection: 'Did movement change mental state?' },
    { day: 7, title: 'Toolkit review', focus: 'Plan', durationMinutes: 10, instructions: ['Rank tools: grounding, breathing, worry time, thought challenge', 'Pick your go-to for acute moments', 'Share one coping strategy with someone you trust'], reflection: 'Anxiety 1–10 now vs day 1?' },
  ],
  heart_health: [
    { day: 1, title: 'Know your numbers', focus: 'Baseline', durationMinutes: 8, instructions: ['Log resting heart rate in Health dashboard if available', 'Record one blood pressure reading in BP Tracker', 'Note current activity level honestly'], reflection: 'Any surprises in your baseline?' },
    { day: 2, title: 'Brisk walk', focus: 'Cardio', durationMinutes: 20, instructions: ['20-minute brisk walk — able to talk, not sing', 'Warm up 3 minutes, cool down 3 minutes', 'Track steps if possible'], reflection: 'How did you feel after?' },
    { day: 3, title: 'Salt awareness', focus: 'Nutrition', durationMinutes: 5, instructions: ['Read labels on 3 packaged foods you eat often', 'Cook one meal without added salt — use herbs instead', 'Aim for <6g sodium daily (check Nutrition Basics)'], reflection: 'Where does most salt hide in your diet?' },
    { day: 4, title: 'Stress & heart', focus: 'Recovery', durationMinutes: 10, instructions: ['10-minute meditation or breathing session', 'Identify one stressor to boundary today', 'Prioritise 7+ hours sleep tonight'], reflection: 'How does stress show up physically?' },
    { day: 5, title: 'Cardio intervals', focus: 'Progression', durationMinutes: 22, instructions: ['Walk 5 min warm-up, then 5×1-min faster / 1-min easy', 'Cool down 5 minutes', 'Hydrate before and after'], reflection: 'Could you sustain the faster pace?' },
    { day: 6, title: 'Heart-healthy meal', focus: 'Food', durationMinutes: 15, instructions: ['One meal rich in omega-3, fibre, and vegetables', 'Limit processed meats and fried foods today', 'Use Meal Planner for a balanced option'], reflection: 'What heart-healthy swap felt easy?' },
    { day: 7, title: 'Week one check-in', focus: 'Trends', durationMinutes: 10, instructions: ['Review BP and activity trends', 'Set 3 weekly cardio sessions for next week', 'Book GP review if BP consistently elevated'], reflection: 'One habit to protect heart health?' },
  ],
  desk_breaker: [
    { day: 1, title: 'Neck & shoulders', focus: 'Upper body', durationMinutes: 5, instructions: ['Neck rolls and shoulder shrugs — 2 minutes each side', 'Chin tucks: 10 reps', 'Set hourly movement reminder'], reflection: 'Where is desk tension worst?' },
    { day: 2, title: 'Hip opener', focus: 'Lower body', durationMinutes: 6, instructions: ['Standing hip flexor stretch 30s per side', 'Seated figure-4 glute stretch', 'Stand for one phone call today'], reflection: 'Did hips feel less stiff?' },
    { day: 3, title: 'Posture reset', focus: 'Alignment', durationMinutes: 5, instructions: ['Wall angels: 10 reps against a wall', 'Adjust monitor to eye level', 'Feet flat, elbows at 90° when typing'], reflection: 'What posture cue helps most?' },
    { day: 4, title: 'Walk break', focus: 'Movement', durationMinutes: 10, instructions: ['10-minute walk away from desk', 'No phone — notice surroundings', 'Drink water before returning'], reflection: 'Did focus improve after the break?' },
    { day: 5, title: 'Wrist & hands', focus: 'Prevention', durationMinutes: 5, instructions: ['Wrist circles and finger stretches', 'Shake hands loose every hour', 'Check keyboard/mouse ergonomics'], reflection: 'Any tingling or numbness to monitor?' },
    { day: 6, title: 'Full desk flow', focus: 'Integration', durationMinutes: 8, instructions: ['Combine neck, hip, and posture drills — one 8-min circuit', 'Use Stretching module for guided options', 'Stack breaks after meetings'], reflection: 'Best time of day for mobility?' },
    { day: 7, title: 'Sustainable routine', focus: 'Habit', durationMinutes: 5, instructions: ['Pick 3 desk breaks to repeat daily', 'Share routine with a colleague for accountability', 'Review week — less stiffness 1–10?'], reflection: 'Which break had biggest impact?' },
  ],
};

function templateLesson(programId: string, day: number, totalDays: number): ProgramDayLesson {
  const phase = day <= 7 ? 'Foundation' : day <= 14 ? 'Building' : day <= 21 ? 'Deepening' : 'Mastery';
  const titles: Record<string, string[]> = {
    stress_reset_30: ['Breath reset', 'Mindful pause', 'Movement release', 'Gratitude note', 'Boundary practice'],
    sleep_improvement: ['Sleep hygiene check', 'Wind-down practice', 'Light exposure', 'Evening routine', 'Sleep log review'],
    fitness_kickstart: ['Active session', 'Mobility flow', 'Strength circuit', 'Cardio walk', 'Recovery stretch'],
    nutrition_foundations: ['Hydration focus', 'Protein at breakfast', 'Vegetable serving', 'Mindful meal', 'Meal plan prep'],
    mindfulness_21: ['Breath anchor', 'Body scan', 'Open awareness', 'Loving-kindness', 'Everyday mindfulness'],
    weight_management: ['Food awareness', 'Movement snack', 'Portion check-in', 'Stress-eating pause', 'Weekly weigh-in reflection'],
    heart_health: ['Brisk walk', 'Blood pressure log', 'Salt awareness', 'Cardio interval', 'Heart-healthy meal'],
    desk_breaker: ['Neck mobility', 'Hip opener', 'Posture reset', 'Walk break', 'Desk stretch combo'],
    anxiety_toolkit: ['Grounding practice', 'Worry time box', 'Breath for anxiety', 'Thought challenge', 'Exposure step'],
    hydration_habit: ['Morning water', 'Midday top-up', 'Pre-meal glass', 'Afternoon check', 'Evening tally'],
    strength_builder: ['Push pattern', 'Pull pattern', 'Leg strength', 'Core stability', 'Full body circuit'],
    womens_wellness: ['Cycle check-in', 'Gentle movement', 'Iron-rich meal', 'Rest prioritisation', 'Symptom log'],
  };
  const pool = titles[programId] ?? ['Wellness practice', 'Mindful check-in', 'Movement break', 'Nutrition focus', 'Recovery'];
  const title = pool[(day - 1) % pool.length];
  return {
    day,
    title: `Day ${day}: ${title}`,
    focus: phase,
    durationMinutes: day <= 7 ? 10 : day <= 14 ? 12 : 15,
    instructions: [
      `Open today's focus: ${title.toLowerCase()} (${phase} phase)`,
      'Complete the linked module or exercise in Fitness Hub',
      `Day ${day} of ${totalDays} — consistency compounds results`,
    ],
    reflection: `What is one small win from day ${day}?`,
  };
}

export function getProgramDayLesson(
  programId: string,
  dayNumber: number,
  totalDays: number,
): ProgramDayLesson {
  const day = Math.min(Math.max(1, dayNumber), totalDays);
  const weekOne = WEEK_ONE[programId];
  if (weekOne) {
    const explicit = weekOne.find((l) => l.day === day);
    if (explicit) return explicit;
  }
  return templateLesson(programId, day, totalDays);
}

export function getTodayProgramDay(completedDays: number, totalDays: number): number {
  return Math.min(completedDays + 1, totalDays);
}

export function getRecommendedProgramId(primaryGoal?: string | null): string {
  const map: Record<string, string> = {
    sleep: 'sleep_improvement',
    stress: 'stress_reset_30',
    fitness: 'fitness_kickstart',
    nutrition: 'nutrition_foundations',
    mental: 'anxiety_toolkit',
    habits: 'mindfulness_21',
    condition: 'heart_health',
    clinician: 'heart_health',
    general: 'stress_reset_30',
  };
  return map[primaryGoal ?? 'general'] ?? 'stress_reset_30';
}
