import React, { useEffect, useState } from 'react';
import { Screen } from '../../navigation/screenNames';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../theme';
import { AppCard } from '../../components/ui';
import type { ClinicianStackParamList, CustomCarePlan } from '../../types';
import { clinicianService } from '../../services/clinicianService';
import { patientDashboardService, type PatientDashboardData } from '../../services/patientDashboardService';
import AppScreen from '../../components/common/AppScreen';

type Route = RouteProp<ClinicianStackParamList, typeof Screen.patientDetail>;
type Nav = NativeStackNavigationProp<ClinicianStackParamList, typeof Screen.patientDetail>;

const ENGAGEMENT_LABEL = { high: 'Highly engaged', medium: 'Moderately engaged', low: 'Low engagement' };
const ENGAGEMENT_COLOR = { high: Colors.success, medium: Colors.warning, low: Colors.error };

export default function PatientDetailScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const { patient } = route.params;
  const [plans, setPlans] = useState<CustomCarePlan[]>([]);
  const [dashboard, setDashboard] = useState<PatientDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const load = async () => {
    const [planList, dash] = await Promise.all([
      clinicianService.getCustomCarePlansForPatient(patient.uid),
      patientDashboardService.getDashboard(patient.uid),
    ]);
    setPlans(planList);
    setDashboard(dash);
  };

  useEffect(() => {
    load().finally(() => setLoading(false));
  }, [patient.uid]);

  const onRefresh = async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  };

  const scoreColor =
    patient.wellnessScore >= 7 ? Colors.success : patient.wellnessScore >= 5 ? Colors.warning : Colors.error;

  const trend = dashboard?.scoreHistory ?? [];
  const trendDelta = trend.length >= 2
    ? (trend[trend.length - 1]?.overall ?? 0) - (trend[0]?.overall ?? 0)
    : 0;

  return (
    <AppScreen style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{patient.displayName}</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={styles.hero}>
          <View style={[styles.avatar, { backgroundColor: scoreColor + '22' }]}>
            <Text style={styles.avatarText}>{patient.displayName[0]}</Text>
          </View>
          <Text style={styles.name}>{patient.displayName}</Text>
          <Text style={styles.email}>{patient.email}</Text>
          <Text style={[styles.score, { color: scoreColor }]}>
            {(dashboard?.score?.overall ?? patient.wellnessScore).toFixed(1)}
          </Text>
          <Text style={styles.scoreLabel}>Wellness score</Text>
          {trend.length >= 2 && (
            <Text style={[styles.trend, { color: trendDelta >= 0 ? Colors.success : Colors.error }]}>
              {trendDelta >= 0 ? '▲' : '▼'} {Math.abs(trendDelta).toFixed(1)} over {trend.length} days
            </Text>
          )}
          {patient.needsAttention && (
            <View style={styles.alertBadge}>
              <Text style={styles.alertText}>Needs attention</Text>
            </View>
          )}
          {dashboard && (
            <View style={[styles.engagementPill, { backgroundColor: ENGAGEMENT_COLOR[dashboard.engagementLevel] + '22' }]}>
              <Text style={[styles.engagementText, { color: ENGAGEMENT_COLOR[dashboard.engagementLevel] }]}>
                {ENGAGEMENT_LABEL[dashboard.engagementLevel]}
              </Text>
            </View>
          )}
          <Text style={styles.meta}>Linked {patient.linkedSince} · Active {patient.lastActive}</Text>
        </View>

        <View style={styles.actions}>
          <ActionBtn icon="💬" label="Message" onPress={() => navigation.navigate(Screen.clinicianMessages, { patient })} />
          <ActionBtn icon="📋" label="Care plan" onPress={() => navigation.navigate(Screen.createCarePlan, { patient })} />
          <ActionBtn icon="🏃" label="Recommend" onPress={() => navigation.navigate(Screen.fitnessRecommendations, { patient })} />
          <ActionBtn icon="📝" label="Notes" onPress={() => navigation.navigate(Screen.clinicalNotes, { patient })} />
          <ActionBtn icon="📚" label="Evidence" onPress={() => navigation.navigate(Screen.evidenceHub)} />
        </View>

        {loading ? (
          <ActivityIndicator color={Colors.primary} style={{ marginTop: Spacing.lg }} />
        ) : dashboard ? (
          <>
            <Text style={styles.sectionTitle}>Engagement</Text>
            <View style={styles.metricsRow}>
              <MetricCard label="Check-in streak" value={`${dashboard.checkInStreak}d`} />
              <MetricCard label="Check-ins (7d)" value={String(dashboard.checkInsLast7Days)} />
              <MetricCard label="Active programs" value={String(dashboard.activePrograms)} />
            </View>

            <Text style={styles.sectionTitle}>Category scores</Text>
            <AppCard style={styles.categoryCard}>
              {dashboard.categoryScores
                .sort((a, b) => a.score - b.score)
                .map((cat) => (
                  <View key={cat.key} style={styles.catRow}>
                    <Text style={styles.catLabel} numberOfLines={1}>{cat.label}</Text>
                    <View style={styles.catTrack}>
                      <View style={[styles.catFill, { width: `${cat.score * 10}%`, backgroundColor: cat.color }]} />
                    </View>
                    <Text style={[styles.catScore, { color: cat.color }]}>{cat.score.toFixed(1)}</Text>
                  </View>
                ))}
            </AppCard>

            {dashboard.fitnessRecommendations && (
              <>
                <Text style={styles.sectionTitle}>Fitness Hub recommendations</Text>
                <AppCard>
                  <Text style={styles.recNote}>{dashboard.fitnessRecommendations.personalNote || 'Modules assigned by you'}</Text>
                  <Text style={styles.recMeta}>
                    {dashboard.fitnessRecommendations.recommendedModules.length} modules recommended
                  </Text>
                </AppCard>
              </>
            )}
          </>
        ) : null}

        <Text style={styles.sectionTitle}>Care plans ({plans.length})</Text>
        {plans.length === 0 ? (
          <Text style={styles.empty}>No care plans yet. Create one for this patient.</Text>
        ) : (
          plans.map((plan) => (
            <View key={plan.id} style={styles.planCard}>
              <Text style={styles.planTitle}>{plan.planName}</Text>
              <Text style={styles.planDesc}>{plan.description}</Text>
              <Text style={styles.planMeta}>
                {plan.recommendations.length} tasks · {plan.planStatus ?? 'sent'}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
    </AppScreen>
  );
}

function ActionBtn({ icon, label, onPress }: { icon: string; label: string; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.actionBtn} onPress={onPress}>
      <Text style={styles.actionIcon}>{icon}</Text>
      <Text style={styles.actionLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.metricCard}>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
    </View>
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
  content: { padding: Spacing.base, gap: Spacing.md, paddingBottom: Spacing.xl },
  hero: {
    backgroundColor: Colors.white, borderRadius: Radius.xl, padding: Spacing.xl,
    alignItems: 'center', gap: Spacing.sm, ...Shadow.sm,
  },
  avatar: { width: 64, height: 64, borderRadius: 32, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: Typography.size.xl, fontWeight: '700', color: Colors.text },
  name: { fontSize: Typography.size.xl, fontWeight: '700', color: Colors.text },
  email: { fontSize: Typography.size.sm, color: Colors.textSecondary },
  score: { fontSize: Typography.size['3xl'], fontWeight: '700', marginTop: Spacing.sm },
  scoreLabel: { fontSize: Typography.size.xs, color: Colors.textSecondary },
  trend: { fontSize: Typography.size.sm, fontWeight: '600' },
  alertBadge: { backgroundColor: Colors.error + '22', paddingHorizontal: Spacing.md, paddingVertical: 4, borderRadius: Radius.xl },
  alertText: { color: Colors.error, fontWeight: '700', fontSize: Typography.size.xs },
  engagementPill: { paddingHorizontal: Spacing.md, paddingVertical: 4, borderRadius: Radius.pill },
  engagementText: { fontSize: Typography.size.xs, fontWeight: '700' },
  meta: { fontSize: Typography.size.xs, color: Colors.textTertiary, marginTop: Spacing.xs },
  actions: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  actionBtn: {
    flex: 1, backgroundColor: Colors.white, borderRadius: Radius.lg,
    padding: Spacing.base, alignItems: 'center', gap: 4, ...Shadow.sm,
  },
  actionIcon: { fontSize: 24 },
  actionLabel: { fontSize: Typography.size.xs, fontWeight: '600', color: Colors.text },
  sectionTitle: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text, marginTop: Spacing.sm },
  metricsRow: { flexDirection: 'row', gap: Spacing.sm },
  metricCard: {
    flex: 1, backgroundColor: Colors.white, borderRadius: Radius.lg,
    padding: Spacing.md, alignItems: 'center', ...Shadow.sm,
  },
  metricValue: { fontSize: Typography.size.xl, fontWeight: '800', color: Colors.primary },
  metricLabel: { fontSize: 10, color: Colors.textSecondary, textAlign: 'center', marginTop: 4 },
  categoryCard: { gap: Spacing.sm },
  catRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  catLabel: { width: 72, fontSize: Typography.size.xs, color: Colors.text },
  catTrack: { flex: 1, height: 8, backgroundColor: Colors.borderLight, borderRadius: 4, overflow: 'hidden' },
  catFill: { height: '100%', borderRadius: 4 },
  catScore: { width: 28, fontSize: Typography.size.xs, fontWeight: '700', textAlign: 'right' },
  recNote: { fontSize: Typography.size.sm, color: Colors.text, lineHeight: 20 },
  recMeta: { fontSize: Typography.size.xs, color: Colors.textSecondary, marginTop: 4 },
  empty: { fontSize: Typography.size.sm, color: Colors.textSecondary },
  planCard: {
    backgroundColor: Colors.white, borderRadius: Radius.lg, padding: Spacing.base, gap: 4, ...Shadow.sm,
  },
  planTitle: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  planDesc: { fontSize: Typography.size.sm, color: Colors.textSecondary },
  planMeta: { fontSize: Typography.size.xs, color: Colors.textTertiary, marginTop: 4 },
});
