import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import { AppTextField, BrandButton, BackButton } from '../../components/ui';
import AppScreen from '../../components/common/AppScreen';
import { useAppStore } from '../../store';
import { pendingOnboardingStorage } from '../../services/pendingOnboardingStorage';
import { onboardingStorage } from '../../services/onboardingStorage';
import { userService } from '../../services/firebase';
import { goBackOrTo, goToAssessmentPath, refreshPreAuthRouteFromPending } from '../../services/onboardingNavigation';
import { Screen } from '../../navigation/screenNames';
import {
  DOB_PLACEHOLDER,
  maskDateOfBirthInput,
  parseDateOfBirth,
  toDateOfBirthInputValue,
  toStoredDateOfBirth,
} from '../../utils/dateOfBirth';

export default function OnboardingBaselineScreen() {
  const navigation = useNavigation<any>();
  const { user, setUser, hasSeenIntro } = useAppStore();
  const [dob, setDob] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    pendingOnboardingStorage.get().then((pending) => {
      if (pending.dateOfBirth) setDob(toDateOfBirthInputValue(pending.dateOfBirth));
      if (pending.heightCm) setHeight(String(pending.heightCm));
      if (pending.weightKg) setWeight(String(pending.weightKg));
    });
    if (user?.dateOfBirth) setDob(toDateOfBirthInputValue(user.dateOfBirth));
    if (user?.heightCm) setHeight(String(user.heightCm));
    if (user?.weightKg) setWeight(String(user.weightKg));
  }, [user?.dateOfBirth, user?.heightCm, user?.weightKg]);

  const persist = async (skipped: boolean): Promise<boolean> => {
    const parsedDob = !skipped && dob.trim() ? parseDateOfBirth(dob) : null;
    if (!skipped && dob.trim() && !parsedDob) {
      Alert.alert('Check date of birth', `Please use ${DOB_PLACEHOLDER}.`);
      return false;
    }
    const patch = {
      baselineStepComplete: true,
      dateOfBirth: skipped || !parsedDob ? null : toStoredDateOfBirth(parsedDob),
      heightCm: skipped || !height.trim() ? null : Number(height),
      weightKg: skipped || !weight.trim() ? null : Number(weight),
    };
    if (user) {
      const profilePatch = {
        dateOfBirth: patch.dateOfBirth ?? undefined,
        heightCm: patch.heightCm ?? undefined,
        weightKg: patch.weightKg ?? undefined,
      };
      await userService.updateProfile(user.uid, profilePatch);
      await onboardingStorage.setBaselineMetrics(user.uid, profilePatch);
      setUser({ ...user, ...profilePatch });
    } else {
      await pendingOnboardingStorage.save(patch);
    }
    await refreshPreAuthRouteFromPending(hasSeenIntro);
    goToAssessmentPath(navigation);
    return true;
  };

  const handleContinue = async () => {
    if (saving) return;
    setSaving(true);
    try {
      await persist(false);
    } finally {
      setSaving(false);
    }
  };

  const handleSkip = async () => {
    if (saving) return;
    setSaving(true);
    try {
      await persist(true);
    } finally {
      setSaving(false);
    }
  };

  return (
    <AppScreen style={styles.safe}>
      <View style={styles.topBar}>
        <BackButton onPress={() => goBackOrTo(navigation, Screen.onboardingHabits)} />
      </View>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={['#8C59BF', '#5B2D8E']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.hero}
        >
          <View style={styles.heroIcon}>
            <Ionicons name="body-outline" size={28} color={Colors.white} />
          </View>
          <Text style={styles.heroEyebrow}>About you</Text>
          <Text style={styles.title}>Optional baseline</Text>
          <Text style={styles.subtitle}>
            Height and weight power BMI and health calculators. Skip anytime — edit later in Profile.
          </Text>
        </LinearGradient>
        <AppTextField
          label="Date of birth"
          placeholder={DOB_PLACEHOLDER}
          value={dob}
          onChangeText={(v) => setDob(maskDateOfBirthInput(v))}
          autoCapitalize="none"
          keyboardType="number-pad"
        />
        <AppTextField label="Height (cm)" placeholder="e.g. 170" value={height} onChangeText={setHeight} keyboardType="numeric" />
        <AppTextField label="Weight (kg)" placeholder="e.g. 70" value={weight} onChangeText={setWeight} keyboardType="numeric" />
      </ScrollView>
      <View style={styles.footer}>
        <BrandButton label="Continue" onPress={handleContinue} loading={saving} disabled={saving} />
        <BrandButton label="Skip for now" variant="outline" onPress={handleSkip} disabled={saving} />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  topBar: { paddingHorizontal: Spacing.sm, paddingTop: Spacing.xs },
  content: { padding: Spacing.base, paddingTop: Spacing.md, gap: Spacing.md },
  hero: {
    borderRadius: Radius.xl,
    padding: Spacing.xl,
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
    overflow: 'hidden',
  },
  heroIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xs,
  },
  heroEyebrow: {
    fontSize: Typography.size.xs,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.85)',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  title: { fontSize: Typography.size['2xl'], fontWeight: '800', color: Colors.white, letterSpacing: -0.4 },
  subtitle: { fontSize: Typography.size.sm, color: 'rgba(255,255,255,0.9)', lineHeight: 22 },
  footer: { padding: Spacing.base, paddingBottom: Spacing.xl, gap: Spacing.sm, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: Colors.borderLight },
});
