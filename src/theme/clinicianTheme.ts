import { Colors, Radius, Shadow, Spacing, Typography } from './index';

/**
 * Clinician portal tokens — calm clinical surfaces with a restrained purple accent.
 * Prefer app canvas / hairline borders over heavy purple gradients or glow.
 */
export const ClinicianTheme = {
  gradient: ['#5C2D91', '#8C59BF', '#B07FE0'] as const,
  gradientSoft: ['#F0F2F8', '#F5F3F9', '#F8F7FB'] as const,
  accent: Colors.purple,
  accentDark: '#5C2D91',
  accentSoft: 'rgba(140, 89, 191, 0.12)',
  accentMuted: 'rgba(140, 89, 191, 0.06)',
  canvas: Colors.background,
  surface: Colors.surface,
  surfaceElevated: Colors.surface,
  border: Colors.borderLight,
  textOnGradient: '#FFFFFF',
  textOnGradientMuted: 'rgba(255,255,255,0.82)',
  tabActive: Colors.purple,
  tabInactive: Colors.tabInactive,
};

export const ClinicianLayout = {
  heroHeight: 168,
  cardRadius: Radius.xl,
  contentPadding: Spacing.base,
  tabBarBottomInset: 120,
  sectionGap: Spacing.xl,
};

export const ClinicianType = {
  heroTitle: {
    fontSize: Typography.size['2xl'],
    fontWeight: '800' as const,
    color: Colors.text,
    letterSpacing: -0.5,
  },
  heroSub: {
    fontSize: Typography.size.sm,
    fontWeight: '500' as const,
    color: Colors.textSecondary,
  },
  sectionTitle: {
    fontSize: Typography.size.md,
    fontWeight: '700' as const,
    color: Colors.text,
    letterSpacing: -0.3,
  },
  sectionLabel: {
    fontSize: Typography.size.xs,
    fontWeight: '700' as const,
    color: Colors.textSecondary,
    letterSpacing: 0.4,
    textTransform: 'uppercase' as const,
  },
  cardTitle: {
    fontSize: Typography.size.base,
    fontWeight: '700' as const,
    color: Colors.text,
  },
};

export const ClinicianShadow = {
  card: Shadow.sm,
  hero: Shadow.sm,
};
