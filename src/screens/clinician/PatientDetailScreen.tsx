import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Screen } from '../../navigation/screenNames';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import { ClinicianTheme, ClinicianType } from '../../theme/clinicianTheme';
import { AppCard, AnimatedPressable, ScreenHeader } from '../../components/ui';
import type { ClinicianStackParamList, CustomCarePlan, UserGender } from '../../types';
import { clinicianService, type ClinicianPatientProfile } from '../../services/clinicianService';
import { patientDashboardService, type PatientDashboardData } from '../../services/patientDashboardService';
import AppScreen from '../../components/common/AppScreen';
import { initialsFromName, resolveDisplayName } from '../../utils/greetingName';
import { APP_PURPOSE_OPTIONS } from '../../types/onboardingPrefs';

type Route = RouteProp<ClinicianStackParamList, typeof Screen.patientDetail>;
type Nav = NativeStackNavigationProp<ClinicianStackParamList, typeof Screen.patientDetail>;

const ENGAGEMENT_LABEL = { high: 'Highly engaged', medium: 'Moderately engaged', low: 'Low engagement' };
const ENGAGEMENT_COLOR = { high: Colors.success, medium: Colors.warning, low: Colors.error };

const GENDER_LABEL: Record<UserGender, string> = {
  female: 'Female',
  male: 'Male',
  other: 'Other',
  prefer_not_to_say: 'Prefer not to say',
};

function purposeLabel(id?: string | null): string | null {
  if (!id) return null;
  return APP_PURPOSE_OPTIONS.find((o) => o.id === id)?.title ?? id.replace(/_/g, ' ');
}

function formatDob(iso?: string): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

function ageFromDob(iso?: string): string | null {
  if (!iso) return null;
  const dob = new Date(iso);
  if (Number.isNaN(dob.getTime())) return null;
  const now = new Date();
  let age = now.getFullYear() - dob.getFullYear();
  const m = now.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < dob.getDate())) age -= 1;
  return age >= 0 && age < 130 ? `${age} yrs` : null;
}

