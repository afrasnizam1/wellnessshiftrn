import React, { useEffect, useState } from 'react';
import { Screen } from '../../navigation/screenNames';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../theme';
import { useAppStore } from '../../store';
import { programService } from '../../services/programService';
import { PROGRAM_CATALOG } from '../../data/programCatalog';
import type { ActiveProgram, ProgramCatalogItem } from '../../types';
import AppScreen from '../../components/common/AppScreen';

export default function ProgramsScreen() {
  const navigation = useNavigation<any>();
  const { user } = useAppStore();
  const [active, setActive] = useState<ActiveProgram[]>([]);
  const [loading, setLoading] = useState(true);
  const [starting, setStarting] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    return programService.watchActivePrograms(user.uid, (programs) => {
      setActive(programs);
      setLoading(false);
    });
  }, [user?.uid]);

  const startProgram = async (catalog: ProgramCatalogItem) => {
    if (!user) return;
    setStarting(catalog.id);
    try {
      const program = await programService.startProgram(user.uid, catalog.id);
      navigation.navigate(Screen.programDetail, { program });
    } catch (err: any) {
      Alert.alert('Could not start program', err.message ?? 'Please try again.');
    } finally {
      setStarting(null);
    }
  };

  const available = PROGRAM_CATALOG.filter(
    (c) => !active.some((a) => a.programId === c.id)
  );

  if (loading) {
    return (
      <AppScreen style={[styles.safe, styles.centered]}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </AppScreen>
    );
  }

  return (
    <AppScreen style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Programs</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {active.length > 0 ? (
          <>
            <Text style={styles.sectionTitle}>Active</Text>
            {active.map((p) => {
              const { progress, daysLeft } = programService.getProgress(p);
              return (
                <TouchableOpacity
                  key={p.id}
                  style={styles.card}
                  onPress={() => navigation.navigate(Screen.programDetail, { program: p })}
                >
                  <View style={[styles.cardIcon, { backgroundColor: p.color + '22' }]}>
                    <Text style={{ fontSize: 28 }}>{p.icon}</Text>
                  </View>
                  <View style={styles.cardInfo}>
                    <Text style={styles.cardTitle}>{p.title}</Text>
                    <Text style={styles.cardCat}>{p.category}{p.status === 'paused' ? ' · Paused' : ''}</Text>
                    <View style={styles.progressRow}>
                      <View style={styles.progressTrack}>
                        <View style={[styles.progressFill, { width: `${progress * 100}%`, backgroundColor: p.color }]} />
                      </View>
                      <Text style={styles.progressPct}>{Math.round(progress * 100)}%</Text>
                    </View>
                    <Text style={styles.daysLeft}>{daysLeft} days remaining</Text>
                  </View>
                  <Text style={styles.chevron}>›</Text>
                </TouchableOpacity>
              );
            })}
          </>
        ) : (
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>▶️</Text>
            <Text style={styles.emptyTitle}>No active programs</Text>
            <Text style={styles.emptySub}>Start a guided program below or explore the Fitness Hub.</Text>
          </View>
        )}

        {available.length > 0 ? (
          <>
            <Text style={styles.sectionTitle}>Start a program</Text>
            {available.map((p) => (
              <View key={p.id} style={styles.catalogCard}>
                <View style={[styles.cardIcon, { backgroundColor: p.color + '22' }]}>
                  <Text style={{ fontSize: 28 }}>{p.icon}</Text>
                </View>
                <View style={styles.cardInfo}>
                  <Text style={styles.cardTitle}>{p.title}</Text>
                  <Text style={styles.cardCat}>{p.category} · {p.durationDays} days</Text>
                  <Text style={styles.catalogDesc} numberOfLines={2}>{p.description}</Text>
                  <TouchableOpacity
                    style={[styles.startBtn, starting === p.id && { opacity: 0.6 }]}
                    onPress={() => startProgram(p)}
                    disabled={starting === p.id}
                  >
                    <Text style={styles.startBtnText}>
                      {starting === p.id ? 'Starting…' : 'Start program'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </>
        ) : null}

        <TouchableOpacity
          style={styles.hubLink}
          onPress={() => navigation.getParent()?.navigate(Screen.tabFitness)}
        >
          <Text style={styles.hubLinkText}>Browse Fitness Hub →</Text>
        </TouchableOpacity>
        <View style={{ height: Spacing.xl }} />
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  centered: { justifyContent: 'center', alignItems: 'center' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: Spacing.base, paddingVertical: Spacing.md, backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.border },
  backBtn: { width: 40 },
  backText: { fontSize: 32, color: Colors.primary, lineHeight: 38 },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  content: { padding: Spacing.base, gap: Spacing.md },
  sectionTitle: { fontSize: Typography.size.sm, fontWeight: '700', color: Colors.textSecondary, textTransform: 'uppercase', letterSpacing: 0.5 },
  empty: { alignItems: 'center', paddingVertical: Spacing.xl, gap: Spacing.sm },
  emptyEmoji: { fontSize: 56 },
  emptyTitle: { fontSize: Typography.size.xl, fontWeight: '700', color: Colors.text },
  emptySub: { fontSize: Typography.size.sm, color: Colors.textSecondary, textAlign: 'center' },
  card: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, backgroundColor: Colors.white, borderRadius: Radius.lg, padding: Spacing.base, ...Shadow.sm },
  catalogCard: { flexDirection: 'row', gap: Spacing.md, backgroundColor: Colors.white, borderRadius: Radius.lg, padding: Spacing.base, ...Shadow.sm },
  cardIcon: { width: 56, height: 56, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  cardInfo: { flex: 1, gap: 4 },
  cardTitle: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  cardCat: { fontSize: Typography.size.xs, color: Colors.textSecondary },
  catalogDesc: { fontSize: Typography.size.sm, color: Colors.textSecondary, lineHeight: 18 },
  progressRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  progressTrack: { flex: 1, height: 6, backgroundColor: Colors.border, borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 3 },
  progressPct: { fontSize: Typography.size.xs, fontWeight: '700', color: Colors.text, width: 32 },
  daysLeft: { fontSize: Typography.size.xs, color: Colors.textSecondary },
  chevron: { fontSize: 20, color: Colors.textTertiary },
  startBtn: { marginTop: Spacing.sm, backgroundColor: Colors.primary, borderRadius: Radius.md, paddingVertical: Spacing.sm, alignItems: 'center' },
  startBtnText: { color: Colors.white, fontWeight: '700', fontSize: Typography.size.sm },
  hubLink: { alignItems: 'center', paddingVertical: Spacing.md },
  hubLinkText: { color: Colors.primary, fontWeight: '600', fontSize: Typography.size.sm },
});
