import { FITNESS_MODULES } from './fitnessData';
import { BATCH3_HEALTH_TOPIC_CONTENT } from './healthTopicContentBatch3';

export type HealthTopicSection = { heading: string; body: string };
export type HealthTopicContent = { sections: HealthTopicSection[] };

export const HEALTH_TOPIC_ALIASES: Record<string, string> = {
  'sleep-science': 'sleep-recovery',
  'stress-management': 'stress-mindfulness',
  'high-bp': 'hypertension',
  'long-covid': 'long-covid-ext',
  'smoking-cessation': 'smoking-cessation-ext',
  'posture-analyzer': 'posture-analyzer-tool',
};

function s(heading: string, body: string): HealthTopicSection {
  return { heading, body };
}

function topic(...sections: HealthTopicSection[]): HealthTopicContent {
  return { sections };
}

/** Explicit content keyed by module id */
const HEALTH_TOPIC_CONTENT: Record<string, HealthTopicContent> = {
  vitamins: topic(
    s('Food first', 'A balanced diet should provide most vitamins. Supplements fill gaps when diet, lifestyle, or health conditions make it hard to get enough.'),
    s('Common supplements', 'Vitamin D (especially in winter in the UK), B12 (plant-based diets), iron (if deficient), and omega-3 are among the most discussed with GPs.'),
    s('Before you buy', 'Check with a pharmacist or GP — some supplements interact with medications.'),
  ),
  'nutrition-basics': topic(
    s('Plate balance', 'Half your plate vegetables, a quarter lean protein, a quarter whole grains — a simple framework for most meals.'),
    s('Energy & recovery', 'Regular meals with protein and fibre help stabilise blood sugar, supporting steady energy and faster recovery after activity.'),
    s('Consistency beats perfection', 'Small sustainable changes outperform strict diets you cannot maintain.'),
  ),
  'sleep-recovery': topic(
    s('Why sleep matters', 'Sleep repairs tissue, consolidates memory, and regulates hormones. Chronic short sleep raises risk of weight gain, diabetes, and low mood.'),
    s('Sleep hygiene', '• Consistent bed/wake times\n• Dark, cool bedroom\n• Limit screens 1 hour before bed\n• Avoid caffeine after 2pm'),
    s('Track your debt', 'Use the Sleep Debt Calculator in Fitness Hub to see how much rest you need to catch up on.'),
  ),
  'stress-mindfulness': topic(
    s('Nervous system basics', 'Stress activates your sympathetic ("fight or flight") system. Calming techniques activate the parasympathetic ("rest and digest") response.'),
    s('Evidence-based tools', '• Box breathing (4-4-4-4)\n• 10-minute walks\n• Brief meditation\n• Journalling\n• Social connection'),
    s('Try it now', 'Open Breathing Exercises or Meditation Timer from the Fitness Hub for guided practice.'),
  ),
  hydration: topic(
    s('Why hydration matters', 'Water supports circulation, temperature regulation, joint lubrication, and cognitive performance.'),
    s('Daily targets', 'Most adults need around 1.5–2 litres of fluids daily, more with exercise or hot weather.'),
    s('Track it', 'Use the Hydration Tracker in Fitness Hub to log intake and build a consistent habit.'),
  ),
  'gut-health': topic(
    s('Your gut microbiome', 'Trillions of bacteria in your digestive tract influence immunity, mood, and nutrient absorption.'),
    s('Fiber & fermented foods', 'Aim for 30g fibre daily from whole grains, beans, vegetables, and fruit.'),
    s('When to see a GP', 'Persistent bloating, pain, blood in stool, or unexplained weight loss warrant medical review.'),
  ),
  'heart-health': topic(
    s('Cardiovascular basics', 'Your heart pumps blood carrying oxygen and nutrients. Keeping arteries flexible and blood pressure in range reduces long-term risk.'),
    s('Blood pressure', 'Ideal is around 120/80 mmHg or lower. Reduce salt, stay active, manage weight and stress.'),
    s('Track & act', 'Connect Apple Health or Health Connect to see heart rate in the app.'),
  ),
  'exercise-fundamentals': topic(
    s('Start safely', 'Begin with a 5–10 minute warm-up — light movement that raises heart rate and loosens joints.'),
    s('Building a routine', 'Aim for 150 minutes moderate activity weekly (UK guidelines). Mix cardio, strength, and flexibility.'),
    s('Recovery days', 'Muscles adapt during rest. Schedule at least 1–2 lighter days per week.'),
  ),
  'protein-recovery': topic(
    s('Why protein matters', 'Protein provides amino acids for muscle repair, immune function, and hormone production.'),
    s('How much?', 'Most adults need 0.8g per kg body weight daily; active people often benefit from 1.2–1.6g/kg.'),
    s('Good sources', 'Chicken, fish, eggs, dairy, legumes, tofu, and nuts.'),
  ),
  'healthy-habits': topic(
    s('Small steps stick', 'Habits form through repetition. Start with one change before adding more.'),
    s('Stack & anchor', 'Link new habits to existing ones: "After I brush my teeth, I stretch for 2 minutes."'),
    s('Forgive slip-ups', 'Missing a day does not reset progress. Return the next day.'),
  ),
  'back-pain': topic(
    s('Overview', 'Lower back pain affects 80% of adults at some point. Most cases resolve within 6 weeks with the right approach.'),
    s('Movement is medicine', 'Gentle walking, swimming, and targeted exercises help far more than bed rest.'),
    s('When to see a doctor', 'Seek urgent care for bladder/bowel changes, leg weakness, or numbness in the groin.'),
  ),
  stretching: topic(
    s('Why stretch?', 'Regular stretching improves flexibility, reduces injury risk, and relieves tension from prolonged sitting.'),
    s('Getting started', 'Hold each stretch 20–30 seconds without bouncing. Stop if you feel sharp pain.'),
  ),

  // Core education modules
  anxiety: topic(
    s('Understanding anxiety', 'Anxiety is a normal alarm system that can become overactive. Physical symptoms include racing heart, tension, and restlessness.'),
    s('Self-management', '• Slow breathing\n• Limit caffeine\n• Regular exercise\n• Sleep routine\n• Challenge catastrophic thoughts'),
    s('Professional support', 'CBT and talking therapies are highly effective. Contact your GP if anxiety limits daily life.'),
  ),
  depression: topic(
    s('Recognising depression', 'Persistent low mood, loss of interest, fatigue, and sleep changes lasting 2+ weeks may indicate depression — not weakness.'),
    s('What helps', 'Activity scheduling, social contact, sleep regularity, and daylight exposure support recovery alongside treatment.'),
    s('Get help', 'Speak to your GP or NHS 111. Crisis lines are available 24/7 if you have thoughts of self-harm.'),
  ),
  'stress-disorders': topic(
    s('Stress and the body', 'Chronic stress keeps the nervous system in fight-or-flight mode. Over weeks and months this can trigger headaches, jaw tension, gut upset, muscle pain, and burnout — even when you feel you are “coping fine” on the surface.'),
    s('Mind–body symptoms', '• Tension headaches and neck pain\n• IBS-like gut symptoms\n• Chest tightness and rapid heartbeat\n• Fatigue that rest does not fix\n• Brain fog and irritability'),
    s('Breaking the cycle', 'Map your triggers, protect sleep, set boundaries, and use brief daily recovery practices (breathing, walks, body scans). Small consistent resets beat occasional long breaks.'),
    s('When to seek help', 'See your GP if symptoms persist beyond 4 weeks, worsen despite lifestyle changes, or significantly affect work and relationships. Talking therapies and medical review are effective.'),
    s('Related tools', 'Use Breathing Exercises, Stress Assessment, and Chronic Stress Response modules in Fitness Hub.'),
  ),
  insomnia: topic(
    s('When sleep fails', 'Insomnia includes difficulty falling asleep, staying asleep, or waking too early — often linked to stress, pain, or irregular schedules.'),
    s('CBT-I principles', 'Fixed wake time, stimulus control (bed for sleep only), and wind-down routines are first-line treatments.'),
    s('Medical review', 'See a GP if insomnia persists beyond 3 months or if you snore heavily or gasp at night.'),
  ),
  'neck-pain': topic(
    s('Common causes', 'Poor desk posture, phone use, whiplash, and stress-related tension are frequent triggers.'),
    s('Relief strategies', 'Gentle neck mobility, heat, ergonomic setup, and strengthening deep neck flexors.'),
    s('Red flags', 'Seek urgent care for arm weakness, numbness, or pain after significant trauma.'),
  ),
  'chronic-stress': topic(
    s('Sympathetic overload', 'Prolonged fight-or-flight keeps cortisol elevated, impairing immunity, sleep, and mood.'),
    s('Recovery practices', 'Daily parasympathetic activation: breathing, nature walks, social connection, and deliberate rest.'),
    s('Lifestyle pillars', 'Sleep, movement, nutrition, and boundary-setting are non-negotiable foundations.'),
  ),
  menopause: topic(
    s('What changes', 'Declining oestrogen can cause hot flushes, sleep disruption, mood shifts, and joint stiffness.'),
    s('Management options', 'Lifestyle changes, HRT (discuss risks/benefits with GP), and non-hormonal treatments for specific symptoms.'),
    s('Bone & heart health', 'Weight-bearing exercise, calcium, vitamin D, and cardiovascular monitoring become especially important.'),
  ),
  diabetes: topic(
    s('Type 1 vs type 2', 'Type 1 is autoimmune; type 2 is linked to insulin resistance and lifestyle factors. Both need active management.'),
    s('Daily management', 'Monitor blood glucose, take medications as prescribed, eat regular balanced meals, and stay active.'),
    s('Complications prevention', 'Control HbA1c, blood pressure, and cholesterol. Annual foot and eye checks via your diabetes team.'),
  ),

  // Cardiovascular
  'heart-attack-prevention': topic(
    s('Know your risks', 'Smoking, high BP, diabetes, obesity, family history, and inactivity are major modifiable factors.'),
    s('Lifestyle prevention', 'Mediterranean-style diet, 150 min weekly activity, stress management, and not smoking.'),
    s('Act on symptoms', 'Chest pressure, arm/jaw pain, breathlessness, or cold sweat — call 999 immediately.'),
  ),
  'chest-pain': topic(
    s('Types of chest pain', 'Musculoskeletal, reflux, anxiety, and cardiac causes can feel similar — context matters.'),
    s('Emergency signs', 'Crushing pain, radiation to arm/jaw, sweating, nausea, or breathlessness = call 999.'),
    s('Non-urgent care', 'Intermittent pain with movement or palpable tenderness may be musculoskeletal — still see a GP if unsure.'),
  ),
  'heart-disease': topic(
    s('Overview', 'Coronary artery disease narrows blood supply to the heart. Early lifestyle change slows progression.'),
    s('Monitoring', 'Track blood pressure, cholesterol, weight, and activity. Take prescribed medications consistently.'),
    s('Cardiac rehab', 'Structured exercise and education after a heart event significantly improve outcomes.'),
  ),
  arrhythmias: topic(
    s('What they are', 'Irregular heartbeats range from harmless extras to conditions like atrial fibrillation requiring treatment.'),
    s('Symptoms', 'Palpitations, dizziness, breathlessness, or fainting warrant medical evaluation.'),
    s('Triggers', 'Caffeine, alcohol, dehydration, thyroid issues, and sleep apnoea can provoke arrhythmias.'),
  ),
  hypertension: topic(
    s('Silent risk', 'High blood pressure often has no symptoms but damages arteries, kidneys, and the heart over time.'),
    s('Targets', 'Most adults aim for below 140/90 — lower if you have diabetes or kidney disease.'),
    s('Lifestyle levers', 'Reduce salt, increase potassium-rich foods, exercise, limit alcohol, manage weight and stress.'),
  ),
  cholesterol: topic(
    s('LDL vs HDL', 'High LDL ("bad") cholesterol builds plaque in arteries. HDL ("good") helps remove it.'),
    s('Diet', 'Reduce saturated fat, increase soluble fibre (oats, beans), and include healthy fats from fish and nuts.'),
    s('Medication', 'Statins are effective when lifestyle alone is insufficient — discuss with your GP.'),
  ),
  'stroke-tia': topic(
    s('FAST signs', 'Face drooping, Arm weakness, Speech difficulty, Time to call 999.'),
    s('TIA warning', 'Transient ischaemic attacks are mini-strokes — urgent assessment prevents a major stroke.'),
    s('Prevention', 'Control BP, AF, diabetes, cholesterol; do not smoke; stay active.'),
  ),
  'cardiovascular-assessment': topic(
    s('Self-check basics', 'Know resting heart rate, blood pressure trends, and activity minutes weekly.'),
    s('Risk factors', 'Review family history, smoking, weight, and metabolic markers with your GP.'),
    s('Next steps', 'Use heart rate and blood pressure trackers in Fitness Hub to log readings.'),
  ),

  // Metabolic
  hypoglycaemia: topic(
    s('Low blood sugar', 'Common in diabetes treatment — symptoms include shakiness, sweating, confusion, and irritability.'),
    s('Rule of 15', 'Take 15g fast-acting carbs, wait 15 minutes, recheck. Follow with a snack if due a meal.'),
    s('Prevention', 'Regular meals, match insulin to carbs, and carry glucose tablets when at risk.'),
  ),
  'metabolic-syndrome': topic(
    s('The cluster', 'Waist obesity plus 2 of: high BP, high triglycerides, low HDL, or raised fasting glucose.'),
    s('Why it matters', 'Strongly linked to type 2 diabetes and heart disease — but largely reversible with lifestyle.'),
    s('Action plan', 'Weight loss of 5–10%, daily walking, and Mediterranean dietary pattern.'),
  ),
  obesity: topic(
    s('Complex condition', 'Obesity involves genetics, environment, hormones, and behaviour — not willpower alone.'),
    s('Evidence-based approaches', 'Structured eating plans, activity, sleep, stress care, and sometimes medication or surgery.'),
    s('Sustainable pace', '0.5–1 kg per week is a healthy target. Small wins compound.'),
  ),
  'hypertension-management': topic(
    s('Daily habits', 'Home BP monitoring, medication adherence, and salt reduction are foundational.'),
    s('DASH diet', 'Emphasise fruits, vegetables, whole grains, and low-fat dairy while limiting sodium.'),
    s('Follow-up', 'Review readings with your GP — aim for consistent logs over 7–14 days.'),
  ),

  // Digestive
  'organ-health-nutrition': topic(
    s('Organ-supportive foods', 'Colourful plants, omega-3s, and adequate protein support liver, kidney, and heart function.'),
    s('Limit', 'Ultra-processed foods, excess alcohol, and chronic high sugar load stress multiple organs.'),
    s('Hydration', 'Kidneys and digestion depend on adequate fluid intake throughout the day.'),
  ),
  'acid-reflux': topic(
    s('GERD basics', 'Stomach acid backing into the oesophagus causes heartburn and regurgitation.'),
    s('Relief', 'Smaller meals, avoid late eating, elevate head of bed, limit trigger foods (spicy, fatty, caffeine).'),
    s('See a GP', 'Persistent symptoms, difficulty swallowing, or weight loss need investigation.'),
  ),
  constipation: topic(
    s('Common causes', 'Low fibre, dehydration, inactivity, and some medications.'),
    s('First steps', 'Increase fibre gradually, drink fluids, move daily, establish a toilet routine.'),
    s('When to seek help', 'Blood in stool, severe pain, or no bowel movement for 7+ days.'),
  ),
  diarrhoea: topic(
    s('Acute episodes', 'Often viral or food-related. Priority is hydration with oral rehydration solution.'),
    s('Diet', 'BRAT foods (banana, rice, apple sauce, toast) temporarily; return to normal diet as tolerated.'),
    s('Red flags', 'Blood, high fever, severe pain, or symptoms beyond 48 hours in adults.'),
  ),
  ibs: topic(
    s('Functional disorder', 'Abdominal pain with altered bowel habit — diagnosis of exclusion by a clinician.'),
    s('Management', 'Low FODMAP trial, stress reduction, regular meals, and peppermint oil for some.'),
    s('Support', 'Gut-directed hypnotherapy and CBT show strong evidence for symptom relief.'),
  ),
  malnutrition: topic(
    s('Under-nutrition', 'Inadequate calories, protein, or micronutrients — common in illness and older age.'),
    s('Signs', 'Unintended weight loss, fatigue, poor wound healing, frequent infections.'),
    s('Action', 'Fortified foods, snacks between meals, and dietitian referral for personalised plans.'),
  ),

  // Mental health
  'autonomic-nervous-system': topic(
    s('Two branches', 'Sympathetic (alert) and parasympathetic (calm) — chronic imbalance affects heart, gut, and sleep.'),
    s('Regulation', 'Slow exhales, cold water on face, humming, and gentle movement activate the vagus nerve.'),
    s('Practice', 'Use Breathing Exercises daily to train parasympathetic tone.'),
  ),
  adhd: topic(
    s('Executive function', 'ADHD affects attention, impulse control, and organisation — not laziness.'),
    s('Strategies', 'Externalise memory (lists, timers), break tasks small, exercise, and sleep consistently.'),
    s('Treatment', 'Medication and coaching/therapy are effective — assessment via GP or psychiatrist.'),
  ),
  addiction: topic(
    s('Brain disease model', 'Addiction hijacks reward pathways. Recovery is possible with support and treatment.'),
    s('Resources', 'NHS addiction services, SMART Recovery, and AA/NA groups offer structured help.'),
    s('Harm reduction', 'If you use substances, never use alone and know local emergency contacts.'),
  ),
  grief: topic(
    s('Normal process', 'Grief has no fixed timeline. Waves of sadness, anger, guilt, and numbness are common.'),
    s('Self-care', 'Maintain basics: sleep, food, movement, and one connection daily.'),
    s('Extra support', 'Bereavement counselling or Cruse helpline if grief feels stuck or overwhelming.'),
  ),
  'social-anxiety': topic(
    s('Fear of judgement', 'Intense worry before or during social situations — often with physical anxiety symptoms.'),
    s('Gradual exposure', 'Small, repeated social steps build confidence more than avoidance.'),
    s('Therapy', 'CBT is first-line. Medication may help severe cases under GP guidance.'),
  ),
  'panic-disorder': topic(
    s('Panic attacks', 'Sudden intense fear with palpitations, breathlessness, chest tightness — peaks in minutes.'),
    s('During an attack', 'Remind yourself it will pass. Slow breathing. Ground with 5-4-3-2-1 senses.'),
    s('Long-term', 'CBT reduces attack frequency. Rule out cardiac causes with your GP first.'),
  ),
  ocd: topic(
    s('The loop', 'Intrusive thoughts (obsessions) drive repetitive behaviours (compulsions) for temporary relief.'),
    s('ERP therapy', 'Exposure and response prevention is the gold-standard psychological treatment.'),
    s('Medication', 'SSRIs can help moderate-to-severe OCD alongside therapy.'),
  ),
  ptsd: topic(
    s('After trauma', 'Flashbacks, hypervigilance, avoidance, and mood changes persisting beyond a month.'),
    s('Trauma-informed care', 'EMDR and trauma-focused CBT are evidence-based. Safety and stabilisation come first.'),
    s('Crisis', 'Grounding techniques and professional support — you do not have to manage alone.'),
  ),
  bipolar: topic(
    s('Mood episodes', 'Depression and mania/hypomania cycles — energy, sleep, and judgement can shift dramatically.'),
    s('Stability', 'Medication, sleep regularity, mood tracking, and early warning sign plans.'),
    s('Urgent care', 'Mania with risky behaviour or psychosis needs immediate medical attention.'),
  ),

  // Musculoskeletal
  'joint-pain-arthritis': topic(
    s('Move to lubricate', 'Gentle movement reduces stiffness. "Motion is lotion" for arthritic joints.'),
    s('Weight & inflammation', 'Even modest weight loss reduces knee load. Anti-inflammatory diet may help.'),
    s('Guided exercise', 'Try Arthritis-Friendly Exercises in Fitness Hub.'),
  ),
  fibromyalgia: topic(
    s('Widespread pain', 'Chronic pain, fatigue, and cognitive fog — diagnosis by a rheumatologist or GP.'),
    s('Pacing', 'Activity management prevents boom-bust cycles. Gradual graded exercise helps.'),
    s('Multimodal care', 'Sleep, stress reduction, gentle movement, and sometimes medication.'),
  ),
  sciatica: topic(
    s('Nerve irritation', 'Pain radiating leg from lower back — often disc-related, usually improves over weeks.'),
    s('Relief', 'Gentle extension exercises, walking, heat, and avoiding prolonged sitting.'),
    s('Seek help', 'Progressive leg weakness, numbness in saddle area, or bladder changes — urgent review.'),
  ),
  'plantar-fasciitis': topic(
    s('Heel pain', 'Sharp pain under the heel, worst with first steps in the morning.'),
    s('Recovery', 'Calf stretches, rolling foot on frozen bottle, supportive shoes, night splints.'),
    s('Timeline', 'Most improve within 6–12 months with consistent care.'),
  ),
  'tennis-elbow': topic(
    s('Overuse injury', 'Pain on outside of elbow from repetitive wrist extension.'),
    s('Treatment', 'Relative rest, eccentric wrist exercises, ergonomic adjustments.'),
    s('Prevention', 'Gradual load increases and proper technique in sport and work.'),
  ),
  'flexibility-assessment': topic(
    s('Why assess', 'Poor mobility increases injury risk and compensatory movement patterns.'),
    s('Simple tests', 'Sit-and-reach, shoulder reach behind back, ankle dorsiflexion against wall.'),
    s('Improve', 'Daily 10-minute stretching routine — see Stretching Routines module.'),
  ),
  'posture-analyzer-tool': topic(
    s('Desk posture', 'Ears over shoulders, shoulders relaxed, screen at eye level, feet flat.'),
    s('Micro-breaks', 'Stand or move every 30–45 minutes to reset spinal load.'),
    s('Strengthen', 'Upper back and deep neck flexor exercises counter forward-head posture.'),
  ),

  // Sleep
  'sleep-apnoea': topic(
    s('Breathing pauses', 'Repeated airway collapse during sleep — loud snoring, gasping, daytime sleepiness.'),
    s('Risks', 'Untreated OSA raises BP, heart disease, and accident risk.'),
    s('Diagnosis', 'Sleep study via GP. CPAP is highly effective for moderate-severe cases.'),
  ),
  'sleep-hygiene': topic(
    s('Environment', 'Cool, dark, quiet room. Consistent schedule including weekends.'),
    s('Wind-down', 'Dim lights, no screens 60 min before bed, light reading or stretching.'),
    s('Stimulus control', 'If awake 20+ minutes, leave bed briefly and return when sleepy.'),
  ),

  // Sports
  'sports-injuries': topic(
    s('RICE protocol', 'Rest, Ice, Compression, Elevation in the first 48–72 hours after acute injury.'),
    s('Gradual return', 'Pain-free range before sport-specific drills. Do not rush back.'),
    s('Guided rehab', 'Open Rehabilitation Exercises in Fitness Hub for structured recovery.'),
  ),
  concussion: topic(
    s('Brain injury', 'Head trauma causing headache, dizziness, confusion, or nausea — take seriously.'),
    s('Immediate rest', 'No sport until medically cleared. Gradual return-to-play protocol.'),
    s('Red flags', 'Worsening headache, repeated vomiting, seizures, unequal pupils — A&E.'),
  ),
  'runner-knee': topic(
    s('Patellofemoral pain', 'Pain around or behind kneecap, worse with stairs, squatting, or prolonged sitting.'),
    s('Causes', 'Overtraining, weak hips/glutes, poor footwear, sudden mileage increases.'),
    s('Rehab', 'Hip strengthening, quad balance exercises, reduce load temporarily.'),
  ),
  'achilles-tendonitis': topic(
    s('Heel cord overload', 'Pain and stiffness in Achilles tendon, often morning or start of activity.'),
    s('Treatment', 'Eccentric heel drops, load management, proper footwear, avoid sudden hill sprints.'),
    s('Chronic cases', 'Physiotherapy and gradual return — complete rest alone rarely fixes tendinopathy.'),
  ),
  'acl-injury': topic(
    s('Knee ligament', 'ACL tears often occur in pivoting sports — pop sensation, swelling, instability.'),
    s('Initial care', 'RICE, crutches if needed, urgent orthopaedic assessment.'),
    s('Rehab', 'Structured physiotherapy pre- and post-surgery if reconstruction is chosen.'),
  ),

  // Women's health
  endometriosis: topic(
    s('Condition', 'Tissue similar to womb lining grows elsewhere — painful periods, pelvic pain, fatigue.'),
    s('Management', 'Pain relief, hormonal treatments, physiotherapy, and sometimes surgery.'),
    s('Advocacy', 'Track symptoms for GP visits. Specialist referral for suspected endometriosis.'),
  ),
  pcos: topic(
    s('Hormonal syndrome', 'Irregular periods, acne, excess hair, weight gain, and metabolic risks.'),
    s('Lifestyle first', 'Weight management, exercise, and low-GI diet improve insulin sensitivity.'),
    s('Medical care', 'GP or endocrinologist for fertility, metabolic, and symptom management.'),
  ),
  'breast-health': topic(
    s('Self-awareness', 'Know your normal. Report new lumps, skin changes, nipple discharge, or persistent pain.'),
    s('Screening', 'NHS breast screening from 50 (earlier if high risk). Clinical exam if concerned.'),
    s('Lifestyle', 'Limit alcohol, stay active, maintain healthy weight.'),
  ),
  'pelvic-floor': topic(
    s('Why it matters', 'Supports bladder, bowel, and core stability — weakens with age, pregnancy, and surgery.'),
    s('Exercises', 'Kegels: contract pelvic floor, hold 5s, release. 10 reps, 3× daily.'),
    s('Professional help', 'Women\'s health physio for prolapse symptoms or postnatal recovery.'),
  ),
  'menstrual-health': topic(
    s('Cycle basics', 'Average cycle 21–35 days. Track flow, pain, and mood to spot patterns.'),
    s('Pain management', 'Heat, NSAIDs, gentle movement. Severe pain may indicate endometriosis.'),
    s('Irregular cycles', 'See GP if cycles suddenly change, stop, or bleed between periods.'),
  ),

  // Immune / chronic
  autoimmune: topic(
    s('Immune misfire', 'Body attacks its own tissues — rheumatoid arthritis, lupus, coeliac, and others.'),
    s('Flare management', 'Rest during flares, anti-inflammatory diet, stress care, medication adherence.'),
    s('Team care', 'Rheumatologist-led care with GP coordination.'),
  ),
  'chronic-fatigue': topic(
    s('Post-exertional malaise', 'Disproportionate exhaustion after activity — pacing is essential.'),
    s('Energy envelope', 'Plan activity within limits. Alternate exertion with rest.'),
    s('Medical review', 'Rule out anaemia, thyroid, sleep disorders, and depression.'),
  ),
  'long-covid-ext': topic(
    s('Persistent symptoms', 'Fatigue, breathlessness, brain fog, and dysautonomia weeks after COVID.'),
    s('Pacing', 'Gradual activity increases. Avoid boom-bust cycles that worsen symptoms.'),
    s('Support', 'Long COVID clinics via GP referral in the UK.'),
  ),
  thyroid: topic(
    s('Hypo vs hyper', 'Underactive: fatigue, weight gain, cold intolerance. Overactive: anxiety, weight loss, palpitations.'),
    s('Diagnosis', 'TSH blood test via GP. Medication (levothyroxine) is effective for hypothyroidism.'),
    s('Monitoring', 'Annual blood tests once stable on treatment.'),
  ),
  'frequent-infections': topic(
    s('Immune support', 'Sleep 7–9h, balanced diet, exercise, stress management, and vaccination.'),
    s('When to investigate', 'Recurrent serious infections or unusual organisms need immunology review.'),
    s('Hygiene', 'Hand washing, avoid smoking, manage chronic conditions well.'),
  ),

  // Lifestyle
  'alcohol-reduction': topic(
    s('UK guidelines', 'No more than 14 units per week, spread across 3+ days, with alcohol-free days.'),
    s('Cutting back', 'Track units, alternate soft drinks, set limits before social events.'),
    s('Support', 'GP, local alcohol services, or Drinkline for confidential help.'),
  ),
  'smoking-cessation-ext': topic(
    s('Benefits timeline', 'Within 48h taste improves; within 1 year heart disease risk halves.'),
    s('Quit aids', 'NRT, varenicline, or bupropion via NHS Stop Smoking services — most effective with support.'),
    s('Triggers', 'Identify cues and replace with a new routine (walk, gum, breathing).'),
  ),
  'first-aid': topic(
    s('DRSABC', 'Danger, Response, Shout for help, Airway, Breathing, Circulation.'),
    s('CPR basics', '30 chest compressions : 2 rescue breaths for unresponsive non-breathing adults.'),
    s('Bleeding & burns', 'Direct pressure for bleeding. Cool running water 20 min for burns.'),
  ),
  'healthy-ageing': topic(
    s('Pillars', 'Strength training, balance work, social connection, cognitive activity, and sleep.'),
    s('Prevent falls', 'Home hazard review, vision checks, and medication review with GP.'),
    s('Nutrition', 'Adequate protein (1.0–1.2g/kg) to preserve muscle mass.'),
  ),
  'medication-adherence': topic(
    s('Why it matters', 'Skipping doses reduces treatment effectiveness and can cause flare-ups.'),
    s('Strategies', 'Pill organisers, phone alarms, link to daily habits, pharmacist review.'),
    s('Ask questions', 'Understand what each medicine does and report side effects early.'),
  ),
  'travel-health': topic(
    s('Before you go', 'Check NHS Fit for Travel for vaccines and malaria advice by destination.'),
    s('Jet lag', 'Shift sleep 1h per day before travel. Morning light at destination.'),
    s('Pack', 'Regular medications, copies of prescriptions, travel insurance with medical cover.'),
  ),
  'physical-inactivity': topic(
    s('Risks', 'Sedentary lifestyle linked to heart disease, diabetes, cancer, and early death.'),
    s('Start small', '10-minute walks after meals. Stand every 30 minutes at work.'),
    s('Build up', 'Aim for 150 min moderate activity weekly — any movement counts.'),
  ),
  'poor-diet': topic(
    s('Ultra-processed trap', 'UPF displaces whole foods and drives overeating via hyper-palatability.'),
    s('Upgrade swaps', 'Whole grain for white bread, water for sugary drinks, home cooking 1 extra meal weekly.'),
    s('Support', 'Nutrition Basics learning guide and Macro Calculator in Fitness Hub.'),
  ),

  // General conditions
  allergies: topic(
    s('Types', 'Seasonal (pollen), food, drug, and insect sting allergies — severity varies.'),
    s('Management', 'Avoid triggers, antihistamines, nasal sprays. Carry adrenaline auto-injector if prescribed.'),
    s('Anaphylaxis', 'Throat swelling, breathing difficulty — use EpiPen and call 999.'),
  ),
  anaemia: topic(
    s('Low haemoglobin', 'Causes fatigue, breathlessness, pale skin — iron deficiency is most common.'),
    s('Iron sources', 'Red meat, beans, leafy greens. Pair plant iron with vitamin C.'),
    s('Diagnosis', 'Blood test via GP. Investigate cause before long-term supplements.'),
  ),
  'kidney-disease': topic(
    s('Silent progression', 'CKD often asymptomatic until advanced. Diabetes and BP are major causes.'),
    s('Protection', 'Control BP and glucose, limit NSAIDs, stay hydrated, avoid smoking.'),
    s('Diet', 'Protein and salt moderation may be advised in later stages — follow renal dietitian guidance.'),
  ),
  'liver-health': topic(
    s('Fatty liver', 'NAFLD linked to obesity and metabolic syndrome — often reversible with weight loss.'),
    s('Myths', 'Detox teas and juice cleanses do not repair liver damage. Lifestyle does.'),
    s('Alcohol', 'Even moderate drinking matters if you have liver disease — discuss with GP.'),
  ),
  'skin-conditions': topic(
    s('Common issues', 'Eczema, acne, psoriasis, and fungal infections — many are manageable with care.'),
    s('Basics', 'Gentle cleansing, moisturise eczema-prone skin, SPF daily on face.'),
    s('See GP', 'Changing moles, widespread rashes, or infection signs need review.'),
  ),
  uti: topic(
    s('Symptoms', 'Burning urination, frequency, urgency, cloudy urine. Fever suggests kidney involvement.'),
    s('Prevention', 'Hydrate, urinate after sex, wipe front to back, avoid holding urine long.'),
    s('Treatment', 'Short course antibiotics via GP or pharmacy scheme. Recurrent UTIs need investigation.'),
  ),
  'eye-health': topic(
    s('Screen strain', '20-20-20 rule: every 20 min, look 20 feet away for 20 seconds.'),
    s('Checks', 'NHS eye tests every 2 years (sooner if diabetic). Report floaters, flashes, vision loss urgently.'),
    s('Protection', 'UV-blocking sunglasses outdoors. Safety goggles for DIY and sport.'),
  ),
  'ear-health': topic(
    s('Hearing protection', 'Limit headphone volume. Earplugs at loud events.'),
    s('Ear care', 'Do not insert cotton buds — they push wax deeper. Olive oil drops for mild wax.'),
    s('Infections', 'Outer ear pain after swimming — keep dry, see GP if persistent.'),
  ),

  // Assessments
  'functional-movement': topic(
    s('Movement screen', 'Assess squat, lunge, hurdle step, shoulder mobility, and trunk stability.'),
    s('Why it matters', 'Asymmetries and limitations predict injury risk in sport and daily life.'),
    s('Improve', 'Target weak links with corrective exercises before loading heavily.'),
  ),
  'meal-planner': topic(
    s('Weekly planning', 'Batch cook proteins and grains. Plan 3–4 base meals with vegetable variety.'),
    s('Balance', 'Each meal: protein + complex carb + vegetables + healthy fat.'),
    s('Shop smart', 'Write a list from your plan to reduce impulse buys and food waste.'),
  ),
  'child-nutrition': topic(
    s('Growing needs', 'Children need adequate protein, calcium, iron, and healthy fats for development.'),
    s('Picky eating', 'Offer new foods without pressure. Eat together as a family model.'),
    s('Limit', 'Free sugars, excessive juice, and ultra-processed snacks.'),
  ),
};

