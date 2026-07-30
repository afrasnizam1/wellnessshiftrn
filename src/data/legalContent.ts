export type LegalSection = { title: string; body: string };

export const TERMS_SECTIONS: LegalSection[] = [
  {
    title: '1. What This App Is',
    body: 'Wellness Shift is a digital wellness platform designed to help you understand your health, identify areas for improvement, and take simple daily actions to improve how you feel. Through personalised insights, visual education, and optional clinician collaboration, you are empowered to participate actively in your care.',
  },
  {
    title: '2. What This App Is NOT',
    body: 'This app does NOT replace professional medical advice, diagnosis, or treatment. It is not for emergency situations. In emergencies, call 999 or go to A&E immediately. Always consult a qualified healthcare professional for medical decisions.',
  },
  {
    title: '3. User Responsibilities',
    body: 'You agree to provide accurate information, use the app lawfully, and not misuse features. You are responsible for keeping your login credentials secure and for all activity under your account.',
  },
  {
    title: '4. Acceptable Use',
    body: 'You may not use the app to harass others, share harmful content, attempt unauthorised access, or use the service in any way that violates applicable law or professional standards.',
  },
  {
    title: '5. Payments & Subscriptions (In-App Purchase)',
    body: 'Paid Growth and Pro subscriptions are sold as auto-renewable in-app purchases through Apple App Store or Google Play. Prices shown in the app are loaded from the store when available. Payment is charged to your Apple ID or Google account at confirmation of purchase. Subscriptions renew automatically unless cancelled at least 24 hours before the end of the current period. Manage or cancel in your store account settings. Refunds are handled by Apple or Google under their policies. Any complimentary in-app preview period is granted by Wellness Shift inside the app and is not an App Store or Play introductory offer unless the store itself displays one at purchase.',
  },
  {
    title: '6. Account Termination',
    body: 'We may suspend or terminate accounts that violate these terms. You may delete your account at any time from Settings. Data handling on deletion is described in our Privacy Policy.',
  },
  {
    title: '7. Liability Limits',
    body: 'To the fullest extent permitted by law, Wellness Shift Ltd is not liable for indirect or consequential losses arising from use of the app. Nothing limits liability where unlawful to do so.',
  },
  {
    title: '8. Age Policy',
    body: 'You must be at least 16 to create an account. Users aged 13–16 require verifiable parental consent. The app is not directed at children under 13.',
  },
  {
    title: '9. Governing Law',
    body: 'These terms are governed by the laws of England and Wales. Wellness Shift Ltd, United Kingdom. Contact: support@wellnessshift.co.uk.',
  },
];

export const PRIVACY_SECTIONS: LegalSection[] = [
  {
    title: '1. Data We Collect',
    body: 'We collect account details (name, email), wellness assessment responses, daily plan and fitness activity, app usage events, optional device health metrics, in-app purchase / subscription status from Apple or Google, crash and diagnostic logs, and messages with linked clinicians.',
  },
  {
    title: '2. How We Use Data',
    body: 'Data is used to provide personalised scores, daily plans, AI coaching, clinician collaboration, subscription entitlements, reliability monitoring, and (only if you opt in) product analytics. We do not sell your personal data.',
  },
  {
    title: '3. Apple Health / HealthKit & Health Connect',
    body: 'On iOS you may grant read access to Apple Health (HealthKit) data such as activity and sleep. On Android you may grant Health Connect read access. Access is optional and read-only; we do not write samples back to Apple Health or Health Connect. You can revoke access in system Settings at any time. See also Health Data Disclosure in the app.',
  },
  {
    title: '4. In-App Purchases & Subscriptions',
    body: 'Purchase receipts and subscription status are processed by Apple or Google and synced to your Wellness Shift account so we can unlock Growth or Pro features. We do not store full payment card details. Store account identifiers needed for restore / entitlement checks may be processed securely.',
  },
  {
    title: '5. Crash reporting (Firebase Crashlytics)',
    body: 'When enabled, Firebase Crashlytics collects crash stacks, device model, OS version, and related diagnostics so we can fix stability issues. Crash reports are not used for advertising.',
  },
  {
    title: '6. Analytics & session replay (Contentsquare)',
    body: 'Contentsquare analytics and session replay are on by default so we can improve the product. We may collect screen views, interaction events, and session replay of the app UI. You can turn “Allow analytics” off anytime in Profile to stop collection.',
  },
  {
    title: '7. Clinician Sharing',
    body: 'If you connect with a clinician, they may view agreed wellness data and care plans. You can disconnect at any time.',
  },
  {
    title: '8. AI Processing',
    body: 'Some features use AI-style coaching responses to generate wellness guidance. Outputs are for education only and are not medical advice. See AI Disclosure in Settings for details.',
  },
  {
    title: '9. Your GDPR Rights',
    body: 'Under UK GDPR you may access, correct, export, or delete your data. Use Data Rights in the app or email support@wellnessshift.co.uk.',
  },
  {
    title: '10. Retention',
    body: 'Data is retained while your account is active. After deletion, personal data is removed within 30 days except where law requires retention.',
  },
  {
    title: '11. Contact',
    body: 'Wellness Shift Ltd · support@wellnessshift.co.uk · United Kingdom',
  },
];

