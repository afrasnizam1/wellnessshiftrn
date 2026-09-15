import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import AppScreen from '../../components/common/AppScreen';
import { ScreenHeader, BrandButton } from '../../components/ui';
import HologramViewer from '../../components/fitness/HologramViewer';
import { Colors, Typography, Spacing, Radius, TabBarMetrics } from '../../theme';
import { useAppStore } from '../../store';
import { computeBiologicalAge } from '../../utils/biologicalAge';
import { ANATOMY_MODELS } from '../../data/anatomyModels';
import { Screen } from '../../navigation/screenNames';
import { navigationRef } from '../../navigation/navigationRef';

function greetingName(user: { displayName?: string } | null) {
  const raw = user?.displayName || 'there';
  return raw.split(' ')[0];
}

function ScaleBar({ progress, colors }: { progress: number; colors: string[] }) {
  const clamped = Math.max(0.04, Math.min(1, progress));
  return (
    <View style={styles.scaleTrack}>
      <LinearGradient colors={colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.scaleFill} />
      <View style={[styles.scaleMarker, { left: `${clamped * 100}%` }]} />
    </View>
  );
}

function MetricCard({
  title,
  value,
  progress,
  colors,
}: {
  title: string;
  value: string;
  progress: number;
  colors: string[];
}) {
  return (
    <View style={styles.metricCard}>
      <Text style={styles.metricTitle}>{title}</Text>
      <Text style={styles.metricValue}>{value}</Text>
      <ScaleBar progress={progress} colors={colors} />
    </View>
  );
}

function avg(values: Array<number | undefined>): number {
  const nums = values.filter((v): v is number => typeof v === 'number' && v > 0);
  if (!nums.length) return 0;
  return nums.reduce((sum, v) => sum + v, 0) / nums.length;
}

function bandLabel(score: number): string {
  if (score >= 8) return 'Supportive';
  if (score >= 6) return 'Fair';
  if (score >= 4) return 'Needs work';
  return 'High load';
}

function bmiFrom(heightCm?: number, weightKg?: number): number | null {
  if (!heightCm || !weightKg || heightCm < 100 || weightKg < 30) return null;
  return weightKg / (heightCm / 100) ** 2;
}

function bmiScore(bmi: number | null): number | undefined {
  if (bmi == null) return undefined;
  if (bmi >= 18.5 && bmi < 25) return 9.2;
  if (bmi >= 25 && bmi < 30) return 6.4;
  if (bmi >= 30) return Math.max(3, 10 - (bmi - 25) * 0.6);
  return 6.5;
}

type Factor = {
  title: string;
  score: number;
  why: string;
  improve: string;
};

function FactorCard({ factor }: { factor: Factor }) {
  const progress = Math.max(0.04, Math.min(1, factor.score / 10));
  return (
    <View style={styles.factorCard}>
      <View style={styles.factorHead}>
        <Text style={styles.factorTitle}>{factor.title}</Text>
        <Text style={styles.factorScore}>{factor.score.toFixed(1)} · {bandLabel(factor.score)}</Text>
      </View>
      <ScaleBar progress={progress} colors={['#FFE0E8', '#389EFA']} />
      <Text style={styles.factorWhy}>{factor.why}</Text>
      <Text style={styles.factorImprove}>{factor.improve}</Text>
    </View>
  );
}

