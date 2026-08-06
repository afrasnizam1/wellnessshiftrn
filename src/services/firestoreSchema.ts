/**
 * Native iOS Firestore schema — collection paths and document builders.
 * Matches Wellness Shift V2 (patients/clinicians/userProfiles/fcmTokens/…).
 */
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { Platform } from 'react-native';
import { ensureAuthReadyForUid } from './firebaseReady';
import type { ClinicianProfileDoc, UserProfile, UserRole } from '../types';

export const FS = {
  patients: 'patients',
  clinicians: 'clinicians',
  userProfiles: 'userProfiles',
  users: 'users',
  userTrials: 'userTrials',
  fcmTokens: 'fcmTokens',
  customCarePlans: 'customCarePlans',
  notifications: 'notifications',
  notificationQueue: 'notificationQueue',
} as const;

export function fsNow(): FirebaseFirestoreTypes.Timestamp {
  return firestore.Timestamp.now();
}

export function fsTimestampFromIso(iso?: string): FirebaseFirestoreTypes.Timestamp {
  if (!iso) return fsNow();
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? fsNow() : firestore.Timestamp.fromDate(d);
}

export function splitDisplayName(displayName: string): { firstName: string; lastName: string } {
  const parts = displayName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { firstName: 'User', lastName: '' };
  if (parts.length === 1) return { firstName: parts[0], lastName: '' };
  return { firstName: parts[0], lastName: parts.slice(1).join(' ') };
}

/** Core patient document — `patients/{uid}` */
export function buildPatientDoc(
  profile: UserProfile,
  extra?: Record<string, unknown>
): Record<string, unknown> {
  const now = fsNow();
  return {
    id: profile.uid,
    email: profile.email,
    name: profile.displayName,
    role: 'patient',
    joinDate: fsTimestampFromIso(profile.createdAt),
    lastUpdated: now,
    consentAccepted: profile.consentAccepted ?? false,
    medicalDisclaimerAcknowledged: profile.medicalDisclaimerAcknowledged ?? false,
    fitnessGoals: [],
    hasCompletedAssessment: profile.quizComplete ?? false,
    onboardingComplete: profile.onboardingComplete ?? false,
    isAnonymous: false,
    requiresEmailVerification: false,
    ...extra,
  };
}

/** Core clinician document — `clinicians/{uid}` (native iOS parity) */
export function buildClinicianDoc(
  profile: UserProfile,
  extra?: Record<string, unknown>
): Record<string, unknown> {
  const now = fsNow();
  const { firstName, lastName } = splitDisplayName(profile.displayName);
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone ?? 'Europe/London';
  const nested = buildNativeClinicianProfile({
    firstName,
    lastName,
    workEmail: profile.email,
    role: 'Physician',
    specialty: 'General Practice',
    scopeOfPractice: 'Selective',
    statesOfPractice: ['England'],
    timeZone,
    clinicName: '',
    onboardingCompleted: profile.onboardingComplete ?? false,
    languagesSpoken: ['English'],
    communicationPreferences: [],
  });

  return {
    id: profile.uid,
    email: profile.email,
    name: profile.displayName,
    role: 'clinician',
    joinDate: fsTimestampFromIso(profile.createdAt),
    lastUpdated: now,
    workEmail: profile.email,
    specialty: nested.specialty,
    statesOfPractice: nested.statesOfPractice,
    timeZone: nested.timeZone,
    verificationStatus: nested.verificationStatus,
    clinicianProfile: nested,
    ...extra,
  };
}

