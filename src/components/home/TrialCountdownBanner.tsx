import React, { useEffect, useState, memo } from 'react';
import { Screen } from '../../navigation/screenNames';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import { AnimatedPressable } from '../ui';
import { useAppStore } from '../../store';
import { freeTrialService } from '../../services/freeTrialService';

function dismissKey(uid: string) {
  return `trial_banner_dismissed:${uid}`;
}

function TrialCountdownBanner() {
  const navigation = useNavigation<any>();
  const user = useAppStore((s) => s.user);
  const subscriptionTier = useAppStore((s) => s.subscriptionTier);
  const [daysLeft, setDaysLeft] = useState(0);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;

    (async () => {
      try {
        const dismissed = await AsyncStorage.getItem(dismissKey(user.uid));
        if (dismissed === 'true') {
          if (!cancelled) setVisible(false);
          return;
        }
        const s = await freeTrialService.getStatus(user.uid, subscriptionTier);
        if (!cancelled) {
          setVisible(s.isActive);
          setDaysLeft(s.daysRemaining);
          setProgress(s.progressPercent);
        }
      } catch {
        if (!cancelled) setVisible(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [user?.uid, subscriptionTier]);

  const dismiss = async () => {
    setVisible(false);
    if (!user?.uid) return;
    try {
      await AsyncStorage.setItem(dismissKey(user.uid), 'true');
    } catch {
      // ignore persistence errors — banner is already hidden for this session
    }
  };

  if (!visible) return null;

  return (
    <View style={styles.wrap}>
      <Pressable
        onPress={dismiss}
        hitSlop={12}
        style={styles.dismissBtn}
        accessibilityRole="button"
        accessibilityLabel="Dismiss complimentary preview"
      >
        <Ionicons name="close" size={18} color={Colors.textSecondary} />
      </Pressable>

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

export default memo(TrialCountdownBanner);

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: '#FFFBEB',
    borderRadius: Radius.lg,
    padding: Spacing.base,
    paddingTop: Spacing.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#FDE68A',
    gap: Spacing.sm,
  },
  dismissBtn: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
    zIndex: 2,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: Spacing.xl,
  },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.xs, flexShrink: 1 },
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
