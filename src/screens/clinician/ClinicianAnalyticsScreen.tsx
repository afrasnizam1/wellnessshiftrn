import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import { ClinicianLayout, ClinicianTheme } from '../../theme/clinicianTheme';
import { useAppStore } from '../../store';
import { clinicianService } from '../../services/clinicianService';
import AppScreen from '../../components/common/AppScreen';
import ClinicianHeroHeader from '../../components/clinician/ClinicianHeroHeader';

export default function ClinicianAnalyticsScreen() {
  const { user } = useAppStore();
  const [patients, setPatients] = useState<Awaited<ReturnType<typeof clinicianService.fetchLinkedPatients>>>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const load = async () => {
    if (!user) return;
    setPatients(await clinicianService.fetchLinkedPatients(user.uid));
  };

  useEffect(() => {
    load().finally(() => setLoading(false));
  }, [user]);

  const analytics = clinicianService.computeAnalytics(patients);
  const total = patients.length || 1;

  if (loading) {
    return (
      <AppScreen mesh={false} backgroundColor={Colors.background} style={styles.loading}>
        <ActivityIndicator size="large" color={ClinicianTheme.accent} />
      </AppScreen>
    );
  }

  const metrics = [
    { label: 'Avg wellness', value: analytics.avgScore.toFixed(1), icon: 'pulse-outline', color: ClinicianTheme.accent },
    { label: 'Active patients', value: analytics.count.toString(), icon: 'people-outline', color: Colors.physical },
    { label: 'Need attention', value: analytics.attention.toString(), icon: 'alert-circle-outline', color: Colors.error },
    {
      label: 'Score range',
      value: patients.length
        ? `${Math.min(...patients.map((p) => p.wellnessScore)).toFixed(1)}–${Math.max(...patients.map((p) => p.wellnessScore)).toFixed(1)}`
        : '—',
      icon: 'analytics-outline',
      color: Colors.nutrition,
    },
  ];

  const buckets = [
    { range: 'Excellent 8–10', count: analytics.buckets.excellent, color: Colors.success },
    { range: 'Good 6–8', count: analytics.buckets.good, color: Colors.info },
    { range: 'Fair 4–6', count: analytics.buckets.fair, color: Colors.warning },
    { range: 'Needs work 0–4', count: analytics.buckets.low, color: Colors.error },
  ];

  return (
    <View style={styles.root}>
      <ClinicianHeroHeader
        title="Analytics"
        subtitle={patients.length ? `Insights across ${patients.length} patients` : 'Link patients to unlock insights'}
      />

      <AppScreen mesh={false} backgroundColor={Colors.background} style={styles.body} edges={[]}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={async () => {
                setRefreshing(true);
                await load();
                setRefreshing(false);
              }}
              tintColor={ClinicianTheme.accent}
            />
          }
        >
          <View style={styles.metricsGrid}>
            {metrics.map((m) => (
              <View key={m.label} style={styles.metricCard}>
                <View style={[styles.metricIcon, { backgroundColor: m.color + '18' }]}>
                  <Ionicons name={m.icon as any} size={18} color={m.color} />
                </View>
                <Text style={styles.metricValue}>{m.value}</Text>
                <Text style={styles.metricLabel}>{m.label}</Text>
              </View>
            ))}
          </View>

          <View style={styles.chartCard}>
            <Text style={styles.chartTitle}>Wellness distribution</Text>
            <Text style={styles.chartSub}>How your panel scores across wellness bands</Text>
            {buckets.map((b) => {
              const pct = Math.round((b.count / total) * 100);
              return (
                <View key={b.range} style={styles.distRow}>
                  <View style={styles.distMeta}>
                    <Text style={styles.distLabel}>{b.range}</Text>
                    <Text style={styles.distCount}>
                      {b.count} · {pct}%
                    </Text>
                  </View>
                  <View style={styles.distTrack}>
                    <View
                      style={[
                        styles.distFill,
                        {
                          width: `${Math.max(pct, b.count > 0 ? 8 : 0)}%`,
                          backgroundColor: b.color,
                        },
                      ]}
                    />
                  </View>
                </View>
              );
            })}
          </View>

          {patients.length === 0 ? (
            <View style={styles.empty}>
              <View style={styles.emptyIcon}>
                <Ionicons name="bar-chart-outline" size={28} color={ClinicianTheme.accent} />
              </View>
              <Text style={styles.emptyText}>Practice analytics appear once patients are linked.</Text>
            </View>
          ) : null}
        </ScrollView>
      </AppScreen>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.md,
    paddingBottom: ClinicianLayout.tabBarBottomInset + Spacing.md,
    gap: Spacing.lg,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  metricCard: {
    width: '48%',
    flexGrow: 1,
    minWidth: '46%',
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    gap: 4,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderLight,
  },
  metricIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: Typography.size['2xl'],
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: -0.5,
  },
  metricLabel: {
    fontSize: Typography.size.xs,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  chartCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    gap: Spacing.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderLight,
  },
  chartTitle: {
    fontSize: Typography.size.md,
    fontWeight: '800',
    color: Colors.text,
  },
  chartSub: {
    fontSize: Typography.size.xs,
    color: Colors.textSecondary,
    marginTop: -4,
  },
  distRow: {
    gap: Spacing.xs,
  },
  distMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  distLabel: {
    fontSize: Typography.size.sm,
    fontWeight: '600',
    color: Colors.text,
  },
  distCount: {
    fontSize: Typography.size.xs,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  distTrack: {
    height: 8,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: Radius.pill,
    overflow: 'hidden',
  },
  distFill: {
    height: '100%',
    borderRadius: Radius.pill,
  },
  empty: {
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.lg,
  },
  emptyIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: ClinicianTheme.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: Spacing.lg,
  },
});
