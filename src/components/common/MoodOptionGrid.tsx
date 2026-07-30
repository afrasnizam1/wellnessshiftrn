import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import { IconBadge } from '../ui';
import type { IoniconName } from '../../theme/icons';
import type { MoodLevel } from '../../types';

export type MoodOption = {
  icon: IoniconName;
  label: string;
  value: MoodLevel;
  bg: string;
  color: string;
};

export const ONBOARDING_MOOD_OPTIONS: MoodOption[] = [
  { icon: 'sad-outline', label: 'Low', value: 'low', bg: '#EDE8FF', color: '#7C6FD6' },
  { icon: 'ellipse-outline', label: 'Okay', value: 'neutral', bg: '#EEF2F7', color: '#64748B' },
  { icon: 'happy-outline', label: 'Good', value: 'good', bg: '#E3F9EC', color: '#22C55E' },
  { icon: 'sparkles-outline', label: 'Great', value: 'great', bg: '#FFF4DE', color: '#F59E0B' },
];

type Props = {
  options: MoodOption[];
  onSelect: (value: MoodLevel) => void;
  disabled?: boolean;
  selected?: MoodLevel | null;
};

export default function MoodOptionGrid({ options, onSelect, disabled, selected }: Props) {
  return (
    <View style={styles.grid}>
      {options.map((m) => {
        const isSelected = selected === m.value;
        return (
          <TouchableOpacity
            key={m.value}
            style={[styles.card, isSelected && styles.cardSelected]}
            onPress={() => onSelect(m.value)}
            disabled={disabled}
            activeOpacity={0.85}
          >
            <View style={[styles.iconCircle, { backgroundColor: m.bg }]}>
              <IconBadge name={m.icon} color={m.color} size="lg" variant="plain" />
            </View>
            <Text style={styles.label}>{m.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    justifyContent: 'center',
  },
  card: {
    width: '46%',
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.sm,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.borderLight,
  },
  cardSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryBg,
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginTop: Spacing.sm,
    fontSize: Typography.size.sm,
    fontWeight: '700',
    color: Colors.text,
  },
});
