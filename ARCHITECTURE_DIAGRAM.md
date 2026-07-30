# WellnessShift Architecture Diagram

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              App.tsx (Entry Point)                           │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │  - GestureHandlerRootView                                              │  │
│  │  - SafeAreaProvider                                                   │  │
│  │  - Initializes: Contentsquare, GoogleSignIn, IAP, Crashlytics,       │  │
│  │                AppCheck, Notifications, Firestore                     │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           RootNavigator.tsx                                  │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │  Auth State Management & Routing Logic                                 │  │
│  │  - Firebase Auth listener                                              │  │
│  │  - Role-based routing (patient vs clinician)                           │  │
│  │  - Onboarding flow control                                             │  │
│  │  - Email verification check                                            │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
                                        │
        ┌───────────────┬───────────────┼───────────────┬───────────────┐
        ▼               ▼               ▼               ▼               ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│   Auth Flow  │ │  Patient     │ │  Clinician   │ │  Onboarding  │ │   Paywall    │
│              │ │  Main App    │ │  Portal      │ │  Flow        │ │              │
└──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘
                        │
                        ▼
              ┌─────────────────┐
              │ MainTabNavigator│
              │   (5 Tabs)      │
              └─────────────────┘
        ┌──────────┬──────────┬──────────┬──────────┬──────────┐
        ▼          ▼          ▼          ▼          ▼          ▼
   ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐
   │  Home  │ │Fitness │ │  AI    │ │Analytics│ │  More  │
   │  Stack │ │ Stack  │ │Insights│ │ Stack  │ │ Stack  │
   └────────┘ └────────┘ └────────┘ └────────┘ └────────┘
```

## Data Layer Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            Firebase Cloud Backend                            │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │  Collections:                                                          │  │
│  │  - users (user profiles)                                               │  │
│  │  - registeredUsers (role registry)                                    │  │
│  │  - patients / clinicians (role-specific)                               │  │
│  │  - messageThreads (patient-clinician messaging)                       │  │
│  │  - connectionRequests (patient-clinician linking)                     │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│  User Subcollections:                                                       │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │  - wellnessScores (historical scores)                                  │  │
│  │  - dailyPlans (daily task plans)                                       │  │
│  │  - carePlans (clinician-assigned plans)                                │  │
│  │  - checkIns (daily mood/energy tracking)                               │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           Service Layer                                     │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │  firebase.ts           - Auth, User, Wellness, Plan, CarePlan,        │  │
│  │                         Message services                                │  │
│  │  ai.ts                 - AI coach chat, insight generation              │  │
│  │  healthkit.ts           - Apple HealthKit integration (iOS)            │  │
│  │  healthConnect.ts       - Android Health Connect                        │  │
│  │  iap.ts                - Subscription management (StoreKit 2)          │  │
│  │  subscriptionService.ts - IAP initialization & tier sync                │  │
│  │  clinicianService.ts   - Clinician-specific operations                 │  │
│  │  notifications.ts       - Push notification handling                    │  │
│  │  planGenerator.ts       - Daily plan generation logic                  │  │
│  │  gamificationService.ts - Achievements & stats tracking                │  │
│  │  insightRecommendationService.ts - AI insight generation              │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                        State Management (Zustand)                           │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │  store/index.ts - Global App State                                     │  │
│  │  - user (profile, auth state)                                          │  │
│  │  - wellnessScore (current score)                                       │  │
│  │  - dailyPlan (today's tasks)                                           │  │
│  │  - activity (HealthKit data)                                           │  │
│  │  - insights (AI recommendations)                                       │  │
│  │  - chatMessages (AI coach conversation)                                │  │
│  │  - carePlan (clinician-assigned plan)                                   │  │
│  │  - subscriptionTier (free/growth/pro)                                  │  │
│  │  - clinicianProfileReady (onboarding status)                           │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                            UI Components                                     │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │  Screens (89 screens across 6 categories)                              │  │
│  │  - auth/ (15): Splash, SignIn, SignUp, Quiz, Onboarding, etc.         │  │
│  │  - home/ (6): Home, DailyPlan, TaskDetail, CheckIn, Activity          │  │
│  │  - fitness/ (16): FitnessHub, Anatomy, BrainGames, Calculators, etc.  │  │
│  │  - insights/ (3): AIInsightsFeed, AIHealthCoach, InsightDetail        │  │
│  │  - analytics/ (4): Dashboard, CategoryDetail, Progress, Export        │  │
│  │  - more/ (21): Profile, CarePlan, Messages, Programs, Settings, etc.  │  │
│  │  - clinician/ (23): Dashboard, Patients, Inbox, CarePlans, etc.       │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│  Components (54 reusable components)                                       │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │  - home/ (19): WellnessOrbitRing, DailyPlanCard, TaskCard, etc.       │  │
│  │  - ui/ (15): Button, Card, Modal, Input, etc.                        │  │
│  │  - analytics/ (9): Charts, ScoreDisplay, TrendLine, etc.              │  │
│  │  - fitness/ (3): ModuleCard, ExerciseCard, etc.                       │  │
│  │  - activity/ (2): ActivityRing, StepCounter, etc.                    │  │
│  │  - auth/ (3): SocialAuthButton, etc.                                   │  │
│  │  - common/ (3): Banner, etc.                                           │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
```