export const MEDICAL_DISCLAIMER_SECTIONS: LegalSection[] = [
  {
    title: 'Important Information',
    body: 'Wellness Shift is for education and wellness support only. It is not intended for medical diagnosis, emergency situations, replacement of professional medical advice, or treatment of medical conditions.',
  },
  {
    title: 'Emergency Situations',
    body: 'In medical emergencies, call 999 immediately or go to your nearest A&E. Do not use this app for emergency medical situations.',
  },
  {
    title: 'Urgent but not life-threatening (UK)',
    body: 'If you need urgent medical help or are unsure what to do, use NHS 111 (England) or your nation’s equivalent urgent service. Wellness Shift cannot triage symptoms or emergencies.',
  },
  {
    title: 'Professional Medical Advice',
    body: 'Advice in this app is general wellness information unless provided by a licensed clinician linked to your account. Always consult your healthcare provider before making health decisions. Do not delay seeking professional advice because of information in this app.',
  },
  {
    title: 'Clinician-Provided Advice',
    body: 'Where a clinician uses this platform, they remain professionally responsible for the advice they give. The platform facilitates communication but does not provide clinical oversight.',
  },
  {
    title: 'By using this app, you acknowledge that',
    body: '• The app does not provide emergency services\n• You will seek appropriate professional care when needed\n• Wellness content is supplementary, not a substitute for medical care\n• You use the app at your own discretion',
  },
];

export const CLINICIAN_ACKNOWLEDGMENTS = [
  {
    id: 'registered',
    title: 'I am registered with my professional regulatory body',
    description: 'I confirm my registration is current and in good standing with GMC, HCPC, NMC, or an equivalent recognised body.',
  },
  {
    id: 'scope',
    title: 'I will only give advice within my scope of practice',
    description: 'I will practise within the limits of my training, registration, and professional competence.',
  },
  {
    id: 'responsibility',
    title: 'I take full responsibility for my clinical decisions',
    description: 'I remain accountable for all clinical judgements and recommendations I make through this platform.',
  },
  {
    id: 'dataProtection',
    title: 'I will protect patient data and follow data protection rules',
    description: 'I will handle patient information in line with UK GDPR, professional confidentiality, and organisational policies.',
  },
  {
    id: 'safeguarding',
    title: 'I will follow safeguarding and consent rules',
    description: 'I will obtain appropriate consent, follow safeguarding procedures, and comply with relevant professional and legal requirements.',
  },
] as const;

export const REGISTRATION_BODIES = [
  { id: 'GMC', label: 'GMC — Doctors' },
  { id: 'HCPC', label: 'HCPC — Allied health' },
  { id: 'NMC', label: 'NMC — Nursing & midwifery' },
  { id: 'Other', label: 'Other recognised body' },
] as const;

export const CLINICIAN_PLATFORM_STATEMENT =
  'Clinicians using this platform remain fully responsible for the clinical care they provide and must follow the rules of their professional regulator.';

export const AI_DISCLOSURE_SECTIONS: LegalSection[] = [
  {
    title: 'What the AI Health Coach is',
    body: 'The in-app AI Health Coach provides general wellness guidance based on your profile and messages. It is educational support, not clinical care.',
  },
  {
    title: 'What it is not',
    body: 'The coach does not diagnose conditions, prescribe treatment, or replace advice from a qualified clinician. For emergencies call 999.',
  },
  {
    title: 'How responses are generated',
    body: 'Responses are generated by on-device / in-app coaching logic today. Premium tiers increase daily message allowance. Always verify important health decisions with a professional.',
  },
  {
    title: 'Your control',
    body: 'You choose whether to use the coach. Conversation content is used to answer your current request and to personalise your experience within the app.',
  },
];

export const HEALTH_DATA_DISCLOSURE_SECTIONS: LegalSection[] = [
  {
    title: 'Optional device health data',
    body: 'You may connect Apple Health (HealthKit on iOS) or Health Connect (Android) so Wellness Shift can read activity, sleep, and related metrics for your wellness score and plans.',
  },
  {
    title: 'Read-only access',
    body: 'Wellness Shift requests read access only. We do not write workouts, samples, or other records back to Apple Health or Health Connect.',
  },
  {
    title: 'Your control',
    body: 'You can deny, limit, or revoke health permissions in system Settings at any time. The app still works without connected health data.',
  },
  {
    title: 'Sharing',
    body: 'Connected clinicians only see wellness data you have agreed to share through care-plan linking. Disconnecting a clinician stops new sharing.',
  },
];
