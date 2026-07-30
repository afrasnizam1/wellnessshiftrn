// src/screens/fitness/CalculatorScreen.tsx
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../theme';
import { resolveCalculatorId } from '../../utils/fitnessModuleRouter';
import AppScreen from '../../components/common/AppScreen';

// ─── Calculator logic ────────────────────────────────────────────────────────

const CALCULATORS: Record<string, {
  title: string; icon: string; color: string;
  intro?: string;
  fields: { key: string; label: string; placeholder: string; unit: string; keyboard: any }[];
  calculate: (inputs: Record<string, number>) => { label: string; value: string; desc: string }[];
}> = {
  bmi: {
    title: 'BMI Calculator', icon: '⚖️', color: Colors.physical,
    fields: [
      { key: 'weight', label: 'Weight', placeholder: '70', unit: 'kg', keyboard: 'decimal-pad' },
      { key: 'height', label: 'Height', placeholder: '175', unit: 'cm', keyboard: 'decimal-pad' },
    ],
    calculate: ({ weight, height }) => {
      const h = height / 100;
      const bmi = weight / (h * h);
      const cat = bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Normal weight' : bmi < 30 ? 'Overweight' : 'Obese';
      return [
        { label: 'BMI', value: bmi.toFixed(1), desc: cat },
        { label: 'Category', value: cat, desc: 'Based on WHO guidelines' },
      ];
    },
  },
  bmr: {
    title: 'BMR & TDEE', icon: '🔥', color: '#E74C3C',
    fields: [
      { key: 'weight', label: 'Weight', placeholder: '70', unit: 'kg', keyboard: 'decimal-pad' },
      { key: 'height', label: 'Height', placeholder: '175', unit: 'cm', keyboard: 'decimal-pad' },
      { key: 'age', label: 'Age', placeholder: '30', unit: 'yrs', keyboard: 'decimal-pad' },
    ],
    calculate: ({ weight, height, age }) => {
      const bmr = 10 * weight + 6.25 * height - 5 * age + 5;
      return [
        { label: 'BMR', value: `${Math.round(bmr)} kcal`, desc: 'Calories at complete rest' },
        { label: 'Sedentary TDEE', value: `${Math.round(bmr * 1.2)} kcal`, desc: 'Little or no exercise' },
        { label: 'Moderate TDEE', value: `${Math.round(bmr * 1.55)} kcal`, desc: '3–5 days exercise/week' },
        { label: 'Active TDEE', value: `${Math.round(bmr * 1.725)} kcal`, desc: '6–7 days exercise/week' },
      ];
    },
  },
  hydration: {
    title: 'Hydration Calculator', icon: '💧', color: '#3498DB',
    fields: [
      { key: 'weight', label: 'Weight', placeholder: '70', unit: 'kg', keyboard: 'decimal-pad' },
      { key: 'activity', label: 'Activity (mins/day)', placeholder: '30', unit: 'min', keyboard: 'decimal-pad' },
    ],
    calculate: ({ weight, activity }) => {
      const base = weight * 35;
      const extra = activity * 12;
      const total = base + extra;
      return [
        { label: 'Daily water', value: `${Math.round(total)} ml`, desc: 'Recommended intake' },
        { label: 'Glasses', value: `${Math.round(total / 250)}`, desc: '250ml glasses per day' },
        { label: 'Activity bonus', value: `+${Math.round(extra)} ml`, desc: 'Extra for exercise' },
      ];
    },
  },
  'heart-rate-zones': {
    title: 'Heart Rate Zones', icon: '💓', color: '#E74C3C',
    fields: [
      { key: 'age', label: 'Age', placeholder: '30', unit: 'yrs', keyboard: 'decimal-pad' },
    ],
    calculate: ({ age }) => {
      const max = 220 - age;
      return [
        { label: 'Max HR', value: `${max} bpm`, desc: 'Estimated maximum' },
        { label: 'Zone 1 (50–60%)', value: `${Math.round(max * 0.5)}–${Math.round(max * 0.6)} bpm`, desc: 'Light activity / warm-up' },
        { label: 'Zone 2 (60–70%)', value: `${Math.round(max * 0.6)}–${Math.round(max * 0.7)} bpm`, desc: 'Fat burning / aerobic' },
        { label: 'Zone 3 (70–80%)', value: `${Math.round(max * 0.7)}–${Math.round(max * 0.8)} bpm`, desc: 'Cardio / aerobic' },
        { label: 'Zone 4 (80–90%)', value: `${Math.round(max * 0.8)}–${Math.round(max * 0.9)} bpm`, desc: 'Threshold training' },
        { label: 'Zone 5 (90–100%)', value: `${Math.round(max * 0.9)}–${max} bpm`, desc: 'Maximum effort' },
      ];
    },
  },
  'sleep-debt': {
    title: 'Sleep Debt Calculator', icon: '😴', color: Colors.sleep,
    fields: [
      { key: 'needed', label: 'Hours needed per night', placeholder: '8', unit: 'hrs', keyboard: 'decimal-pad' },
      { key: 'actual', label: 'Average hours you get', placeholder: '6', unit: 'hrs', keyboard: 'decimal-pad' },
      { key: 'days', label: 'Days this has been going on', placeholder: '7', unit: 'days', keyboard: 'decimal-pad' },
    ],
    calculate: ({ needed, actual, days }) => {
      const debt = (needed - actual) * days;
      return [
        { label: 'Sleep debt', value: `${debt.toFixed(1)} hrs`, desc: debt > 0 ? 'You need to catch up' : 'You\'re ahead!' },
        { label: 'Daily deficit', value: `${(needed - actual).toFixed(1)} hrs`, desc: 'Per night shortfall' },
        { label: 'Recovery estimate', value: debt > 0 ? `~${Math.ceil(debt / 1.5)} days` : 'None needed', desc: 'Adding 1.5 hrs/night' },
      ];
    },
  },
  macros: {
    title: 'Macro Calculator', icon: '🥗', color: Colors.nutrition,
    fields: [
      { key: 'calories', label: 'Daily calories', placeholder: '2000', unit: 'kcal', keyboard: 'decimal-pad' },
      { key: 'weight', label: 'Body weight', placeholder: '70', unit: 'kg', keyboard: 'decimal-pad' },
    ],
    calculate: ({ calories, weight }) => {
      const proteinG = Math.round(weight * 1.8);
      const proteinCal = proteinG * 4;
      const fatCal = calories * 0.25;
      const fatG = Math.round(fatCal / 9);
      const carbG = Math.round((calories - proteinCal - fatCal) / 4);
      return [
        { label: 'Protein', value: `${proteinG}g`, desc: '~1.8g per kg body weight' },
        { label: 'Carbs', value: `${carbG}g`, desc: 'Remaining calories' },
        { label: 'Fat', value: `${fatG}g`, desc: '~25% of total calories' },
      ];
    },
  },
  'vo2-max': {
    title: 'VO₂ Max Estimator', icon: '🫀', color: Colors.fitness,
    fields: [
      { key: 'age', label: 'Age', placeholder: '30', unit: 'yrs', keyboard: 'decimal-pad' },
      { key: 'restingHr', label: 'Resting heart rate', placeholder: '65', unit: 'bpm', keyboard: 'decimal-pad' },
    ],
    calculate: ({ age, restingHr }) => {
      const vo2 = 15.3 * ((220 - age) / restingHr);
      const level = vo2 >= 50 ? 'Excellent' : vo2 >= 40 ? 'Good' : vo2 >= 30 ? 'Fair' : 'Below average';
      return [
        { label: 'Estimated VO₂ max', value: vo2.toFixed(1), desc: 'ml/kg/min (Uth–Sørensen formula)' },
        { label: 'Fitness level', value: level, desc: 'General population reference' },
      ];
    },
  },
  'one-rep-max': {
    title: 'One-Rep Max', icon: '🏋️', color: Colors.fitness,
    fields: [
      { key: 'weight', label: 'Weight lifted', placeholder: '80', unit: 'kg', keyboard: 'decimal-pad' },
      { key: 'reps', label: 'Reps completed', placeholder: '5', unit: 'reps', keyboard: 'decimal-pad' },
    ],
    calculate: ({ weight, reps }) => {
      const orm = weight * (1 + reps / 30);
      return [
        { label: 'Estimated 1RM', value: `${orm.toFixed(1)} kg`, desc: 'Epley formula' },
        { label: '85% training weight', value: `${(orm * 0.85).toFixed(1)} kg`, desc: 'Strength training zone' },
        { label: '70% training weight', value: `${(orm * 0.7).toFixed(1)} kg`, desc: 'Hypertrophy zone' },
      ];
    },
  },
  'intermittent-fast': {
    title: 'Intermittent Fasting', icon: '⏳', color: '#F39C12',
    fields: [
      { key: 'wakeHour', label: 'Wake time (24h)', placeholder: '7', unit: 'hr', keyboard: 'decimal-pad' },
      { key: 'fastHours', label: 'Fasting window', placeholder: '16', unit: 'hrs', keyboard: 'decimal-pad' },
    ],
    calculate: ({ wakeHour, fastHours }) => {
      const eatStart = (wakeHour + fastHours) % 24;
      const eatEnd = (eatStart + (24 - fastHours)) % 24;
      return [
        { label: 'Eating window opens', value: `${Math.floor(eatStart)}:00`, desc: 'Approximate start time' },
        { label: 'Eating window closes', value: `${Math.floor(eatEnd)}:00`, desc: 'Begin fasting again' },
        { label: 'Eating hours', value: `${24 - fastHours} hrs`, desc: `${fastHours}-hour fast` },
      ];
    },
  },
  'stress-assessment': {
    title: 'Stress Assessment', icon: '📊', color: Colors.stress,
    intro: 'Rate each domain honestly — this is a snapshot, not a diagnosis. Your score highlights where to focus: breathing for acute stress, sleep hygiene for recovery, or movement for tension release.',
    fields: [
      { key: 'work', label: 'Work stress (1–10)', placeholder: '5', unit: '/10', keyboard: 'decimal-pad' },
      { key: 'sleep', label: 'Sleep quality (1–10)', placeholder: '5', unit: '/10', keyboard: 'decimal-pad' },
      { key: 'mood', label: 'Mood (1–10)', placeholder: '5', unit: '/10', keyboard: 'decimal-pad' },
      { key: 'physical', label: 'Physical tension (1–10)', placeholder: '5', unit: '/10', keyboard: 'decimal-pad' },
    ],
    calculate: ({ work, sleep, mood, physical }) => {
      const invertedSleep = 11 - sleep;
      const score = (work + invertedSleep + (11 - mood) + physical) / 4;
      const level = score <= 3 ? 'Low stress' : score <= 6 ? 'Moderate stress' : 'High stress';
      const tips = score <= 3
        ? ['Keep your current routines', 'Log mood weekly to catch early shifts', 'Share what works with your care team']
        : score <= 6
        ? ['Try 5 min box breathing today', 'Take a 10-minute walk without your phone', 'Review sleep — aim for consistent wake time']
        : ['Use Meditation Timer for 10 min tonight', 'Prioritise 7+ hours sleep', 'Consider speaking with a GP or counsellor'];
      return [
        { label: 'Stress score', value: score.toFixed(1), desc: 'Out of 10 — composite of work, sleep, mood, and tension' },
        { label: 'Level', value: level, desc: tips[0] },
        { label: 'Action 1', value: '→', desc: tips[1] },
        { label: 'Action 2', value: '→', desc: tips[2] },
      ];
    },
  },
  'body-fat': {
    title: 'Body Fat Calculator', icon: '📏', color: '#8E44AD',
    fields: [
      { key: 'gender', label: 'Gender (1=male, 2=female)', placeholder: '1', unit: '', keyboard: 'decimal-pad' },
      { key: 'height', label: 'Height', placeholder: '175', unit: 'cm', keyboard: 'decimal-pad' },
      { key: 'neck', label: 'Neck circumference', placeholder: '38', unit: 'cm', keyboard: 'decimal-pad' },
      { key: 'waist', label: 'Waist circumference', placeholder: '85', unit: 'cm', keyboard: 'decimal-pad' },
      { key: 'hip', label: 'Hip (female only)', placeholder: '95', unit: 'cm', keyboard: 'decimal-pad' },
    ],
    calculate: ({ gender, height, neck, waist, hip }) => {
      const isMale = gender === 1;
      const bf = isMale
        ? 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450
        : 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.221 * Math.log10(height)) - 450;
      const pct = Math.max(3, Math.min(60, bf));
      const cat = isMale
        ? (pct < 6 ? 'Essential fat' : pct < 14 ? 'Athletes' : pct < 18 ? 'Fitness' : pct < 25 ? 'Average' : 'Above average')
        : (pct < 14 ? 'Essential fat' : pct < 21 ? 'Athletes' : pct < 25 ? 'Fitness' : pct < 32 ? 'Average' : 'Above average');
      return [
        { label: 'Body fat', value: `${pct.toFixed(1)}%`, desc: 'U.S. Navy circumference method' },
        { label: 'Category', value: cat, desc: 'Estimate only — not a medical diagnosis' },
      ];
    },
  },
  'protein-calculator': {
    title: 'Protein Calculator', icon: '🥩', color: '#27AE60',
    fields: [
      { key: 'weight', label: 'Body weight', placeholder: '70', unit: 'kg', keyboard: 'decimal-pad' },
      { key: 'activity', label: 'Activity (1–4)', placeholder: '2', unit: 'lvl', keyboard: 'decimal-pad' },
      { key: 'goal', label: 'Goal (1=loss, 2=maintain, 3=gain)', placeholder: '2', unit: '', keyboard: 'decimal-pad' },
    ],
    calculate: ({ weight, activity, goal }) => {
      const activityMult = [0.8, 1.0, 1.2, 1.6][Math.min(3, Math.max(0, activity - 1))] ?? 1.0;
      const goalMult = [1.0, 1.0, 1.2][Math.min(2, Math.max(0, goal - 1))] ?? 1.0;
      const grams = Math.round(weight * activityMult * goalMult);
      const perMeal = Math.round(grams / 3);
      const labels = ['Sedentary', 'Moderate', 'Intense', 'Athlete'];
      const goals = ['Weight loss', 'Maintenance', 'Muscle gain'];
      return [
        { label: 'Daily protein', value: `${grams}g`, desc: `${labels[Math.min(3, activity - 1)] ?? 'Moderate'} · ${goals[Math.min(2, goal - 1)] ?? 'Maintenance'}` },
        { label: 'Per meal (~3)', value: `${perMeal}g`, desc: 'Spread across meals for best absorption' },
      ];
    },
  },
  'waist-hip': {
    title: 'Waist-to-Hip Ratio', icon: '📐', color: '#5B2C6F',
    fields: [
      { key: 'gender', label: 'Gender (1=male, 2=female)', placeholder: '1', unit: '', keyboard: 'decimal-pad' },
      { key: 'waist', label: 'Waist', placeholder: '85', unit: 'cm', keyboard: 'decimal-pad' },
      { key: 'hip', label: 'Hip', placeholder: '95', unit: 'cm', keyboard: 'decimal-pad' },
    ],
    calculate: ({ gender, waist, hip }) => {
      const ratio = waist / hip;
      const isMale = gender === 1;
      const risk = isMale
        ? (ratio < 0.9 ? 'Low risk' : ratio < 1.0 ? 'Moderate risk' : 'High risk')
        : (ratio < 0.8 ? 'Low risk' : ratio < 0.85 ? 'Moderate risk' : 'High risk');
      return [
        { label: 'WHR', value: ratio.toFixed(2), desc: 'Waist ÷ hip circumference' },
        { label: 'CV risk', value: risk, desc: 'General population reference ranges' },
      ];
    },
  },
  'body-composition': {
    title: 'Body Composition Analysis', icon: '⚖️', color: Colors.physical,
    fields: [
      { key: 'gender', label: 'Gender (1=male, 2=female)', placeholder: '1', unit: '', keyboard: 'decimal-pad' },
      { key: 'weight', label: 'Weight', placeholder: '70', unit: 'kg', keyboard: 'decimal-pad' },
      { key: 'height', label: 'Height', placeholder: '175', unit: 'cm', keyboard: 'decimal-pad' },
      { key: 'neck', label: 'Neck circumference', placeholder: '38', unit: 'cm', keyboard: 'decimal-pad' },
      { key: 'waist', label: 'Waist circumference', placeholder: '85', unit: 'cm', keyboard: 'decimal-pad' },
      { key: 'hip', label: 'Hip (female only)', placeholder: '95', unit: 'cm', keyboard: 'decimal-pad' },
    ],
    calculate: ({ gender, weight, height, neck, waist, hip }) => {
      const isMale = gender === 1;
      const h = height / 100;
      const bmi = weight / (h * h);
      const bmiCat = bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Normal' : bmi < 30 ? 'Overweight' : 'Obese';
      const bfRaw = isMale
        ? 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450
        : 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.221 * Math.log10(height)) - 450;
      const bf = Math.max(3, Math.min(60, bfRaw));
      const fatMass = weight * (bf / 100);
      const leanMass = weight - fatMass;
      return [
        { label: 'BMI', value: bmi.toFixed(1), desc: bmiCat },
        { label: 'Body fat', value: `${bf.toFixed(1)}%`, desc: 'U.S. Navy circumference estimate' },
        { label: 'Fat mass', value: `${fatMass.toFixed(1)} kg`, desc: 'Estimated adipose tissue' },
        { label: 'Lean mass', value: `${leanMass.toFixed(1)} kg`, desc: 'Muscle, bone, organs & water' },
      ];
    },
  },
  'strength-assessment': {
    title: 'Strength Assessment', icon: '💪', color: Colors.fitness,
    intro: 'Perform each test with good form. Compare your results to age-adjusted benchmarks — use this to pick your starting point in the Workout Library.',
    fields: [
      { key: 'gender', label: 'Gender (1=male, 2=female)', placeholder: '1', unit: '', keyboard: 'decimal-pad' },
      { key: 'age', label: 'Age', placeholder: '30', unit: 'yrs', keyboard: 'decimal-pad' },
      { key: 'pushups', label: 'Push-ups in 60 sec', placeholder: '20', unit: 'reps', keyboard: 'decimal-pad' },
      { key: 'plank', label: 'Plank hold', placeholder: '45', unit: 'sec', keyboard: 'decimal-pad' },
      { key: 'squats', label: 'Bodyweight squats in 60 sec', placeholder: '25', unit: 'reps', keyboard: 'decimal-pad' },
    ],
    calculate: ({ gender, age, pushups, plank, squats }) => {
      const isMale = gender === 1;
      const ageAdj = age > 55 ? 0.7 : age > 40 ? 0.85 : 1;

      const pushScore = isMale
        ? (pushups >= 35 * ageAdj ? 10 : pushups >= 25 * ageAdj ? 8 : pushups >= 15 * ageAdj ? 6 : pushups >= 8 * ageAdj ? 4 : 2)
        : (pushups >= 25 * ageAdj ? 10 : pushups >= 18 * ageAdj ? 8 : pushups >= 10 * ageAdj ? 6 : pushups >= 5 * ageAdj ? 4 : 2);

      const plankScore = plank >= 90 * ageAdj ? 10 : plank >= 60 * ageAdj ? 8 : plank >= 45 * ageAdj ? 6 : plank >= 30 * ageAdj ? 4 : 2;
      const squatScore = squats >= 40 * ageAdj ? 10 : squats >= 30 * ageAdj ? 8 : squats >= 20 * ageAdj ? 6 : squats >= 12 * ageAdj ? 4 : 2;

      const overall = (pushScore + plankScore + squatScore) / 3;
      const level = overall >= 8 ? 'Strong' : overall >= 6 ? 'Average' : overall >= 4 ? 'Developing' : 'Needs work';
      const tip = overall >= 8
        ? 'Maintain with progressive overload 2–3× weekly.'
        : overall >= 6
        ? 'Add 1–2 strength sessions per week focusing on weak areas.'
        : 'Start with bodyweight circuits in the Workout Library module.';
      const actions = overall >= 8
        ? ['Add resistance bands or dumbbells for progression', 'Track plank time monthly', 'Pair with protein-rich recovery meals']
        : overall >= 6
        ? ['Focus on your lowest sub-score first', 'Try Quick Strength Circuit 2× this week', 'Rest 48h between strength days']
        : ['Begin with Beginner Full Body workout', 'Aim for 3×10 squats with perfect form', 'Celebrate consistency over intensity'];

      return [
        { label: 'Overall score', value: `${overall.toFixed(1)}/10`, desc: level },
        { label: 'Upper body', value: `${pushScore}/10`, desc: `${pushups} push-ups · ${plank}s plank` },
        { label: 'Lower body', value: `${squatScore}/10`, desc: `${squats} squats in 60 sec` },
        { label: 'Recommendation', value: level, desc: tip },
        { label: 'Next step', value: '→', desc: actions[0] },
        { label: 'This week', value: '→', desc: actions[1] },
      ];
    },
  },
};

