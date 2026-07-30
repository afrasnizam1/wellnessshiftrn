import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import { IconBadge } from '../ui';
import { getDailyMotivationQuote } from '../../data/dailyMotivationQuotes';

export default function DailyMotivationQuote() {
  const quote = useMemo(() => getDailyMotivationQuote(), []);

  return (
    <View style={styles.strip}>
      <IconBadge name="sunny-outline" color={Colors.brand} size="sm" />
      <Text style={styles.quote} numberOfLines={2}>
        "{quote.text}"
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  strip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.primaryLight,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderLight,
  },
  quote: {
    flex: 1,
    fontSize: Typography.size.xs,
    fontWeight: '600',
    color: Colors.textSecondary,
    lineHeight: 16,
    fontStyle: 'italic',
  },
});