## User Flow Diagrams

### Patient Onboarding Flow

```
┌──────────────┐
│ Intro Video  │
└──────────────┘
        │
        ▼
┌──────────────┐
│ Splash Screen│
└──────────────┘
        │
        ▼
┌──────────────┐
│ Auth Navigator│
│ - Sign In     │
│ - Sign Up     │
│ - Social Auth │
└──────────────┘
        │
        ▼ (authenticated)
┌──────────────┐
│ Email Verify? │───Yes──▶ ┌──────────────────┐
│ (if email/pw) │           │EmailVerification  │
└──────────────┘           └──────────────────┘
        │No                                    │
        ▼                                      ▼
┌──────────────┐                      ┌──────────────┐
│ Wellness Quiz │◀─────────────────────│ Verified     │
└──────────────┘                      └──────────────┘
        │
        ▼
┌──────────────┐
│ Wellness     │
│ Results      │
└──────────────┘
        │
        ▼
┌──────────────┐
│ Post-Quiz    │
│ Action Plan  │
└──────────────┘
        │
        ▼
┌──────────────┐
│ Post-Quiz    │
│ Onboarding   │
└──────────────┘
        │
        ▼
┌──────────────┐
│ Quick Start  │
│ Guide        │
└──────────────┘
        │
        ▼
┌──────────────┐
│ HealthKit    │
│ Permissions  │
└──────────────┘
        │
        ▼
┌──────────────┐
│ Main App     │
│ (5 Tabs)     │
└──────────────┘
```

### Clinician Onboarding Flow

```
┌──────────────┐
│ Auth Navigator│
└──────────────┘
        │
        ▼ (authenticated, role=clinician)
┌──────────────┐
│ Clinician     │
│ Onboarding    │
│ - Profile     │
│ - Specialty   │
│ - Practice    │
└──────────────┘
        │
        ▼
┌──────────────┐
│ Clinician     │
│ Portal        │
│ (4 Tabs)      │
└──────────────┘
```

## Data Flow: Daily Plan Generation

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           Daily Plan Generation                               │
└─────────────────────────────────────────────────────────────────────────────┘

1. User opens Home Screen
   │
   ├─▶ useAppStore.dailyPlan (Zustand)
   │
   └─▶ If null, fetch from Firestore
       │
       └─▶ planService.getDailyPlan(uid, today)
           │
           └─▶ If no plan exists:
               │
               ├─▶ Get latest wellness score (wellnessService.getLatestScore)
               │
               ├─▶ Get HealthKit activity (healthkitService.fetchToday)
               │
               ├─▶ planGenerator.generate(wellnessScore, activity)
               │   │   - Analyze lowest wellness categories
               │   │   - Match categories to fitness modules
               │   │   - Generate tasks with score boosts
               │   │   - Check for clinician recommendations
               │
               └─▶ planService.saveDailyPlan(uid, plan)
                   │
                   └─▶ Update Zustand store (setDailyPlan)

2. User completes task
   │
   └─▶ markTaskComplete(taskId) (Zustand)
       │
       ├─▶ Update local state
       │
       └─▶ planService.updateTaskStatus(uid, date, taskId, 'complete')
           │
           └─▶ wellnessScoreService.applyTaskCompletionBoost()
               │
               └─▶ Update wellness score in Firestore
                   │
                   └─▶ Update Zustand store (setWellnessScore)
