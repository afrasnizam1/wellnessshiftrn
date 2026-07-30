import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../theme';
import type { InAppGuideDestination } from './InAppGuideModal';

type Props = {
  title: string;
  body: string;
  cta: string;
  onPress: () => void;
  onDismiss: () => void;
};

export default function ContextualGoalTooltip({ title, body, cta, onPress, onDismiss }: Props) {
  return (
    <View style={styles.wrap}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Ionicons name="sparkles" size={18} color={Colors.brand} />
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity
            onPress={onDismiss}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Dismiss tip"
          >
            <Ionicons name="close" size={18} color={Colors.textTertiary} />
          </TouchableOpacity>
        </View>
        <Text style={styles.body}>{body}</Text>
        <TouchableOpacity style={styles.cta} onPress={onPress} activeOpacity={0.88}>
          <Text style={styles.ctaText}>{cta}</Text>
          <Ionicons name="arrow-forward" size={16} color={Colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export type { InAppGuideDestination };

const styles = StyleSheet.create({
  wrap: { marginBottom: Spacing.md },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    padding: Spacing.base,
    gap: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.primary + '33',
    ...Shadow.card,
  },
  header: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  title: { flex: 1, fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  body: { fontSize: Typography.size.sm, color: Colors.textSecondary, lineHeight: 20 },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    backgroundColor: Colors.primary,
    borderRadius: Radius.pill,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    alignSelf: 'flex-start',
  },
  ctaText: { color: Colors.white, fontSize: Typography.size.sm, fontWeight: '700' },
});
