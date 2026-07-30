import React, { useEffect, useState } from 'react';
import { Screen } from '../../navigation/screenNames';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import { AnimatedPressable } from '../ui';
import { useAppStore } from '../../store';
import { freeTrialService } from '../../services/freeTrialService';

export default function TrialCountdownBanner() {
  const navigation = useNavigation<any>();
  const { user, subscriptionTier } = useAppStore();
  const [daysLeft, setDaysLeft] = useState(0);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!user) return;
    freeTrialService.getStatus(user.uid, subscriptionTier).then((s) => {
      setVisible(s.isActive);
      setDaysLeft(s.daysRemaining);
      setProgress(s.progressPercent);
    }).catch(() => {});
  }, [user?.uid, subscriptionTier]);

  if (!visible) return null;

  return (
    <View style={styles.wrap}>
      <View style={styles.topRow}>
        <View style={styles.titleRow}>
          <Ionicons name="diamond" size={18} color="#F59E0B" />
          <Text style={styles.title}>Complimentary preview</Text>
        </View>
        <AnimatedPressable
          style={styles.upgradeBtn}
          onPress={() => navigation.navigate(Screen.subscriptionPaywall, { feature: 'Premium upgrade' })}
        >
          <Text style={styles.upgradeText}>Upgrade</Text>
        </AnimatedPressable>
      </View>
      <Text style={styles.days}>{daysLeft} day{daysLeft === 1 ? '' : 's'} remaining</Text>
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${progress}%` }]} />
      </View>
      <Text style={styles.progressLabel}>Preview progress · {progress}% used</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: '#FFFBEB',
    borderRadius: Radius.lg,
    padding: Spacing.base,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#FDE68A',
    gap: Spacing.sm,
  },
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.xs },
  title: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  upgradeBtn: {
    backgroundColor: Colors.brand,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.pill,
  },
  upgradeText: { color: Colors.white, fontSize: Typography.size.sm, fontWeight: '700' },
  days: { fontSize: Typography.size.sm, color: Colors.textSecondary, fontWeight: '600' },
  progressTrack: {
    height: 6,
    backgroundColor: '#FEF3C7',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: { height: '100%', backgroundColor: '#F59E0B', borderRadius: 3 },
  progressLabel: { fontSize: Typography.size.xs, color: Colors.textTertiary },
});
