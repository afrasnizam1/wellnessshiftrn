// src/services/socialService.ts
import firestore from '@react-native-firebase/firestore';
import { appConfig } from '../config/appConfig';

export type FriendStatus = 'pending' | 'accepted';

export interface Friend {
  id: string;
  userId: string;
  friendId: string;
  displayName: string;
  email?: string;
  status: FriendStatus;
  createdAt: string;
  updatedAt: string;
}

export interface AccountabilityBoardEntry {
  id: string;
  userId: string;
  displayName: string;
  action: string;
  category: string;
  createdAt: string;
}

export interface SocialChallenge {
  id: string;
  title: string;
  description: string;
  category: string;
  durationDays: number;
  createdBy: string;
  createdAt: string;
  endsAt: string;
  /** UI/demo fields */
  endDate?: string;
  duration?: number;
  participantCount?: number;
  targetValue?: number;
  targetUnit?: string;
  participants?: ChallengeParticipant[];
}

export interface ChallengeParticipant {
  id: string;
  userId: string;
  displayName: string;
  progress: number;
  goal: number;
  completedAt?: string;
}

function serialiseFriend(doc: any): Friend {
  const data = doc.data() ?? {};
  return {
    id: doc.id,
    userId: data.userId ?? '',
    friendId: data.friendId ?? '',
    displayName: data.displayName ?? '',
    email: data.email,
    status: data.status ?? 'pending',
    createdAt: data.createdAt ?? new Date().toISOString(),
    updatedAt: data.updatedAt ?? new Date().toISOString(),
  };
}

function serialiseChallenge(doc: any): SocialChallenge {
  const data = doc.data() ?? {};
  return {
    id: doc.id,
    title: data.title ?? '',
    description: data.description ?? '',
    category: data.category ?? 'general',
    durationDays: data.durationDays ?? 7,
    createdBy: data.createdBy ?? '',
    createdAt: data.createdAt ?? new Date().toISOString(),
    endsAt: data.endsAt ?? new Date().toISOString(),
  };
}

function serialiseParticipant(doc: any): ChallengeParticipant {
  const data = doc.data() ?? {};
  return {
    id: doc.id,
    userId: data.userId ?? '',
    displayName: data.displayName ?? '',
    progress: data.progress ?? 0,
    goal: data.goal ?? 1,
    completedAt: data.completedAt,
  };
}

function serialiseBoardEntry(doc: any): AccountabilityBoardEntry {
  const data = doc.data() ?? {};
  return {
    id: doc.id,
    userId: data.userId ?? '',
    displayName: data.displayName ?? '',
    action: data.action ?? '',
    category: data.category ?? 'general',
    createdAt: data.createdAt ?? new Date().toISOString(),
  };
}