/** Nested `clinicianProfile` map — matches iOS ClinicianProfileService */
export function buildNativeClinicianProfile(
  data: Partial<ClinicianProfileDoc> & {
    firstName?: string;
    lastName?: string;
    workEmail?: string;
  }
): Record<string, unknown> {
  const now = fsNow();
  const timeZone = data.timeZone ?? Intl.DateTimeFormat().resolvedOptions().timeZone ?? 'Europe/London';

  const profile: Record<string, unknown> = {
    firstName: data.firstName ?? 'Clinician',
    lastName: data.lastName ?? '',
    workEmail: data.workEmail ?? '',
    role: data.role ?? 'Physician',
    specialty: data.specialty ?? 'General Practice',
    scopeOfPractice: data.scopeOfPractice ?? 'Selective',
    statesOfPractice: data.statesOfPractice?.length ? data.statesOfPractice : ['England'],
    timeZone,
    onboardingCompleted: data.onboardingCompleted ?? false,
    isVerified: data.isVerified ?? false,
    verificationStatus: data.verificationStatus ?? 'Pending',
    communicationPreferences: data.communicationPreferences ?? [],
    languagesSpoken: data.languagesSpoken?.length ? data.languagesSpoken : ['English'],
    lastUpdated: now,
  };

  if (data.clinicName) profile.clinicName = data.clinicName;
  if (data.licenseNumber) profile.licenseNumber = data.licenseNumber;
  if (data.licenseState) profile.licenseState = data.licenseState;
  if (data.organizationId) profile.organizationId = data.organizationId;
  if (data.supervisingPhysician) profile.supervisingPhysician = data.supervisingPhysician;
  if (data.workPhoneNumber) profile.workPhoneNumber = data.workPhoneNumber;
  if (data.clinicalAvailability) profile.clinicalAvailability = data.clinicalAvailability;
  if (data.typicalResponseTime) profile.typicalResponseTime = data.typicalResponseTime;
  if (data.profilePhotoUrl) profile.profilePhotoUrl = data.profilePhotoUrl;
  if (data.bio) profile.bio = data.bio;
  if (data.pronouns) profile.pronouns = data.pronouns;
  if (data.onboardingCompletedAt) {
    profile.onboardingCompletedAt = fsTimestampFromIso(data.onboardingCompletedAt);
  }

  return profile;
}

/** Denormalize nested clinician profile fields onto the clinician root doc (native parity). */
export function denormalizeClinicianTopLevel(
  nested: Record<string, unknown>,
  email?: string
): Record<string, unknown> {
  const top: Record<string, unknown> = {
    lastUpdated: nested.lastUpdated ?? fsNow(),
    workEmail: nested.workEmail ?? '',
    specialty: nested.specialty ?? 'General Practice',
    statesOfPractice: nested.statesOfPractice ?? ['England'],
    timeZone: nested.timeZone ?? 'Europe/London',
    verificationStatus: nested.verificationStatus ?? 'Pending',
  };

  if (email) top.email = email;
  if (nested.firstName || nested.lastName) {
    top.name = [nested.firstName, nested.lastName].filter(Boolean).join(' ').trim();
  }
  if (nested.onboardingCompleted && nested.onboardingCompletedAt) {
    top.onboardingCompleteDate = nested.onboardingCompletedAt;
  }

  return top;
}

/**
 * Merge native clinician schema onto `clinicians/{uid}` — backfills missing fields for existing docs.
 */
