// src/data/conditionContent.ts
import { ConditionContent } from './healthConditions';

export type { ConditionContent };

export const CONDITION_CONTENT: Record<string, ConditionContent> = {
  depression: {
    overview: 'Depression is a common but serious mood disorder that affects how you feel, think, and handle daily activities. It requires long-term treatment and can significantly impact quality of life.',
    symptoms: [
      { name: 'Persistent Sadness', description: 'Feeling down, sad, or hopeless most of the day, nearly every day', severity: 'severe' },
      { name: 'Loss of Interest', description: 'No longer finding pleasure in activities you once enjoyed', severity: 'severe' },
      { name: 'Fatigue', description: 'Overwhelming tiredness that doesn\'t improve with rest', severity: 'moderate' },
      { name: 'Sleep Changes', description: 'Sleeping too much or too little, or waking up early', severity: 'moderate' },
      { name: 'Appetite Changes', description: 'Significant weight loss or gain, changes in eating patterns', severity: 'moderate' },
      { name: 'Difficulty Concentrating', description: 'Trouble focusing, making decisions, or remembering things', severity: 'moderate' },
      { name: 'Physical Symptoms', description: 'Unexplained headaches, body aches, or digestive issues', severity: 'mild' },
    ],
    causes: [
      { type: 'Biological', description: 'Brain chemistry imbalances, genetics, and changes in brain structure' },
      { type: 'Psychological', description: 'Trauma, chronic stress, low self-esteem, or personality traits' },
      { type: 'Environmental', description: 'Social isolation, major life events, or lack of support systems' },
    ],
    diagnosis: [
      { test: 'Clinical Interview', description: 'Comprehensive discussion about symptoms, thoughts, feelings, and behavior patterns' },
      { test: 'Physical Exam', description: 'Rule out physical conditions that could cause similar symptoms' },
      { test: 'Lab Tests', description: 'Blood tests to check thyroid function and other medical conditions' },
      { test: 'Psychological Evaluation', description: 'Assessment of mental health status and functioning' },
    ],
    treatment: [
      { category: 'therapy', name: 'Cognitive Behavioral Therapy (CBT)', description: 'Helps identify and change negative thought patterns and behaviors', effectiveness: 'High' },
      { category: 'therapy', name: 'Interpersonal Therapy', description: 'Focuses on improving relationships and social functioning', effectiveness: 'High' },
      { category: 'medication', name: 'Antidepressants', description: 'SSRIs, SNRIs, or other medications to balance brain chemicals', effectiveness: 'Moderate to High' },
      { category: 'lifestyle', name: 'Exercise', description: 'Regular physical activity can improve mood and reduce symptoms', effectiveness: 'Moderate' },
      { category: 'lifestyle', name: 'Sleep Hygiene', description: 'Consistent sleep schedule and good sleep habits', effectiveness: 'Moderate' },
    ],
    lifestyle: [
      {
        area: 'Exercise',
        recommendations: ['30 minutes of moderate activity most days', 'Include both cardio and strength training', 'Start with gentle activities if needed'],
        benefits: 'Releases endorphins, improves sleep, reduces stress'
      },
      {
        area: 'Nutrition',
        recommendations: ['Eat regular, balanced meals', 'Include omega-3 rich foods', 'Limit alcohol and caffeine'],
        benefits: 'Stabilizes mood, supports brain health'
      },
      {
        area: 'Sleep',
        recommendations: ['Maintain consistent sleep schedule', 'Create relaxing bedtime routine', 'Avoid screens before bed'],
        benefits: 'Improves mood regulation and cognitive function'
      },
      {
        area: 'Social Connection',
        recommendations: ['Stay connected with friends and family', 'Join support groups', 'Participate in community activities'],
        benefits: 'Reduces isolation, provides emotional support'
      },
    ],
    complications: [
      { name: 'Suicide Risk', description: 'Increased risk of suicidal thoughts and behaviors', prevention: 'Seek immediate help for suicidal thoughts, remove means, create safety plan' },
      { name: 'Physical Health Decline', description: 'Neglect of physical health and self-care', prevention: 'Regular medical check-ups, maintain basic hygiene and nutrition' },
      { name: 'Relationship Problems', description: 'Strain on personal and professional relationships', prevention: 'Open communication, family therapy, setting realistic expectations' },
      { name: 'Substance Abuse', description: 'Increased risk of alcohol or drug dependence', prevention: 'Healthy coping mechanisms, professional help, support groups' },
    ],
    resources: [
      { type: 'support', title: 'National Suicide Prevention Lifeline', description: '24/7 crisis support and resources' },
      { type: 'article', title: 'Understanding Depression', description: 'Comprehensive guide to depression symptoms and treatment' },
      { type: 'exercise', title: 'Mood-Boosting Workout Routine', description: 'Exercise program specifically designed for depression management' },
      { type: 'video', title: 'CBT Techniques for Depression', description: 'Learn practical cognitive behavioral therapy techniques' },
    ],
  },

  anxiety: {
    overview: 'Anxiety disorders involve excessive fear, worry, and related behavioral disturbances. They can significantly impact daily functioning and quality of life, but are highly treatable with proper care.',
    symptoms: [
      { name: 'Excessive Worry', description: 'Persistent, uncontrollable worry about various aspects of life', severity: 'severe' },
      { name: 'Physical Tension', description: 'Muscle tightness, trembling, or feeling on edge', severity: 'moderate' },
      { name: 'Panic Attacks', description: 'Sudden episodes of intense fear with physical symptoms', severity: 'severe' },
      { name: 'Avoidance', description: 'Avoiding situations that trigger anxiety', severity: 'moderate' },
      { name: 'Sleep Disturbances', description: 'Difficulty falling or staying asleep due to worry', severity: 'moderate' },
      { name: 'Concentration Problems', description: 'Trouble focusing due to racing thoughts', severity: 'moderate' },
    ],
    causes: [
      { type: 'Genetic', description: 'Family history and genetic predisposition' },
      { type: 'Brain Chemistry', description: 'Imbalances in neurotransmitters like serotonin and GABA' },
      { type: 'Environmental', description: 'Stressful life events, trauma, or chronic stress' },
      { type: 'Medical', description: 'Certain medical conditions or medications can trigger anxiety' },
    ],
    diagnosis: [
      { test: 'Psychological Evaluation', description: 'Detailed assessment of symptoms, thoughts, and behaviors' },
      { test: 'Medical Exam', description: 'Rule out physical conditions that may cause anxiety symptoms' },
      { test: 'Diagnostic Criteria', description: 'Evaluation against DSM-5 criteria for anxiety disorders' },
    ],
    treatment: [
      { category: 'therapy', name: 'Cognitive Behavioral Therapy', description: 'Helps identify and challenge anxious thought patterns', effectiveness: 'High' },
      { category: 'therapy', name: 'Exposure Therapy', description: 'Gradual exposure to feared situations to reduce anxiety', effectiveness: 'High' },
      { category: 'medication', name: 'Anti-Anxiety Medications', description: 'SSRIs, benzodiazepines, or beta-blockers', effectiveness: 'Moderate to High' },
      { category: 'lifestyle', name: 'Mindfulness and Meditation', description: 'Techniques to stay present and reduce worry', effectiveness: 'Moderate' },
      { category: 'lifestyle', name: 'Regular Exercise', description: 'Reduces anxiety symptoms and improves stress resilience', effectiveness: 'Moderate' },
    ],
    lifestyle: [
      {
        area: 'Stress Management',
        recommendations: ['Practice deep breathing exercises', 'Use progressive muscle relaxation', 'Schedule regular breaks'],
        benefits: 'Reduces immediate anxiety and builds long-term resilience'
      },
      {
        area: 'Physical Activity',
        recommendations: ['30 minutes of moderate exercise daily', 'Include yoga or tai chi', 'Practice mindful movement'],
        benefits: 'Reduces muscle tension and improves mood'
      },
      {
        area: 'Sleep',
        recommendations: ['Maintain consistent sleep schedule', 'Practice relaxation techniques before bed', 'Limit caffeine after noon'],
        benefits: 'Improves emotional regulation and reduces anxiety'
      },
      {
        area: 'Diet',
        recommendations: ['Limit caffeine and alcohol', 'Eat regular, balanced meals', 'Include foods rich in magnesium and B vitamins'],
        benefits: 'Supports nervous system and reduces anxiety symptoms'
      },
    ],
    complications: [
      { name: 'Depression', description: 'Increased risk of developing depression', prevention: 'Early treatment, stress management, support systems' },
      { name: 'Substance Abuse', description: 'Risk of self-medication with drugs or alcohol', prevention: 'Healthy coping strategies, professional help' },
      { name: 'Social Isolation', description: 'Withdrawal from social activities and relationships', prevention: 'Gradual exposure, support groups, therapy' },
      { name: 'Physical Health Issues', description: 'Chronic stress can affect cardiovascular and immune health', prevention: 'Regular medical care, stress reduction techniques' },
    ],
    resources: [
      { type: 'support', title: 'Anxiety and Depression Association', description: 'Resources and support for anxiety disorders' },
      { type: 'article', title: 'Managing Anxiety Attacks', description: 'Step-by-step guide for handling panic attacks' },
      { type: 'exercise', title: 'Anxiety-Relief Yoga Routine', description: 'Gentle yoga practice specifically for anxiety reduction' },
      { type: 'video', title: 'Mindfulness for Anxiety', description: 'Guided mindfulness exercises for anxiety management' },
    ],
  },

  hypertension: {
    overview: 'High blood pressure is a common condition where the force of blood against artery walls is too high. Often called the "silent killer" because it typically has no symptoms but can lead to serious health complications.',
    symptoms: [
      { name: 'Usually Asymptomatic', description: 'Most people have no noticeable symptoms', severity: 'mild' },
      { name: 'Headaches', description: 'Occasional headaches, particularly in the morning', severity: 'mild' },
      { name: 'Nosebleeds', description: 'More frequent or severe nosebleeds', severity: 'mild' },
      { name: 'Shortness of Breath', description: 'Difficulty breathing during physical activity', severity: 'moderate' },
    ],
    causes: [
      { type: 'Primary', description: 'No identifiable cause, develops gradually over years' },
      { type: 'Secondary', description: 'Caused by underlying conditions like kidney disease or thyroid problems' },
      { type: 'Lifestyle', description: 'Poor diet, lack of exercise, obesity, and stress' },
      { type: 'Genetic', description: 'Family history and genetic predisposition' },
    ],
    diagnosis: [
      { test: 'Blood Pressure Measurement', description: 'Multiple readings over time to confirm diagnosis', preparation: 'Avoid caffeine, exercise, and smoking for 30 minutes before' },
      { test: 'Blood Tests', description: 'Check cholesterol, kidney function, and other markers' },
      { test: 'ECG/EKG', description: 'Electrocardiogram to check heart function' },
      { test: 'Echocardiogram', description: 'Ultrasound to examine heart structure and function' },
    ],
    treatment: [
      { category: 'lifestyle', name: 'DASH Diet', description: 'Dietary Approaches to Stop Hypertension eating plan', effectiveness: 'High' },
      { category: 'lifestyle', name: 'Regular Exercise', description: '150 minutes of moderate aerobic activity weekly', effectiveness: 'High' },
      { category: 'lifestyle', name: 'Sodium Reduction', description: 'Limit sodium to less than 2,300mg daily', effectiveness: 'Moderate' },
      { category: 'medication', name: 'ACE Inhibitors', description: 'Relax blood vessels by blocking angiotensin production', effectiveness: 'High' },
      { category: 'medication', name: 'Diuretics', description: 'Help kidneys remove sodium and water from the body', effectiveness: 'High' },
    ],
    lifestyle: [
      {
        area: 'Diet',
        recommendations: ['Follow DASH diet principles', 'Limit processed foods', 'Increase fruits and vegetables', 'Reduce sodium intake'],
        benefits: 'Lowers blood pressure and improves overall cardiovascular health'
      },
      {
        area: 'Exercise',
        recommendations: ['30 minutes of moderate activity most days', 'Include both cardio and strength training', 'Monitor blood pressure during exercise'],
        benefits: 'Strengthens heart, improves circulation, reduces stress'
      },
      {
        area: 'Weight Management',
        recommendations: ['Maintain healthy BMI through diet and exercise'],
        benefits: 'Every pound lost can lower blood pressure by about 1 point'
      },
      {
        area: 'Stress Reduction',
        recommendations: ['Practice relaxation techniques', 'Get adequate sleep', 'Limit alcohol consumption'],
        benefits: 'Reduces temporary blood pressure spikes and long-term cardiovascular strain'
      },
    ],
    complications: [
      { name: 'Heart Disease', description: 'Increased risk of heart attack and heart failure', prevention: 'Blood pressure control, regular cardiac monitoring' },
      { name: 'Stroke', description: 'Higher risk of both ischemic and hemorrhagic stroke', prevention: 'Blood pressure management, lifestyle modifications' },
      { name: 'Kidney Disease', description: 'Can damage kidneys over time', prevention: 'Regular kidney function tests, blood pressure control' },
      { name: 'Vision Problems', description: 'Can damage blood vessels in the eyes', prevention: 'Regular eye exams, blood pressure control' },
    ],
    resources: [
      { type: 'article', title: 'DASH Diet Guide', description: 'Complete guide to the DASH eating plan' },
      { type: 'exercise', title: 'Blood Pressure-Friendly Workout', description: 'Exercise routine safe for those with hypertension' },
      { type: 'video', title: 'Home Blood Pressure Monitoring', description: 'How to properly monitor blood pressure at home' },
      { type: 'diet', title: 'Low-Sodium Meal Plans', description: 'Delicious meal plans with reduced sodium content' },
    ],
  },

  diabetes: {
    overview: 'Type 2 diabetes is a chronic condition that affects how your body metabolizes sugar (glucose). With type 2 diabetes, your body either resists the effects of insulin or doesn\'t produce enough insulin to maintain normal glucose levels.',
    symptoms: [
      { name: 'Increased Thirst', description: 'Feeling unusually thirsty and drinking more fluids', severity: 'moderate' },
      { name: 'Frequent Urination', description: 'Needing to urinate more often, especially at night', severity: 'moderate' },
      { name: 'Fatigue', description: 'Persistent tiredness and lack of energy', severity: 'moderate' },
      { name: 'Blurred Vision', description: 'Vision may become blurry, especially when blood sugar is high', severity: 'mild' },
      { name: 'Slow Healing', description: 'Cuts and sores take longer to heal', severity: 'mild' },
      { name: 'Numbness', description: 'Tingling or numbness in hands or feet', severity: 'mild' },
    ],
    causes: [
      { type: 'Insulin Resistance', description: 'Cells become resistant to insulin\'s effects' },
      { type: 'Genetic', description: 'Strong genetic component and family history' },
      { type: 'Lifestyle', description: 'Obesity, sedentary lifestyle, poor diet' },
      { type: 'Age', description: 'Risk increases with age, especially after 45' },
    ],
    diagnosis: [
      { test: 'A1C Test', description: 'Measures average blood sugar over 2-3 months', preparation: 'No special preparation needed' },
      { test: 'Fasting Blood Sugar', description: 'Blood sugar test after overnight fast', preparation: 'No food or drink (except water) for 8 hours before' },
      { test: 'Glucose Tolerance Test', description: 'Measures blood sugar before and after drinking glucose solution', preparation: 'Fast overnight, drink glucose solution at lab' },
      { test: 'Random Blood Sugar', description: 'Blood sugar test at any time of day', preparation: 'No preparation needed' },
    ],
    treatment: [
      { category: 'lifestyle', name: 'Diet Management', description: 'Balanced diet with controlled carbohydrate intake', effectiveness: 'High' },
      { category: 'lifestyle', name: 'Regular Exercise', description: '150 minutes of moderate activity weekly', effectiveness: 'High' },
      { category: 'lifestyle', name: 'Weight Management', description: 'Achieving and maintaining healthy weight', effectiveness: 'High' },
      { category: 'medication', name: 'Metformin', description: 'Reduces glucose production in liver', effectiveness: 'High' },
      { category: 'medication', name: 'Insulin Therapy', description: 'Injectable insulin when other treatments aren\'t enough', effectiveness: 'High' },
    ],
    lifestyle: [
      {
        area: 'Nutrition',
        recommendations: ['Count carbohydrates consistently', 'Choose whole grains over refined', 'Include lean proteins', 'Eat regular meals'],
        benefits: 'Stabilizes blood sugar and prevents spikes'
      },
      {
        area: 'Physical Activity',
        recommendations: ['30 minutes of moderate exercise daily', 'Include both aerobic and strength training', 'Monitor blood sugar around exercise'],
        benefits: 'Improves insulin sensitivity and lowers blood sugar'
      },
      {
        area: 'Blood Sugar Monitoring',
        recommendations: ['Check blood sugar as directed', 'Keep a log of readings', 'Know your target ranges'],
        benefits: 'Helps manage diabetes and prevent complications'
      },
      {
        area: 'Foot Care',
        recommendations: ['Inspect feet daily', 'Keep feet clean and dry', 'Wear proper footwear', 'See a podiatrist regularly'],
        benefits: 'Prevents diabetes-related foot complications'
      },
    ],
    complications: [
      { name: 'Heart Disease', description: 'Increased risk of heart attack and stroke', prevention: 'Blood sugar control, regular cardiac monitoring' },
      { name: 'Kidney Disease', description: 'Can lead to kidney failure over time', prevention: 'Blood sugar and blood pressure control' },
      { name: 'Nerve Damage', description: 'Neuropathy causing pain, numbness, or tingling', prevention: 'Blood sugar control, regular foot care' },
      { name: 'Eye Damage', description: 'Diabetic retinopathy can cause vision loss', prevention: 'Regular eye exams, blood sugar control' },
    ],
    resources: [
      { type: 'article', title: 'Diabetes Meal Planning', description: 'Complete guide to diabetic-friendly nutrition' },
      { type: 'exercise', title: 'Safe Exercise for Diabetics', description: 'Workout routines designed for diabetes management' },
      { type: 'video', title: 'Blood Sugar Monitoring Guide', description: 'How to properly monitor and interpret blood sugar readings' },
      { type: 'diet', title: 'Diabetes-Friendly Recipes', description: 'Delicious recipes that help manage blood sugar' },
    ],
  },
};