```

## Data Flow: AI Insights

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           AI Insight Generation                              │
└─────────────────────────────────────────────────────────────────────────────┘

1. User opens AI Insights tab
   │
   ├─▶ Check if insights exist in Zustand store
   │
   └─▶ If empty or stale:
       │
       ├─▶ Get latest wellness score
       │
       ├─▶ Get HealthKit activity snapshot
       │
       ├─▶ aiService.generateInsights(wellnessScore, activity)
       │   │
       │   └─▶ insightRecommendationService.generateAssessmentInsights()
       │       │   - Analyze category scores (0-10)
       │       │   - Identify low-scoring categories
       │       │   - Match to fitness modules
       │       │   - Generate actionable recommendations
       │       │   - Assign severity (Low/Medium/High)
       │       │   - Add "why it matters" context
       │       │   - Suggest action steps
       │
       └─▶ Update Zustand store (setInsights)

2. User marks insight complete
   │
   └─▶ markInsightComplete(id) (Zustand)
       │
       └─▶ Update local state (isComplete: true)
```

## Data Flow: Clinician-Patient Messaging

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      Clinician-Patient Messaging                             │
└─────────────────────────────────────────────────────────────────────────────┘

1. Clinician sends message to patient
   │
   └─▶ messageService.sendMessage(patientId, clinicianId, message)
       │
       ├─▶ Create message document in messageThreads/{threadId}/messages
       │
       ├─▶ Update thread metadata (lastMessage, lastMessageAt, unread count)
       │
       └─▶ Firestore real-time listener triggers on patient's device
           │
           └─▶ watchMessages() callback fires
               │
               └─▶ Update UI with new message

2. Patient reads messages
   │
   └─▶ messageService.markMessagesRead(patientId, clinicianId, readerId)
       │
       ├─▶ Mark individual messages as read
       │
       └─▶ Reset unread count on thread

3. Clinician views inbox
   │
   └─▶ messageService.watchClinicianInbox(clinicianId, patients, callback)
       │
       └─▶ Real-time listener on messageThreads where clinicianId matches
           │
           └─▶ Returns sorted list of threads with patient info
```

## Key Integrations

### Native Modules (iOS)
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          iOS Native Integrations                             │
└─────────────────────────────────────────────────────────────────────────────┘

HealthKit Integration:
┌─────────────────────────────────────────────────────────────────────────────┐
│  healthkit.ts                                                               │
│  - fetchToday()              - Steps, calories, distance, exercise minutes  │
│  - fetchSleepData()          - Sleep analysis                                │
│  - fetchHeartRate()          - Heart rate data                               │
│  - requestAuthorization()    - Permission handling                           │
│  - isAuthorized()            - Check authorization status                    │
└─────────────────────────────────────────────────────────────────────────────┘

StoreKit 2 (IAP):
┌─────────────────────────────────────────────────────────────────────────────┐
│  iap.ts + subscriptionService.ts                                            │
│  - init()                    - Initialize IAP connection                    │
│  - getProducts()             - Fetch subscription products                   │
│  - purchase()                - Handle purchase flow                          │
│  - syncForUser()             - Sync subscription status with Firestore       │
│  - CurrentUserChangeListener - Restore purchases on app launch             │
└─────────────────────────────────────────────────────────────────────────────┘

Sign in with Apple:
┌─────────────────────────────────────────────────────────────────────────────┐
│  socialAuth.ts                                                               │
│  - setupAppleSignIn()       - Configure Apple auth                          │
│  - handleAppleSignIn()       - Process Apple credential                      │
└─────────────────────────────────────────────────────────────────────────────┘

Google Sign-In:
┌─────────────────────────────────────────────────────────────────────────────┐
│  socialAuth.ts                                                               │
│  - setupGoogleSignIn()       - Configure Google auth with web client ID     │
│  - handleGoogleSignIn()       - Process Google credential                    │
└─────────────────────────────────────────────────────────────────────────────┘

Push Notifications:
┌─────────────────────────────────────────────────────────────────────────────┐
│  notifications.ts                                                             │
│  - init()                    - Initialize FCM                               │
│  - requestPermission()        - Request notification permissions             │
│  - registerDevice()           - Register FCM token with Firestore            │
│  - setBackgroundHandler()    - Handle background notifications               │
│  - onTokenRefresh()           - Handle token refresh                         │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Firebase Services
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          Firebase Services                                   │
└─────────────────────────────────────────────────────────────────────────────┘

Authentication:
- Email/Password
- Sign in with Apple
- Google Sign-In
- Email verification

Firestore:
- Real-time data sync
- Offline persistence
- User profiles
- Wellness scores
- Daily plans
- Care plans
- Messages
- Connection requests

Cloud Functions (via functions/):
- OpenAI proxy (ai.ts)
- Custom business logic
- Notification triggers

Cloud Messaging:
- Push notifications
- In-app messaging
- Background handling

Remote Config:
- Feature flags
- A/B testing
- Dynamic configuration

Crashlytics:
- Crash reporting
- Error tracking
- User context

Analytics:
- Event tracking
- User properties
- Screen views

App Check:
- App integrity verification
- Abuse prevention
```

