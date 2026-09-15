import type { HologramKeepHealthyGuide } from '../types/hologramTutor';

const HEART: HologramKeepHealthyGuide = {
  organName: 'Heart',
  howToKeepHealthy:
    'Your heart works every minute of the day. Keep blood pressure, cholesterol, and weight in a healthy range, move most days, and give it a calm night of sleep. Small daily habits protect it more than occasional intense effort.',
  foods: [
    'Oily fish such as salmon, sardines, or mackerel (omega-3s)',
    'Leafy greens — spinach, kale, rocket',
    'Oats, barley, and other whole grains',
    'Berries, tomatoes, and colourful vegetables',
    'Nuts, seeds, extra-virgin olive oil, and avocado',
    'Limit ultra-processed food, fried food, and excess salt',
  ],
  fluids: [
    'Water through the day (about 6–8 glasses, more if you exercise)',
    'Unsalted tea or coffee in modest amounts',
    'Hibiscus or green tea if you enjoy them',
    'Skip sugary drinks and energy drinks',
    'If you drink alcohol, keep it light or skip it',
  ],
  exercise: [
    '150 minutes a week of brisk walking, cycling, or swimming',
    'Add hills, intervals, or a light jog as fitness allows',
    '2 sessions of strength training for arms, legs, and core',
    'Stand and walk after sitting for long stretches',
  ],
  rest: [
    'Aim for 7–9 hours of sleep most nights',
    'Keep a wind-down hour without screens',
    'Use slow breathing or a short walk to settle stress',
    'Take easy days after hard workouts — the heart recovers then',
  ],
};

const HEART_LUNGS: HologramKeepHealthyGuide = {
  organName: 'Heart & lungs',
  howToKeepHealthy:
    'The heart and lungs share one job: move oxygen. Clean air, steady cardio, and not smoking do more for this pair than any single food. Train them together with walking, cycling, or swimming, then let them recover overnight.',
  foods: [
    'Antioxidant-rich fruit — berries, apples, citrus',
    'Leafy greens and tomatoes (lycopene supports lung tissue)',
    'Oily fish and olive oil to ease inflammation',
    'Nuts, seeds, and whole grains',
    'Go easy on processed meat and very salty meals',
  ],
  fluids: [
    'Water first — thin mucus and support circulation',
    'Warm herbal teas if your chest feels tight or dry',
    'Green tea in moderation',
    'Avoid sugary sodas and excess alcohol',
  ],
  exercise: [
    'Brisk walking most days, building toward 30 minutes',
    'Cycling or swimming for joint-friendly cardio',
    'Diaphragmatic breathing: 5 slow breaths, a few times a day',
    'Light strength work so posture supports easy breathing',
  ],
  rest: [
    'Sleep 7–9 hours in a room that is dark and not stuffy',
    'Keep airways clearer: no smoke, and ventilate cooking fumes',
    'Rest after chest infections — return to exercise gradually',
    'Short outdoor breaks in cleaner air when you can',
  ],
};

const BRAIN: HologramKeepHealthyGuide = {
  organName: 'Brain',
  howToKeepHealthy:
    'The brain thrives on sleep, movement, and steady blood flow. What is good for the heart is usually good for the mind. Protect it from injury, keep learning, and do not skip rest — that is when memory consolidates.',
  foods: [
    'Oily fish, walnuts, and flax for omega-3s',
    'Leafy greens and colourful vegetables',
    'Berries and dark chocolate (70%+ cocoa) in small amounts',
    'Eggs, beans, and other protein for focus',
    'Whole grains instead of sugar spikes',
  ],
  fluids: [
    'Water regularly — even mild dehydration dulls focus',
    'Tea or coffee earlier in the day, not late at night',
    'Limit energy drinks and heavy alcohol',
  ],
  exercise: [
    'Daily walking — it raises blood flow to the brain',
    'Mix cardio with light strength 2 times a week',
    'Balance work (tai chi, yoga, or single-leg stands)',
    'Mental exercise: reading, puzzles, or learning a skill',
  ],
  rest: [
    'Protect 7–9 hours of sleep — it is not optional for memory',
    'Keep a consistent bedtime, including weekends',
    'Take short breaks from screens during the day',
    'Use quiet time or breathing to lower stress load',
  ],
};

const LUNGS: HologramKeepHealthyGuide = {
  organName: 'Lungs',
  howToKeepHealthy:
    'Lungs stay healthier in clean air and with regular use. Do not smoke, keep indoor air moving, and train breath with walking or swimming. Vaccinations and hand hygiene cut the infections that scar lung tissue over time.',
  foods: [
    'Apples, berries, and citrus for antioxidants',
    'Tomatoes, carrots, and orange vegetables',
    'Leafy greens and cruciferous veg (broccoli, cabbage)',
    'Oily fish and nuts for vitamin E and omega-3s',
    'Garlic and ginger if they sit well with you',
  ],
  fluids: [
    'Water throughout the day to keep airways moist',
    'Warm herbal teas (ginger, peppermint, honey-lemon if suitable)',
    'Avoid sugary drinks and excess alcohol',
  ],
  exercise: [
    'Brisk walking or cycling most days',
    'Swimming — excellent for breath control',
    'Pursed-lip and belly breathing practice',
    'Light upper-back and posture work so the chest can expand',
  ],
  rest: [
    'Sleep with a clear airway — treat snoring or congestion',
    'Rest fully when you have a chest cold',
    'Air the room; avoid smoke and strong fumes',
    'Pause outdoor hard exercise on high-pollution days',
  ],
};

