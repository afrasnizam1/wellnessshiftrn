import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import { AppCard, ListRow } from '../ui';

interface Props {
  streak: number;
  needsCheckIn: boolean;
  onPress: () => void;
}

export default function CheckInStreakCard({ streak, needsCheckIn, onPress }: Props) {
  if (!needsCheckIn || streak <= 0) return null;

  return (
    <AppCard style={styles.card} onPress={onPress}>
      <ListRow
        title="Don't break your streak!"
        subtitle="Check in today to keep your momentum"
        iconName="flame"
        iconColor={Colors.warning}
        showDivider={false}
        trailing={
          <View style={styles.streakBadge}>
            <Text style={styles.streakNum}>{streak}</Text>
            <Text style={styles.streakLabel}>day{streak === 1 ? '' : 's'}</Text>
          </View>
        }
      />
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: { padding: 0, overflow: 'hidden' },
  streakBadge: {
    alignItems: 'center',
    minWidth: 40,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.md,
    backgroundColor: Colors.warningLight,
  },
  streakNum: { fontSize: Typography.size.lg, fontWeight: '800', color: Colors.warning, lineHeight: 22 },
  streakLabel: { fontSize: 10, color: Colors.textSecondary, fontWeight: '600', marginTop: 1 },
});