## State Management Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        Zustand State Management                              │
└─────────────────────────────────────────────────────────────────────────────┘

Component                      Service                      Zustand Store
    │                            │                              │
    ├─▶ useAppStore()            │                              │
    │   └─▶ Read state           │                              │
    │                            │                              │
    ├─▶ setUser()                │                              │
    │                            │                              │
    │                            ├─▶ firebaseAuth.signOut()     │
    │                            │                              │
    │                            │                              ├─▶ resetSession()
    │                            │                              │   └─▶ Clear all state
    │                            │                              │
    │                            ├─▶ wellnessService.getScore() │
    │                            │                              │
    │                            │                              ├─▶ setWellnessScore()
    │                            │                              │
    │                            ├─▶ planService.getDailyPlan()│
    │                            │                              │
    │                            │                              ├─▶ setDailyPlan()
    │                            │                              │
    │                            ├─▶ aiService.generateInsights()│
    │                            │                              │
    │                            │                              ├─▶ setInsights()
    │                            │                              │
    ├─▶ markTaskComplete()       │                              │
    │                            │                              │
    │                            ├─▶ planService.updateTask()   │
    │                            │                              │
    │                            │                              ├─▶ Update dailyPlan
    │                            │                              │   (local mutation)
    │                            │                              │
    │                            │                              │   └─▶ Triggers re-render