export default function VirtualTwinScreen() {
  const navigation = useNavigation<any>();
  const user = useAppStore((s) => s.user);
  const wellnessScore = useAppStore((s) => s.wellnessScore);
  const model = ANATOMY_MODELS['anatomy-study'];

  const result = useMemo(() => {
    if (!user?.dateOfBirth || !wellnessScore) return null;
    return computeBiologicalAge({
      dateOfBirth: user.dateOfBirth,
      wellnessScore,
      heightCm: user.heightCm,
      weightKg: user.weightKg,
    });
  }, [user?.dateOfBirth, user?.heightCm, user?.weightKg, wellnessScore]);

  const cats = wellnessScore?.categories;
  const overall = wellnessScore?.overall ?? 0;
  const bmi = bmiFrom(user?.heightCm, user?.weightKg);
  const metabolic = avg([cats?.nutrition, cats?.fitness, cats?.physical, bmiScore(bmi)]);
  const inflammation = avg([cats?.sleep, cats?.stress, cats?.nutrition, cats?.mindfulness]);

  const factors: Factor[] = useMemo(() => {
    if (!cats) return [];
    return [
      {
        title: 'Metabolic health',
        score: metabolic,
        why: 'How nutrition, movement, and body composition (including BMI when logged) support blood sugar, lipids, and energy. Metabolic strain is one of the strongest lifestyle links to faster biological ageing.',
        improve: 'Prioritise protein and fibre, keep a regular meal pattern, and mix strength with walking. Log height and weight in Profile if BMI is missing.',
      },
      {
        title: 'Chronic inflammation (lifestyle)',
        score: inflammation,
        why: 'This is a lifestyle estimate — not a blood test (such as CRP). Poor sleep, high stress, ultra-processed eating patterns, and low recovery can keep low-grade inflammation running, which is linked with older biological age.',
        improve: 'Protect 7–9 hours of sleep, cut late caffeine, add plants and oily fish, and use short daily stress-down routines (walk, breathwork, mindfulness).',
      },
      {
        title: 'Sleep & circadian rhythm',
        score: cats.sleep ?? overall,
        why: 'Sleep is when DNA repair, hormone reset, and metabolic cleanup happen. Short or irregular sleep is consistently tied to higher biological age.',
        improve: 'Fixed wake time, dim evenings, and a wind-down before bed.',
      },
      {
        title: 'Stress & recovery',
        score: cats.stress ?? overall,
        why: 'Sustained cortisol and poor recovery accelerate wear on the heart, immune system, and cells.',
        improve: 'Daily off-switch: 10 minutes of breathwork, nature, or a true rest block in Today’s Plan.',
      },
      {
        title: 'Fitness & muscle',
        score: avg([cats.fitness, cats.physical]),
        why: 'VO₂ capacity and muscle mass are among the best predictors of healthier ageing. Inactivity raises biological age even if weight is stable.',
        improve: 'Two strength sessions and regular zone-2 movement each week.',
      },
      {
        title: 'Nutrition quality',
        score: cats.nutrition ?? overall,
        why: 'Diet quality drives metabolic health and inflammatory tone. High sugar and low micronutrients push biological age up.',
        improve: 'Build meals around plants, protein, and colour; keep ultra-processed snacks occasional.',
      },
      {
        title: 'Mindfulness & mental load',
        score: avg([cats.mindfulness, cats.mental]),
        why: 'Chronic mental load and low restoration show up in sleep, inflammation, and heart-rate patterns.',
        improve: 'Short daily mindfulness, social contact, and a work–life boundary you actually keep.',
      },
      {
        title: 'Environment & work–life',
        score: avg([cats.environment, cats.workLife, cats.social]),
        why: 'Air quality, daylight, sitting time, and isolation all nudge ageing pathways via stress, sleep, and inflammation.',
        improve: 'Daylight in the morning, movement breaks, and protected social time.',
      },
    ];
  }, [cats, inflammation, metabolic, overall]);

  const openQuiz = () => {
    if (navigationRef.isReady()) {
      navigationRef.navigate(Screen.wellnessQuiz);
    }
  };

  return (
    <AppScreen>
      <View style={styles.header}>
        <ScreenHeader
          title="Your virtual twin"
          subtitle={`Welcome, ${greetingName(user)}`}
          onBack={() => navigation.goBack()}
        />
      </View>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.stage}>
          <View style={styles.metricsCol}>
            <MetricCard
              title="Biological age"
              value={result ? String(Number.isInteger(result.biologicalAge) ? result.biologicalAge : result.biologicalAge.toFixed(1)) : '—'}
              progress={result?.gaugeProgress ?? 0.4}
              colors={['#B8E0FF', '#5B4CFF']}
            />
            <MetricCard
              title="Metabolic health"
              value={metabolic ? metabolic.toFixed(1) : '—'}
              progress={metabolic / 10}
              colors={['#C8F7E4', '#2EDBBD']}
            />
            <MetricCard
              title="Inflammation resilience"
              value={inflammation ? inflammation.toFixed(1) : '—'}
              progress={inflammation / 10}
              colors={['#FFE3C8', '#FF8561']}
            />
            <View style={[styles.metricCard, styles.metricSoon]}>
              <Text style={styles.metricTitle}>Lab biomarkers</Text>
              <Text style={styles.soonLabel}>Not in this version</Text>
            </View>
          </View>
          <View style={styles.twinCol}>
            <HologramViewer modelFile={model.usdzFile} preset={model.preset} height={420} autoRotate />
          </View>
        </View>

        <Text style={styles.body}>
          Your twin is an estimate from your wellness assessment, age, and body metrics — not a
          medical diagnosis or lab test. Metabolic health, chronic inflammation, sleep, stress,
          fitness, and environment all shift biological age in the same direction as your habits.
        </Text>
        {result ? <Text style={styles.linkLine}>{result.scoreLinkSummary}</Text> : null}
        {bmi != null ? (
          <Text style={styles.linkLine}>BMI {bmi.toFixed(1)} is included in the metabolic estimate.</Text>
        ) : (
          <Text style={styles.body}>Add height and weight in Profile to include BMI in metabolic health.</Text>
        )}

        <Text style={styles.sectionTitle}>What can move biological age</Text>
        {factors.map((factor) => (
          <FactorCard key={factor.title} factor={factor} />
        ))}

        <BrandButton label="Retake wellness assessment" onPress={openQuiz} />
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: Spacing.base, paddingTop: Spacing.sm },
  scroll: { flex: 1 },
  content: {
    padding: Spacing.base,
    gap: Spacing.md,
    paddingBottom: TabBarMetrics.contentInset + Spacing.xl,
  },
  stage: { flexDirection: 'row', gap: Spacing.sm, alignItems: 'stretch' },
  metricsCol: { width: 148, gap: 8 },
  twinCol: { flex: 1, minWidth: 0 },
  metricCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.sm,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderLight,
  },
  metricSoon: { opacity: 0.45 },
  metricTitle: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.textTertiary,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  metricValue: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: -0.8,
    marginVertical: 2,
  },
  soonLabel: { fontSize: Typography.size.xs, color: Colors.textTertiary, marginTop: 4, fontWeight: '600' },
  scaleTrack: {
    height: 6,
    borderRadius: 3,
    overflow: 'visible',
    marginTop: 6,
  },
  scaleFill: { height: 6, borderRadius: 3 },
  scaleMarker: {
    position: 'absolute',
    top: -3,
    width: 8,
    height: 12,
    marginLeft: -4,
    borderRadius: 1,
    backgroundColor: Colors.text,
  },
  body: { fontSize: Typography.size.sm, color: Colors.textSecondary, lineHeight: 20 },
  linkLine: { fontSize: Typography.size.sm, fontWeight: '600', color: Colors.text, lineHeight: 20 },
  sectionTitle: {
    marginTop: Spacing.sm,
    fontSize: Typography.size.base,
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: -0.3,
  },
  factorCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    gap: 6,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderLight,
  },
  factorHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 },
  factorTitle: { flex: 1, fontSize: Typography.size.sm, fontWeight: '800', color: Colors.text },
  factorScore: { fontSize: 11, fontWeight: '700', color: Colors.textSecondary },
  factorWhy: { fontSize: Typography.size.sm, color: Colors.textSecondary, lineHeight: 19, marginTop: 4 },
  factorImprove: { fontSize: Typography.size.xs, fontWeight: '600', color: Colors.primary, lineHeight: 17 },
});