export async function ensureClinicianSchema(
  clinicianId: string,
  profile: UserProfile
): Promise<void> {
  const db = firestore();
  const ref = db.collection(FS.clinicians).doc(clinicianId);
  const doc = await ref.get();
  const existing = doc.data() ?? {};
  const existingNested = (existing.clinicianProfile as Record<string, unknown> | undefined) ?? {};
  const { firstName, lastName } = splitDisplayName(profile.displayName);

  const parseTimestamp = (value: unknown): string | undefined => {
    if (!value) return undefined;
    if (typeof value === 'string') return value;
    if (typeof value === 'object' && value !== null && 'toDate' in value) {
      return (value as FirebaseFirestoreTypes.Timestamp).toDate().toISOString();
    }
    return undefined;
  };

  const onboardingCompleted =
    (existingNested.onboardingCompleted as boolean | undefined) ??
    (existing.onboardingCompleted as boolean | undefined) ??
    (existing.onboardingCompleteDate ? true : undefined) ??
    profile.onboardingComplete ??
    false;
  const onboardingCompletedAt =
    parseTimestamp(existingNested.onboardingCompletedAt) ??
    parseTimestamp(existing.onboardingCompleteDate) ??
    (onboardingCompleted ? new Date().toISOString() : undefined);

  const nested = buildNativeClinicianProfile({
    firstName: (existingNested.firstName as string) ?? firstName,
    lastName: (existingNested.lastName as string) ?? lastName,
    workEmail: (existingNested.workEmail as string) ?? profile.email,
    role: (existingNested.role as string) ?? 'Physician',
    specialty: (existingNested.specialty as string) ?? (existing.specialty as string) ?? 'General Practice',
    scopeOfPractice: (existingNested.scopeOfPractice as string) ?? 'Selective',
    statesOfPractice:
      (existingNested.statesOfPractice as string[] | undefined) ??
      (existing.statesOfPractice as string[] | undefined) ??
      ['England'],
    timeZone:
      (existingNested.timeZone as string) ??
      (existing.timeZone as string) ??
      Intl.DateTimeFormat().resolvedOptions().timeZone ??
      'Europe/London',
    clinicName: (existingNested.clinicName as string) ?? '',
    licenseNumber: existingNested.licenseNumber as string | undefined,
    licenseState: existingNested.licenseState as string | undefined,
    organizationId: existingNested.organizationId as string | undefined,
    supervisingPhysician: existingNested.supervisingPhysician as string | undefined,
    workPhoneNumber: existingNested.workPhoneNumber as string | undefined,
    clinicalAvailability: existingNested.clinicalAvailability as string | undefined,
    communicationPreferences: (existingNested.communicationPreferences as string[]) ?? [],
    languagesSpoken: (existingNested.languagesSpoken as string[]) ?? ['English'],
    typicalResponseTime: existingNested.typicalResponseTime as string | undefined,
    profilePhotoUrl: existingNested.profilePhotoUrl as string | undefined,
    bio: existingNested.bio as string | undefined,
    pronouns: existingNested.pronouns as string | undefined,
    isVerified: (existingNested.isVerified as boolean | undefined) ?? false,
    verificationStatus: (existingNested.verificationStatus as string) ?? 'Pending',
    onboardingCompleted,
    onboardingCompletedAt,
  });

  const patch: Record<string, unknown> = {
    id: clinicianId,
    email: profile.email,
    role: 'clinician',
    joinDate: existing.joinDate ?? fsTimestampFromIso(profile.createdAt),
    clinicianProfile: nested,
    ...denormalizeClinicianTopLevel(nested, profile.email),
  };

  if (!existing.name) {
    patch.name = profile.displayName;
  }

  await ref.set(patch, { merge: true });
}

/** `userProfiles/{uid}` — parallel wellness profile (native UserProfileService) */
export function buildUserProfileDoc(profile: UserProfile): Record<string, unknown> {
  const now = fsNow();
  return {
    id: profile.uid,
    email: profile.email,
    name: profile.displayName,
    joinDate: fsTimestampFromIso(profile.createdAt),
    lastLoginDate: now,
    notificationsEnabled: true,
    subscriptionTier: profile.subscriptionTier ?? 'free',
    totalQuizTaken: profile.quizComplete ? 1 : 0,
    streakDays: 0,
    dietaryPreferences: [],
    dietaryRestrictions: [],
    healthGoals: profile.healthGoals?.length
      ? profile.healthGoals
      : profile.primaryGoal
        ? [profile.primaryGoal]
        : [],
    fitnessProgress: [],
    sleepData: [],
    moodData: [],
    mealPlans: [],
    quizResults: [],
    dailyNutritionLog: [],
    achievements: [],
    reminderTimes: {},
    lastUpdated: now,
  };
}

export async function syncNativeRoleDoc(
  profile: UserProfile,
  batch?: FirebaseFirestoreTypes.WriteBatch
): Promise<void> {
  const db = firestore();
  const writeBatch = batch ?? db.batch();
  const shouldCommit = !batch;

  if (profile.role === 'patient') {
    writeBatch.set(
      db.collection(FS.patients).doc(profile.uid),
      buildPatientDoc(profile),
      { merge: true }
    );
  } else {
    writeBatch.set(
      db.collection(FS.clinicians).doc(profile.uid),
      buildClinicianDoc(profile),
      { merge: true }
    );
  }

  writeBatch.set(
    db.collection(FS.userProfiles).doc(profile.uid),
    buildUserProfileDoc(profile),
    { merge: true }
  );

  if (shouldCommit) await writeBatch.commit();
}