```

## Navigation Structure

```
RootNavigator (Stack)
├── IntroVideoScreen
├── SplashScreen
├── AuthNavigator (Stack)
│   ├── SignInScreen
│   ├── SignUpScreen
│   └── ChooseRoleScreen
├── EmailVerificationScreen
├── WellnessQuizScreen
├── EnhancedWellnessResultsScreen
├── QuizResultsDetailScreen
├── PostQuizActionPlanScreen
├── PostQuizOnboardingScreen
├── QuickStartScreen
├── HealthKitPermissionScreen
├── ClinicianOnboardingScreen
├── MainTabNavigator (Bottom Tabs - Patient)
│   ├── HomeStackNavigator
│   │   ├── HomeScreen
│   │   ├── DailyPlanScreen
│   │   ├── TaskDetailScreen
│   │   ├── DailyCheckInScreen
│   │   ├── ActivityDashboardScreen
│   │   └── StepsDetailScreen
│   ├── FitnessStackNavigator
│   │   ├── FitnessHubScreen
│   │   ├── ModuleDetailScreen
│   │   ├── AnatomyViewerScreen
│   │   ├── BrainGameScreen
│   │   ├── BreathingExerciseScreen
│   │   ├── MeditationTimerScreen
│   │   ├── HealthCalculatorScreen
│   │   ├── HealthTrackerScreen
│   │   ├── HealthTopicScreen
│   │   ├── LearningGuideDetailScreen
│   │   ├── GuidedProgramScreen
│   │   ├── MealPlannerScreen
│   │   ├── VitaminsLearningScreen
│   │   ├── NutritionBasicsLearningScreen
│   │   ├── OrganHealthNutritionScreen
│   │   ├── PremiumShopScreen
│   │   └── ActivityDashboardScreen
│   ├── AIInsightsStackNavigator
│   │   ├── AIInsightsFeedScreen
│   │   ├── AIHealthCoachScreen
│   │   └── InsightDetailScreen
│   ├── AnalyticsStackNavigator
│   │   ├── AnalyticsDashboardScreen
│   │   ├── CategoryDetailScreen
│   │   ├── ProgressTrackingScreen
│   │   └── WellnessExportScreen
│   └── MoreStackNavigator
│       ├── MoreMenuScreen
│       ├── MyCareScreen
│       ├── ConnectClinicianScreen
│       ├── ContentLibraryScreen
│       ├── ProfileScreen
│       ├── CarePlanScreen
│       ├── MessagesScreen
│       ├── ProgramsScreen
│       ├── ProgramDetailScreen
│       ├── AchievementsScreen
│       ├── CoachingScreen
│       ├── NotificationsScreen
│       ├── SubscriptionScreen
│       ├── HelpScreen
│       ├── PrivacyPolicyScreen
│       ├── DataRightsScreen
│       ├── NewsletterScreen
│       ├── MenstrualCycleScreen
│       ├── ReplayIntroVideoScreen
│       ├── WebsiteScreen (WebView)
│       ├── BlogScreen
│       ├── ForumScreen
│       └── ScanCustomPlanScreen
├── ClinicianStackNavigator (Stack - Clinician)
│   ├── ClinicianTabNavigator (Bottom Tabs)
│   │   ├── ClinicianDashboardScreen
│   │   ├── PatientsScreen
│   │   ├── ClinicianAnalyticsScreen
│   │   └── ClinicianSettingsScreen
│   ├── ClinicianInboxScreen
│   ├── PatientDetailScreen
│   ├── ClinicianMessagesScreen
│   ├── CreateCarePlanScreen
│   ├── FitnessRecommendationsScreen
│   ├── ClinicalNotesScreen
│   ├── AddPatientScreen
│   ├── EditClinicianProfileScreen
│   ├── ClinicianHelpScreen
│   ├── MessageTemplatesScreen
│   ├── ClinicianScheduleScreen
│   ├── ConversationStartersScreen
│   ├── BetweenVisitsScreen
│   ├── AuditLogScreen
│   ├── PracticeModeScreen
│   ├── ClinicianLegalScreen
│   ├── WebsiteScreen (WebView)
│   ├── BulkActionsScreen
│   ├── ClinicianModuleLibraryScreen
│   └── EvidenceHubScreen
└── PaywallScreen (Modal)
```

## Key Technical Decisions

1. **State Management**: Zustand (lightweight, no boilerplate, TypeScript-friendly)
2. **Navigation**: React Navigation v6 (industry standard, deep linking support)
3. **Charts**: react-native-gifted-charts (closest to iOS charts)
4. **Animations**: react-native-reanimated (smooth 60fps animations)
5. **SVG Graphics**: react-native-svg (for orbit ring visualization)
6. **Local Storage**: react-native-mmkv (fast, replaces AsyncStorage)
7. **Health Data**: 
   - iOS: react-native-health (HealthKit)
   - Android: react-native-health-connect
8. **Subscriptions**: react-native-iap (StoreKit 2)
9. **Social Auth**: 
   - Apple: @invertase/react-native-apple-authentication
   - Google: @react-native-google-signin/google-signin
10. **Analytics**: Contentsquare + Firebase Analytics
11. **Crash Reporting**: Firebase Crashlytics
12. **Notifications**: Firebase Cloud Messaging + Notifee

## Security & Privacy

1. **Firebase Security Rules**: Firestore rules defined in firestore.rules
2. **App Check**: Firebase App Check for app integrity verification
3. **Health Data**: Read-only HealthKit access (no writes)
4. **Email Verification**: Required for email/password users
5. **Role-Based Access**: Patient vs Clinician separation in Firestore
6. **Data Rights**: Dedicated screen for data export/deletion requests

## Performance Optimizations

1. **Firebase Offline Persistence**: Enabled for Firestore
2. **Image Optimization**: Lazy loading, caching
3. **Code Splitting**: Navigation-based code splitting
4. **State Optimization**: Zustand's selective subscriptions
5. **Animation Performance**: Reanimated with worklets
6. **List Virtualization**: FlatList with proper optimization props
