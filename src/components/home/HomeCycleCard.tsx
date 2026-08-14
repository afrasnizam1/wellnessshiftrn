import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import { AppCard, AnimatedPressable } from '../ui';
import { Screen } from '../../navigation/screenNames';
import { useAppStore } from '../../store';
import { onboardingStorage } from '../../services/onboardingStorage';
import {
  cycleTrackingService,
  shouldShowWomensHealth,
  type CycleSnapshot,
} from '../../services/cycleTrackingService';

export default function HomeCycleCard() {
  const navigation = useNavigation<any>();
  const user = useAppStore((s) => s.user);
  const [visible, setVisible] = useState(false);
  const [snap, setSnap] = useState<CycleSnapshot | null>(null);

  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      (async () => {
        if (!user) return;
        const stored = await onboardingStorage.getUserGender(user.uid);
        const show = shouldShowWomensHealth(user.gender ?? stored);
        if (cancelled) return;
        setVisible(show);
        if (!show) return;
        const next = await cycleTrackingService.getSnapshot(user.uid);
        if (!cancelled) setSnap(next);
      })();
      return () => {
        cancelled = true;
      };
    }, [user?.uid, user?.gender]),
  );

  if (!visible) return null;

  const subtitle = snap?.dayOfCycle && snap.phase
    ? `Day ${snap.dayOfCycle} · ${snap.phase.name}`
    : 'Track periods, symptoms, and cycle phases';
  const extra = snap?.nextPeriod
    ? `Next period est. ${format(snap.nextPeriod, 'd MMM')}`
    : 'Open For women to log your last period start';

  return (
    <AnimatedPressable
      onPress={() => navigation.navigate(Screen.tabMore, { screen: Screen.womensHealth })}
      accessibilityRole="button"
      accessibilityLabel="Open women's health and cycle tracking"
    >
      <AppCard style={styles.card}>
        <View style={styles.iconWrap}>
          <Ionicons name="calendar-outline" size={22} color={Colors.brand} />
        </View>
        <View style={styles.copy}>
          <Text style={styles.kicker}>For women</Text>
          <Text style={styles.title}>{subtitle}</Text>
          <Text style={styles.sub}>{extra}</Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color={Colors.textTertiary} />
      </AppCard>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    backgroundColor: 'rgba(242,77,128,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  copy: { flex: 1, gap: 2 },
  kicker: {
    fontSize: Typography.size.xs,
    fontWeight: '700',
    color: Colors.brand,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  title: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  sub: { fontSize: Typography.size.sm, color: Colors.textSecondary },
});
