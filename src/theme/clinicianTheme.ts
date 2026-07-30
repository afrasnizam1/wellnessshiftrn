import { Colors, Radius, Shadow, Spacing, Typography } from './index';

/** Clinician portal — purple brand + soft clinical surfaces */
export const ClinicianTheme = {
  gradient: ['#5C2D91', '#8C59BF', '#B07FE0'] as const,
  gradientSoft: ['#F3EEFF', '#FAF5FF', '#FFF8FC'] as const,
  accent: '#8C59BF',
  accentDark: '#5C2D91',
  accentSoft: 'rgba(140, 89, 191, 0.14)',
  accentMuted: 'rgba(140, 89, 191, 0.08)',
  canvas: '#F4F2F9',
  surface: '#FFFFFF',
  surfaceElevated: '#FFFFFF',
  border: 'rgba(140, 89, 191, 0.12)',
  textOnGradient: '#FFFFFF',
  textOnGradientMuted: 'rgba(255,255,255,0.82)',
  tabActive: '#8C59BF',
  tabInactive: '#9CA3AF',
};

export const ClinicianLayout = {
  heroHeight: 168,
  cardRadius: Radius['2xl'],
  contentPadding: Spacing.base,
  tabBarBottomInset: 120,
};

export const ClinicianType = {
  heroTitle: {
    fontSize: Typography.size['2xl'],
    fontWeight: '800' as const,
    color: ClinicianTheme.textOnGradient,
    letterSpacing: -0.5,
  },
  heroSub: {
    fontSize: Typography.size.sm,
    fontWeight: '500' as const,
    color: ClinicianTheme.textOnGradientMuted,
  },
  sectionTitle: {
    fontSize: Typography.size.md,
    fontWeight: '800' as const,
    color: Colors.text,
    letterSpacing: -0.3,
  },
  cardTitle: {
    fontSize: Typography.size.base,
    fontWeight: '700' as const,
    color: Colors.text,
  },
};

export const ClinicianShadow = {
  card: {
    ...Shadow.card,
    shadowColor: '#8C59BF',
  },
  hero: {
    shadowColor: '#5C2D91',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.22,
    shadowRadius: 24,
    elevation: 10,
  },
};