export default function PatientDetailScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const { patient: routePatient } = route.params;

  const [profile, setProfile] = useState<ClinicianPatientProfile | null>(null);
  const [plans, setPlans] = useState<CustomCarePlan[]>([]);
  const [dashboard, setDashboard] = useState<PatientDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const displayName = useMemo(
    () =>
      resolveDisplayName({
        displayName: profile?.displayName || routePatient.displayName,
        email: profile?.email || routePatient.email,
      }),
    [profile, routePatient],
  );

  const email = profile?.email || routePatient.email;
  const linkedPatient = useMemo(
    () => ({ ...routePatient, displayName, email }),
    [routePatient, displayName, email],
  );

  const load = useCallback(async () => {
    setLoadError(null);
    try {
      const [fullProfile, planList, dash] = await Promise.all([
        clinicianService.getPatientFullProfile(routePatient.uid).catch((e) => {
          console.warn('[PatientDetail] profile load failed', e);
          return null;
        }),
        clinicianService.getCustomCarePlansForPatient(routePatient.uid).catch((e) => {
          console.warn('[PatientDetail] care plans load failed', e);
          return [] as CustomCarePlan[];
        }),
        patientDashboardService.getDashboard(routePatient.uid).catch((e) => {
          console.warn('[PatientDetail] dashboard load failed', e);
          return null;
        }),
      ]);
      setProfile(fullProfile);
      setPlans(planList);
      setDashboard(dash);
      if (!fullProfile && !dash) {
        setLoadError('Some patient data could not be loaded. Pull to refresh.');
      }
    } catch (e) {
      console.warn('[PatientDetail] load failed', e);
      setLoadError('Could not refresh patient details. Pull to try again.');
    }
  }, [routePatient.uid]);

  useEffect(() => {
    setLoading(true);
    load().finally(() => setLoading(false));
  }, [load]);

  const onRefresh = async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  };

  const score = dashboard?.score?.overall ?? routePatient.wellnessScore;
  const scoreColor = score >= 7 ? Colors.success : score >= 5 ? Colors.warning : Colors.error;

  const linkedLabel = clinicianService.formatPatientDate(
    profile?.linkedAtIso || profile?.joinDateIso || routePatient.linkedSince,
  );
  // If linkedSince was already a formatted string like "Invalid Date", prefer profile dates
  const linkedDisplay =
    linkedLabel !== '—'
      ? linkedLabel
      : routePatient.linkedSince && !/invalid/i.test(routePatient.linkedSince)
        ? routePatient.linkedSince
        : '—';

  const profileRows = useMemo(() => {
    const rows: { label: string; value: string }[] = [];
    rows.push({ label: 'Email', value: email || '—' });
    rows.push({ label: 'Role', value: 'Patient' });

    const dob = formatDob(profile?.dateOfBirth);
    if (dob) {
      const age = ageFromDob(profile?.dateOfBirth);
      rows.push({ label: 'Date of birth', value: age ? `${dob} (${age})` : dob });
    }
    if (profile?.gender) {
      rows.push({ label: 'Gender', value: GENDER_LABEL[profile.gender] ?? profile.gender });
    }
    if (profile?.heightCm != null && profile.heightCm > 0) {
      rows.push({ label: 'Height', value: `${profile.heightCm} cm` });
    }
    if (profile?.weightKg != null && profile.weightKg > 0) {
      rows.push({ label: 'Weight', value: `${profile.weightKg} kg` });
    }
    const purpose =
      purposeLabel(profile?.appPurpose) ||
      (profile?.appPurposes?.length
        ? profile.appPurposes.map((p) => purposeLabel(p)).filter(Boolean).join(', ')
        : null);
    if (purpose) rows.push({ label: 'Purpose', value: purpose });
    if (profile?.primaryGoal) {
      rows.push({ label: 'Primary goal', value: profile.primaryGoal.replace(/_/g, ' ') });
    }
    if (profile?.healthGoals?.length) {
      rows.push({
        label: 'Goals',
        value: profile.healthGoals.map((g) => g.replace(/_/g, ' ')).join(', '),
      });
    }
    if (profile?.experienceLevel) {
      rows.push({
        label: 'Experience',
        value: profile.experienceLevel.charAt(0).toUpperCase() + profile.experienceLevel.slice(1),
      });
    }
    if (profile?.trainingDaysPerWeek != null) {
      rows.push({ label: 'Training days', value: `${profile.trainingDaysPerWeek} / week` });
    }
    rows.push({
      label: 'Onboarding',
      value: profile?.onboardingComplete ? 'Complete' : profile ? 'In progress' : '—',
    });
    rows.push({
      label: 'Assessment',
      value: profile?.quizComplete ? 'Complete' : profile ? 'Not completed' : '—',
    });
    rows.push({
      label: 'Member since',
      value: clinicianService.formatPatientDate(profile?.joinDateIso || profile?.createdAt),
    });
    rows.push({ label: 'Linked', value: linkedDisplay });
    rows.push({ label: 'Last active', value: routePatient.lastActive || '—' });
    if (profile?.subscriptionTier) {
      rows.push({
        label: 'Plan',
        value: profile.subscriptionTier.charAt(0).toUpperCase() + profile.subscriptionTier.slice(1),
      });
    }
    return rows;
  }, [profile, email, linkedDisplay, routePatient.lastActive]);

  const trend = dashboard?.scoreHistory ?? [];
  const trendDelta =
    trend.length >= 2
      ? (trend[trend.length - 1]?.overall ?? 0) - (trend[0]?.overall ?? 0)
      : 0;

  return (
    <AppScreen mesh={false} backgroundColor={ClinicianTheme.canvas} style={styles.safe}>
      <ScreenHeader title={displayName} onBack={() => navigation.goBack()} />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={ClinicianTheme.accent}
          />
        }
      >
        <AppCard style={styles.hero}>
          <View style={styles.heroTop}>
            <View style={[styles.avatar, { backgroundColor: scoreColor + '22' }]}>
              <Text style={[styles.avatarText, { color: scoreColor }]}>
                {initialsFromName(displayName)}
              </Text>
            </View>
            <View style={styles.heroCopy}>
              <Text style={styles.name} numberOfLines={2}>{displayName}</Text>
              {email ? <Text style={styles.email} numberOfLines={1}>{email}</Text> : null}
              {routePatient.needsAttention ? (
                <View style={styles.alertBadge}>
                  <Text style={styles.alertText}>Needs attention</Text>
                </View>
              ) : null}
            </View>
            <View style={styles.scoreBlock}>
              <Text style={[styles.score, { color: scoreColor }]}>{score.toFixed(1)}</Text>
              <Text style={styles.scoreLabel}>Wellness</Text>
            </View>
          </View>

          <View style={styles.metaRow}>
            <MetaChip icon="link-outline" label={`Linked ${linkedDisplay}`} />
            <MetaChip icon="time-outline" label={`Active ${routePatient.lastActive}`} />
          </View>

          {trend.length >= 2 ? (
            <Text style={[styles.trend, { color: trendDelta >= 0 ? Colors.success : Colors.error }]}>
              {trendDelta >= 0 ? '▲' : '▼'} {Math.abs(trendDelta).toFixed(1)} over {trend.length} days
            </Text>
          ) : null}

          {dashboard ? (
            <View
              style={[
                styles.engagementPill,
                { backgroundColor: ENGAGEMENT_COLOR[dashboard.engagementLevel] + '22' },
              ]}
            >
              <Text style={[styles.engagementText, { color: ENGAGEMENT_COLOR[dashboard.engagementLevel] }]}>
                {ENGAGEMENT_LABEL[dashboard.engagementLevel]}
              </Text>
            </View>
          ) : null}
        </AppCard>

        <View style={styles.actions}>
          <ActionBtn
            icon="chatbubble-outline"
            label="Message"
            onPress={() => navigation.navigate(Screen.clinicianMessages, { patient: linkedPatient })}
          />
          <ActionBtn
            icon="clipboard-outline"
            label="Care plan"
            onPress={() => navigation.navigate(Screen.createCarePlan, { patient: linkedPatient })}
          />
          <ActionBtn
            icon="fitness-outline"
            label="Recommend"
            onPress={() => navigation.navigate(Screen.fitnessRecommendations, { patient: linkedPatient })}
          />
          <ActionBtn
            icon="document-text-outline"
            label="Notes"
            onPress={() => navigation.navigate(Screen.clinicalNotes, { patient: linkedPatient })}
          />
          <ActionBtn
            icon="library-outline"
            label="Evidence"
            onPress={() => navigation.navigate(Screen.evidenceHub)}
          />
        </View>

        <Text style={styles.sectionTitle}>Profile</Text>
        {loading && !profile ? (
          <ActivityIndicator color={ClinicianTheme.accent} style={{ marginVertical: Spacing.md }} />
        ) : (
          <AppCard padded={false}>
            {profileRows.map((row, i) => (
              <View
                key={row.label}
                style={[styles.detailRow, i < profileRows.length - 1 && styles.detailRowBorder]}
              >
                <Text style={styles.detailLabel}>{row.label}</Text>
                <Text style={styles.detailValue}>{row.value}</Text>
              </View>
            ))}
          </AppCard>
        )}

        {loadError ? (
          <View style={styles.errorBanner}>
            <Ionicons name="information-circle-outline" size={18} color={Colors.warning} />
            <Text style={styles.errorText}>{loadError}</Text>
          </View>
        ) : null}

        <Text style={styles.sectionTitle}>Care plans ({plans.length})</Text>
        {plans.length === 0 ? (
          <AppCard style={styles.emptyCard}>
            <Text style={styles.empty}>No care plans yet. Create one for this patient.</Text>
            <AnimatedPressable
              style={styles.emptyBtn}
              onPress={() => navigation.navigate(Screen.createCarePlan, { patient: linkedPatient })}
            >
              <Text style={styles.emptyBtnText}>Create care plan</Text>
            </AnimatedPressable>
          </AppCard>
        ) : (
          plans.map((plan) => (
            <AppCard key={plan.id} style={styles.planCard}>
              <Text style={styles.planTitle}>{plan.planName}</Text>
              <Text style={styles.planDesc}>{plan.description}</Text>
              <Text style={styles.planMeta}>
                {plan.recommendations.length} tasks · {plan.planStatus ?? 'sent'}
              </Text>
            </AppCard>
          ))
        )}

        {dashboard ? (
          <>
            <Text style={styles.sectionTitle}>Engagement</Text>
            <View style={styles.metricsRow}>
              <MetricCard label="Check-in streak" value={`${dashboard.checkInStreak}d`} />
              <MetricCard label="Check-ins (7d)" value={String(dashboard.checkInsLast7Days)} />
              <MetricCard label="Programs" value={String(dashboard.activePrograms)} />
            </View>

            <Text style={styles.sectionTitle}>Category scores</Text>
            <AppCard style={styles.categoryCard}>
              {dashboard.categoryScores
                .slice()
                .sort((a, b) => a.score - b.score)
                .map((cat) => (
                  <View key={cat.key} style={styles.catRow}>
                    <Text style={styles.catLabel} numberOfLines={1}>{cat.label}</Text>
                    <View style={styles.catTrack}>
                      <View
                        style={[
                          styles.catFill,
                          { width: `${Math.min(100, cat.score * 10)}%`, backgroundColor: cat.color },
                        ]}
                      />
                    </View>
                    <Text style={[styles.catScore, { color: cat.color }]}>{cat.score.toFixed(1)}</Text>
                  </View>
                ))}
            </AppCard>

            {dashboard.fitnessRecommendations ? (
              <>
                <Text style={styles.sectionTitle}>Fitness Hub recommendations</Text>
                <AppCard>
                  <Text style={styles.recNote}>
                    {dashboard.fitnessRecommendations.personalNote || 'Modules assigned by you'}
                  </Text>
                  <Text style={styles.recMeta}>
                    {dashboard.fitnessRecommendations.recommendedModules.length} modules recommended
                  </Text>
                </AppCard>
              </>
            ) : null}
          </>
        ) : null}
      </ScrollView>
    </AppScreen>
  );
}

