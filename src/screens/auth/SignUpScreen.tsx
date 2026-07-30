// src/screens/auth/SignUpScreen.tsx
import React, { useEffect, useRef, useState } from 'react';
import { Screen } from '../../navigation/screenNames';
import {
  View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, ScrollView,
  Platform, Alert, Modal, ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../theme';
import { AppTextField } from '../../components/ui';
import AuthLandingScreen from '../../components/auth/AuthLandingScreen';
import { firebaseAuth, userService } from '../../services/firebase';
import { ensurePendingOnboardingApplied } from '../../services/applyPendingOnboarding';
import { signInWithApple, signInWithGoogle, resolveCurrentUserProfile } from '../../services/socialAuth';
import { contentsquareService } from '../../services/contentsquareService';
import { useAppStore } from '../../store';
import type { UserRole } from '../../types';
import { SensitiveCSQMask } from '../../components/common/SensitiveCSQMask';
import { AppConsentModal, MedicalDisclaimerModal, LegalCheckboxRow } from '../../components/legal';
import { enterDemoSession, enterDemoQuestionnaireSession, enterDemoClinicianSession, canSkipToApp } from '../../services/demoSession';
import { authErrorMessage } from '../../utils/authErrorMessage';
import { appConfig, isGoogleSignInConfigured } from '../../config/appConfig';
import { logger } from '../../utils/logger';
import { pendingOnboardingStorage } from '../../services/pendingOnboardingStorage';
import {
  ageFromDateOfBirth,
  DOB_PLACEHOLDER,
  maskDateOfBirthInput,
  parseDateOfBirth,
  toDateOfBirthInputValue,
  toStoredDateOfBirth,
} from '../../utils/dateOfBirth';

export default function SignUpScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const savePlan = route.params?.savePlan === true;
  const { setUser, setWellnessScore, setAuthLoading, setSubscriptionTier, setHasSeenIntro, setClinicianProfileReady } = useAppStore();

  const [mode, setMode] = useState<'landing' | 'form'>(savePlan ? 'form' : 'landing');
  const [showRolePicker, setShowRolePicker] = useState(false);
  const [role, setRole] = useState<UserRole>('patient');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [heightCm, setHeightCm] = useState('');
  const [weightKg, setWeightKg] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [medicalAcknowledged, setMedicalAcknowledged] = useState(false);
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [showMedicalModal, setShowMedicalModal] = useState(false);
  const pendingAfterLegalRef = useRef<(() => void) | null>(null);
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<'apple' | 'google' | null>(null);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  useEffect(() => {
    pendingOnboardingStorage.get().then((pending) => {
      if (pending.dateOfBirth) setDateOfBirth(toDateOfBirthInputValue(pending.dateOfBirth));
      if (pending.heightCm) setHeightCm(String(pending.heightCm));
      if (pending.weightKg) setWeightKg(String(pending.weightKg));
    });
  }, []);

  const legalComplete = agreedToTerms && ageConfirmed && medicalAcknowledged;

  const runAfterLegalChecks = (action: () => void) => {
    if (legalComplete) {
      action();
      return;
    }
    pendingAfterLegalRef.current = action;
    if (!agreedToTerms) {
      setShowConsentModal(true);
      return;
    }
    if (!medicalAcknowledged) {
      setShowMedicalModal(true);
    }
  };

  const onConsentAccepted = () => {
    setAgreedToTerms(true);
    setShowConsentModal(false);
    setErrors((e) => ({ ...e, terms: undefined }));
    setShowMedicalModal(true);
  };

  const onMedicalAcknowledged = () => {
    setMedicalAcknowledged(true);
    setShowMedicalModal(false);
    const next = pendingAfterLegalRef.current;
    pendingAfterLegalRef.current = null;
    if (!next) return;
    if (!ageConfirmed) {
      Alert.alert(
        'Age confirmation',
        'You must be at least 16 years old to use Wellness Shift.',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'I confirm I am 16+',
            onPress: () => {
              setAgeConfirmed(true);
              next();
            },
          },
        ],
      );
      return;
    }
    next();
  };

  const validateForm = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = 'Name is required';
    if (!email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Enter a valid email';
    if (!password) e.password = 'Password is required';
    else if (password.length < 8) e.password = 'Password must be at least 8 characters';
    if (password !== confirmPassword) e.confirmPassword = 'Passwords do not match';

    if (role === 'patient') {
      const dob = parseDateOfBirth(dateOfBirth);
      if (!dateOfBirth.trim()) e.dateOfBirth = 'Date of birth is required';
      else if (!dob) e.dateOfBirth = `Use ${DOB_PLACEHOLDER}`;
      else if (ageFromDateOfBirth(dob) < 16) e.dateOfBirth = 'You must be at least 16 years old';

      const height = Number(heightCm);
      if (!heightCm.trim()) e.heightCm = 'Height is required';
      else if (!Number.isFinite(height) || height <= 0 || height > 300) {
        e.heightCm = 'Enter height in centimetres (e.g. 170)';
      }

      const weight = Number(weightKg);
      if (!weightKg.trim()) e.weightKg = 'Weight is required';
      else if (!Number.isFinite(weight) || weight <= 0 || weight > 500) {
        e.weightKg = 'Enter weight in kilograms (e.g. 70)';
      }
    }

    if (!agreedToTerms) e.terms = 'Please accept the Terms of Service and Privacy Policy';
    if (!ageConfirmed) e.age = 'You must confirm you are at least 16 years old';
    if (!medicalAcknowledged) e.medical = 'Please acknowledge the medical disclaimer';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleCreateAccount = async () => {
    if (!validateForm()) {
      if (!agreedToTerms) setShowConsentModal(true);
      else if (!medicalAcknowledged) setShowMedicalModal(true);
      return;
    }
    setLoading(true);
    try {
      const cred = await firebaseAuth.signUpWithEmail(email.trim(), password);
      await cred.user.getIdToken();
      const height = Number(heightCm);
      const weight = Number(weightKg);
      await userService.createProfile(cred.user.uid, {
        displayName: name.trim(),
        email: email.trim(),
        role,
        consentAccepted: true,
        medicalDisclaimerAcknowledged: true,
        ageConfirmed: true,
        ...(role === 'patient'
          ? {
              dateOfBirth: toStoredDateOfBirth(parseDateOfBirth(dateOfBirth)!),
              heightCm: height,
              weightKg: weight,
            }
          : {}),
      });
      try {
        await firebaseAuth.sendEmailVerification();
        logger.log('Email verification sent after sign-up');
      } catch (verifyErr) {
        console.warn('Email verification send failed:', verifyErr);
        Alert.alert(
          'Verification email not sent',
          'Your account was created, but we could not send the confirmation email. On the next screen tap “Resend verification email”, and check Spam / Junk.',
        );
      }
      const profile = await ensurePendingOnboardingApplied(cred.user.uid);
      if (profile) {
        setUser(profile);
        await contentsquareService.onAuthSuccess(profile);
      }
    } catch (err: unknown) {
      console.warn('Sign up failed:', err);
      Alert.alert('Error', authErrorMessage(err, 'Account creation failed. Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  const handleAppleSignUp = () => {
    runAfterLegalChecks(async () => {
      setSocialLoading('apple');
      try {
        await signInWithApple();
        const profile = await resolveCurrentUserProfile({
          consentAccepted: true,
          medicalDisclaimerAcknowledged: true,
          ageConfirmed: true,
        });
        if (profile) await contentsquareService.onAuthSuccess(profile);
      } catch (err: any) {
        if (err.code !== '1001') Alert.alert('Apple Sign Up Failed', 'Please try again.');
      } finally {
        setSocialLoading(null);
      }
    });
  };

  const handleGoogleSignUp = () => {
    runAfterLegalChecks(async () => {
      setSocialLoading('google');
      try {
        await signInWithGoogle();
        const profile = await resolveCurrentUserProfile({
          consentAccepted: true,
          medicalDisclaimerAcknowledged: true,
          ageConfirmed: true,
        });
        if (profile) await contentsquareService.onAuthSuccess(profile);
      } catch (err: any) {
        if (err.code !== 'SIGN_IN_CANCELLED') Alert.alert('Google Sign Up Failed', 'Please try again.');
      } finally {
        setSocialLoading(null);
      }
    });
  };

  const startEmailSignUp = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setShowRolePicker(false);
    setMode('form');
  };

  const demoSetters = {
    setUser,
    setWellnessScore,
    setAuthLoading,
    setSubscriptionTier,
    setHasSeenIntro,
    setClinicianProfileReady,
  };

  const skipToApp = () => enterDemoSession(demoSetters);

  const devSkipActions = canSkipToApp()
    ? [
        { label: 'Skip to Questionnaire', onPress: () => enterDemoQuestionnaireSession(demoSetters) },
        { label: 'Skip to Patient App', onPress: () => enterDemoSession(demoSetters) },
        { label: 'Skip to Clinician Portal', onPress: () => enterDemoClinicianSession(demoSetters) },
      ]
    : undefined;

  const signUpHeroSlides = [
    { icon: 'body' as const, title: 'Wellness', subtitle: 'Track your mental and physical health journey' },
    { icon: 'heart' as const, title: 'Health', subtitle: 'Monitor your vitals and stay on top of your wellbeing' },
    { icon: 'brain' as const, title: 'Mindfulness', subtitle: 'Discover peace through guided meditation' },
    { icon: 'fitness' as const, title: 'Fitness', subtitle: 'Achieve your fitness goals with personalised plans' },
  ];

  if (mode === 'landing') {
    const googleConfigured =
      isGoogleSignInConfigured();
    return (
      <>
        <AuthLandingScreen
          primaryLabel="Sign Up with Email"
          onPrimary={() => setShowRolePicker(true)}
          onGoogle={googleConfigured ? handleGoogleSignUp : undefined}
          onApple={handleAppleSignUp}
          onBack={() => navigation.goBack()}
          onSkip={canSkipToApp() ? skipToApp : undefined}
          devSkipActions={devSkipActions}
          switchPrompt="Already have an account?"
          switchAction="Log In"
          onSwitch={() => navigation.navigate(Screen.signIn)}
          googleLabel={googleConfigured ? 'Sign Up with Google' : undefined}
          appleLabel="Sign Up with Apple"
          socialLoading={socialLoading}
          heroSlides={signUpHeroSlides}
        />
        <RolePickerModal
          visible={showRolePicker}
          onClose={() => setShowRolePicker(false)}
          onSelect={startEmailSignUp}
        />
        <AppConsentModal
          visible={showConsentModal}
          onClose={() => setShowConsentModal(false)}
          onAccept={onConsentAccepted}
        />
        <MedicalDisclaimerModal
          visible={showMedicalModal}
          onAcknowledge={onMedicalAcknowledged}
        />
      </>
    );
  }

  return (
    <View style={styles.root}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={styles.formScroll}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
          automaticallyAdjustKeyboardInsets
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity
            onPress={() => setMode('landing')}
            style={styles.closeBtn}
            accessibilityRole="button"
            accessibilityLabel="Close"
          >
            <Ionicons name="close" size={20} color={Colors.text} />
          </TouchableOpacity>

          <View style={styles.header}>
            <View style={styles.headerIconCircle}>
              <Ionicons name="person-add" size={28} color={Colors.white} />
            </View>
            <Text style={styles.headerTitle}>{savePlan ? 'Save your plan' : 'Create Account'}</Text>
            <Text style={styles.headerSubtitle}>
              {savePlan
                ? 'Create a free account to keep your personalised wellness results and recommendations.'
                : role === 'patient'
                  ? 'Patient account'
                  : 'Clinician account'}
            </Text>
          </View>

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="document-text" size={18} color={Colors.primary} />
              <Text style={styles.cardHeaderText}>Personal Information</Text>
            </View>
            <View style={styles.fieldGap}>
              <AppTextField
                label="Full name"
                leftIcon="person-outline"
                placeholder="Jane Smith"
                autoCapitalize="words"
                value={name}
                onChangeText={(v) => { setName(v); setErrors((e) => ({ ...e, name: undefined })); }}
                error={errors.name}
              />

              <SensitiveCSQMask>
                <AppTextField
                  label="Email address"
                  leftIcon="mail-outline"
                  placeholder="your@email.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={email}
                  onChangeText={(v) => { setEmail(v); setErrors((e) => ({ ...e, email: undefined })); }}
                  error={errors.email}
                />
              </SensitiveCSQMask>

              {role === 'patient' ? (
                <>
                  <AppTextField
                    label="Date of birth"
                    leftIcon="calendar-outline"
                    placeholder={DOB_PLACEHOLDER}
                    autoCapitalize="none"
                    keyboardType="number-pad"
                    value={dateOfBirth}
                    onChangeText={(v) => {
                      setDateOfBirth(maskDateOfBirthInput(v));
                      setErrors((e) => ({ ...e, dateOfBirth: undefined }));
                    }}
                    error={errors.dateOfBirth}
                  />
                  <View style={styles.metricsRow}>
                    <View style={styles.metricField}>
                      <AppTextField
                        label="Height (cm)"
                        leftIcon="resize-outline"
                        placeholder="e.g. 170"
                        keyboardType="decimal-pad"
                        value={heightCm}
                        onChangeText={(v) => {
                          setHeightCm(v);
                          setErrors((e) => ({ ...e, heightCm: undefined }));
                        }}
                        error={errors.heightCm}
                      />
                    </View>
                    <View style={styles.metricField}>
                      <AppTextField
                        label="Weight (kg)"
                        leftIcon="scale-outline"
                        placeholder="e.g. 70"
                        keyboardType="decimal-pad"
                        value={weightKg}
                        onChangeText={(v) => {
                          setWeightKg(v);
                          setErrors((e) => ({ ...e, weightKg: undefined }));
                        }}
                        error={errors.weightKg}
                      />
                    </View>
                  </View>
                </>
              ) : null}

              <SensitiveCSQMask>
                <AppTextField
                  label="Password"
                  leftIcon="lock-closed-outline"
                  placeholder="8+ characters"
                  secureToggle
                  value={password}
                  onChangeText={(v) => { setPassword(v); setErrors((e) => ({ ...e, password: undefined })); }}
                  error={errors.password}
                />
                <AppTextField
                  label="Confirm password"
                  leftIcon="lock-closed-outline"
                  placeholder="Repeat your password"
                  secureToggle
                  value={confirmPassword}
                  onChangeText={(v) => { setConfirmPassword(v); setErrors((e) => ({ ...e, confirmPassword: undefined })); }}
                  error={errors.confirmPassword}
                />
              </SensitiveCSQMask>
            </View>
          </View>

          <LegalCheckboxRow
            checked={agreedToTerms}
            onToggle={() => {
              if (agreedToTerms) setAgreedToTerms(false);
              else setShowConsentModal(true);
            }}
            title="I accept the Terms of Service and Privacy Policy"
            description="Tap to read the full Terms & Conditions and Privacy Policy."
            style={{ marginTop: Spacing.sm }}
          />
          {errors.terms ? <Text style={styles.errorText}>{errors.terms}</Text> : null}

          <LegalCheckboxRow
            checked={ageConfirmed}
            onToggle={() => {
              setAgeConfirmed((v) => !v);
              setErrors((e) => ({ ...e, age: undefined }));
            }}
            title="I confirm I am at least 16 years old"
          />
          {errors.age ? <Text style={styles.errorText}>{errors.age}</Text> : null}

          {medicalAcknowledged ? (
            <View style={styles.disclaimer}>
              <Ionicons name="checkmark-circle" size={18} color={Colors.success} />
              <Text style={styles.disclaimerText}>Medical disclaimer acknowledged</Text>
            </View>
          ) : (
            <TouchableOpacity style={styles.disclaimer} onPress={() => setShowMedicalModal(true)}>
              <Ionicons name="medical-outline" size={16} color={Colors.warning} />
              <Text style={styles.disclaimerText}>
                Read and acknowledge the medical disclaimer before creating your account.
              </Text>
            </TouchableOpacity>
          )}
          {errors.medical ? <Text style={styles.errorText}>{errors.medical}</Text> : null}

          <TouchableOpacity onPress={handleCreateAccount} disabled={loading} activeOpacity={0.9}>
            <LinearGradient
              colors={[Colors.purple, Colors.purpleLight]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={[styles.submitBtn, loading && styles.submitBtnDisabled]}
            >
              {loading ? (
                <ActivityIndicator color={Colors.white} size="small" />
              ) : (
                <Text style={styles.submitText}>Create Account</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate(Screen.signIn)} style={styles.switchRow}>
            <Text style={styles.switchPrompt}>Already have an account? </Text>
            <Text style={styles.switchLink}>Sign In</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      <AppConsentModal
        visible={showConsentModal}
        onClose={() => setShowConsentModal(false)}
        onAccept={onConsentAccepted}
      />
      <MedicalDisclaimerModal
        visible={showMedicalModal}
        onAcknowledge={onMedicalAcknowledged}
      />
    </View>
  );
}

function RolePickerModal({
  visible,
  onClose,
  onSelect,
}: {
  visible: boolean;
  onClose: () => void;
  onSelect: (role: UserRole) => void;
}) {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={modalStyles.overlay}>
        <TouchableOpacity style={modalStyles.backdrop} activeOpacity={1} onPress={onClose} />
        <View style={modalStyles.sheet}>
          <View style={modalStyles.handle} />
          <Text style={modalStyles.title}>Choose account type</Text>
          <Text style={modalStyles.subtitle}>We'll personalise your experience</Text>

          <TouchableOpacity style={modalStyles.roleCard} onPress={() => onSelect('patient')}>
            <View style={[modalStyles.roleIcon, { backgroundColor: Colors.primaryBg }]}>
              <Ionicons name="person-outline" size={24} color={Colors.purple} />
            </View>
            <View style={modalStyles.roleInfo}>
              <Text style={modalStyles.roleTitle}>Patient</Text>
              <Text style={modalStyles.roleDesc}>Track wellness and follow daily plans</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.textTertiary} />
          </TouchableOpacity>

          <TouchableOpacity style={modalStyles.roleCard} onPress={() => onSelect('clinician')}>
            <View style={[modalStyles.roleIcon, { backgroundColor: '#FFF0F3' }]}>
              <Ionicons name="medkit-outline" size={24} color={Colors.brand} />
            </View>
            <View style={modalStyles.roleInfo}>
              <Text style={modalStyles.roleTitle}>Clinician / Doctor</Text>
              <Text style={modalStyles.roleDesc}>Manage patients and care plans</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.textTertiary} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  formScroll: { flexGrow: 1, padding: Spacing.xl, paddingBottom: Spacing['2xl'] },
  closeBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: Colors.surface,
    alignItems: 'center', justifyContent: 'center',
    alignSelf: 'flex-start',
    marginBottom: Spacing.md,
  },
  header: { alignItems: 'center', marginBottom: Spacing.xl },
  headerIconCircle: {
    width: 70, height: 70, borderRadius: 35,
    backgroundColor: Colors.purple,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  headerTitle: { fontSize: Typography.size.xl, fontWeight: '800', color: Colors.text },
  headerSubtitle: { fontSize: Typography.size.sm, color: Colors.textSecondary, marginTop: Spacing.xs },
  card: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.base,
    marginBottom: Spacing.md,
    ...Shadow.sm,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: Spacing.xs, marginBottom: Spacing.md },
  cardHeaderText: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  fieldGap: { gap: Spacing.md },
  metricsRow: { flexDirection: 'row', gap: Spacing.md },
  metricField: { flex: 1 },
  termsRow: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.sm, marginTop: Spacing.sm },
  checkbox: {
    width: 22, height: 22, borderRadius: 6,
    borderWidth: 2, borderColor: Colors.border,
    alignItems: 'center', justifyContent: 'center', marginTop: 1,
  },
  checkboxChecked: { backgroundColor: Colors.brand, borderColor: Colors.brand },
  termsText: { flex: 1, fontSize: Typography.size.sm, color: Colors.textSecondary, lineHeight: 20 },
  termsLink: { color: Colors.brand, fontWeight: '600' },
  errorText: { fontSize: Typography.size.xs, color: Colors.error, marginTop: Spacing.xs },
  disclaimer: {
    flexDirection: 'row', gap: Spacing.sm, alignItems: 'flex-start',
    backgroundColor: 'rgba(242, 77, 128, 0.08)', borderRadius: Radius.md, padding: Spacing.md,
    marginTop: Spacing.md,
  },
  disclaimerText: { flex: 1, fontSize: Typography.size.xs, color: Colors.textSecondary, lineHeight: 18 },
  submitBtn: {
    height: 56,
    borderRadius: Radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.md,
    ...Shadow.md,
  },
  submitBtnDisabled: { opacity: 0.55 },
  submitText: { color: Colors.white, fontSize: Typography.size.md, fontWeight: '700' },
  switchRow: { flexDirection: 'row', justifyContent: 'center', marginTop: Spacing.xl },
  switchPrompt: { fontSize: Typography.size.sm, color: Colors.textSecondary },
  switchLink: { fontSize: Typography.size.sm, color: Colors.primary, fontWeight: '700' },
});

const modalStyles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'flex-end' },
  backdrop: { ...StyleSheet.absoluteFill, backgroundColor: 'rgba(0,0,0,0.45)' },
  sheet: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: Spacing.xl,
    paddingBottom: Spacing['2xl'],
    gap: Spacing.md,
    ...Shadow.lg,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.border,
    alignSelf: 'center',
    marginBottom: Spacing.sm,
  },
  title: { fontSize: Typography.size.xl, fontWeight: '800', color: Colors.text, textAlign: 'center' },
  subtitle: { fontSize: Typography.size.sm, color: Colors.textSecondary, textAlign: 'center', marginBottom: Spacing.sm },
  roleCard: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.md,
    borderWidth: 1.5, borderColor: Colors.border, borderRadius: Radius.lg,
    padding: Spacing.base, backgroundColor: Colors.surface,
  },
  roleIcon: { width: 48, height: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  roleInfo: { flex: 1 },
  roleTitle: { fontSize: Typography.size.base, fontWeight: '700', color: Colors.text },
  roleDesc: { fontSize: Typography.size.xs, color: Colors.textSecondary, marginTop: 2 },
});
