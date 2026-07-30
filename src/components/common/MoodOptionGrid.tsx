import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../theme';
import type { MoodLevel } from '../../types';
import MoodFaceIcon from './MoodFaceIcon';

export type MoodOption = {
  label: string;
  value: MoodLevel;
  /** Soft well gradient (top → bottom) */
  well: [string, string];
  accent: string;
};

export const ONBOARDING_MOOD_OPTIONS: MoodOption[] = [
  { label: 'Low', value: 'low', well: ['#F3EEFF', '#E4DBFF'], accent: '#7C6FD6' },
  { label: 'Okay', value: 'neutral', well: ['#F1F5F9', '#E2E8F0'], accent: '#64748B' },
  { label: 'Good', value: 'good', well: ['#ECFDF5', '#D1FAE5'], accent: '#16A34A' },
  { label: 'Great', value: 'great', well: ['#FFFBEB', '#FEF3C7'], accent: '#F59E0B' },
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
            style={[
              styles.card,
              isSelected && { borderColor: m.accent, backgroundColor: `${m.accent}12` },
            ]}
            onPress={() => onSelect(m.value)}
            disabled={disabled}
            activeOpacity={0.88}
            accessibilityRole="button"
            accessibilityLabel={`Feeling ${m.label}`}
          >
            <LinearGradient
              colors={m.well}
              start={{ x: 0.15, y: 0 }}
              end={{ x: 0.85, y: 1 }}
              style={[styles.iconWell, isSelected && styles.iconWellSelected]}
            >
              <MoodFaceIcon mood={m.value} size={44} />
            </LinearGradient>
            <Text style={[styles.label, isSelected && { color: m.accent }]}>{m.label}</Text>
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
    ...Shadow.sm,
  },
  iconWell: {
    width: 84,
    height: 84,
    borderRadius: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.7)',
  },
  iconWellSelected: {
    transform: [{ scale: 1.04 }],
  },
  label: {
    marginTop: Spacing.md,
    fontSize: Typography.size.sm,
    fontWeight: '700',
    color: Colors.text,
    letterSpacing: 0.2,
  },
});