export async function saveFcmTokenNative(
  uid: string,
  token: string,
  role?: UserRole
): Promise<void> {
  await ensureAuthReadyForUid(uid);
  const db = firestore();
  const now = fsNow();
  const platform = Platform.OS === 'ios' ? 'ios' : 'android';

  const userDoc = await db.collection(FS.users).doc(uid).get();
  if (userDoc.exists()) {
    await syncNativeRoleDoc(userDoc.data() as UserProfile).catch((error) => {
      console.warn('[saveFcmTokenNative] role doc sync failed:', error);
    });
  }

  await db.collection(FS.fcmTokens).doc(uid).set(
    {
      userId: uid,
      token,
      updatedAt: now,
      platform,
    },
    { merge: true }
  ).catch((error) => {
    console.warn('[saveFcmTokenNative] fcmTokens write failed:', error);
  });

  const rolePatch = {
    fcmToken: token,
    fcmTokenUpdatedAt: now,
    lastUpdated: now,
  };

  if (role === 'patient') {
    await db.collection(FS.patients).doc(uid).set(rolePatch, { merge: true }).catch((error) => {
      console.warn('[saveFcmTokenNative] patient token patch failed:', error);
    });
  } else if (role === 'clinician') {
    await db.collection(FS.clinicians).doc(uid).set(rolePatch, { merge: true }).catch((error) => {
      console.warn('[saveFcmTokenNative] clinician token patch failed:', error);
    });
  } else {
    await Promise.all([
      db.collection(FS.patients).doc(uid).set(rolePatch, { merge: true }).catch(() => {}),
      db.collection(FS.clinicians).doc(uid).set(rolePatch, { merge: true }).catch(() => {}),
    ]);
  }
}

export async function startUserTrialNative(uid: string): Promise<void> {
  await ensureAuthReadyForUid(uid);
  const db = firestore();
  const start = new Date();
  const end = new Date(start);
  end.setDate(end.getDate() + 14);

  await db.collection(FS.userTrials).doc(uid).set(
    {
      userId: uid,
      startDate: firestore.Timestamp.fromDate(start),
      endDate: firestore.Timestamp.fromDate(end),
      isActive: true,
      hasBeenUsed: true,
    },
    { merge: true }
  );
}

export async function enqueueCarePlanNotification(input: {
  patientId: string;
  planId: string;
  planName: string;
  clinicianName: string;
  fitnessHubCategoryName?: string;
}): Promise<void> {
  const db = firestore();
  const notificationId = `notif_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
  const now = fsNow();

  const notificationData: Record<string, unknown> = {
    id: notificationId,
    patientId: input.patientId,
    type: 'carePlan',
    subtype: 'customCarePlan',
    title: 'New care plan',
    body: 'Your clinician sent you a care plan',
    planId: input.planId,
    planName: input.planName,
    clinicianName: input.clinicianName,
    createdAt: now,
    sentAt: now,
    read: false,
    status: 'pending',
    needsPush: true,
  };
  if (input.fitnessHubCategoryName) {
    notificationData.fitnessHubCategoryName = input.fitnessHubCategoryName;
  }

  const queueData: Record<string, unknown> = {
    patientId: input.patientId,
    notificationId,
    type: 'carePlan',
    planId: input.planId,
    planName: input.planName,
    title: 'New care plan',
    body: 'Your clinician sent you a care plan',
    createdAt: now,
    status: 'pending',
    retryCount: 0,
  };
  if (input.fitnessHubCategoryName) {
    queueData.fitnessHubCategoryName = input.fitnessHubCategoryName;
  }

  const batch = db.batch();
  batch.set(db.collection(FS.notifications).doc(notificationId), notificationData);
  batch.set(db.collection(FS.notificationQueue).doc(notificationId), queueData);
  await batch.commit();
}

export function buildCustomCarePlanNativeFields(planId: string): {
  qrCodeData: string;
  shareableLink: string;
} {
  const shareableLink = `https://wellnessshift.co.uk/care-plan/${planId}`;
  return { qrCodeData: shareableLink, shareableLink };
}
