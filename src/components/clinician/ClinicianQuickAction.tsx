import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Spacing, Radius } from '../../theme';
import { ClinicianTheme } from '../../theme/clinicianTheme';

export type QuickActionItem = {
  icon: string;
  title: string;
  subtitle?: string;
  color: string;
  bg: string;
  onPress: () => void;
};

type Props = {
  actions: QuickActionItem[];
  title?: string;
};

export function ClinicianQuickActions({ actions, title = 'Quick actions' }: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{title}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
      >
        {actions.map((a) => (
          <TouchableOpacity key={a.title} style={styles.card} onPress={a.onPress} activeOpacity={0.88}>
            <View style={[styles.iconWrap, { backgroundColor: a.bg }]}>
              <Ionicons name={a.icon as any} size={22} color={a.color} />
            </View>
            <Text style={styles.cardTitle}>{a.title}</Text>
            {a.subtitle ? <Text style={styles.cardSub}>{a.subtitle}</Text> : null}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: Spacing.sm },
  title: {
    fontSize: 17,
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: -0.3,
    paddingHorizontal: Spacing.base,
  },
  row: {
    paddingHorizontal: Spacing.base,
    gap: Spacing.sm,
    paddingBottom: 4,
  },
  card: {
    width: 132,
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    gap: Spacing.sm,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderLight,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: { fontSize: 14, fontWeight: '700', color: Colors.text },
  cardSub: { fontSize: 11, color: Colors.textTertiary, fontWeight: '500' },
});