export default function CalculatorScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const calcId = resolveCalculatorId(route.params?.calculatorId ?? 'bmi');
  const calc = CALCULATORS[calcId] ?? CALCULATORS.bmi;

  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [results, setResults] = useState<{ label: string; value: string; desc: string }[]>([]);
  const [calculated, setCalculated] = useState(false);

  const handleCalculate = () => {
    const nums: Record<string, number> = {};
    for (const f of calc.fields) {
      const v = parseFloat(inputs[f.key]);
      if (isNaN(v) || v <= 0) return;
      nums[f.key] = v;
    }
    setResults(calc.calculate(nums));
    setCalculated(true);
  };

  return (
    <AppScreen style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{calc.title}</Text>
        <View style={{ width: 40 }} />
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={[styles.heroCard, { backgroundColor: calc.color + '15' }]}>
            <Text style={styles.heroIcon}>{calc.icon}</Text>
            <Text style={[styles.heroTitle, { color: calc.color }]}>{calc.title}</Text>
            {calc.intro ? <Text style={styles.heroIntro}>{calc.intro}</Text> : null}
          </View>

          <View style={styles.card}>
            {calc.fields.map((f) => (
              <View key={f.key} style={styles.field}>
                <Text style={styles.fieldLabel}>{f.label}</Text>
                <View style={styles.inputRow}>
                  <TextInput
                    style={styles.input}
                    placeholder={f.placeholder}
                    placeholderTextColor={Colors.textTertiary}
                    keyboardType={f.keyboard}
                    value={inputs[f.key] ?? ''}
                    onChangeText={(v) => {
                      setInputs((i) => ({ ...i, [f.key]: v }));
                      setCalculated(false);
                    }}
                  />
                  <Text style={styles.unit}>{f.unit}</Text>
                </View>
              </View>
            ))}

            <TouchableOpacity
              style={[styles.calcBtn, { backgroundColor: calc.color }]}
              onPress={handleCalculate}
            >
              <Text style={styles.calcBtnText}>Calculate</Text>
            </TouchableOpacity>
          </View>

          {calculated && results.length > 0 && (
            <View style={styles.resultsCard}>
              <Text style={styles.resultsTitle}>Results</Text>
              {results.map((r) => (
                <View key={r.label} style={styles.resultRow}>
                  <View style={styles.resultInfo}>
                    <Text style={styles.resultLabel}>{r.label}</Text>
                    <Text style={styles.resultDesc}>{r.desc}</Text>
                  </View>
                  <Text style={[styles.resultValue, { color: calc.color }]}>{r.value}</Text>
                </View>
              ))}
            </View>
          )}

          <View style={{ height: Spacing.xl }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: Spacing.base, paddingVertical: Spacing.md,
    backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  backBtn: { width: 40 },
  backText: { fontSize: 32, color: Colors.primary, lineHeight: 38 },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  content: { padding: Spacing.base, gap: Spacing.md },
  heroCard: { borderRadius: Radius.xl, padding: Spacing.xl, alignItems: 'center', gap: Spacing.md },
  heroIcon: { fontSize: 48 },
  heroTitle: { fontSize: Typography.size.xl, fontWeight: '700' },
  heroIntro: { fontSize: Typography.size.sm, color: Colors.textSecondary, textAlign: 'center', lineHeight: 20 },
  card: { backgroundColor: Colors.white, borderRadius: Radius.xl, padding: Spacing.xl, ...Shadow.sm, gap: Spacing.base },
  field: { gap: Spacing.xs },
  fieldLabel: { fontSize: Typography.size.sm, fontWeight: '600', color: Colors.text },
  inputRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  input: {
    flex: 1, borderWidth: 1.5, borderColor: Colors.border,
    borderRadius: Radius.md, paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md, fontSize: Typography.size.lg,
    color: Colors.text, fontWeight: '600',
  },
  unit: { fontSize: Typography.size.sm, color: Colors.textSecondary, width: 36 },
  calcBtn: {
    borderRadius: Radius.xl, paddingVertical: Spacing.base,
    alignItems: 'center', marginTop: Spacing.sm,
  },
  calcBtnText: { color: Colors.white, fontSize: Typography.size.base, fontWeight: '700' },
  resultsCard: {
    backgroundColor: Colors.white, borderRadius: Radius.xl,
    padding: Spacing.base, ...Shadow.sm, gap: Spacing.md,
  },
  resultsTitle: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  resultRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: Spacing.sm, borderBottomWidth: 1, borderBottomColor: Colors.borderLight,
  },
  resultInfo: { flex: 1 },
  resultLabel: { fontSize: Typography.size.sm, fontWeight: '600', color: Colors.text },
  resultDesc: { fontSize: Typography.size.xs, color: Colors.textSecondary, marginTop: 2 },
  resultValue: { fontSize: Typography.size.base, fontWeight: '700' },
});
