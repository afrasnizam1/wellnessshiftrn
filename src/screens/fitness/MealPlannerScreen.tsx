import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal,
  TextInput, KeyboardAvoidingView, Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../theme';
import { AppCard, BrandButton } from '../../components/ui';
import {
  DAYS, MEAL_OPTIONS, MEAL_SLOTS, type DayKey, type MealSlot,
  dayCalories, dayProtein, emptyWeekPlan, generateBalancedWeek,
  getMealById, type WeekPlan,
} from '../../data/mealPlannerData';
import AppScreen from '../../components/common/AppScreen';
import { Screen } from '../../navigation/screenNames';

const STORAGE_KEY = 'wellnessShift.mealPlanWeek';
const TARGET_KEY = 'wellnessShift.mealPlanTargetCal';

export default function MealPlannerScreen() {
  const navigation = useNavigation<any>();
  const [plan, setPlan] = useState<WeekPlan>(emptyWeekPlan);
  const [targetCalories, setTargetCalories] = useState('2000');
  const [picker, setPicker] = useState<{ day: DayKey; slot: MealSlot } | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const [savedPlan, savedTarget] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEY),
          AsyncStorage.getItem(TARGET_KEY),
        ]);
        if (savedPlan) setPlan(JSON.parse(savedPlan));
        if (savedTarget) setTargetCalories(savedTarget);
      } catch {
        // use defaults
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  const persist = useCallback(async (nextPlan: WeekPlan, target: string) => {
    await Promise.all([
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(nextPlan)),
      AsyncStorage.setItem(TARGET_KEY, target),
    ]);
  }, []);

  const target = parseInt(targetCalories, 10) || 2000;

  const weekAverage = useMemo(() => {
    const total = DAYS.reduce((sum, day) => sum + dayCalories(plan, day), 0);
    return Math.round(total / DAYS.length);
  }, [plan]);

  const selectMeal = (mealId: string) => {
    if (!picker) return;
    const next = {
      ...plan,
      [picker.day]: { ...plan[picker.day], [picker.slot]: mealId },
    };
    setPlan(next);
    persist(next, targetCalories);
    setPicker(null);
  };

  const handleGenerate = () => {
    const next = generateBalancedWeek(target);
    setPlan(next);
    persist(next, targetCalories);
  };

  const handleReset = () => {
    const next = emptyWeekPlan();
    setPlan(next);
    persist(next, targetCalories);
  };

  if (!loaded) return null;

  return (
    <AppScreen style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Meal Planner</Text>
        <View style={{ width: 40 }} />
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <AppCard style={styles.targetCard}>
            <Text style={styles.targetLabel}>Daily calorie target</Text>
            <View style={styles.targetRow}>
              <TextInput
                style={styles.targetInput}
                value={targetCalories}
                onChangeText={setTargetCalories}
                keyboardType="number-pad"
                onBlur={() => persist(plan, targetCalories)}
              />
              <Text style={styles.targetUnit}>kcal</Text>
            </View>
            <Text style={styles.targetSub}>
              Week average: {weekAverage} kcal/day
              {Math.abs(weekAverage - target) <= 100 ? ' ✓ on target' : ` (${weekAverage > target ? '+' : ''}${weekAverage - target} vs goal)`}
            </Text>
            <View style={styles.actionRow}>
              <BrandButton label="Generate balanced week" onPress={handleGenerate} style={{ flex: 1 }} />
              <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
                <Text style={styles.resetText}>Reset</Text>
              </TouchableOpacity>
            </View>
            <BrandButton
              label="Scan a meal with photo"
              variant="outline"
              onPress={() => navigation.navigate(Screen.foodScan)}
            />
          </AppCard>

          {DAYS.map((day) => {
            const cals = dayCalories(plan, day);
            const protein = dayProtein(plan, day);
            const onTarget = Math.abs(cals - target) <= 150;
            return (
              <AppCard key={day} padded={false} style={styles.dayCard}>
                <View style={styles.dayHeader}>
                  <Text style={styles.dayTitle}>{day}</Text>
                  <View style={styles.dayMeta}>
                    <Text style={[styles.dayCals, onTarget && styles.dayCalsOnTarget]}>{cals} kcal</Text>
                    <Text style={styles.dayProtein}>{protein}g protein</Text>
                  </View>
                </View>
                {MEAL_SLOTS.map((slot, index) => {
                  const meal = getMealById(slot.key, plan[day][slot.key]);
                  return (
                    <TouchableOpacity
                      key={slot.key}
                      style={[styles.mealRow, index < MEAL_SLOTS.length - 1 && styles.mealRowBorder]}
                      onPress={() => setPicker({ day, slot: slot.key })}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.mealIcon}>{slot.icon}</Text>
                      <View style={styles.mealInfo}>
                        <Text style={styles.mealSlot}>{slot.label}</Text>
                        <Text style={styles.mealName} numberOfLines={1}>{meal?.name ?? 'Select meal'}</Text>
                        {meal?.tags[0] ? (
                          <Text style={styles.mealTag}>{meal.tags[0]}</Text>
                        ) : null}
                      </View>
                      <Text style={styles.mealCals}>{meal?.calories ?? '—'}</Text>
                    </TouchableOpacity>
                  );
                })}
              </AppCard>
            );
          })}

          <AppCard>
            <Text style={styles.tipsTitle}>Planning tips</Text>
            {[
              'Batch-cook proteins and grains on Sunday for faster weekday meals.',
              'Aim for 25–35g protein per main meal to support recovery.',
              'Tap any meal to swap it — variety across the week improves adherence.',
            ].map((tip) => (
              <View key={tip} style={styles.tipRow}>
                <Text style={styles.tipBullet}>•</Text>
                <Text style={styles.tipText}>{tip}</Text>
              </View>
            ))}
          </AppCard>

          <View style={{ height: Spacing.xl }} />
        </ScrollView>
      </KeyboardAvoidingView>

      <Modal visible={!!picker} transparent animationType="slide" onRequestClose={() => setPicker(null)}>
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setPicker(null)}>
          <View style={styles.modalSheet} onStartShouldSetResponder={() => true}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>
              {picker ? `${picker.day} · ${MEAL_SLOTS.find((s) => s.key === picker.slot)?.label}` : ''}
            </Text>
            <ScrollView style={styles.modalList} showsVerticalScrollIndicator={false}>
              {picker && MEAL_OPTIONS[picker.slot].map((option) => {
                const selected = plan[picker.day][picker.slot] === option.id;
                return (
                  <TouchableOpacity
                    key={option.id}
                    style={[styles.optionRow, selected && styles.optionRowSelected]}
                    onPress={() => selectMeal(option.id)}
                  >
                    <View style={{ flex: 1 }}>
                      <Text style={styles.optionName}>{option.name}</Text>
                      <Text style={styles.optionMeta}>
                        {option.calories} kcal · {option.protein}g protein
                        {option.prepMinutes ? ` · ~${option.prepMinutes} min` : ''}
                        {' · '}{option.tags.join(', ')}
                      </Text>
                      {option.prepSteps && option.prepSteps.length > 0 ? (
                        <View style={styles.prepSteps}>
                          {option.prepSteps.map((step, i) => (
                            <Text key={step} style={styles.prepStepText}>{i + 1}. {step}</Text>
                          ))}
                        </View>
                      ) : null}
                    </View>
                    {selected ? <Text style={styles.optionCheck}>✓</Text> : null}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
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
  targetCard: { gap: Spacing.sm },
  targetLabel: { fontSize: Typography.size.sm, fontWeight: '600', color: Colors.textSecondary },
  targetRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  targetInput: {
    flex: 1, borderWidth: 1.5, borderColor: Colors.border, borderRadius: Radius.md,
    paddingHorizontal: Spacing.base, paddingVertical: Spacing.md,
    fontSize: Typography.size.xl, fontWeight: '700', color: Colors.text,
  },
  targetUnit: { fontSize: Typography.size.base, color: Colors.textSecondary, fontWeight: '600' },
  targetSub: { fontSize: Typography.size.sm, color: Colors.textSecondary },
  actionRow: { flexDirection: 'row', gap: Spacing.sm, alignItems: 'center', marginTop: Spacing.xs },
  resetBtn: { paddingHorizontal: Spacing.md, paddingVertical: Spacing.md },
  resetText: { fontSize: Typography.size.sm, color: Colors.primary, fontWeight: '600' },
  dayCard: { overflow: 'hidden' },
  dayHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: Spacing.base, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: Colors.borderLight,
  },
  dayTitle: { fontSize: Typography.size.lg, fontWeight: '700', color: Colors.text },
  dayMeta: { alignItems: 'flex-end' },
  dayCals: { fontSize: Typography.size.sm, fontWeight: '700', color: Colors.text },
  dayCalsOnTarget: { color: Colors.success },
  dayProtein: { fontSize: Typography.size.xs, color: Colors.textSecondary },
  mealRow: { flexDirection: 'row', alignItems: 'center', padding: Spacing.base, gap: Spacing.sm },
  mealRowBorder: { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: Colors.borderLight },
  mealIcon: { fontSize: 22, width: 28 },
  mealInfo: { flex: 1, gap: 2 },
  mealSlot: { fontSize: Typography.size.xs, color: Colors.textTertiary, fontWeight: '600', textTransform: 'uppercase' },
  mealName: { fontSize: Typography.size.sm, fontWeight: '600', color: Colors.text },
  mealTag: { fontSize: Typography.size.xs, color: Colors.primary },
  mealCals: { fontSize: Typography.size.sm, fontWeight: '700', color: Colors.nutrition },
  tipsTitle: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text, marginBottom: Spacing.sm },
  tipRow: { flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.xs },
  tipBullet: { color: Colors.primary, fontWeight: '700' },
  tipText: { flex: 1, fontSize: Typography.size.sm, color: Colors.textSecondary, lineHeight: 20 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  modalSheet: {
    backgroundColor: Colors.white, borderTopLeftRadius: Radius.xl, borderTopRightRadius: Radius.xl,
    maxHeight: '70%', paddingBottom: Spacing.xl,
  },
  modalHandle: {
    width: 40, height: 4, borderRadius: 2, backgroundColor: Colors.border,
    alignSelf: 'center', marginTop: Spacing.sm, marginBottom: Spacing.md,
  },
  modalTitle: {
    fontSize: Typography.size.lg, fontWeight: '700', color: Colors.text,
    paddingHorizontal: Spacing.base, marginBottom: Spacing.sm,
  },
  modalList: { paddingHorizontal: Spacing.base },
  optionRow: {
    flexDirection: 'row', alignItems: 'center', paddingVertical: Spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: Colors.borderLight,
  },
  optionRowSelected: { backgroundColor: Colors.primaryLight, marginHorizontal: -Spacing.base, paddingHorizontal: Spacing.base, borderRadius: Radius.md },
  optionName: { fontSize: Typography.size.base, fontWeight: '600', color: Colors.text },
  optionMeta: { fontSize: Typography.size.xs, color: Colors.textSecondary, marginTop: 2 },
  prepSteps: { marginTop: Spacing.xs, gap: 2 },
  prepStepText: { fontSize: Typography.size.xs, color: Colors.textTertiary, lineHeight: 16 },
  optionCheck: { fontSize: Typography.size.lg, color: Colors.primary, fontWeight: '700' },
});