const STOMACH: HologramKeepHealthyGuide = {
  organName: 'Stomach & digestion',
  howToKeepHealthy:
    'The stomach likes rhythm: regular meals, slow chewing, and not lying down right after eating. Fibre, plants, and calm mealtimes help more than harsh “cleanses”. Protect the lining by going easy on alcohol, smoking, and frequent painkillers unless a clinician advises otherwise.',
  foods: [
    'Fibre from oats, beans, fruit, and vegetables',
    'Yoghurt, kefir, or other fermented foods if you tolerate them',
    'Lean protein and whole grains',
    'Ginger and cooked vegetables if raw salads bother you',
    'Limit very spicy, very fatty, or late heavy meals if they trigger reflux',
  ],
  fluids: [
    'Water between meals more than huge gulps with food',
    'Herbal teas such as ginger or peppermint (skip peppermint if you reflux)',
    'Go easy on coffee, fizzy drinks, and alcohol',
  ],
  exercise: [
    'A 10–15 minute walk after meals aids emptying',
    'Regular moderate cardio most days',
    'Core and posture work without straining after a big meal',
    'Avoid intense workouts on a full stomach',
  ],
  rest: [
    'Leave 2–3 hours between the last meal and bed',
    'Sleep slightly elevated if you get night reflux',
    'Eat in a calm setting — stress tightens the gut',
    'Keep meal times roughly consistent',
  ],
};

const BONES: HologramKeepHealthyGuide = {
  organName: 'Bones & skeleton',
  howToKeepHealthy:
    'Bone is living tissue. It stays denser with impact and load — walking, stairs, and strength work — plus calcium, vitamin D, and protein. Smoking and heavy drinking work against it. Balance training now prevents falls later.',
  foods: [
    'Dairy or fortified plant milks for calcium',
    'Sardines, tofu, leafy greens, and almonds',
    'Protein at each meal — fish, eggs, beans, yoghurt',
    'Vitamin D sources: oily fish, eggs, fortified foods',
    'Go easy on very salty processed food',
  ],
  fluids: [
    'Water to support joints and daily movement',
    'Milk or fortified alternatives as part of calcium intake',
    'Limit sugary sodas; keep alcohol light',
  ],
  exercise: [
    'Weight-bearing: walking, hiking, dancing, or light jogging',
    'Strength training 2–3 times a week (legs, back, arms)',
    'Balance: tandem stance, tai chi, or heel-to-toe walks',
    'Stairs instead of the lift when it is safe',
  ],
  rest: [
    'Sleep 7–9 hours — bone remodelling happens at night',
    'Rest a stressed joint, then return to gentle load',
    'Get outdoor daylight for vitamin D when you can',
    'Do not skip rest days after heavy lifting',
  ],
};

const MUSCLES: HologramKeepHealthyGuide = {
  organName: 'Muscles',
  howToKeepHealthy:
    'Muscle is built in training and repaired at rest. Combine strength work with everyday movement, eat enough protein, and drink water. Stretch what you load. Soreness that fades in a day or two is normal; sharp pain is a stop sign.',
  foods: [
    'Protein at each meal — fish, chicken, eggs, yoghurt, beans, tofu',
    'Carbohydrates around training: oats, rice, fruit, potatoes',
    'Colourful vegetables for recovery',
    'Nuts and seeds for extra calories if you train hard',
  ],
  fluids: [
    'Water before, during, and after activity',
    'A pinch of electrolytes in long hot sessions',
    'Milk or a protein drink after strength work if it fits your plan',
    'Limit alcohol, which slows repair',
  ],
  exercise: [
    'Strength training 2–3 days a week, all major groups',
    'Daily walking plus one cardio session you enjoy',
    'Warm up 5 minutes; stretch after, not ice-cold',
    'Progress slowly — add load when the last set feels solid',
  ],
  rest: [
    '48 hours before repeating the same intense muscle group',
    '7–9 hours of sleep for growth and repair',
    'Easy movement (walk, mobility) on rest days',
    'Stop if pain is sharp, one-sided, or worsening',
  ],
};

const WHOLE_BODY: HologramKeepHealthyGuide = {
  organName: 'Whole body',
  howToKeepHealthy:
    'This figure is muscle, bone, and organs working as one. Keep the whole system healthy with mixed movement, plants-forward meals, water, and real sleep. Train hard enough to adapt, then recover enough to come back.',
  foods: [
    'A plate with protein, plants, and whole grains most meals',
    'Oily fish or plant omega-3s a few times a week',
    'Dairy or fortified alternatives for bone',
    'Fruit and nuts as everyday snacks',
    'Cut back on ultra-processed and very salty food',
  ],
  fluids: [
    'Water as the default drink',
    'Tea or coffee in the morning if you like them',
    'Keep sugary drinks and excess alcohol rare',
  ],
  exercise: [
    'Walk every day',
    'Two strength sessions a week',
    'One longer cardio session (cycle, swim, hike)',
    'Mobility or stretching a few times a week',
  ],
  rest: [
    'Sleep 7–9 hours on a regular schedule',
    'At least one lighter day each week',
    'Stress tools: breathing, a walk, or time outdoors',
    'See a clinician for pain that does not settle',
  ],
};

export const HOLOGRAM_KEEP_HEALTHY: Record<string, HologramKeepHealthyGuide> = {
  'heart-hologram': HEART,
  'heart-lungs-hologram': HEART_LUNGS,
  'heart-conduction-system': HEART_LUNGS,
  'brain-model': BRAIN,
  'lung-model': LUNGS,
  'stomach-model': STOMACH,
  'skeleton-model': BONES,
  'muscle-model': MUSCLES,
  'anatomy-study': WHOLE_BODY,
};

export function getHologramKeepHealthy(modelId: string): HologramKeepHealthyGuide {
  return HOLOGRAM_KEEP_HEALTHY[modelId] ?? WHOLE_BODY;
}
