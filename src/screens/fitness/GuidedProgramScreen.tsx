import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../theme';
import type { FitnessModule } from '../../types';
import { getGuidedProgram } from '../../data/guidedProgramContent';
import AppScreen from '../../components/common/AppScreen';

export default function GuidedProgramScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const module: FitnessModule | undefined = route.params?.module;
  if (!module) return null;

  const program = getGuidedProgram(module);

  return (
    <AppScreen style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{module.title}</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.hero, { backgroundColor: module.color + '15' }]}>
          <Text style={styles.heroIcon}>{module.icon}</Text>
          <Text style={[styles.heroTitle, { color: module.color }]}>{module.title}</Text>
          <Text style={styles.heroSub}>{program.intro}</Text>
        </View>

        {program.warmup ? (
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Warm-up</Text>
            <Text style={styles.cardBody}>{program.warmup}</Text>
          </View>
        ) : null}

        {program.steps.map((step, index) => (
          <View key={`${step.title}-${index}`} style={styles.stepCard}>
            <View style={styles.stepHeader}>
              <View style={[styles.stepNum, { backgroundColor: module.color }]}>
                <Text style={styles.stepNumText}>{index + 1}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.stepTitle}>{step.title}</Text>
                {step.duration ? (
                  <Text style={styles.stepDuration}>{step.duration}</Text>
                ) : null}
              </View>
            </View>
            <Text style={styles.stepBody}>{step.description}</Text>
          </View>
        ))}

        {program.cooldown ? (
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Cool-down</Text>
            <Text style={styles.cardBody}>{program.cooldown}</Text>
          </View>
        ) : null}

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Tips</Text>
          {program.tips.map((tip) => (
            <View key={tip} style={styles.tipRow}>
              <Text style={styles.tipBullet}>•</Text>
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </View>

        <View style={{ height: Spacing.xl }} />
      </ScrollView>
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
  hero: { borderRadius: Radius.xl, padding: Spacing.xl, alignItems: 'center', gap: Spacing.sm },
  heroIcon: { fontSize: 56 },
  heroTitle: { fontSize: Typography.size.xl, fontWeight: '700', textAlign: 'center' },
  heroSub: { fontSize: Typography.size.sm, color: Colors.textSecondary, textAlign: 'center', lineHeight: 20 },
  card: { backgroundColor: Colors.white, borderRadius: Radius.lg, padding: Spacing.base, ...Shadow.sm, gap: Spacing.sm },
  cardLabel: { fontSize: Typography.size.xs, fontWeight: '700', color: Colors.textSecondary, textTransform: 'uppercase', letterSpacing: 0.5 },
  cardBody: { fontSize: Typography.size.base, color: Colors.text, lineHeight: 22 },
  stepCard: { backgroundColor: Colors.white, borderRadius: Radius.lg, padding: Spacing.base, ...Shadow.sm, gap: Spacing.sm },
  stepHeader: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  stepNum: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  stepNumText: { color: Colors.white, fontWeight: '700', fontSize: Typography.size.sm },
  stepTitle: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  stepDuration: { fontSize: Typography.size.xs, color: Colors.primary, fontWeight: '600', marginTop: 2 },
  stepBody: { fontSize: Typography.size.sm, color: Colors.textSecondary, lineHeight: 20 },
  tipRow: { flexDirection: 'row', gap: Spacing.sm },
  tipBullet: { color: Colors.primary, fontWeight: '700' },
  tipText: { flex: 1, fontSize: Typography.size.sm, color: Colors.textSecondary, lineHeight: 20 },
});
