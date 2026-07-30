import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../theme';
import { useAppStore } from '../../store';
import { gamificationService } from '../../services/gamificationService';
import type { AchievementDefinition, UserAchievement } from '../../types';
import AppScreen from '../../components/common/AppScreen';

type AchievementRow = AchievementDefinition & UserAchievement;

export default function AchievementsScreen() {
  const navigation = useNavigation<any>();
  const { user } = useAppStore();
  const [achievements, setAchievements] = useState<AchievementRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    return gamificationService.watchAchievements(user.uid, (items) => {
      setAchievements(items);
      setLoading(false);
    });
  }, [user?.uid]);

  const unlocked = achievements.filter((a) => a.unlocked).length;

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
        <Text style={styles.headerTitle}>Achievements</Text>
        <View style={{ width: 40 }} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.summary}>
          <Text style={styles.summaryNum}>{unlocked}/{achievements.length}</Text>
          <Text style={styles.summaryLabel}>Unlocked</Text>
        </View>
        <View style={styles.grid}>
          {achievements.map((a) => (
            <View key={a.id} style={[styles.card, !a.unlocked && styles.cardLocked]}>
              <Text style={[styles.icon, !a.unlocked && styles.iconLocked]}>
                {a.unlocked ? a.icon : '🔒'}
              </Text>
              <Text style={[styles.title, !a.unlocked && styles.titleLocked]}>{a.title}</Text>
              <Text style={styles.desc}>{a.description}</Text>
              {a.unlocked ? (
                <View style={styles.unlockedBadge}>
                  <Text style={styles.unlockedText}>Earned</Text>
                </View>
              ) : null}
            </View>
          ))}
        </View>
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
  summary: { alignItems: 'center', paddingVertical: Spacing.lg },
  summaryNum: { fontSize: Typography.size['3xl'], fontWeight: '700', color: Colors.primary },
  summaryLabel: { fontSize: Typography.size.sm, color: Colors.textSecondary },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  card: { width: '48%', backgroundColor: Colors.white, borderRadius: Radius.lg, padding: Spacing.base, alignItems: 'center', gap: Spacing.xs, ...Shadow.sm },
  cardLocked: { opacity: 0.55 },
  icon: { fontSize: 36 },
  iconLocked: { opacity: 0.4 },
  title: { fontSize: Typography.size.sm, fontWeight: '700', color: Colors.text, textAlign: 'center' },
  titleLocked: { color: Colors.textSecondary },
  desc: { fontSize: Typography.size.xs, color: Colors.textSecondary, textAlign: 'center', lineHeight: 16 },
  unlockedBadge: { backgroundColor: Colors.success + '22', borderRadius: Radius.xl, paddingHorizontal: Spacing.sm, paddingVertical: 2 },
  unlockedText: { fontSize: 10, color: Colors.success, fontWeight: '700' },
});
