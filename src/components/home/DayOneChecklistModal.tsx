import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal,
} from 'react-native';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import { BrandButton } from '../../components/ui';
import { useAppStore } from '../../store';
import { onboardingStorage } from '../../services/onboardingStorage';

type Props = {
  visible: boolean;
  onClose: () => void;
  onMarkComplete: () => void;
  onOpenCheckIn: () => void;
  onOpenAchievements: () => void;
};

export default function DayOneChecklistModal({
  visible, onClose, onMarkComplete, onOpenCheckIn, onOpenAchievements,
}: Props) {
  const { user } = useAppStore();
  const [openedCheckIn, setOpenedCheckIn] = useState(false);
  const [tappedExplore, setTappedExplore] = useState(false);
  const [tappedStreaks, setTappedStreaks] = useState(false);

  const dismiss = async (markComplete: boolean) => {
    if (markComplete && user) {
      await onboardingStorage.markDayOneChecklistComplete(user.uid);
      onMarkComplete();
    }
    onClose();
  };

  const items = [
    {
      title: 'Open Daily Check-In',
      sub: openedCheckIn ? 'Great — keep the streak going' : 'Log mood and energy in one tap',
      done: openedCheckIn,
      action: () => { setOpenedCheckIn(true); onOpenCheckIn(); },
      actionLabel: 'Open Check-In',
    },
    {
      title: 'Explore Home',
      sub: 'Scroll the dashboard and open one card',
      done: tappedExplore,
      action: () => setTappedExplore(true),
      actionLabel: 'I did this',
    },
    {
      title: 'Peek at Streaks',
      sub: 'More → Achievements & gamification',
      done: tappedStreaks,
      action: () => { setTappedStreaks(true); onOpenAchievements(); },
      actionLabel: 'I did this',
    },
  ];

  const allDone = tappedExplore && tappedStreaks;

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <View style={styles.safe}>
        <View style={styles.header}>
          <Text style={styles.navTitle}>Quick start</Text>
          <TouchableOpacity onPress={() => dismiss(false)}>
            <Text style={styles.close}>Close</Text>
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.title}>Get familiar with Home</Text>
          <Text style={styles.intro}>
            A few quick taps to explore your dashboard. Takes about 2 minutes.
          </Text>
          {items.map((item) => (
            <View key={item.title} style={[styles.row, item.done && styles.rowDone]}>
              <Text style={styles.check}>{item.done ? '✓' : '○'}</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.rowTitle}>{item.title}</Text>
                <Text style={styles.rowSub}>{item.sub}</Text>
                {item.action && !item.done && (
                  <TouchableOpacity onPress={item.action} style={styles.miniBtn}>
                    <Text style={styles.miniBtnText}>{item.actionLabel}</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}
        </ScrollView>
        <View style={styles.footer}>
          <BrandButton
            label={allDone ? 'Done' : 'Mark complete & dismiss'}
            onPress={() => dismiss(true)}
          />
          <TouchableOpacity onPress={() => dismiss(false)} style={styles.remindBtn}>
            <Text style={styles.remindText}>Remind me later</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.base,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.borderLight,
  },
  navTitle: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  close: { color: Colors.primary, fontWeight: '600' },
  content: { padding: Spacing.base, gap: Spacing.md },
  title: { fontSize: Typography.size.xl, fontWeight: '800', color: Colors.text },
  intro: { fontSize: Typography.size.sm, color: Colors.textSecondary, lineHeight: 22 },
  row: {
    flexDirection: 'row',
    gap: Spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.base,
  },
  rowDone: { opacity: 0.75 },
  check: { fontSize: 20, color: Colors.success, fontWeight: '700', width: 24 },
  rowTitle: { fontSize: Typography.size.base, fontWeight: '600', color: Colors.text },
  rowSub: { fontSize: Typography.size.xs, color: Colors.textSecondary, marginTop: 2 },
  miniBtn: {
    alignSelf: 'flex-start',
    marginTop: Spacing.sm,
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.pill,
  },
  miniBtnText: { color: Colors.primary, fontWeight: '600', fontSize: Typography.size.sm },
  footer: { padding: Spacing.base, gap: Spacing.sm },
  remindBtn: { alignItems: 'center', paddingVertical: Spacing.sm },
  remindText: { color: Colors.textSecondary, fontSize: Typography.size.sm },
});
