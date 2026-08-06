import { initializeApp } from 'firebase-admin/app';
import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import { sendPushToUser, truncate } from './notifications';

initializeApp();

/**
 * Fires when a patient or clinician sends a secure message.
 * Notifies the receiver via FCM (topic + token fallback).
 */
export const onNewMessage = onDocumentCreated(
  'messageThreads/{threadId}/messages/{messageId}',
  async (event) => {
    const message = event.data?.data();
    if (!message) return;

    const { senderId, receiverId, content, senderName } = message as {
      senderId: string;
      receiverId?: string;
      content?: string;
      senderName?: string;
    };

    if (!senderId || !receiverId || senderId === receiverId) return;

    const threadId = event.params.threadId;
    const threadSnap = await event.data?.ref.parent.parent?.get();
    const thread = threadSnap?.data() as { patientId?: string; clinicianId?: string } | undefined;

    const patientId = thread?.patientId;
    const clinicianId = thread?.clinicianId;
    if (!patientId || !clinicianId) return;

    const isPatientReceiver = receiverId === patientId;
    const role = isPatientReceiver ? 'patient' : 'clinician';
    const preview = truncate(content ?? 'New message');

    await sendPushToUser(receiverId, role, {
      title: senderName ? `Message from ${senderName}` : 'New message',
      body: preview,
      data: {
        type: 'message',
        role,
        threadId,
        senderId,
        patientId,
        clinicianId,
      },
    });
  }
);

/**
 * Fires when a clinician sends a custom care plan to a patient.
 */
export const onCarePlanSent = onDocumentCreated(
  'customCarePlans/{planId}',
  async (event) => {
    const plan = event.data?.data();
    if (!plan) return;

    const {
      patientId,
      planStatus,
    } = plan as {
      patientId?: string;
      planStatus?: string;
    };

    if (!patientId) return;
    if (planStatus === 'draft') return;

    const planId = event.params.planId;

    await sendPushToUser(patientId, 'patient', {
      title: 'New care plan',
      body: 'Your clinician sent you a care plan',
      data: {
        type: 'care_plan',
        role: 'patient',
        planId,
        patientId,
      },
    });
  }
);

/**
 * Fires when a clinician requests to connect with a patient by email.
 */
export const onConnectionRequest = onDocumentCreated(
  'patients/{patientId}/pendingClinicianRequests/{requestId}',
  async (event) => {
    const request = event.data?.data();
    if (!request) return;

    const { status, clinicianName, patientId } = request as {
      status?: string;
      clinicianName?: string;
      patientId?: string;
    };

    if (status !== 'pending') return;

    const uid = patientId ?? event.params.patientId;
    const name = clinicianName ?? 'A clinician';

    await sendPushToUser(uid, 'patient', {
      title: 'Connection request',
      body: `${name} wants to connect as your clinician`,
      data: {
        type: 'connection_request',
        role: 'patient',
        requestId: event.params.requestId,
        patientId: uid,
      },
    });
  }
);
