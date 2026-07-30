import React, { useEffect, useMemo, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import { AppCard, BrandButton, IconBadge } from '../../components/ui';
import type { IoniconName } from '../../theme/icons';
import { useAppStore } from '../../store';
import { onboardingStorage } from '../../services/onboardingStorage';

const LEGACY_GOALS: { id: string; label: string; icon: IoniconName; color: string }[] = [
  { id: 'lose_weight', label: 'Lose Weight', icon: 'scale-outline', color: '#3498DB' },
  { id: 'gain_strength', label: 'Gain Strength', icon: 'barbell-outline', color: '#E67E22' },
  { id: 'stress_relief', label: 'Stress Relief', icon: 'flower-outline', color: '#9B59B6' },
  { id: 'better_sleep', label: 'Better Sleep', icon: 'bed-outline', color: '#4338CA' },
  { id: 'mindfulness', label: 'Mindfulness', icon: 'leaf-outline', color: '#946BFA' },
  { id: 'improve_energy', label: 'Improve Energy', icon: 'flash-outline', color: '#F39C12' },
  { id: 'mental_health', label: 'Mental Health Support', icon: 'happy-outline', color: '#3498DB' },
  { id: 'nutrition', label: 'Better Nutrition', icon: 'nutrition-outline', color: '#27AE60' },
];

const PERSONAS: { id: string; label: string; desc: string; icon: IoniconName }[] = [
  { id: 'busy_professional', label: 'Busy Professional', desc: 'Limited time, high stress', icon: 'briefcase-outline' },
  { id: 'beginner', label: 'Wellness Beginner', desc: 'Starting your journey', icon: 'leaf-outline' },
  { id: 'stressed_parent', label: 'Stressed Parent', desc: 'Balancing family and self-care', icon: 'people-outline' },
  { id: 'mental_focus', label: 'Mental Health Focus', desc: 'Prioritising mind and mood', icon: 'happy-outline' },
  { id: 'fitness_enthusiast', label: 'Fitness Enthusiast', desc: 'Already active, want more', icon: 'footsteps-outline' },
  { id: 'health_optimizer', label: 'Health Optimizer', desc: 'Fine-tuning every area', icon: 'analytics-outline' },
];

type Props = {
  visible: boolean;
  onClose: () => void;
  onComplete: () => void;
};

export default function StartHereOnboardingModal({ visible, onClose, onComplete }: Props) {
  const { user } = useAppStore();
  const [step, setStep] = useState(0);
  const [goals, setGoals] = useState<string[]>([]);
  const [persona, setPersona] = useState<string | null>(null);

  const skipGoals = (user?.healthGoals?.length ?? 0) > 0 || !!user?.onboardingComplete;
  const stepCount = skipGoals ? 3 : 4;
  const lastStep = stepCount - 1;

  useEffect(() => {
    if (!visible) {
      setStep(0);
      setPersona(null);
      return;
    }
    if (user?.healthGoals?.length) {
      setGoals(user.healthGoals);
    }
    if (user?.uid) {
      onboardingStorage.getUserPersona(user.uid).then((saved) => {
        if (saved) setPersona(saved);
      });
    }
  }, [visible, user?.uid, user?.healthGoals]);

  const toggleGoal = (id: string) => {
    setGoals((prev) => prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]);
  };

  const canNext = useMemo(() => {
    if (step === 0) return true;
    if (skipGoals) {
      if (step === 1) return !!persona;
      return true;
    }
    if (step === 1) return goals.length > 0;
    if (step === 2) return !!persona;
    return true;
  }, [step, skipGoals, goals.length, persona]);

  const complete = async () => {
    if (user) {
      if (!skipGoals && goals.length > 0) {
        await onboardingStorage.setUserGoals(user.uid, goals);
      }
      if (persona) await onboardingStorage.setUserPersona(user.uid, persona);
      await onboardingStorage.markStartHereComplete(user.uid);
    }
    onComplete();
    onClose();
    setStep(0);
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <LinearGradient colors={['#F8FAFF', '#FFFFFF']} style={styles.safe}>
        <View style={styles.toolbar}>
          <TouchableOpacity onPress={complete}>
            <Text style={styles.skip}>Skip</Text>
          </TouchableOpacity>
          <View style={styles.progressRow}>
            {Array.from({ length: stepCount }, (_, i) => (
              <View key={i} style={[styles.progressSeg, i <= step && styles.progressActive]} />
            ))}
          </View>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          {step === 0 && (
            <>
              <Ionicons name="sparkles" size={48} color={Colors.primary} style={styles.heroIcon} />
              <Text style={styles.title}>{skipGoals ? 'Refine your plan' : 'Start Here'}</Text>
              <Text style={styles.sub}>
                {skipGoals
                  ? 'You already set your goals during onboarding. Pick a persona so we can tailor tips and content.'
                  : 'We\'ll tailor content to your goals and lifestyle in a few quick steps.'}
              </Text>
              {(skipGoals
                ? ['Choose a persona that fits you', 'Get personalised home recommendations']
                : ['Set your wellness goals', 'Choose a persona that fits you', 'See your personalised path']
              ).map((b) => (
                <View key={b} style={styles.bulletRow}>
                  <Ionicons name="checkmark-circle" size={18} color={Colors.primary} />
                  <Text style={styles.bullet}>{b}</Text>
                </View>
              ))}
            </>
          )}

          {!skipGoals && step === 1 && (
            <>
              <Text style={styles.title}>What are your main wellness goals?</Text>
              <Text style={styles.sub}>Select all that apply</Text>
              <View style={styles.grid}>
                {LEGACY_GOALS.map((g) => {
                  const selected = goals.includes(g.id);
                  return (
                    <TouchableOpacity
                      key={g.id}
                      style={[styles.goalCard, selected && { borderColor: g.color, backgroundColor: g.color + '12' }]}
                      onPress={() => toggleGoal(g.id)}
                    >
                      <IconBadge name={g.icon} color={g.color} size="md" />
                      <Text style={styles.goalLabel}>{g.label}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </>
          )}

          {((skipGoals && step === 1) || (!skipGoals && step === 2)) && (
            <>
              <Text style={styles.title}>Which describes you best?</Text>
              <Text style={styles.sub}>Pick one</Text>
              {PERSONAS.map((p) => (
                <TouchableOpacity
                  key={p.id}
                  style={[styles.personaCard, persona === p.id && styles.personaSelected]}
                  onPress={() => setPersona(p.id)}
                >
                  <IconBadge name={p.icon} color={Colors.primary} size="md" />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.personaLabel}>{p.label}</Text>
                    <Text style={styles.personaDesc}>{p.desc}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </>
          )}

          {step === lastStep && (
            <>
              <Text style={styles.title}>You&apos;re all set</Text>
              <Text style={styles.sub}>
                {skipGoals
                  ? 'Your dashboard and daily plan are already personalised from onboarding. Explore Home or open Fitness Hub anytime.'
                  : 'Recommended modules are on your Results screen and in Fitness Hub.'}
              </Text>
              <AppCard style={styles.doneCard}>
                <IconBadge name="home-outline" color={Colors.primary} size="md" />
                <View style={{ flex: 1 }}>
                  <Text style={styles.doneTitle}>Explore your dashboard</Text>
                  <Text style={styles.doneSub}>Check in daily, follow your plan, and track progress.</Text>
                </View>
              </AppCard>
            </>
          )}
        </ScrollView>

        <View style={styles.footer}>
          {step > 0 && (
            <TouchableOpacity onPress={() => setStep((s) => s - 1)} style={styles.backBtn}>
              <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>
          )}
          <BrandButton
            label={step === lastStep ? 'Get Started' : 'Next'}
            onPress={() => {
              if (step === lastStep) complete();
              else if (canNext) setStep((s) => s + 1);
            }}
            disabled={!canNext}
            style={{ flex: 1 }}
          />
        </View>
      </LinearGradient>
    </Modal>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.sm,
  },
  skip: { color: Colors.primary, fontWeight: '600', fontSize: Typography.size.sm },
  progressRow: { flexDirection: 'row', gap: 4, flex: 1, justifyContent: 'center', paddingHorizontal: Spacing.md },
  progressSeg: { flex: 1, height: 4, borderRadius: 2, backgroundColor: Colors.borderLight },
  progressActive: { backgroundColor: Colors.primary },
  content: { padding: Spacing.base, paddingBottom: Spacing['3xl'] },
  heroIcon: { alignSelf: 'center', marginBottom: Spacing.md },
  title: { fontSize: Typography.size.xl, fontWeight: '800', color: Colors.text, marginBottom: Spacing.sm },
  sub: { fontSize: Typography.size.sm, color: Colors.textSecondary, lineHeight: 22, marginBottom: Spacing.lg },
  bulletRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginBottom: Spacing.sm },
  bullet: { fontSize: Typography.size.base, color: Colors.text },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  goalCard: {
    width: '47%',
    padding: Spacing.md,
    borderRadius: Radius.lg,
    borderWidth: 2,
    borderColor: Colors.borderLight,
    alignItems: 'center',
    gap: Spacing.xs,
  },
  goalLabel: { fontSize: Typography.size.sm, fontWeight: '600', color: Colors.text, textAlign: 'center' },
  personaCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.base,
    borderRadius: Radius.lg,
    backgroundColor: Colors.surface,
    marginBottom: Spacing.sm,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  personaSelected: { borderColor: Colors.primary, backgroundColor: Colors.primaryLight },
  personaLabel: { fontSize: Typography.size.base, fontWeight: '600', color: Colors.text },
  personaDesc: { fontSize: Typography.size.xs, color: Colors.textSecondary },
  doneCard: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  doneTitle: { fontSize: Typography.size.sm, fontWeight: '600', color: Colors.text },
  doneSub: { fontSize: Typography.size.xs, color: Colors.textSecondary },
  footer: {
    flexDirection: 'row',
    gap: Spacing.md,
    padding: Spacing.base,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.borderLight,
  },
  backBtn: { justifyContent: 'center', paddingHorizontal: Spacing.sm },
  backText: { color: Colors.primary, fontWeight: '600' },
});
