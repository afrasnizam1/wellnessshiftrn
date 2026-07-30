import type { IoniconName } from '../theme/icons';
import type { RichHealthEducation } from './healthEducationRichContent';

const U = (id: string, w = 900) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=85&auto=format&fit=crop`;

/** Sports, injury & extended condition guides with recovery, nutrition & exercise detail */
export const HEALTH_EDUCATION_RICH_EXTENDED: Record<string, RichHealthEducation> = {
  'acl-injury': {
    heroImageUrl: U('1571019613454-1cb2f99b2d8b'),
    heroIcon: 'fitness-outline',
    accentColor: '#2980B9',
    intro:
      'An ACL (anterior cruciate ligament) tear is a common knee injury in sports that involve pivoting, jumping, or sudden direction changes. Recovery is a marathon, not a sprint — structured rehab, nutrition, and patience determine how well you return to activity.',
    keyTakeaways: [
      'A pop, rapid swelling, and knee instability often signal an ACL tear',
      'Early physiotherapy improves outcomes whether or not you have surgery',
      'Protein, vitamin C, and omega-3s support ligament and tissue healing',
      'Return to sport only when strength, balance, and hop tests pass clinical criteria',
    ],
    sections: [
      {
        title: 'Understanding the injury',
        intro: 'The ACL stabilises the knee during twisting movements. Partial tears may heal with rehab; complete tears often need reconstruction for high-demand sports.',
        imageUrl: U('1517836357463-d25dfeac3438', 800),
        cards: [
          { icon: 'warning-outline', title: 'How it happens', body: 'Non-contact pivoting, awkward landings from jumps, or direct blows to the knee are the most common mechanisms.' },
          { icon: 'medical-outline', title: 'Signs to expect', body: 'Audible pop, swelling within hours, feeling the knee may give way, and difficulty bearing weight initially.' },
          { icon: 'clipboard-outline', title: 'Diagnosis', body: 'Physical exam plus MRI confirms tear grade. Your orthopaedic team discusses surgery vs conservative rehab based on age, activity level, and joint stability.' },
        ],
      },
      {
        title: 'Phase 1 — Initial recovery (weeks 0–2)',
        cards: [
          { icon: 'snow-outline', title: 'RICE protocol', body: 'Rest from pivoting sports, Ice 15–20 min every 2–3 hours, Compression sleeve, Elevation above heart level to reduce swelling.' },
          { icon: 'walk-outline', title: 'Mobility & swelling', body: 'Gentle knee bending within pain-free range, ankle pumps, and quad sets (tighten thigh without moving knee) prevent stiffness.' },
          { icon: 'bandage-outline', title: 'Bracing & crutches', body: 'Use crutches until you walk without a limp. A brace may be prescribed — follow your physio\'s weight-bearing instructions exactly.' },
        ],
      },
      {
        title: 'Foods that support healing',
        intro: 'Nutrition cannot replace rehab, but it provides the building blocks for tissue repair.',
        imageUrl: U('1546069901-ba9599a7e63c', 800),
        cards: [
          { icon: 'nutrition-outline', title: 'Protein at every meal', body: 'Aim for 1.2–1.6 g/kg body weight daily — chicken, fish, eggs, Greek yogurt, lentils, and tofu support collagen synthesis.' },
          { icon: 'leaf-outline', title: 'Vitamin C & colourful plants', body: 'Citrus, berries, peppers, and broccoli aid collagen formation. Fill half your plate with vegetables.' },
          { icon: 'fish-outline', title: 'Omega-3 fats', body: 'Salmon, sardines, walnuts, and flaxseed reduce inflammation — helpful in the first weeks after injury.' },
          { icon: 'water-outline', title: 'Hydration & minerals', body: 'Water, leafy greens, nuts, and seeds supply magnesium and zinc for tissue repair. Limit alcohol — it impairs healing and sleep.' },
        ],
      },
      {
        title: 'Rehab exercises (physio-guided)',
        intro: 'Never progress exercises if you feel sharp pain or increasing swelling. These are typical phases — your physiotherapist will personalise them.',
        cards: [
          { icon: 'body-outline', title: 'Early activation', body: 'Quad sets, straight-leg raises, glute bridges, and calf raises — 2–3 sets of 10–15 reps daily to maintain muscle without stressing the graft.' },
          { icon: 'barbell-outline', title: 'Strength phase (weeks 4–12+)', body: 'Mini squats to chair, step-ups, leg press (light), hamstring curls, and hip abduction band walks rebuild supporting muscles.' },
          { icon: 'git-branch-outline', title: 'Balance & proprioception', body: 'Single-leg stands, wobble board drills, and lateral band walks retrain the knee to sense position — critical before running.' },
          { icon: 'football-outline', title: 'Return-to-run criteria', body: 'Usually months 4–9 post-surgery: no swelling, quad strength ≥90% of other leg, pain-free hopping, and clearance from your physio before jogging.' },
        ],
      },
      {
        title: 'Return to sport & prevention',
        cards: [
          { icon: 'checkmark-done-outline', title: 'Clearance tests', body: 'Hop tests, agility drills, and psychological readiness matter. Premature return raises re-injury risk significantly.' },
          { icon: 'shield-outline', title: 'Injury prevention', body: 'FIFA 11+ style warm-ups, hamstring and glute strengthening, and learning safe landing mechanics reduce future ACL risk.' },
          { icon: 'time-outline', title: 'Realistic timeline', body: 'Return to competitive sport is often 9–12 months post-reconstruction. Patience with rehab beats rushing back.' },
        ],
      },
    ],
    tips: [
      { title: 'Sleep is medicine', body: 'Aim for 7–9 hours — growth hormone and tissue repair peak during deep sleep.' },
      { title: 'Train the uninjured leg', body: 'Single-leg work on the good side maintains systemic strength and speeds overall recovery.' },
    ],
    relatedModuleIds: ['sports-injuries', 'breathing'],
  },

  'runner-knee': {
    heroImageUrl: U('1517836357463-d25dfeac3438'),
    heroIcon: 'walk-outline',
    accentColor: '#E67E22',
    intro:
      'Runner\'s knee (patellofemoral pain) causes ache around or behind the kneecap, often worsening with stairs, squatting, or long runs. It usually responds well to load management, hip strengthening, and gradual return.',
    keyTakeaways: [
      'Weak hips and quads often overload the kneecap joint',
      'Reducing weekly mileage temporarily allows inflammation to settle',
      'Targeted exercises fix the root cause better than rest alone',
      'Proper footwear and running surfaces reduce recurrence',
    ],
    sections: [
      {
        title: 'What causes it',
        cards: [
          { icon: 'trending-up-outline', title: 'Training errors', body: 'Sudden mileage jumps, downhill running, or skipping rest days overload the patellofemoral joint.' },
          { icon: 'body-outline', title: 'Biomechanics', body: 'Weak glutes and inner quads let the kneecap track poorly. Tight IT bands and calves add stress.' },
        ],
      },
      {
        title: 'Recovery plan',
        cards: [
          { icon: 'pause-circle-outline', title: 'Load management', body: 'Reduce running 30–50% for 2 weeks. Swap in cycling or swimming to maintain fitness without knee compression.' },
          { icon: 'thermometer-outline', title: 'Pain-guided activity', body: 'Mild ache during exercise that settles within 24 hours is usually OK. Sharp pain or next-day swelling means back off.' },
        ],
      },
      {
        title: 'Anti-inflammatory nutrition',
        cards: [
          { icon: 'nutrition-outline', title: 'Mediterranean pattern', body: 'Olive oil, oily fish, nuts, and colourful vegetables support joint comfort and recovery.' },
          { icon: 'cafe-outline', title: 'Limit triggers', body: 'Some people find high sugar and processed foods worsen inflammation. Stay hydrated — dehydration thickens synovial fluid.' },
        ],
      },
      {
        title: 'Exercises that help',
        cards: [
          { icon: 'barbell-outline', title: 'Hip & glute strength', body: 'Clamshells, side-lying leg raises, monster walks with band — 3 sets of 12–15, 4× weekly.' },
          { icon: 'fitness-outline', title: 'Quad without compression', body: 'Wall sits (30–45 sec holds), terminal knee extensions with band, and step-downs from low height.' },
          { icon: 'resize-outline', title: 'Flexibility', body: 'Foam roll quads, IT band, and calves. Stretch hip flexors after sitting-heavy days.' },
        ],
      },
    ],
    relatedModuleIds: ['sports-injuries'],
  },

  'achilles-tendonitis': {
    heroImageUrl: U('1518611012118-696072aa5798'),
    heroIcon: 'footsteps-outline',
    accentColor: '#16A085',
    intro:
      'Achilles tendinopathy causes morning stiffness and pain in the heel cord, common in runners and jumpers. Eccentric loading — controlled lengthening under load — is the gold-standard rehab approach.',
    keyTakeaways: [
      'Complete rest alone rarely fixes chronic Achilles pain',
      'Eccentric heel drops are the cornerstone exercise',
      'Sudden increases in running volume are the main trigger',
      'Proper footwear and calf flexibility reduce recurrence',
    ],
    sections: [
      {
        title: 'Understanding tendinopathy',
        cards: [
          { icon: 'time-outline', title: 'Acute vs chronic', body: 'New irritation needs load reduction. Pain >3 months responds to structured eccentric rehab, not just ice and rest.' },
          { icon: 'warning-outline', title: 'Red flags', body: 'Sudden pop with inability to push off may be rupture — seek urgent care, do not stretch aggressively.' },
        ],
      },
      {
        title: 'Recovery steps',
        cards: [
          { icon: 'walk-outline', title: 'Modify activity', body: 'Reduce hill sprints and jumping. Heel raises in shoes with a slight heel lift reduce tendon strain initially.' },
          { icon: 'snow-outline', title: 'Pain control', body: 'Ice after activity, avoid barefoot walking on hard floors during flare-ups.' },
        ],
      },
      {
        title: 'Foods for tendon health',
        cards: [
          { icon: 'nutrition-outline', title: 'Collagen support', body: 'Protein with vitamin C 30–60 min before rehab (e.g. yogurt + berries) may support collagen synthesis around exercise.' },
          { icon: 'leaf-outline', title: 'Overall diet', body: 'Adequate calories, omega-3s, and minerals from whole foods — tendons need consistent fuel, not extreme restriction.' },
        ],
      },
      {
        title: 'Key exercises',
        cards: [
          { icon: 'arrow-down-outline', title: 'Eccentric heel drops', body: 'Rise on both feet, lower slowly on injured side over 3 seconds — 3 sets of 15 twice daily on a step.' },
          { icon: 'barbell-outline', title: 'Progressive loading', body: 'Add weighted backpack when drops become easy. Introduce hopping only when pain-free walking and single-leg calf raises.' },
          { icon: 'resize-outline', title: 'Calf mobility', body: 'Gentle soleus and gastroc stretches — avoid aggressive stretching into sharp pain.' },
        ],
      },
    ],
    relatedModuleIds: ['sports-injuries'],
  },

  'sports-injuries': {
    heroImageUrl: U('1517836357463-d25dfeac3438'),
    heroIcon: 'medkit-outline',
    accentColor: '#C0392B',
    intro:
      'Most sports injuries improve with a structured approach: protect the area, control swelling, restore movement, rebuild strength, then return to sport gradually. The RICE principle is your first 48-hour toolkit.',
    keyTakeaways: [
      'RICE in the first 48 hours: Rest, Ice, Compression, Elevation',
      'Early gentle movement beats prolonged immobilisation for most soft-tissue injuries',
      'Protein and hydration support tissue repair',
      'Return to play only when strength and function match the uninjured side',
    ],
    sections: [
      {
        title: 'The RICE protocol',
        cards: [
          { icon: 'bed-outline', title: 'Rest', body: 'Stop the activity that caused pain. Relative rest — not complete bed rest — keeps circulation flowing.' },
          { icon: 'snow-outline', title: 'Ice', body: '15–20 minutes every 2–3 hours for the first 48 hours. Use a cloth barrier to protect skin.' },
          { icon: 'bandage-outline', title: 'Compression & elevation', body: 'Elastic bandage reduces swelling. Elevate above heart level when resting.' },
        ],
      },
      {
        title: 'Nutrition for recovery',
        cards: [
          { icon: 'nutrition-outline', title: 'Protein priority', body: '20–30 g protein per meal from lean meats, fish, eggs, dairy, or legumes.' },
          { icon: 'leaf-outline', title: 'Plants & omega-3s', body: 'Colourful vegetables and oily fish support a balanced inflammatory response during healing.' },
        ],
      },
      {
        title: 'Rehab progression',
        cards: [
          { icon: 'body-outline', title: 'Restore range of motion', body: 'Gentle mobility within pain-free limits in the first week.' },
          { icon: 'barbell-outline', title: 'Rebuild strength', body: 'Isometric holds first, then resistance exercises for muscles around the injury.' },
          { icon: 'football-outline', title: 'Sport-specific drills', body: 'Agility, cutting, and impact only after strength and hop tests are pain-free.' },
        ],
      },
    ],
    relatedModuleIds: ['acl-injury', 'breathing'],
  },

  'joint-pain-arthritis': {
    heroImageUrl: U('1571019613454-1cb2f99b2d8b'),
    heroIcon: 'body-outline',
    accentColor: '#8E44AD',
    intro:
      'Arthritis causes joint pain, stiffness, and reduced mobility — but movement remains one of the best treatments. The right exercises strengthen supporting muscles without overloading damaged cartilage.',
    keyTakeaways: [
      'Motion is lotion — gentle daily movement reduces stiffness',
      'Anti-inflammatory eating may ease symptom flares',
      'Low-impact cardio protects joints while improving fitness',
      'Heat before activity and ice after can manage symptoms',
    ],
    sections: [
      {
        title: 'Living with joint pain',
        cards: [
          { icon: 'sunny-outline', title: 'Morning stiffness', body: 'Warm shower or gentle movement for 10 minutes before demanding tasks.' },
          { icon: 'calendar-outline', title: 'Pace activities', body: 'Break tasks into chunks. Avoid doing everything on a good day then crashing.' },
        ],
      },
      {
        title: 'Joint-friendly nutrition',
        cards: [
          { icon: 'nutrition-outline', title: 'Mediterranean diet', body: 'Olive oil, fish, nuts, beans, and vegetables — associated with lower inflammatory markers.' },
          { icon: 'scale-outline', title: 'Healthy weight', body: 'Each kilogram lost reduces knee load by roughly 4 kg when walking.' },
          { icon: 'water-outline', title: 'Hydration', body: 'Synovial fluid needs water. Limit excess alcohol which worsens inflammation and sleep.' },
        ],
      },
      {
        title: 'Best exercises',
        cards: [
          { icon: 'water-outline', title: 'Low-impact cardio', body: 'Swimming, cycling, and elliptical training build fitness without joint pounding.' },
          { icon: 'barbell-outline', title: 'Strength training', body: 'Leg press, seated rows, and resistance bands — focus on slow controlled reps, not heavy loading into pain.' },
          { icon: 'body-outline', title: 'Flexibility', body: 'Daily gentle stretching for hips, hamstrings, and calves. Yoga modified for your limits.' },
        ],
      },
    ],
    relatedModuleIds: ['breathing'],
  },

  sciatica: {
    heroImageUrl: U('1599901860904-17e6ed7083a0'),
    heroIcon: 'flash-outline',
    accentColor: '#9B59B6',
    intro:
      'Sciatica is nerve pain radiating from the lower back into the buttock and leg — often sharp, burning, or tingling. Most cases improve within 6–12 weeks with movement, positioning, and nerve glides.',
    keyTakeaways: [
      'Bed rest beyond 1–2 days usually delays recovery',
      'Nerve flossing exercises can reduce irritation when done gently',
      'Anti-inflammatory foods and healthy weight reduce spinal load',
      'Seek urgent care for bowel/bladder changes or severe leg weakness',
    ],
    sections: [
      {
        title: 'What\'s happening',
        cards: [
          { icon: 'git-branch-outline', title: 'Nerve irritation', body: 'Disc bulge or tight muscles compress the sciatic nerve. Pain follows the nerve path down the leg.' },
          { icon: 'warning-outline', title: 'Red flags', body: 'Numbness in saddle area, loss of bladder control, or foot drop need emergency assessment.' },
        ],
      },
      {
        title: 'Recovery approach',
        cards: [
          { icon: 'walk-outline', title: 'Keep moving', body: 'Short frequent walks. Change position every 30 minutes — prolonged sitting compresses discs.' },
          { icon: 'bed-outline', title: 'Sleep position', body: 'Side sleeping with pillow between knees, or back with pillow under knees reduces nerve tension.' },
        ],
      },
      {
        title: 'Nutrition support',
        cards: [
          { icon: 'leaf-outline', title: 'Anti-inflammatory foods', body: 'Fatty fish, turmeric with black pepper, leafy greens, and berries.' },
          { icon: 'nutrition-outline', title: 'Bone & disc health', body: 'Calcium, vitamin D, and adequate protein support spinal tissues long term.' },
        ],
      },
      {
        title: 'Exercises',
        cards: [
          { icon: 'body-outline', title: 'Nerve glides', body: 'Gentle sciatic nerve flossing as taught by physio — stop if symptoms intensify down the leg.' },
          { icon: 'barbell-outline', title: 'Core stability', body: 'Bird-dog, dead bug, and pelvic tilts build support without flexing the spine aggressively.' },
          { icon: 'resize-outline', title: 'Hip flexibility', body: 'Piriformis and hip flexor stretches — hold 30 sec, avoid bouncing.' },
        ],
      },
    ],
    relatedModuleIds: ['back-pain'],
  },
};
