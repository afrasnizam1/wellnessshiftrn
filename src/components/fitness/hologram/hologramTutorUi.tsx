import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../../theme';
import type {
  HologramFactCard,
  HologramImportance,
  HologramOrganHealth,
  HologramQuickStat,
  HologramStatCard,
} from '../../../types/hologramTutor';

const SF_ICON_MAP: Record<string, string> = {
  'heart.fill': 'heart',
  'drop.fill': 'water',
  speedometer: 'speedometer',
  timer: 'time',
  'lungs.fill': 'fitness',
  network: 'git-network',
  wind: 'leaf',
  'brain.head.profile': 'bulb',
  'bolt.fill': 'flash',
  bone: 'body',
  'figure.stand': 'body',
  'figure.arms.open': 'body',
  'oval.fill': 'ellipse',
  'moon.fill': 'moon',
  'eye.fill': 'eye',
  waveform: 'pulse',
  'leaf.fill': 'leaf',
  'figure.walk': 'walk',
  'drop.triangle.fill': 'water',
  'hand.raised.fill': 'hand-left',
  'figure.strengthtraining.traditional': 'barbell',
  'arrow.triangle.2.circlepath': 'refresh',
  'flame.fill': 'flame',
  'heart.lungs.fill': 'fitness',
  memorychip: 'hardware-chip',
};

const SWIFT_COLOR_MAP: Record<string, string> = {
  red: '#E74C3C',
  pink: '#E91E8C',
  orange: '#E67E22',
  yellow: '#F1C40F',
  green: '#27AE60',
  mint: '#1ABC9C',
  cyan: '#3498DB',
  blue: '#2980B9',
  indigo: '#5B2C6F',
  purple: '#9B59B6',
  white: '#95A5A6',
};

export function hologramIcon(name: string): string {
  return SF_ICON_MAP[name] ?? 'information-circle-outline';
}

export function hologramColor(name: string, fallback = Colors.primary): string {
  return SWIFT_COLOR_MAP[name] ?? fallback;
}

export function ModuleImportanceCard({ data }: { data: HologramImportance }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Why {data.title} Matters</Text>
      <Text style={styles.cardBody}>{data.importance}</Text>
      <Text style={styles.cardBody}>{data.value}</Text>
      <Text style={styles.subheading}>Benefits</Text>
      {data.benefits.map((b) => (
        <Text key={b} style={styles.bullet}>• {b}</Text>
      ))}
    </View>
  );
}

export function QuickStatsRow({ stats, accent }: { stats: HologramQuickStat[]; accent: string }) {
  if (!stats.length) return null;
  return (
    <View style={styles.quickStats}>
      {stats.map((s) => (
        <View key={s.label} style={styles.quickStat}>
          <Ionicons name={hologramIcon(s.icon) as any} size={20} color={accent} />
          <Text style={styles.quickStatValue}>{s.value}</Text>
          <Text style={styles.quickStatLabel}>{s.label}</Text>
        </View>
      ))}
    </View>
  );
}

export function StatCardsSection({
  title,
  stats,
}: {
  title: string;
  stats: HologramStatCard[];
}) {
  if (!stats.length) return null;
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {stats.map((s) => (
        <View key={s.title} style={styles.detailCard}>
          <View style={styles.detailHeader}>
            <Ionicons name={hologramIcon(s.icon) as any} size={22} color={hologramColor(s.color)} />
            <View style={styles.detailHeaderText}>
              <Text style={styles.detailTitle}>{s.title}</Text>
              <Text style={[styles.detailStat, { color: hologramColor(s.color) }]}>{s.stat}</Text>
            </View>
          </View>
          <Text style={styles.detailBody}>{s.description}</Text>
        </View>
      ))}
    </View>
  );
}

export function FactCardsSection({
  title,
  facts,
}: {
  title: string;
  facts: HologramFactCard[];
}) {
  if (!facts.length) return null;
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {facts.map((f) => (
        <View key={f.title} style={styles.detailCard}>
          <View style={styles.detailHeader}>
            <Ionicons name={hologramIcon(f.icon) as any} size={22} color={hologramColor(f.color)} />
            <Text style={styles.detailTitle}>{f.title}</Text>
          </View>
          <Text style={styles.detailBody}>{f.fact}</Text>
        </View>
      ))}
    </View>
  );
}

function BulletList({ title, items }: { title: string; items: string[] }) {
  if (!items.length) return null;
  return (
    <View style={styles.listBlock}>
      <Text style={styles.subheading}>{title}</Text>
      {items.map((item) => (
        <Text key={item} style={styles.bullet}>• {item}</Text>
      ))}
    </View>
  );
}

export function OrganHealthTipsCard({ data }: { data: HologramOrganHealth }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{data.organName} Health Tips</Text>
      <BulletList title="Best foods" items={data.bestFoods} />
      <BulletList title="Best fluids" items={data.bestFluids} />
      {data.commonIssues.map((issue) => (
        <View key={issue.name} style={styles.issueBlock}>
          <Text style={styles.subheading}>{issue.name}</Text>
          {issue.causes.map((c) => (
            <Text key={c} style={styles.bullet}>• {c}</Text>
          ))}
        </View>
      ))}
      <BulletList title="Prevention tips" items={data.preventionTips} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.base,
    ...Shadow.sm,
    gap: Spacing.sm,
  },
  cardTitle: {
    fontSize: Typography.size.base,
    fontWeight: '700',
    color: Colors.text,
  },
  cardBody: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  subheading: {
    fontSize: Typography.size.sm,
    fontWeight: '700',
    color: Colors.text,
    marginTop: Spacing.xs,
  },
  bullet: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    lineHeight: 22,
    paddingLeft: Spacing.xs,
  },
  quickStats: {
    flexDirection: 'row',
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: Radius.lg,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
  },
  quickStat: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  quickStatValue: {
    fontSize: Typography.size.sm,
    fontWeight: '700',
    color: Colors.text,
  },
  quickStatLabel: {
    fontSize: Typography.size.xs,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  section: { gap: Spacing.sm },
  sectionTitle: {
    fontSize: Typography.size.lg,
    fontWeight: '700',
    color: Colors.text,
  },
  detailCard: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: Radius.lg,
    padding: Spacing.base,
    gap: Spacing.sm,
  },
  detailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  detailHeaderText: { flex: 1 },
  detailTitle: {
    fontSize: Typography.size.sm,
    fontWeight: '700',
    color: Colors.text,
  },
  detailStat: {
    fontSize: Typography.size.base,
    fontWeight: '700',
  },
  detailBody: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  listBlock: { gap: 4 },
  issueBlock: { gap: 2, marginTop: Spacing.xs },
});
