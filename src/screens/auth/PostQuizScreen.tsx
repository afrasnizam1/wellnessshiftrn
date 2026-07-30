// src/screens/auth/PostQuizScreen.tsx
import React from 'react';
import { Screen } from '../../navigation/screenNames';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Radius, Shadow, WELLNESS_CATEGORIES } from '../../theme';
import { useAppStore } from '../../store';
import WellnessOrbitRing from '../../components/home/WellnessOrbitRing';
import AppScreen from '../../components/common/AppScreen';
import { CategoryIcon, IconBadge } from '../../components/ui';
import type { WellnessCategoryKey } from '../../types';
import type { IoniconName } from '../../theme/icons';
import { userService } from '../../services/firebase';
import { onboardingStorage } from '../../services/onboardingStorage';

export default function PostQuizScreen() {
  const navigation = useNavigation<any>();
  const { user, setUser, wellnessScore } = useAppStore();
  const overall = wellnessScore?.overall ?? 0;

  const weakCategories = WELLNESS_CATEGORIES
    .map((c) => ({ ...c, score: wellnessScore?.categories?.[c.key as keyof typeof wellnessScore.categories] ?? 0 }))
    .sort((a, b) => a.score - b.score)
    .slice(0, 3);

  return (
    <AppScreen style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={[Colors.primary, Colors.primaryDark]} style={styles.hero}>
          <Text style={styles.heroTitle}>Your Results Are Ready!</Text>
          <WellnessOrbitRing score={overall} categories={wellnessScore?.categories} size={180} />
          <Text style={styles.heroScore}>{overall.toFixed(1)}</Text>
          <Text style={styles.heroLabel}>Overall Wellness Score</Text>
        </LinearGradient>

        <Text style={styles.sectionTitle}>Your Focus Areas</Text>
        <Text style={styles.sectionSub}>We've personalised your daily plan around these categories</Text>

        {weakCategories.map((cat) => (
          <View key={cat.key} style={[styles.catCard, { borderLeftColor: cat.color }]}>
            <CategoryIcon categoryKey={cat.key as WellnessCategoryKey} color={cat.color} size="md" />
            <View style={styles.catCardInfo}>
              <Text style={styles.catCardLabel}>{cat.label}</Text>
              <Text style={styles.catCardScore}>Score: {cat.score.toFixed(1)}/10 — we'll help you improve this</Text>
            </View>
          </View>
        ))}

        <Text style={styles.sectionTitle}>What's next</Text>
        {([
          { icon: 'calendar-outline' as IoniconName, title: 'Daily Plan', desc: 'Complete personalised tasks every day to boost your score' },
          { icon: 'fitness-outline' as IoniconName, title: 'Fitness Hub', desc: 'Explore 60+ modules tailored to your weak areas' },
          { icon: 'sparkles-outline' as IoniconName, title: 'AI Coach', desc: 'Get personalised advice from your AI health coach' },
          { icon: 'stats-chart-outline' as IoniconName, title: 'Analytics', desc: 'Track your progress with detailed charts and trends' },
        ]).map((item) => (
          <View key={item.title} style={styles.nextCard}>
            <IconBadge name={item.icon} color={Colors.primary} size="sm" />
            <View>
              <Text style={styles.nextTitle}>{item.title}</Text>
              <Text style={styles.nextDesc}>{item.desc}</Text>
            </View>
          </View>
        ))}

        <TouchableOpacity
          style={styles.ctaBtn}
          onPress={() => navigation.navigate(Screen.healthPermissions)}
        >
          <Text style={styles.ctaBtnText}>Connect Apple Health →</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.skipBtn}
          onPress={async () => {
            if (!user) return;
            try {
              await onboardingStorage.markOnboardingPaywallSeen(user.uid);
              await onboardingStorage.markMainOnboardingSupplementsComplete(user.uid);
              await userService.updateProfile(user.uid, { onboardingComplete: true });
              setUser({ ...user, onboardingComplete: true });
            } catch (e) {
              console.warn('[PostQuiz] skip to app failed:', e);
            }
          }}
        >
          <Text style={styles.skipBtnText}>Skip for now — go to app</Text>
        </TouchableOpacity>
        <View style={{ height: Spacing.xl }} />
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  content: { gap: Spacing.md, padding: Spacing.base },
  hero: {
    borderRadius: Radius.xl, padding: Spacing.xl,
    alignItems: 'center', gap: Spacing.md,
  },
  heroTitle: { fontSize: Typography.size.lg, fontWeight: '700', color: Colors.white },
  heroScore: { fontSize: Typography.size['4xl'], fontWeight: '700', color: Colors.white, marginTop: -Spacing.xl },
  heroLabel: { fontSize: Typography.size.sm, color: 'rgba(255,255,255,0.8)' },
  sectionTitle: { fontSize: Typography.size.lg, fontWeight: '700', color: Colors.text, marginTop: Spacing.md },
  sectionSub: { fontSize: Typography.size.sm, color: Colors.textSecondary, marginTop: -Spacing.sm },
  catCard: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.md,
    backgroundColor: Colors.white, borderRadius: Radius.lg,
    padding: Spacing.base, borderLeftWidth: 4, ...Shadow.sm,
  },
  catCardIcon: { fontSize: 28 },
  catCardInfo: { flex: 1 },
  catCardLabel: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  catCardScore: { fontSize: Typography.size.xs, color: Colors.textSecondary, marginTop: 2 },
  nextCard: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.md,
    backgroundColor: Colors.white, borderRadius: Radius.lg, padding: Spacing.base, ...Shadow.sm,
  },
  nextIcon: { fontSize: 28, width: 36, textAlign: 'center' },
  nextTitle: { fontSize: Typography.size.base, fontWeight: '600', color: Colors.text },
  nextDesc: { fontSize: Typography.size.xs, color: Colors.textSecondary, marginTop: 2 },
  ctaBtn: {
    backgroundColor: Colors.primary, borderRadius: Radius.xl,
    paddingVertical: Spacing.base, alignItems: 'center', ...Shadow.md,
  },
  ctaBtnText: { color: Colors.white, fontSize: Typography.size.base, fontWeight: '700' },
  skipBtn: { alignItems: 'center', paddingVertical: Spacing.sm },
  skipBtnText: { color: Colors.textSecondary, fontSize: Typography.size.sm },
});