const SUPPORT_FOOTER: HealthTopicSection = s(
  'Getting support',
  'For personalised advice, consult your healthcare provider or use the AI Health Coach in the app.',
);

export function resolveHealthTopicContent(
  rawTopicId: string,
  title: string,
  subtitle?: string,
): HealthTopicContent {
  const topicId = HEALTH_TOPIC_ALIASES[rawTopicId] ?? rawTopicId;
  const explicit =
    HEALTH_TOPIC_CONTENT[topicId]
    ?? HEALTH_TOPIC_CONTENT[rawTopicId]
    ?? BATCH3_HEALTH_TOPIC_CONTENT[topicId]
    ?? BATCH3_HEALTH_TOPIC_CONTENT[rawTopicId];
  if (explicit) return explicit;

  const module = FITNESS_MODULES.find((m) => m.id === topicId || m.id === rawTopicId);
  const sub = subtitle ?? module?.subtitle ?? 'an important area of your health';
  const domain = module?.domain ?? module?.exploreTags?.[0] ?? 'wellness';

  return topic(
    s('What you need to know', `${title} affects many aspects of daily life. ${sub} Understanding the basics helps you make informed decisions with your healthcare team.`),
    s('Evidence-based habits', `• Start with one small change this week related to ${domain.toLowerCase()}\n• Track relevant metrics in Fitness Hub calculators and trackers\n• Pair lifestyle changes with regular medical follow-up when needed\n• Use the AI Health Coach for personalised questions`),
    s('When to seek help', 'Contact your GP if symptoms are new, worsening, or affecting daily function. For urgent concerns — chest pain, severe breathlessness, sudden weakness, or thoughts of self-harm — seek emergency care immediately.'),
    SUPPORT_FOOTER,
  );
}
