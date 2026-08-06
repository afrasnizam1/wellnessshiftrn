import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Spacing, Radius, Typography } from '../../theme';
import { ClinicianTheme } from '../../theme/clinicianTheme';
import { AnimatedPressable } from '../ui';

type Action = {
  icon: string;
  onPress: () => void;
  badge?: number;
  accessibilityLabel?: string;
};

type Props = {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  actions?: Action[];
  children?: React.ReactNode;
  style?: ViewStyle;
};

export default function ClinicianHeroHeader({
  title,
  subtitle,
  eyebrow = 'Clinician portal',
  actions,
  children,
  style,
}: Props) {
  return (
    <View style={[styles.shell, style]}>
      <SafeAreaView edges={['top']} style={styles.safe}>
        <View style={styles.inner}>
          <View style={styles.topRow}>
            <Text style={styles.eyebrow}>{eyebrow}</Text>
            {actions?.length ? (
              <View style={styles.actions}>
                {actions.map((a) => (
                  <AnimatedPressable
                    key={a.icon}
                    style={styles.actionBtn}
                    onPress={a.onPress}
                    accessibilityLabel={a.accessibilityLabel}
                    accessibilityRole="button"
                  >
                    <Ionicons name={a.icon as any} size={20} color={Colors.text} />
                    {a.badge != null && a.badge > 0 ? (
                      <View style={styles.badge}>
                        <Text style={styles.badgeText}>{a.badge > 9 ? '9+' : a.badge}</Text>
                      </View>
                    ) : null}
                  </AnimatedPressable>
                ))}
              </View>
            ) : null}
          </View>

          <Text style={styles.title} numberOfLines={2}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
        {children}
      </SafeAreaView>
      <View style={styles.hairline} />
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    backgroundColor: ClinicianTheme.surface,
  },
  safe: {
    backgroundColor: ClinicianTheme.surface,
  },
  inner: {
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.xs,
    paddingBottom: Spacing.md,
    gap: Spacing.xs,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  eyebrow: {
    fontSize: Typography.size.xs,
    fontWeight: '700',
    color: ClinicianTheme.accent,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.xs,
  },
  actionBtn: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    backgroundColor: Colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderLight,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: Colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    borderWidth: 2,
    borderColor: ClinicianTheme.surface,
  },
  badgeText: { color: Colors.white, fontSize: 9, fontWeight: '800' },
  title: {
    fontSize: Typography.size['2xl'],
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: -0.6,
    lineHeight: 34,
  },
  subtitle: {
    fontSize: Typography.size.sm,
    fontWeight: '500',
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  hairline: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.borderLight,
  },
});
