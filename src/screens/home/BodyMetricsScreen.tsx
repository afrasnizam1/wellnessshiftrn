import React, { useCallback, useMemo, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, RefreshControl,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppScreen from '../../components/common/AppScreen';
import { AppCard, BrandButton, ScreenHeader } from '../../components/ui';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import { useAppStore } from '../../store';
import { healthKitService } from '../../services/healthkit';
import {
  computeBodyDayMetrics,
} from '../../services/bodyMetricsService';
import { applyLifestyleMetricsToWellnessScore } from '../../services/lifestyleScoreService';
import { Screen } from '../../navigation/screenNames';

export default function BodyMetricsScreen() {
  const navigation = useNavigation<any>();
  const { user, activity, setActivity, setWellnessScore } = useAppStore();
  const [refreshing, setRefreshing] = useState(false);
  const metrics = useMemo(() => computeBodyDayMetrics(activity), [activity]);

  const refresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const connected = await healthKitService.isConnected();
      if (!connected) return;
      const snapshot = await healthKitService.getTodayActivity();
      setActivity(snapshot);
      if (user) {
        const updated = await applyLifestyleMetricsToWellnessScore(user.uid, snapshot);
        if (updated) setWellnessScore(updated);
      }
    } finally {
      setRefreshing(false);
    }
  }, [user, setActivity, setWellnessScore]);

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh]),
  );

  return (
    <AppScreen style={styles.safe}>
      <View style={styles.header}>
        <ScreenHeader
          title="Body metrics"
          subtitle="Sleep, recovery & strain from Apple Health"
          onBack={() => navigation.goBack()}
        />
      </View>
      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />}
      >
        <AppCard style={styles.hero}>
          <View style={styles.scoreGrid}>
            <View style={styles.scoreCell}>
              <Text style={styles.scoreValue}>{metrics.recoveryScore || '—'}</Text>
              <Text style={styles.scoreLabel}>Recovery</Text>
              <Text style={styles.scoreHint}>0–100 readiness</Text>
            </View>
            <View style={styles.scoreCell}>
              <Text style={[styles.scoreValue, { color: Colors.fitness }]}>
                {metrics.strainScore.toFixed(1)}
              </Text>
              <Text style={styles.scoreLabel}>Strain</Text>
              <Text style={styles.scoreHint}>0–21 daily load</Text>
            </View>
          </View>
          <View style={styles.sleepRow}>
            <Ionicons name="moon-outline" size={18} color={Colors.primary} />
            <View style={{ flex: 1 }}>
              <Text style={styles.sleepTitle}>
                {metrics.hasHealthSleep
                  ? `${metrics.sleepHours} hours last night`
                  : 'Sleep not synced yet'}
              </Text>
              <Text style={styles.sleepSub}>{metrics.sleepQualityLabel}</Text>
            </View>
          </View>
        </AppCard>

        <AppCard style={styles.card}>
          <Text style={styles.cardTitle}>Recovery</Text>
          <Text style={styles.cardBody}>{metrics.recoverySummary}</Text>
        </AppCard>

        <AppCard style={styles.card}>
          <Text style={styles.cardTitle}>Strain</Text>
          <Text style={styles.cardBody}>{metrics.strainSummary}</Text>
        </AppCard>

        <AppCard style={styles.card}>
          <Text style={styles.cardTitle}>How this affects you</Text>
          <Text style={styles.cardBody}>
            Sleep and recovery update your sleep category. Strain nudges fitness. Together they
            move your wellness score — and your biological age estimate on Home.
          </Text>
        </AppCard>

        <BrandButton
          label="Open Apple Health permissions"
          variant="outline"
          onPress={() =>
            navigation.getParent()?.navigate(Screen.tabHome, {
              screen: Screen.healthPermissions,
            })
          }
        />
        <BrandButton
          label="Log a meal with photo"
          onPress={() => navigation.navigate(Screen.foodScan)}
        />
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: { paddingHorizontal: Spacing.base, paddingTop: Spacing.sm },
  content: { padding: Spacing.base, gap: Spacing.md, paddingBottom: Spacing['2xl'] },
  hero: { gap: Spacing.md },
  scoreGrid: { flexDirection: 'row', gap: Spacing.sm },
  scoreCell: {
    flex: 1,
    backgroundColor: Colors.surfaceSecondary ?? Colors.primaryLight,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    gap: 4,
  },
  scoreValue: {
    fontSize: Typography.size['3xl'],
    fontWeight: '800',
    color: Colors.primary,
    letterSpacing: -1,
  },
  scoreLabel: { fontSize: Typography.size.sm, fontWeight: '700', color: Colors.text },
  scoreHint: { fontSize: Typography.size.xs, color: Colors.textSecondary },
  sleepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.primaryLight,
    borderRadius: Radius.md,
    padding: Spacing.sm,
  },
  sleepTitle: { fontSize: Typography.size.sm, fontWeight: '700', color: Colors.text },
  sleepSub: { fontSize: Typography.size.xs, color: Colors.textSecondary, marginTop: 2 },
  card: { gap: Spacing.xs },
  cardTitle: { fontSize: Typography.size.base, fontWeight: '800', color: Colors.text },
  cardBody: { fontSize: Typography.size.sm, color: Colors.textSecondary, lineHeight: 20 },
});
