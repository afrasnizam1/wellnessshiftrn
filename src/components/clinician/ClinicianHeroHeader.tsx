import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Spacing, Radius, Typography } from '../../theme';
import { ClinicianTheme } from '../../theme/clinicianTheme';

type Action = {
  icon: string;
  onPress: () => void;
  badge?: number;
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
            <View style={styles.brandRow}>
              <View style={styles.brandMark} />
              <Text style={styles.eyebrow}>{eyebrow}</Text>
            </View>
            {actions?.length ? (
              <View style={styles.actions}>
                {actions.map((a) => (
                  <TouchableOpacity key={a.icon} style={styles.actionBtn} onPress={a.onPress} activeOpacity={0.75}>
                    <Ionicons name={a.icon as any} size={20} color={ClinicianTheme.accentDark} />
                    {a.badge != null && a.badge > 0 ? (
                      <View style={styles.badge}>
                        <Text style={styles.badgeText}>{a.badge > 9 ? '9+' : a.badge}</Text>
                      </View>
                    ) : null}
                  </TouchableOpacity>
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
    gap: 6,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brandMark: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: ClinicianTheme.accent,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: '700',
    color: ClinicianTheme.accent,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: ClinicianTheme.accentMuted,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: ClinicianTheme.border,
  },
  badge: {
    position: 'absolute',
    top: -3,
    right: -3,
    minWidth: 17,
    height: 17,
    borderRadius: 9,
    backgroundColor: Colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    borderWidth: 2,
    borderColor: ClinicianTheme.surface,
  },
  badgeText: { color: '#FFF', fontSize: 9, fontWeight: '800' },
  title: {
    fontSize: Typography.size['2xl'],
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: -0.6,
    lineHeight: 32,
  },
  subtitle: {
    fontSize: Typography.size.sm,
    fontWeight: '500',
    color: Colors.textSecondary,
    marginTop: 2,
  },
  hairline: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: ClinicianTheme.border,
  },
});
