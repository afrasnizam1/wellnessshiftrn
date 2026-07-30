import type { HealthTopicContent } from './healthTopicContent';

function s(heading: string, body: string) {
  return { heading, body };
}

function topic(...sections: { heading: string; body: string }[]): HealthTopicContent {
  return { sections };
}

/** Dedicated articles for Fitness Hub batch-3 education modules */
export const BATCH3_HEALTH_TOPIC_CONTENT: Record<string, HealthTopicContent> = {
  lupus: topic(
    s('Understanding lupus', 'Systemic lupus erythematosus (SLE) is an autoimmune condition where the immune system attacks healthy tissue. Flares can affect skin, joints, kidneys, and energy levels — but many people manage well with medical care and lifestyle support.'),
    s('Living well day to day', '• Pace activity — alternate effort with rest\n• Protect skin from UV (sunscreen, hats)\n• Track flare triggers (stress, illness, overexertion)\n• Keep regular rheumatology follow-ups'),
    s('Nutrition & wellbeing', 'Anti-inflammatory eating patterns (Mediterranean-style) may help. Prioritise sleep, gentle movement, and stress tools in the Breathing Exercises module.'),
  ),
  'rheumatoid-arthritis': topic(
    s('What is RA?', 'Rheumatoid arthritis causes joint inflammation, stiffness (often worse in the morning), and fatigue. Early treatment slows joint damage — DMARDs and biologics are cornerstone therapies prescribed by rheumatologists.'),
    s('Movement matters', '• Gentle daily range-of-motion exercises\n• Strength training for supporting muscles\n• Avoid pushing through sharp pain\n• Try warm-up showers before activity'),
    s('Joint protection', 'Use larger joints when lifting, take micro-breaks from desk work, and explore the Arthritis Exercises guided program in Fitness Hub.'),
  ),
  psoriasis: topic(
    s('Skin & immune system', 'Psoriasis speeds up skin cell turnover, causing plaques, scaling, and itch. It is not contagious. Stress, alcohol, smoking, and some medications can trigger flares.'),
    s('Skin care basics', '• Emollients daily — apply after bathing\n• Short lukewarm showers\n• Identify personal triggers in a simple diary\n• Discuss topical or systemic treatments with dermatology'),
    s('Whole-body health', 'Psoriasis links with heart and metabolic risk — stay active, manage weight, and address mental health if stigma or visibility affects mood.'),
  ),
  eczema: topic(
    s('Atopic dermatitis', 'Eczema causes dry, itchy, inflamed skin. The itch-scratch cycle worsens barriers — breaking that cycle is central to management.'),
    s('Daily skin routine', '• Fragrance-free emollients 2–3× daily\n• Mild soap substitutes\n• Cotton clothing; avoid overheating at night\n• Keep nails short to limit scratch damage'),
    s('Flare plan', 'Recognise early redness, step up treatment as agreed with your GP, and consider allergy triggers (dust, pets, detergents). Seek review if skin weeps or crusts (possible infection).'),
  ),
  gout: topic(
    s('Uric acid crystals', 'Gout causes sudden, severe joint pain — often the big toe — when urate crystals deposit in joints. Diet, alcohol, dehydration, and some medicines raise risk.'),
    s('Acute attack care', '• Rest and elevate the joint\n• Ice for 15–20 minutes\n• Take prescribed anti-inflammatories promptly\n• Hydrate well'),
    s('Long-term prevention', 'Limit purine-rich foods (organ meats, some seafood), reduce alcohol (especially beer), maintain healthy weight, and take urate-lowering medication if prescribed — consistency prevents attacks.'),
  ),
  'celiac-disease': topic(
    s('Gluten and the gut', 'Coeliac disease is an autoimmune reaction to gluten that damages the small intestine lining. Even tiny amounts of gluten cause harm — strict avoidance is lifelong.'),
    s('Gluten-free living', '• Read labels — wheat, barley, rye\n• Watch cross-contamination at home and restaurants\n• Oats only if certified gluten-free\n• Annual blood tests to monitor healing'),
    s('Nutrition after diagnosis', 'Correct iron, B12, and vitamin D deficiencies common at diagnosis. Work with a dietitian for balanced gluten-free meals using the Meal Planner module.'),
  ),
  osteoporosis: topic(
    s('Bone strength', 'Osteoporosis means reduced bone density and higher fracture risk — especially hips, spine, and wrists. Often silent until a fracture occurs.'),
    s('Prevention & treatment', '• Weight-bearing and resistance exercise\n• Adequate calcium (700mg+ daily in UK guidance) and vitamin D\n• Medications (bisphosphonates etc.) when prescribed\n• Fall-proof your home'),
    s('Movement safely', 'Avoid high-impact twisting if osteoporotic — try Senior Fitness & Balance programs. Discuss bone density (DEXA) screening if risk factors apply.'),
  ),
  'chronic-fatigue': topic(
    s('Energy limits', 'Chronic fatigue syndrome (ME/CFS) involves profound tiredness not relieved by rest, often with post-exertional malaise — symptoms worsen 24–48h after activity.'),
    s('Pacing is essential', '• Plan activity in small chunks with rest between\n• Track baseline — stay within your "energy envelope"\n• Prioritise sleep hygiene\n• Avoid boom-bust cycles'),
    s('Support & care', 'Graded approaches must be clinician-guided. Address sleep, pain, and mood comorbidities. Be wary of pushing through — respect your body\'s limits.'),
  ),
  'kidney-stones': topic(
    s('How stones form', 'Hard mineral deposits in the kidney or urinary tract cause severe colicky pain. Dehydration, high sodium, and some metabolic conditions increase risk.'),
    s('Prevention', '• Drink 2–2.5L fluid daily (urine should be pale)\n• Reduce salt and excessive animal protein\n• Citrus fruits may help citrate levels\n• Follow dietary advice if stone composition is known'),
    s('When to seek help', 'Severe pain, fever, inability to pass urine, or blood in urine need urgent assessment. Strain urine if asked to capture a stone for analysis.'),
  ),
  'uti-prevention': topic(
    s('Bladder health', 'Urinary tract infections are common — burning, frequency, and urgency signal infection. Women are affected more often due to shorter urethras.'),
    s('Prevention habits', '• Hydrate regularly\n• Urinate after intercourse\n• Wipe front to back\n• Avoid prolonged holding of urine\n• Consider cranberry only as adjunct — not replacement for treatment'),
    s('Seek treatment', 'Fever, flank pain, or blood in urine suggest kidney involvement — contact GP promptly. Recurrent UTIs warrant investigation.'),
  ),
  'prostate-health': topic(
    s('Prostate basics', 'The prostate sits below the bladder in men. Benign enlargement (BPH) and prostate cancer are common with age — many cases are manageable when caught early.'),
    s('Screening & symptoms', '• Discuss PSA testing with your GP (shared decision-making)\n• Note weak stream, nocturia, hesitancy\n• Sudden inability to urinate is an emergency'),
    s('Lifestyle support', 'Regular exercise, Mediterranean-style diet, healthy weight, and limiting red/processed meat support overall prostate and cardiovascular health.'),
  ),
  'fatty-liver': topic(
    s('NAFLD explained', 'Non-alcoholic fatty liver disease is fat buildup in the liver, often linked with insulin resistance and weight. Most people have no symptoms early on.'),
    s('Reversal strategies', '• 5–10% weight loss significantly improves liver fat\n• Reduce refined carbs and sugary drinks\n• 150 min weekly activity\n• Limit alcohol even if "non-alcoholic" diagnosis'),
    s('Monitoring', 'Liver blood tests and ultrasound track progression. Advanced fibrosis needs specialist care — do not ignore persistently abnormal LFTs.'),
  ),
  prediabetes: topic(
    s('Insulin resistance', 'Prediabetes means blood sugar is above normal but below diabetes thresholds. It is reversible for many people with lifestyle change — this is a critical window.'),
    s('Evidence-based steps', '• 5–7% body weight loss if overweight\n• 150 minutes moderate exercise weekly\n• Fibre-rich whole foods; limit ultra-processed snacks\n• Sleep 7–9 hours — poor sleep worsens glucose control'),
    s('Track progress', 'Annual HbA1c or fasting glucose with your GP. Use Fitness Hub activity tracking and the Macro Calculator for awareness.'),
  ),
  'pregnancy-wellness': topic(
    s('Trimester overview', 'Pregnancy demands extra nutrition, rest, and monitoring. Attend all antenatal appointments — midwives screen for blood pressure, glucose, and fetal growth.'),
    s('Safe habits', '• Folic acid until week 12; vitamin D in UK guidance\n• Avoid alcohol, smoking, raw/undercooked foods\n• Moderate exercise unless advised otherwise\n• Pelvic floor exercises daily'),
    s('When to call', 'Bleeding, severe headache, reduced fetal movement, or persistent vomiting need urgent review. Use the Pre & Post Natal guided program for safe movement.'),
  ),
  'postpartum-recovery': topic(
    s('Fourth trimester', 'The first 12 weeks after birth are recovery — sleep fragmentation, healing, and mood shifts are normal but deserve support.'),
    s('Recovery priorities', '• Rest when baby rests where possible\n• Nutrient-dense meals and hydration (especially if breastfeeding)\n• Gentle walking and pelvic floor rehab\n• Screen for postnatal depression — ask for help early'),
    s('Gradual return', 'Progress activity slowly. Diastasis and pelvic pain warrant physio referral. You are not expected to "bounce back" — recovery is individual.'),
  ),
  'healthy-ageing': topic(
    s('Ageing well', 'After 65, muscle mass, balance, and bone density naturally decline — but regular movement dramatically slows functional loss and preserves independence.'),
    s('Weekly targets', '• Strength 2× weekly (sit-to-stand, bands, light weights)\n• Balance practice daily\n• 150 min moderate cardio (walks count)\n• Social connection — isolation harms health'),
    s('Preventive care', 'Keep vaccinations current, annual medication review, vision/hearing checks, and home fall-risk assessment.'),
  ),
  'balance-falls': topic(
    s('Fall risk', 'Falls are a leading cause of injury in older adults. Balance, leg strength, vision, medications, and home hazards all contribute.'),
    s('Training plan', '• Single-leg stands near support\n• Heel-to-toe walking\n• Tai chi or yoga flows\n• Review medications causing dizziness with GP'),
    s('Home safety', 'Remove loose rugs, improve lighting, install grab rails, and wear non-slip footwear indoors.'),
  ),
  'workplace-ergonomics': topic(
    s('Desk setup', 'Poor ergonomics drives neck pain, headaches, and RSI. Screen top at eye level, forearms parallel to floor, feet flat, lumbar supported.'),
    s('Micro-breaks', 'Every 30–45 minutes: stand, roll shoulders, look 20 feet away for 20 seconds (20-20-20 rule). Short walks reset posture and focus.'),
    s('Hybrid work', 'Avoid laptop-only hunching — use external keyboard/monitor or raise the laptop. Try the Desk Breaker Mobility program for 14 days.'),
  ),
  'screen-time': topic(
    s('Digital strain', 'Hours on screens cause dry eyes, headaches, and poor sleep from blue-light disruption — especially evening use.'),
    s('Eye comfort', '• 20-20-20 breaks\n• Blink consciously\n• Screen brightness match ambient light\n• Night mode after sunset'),
    s('Sleep boundary', 'No screens 60 minutes before bed where possible. Charge devices outside the bedroom.'),
  ),
  'alcohol-awareness': topic(
    s('UK guidance', 'Adults should not regularly exceed 14 units per week, spread across several days, with alcohol-free days. One unit ≈ half pint beer or small wine.'),
    s('Health impacts', 'Alcohol affects sleep quality, liver, blood pressure, mood, and cancer risk — benefits of "moderation" are often overstated.'),
    s('Cutting down', 'Alternate alcoholic drinks with water, set weekly limits, plan alcohol-free weeks, and seek support if cutting down feels difficult.'),
  ),
  'dental-health': topic(
    s('Oral-systemic link', 'Gum disease (periodontitis) associates with heart disease and diabetes control. Oral health is whole-body health.'),
    s('Daily routine', '• Brush twice with fluoride toothpaste\n• Clean between teeth daily\n• Limit sugary snacks — frequency matters more than amount\n• Dental check every 6–12 months'),
    s('Warning signs', 'Bleeding gums, persistent bad breath, loose teeth, or mouth ulcers >3 weeks need dental or GP review.'),
  ),
  'post-surgery-recovery': topic(
    s('Healing phases', 'Recovery follows inflammation, proliferation, and remodelling — timelines vary by procedure. Follow your surgical team\'s protocol exactly.'),
    s('Early mobility', '• Deep breathing to prevent chest complications\n• Gradual walking as advised\n• Wound care — watch redness, discharge, fever\n• Adequate protein for tissue repair'),
    s('Rehab', 'Physio-guided progression restores strength safely. Use the Rehab Exercises module and log recovery in the Recovery Tracker.'),
  ),
  'heat-exhaustion': topic(
    s('Heat illness', 'Heat exhaustion causes heavy sweating, weakness, nausea, and dizziness. It can progress to heatstroke — a medical emergency.'),
    s('First aid', '• Move to shade or cool room\n• Loosen clothing, cool skin with water/fan\n• Sip water or rehydration drinks\n• Rest with legs elevated'),
    s('Prevention', 'Hydrate before thirst, avoid peak sun 11am–3pm, wear light clothing, and never leave anyone in a parked car.'),
  ),
  'cold-weather-health': topic(
    s('Winter risks', 'Cold increases blood pressure strain, respiratory infections, and fall risk on ice. Isolation affects mental health.'),
    s('Stay well', '• Flu and COVID vaccinations per eligibility\n• Warm layers, hat and gloves\n• Heat main rooms to at least 18°C\n• Stock medicines before holidays'),
    s('Vulnerable groups', 'Check on older neighbours. Hypothermia signs: shivering, confusion, slurred speech — call 999.'),
  ),
  'seasonal-allergies': topic(
    s('Hay fever', 'Pollen triggers sneezing, itchy eyes, and congestion — tree pollen spring, grass summer, weed autumn.'),
    s('Management', '• Antihistamines (non-drowsy daytime)\n• Nasal steroid sprays for moderate symptoms\n• Sunglasses outdoors; shower after high pollen\n• Track pollen forecasts'),
    s('When to escalate', 'Asthma symptoms with hay fever need GP review — combined treatment plans prevent exacerbations.'),
  ),
  'immune-support': topic(
    s('Evidence, not fads', 'No supplement replaces vaccines, sleep, nutrition, and hand hygiene. "Boosting" immunity oversimplifies a complex system.'),
    s('What actually helps', '• 7–9h sleep\n• Balanced diet with fruit/vegetables\n• Regular moderate exercise\n• Stress management\n• Up-to-date vaccinations'),
    s('Supplements', 'Vitamin D in UK winter may be appropriate — confirm with GP. High-dose megadoses are not recommended without deficiency.'),
  ),
  'wound-healing': topic(
    s('Healing requirements', 'Wounds need adequate protein, vitamin C, zinc, blood flow, and infection control to close efficiently.'),
    s('Wound care', '• Clean gently with water or saline\n• Cover with appropriate dressing\n• Watch for increasing pain, redness spreading, pus, fever\n• Do not pick scabs'),
    s('Nutrition', 'Include protein each meal (eggs, fish, legumes), colourful vegetables, and stay hydrated. Smokers heal slower — cessation support helps.'),
  ),
};