function MetaChip({ icon, label }: { icon: string; label: string }) {
  return (
    <View style={styles.metaChip}>
      <Ionicons name={icon as any} size={13} color={Colors.textSecondary} />
      <Text style={styles.metaChipText} numberOfLines={1}>{label}</Text>
    </View>
  );
}

function ActionBtn({
  icon,
  label,
  onPress,
}: {
  icon: string;
  label: string;
  onPress: () => void;
}) {
  return (
    <AnimatedPressable style={styles.actionBtn} onPress={onPress} accessibilityRole="button" accessibilityLabel={label}>
      <View style={styles.actionIconWrap}>
        <Ionicons name={icon as any} size={18} color={ClinicianTheme.accent} />
      </View>
      <Text style={styles.actionLabel} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.85}>
        {label}
      </Text>
    </AnimatedPressable>
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
  safe: { flex: 1 },
  content: {
    padding: Spacing.base,
    gap: Spacing.md,
    paddingBottom: Spacing['3xl'],
  },
  hero: { gap: Spacing.md },
  heroTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: Radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontSize: Typography.size.lg, fontWeight: '800' },
  heroCopy: { flex: 1, minWidth: 0, gap: 4 },
  name: {
    fontSize: Typography.size.lg,
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: -0.3,
  },
  email: { fontSize: Typography.size.sm, color: Colors.textSecondary },
  scoreBlock: { alignItems: 'center', minWidth: 52 },
  score: {
    fontSize: Typography.size['2xl'],
    fontWeight: '800',
    letterSpacing: -0.5,
    fontVariant: ['tabular-nums'],
  },
  scoreLabel: { fontSize: 10, color: Colors.textTertiary, fontWeight: '600' },
  metaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.xs },
  metaChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.backgroundSecondary,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 6,
    borderRadius: Radius.md,
    maxWidth: '100%',
  },
  metaChipText: { fontSize: Typography.size.xs, color: Colors.textSecondary, fontWeight: '600', flexShrink: 1 },
  trend: { fontSize: Typography.size.sm, fontWeight: '600' },
  alertBadge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.errorLight,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: Radius.sm,
    marginTop: 2,
  },
  alertText: { color: Colors.error, fontWeight: '700', fontSize: Typography.size.xs },
  engagementPill: {
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.md,
    paddingVertical: 4,
    borderRadius: Radius.sm,
  },
  engagementText: { fontSize: Typography.size.xs, fontWeight: '700' },
  actions: {
    flexDirection: 'row',
    gap: Spacing.xs,
  },
  actionBtn: {
    flex: 1,
    minWidth: 0,
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    paddingVertical: Spacing.sm,
    paddingHorizontal: 4,
    alignItems: 'center',
    gap: 6,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderLight,
  },
  actionIconWrap: {
    width: 32,
    height: 32,
    borderRadius: Radius.sm,
    backgroundColor: ClinicianTheme.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.text,
    textAlign: 'center',
    width: '100%',
  },
  sectionTitle: {
    ...ClinicianType.sectionTitle,
    marginTop: Spacing.xs,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: Spacing.md,
    paddingHorizontal: Spacing.base,
    paddingVertical: 13,
  },
  detailRowBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.borderLight,
  },
  detailLabel: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    fontWeight: '600',
    width: 110,
  },
  detailValue: {
    flex: 1,
    fontSize: Typography.size.sm,
    color: Colors.text,
    fontWeight: '600',
    textAlign: 'right',
    lineHeight: 18,
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.warningLight,
    padding: Spacing.md,
    borderRadius: Radius.lg,
  },
  errorText: { flex: 1, fontSize: Typography.size.sm, color: Colors.textSecondary, lineHeight: 18 },
  metricsRow: { flexDirection: 'row', gap: Spacing.sm },
  metricCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderLight,
  },
  metricValue: { fontSize: Typography.size.xl, fontWeight: '800', color: ClinicianTheme.accent },
  metricLabel: { fontSize: 10, color: Colors.textSecondary, textAlign: 'center', marginTop: 4 },
  categoryCard: { gap: Spacing.sm },
  catRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  catLabel: { width: 72, fontSize: Typography.size.xs, color: Colors.text },
  catTrack: { flex: 1, height: 8, backgroundColor: Colors.borderLight, borderRadius: 4, overflow: 'hidden' },
  catFill: { height: '100%', borderRadius: 4 },
  catScore: { width: 28, fontSize: Typography.size.xs, fontWeight: '700', textAlign: 'right' },
  recNote: { fontSize: Typography.size.sm, color: Colors.text, lineHeight: 20 },
  recMeta: { fontSize: Typography.size.xs, color: Colors.textSecondary, marginTop: 4 },
  emptyCard: { alignItems: 'center', gap: Spacing.md },
  empty: { fontSize: Typography.size.sm, color: Colors.textSecondary, textAlign: 'center' },
  emptyBtn: {
    backgroundColor: ClinicianTheme.accent,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.lg,
  },
  emptyBtnText: { color: Colors.white, fontWeight: '700', fontSize: Typography.size.sm },
  planCard: { gap: 4 },
  planTitle: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  planDesc: { fontSize: Typography.size.sm, color: Colors.textSecondary },
  planMeta: { fontSize: Typography.size.xs, color: Colors.textTertiary, marginTop: 4 },
});