export const socialService = {
  // Friends
  fetchFriends: async (uid: string): Promise<Friend[]> => {
    if (!appConfig.isFirebaseConfigured) return [];
    const snap = await firestore()
      .collection('users')
      .doc(uid)
      .collection('friends')
      .where('status', '==', 'accepted')
      .orderBy('createdAt', 'desc')
      .get();
    return snap.docs.map((d) => serialiseFriend(d));
  },

  fetchPendingRequests: async (uid: string): Promise<Friend[]> => {
    if (!appConfig.isFirebaseConfigured) return [];
    const snap = await firestore()
      .collection('users')
      .doc(uid)
      .collection('friends')
      .where('status', '==', 'pending')
      .orderBy('createdAt', 'desc')
      .get();
    return snap.docs.map((d) => serialiseFriend(d));
  },

  sendFriendRequest: async (uid: string, friendId: string, displayName: string, friendDisplayName: string): Promise<void> => {
    if (!appConfig.isFirebaseConfigured) return;
    const now = new Date().toISOString();
    const batch = firestore().batch();

    const outRef = firestore().collection('users').doc(uid).collection('friends').doc(friendId);
    const inRef = firestore().collection('users').doc(friendId).collection('friends').doc(uid);

    batch.set(outRef, { userId: uid, friendId, displayName: friendDisplayName, status: 'pending', createdAt: now, updatedAt: now }, { merge: true });
    batch.set(inRef, { userId: friendId, friendId: uid, displayName, status: 'pending', createdAt: now, updatedAt: now }, { merge: true });

    await batch.commit();
  },

  acceptFriendRequest: async (uid: string, friendId: string): Promise<void> => {
    if (!appConfig.isFirebaseConfigured) return;
    const now = new Date().toISOString();
    const batch = firestore().batch();
    batch.update(firestore().collection('users').doc(uid).collection('friends').doc(friendId), { status: 'accepted', updatedAt: now });
    batch.update(firestore().collection('users').doc(friendId).collection('friends').doc(uid), { status: 'accepted', updatedAt: now });
    await batch.commit();
  },

  removeFriend: async (uid: string, friendId: string): Promise<void> => {
    if (!appConfig.isFirebaseConfigured) return;
    const batch = firestore().batch();
    batch.delete(firestore().collection('users').doc(uid).collection('friends').doc(friendId));
    batch.delete(firestore().collection('users').doc(friendId).collection('friends').doc(uid));
    await batch.commit();
  },

  // Accountability board
  addBoardEntry: async (uid: string, displayName: string, action: string, category: string): Promise<void> => {
    if (!appConfig.isFirebaseConfigured) return;
    const now = new Date().toISOString();
    await firestore().collection('users').doc(uid).collection('accountabilityBoard').add({
      userId: uid,
      displayName,
      action,
      category,
      createdAt: now,
    });
  },

  fetchFriendBoardEntries: async (uid: string): Promise<AccountabilityBoardEntry[]> => {
    if (!appConfig.isFirebaseConfigured) return [];
    const friends = await socialService.fetchFriends(uid);
    const friendIds = friends.map((f) => f.friendId);
    if (friendIds.length === 0) return [];
    const entries: AccountabilityBoardEntry[] = [];
    const chunks = [];
    for (let i = 0; i < friendIds.length; i += 10) {
      chunks.push(friendIds.slice(i, i + 10));
    }
    for (const chunk of chunks) {
      const snap = await firestore()
        .collectionGroup('accountabilityBoard')
        .where('userId', 'in', chunk)
        .orderBy('createdAt', 'desc')
        .limit(10)
        .get();
      entries.push(...snap.docs.map((d) => serialiseBoardEntry(d)));
    }
    return entries.sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 20);
  },

  // Challenges
  fetchChallenges: async (): Promise<SocialChallenge[]> => {
    if (!appConfig.isFirebaseConfigured) return [];
    const snap = await firestore()
      .collection('challenges')
      .where('endsAt', '>=', new Date().toISOString())
      .orderBy('endsAt', 'asc')
      .limit(20)
      .get();
    return snap.docs.map((d) => serialiseChallenge(d));
  },

  createChallenge: async (uid: string, title: string, description: string, category: string, durationDays: number): Promise<SocialChallenge> => {
    if (!appConfig.isFirebaseConfigured) {
      const now = new Date().toISOString();
      const ends = new Date(Date.now() + durationDays * 24 * 60 * 60 * 1000).toISOString();
      return { id: `local_${Date.now()}`, title, description, category, durationDays, createdBy: uid, createdAt: now, endsAt: ends };
    }
    const now = new Date().toISOString();
    const endsAt = new Date(Date.now() + durationDays * 24 * 60 * 60 * 1000).toISOString();
    const ref = firestore().collection('challenges').doc();
    const payload = { title, description, category, durationDays, createdBy: uid, createdAt: now, endsAt };
    await ref.set(payload);
    return { id: ref.id, ...payload };
  },

  joinChallenge: async (uid: string, displayName: string, challengeId: string, goal: number): Promise<void> => {
    if (!appConfig.isFirebaseConfigured) return;
    const ref = firestore().collection('challenges').doc(challengeId).collection('participants').doc(uid);
    await ref.set({ userId: uid, displayName, progress: 0, goal, updatedAt: new Date().toISOString() }, { merge: true });
  },

  fetchChallengeParticipants: async (challengeId: string): Promise<ChallengeParticipant[]> => {
    if (!appConfig.isFirebaseConfigured) return [];
    const snap = await firestore().collection('challenges').doc(challengeId).collection('participants').get();
    return snap.docs.map((d) => serialiseParticipant(d));
  },

  updateChallengeProgress: async (challengeId: string, uid: string, progress: number): Promise<void> => {
    if (!appConfig.isFirebaseConfigured) return;
    const ref = firestore().collection('challenges').doc(challengeId).collection('participants').doc(uid);
    const snap = await ref.get();
    const data = snap.data() as ChallengeParticipant | undefined;
    const completedAt = data && progress >= data.goal ? new Date().toISOString() : data?.completedAt ?? null;
    await ref.update({
      progress,
      completedAt: completedAt ? completedAt : firestore.FieldValue.delete(),
      updatedAt: new Date().toISOString(),
    });
  },
};
