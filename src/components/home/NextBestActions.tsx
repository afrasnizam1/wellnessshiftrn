import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../theme';
import { AnimatedPressable } from '../ui';
import type { ActivitySnapshot, CarePlan } from '../../types';

export interface NextBestAction {
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  onPress?: () => void;
}

interface Props {
  activity: ActivitySnapshot | null;
  carePlan: CarePlan | null;
  onCheckIn: () => void;
  onCarePlan: () => void;
}

export default function NextBestActions({
  activity,
  carePlan,
  onCheckIn,
  onCarePlan,
}: Props) {
  const actions: NextBestAction[] = [];
  const steps = activity?.steps ?? 0;

  if (steps < 6000) {
    actions.push({
      title: 'Take a 10-minute walk',
      subtitle: 'Boost steps and energy today',
      icon: 'walk-outline',
      color: Colors.info,
    });
  }

  if (carePlan) {
    actions.push({
      title: 'Review your care plan',
      subtitle: 'Complete one clinician task',
      icon: 'medkit-outline',
      color: Colors.success,
      onPress: onCarePlan,
    });
  } else {
    actions.push({
      title: "Complete today's check-in",
      subtitle: 'Keep your wellness score fresh',
      icon: 'checkmark-circle-outline',
      color: Colors.warning,
      onPress: onCheckIn,
    });
  }

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Your Next Best Actions</Text>
      {actions.slice(0, 3).map((action) => (
        <AnimatedPressable
          key={action.title}
          style={styles.row}
          onPress={action.onPress}
          disabled={!action.onPress}
        >
          <View style={[styles.iconCircle, { backgroundColor: action.color + '18' }]}>
            <Ionicons name={action.icon} size={20} color={action.color} />
          </View>
          <View style={styles.info}>
            <Text style={styles.title}>{action.title}</Text>
            <Text style={styles.subtitle}>{action.subtitle}</Text>
          </View>
          <View style={styles.chevronWrap}>
            <Ionicons name="chevron-forward" size={14} color={Colors.textTertiary} />
          </View>
        </AnimatedPressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    padding: Spacing.base,
    gap: Spacing.sm,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.glassBorder,
    ...Shadow.card,
  },
  sectionTitle: { fontSize: Typography.size.lg, fontWeight: '800', color: Colors.text, letterSpacing: -0.4, marginBottom: Spacing.xs },
  row: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, paddingVertical: Spacing.sm },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: { flex: 1 },
  title: { fontSize: Typography.size.base, fontWeight: '600', color: Colors.text, letterSpacing: -0.2 },
  subtitle: { fontSize: Typography.size.sm, color: Colors.textSecondary, marginTop: 2 },
  chevronWrap: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.surfaceSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
