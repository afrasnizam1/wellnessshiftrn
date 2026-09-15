import React, { useMemo } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Colors, Typography } from '../../theme';
import { getDailyMotivationQuote } from '../../data/dailyMotivationQuotes';

export default function DailyMotivationQuote() {
  const quote = useMemo(() => getDailyMotivationQuote(), []);

  return (
    <Text style={styles.quote} numberOfLines={1}>
      “{quote.text}”
    </Text>
  );
}

const styles = StyleSheet.create({
  quote: {
    fontSize: Typography.size.xs,
    fontWeight: '600',
    color: Colors.textTertiary,
    lineHeight: 16,
    fontStyle: 'italic',
    paddingHorizontal: 2,
  },
});
