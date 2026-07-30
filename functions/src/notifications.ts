import { getFirestore } from 'firebase-admin/firestore';
import { getMessaging } from 'firebase-admin/messaging';

type UserRole = 'patient' | 'clinician';

interface PushPayload {
  title: string;
  body: string;
  data: Record<string, string>;
}

function topicForUser(uid: string, role: UserRole): string {
  return role === 'clinician' ? `clinician_${uid}` : `patient_${uid}`;
}

async function getFcmToken(uid: string, role: UserRole): Promise<string | null> {
  const db = getFirestore();

  const tokenDoc = await db.collection('fcmTokens').doc(uid).get();
  const tokenFromCollection = tokenDoc.data()?.token as string | undefined;
  if (tokenFromCollection) return tokenFromCollection;

  const roleDoc = await db.collection(role === 'clinician' ? 'clinicians' : 'patients').doc(uid).get();
  const roleToken = roleDoc.data()?.fcmToken as string | undefined;
  if (roleToken) return roleToken;

  const userDoc = await db.collection('users').doc(uid).get();
  return (userDoc.data()?.fcmToken as string | undefined) ?? null;
}

export async function sendPushToUser(
  uid: string,
  role: UserRole,
  payload: PushPayload
): Promise<void> {
  const messaging = getMessaging();
  const data = Object.fromEntries(
    Object.entries(payload.data).map(([k, v]) => [k, String(v)])
  );

  const messageBase = {
    notification: { title: payload.title, body: payload.body },
    data,
    android: { priority: 'high' as const },
    apns: { payload: { aps: { sound: 'default' } } },
  };

  const token = await getFcmToken(uid, role);
  if (token) {
    try {
      await messaging.send({ ...messageBase, token });
      return;
    } catch (err) {
      console.warn(`Direct FCM send failed for ${uid}, falling back to topic:`, err);
    }
  }

  await messaging.send({
    ...messageBase,
    topic: topicForUser(uid, role),
  });
}

export function truncate(text: string, max = 120): string {
  const trimmed = text.trim();
  if (trimmed.length <= max) return trimmed;
  return `${trimmed.slice(0, max - 1)}…`;
}
