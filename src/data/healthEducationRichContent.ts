import type { IoniconName } from '../theme/icons';

export type HealthEducationCard = {
  icon: IoniconName;
  title: string;
  body: string;
};

export type HealthEducationSection = {
  title: string;
  intro?: string;
  imageUrl?: string;
  cards: HealthEducationCard[];
};

export type RichHealthEducation = {
  heroImageUrl: string;
  heroIcon: IoniconName;
  accentColor: string;
  intro: string;
  keyTakeaways: string[];
  sections: HealthEducationSection[];
  tips?: { title: string; body: string }[];
  relatedModuleIds?: string[];
};

const U = (id: string, w = 900) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=85&auto=format&fit=crop`;

export const HEALTH_EDUCATION_RICH: Record<string, RichHealthEducation> = {
  'stress-disorders': {
    heroImageUrl: U('150612661028-6e12ecbcdffb'),
    heroIcon: 'pulse-outline',
    accentColor: '#E74C3C',
    intro:
      'When stress stays switched on for weeks or months, the body can start speaking louder than the mind — through pain, fatigue, gut upset, and burnout. Understanding the mind–body link is the first step to recovery.',
    keyTakeaways: [
      'Chronic stress keeps cortisol elevated and affects sleep, immunity, and mood',
      'Physical symptoms are real — not “all in your head”',
      'Brief daily recovery practices can reset the nervous system',
      'Boundaries and sleep are medical priorities, not luxuries',
    ],
    sections: [
      {
        title: 'How stress shows up in the body',
        intro: 'The nervous system cannot tell the difference between a deadline and a predator — both can trigger the same cascade.',
        imageUrl: U('1571019614242-c5c5dee9f50b', 800),
        cards: [
          {
            icon: 'fitness-outline',
            title: 'Muscle tension',
            body: 'Jaw clenching, neck stiffness, and headaches often come from sustained fight-or-flight muscle activation.',
          },
          {
            icon: 'nutrition-outline',
            title: 'Gut changes',
            body: 'Bloating, cramps, or appetite shifts are common when stress alters digestion and gut motility.',
          },
          {
            icon: 'battery-dead-outline',
            title: 'Burnout & fatigue',
            body: 'Emotional exhaustion, cynicism, and reduced performance signal that recovery reserves are depleted.',
          },
          {
            icon: 'moon-outline',
            title: 'Sleep disruption',
            body: 'Racing thoughts and elevated cortisol make it harder to fall asleep and stay asleep — creating a vicious cycle.',
          },
        ],
      },
      {
        title: 'Breaking the stress cycle',
        cards: [
          {
            icon: 'search-outline',
            title: 'Map your triggers',
            body: 'Track when symptoms flare — work overload, conflict, poor sleep, or skipped meals. Patterns reveal leverage points.',
          },
          {
            icon: 'shield-checkmark-outline',
            title: 'Set boundaries',
            body: 'Protect non-negotiable recovery time. Saying no to one commitment can prevent a week of symptoms.',
          },
          {
            icon: 'leaf-outline',
            title: 'Daily nervous-system resets',
            body: '5–10 minutes of slow breathing, a short walk, or body-scan meditation shifts you toward rest-and-digest mode.',
          },
          {
            icon: 'bed-outline',
            title: 'Repair sleep debt',
            body: 'Fixed wake time, dim light after 9 pm, and no screens in bed are foundational — not optional extras.',
          },
        ],
      },
      {
        title: 'When to seek professional help',
        cards: [
          {
            icon: 'medical-outline',
            title: 'See your GP if',
            body: 'Symptoms persist beyond 4 weeks, worsen despite lifestyle changes, or interfere with work and relationships.',
          },
          {
            icon: 'people-outline',
            title: 'Talking therapies',
            body: 'CBT, ACT, and counselling are effective for stress-related conditions and burnout — often available via NHS or workplace schemes.',
          },
          {
            icon: 'alert-circle-outline',
            title: 'Urgent support',
            body: 'If you feel unable to cope, have thoughts of self-harm, or experience chest pain or sudden neurological symptoms — seek urgent care.',
          },
        ],
      },
    ],
    tips: [
      {
        title: 'Try the 4-7-8 breath',
        body: 'Inhale 4 seconds, hold 7, exhale 8 — repeat 4 cycles before stressful meetings or at bedtime.',
      },
      {
        title: 'Move every 90 minutes',
        body: 'A 2-minute walk or stretch breaks the physical holding pattern that builds through desk work.',
      },
    ],
    relatedModuleIds: ['breathing', 'stress-assessment', 'chronic-stress'],
  },

  anxiety: {
    heroImageUrl: U('1544367567-0f2fcb009e0b'),
    heroIcon: 'heart-outline',
    accentColor: '#8E44AD',
    intro:
      'Anxiety is the body\'s alarm system working overtime. It is common, treatable, and not a sign of weakness. Learning how it works helps you respond rather than react.',
    keyTakeaways: [
      'Anxiety involves thoughts, body sensations, and avoidance behaviours',
      'Gradual exposure and breathing skills reduce the alarm over time',
      'Lifestyle pillars — sleep, movement, caffeine — strongly affect symptoms',
      'Professional support is highly effective when anxiety limits daily life',
    ],
    sections: [
      {
        title: 'Understanding anxiety',
        imageUrl: U('1499203364128-a8f58955574f', 800),
        cards: [
          { icon: 'flash-outline', title: 'Fight or flight', body: 'Rapid heart rate, sweating, and restlessness are normal alarm responses — uncomfortable but not dangerous.' },
          { icon: 'chatbubble-ellipses-outline', title: 'Worry loops', body: 'The mind searches for certainty. Naming “this is anxiety” can reduce the fear of fear itself.' },
          { icon: 'eye-off-outline', title: 'Avoidance', body: 'Skipping situations brings short relief but strengthens anxiety long term.' },
        ],
      },
      {
        title: 'What helps day to day',
        cards: [
          { icon: 'leaf-outline', title: 'Breathing & grounding', body: 'Extended exhale breathing and 5-4-3-2-1 sensory grounding calm the nervous system within minutes.' },
          { icon: 'walk-outline', title: 'Movement', body: '20–30 minutes of walking most days lowers baseline anxiety as effectively as some short-term interventions.' },
          { icon: 'cafe-outline', title: 'Caffeine & alcohol', body: 'Both can mimic or worsen anxiety. Trial reducing caffeine after noon for two weeks.' },
          { icon: 'moon-outline', title: 'Sleep routine', body: 'Consistent wake time and wind-down rituals reduce next-day anxiety sensitivity.' },
        ],
      },
    ],
    tips: [
      { title: 'Name it to tame it', body: 'Label the sensation: “This is anxiety, not danger.” It often peaks and passes within 20 minutes.' },
    ],
    relatedModuleIds: ['breathing', 'meditation'],
  },

  depression: {
    heroImageUrl: 'https://images.unsplash.com/photo-1499203364128-a8f58955574f?w=900&q=85&auto=format&fit=crop',
    heroIcon: 'sunny-outline',
    accentColor: '#3498DB',
    intro:
      'Depression is more than sadness — it affects energy, sleep, concentration, and hope. It is a medical condition with effective treatments and real recovery paths.',
    keyTakeaways: [
      'Persistent low mood for 2+ weeks warrants professional assessment',
      'Small actions — light, movement, connection — support recovery',
      'Treatment may include therapy, medication, or both',
      'Crisis support is available 24/7 if you have thoughts of self-harm',
    ],
    sections: [
      {
        title: 'Recognising depression',
        imageUrl: U('1516307361-4c4c126f5046', 800),
        cards: [
          { icon: 'cloud-outline', title: 'Mood & motivation', body: 'Low mood, loss of interest, and difficulty starting tasks that used to feel manageable.' },
          { icon: 'bed-outline', title: 'Sleep & energy', body: 'Insomnia or oversleeping, fatigue despite rest, and slowed thinking.' },
          { icon: 'nutrition-outline', title: 'Appetite changes', body: 'Significant weight loss or gain without intentional dieting.' },
        ],
      },
      {
        title: 'Evidence-based support',
        cards: [
          { icon: 'walk-outline', title: 'Behavioural activation', body: 'Schedule one small pleasant or meaningful activity daily — action often precedes motivation.' },
          { icon: 'people-outline', title: 'Social connection', body: 'Brief contact with someone you trust reduces isolation, a key depression driver.' },
          { icon: 'medical-outline', title: 'Professional care', body: 'GPs can assess severity, rule out physical causes, and refer to talking therapies or medication.' },
        ],
      },
      {
        title: 'Foods that support recovery',
        imageUrl: U('1546069901-ba9599a7e63c', 800),
        cards: [
          { icon: 'fish-outline', title: 'Omega-3 fatty acids', body: 'Oily fish twice weekly, or walnuts and flaxseed — linked to lower depression risk in population studies.' },
          { icon: 'leaf-outline', title: 'Fibre & fermented foods', body: 'Yogurt, kefir, beans, and whole grains support gut bacteria that influence mood regulation.' },
          { icon: 'nutrition-outline', title: 'Regular protein', body: 'Eggs, poultry, tofu, and legumes at each meal stabilise blood sugar and provide tryptophan for serotonin.' },
        ],
      },
      {
        title: 'Exercises that help',
        cards: [
          { icon: 'walk-outline', title: 'Walking', body: 'Start with 10 minutes daily, build to 30. Outdoor light adds benefit for circadian rhythm.' },
          { icon: 'barbell-outline', title: 'Resistance training', body: '2× weekly bodyweight squats, push-ups, and bands — improves mood and energy within weeks.' },
          { icon: 'leaf-outline', title: 'Yoga & stretching', body: 'Gentle yoga reduces rumination and muscle tension held from low mood.' },
        ],
      },
    ],
    relatedModuleIds: ['breathing', 'meditation'],
  },

  insomnia: {
    heroImageUrl: U('1541783245831-57d6fb0926d3'),
    heroIcon: 'moon-outline',
    accentColor: '#4338CA',
    intro:
      'Poor sleep erodes mood, immunity, and pain tolerance. Insomnia is treatable — often without medication — using behavioural strategies backed by clinical research.',
    keyTakeaways: [
      'Fixed wake time is more important than a fixed bedtime',
      'The bed should be strongly linked with sleep, not worry',
      'Stress and pain are common insomnia drivers',
      'See a GP if insomnia lasts beyond 3 months or you snore heavily',
    ],
    sections: [
      {
        title: 'Why sleep fails',
        imageUrl: U('1520206183501-b80d02d6b9a0', 800),
        cards: [
          { icon: 'pulse-outline', title: 'Hyperarousal', body: 'Stress keeps the brain in alert mode — racing thoughts at bedtime are a hallmark sign.' },
          { icon: 'time-outline', title: 'Irregular schedule', body: 'Shifting bed and wake times confuses the body clock and deepens insomnia.' },
          { icon: 'phone-portrait-outline', title: 'Screen light', body: 'Blue light delays melatonin. Dim screens 60–90 minutes before bed.' },
        ],
      },
      {
        title: 'CBT-I foundations',
        cards: [
          { icon: 'alarm-outline', title: 'Anchor wake time', body: 'Wake at the same time daily — including weekends — to stabilise circadian rhythm.' },
          { icon: 'bed-outline', title: 'Stimulus control', body: 'If awake 20+ minutes, leave the bed briefly. Return when sleepy. Bed = sleep only.' },
          { icon: 'leaf-outline', title: 'Wind-down ritual', body: '10-minute breathing, reading, or stretching signals safety to the nervous system.' },
        ],
      },
    ],
    relatedModuleIds: ['breathing', 'meditation'],
  },

  'back-pain': {
    heroImageUrl: U('1571019613454-1cb2f99b2d8b'),
    heroIcon: 'body-outline',
    accentColor: '#E67E22',
    intro:
      'Lower back pain is one of the most common health complaints — and one of the most misunderstood. Movement, not prolonged rest, is usually the best medicine.',
    keyTakeaways: [
      'Most back pain is not caused by serious structural damage',
      'Gentle movement and strengthening reduce recurrence',
      'Fear and avoidance often prolong pain more than tissue injury',
      'Red flags — leg weakness, numbness, bladder changes — need urgent review',
    ],
    sections: [
      {
        title: 'Understanding back pain',
        imageUrl: U('1518611012118-696072aa5798', 800),
        cards: [
          { icon: 'fitness-outline', title: 'Muscle & joint strain', body: 'Lifting, sitting, or deconditioning can irritate tissues — usually self-limiting within weeks.' },
          { icon: 'desktop-outline', title: 'Desk posture', body: 'Prolonged sitting loads the lumbar spine. Micro-breaks every 30–45 minutes help.' },
          { icon: 'warning-outline', title: 'Red flags', body: 'Seek urgent care for saddle numbness, bilateral leg weakness, or loss of bladder control.' },
        ],
      },
      {
        title: 'Recovery plan',
        cards: [
          { icon: 'walk-outline', title: 'Stay active', body: 'Short walks and gentle mobility beat bed rest for most non-specific back pain.' },
          { icon: 'barbell-outline', title: 'Core & glutes', body: 'Progressive strengthening of deep abdominals and hip muscles supports the spine.' },
          { icon: 'thermometer-outline', title: 'Heat & pacing', body: 'Heat for muscle spasm; pace activities to avoid boom-bust flare cycles.' },
        ],
      },
    ],
    relatedModuleIds: ['posture-analyzer'],
  },

  'neck-pain': {
    heroImageUrl: U('1599901860904-17e6ed7083a0'),
    heroIcon: 'body-outline',
    accentColor: '#E67E22',
    intro:
      'Neck pain often blends posture, stress tension, and phone use. Most cases improve with ergonomics, mobility work, and stress reduction.',
    keyTakeaways: [
      'Text neck and desk setup are frequent modern triggers',
      'Stress tightens upper trapezius and jaw muscles',
      'Gentle mobility beats aggressive cracking or manipulation alone',
      'Arm weakness or numbness needs medical assessment',
    ],
    sections: [
      {
        title: 'Common causes',
        imageUrl: U('1588776814546-1ffce6d9e3b5', 800),
        cards: [
          { icon: 'phone-portrait-outline', title: 'Forward head posture', body: 'Every inch the head shifts forward increases load on cervical vertebrae significantly.' },
          { icon: 'desktop-outline', title: 'Monitor height', body: 'Screen at eye level with shoulders relaxed reduces sustained strain.' },
          { icon: 'pulse-outline', title: 'Stress tension', body: 'Jaw clenching and raised shoulders during stress refer pain into the neck.' },
        ],
      },
      {
        title: 'Relief strategies',
        cards: [
          { icon: 'refresh-outline', title: 'Mobility drills', body: 'Slow chin tucks and upper-back extensions — 2 minutes every few hours.' },
          { icon: 'barbell-outline', title: 'Deep neck flexors', body: 'Gentle strengthening improves head carriage over time.' },
          { icon: 'thermometer-outline', title: 'Heat & release', body: 'Warm shower or heat pack on upper back eases muscle guarding.' },
        ],
      },
    ],
    relatedModuleIds: ['breathing'],
  },

  'chronic-stress': {
    heroImageUrl: U('1545389336-cf090694435e'),
    heroIcon: 'flash-outline',
    accentColor: '#9B59B6',
    intro:
      'Chronic stress keeps the sympathetic nervous system dominant — elevating cortisol, disrupting sleep, and dulling immunity. Recovery requires deliberate parasympathetic activation.',
    keyTakeaways: [
      'Prolonged fight-or-flight depletes physical and mental reserves',
      'Nature, breath, and social connection activate recovery mode',
      'Sleep and boundaries are biological necessities under chronic load',
      'Track trends in the app to spot improvement over weeks',
    ],
    sections: [
      {
        title: 'Sympathetic overload',
        imageUrl: U('150612661028-6e12ecbcdffb', 800),
        cards: [
          { icon: 'analytics-outline', title: 'Cortisol effects', body: 'Elevated cortisol impairs memory, wound healing, and glucose regulation over months.' },
          { icon: 'shield-outline', title: 'Immune impact', body: 'Frequent colds and slow recovery can signal chronic stress load.' },
          { icon: 'happy-outline', title: 'Mood changes', body: 'Irritability, anxiety, and low motivation often track with sustained stress.' },
        ],
      },
      {
        title: 'Recovery practices',
        cards: [
          { icon: 'leaf-outline', title: 'Parasympathetic daily', body: 'Breathing exercises, yoga, or 10-minute nature walks shift autonomic balance.' },
          { icon: 'people-outline', title: 'Connection', body: 'Quality social contact lowers cortisol — isolation amplifies stress biology.' },
          { icon: 'pause-circle-outline', title: 'Deliberate rest', body: 'Non-productive rest (not scrolling) is when the nervous system repairs.' },
        ],
      },
    ],
    relatedModuleIds: ['breathing', 'stress-assessment', 'stress-disorders'],
  },

  hypertension: {
    heroImageUrl: U('1576091160399-112ba8d25d1d'),
    heroIcon: 'heart-outline',
    accentColor: '#E74C3C',
    intro:
      'High blood pressure often has no symptoms but quietly damages arteries, kidneys, and the heart. Lifestyle changes and medication — when needed — prevent complications.',
    keyTakeaways: [
      'Home monitoring gives a clearer picture than occasional clinic readings',
      'Salt reduction and daily movement are first-line interventions',
      'Most adults aim below 140/90 mmHg — lower if diabetic',
      'Never stop prescribed medication without medical advice',
    ],
    sections: [
      {
        title: 'Understanding hypertension',
        imageUrl: U('1559757148-5c350d0d3c56', 800),
        cards: [
          { icon: 'eye-off-outline', title: 'Silent risk', body: 'Many people feel fine while pressure slowly injures blood vessels over years.' },
          { icon: 'nutrition-outline', title: 'Diet & salt', body: 'Reducing sodium and increasing potassium-rich plants supports vessel health.' },
          { icon: 'walk-outline', title: 'Activity', body: '150 minutes weekly moderate activity can lower systolic pressure by 5–8 mmHg.' },
        ],
      },
    ],
    relatedModuleIds: ['heart-rate-zones'],
  },

  diabetes: {
    heroImageUrl: U('1576091160550-2173dba999ef'),
    heroIcon: 'water-outline',
    accentColor: '#C0392B',
    intro:
      'Diabetes affects how the body regulates blood sugar. With active management — monitoring, nutrition, movement, and medication — most people live full, healthy lives.',
    keyTakeaways: [
      'Type 1 is autoimmune; type 2 involves insulin resistance',
      'Regular meals and fibre stabilise glucose swings',
      'Annual foot and eye checks prevent complications',
      'Work with your diabetes team for personalised targets',
    ],
    sections: [
      {
        title: 'Daily management',
        imageUrl: U('1490645935967-10de6ba17061', 800),
        cards: [
          { icon: 'analytics-outline', title: 'Monitoring', body: 'Track glucose as advised. Patterns reveal how food, stress, and sleep affect levels.' },
          { icon: 'nutrition-outline', title: 'Balanced plates', body: 'Pair carbohydrates with protein and fibre to slow glucose spikes.' },
          { icon: 'walk-outline', title: 'Movement', body: 'Post-meal walks improve insulin sensitivity within hours.' },
        ],
      },
    ],
    relatedModuleIds: ['meal-planner', 'macros'],
  },

  menopause: {
    heroImageUrl: U('1515377905703-3957b3cb8ef1'),
    heroIcon: 'flower-outline',
    accentColor: '#E91E63',
    intro:
      'Menopause is a natural transition with real symptoms — hot flushes, sleep disruption, mood shifts, and joint stiffness. Support exists, and options should be personalised with your GP.',
    keyTakeaways: [
      'Symptoms vary widely and can last several years',
      'HRT benefits and risks depend on age, history, and symptom burden',
      'Bone and heart health need extra attention after menopause',
      'Lifestyle — sleep, strength training, stress care — underpins all treatment',
    ],
    sections: [
      {
        title: 'What changes',
        imageUrl: U('1544367567-0f2fcb009e0b', 800),
        cards: [
          { icon: 'thermometer-outline', title: 'Hot flushes', body: 'Sudden heat and sweating — often worse with stress, alcohol, and spicy food.' },
          { icon: 'moon-outline', title: 'Sleep', body: 'Night sweats fragment sleep, worsening mood and concentration next day.' },
          { icon: 'fitness-outline', title: 'Bone & muscle', body: 'Declining oestrogen increases osteoporosis risk — weight-bearing exercise is protective.' },
        ],
      },
    ],
    relatedModuleIds: ['breathing'],
  },

  'long-covid-ext': {
    heroImageUrl: U('1584037861876-4232f8e0b0c0'),
    heroIcon: 'medkit-outline',
    accentColor: '#3498DB',
    intro:
      'Long COVID describes persistent symptoms weeks or months after infection — fatigue, brain fog, breathlessness, and post-exertional crashes. Pacing and specialist support are central to recovery.',
    keyTakeaways: [
      'Symptoms are real and not simply deconditioning',
      'Pacing prevents boom-bust crash cycles',
      'Gradual return to activity must respect energy limits',
      'Multidisciplinary clinics exist for complex cases — ask your GP',
    ],
    sections: [
      {
        title: 'Common symptoms',
        imageUrl: U('1576091160399-112ba8d25d1d', 800),
        cards: [
          { icon: 'battery-dead-outline', title: 'Fatigue', body: 'Disproportionate exhaustion after minimal activity — rest alone may not restore energy.' },
          { icon: 'cloud-outline', title: 'Brain fog', body: 'Difficulty concentrating, word-finding, and mental fatigue.' },
          { icon: 'fitness-outline', title: 'PEM', body: 'Post-exertional malaise — symptoms worsen 24–48 hours after physical or mental effort.' },
        ],
      },
    ],
    relatedModuleIds: ['breathing'],
  },

  'smoking-cessation-ext': {
    heroImageUrl: U('1571019613454-1cb2f99b2d8b'),
    heroIcon: 'ban-outline',
    accentColor: '#27AE60',
    intro:
      'Quitting smoking is one of the highest-impact health decisions you can make — benefits begin within hours and compound for decades. Support doubles success rates.',
    keyTakeaways: [
      'Nicotine replacement and prescription aids improve quit rates',
      'Triggers — stress, alcohol, social settings — need a plan',
      'Lung function begins improving within weeks of quitting',
      'Slips are common; recommit rather than giving up entirely',
    ],
    sections: [
      {
        title: 'Quitting strategies',
        imageUrl: U('1512621776951-a57141f2eefd', 800),
        cards: [
          { icon: 'calendar-outline', title: 'Set a quit date', body: 'Tell supporters, remove cigarettes from home, and line up NRT or medication with your GP.' },
          { icon: 'pulse-outline', title: 'Manage cravings', body: 'Cravings peak at 3–5 minutes. Delay, deep-breathe, drink water, change location.' },
          { icon: 'people-outline', title: 'Get support', body: 'NHS Stop Smoking services and apps with coaching improve long-term abstinence.' },
        ],
      },
    ],
    relatedModuleIds: ['breathing'],
  },

  'eye-health': {
    heroImageUrl: U('1579684385127-1ef15d508118'),
    heroIcon: 'eye-outline',
    accentColor: '#3498DB',
    intro:
      'Healthy eyes need more than reading glasses later in life. Nutrition (especially lutein, zeaxanthin, and omega-3s), hydration for the tear film, movement breaks from screens, UV protection, and regular sight tests all support comfort today and vision for decades.',
    keyTakeaways: [
      'Leafy greens, oily fish, eggs, colourful plants, nuts, and seeds feed macular and tear-film health',
      'Hydration + full blinks reduce dry, gritty screen strain',
      '20-20-20 breaks, near–far focus, and outdoor daylight protect focusing muscles',
      'UV sunglasses, sleep, no smoking, and routine NHS eye tests are non-negotiable basics',
    ],
    sections: [
      {
        title: 'Important foods for eyes',
        intro:
          'Lutein and zeaxanthin build macular pigment (natural blue-light filtering). Omega-3s support the retina and tear quality. Vitamins A, C, E, and zinc add antioxidant support — best from food first.',
        imageUrl: U('1490645935967-10de6ba17061', 800),
        cards: [
          {
            icon: 'leaf-outline',
            title: 'Leafy greens',
            body: 'Spinach, kale, and collards are top sources of lutein and zeaxanthin — carotenoids concentrated in the macula.',
          },
          {
            icon: 'fish-outline',
            title: 'Oily fish',
            body: 'Salmon, sardines, and mackerel provide EPA/DHA omega-3s linked with tear-film comfort and retinal structure.',
          },
          {
            icon: 'nutrition-outline',
            title: 'Eggs, colour & nuts',
            body: 'Egg yolks (lutein + fat for absorption), orange peppers/corn/berries (carotenoids & vitamin C), almonds and seeds (vitamin E).',
          },
          {
            icon: 'medical-outline',
            title: 'Supplements',
            body: 'AREDS2-style formulas may help some people with macular disease — only under optometrist/ophthalmologist or GP advice, not DIY megadoses.',
          },
        ],
      },
      {
        title: 'Hydration & surface comfort',
        intro: 'Screens cut blink rate roughly in half. Thin tears mean sting, blur, and end-of-day fatigue.',
        cards: [
          {
            icon: 'water-outline',
            title: 'Drink regularly',
            body: 'Most adults need about 1.5–2 litres of fluid daily — more with heat or exercise. Sip through the day rather than one late gulp.',
          },
          {
            icon: 'eye-outline',
            title: 'Blink on purpose',
            body: 'Every hour of screen time, do 10 slow full blinks. Lubricating drops can help if your optician agrees.',
          },
          {
            icon: 'thermometer-outline',
            title: 'Air & environment',
            body: 'Heating and AC dry the air. A desk humidifier and slightly lower screen brightness reduce evaporative stress.',
          },
        ],
      },
      {
        title: 'Exercises & visual hygiene',
        intro: 'You cannot “lift weights” for eyes, but you can rest focusing muscles and support circulation with whole-body movement.',
        imageUrl: U('1559757148-5c350d0d3c56', 800),
        cards: [
          {
            icon: 'timer-outline',
            title: '20-20-20 rule',
            body: 'Every 20 minutes, look about 20 feet (6 m) away for 20 seconds. Softens near-focus strain from phones and laptops.',
          },
          {
            icon: 'swap-horizontal-outline',
            title: 'Near–far focus',
            body: 'Focus on a thumb at arm’s length, then a distant object — 10 slow reps. Palming (warm hands over closed eyes) rests photostress.',
          },
          {
            icon: 'walk-outline',
            title: 'Move & go outside',
            body: 'Cardio and healthy weight support retinal vessels. Outdoor daylight is linked with healthier focusing development and circadian rhythm.',
          },
          {
            icon: 'desktop-outline',
            title: 'Ergonomics',
            body: 'Screen 50–65 cm away; top edge at or below eye level. Take a longer break every 2 hours.',
          },
        ],
      },
      {
        title: 'Daily protection checklist',
        cards: [
          {
            icon: 'sunny-outline',
            title: 'UV sunglasses',
            body: 'Wear UV-blocking lenses outdoors — including bright winter or reflective water/snow days.',
          },
          {
            icon: 'moon-outline',
            title: 'Sleep & lifestyle',
            body: '7–9 hours sleep, no smoking, and good blood pressure/sugar/cholesterol care protect long-term vision.',
          },
          {
            icon: 'calendar-outline',
            title: 'Sight tests',
            body: 'NHS eye exam about every 2 years (sooner if diabetic). Urgent care for sudden loss, flashes, floaters, or a curtain over vision.',
          },
        ],
      },
    ],
    tips: [
      {
        title: 'Food before pills',
        body: 'Build a plate with greens + colourful plants + oily fish or plant omegas most weeks before buying eye supplements.',
      },
      {
        title: 'Pair with screen habits',
        body: 'Open the Screen Time & Eye Strain module for digital wellness tips that stack with this guide.',
      },
    ],
    relatedModuleIds: ['screen-time', 'hydration', 'nutrition-basics', 'vitamins'],
  },

  'social-energy': {
    heroImageUrl: U('1529156069898-49953e39b3ac'),
    heroIcon: 'sparkles-outline',
    accentColor: '#9B59B6',
    intro:
      'Energy is not only calories and sleep — it is also what happens between people. Emotional contagion and relational energy research show we “catch” moods and capacity from others, and we pass our own state on. This module blends that science with honest quantum metaphors — inspiring, without pretending physics replaces psychology.',
    keyTakeaways: [
      'Biological energy (sleep, food, movement) is the foundation; social energy rides on top',
      'Quantum physics describes atoms — not a licence for unverified energy-healing claims',
      'You receive energy through safe, high-quality connection and emotional contagion',
      'You pass energy on by regulating yourself first, then offering presence, warmth, and help',
    ],
    sections: [
      {
        title: 'Three layers of energy',
        intro: 'Name which layer is low before you try to “fix” it with people alone.',
        imageUrl: U('150612661028-6e12ecbcdffb', 800),
        cards: [
          {
            icon: 'flash-outline',
            title: 'Biological fuel',
            body: 'Sleep, nutrition, hydration, and movement refill cellular energy (ATP). Social magic fails when you are exhausted or underfuelled.',
          },
          {
            icon: 'happy-outline',
            title: 'Felt vitality',
            body: 'Subjective alertness, motivation, and mood. Track patterns with the Energy Level Tracker in Fitness Hub.',
          },
          {
            icon: 'people-outline',
            title: 'Relational energy',
            body: 'Interactions that leave you more resourceful — or depleted. Organisational research calls this relational energy; daily life calls it “that person lights me up.”',
          },
        ],
      },
      {
        title: 'Quantum metaphors — kept honest',
        intro:
          'Quantum mechanics is real science of the very small. Wellness culture often uses its language poetically. Use the poetry; keep the claims careful.',
        imageUrl: U('1462331940025-5067ab60f09e', 800),
        cards: [
          {
            icon: 'planet-outline',
            title: 'What physics actually says',
            body: 'Particles, atoms, and light follow quantum rules. Your body is made of those — but that does not mean thoughts telepathically rearrange someone’s health.',
          },
          {
            icon: 'bulb-outline',
            title: 'Useful metaphor',
            body: '“We are interconnected fields of attention” is a poetic way to say: presence, focus, and emotion synchronise between people.',
          },
          {
            icon: 'shield-checkmark-outline',
            title: 'What we will not claim',
            body: 'No quantum rays, no substitute for medical care, no guilt if you cannot “manifest” someone else’s healing. Boundaries are healthy physics of your own nervous system.',
          },
        ],
      },
      {
        title: 'How to receive energy from people',
        intro:
          'Emotional contagion (Hatfield et al.) shows we mimic expressions and physiology, then feel related emotions. Choose your inputs wisely.',
        imageUrl: U('1522202176988-662fde403958', 800),
        cards: [
          {
            icon: 'sunny-outline',
            title: 'Seek energisers',
            body: 'People who leave you clearer, kinder, and more capable. Shared laughter, outdoor time, and being truly heard are high-yield.',
          },
          {
            icon: 'ear-outline',
            title: 'Ask to be received',
            body: 'Tell a trusted person what you need: pep talk, quiet company, or problem-solving. Vague venting to the wrong audience drains both of you.',
          },
          {
            icon: 'battery-half-outline',
            title: 'Spot drainers',
            body: 'Chronic criticism, chaos, or one-way crisis dumping lowers capacity. Shorten exposure, change topic, or recover alone afterward.',
          },
          {
            icon: 'leaf-outline',
            title: 'Pair people with nature',
            body: 'Walk-and-talks combine social co-regulation with daylight and movement — a triple refill.',
          },
        ],
      },
      {
        title: 'How to pass energy on',
        intro:
          'Others catch your state before your sentences. Leadership and care research: regulate yourself, then offer presence.',
        imageUrl: U('1511632765481-a2144b43b54e', 800),
        cards: [
          {
            icon: 'pulse-outline',
            title: 'Self-regulate first',
            body: 'Four calm breaths, drop shoulders, soften jaw. An anxious helper spreads anxiety; a steady one co-regulates.',
          },
          {
            icon: 'chatbubbles-outline',
            title: 'Give full attention',
            body: 'Phone down, eyes soft, reflect back what you heard. Feeling seen is one of the strongest energy gifts.',
          },
          {
            icon: 'heart-outline',
            title: 'Specific appreciation',
            body: '“I noticed how you handled X” lands harder than generic praise — it deposits real relational fuel.',
          },
          {
            icon: 'hand-left-outline',
            title: 'Concrete help',
            body: 'Carry a bag, send a useful link, cover a task. Action transmits care more reliably than advice alone.',
          },
        ],
      },
      {
        title: 'A simple daily exchange ritual',
        imageUrl: U('1544367567-0f2fcb009e0b', 800),
        cards: [
          {
            icon: 'arrow-down-outline',
            title: 'Receive',
            body: 'One intentional energising contact each morning — message, hug, or shared coffee.',
          },
          {
            icon: 'arrow-up-outline',
            title: 'Transmit',
            body: 'One deliberate gift of presence or kindness before the day ends.',
          },
          {
            icon: 'moon-outline',
            title: 'Recover',
            body: 'Solo downtime is not selfish — empty batteries cannot charge others. Sleep is energy physics you can measure.',
          },
        ],
      },
    ],
    tips: [
      {
        title: 'Try Breathing Exercises first',
        body: 'If you feel depleted before a social moment, box or extended-exhale breathing steadies what you will pass on.',
      },
      {
        title: 'Track patterns',
        body: 'Log energy before/after key interactions in the Energy Level Tracker — data reveals your true energisers.',
      },
    ],
    relatedModuleIds: ['breathing', 'energy-level', 'five-minute-calm', 'loving-kindness', 'stress-mindfulness'],
  },
};
