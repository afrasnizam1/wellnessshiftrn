import type { UserProfile, WellnessScore } from '../types';

export const DEMO_PATIENT: UserProfile = {
  uid: 'demo_patient_001',
  email: 'demo@wellnessshift.app',
  displayName: 'Demo Patient',
  role: 'patient',
  createdAt: new Date().toISOString(),
  subscriptionTier: 'free',
  quizComplete: true,
  onboardingComplete: true,
  csq: { identity: 'demo_patient_001' },
};

/** Patient at wellness questionnaire — onboarding not finished */
export const DEMO_PATIENT_QUESTIONNAIRE: UserProfile = {
  ...DEMO_PATIENT,
  uid: 'demo_patient_quiz',
  displayName: 'Quiz Demo Patient',
  quizComplete: false,
  onboardingComplete: false,
};

export const DEMO_CLINICIAN: UserProfile = {
  uid: 'demo_clinician_001',
  email: 'dr.demo@wellnessshift.app',
  displayName: 'Dr Demo',
  role: 'clinician',
  createdAt: new Date().toISOString(),
  subscriptionTier: 'free',
  quizComplete: true,
  onboardingComplete: true,
  csq: { identity: 'demo_clinician_001' },
};

export const DEMO_WELLNESS_SCORE: WellnessScore = {
  date: new Date().toISOString(),
  overall: 6.2,
  categories: {
    physical: 6.5,
    nutrition: 6.8,
    mental: 5.8,
    social: 6.0,
    environment: 5.5,
    fitness: 7.1,
    sleep: 5.2,
    mindfulness: 5.9,
    stress: 5.5,
    workLife: 6.1,
  },
};
