# Native iOS vs React Native — Gap Analysis

**Native reference:** `/Users/afras.nizam/Desktop/Wellness Shift V2 - CSQ SDK IOS 03:06:26/`  
**React Native project:** `/Users/afras.nizam/Desktop/WellnessShiftRN/`

A true line-by-line comparison of 486 native Swift files against 142 RN files is impractical, so this is a **screen-by-screen / feature-by-feature gap analysis**. It tells you which native screens and capabilities do **not** yet have a matching React Native implementation.

## Size snapshot

| Metric | Native iOS | React Native |
|---|---|---|
| Swift view files | 374 | — |
| Total Swift files | 486 | — |
| RN screen files (.tsx) | — | 90 |
| RN component files (.tsx) | — | 52 |

The native app is roughly **3–4× larger** in file count, mainly because it has a dedicated Swift file per calculator, game, tracker, anatomy model, and health-education topic. The RN app consolidates those into generic screens driven by data params.

---

## 1. App shell & navigation

| Native iOS | React Native | Gap |
|---|---|---|
| 5 tabs: Home, Fitness, AI Insights, Analytics, More | Same 5 tabs | ✅ Matched |
| **6th tab: My Care** appears when patient links to a clinician | My Care is only inside the **More** stack (`MyCareHubScreen`) | ⚠️ UX mismatch — native surfaces care as a top-level tab |
| `MainTabView` handles onboarding/paywall/HealthKit modals automatically | `RootNavigator` handles the same flow | ✅ Equivalent logic |
| Contentsquare screen tracking (`csqTrackedScreen`) | `contentsquareService` + `screenviewFromNavigationState` | ✅ Conceptually equivalent |
| Firebase Analytics screen + event tracking | Firebase Analytics + Crashlytics | ✅ Equivalent |

### Missing in RN
- **My Care tab promotion** — when `linkedClinicianId` is set, the RN app should add/promote a 6th tab instead of burying it in More.

---

## 2. Auth & onboarding

| Native iOS | React Native | Gap |
|---|---|---|
| `AuthView` / `Auth_Landing` | `AuthMainLandingScreen.tsx` | ✅ Present |
| `SignIn` | `SignInScreen.tsx` | ✅ Present |
| `CreateAccount` / `CreateAccount_EmailForm` / `CreateAccount_ChooseRole` | `SignUpScreen.tsx` + `RoleSelectScreen.tsx` | ✅ Present, simpler |
| `EmailVerificationView` | `EmailVerificationScreen.tsx` | ✅ Present |
| `OnboardingView` / `PostQuizOnboardingView` / `PostQuizActionPlanView` | `PostQuizOnboardingScreen.tsx` / `PostQuizActionPlanScreen.tsx` | ✅ Present |
| `HealthKitPermissionView` | `HealthKitPermissionScreen.tsx` | ✅ Present |
| `WelcomeView` / `StartHereOnboardingView` | `SplashScreen.tsx` / `QuickStartScreen.tsx` | ✅ Present |
| `GenderSelectionView` | Not found | ❌ Missing |
| `PreQuizOnboardingView` | Not found | ❌ Missing |
| `DayOneChecklistView` | Not found | ❌ Missing |

### UI differences (not missing screens)
- Native auth landing uses a **purple static background + hero carousel**.
- RN uses a **gradient + animated feature list + glass forms**.

---

## 3. Home / Patient dashboard

| Native iOS | React Native | Gap |
|---|---|---|
| `HomeView` | `HomeScreen.tsx` | ✅ Present |
| `UserDashboardView` | `HomeScreen.tsx` / `DailyPlanScreen.tsx` | ⚠️ Partial — native dashboard is richer |
| `DailyCheckInView` | `CheckInScreen.tsx` | ✅ Present |
| `TodaysPlanView` | `DailyPlanScreen.tsx` | ✅ Present |
| `DailyGoalsDetailView` | `TaskDetailScreen.tsx` | ✅ Present |
| `StepsDetailView` | `StepsDetailScreen.tsx` | ✅ Present |
| `ActivityDashboardView` | `ActivityDashboardScreen.tsx` | ✅ Present |
| `GoalSettingView` / `GoalsListView` / `GoalDetailView` / `GoalEditView` | Not found | ❌ Missing dedicated goal management |
| `HabitTrackingView` | Not found | ❌ Missing |
| `StreakSystemView` | Not found | ❌ Missing |
| `AchievementsView` | `AchievementsScreen.tsx` | ✅ Present |
| `QuickLogView` | Not found | ❌ Missing |
| `WellnessOrbitRingView` | `WellnessOrbitRing` component | ✅ Present |

### Missing in RN
- Dedicated goal CRUD screens (`GoalSettingView`, `GoalsListView`, `GoalDetailView`, `GoalEditView`).
- Habit tracking, streak system, quick-log entries.

---

## 4. Fitness Hub

The RN app uses one generic screen per category (`BrainGameScreen`, `CalculatorScreen`, `HealthTrackerScreen`, `AnatomyViewerScreen`, `HealthTopicScreen`). The native app has **one Swift file per module**, so the UI/UX is tailored.

### 4.1 Brain games

Native has dedicated game views:
- `BrainGamesView`, `BrainTutorView`, `ColorMatchGameView`, `FocusTrainingGameView`, `MemoryMatchGameView`, `MentalRotationGameView`, `NumberSequenceGameView`, `PatternRecognitionGameView`, `QuickMathGameView`, `ReactionTimeGameView`, `SpeedReadingGameView`, `VisualPuzzleGameView`, `WordRecallGameView`, `EnhancedBrainTutorView`, `InteractiveBrain3DView`.

RN: `BrainGameScreen.tsx` (one screen with `gameId` param).

**Gap:** One generic screen may not match the native look-and-feel for each game. If you want pixel parity, each native game needs its own RN screen or a much more configurable `BrainGameScreen`.

### 4.2 Health calculators

Native has dedicated calculator views:
- `BMICalculatorView`, `BodyFatCalculatorView`, `CalorieCalculatorView`, `HeartRateCalculatorView`, `IntermittentFastingView`, `MacroCalculatorView`, `NutritionCalculators`, `OneRepMaxCalculatorView`, `SleepDebtCalculatorView`, `TDEECalculatorView`, `HydrationCalculatorView`, `StressLevelCalculatorView`, `VO2MaxCalculatorView`, `ProteinCalculatorView`, `RestingHeartRateView`.

RN: `CalculatorScreen.tsx` with `calculatorId` param.

**Gap:** Same as games — one generic screen likely differs in layout per calculator.

### 4.3 Health trackers

Native has dedicated tracker views:
- `ActivityTrackersView`, `EnergyLevelTrackerView`, `FiberTrackerView`, `HeartRateTrackerView`, `HydrationTrackerView`, `MeditationTimerView`, `MindfulnessTrackerView`, `MoodTrackerView`, `PainScaleTrackerView`, `RecoveryTrackerView`, `SleepTrackerView` (implied), `StepsDetailView`.

RN: `HealthTrackerScreen.tsx` with `trackerId` param.

**Gap:** Tailored tracker UIs are missing.

### 4.4 3D anatomy / visual learning

Native has **many** 3D viewers using SceneKit / RealityKit / USDZ:
- `BeatingHeartTutorView`, `NewHeart3DView`, `NewHeartTutorView`, `HeartBronchialTutorView`, `HeartLungsTutorView`, `HologramAnatomyTutorView`, `HologramBrainTutorView`, `HologramEcorcheTutorView`, `HologramLungTutorView`, `HologramSkeletonTutorView`, `HologramStomachTutorView`, `NIH3DAnatomicalViewer`, `NervousSystemAnatomicalViewer`, `Real3DAnatomicalViewer`, `RealAnatomical3DViewer`, `RealityKitAnatomicalViewer`, `Simple3DAnatomicalViewer`, `SimpleSceneKitViewer`, `Sketchfab3DViewer`, `ModelTestView`, `QuickModelTestView`.

RN: `AnatomyViewerScreen.tsx` with `modelId` param.

**Gap:** This is the biggest technical gap. The native 3D models are rendered with SceneKit/RealityKit. React Native cannot run SceneKit/RealityKit directly. Options:
1. Keep the native 3D module as a **React Native native module** (best fidelity).
2. Use `react-native-webview` + Three.js / model-viewer (lower fidelity).
3. Use Expo GL + Three.js (not in this project).

If you want identical visuals, option 1 is required.

### 4.5 Workouts / movement

Native: `StretchingView`, `WorkoutDetailView`, `WorkoutRoutinesView`, `WorkoutTracker`, `YogaSequencesView`, `PilatesExercisesView`, `CoreStrengtheningView`, `WarmUpRoutinesView`, `CoolDownRoutinesView`, `InjuryPreventionView`, `SeniorFitnessView`.

RN: `GuidedProgramScreen.tsx` (generic) + `ModuleDetailScreen.tsx`.

**Gap:** Dedicated workout screens are missing.

### 4.6 Mind-body

Native: `BreathingMeditationView`, `MeditationTimerView`, `MeditationTechniqueView`, `MindfulnessExerciseView`, `MindfulnessTestView`, `MindfulnessToolkitView`.

RN: `BreathingExerciseScreen.tsx`, `MeditationTimerScreen.tsx`.

**Gap:** Mindfulness toolkit, technique, and test screens are missing.

---

## 5. AI Insights / Coach

| Native iOS | React Native | Gap |
|---|---|---|
| `AICoachWellnessView` | `InsightsFeedScreen.tsx` | ✅ Present |
| `AIHealthCoachView` | `AIChatScreen.tsx` | ✅ Present |
| `AIInsightsView` | `InsightsFeedScreen.tsx` | ✅ Present |
| `DailyAIInsightsView` | Not found | ❌ Missing |
| `AIInsightsRecommendationView` | Not found | ❌ Missing |
| `OneTapRecommendationView` | Not found | ❌ Missing |

---

## 6. Analytics

| Native iOS | React Native | Gap |
|---|---|---|
| `ModernAnalyticsDashboardView` | `AnalyticsDashboardScreen.tsx` | ✅ Present |
| `EnhancedAnalyticsDashboardView` | Not found | ❌ Missing enhanced version |
| `HealthAnalyticsDashboardView` | Not found | ❌ Missing |
| `ProgressDashboardView` | `ProgressTrackingScreen.tsx` | ✅ Present |
| `ProgressTrackingView` | `ProgressTrackingScreen.tsx` | ✅ Present |
| `ProgressSignalsView` | Not found | ❌ Missing |
| `ProgressEntryView` | Not found | ❌ Missing |
| `ProgressPhotosView` | Not found | ❌ Missing |
| `AnalyticsExportView` | `WellnessExportScreen.tsx` | ✅ Present |
| `WellnessYearExportView` | `WellnessExportScreen.tsx` | ✅ Present |
| `TrendRow` / `EnhancedChartViews` | Charts in RN use `react-native-gifted-charts` | ⚠️ Different chart library; may not match visual style |

---

## 7. More menu / profile / settings

| Native iOS | React Native | Gap |
|---|---|---|
| `MoreView` | `MoreMenuScreen.tsx` | ✅ Present |
| `PatientProfileEditView` / `ProfileEditView` | `ProfileScreen.tsx` | ⚠️ Partial |
| `PatientProfileDetailView` | Not found | ❌ Missing |
| `UserPreferencesView` | Not found | ❌ Missing |
| `NotificationSettingsView` | `NotificationsScreen.tsx` | ✅ Present |
| `DataRightsView` / `DataSharingConsentView` / `DataTransparencyView` | `DataRightsScreen.tsx` | ⚠️ Partial |
| `SubscriptionView` / `SubscriptionManagementView` | `SubscriptionScreen.tsx` | ✅ Present |
| `PaywallView` / `OnboardingPaywallView` / `SmartPaywallView` / `PaywallOptions` | `PaywallScreen.tsx` | ⚠️ Partial — native has multiple paywall variants |
| `MedicalDisclaimerView` / `LegalDisclaimersView` | `PrivacyScreen.tsx` / `HelpScreen.tsx` | ⚠️ Partial |
| `SupportFAQView` | `HelpScreen.tsx` | ✅ Present |
| `CompanyInformationView` | Not found | ❌ Missing |
| `WebsiteView` | `TrackedWebViewScreen.tsx` | ✅ Present |
| `NewsletterSignupView` | `NewsletterScreen.tsx` | ✅ Present |
| `BlogView` | `BlogScreen.tsx` | ✅ Present |
| `ForumView` | `ForumScreen.tsx` | ✅ Present |
| `EnhancedCommunityFeedView` | Not found | ❌ Missing |
| `EnhancedLeaderboardView` | Not found | ❌ Missing |
| `EnhancedChallengesView` | Not found | ❌ Missing |
| `SocialAccountabilityView` | Not found | ❌ Missing |
| `CommunitiesManagementView` | Not found | ❌ Missing |
| `LogoutConfirmationView` | Not found (usually handled by Alert) | ⚠️ Minor |
| `InAppGuideView` | Not found | ❌ Missing |
| `AppConsentView` | Not found | ❌ Missing |
| `AppFeatureDetailView` | Not found | ❌ Missing |

---

## 8. Programs / content library

| Native iOS | React Native | Gap |
|---|---|---|
| `ProgramsView` | `ProgramsScreen.tsx` | ✅ Present |
| `ProgramDetailView` | `ProgramDetailScreen.tsx` | ✅ Present |
| `ProgramTrackingView` | Not found | ❌ Missing |
| `ProgramStartedView` | Not found | ❌ Missing |
| `ProgramCheckInView` | Not found | ❌ Missing |
| `ComprehensiveContentLibraryView` | `ContentLibraryScreen.tsx` | ✅ Present |
| `VideoLibraryView` / `VideoPlayerView` / `VideoProgressView` | Not found | ❌ Missing dedicated video library |
| `CuratedJourneysView` | Not found | ❌ Missing |
| `NewProgramView` | Not found | ❌ Missing |
| `FavoriteBlocksView` | Not found | ❌ Missing |
| `MealPlannerView` | `MealPlannerScreen.tsx` | ✅ Present |
| `OrganHealthNutritionView` | `OrganHealthNutritionScreen.tsx` | ✅ Present |
| `NutritionBasicsLearningScreen` / `VitaminsLearningScreen` | `NutritionBasicsLearningScreen.tsx` / `VitaminsLearningScreen.tsx` | ✅ Present |
| `LearningGuideDetailScreen` | `LearningGuideDetailScreen.tsx` | ✅ Present |
| `HealthEducationModuleView` | `HealthTopicScreen.tsx` | ⚠️ Generic equivalent |

---

## 9. Health education topics (condition library)

The native app has a **large condition-specific library** with one Swift view per topic. The RN app has `HealthTopicScreen.tsx` with a `topicId` param, so it can display any topic from data, but the layout is generic.

### Native condition views (sample — not exhaustive)
- Mental health: `AnxietyView`, `DepressionView`, `DepressiveDisordersView`, `GeneralizedAnxietyView`, `PanicAttacksView`, `SocialAnxietyEducationView`, `StressDisordersView`, `GriefEducationView`, `InsomniaView`, `MemoryCognitiveDeclineView`.
- Cardiovascular / metabolic: `HeartDiseaseView`, `HeartAttackPreventionView`, `HeartMonitoringView`, `HighCholesterolView`, `HypertensionView`, `HypertensionManagementView`, `DiabetesView`, `DiabetesManagementView`, `HypoglycaemiaView`, `MetabolicSyndromeView`, `ObesityView`, `OvertraningSyndromeView`, `PhysicalInactivityView`, `SmokingView`, `SmokingCessationEducationView`.
- Pain / musculoskeletal: `BackPainView`, `NeckPainView`, `JointPainArthritisView`, `LowerBackPainView`, `NervePainReliefView`, `SciaticaView`, `PelvicFloorEducationView`, `PostureCorrectionEducationView`.
- Digestive: `ConstipationView`, `DiarrhoeaView`, `IBSView`, `LiverHealthEducationView`, `StomachHologramTutorView`.
- Women's / reproductive: `MenopauseView`, `MenstrualPainView`, `MenstrualCycleTrackerView`, `PCOSEducationView`, `EndometriosisEducationView`, `FertilityView`, `PregnancyComplicationsView`, `WomensHealthView`.
- Infections / immune: `FrequentInfectionsView`, `LongCovidView`, `UTIEducationView`, `SkinConditionsEducationView`.
- Cancer / organ: `ProstateView`, `ProstateHealthEducationView`, `KidneyHealthEducationView`, `EyeHealthEducationView`, `EarHealthEducationView`, `ThyroidDisordersView`, `ThyroidEducationView`.
- Senior / travel: `SeniorFitnessView`, `FallsPreventionView`, `HealthyAgeingEducationView`, `TravelHealthEducationView`.

**Gap:** If the RN `HealthTopicScreen` already loads all these topics from JSON, the content is covered but the **native-style bespoke layout per topic** is missing. If the JSON does not include all these topics, content is missing.

---

## 10. Care team / clinician (patient side)

| Native iOS | React Native | Gap |
|---|---|---|
| `MyCareView` | `MyCareHubScreen.tsx` | ⚠️ Not a top-level tab in RN |
| `PatientCarePlanView` | `CarePlanScreen.tsx` | ✅ Present |
| `ConnectClinicianView` | `ConnectClinicianScreen.tsx` | ✅ Present |
| `ClinicianMessagesView` | `MessagesScreen.tsx` | ✅ Present |
| `CustomPlanViewerView` | `ScanCustomPlanScreen.tsx` / `CarePlanScreen.tsx` | ⚠️ Partial |
| `PendingRequestsView` | Handled inside `ConnectClinicianScreen.tsx` | ✅ Present |
| `ClinicianConnectionInfoView` | Not found | ❌ Missing |
| `TreatmentPlanView` | Not found | ❌ Missing |
| `CarePlanSelectionView` | Not found | ❌ Missing |
| `DuplicatePlanSelectionView` | Not found | ❌ Missing |

---

## 11. Clinician portal

| Native iOS | React Native | Gap |
|---|---|---|
| `ClinicianTabView` | `ClinicianStackNavigator` | ✅ Present |
| `ClinicianDashboardView` | `ClinicianDashboardScreen.tsx` | ✅ Present |
| `ClinicianPatientsListView` | `PatientsScreen.tsx` | ✅ Present |
| `ClinicianPatientDetailView` | `PatientDetailScreen.tsx` | ✅ Present |
| `ClinicianPatientDashboardView` | Not found | ❌ Missing |
| `ClinicianPatientStepsReportsView` | Not found | ❌ Missing |
| `ClinicianInboxView` | `ClinicianInboxScreen.tsx` | ✅ Present |
| `ClinicianMessagesView` | `ClinicianMessagesScreen.tsx` | ✅ Present |
| `ClinicianAnalyticsDashboardView` | `ClinicianAnalyticsScreen.tsx` | ✅ Present |
| `ClinicianSettingsView` | `ClinicianSettingsScreen.tsx` | ✅ Present |
| `ClinicianOnboardingView` / `ClinicianOnboardingCheckView` | `ClinicianOnboardingScreen.tsx` | ✅ Present |
| `ClinicianFirstTimeWelcomeView` | Not found | ❌ Missing |
| `ClinicianTermsView` | `ClinicianLegalScreen.tsx` | ✅ Present |
| `ClinicianInfoCard` / `ClinicianFeatureCard` | Components in RN | ⚠️ Partial |
| `CarePlanSelectionView` | Not found | ❌ Missing |
| `SendCustomPlanView` | `CreateCarePlanScreen.tsx` | ✅ Present |
| `CreateComprehensiveCarePlanView` | Not found | ❌ Missing |
| `PatientClinicianLinkView` | `AddPatientScreen.tsx` | ✅ Present |
| `ConversationStartersView` | `ClinicianConversationStartersScreen.tsx` | ✅ Present |
| `PracticeModeView` | `ClinicianPracticeModeScreen.tsx` | ✅ Present |
| `EvidenceHubView` | `EvidenceHubScreen.tsx` | ✅ Present |
| `FitnessHubRecommendationsView` | `FitnessRecommendationsScreen.tsx` | ✅ Present |
| `ClinicianScheduleScreen.tsx` | Not found in native | ✅ RN extra |
| `ClinicianAuditLogScreen.tsx` | Not found in native | ✅ RN extra |
| `ClinicianBulkActionsScreen.tsx` | Not found in native | ✅ RN extra |
| `ClinicianTemplatesScreen.tsx` | Not found in native | ✅ RN extra |
| `ClinicalNotesScreen.tsx` | `addClinicalNote` / `getClinicalNotes` in service, but no native screen | ✅ RN extra |
| `ClinicianBetweenVisitsScreen.tsx` | Not found in native | ✅ RN extra |
| `ClinicianEditProfileScreen.tsx` | Not found in native | ✅ RN extra |

### RN-only clinician screens
The RN app has **extra** clinician screens that the native app does not have: schedule, audit log, bulk actions, templates, clinical notes, between-visits, edit profile. These are not gaps — they are RN additions.

---

## 12. Paywall / subscriptions

| Native iOS | React Native | Gap |
|---|---|---|
| `PaywallView` | `PaywallScreen.tsx` | ✅ Present |
| `OnboardingPaywallView` | `PaywallScreen.tsx` | ⚠️ Combined |
| `SmartPaywallView` | Not found | ❌ Missing |
| `PaywallOptions` / `PaywallStyleSelectorView` / `PaywallUsageExample` | Not found | ❌ Missing |
| `SubscriptionView` / `SubscriptionManagementView` | `SubscriptionScreen.tsx` | ✅ Present |
| `TrialCountdownView` | Not found | ❌ Missing |

The RN app uses `react-native-iap`. Native uses StoreKit 2. The purchase logic is conceptually equivalent, but the native paywall has more UI variants.

---

## 13. Technical / SDK capabilities

| Capability | Native iOS | React Native | Gap |
|---|---|---|---|
| Contentsquare SDK | ✅ Full SDK integration (`CSQ.trackScreenview`, `CSQ.trackEvent`) | ✅ Bridge installed (`@contentsquare/react-native-bridge`) | ⚠️ SDK may not cover every native API |
| HealthKit | ✅ Native HealthKit reads + permissions | `react-native-health` + `HealthKitPermissionScreen` | ⚠️ iOS only; Android uses Health Connect |
| StoreKit 2 subscriptions | ✅ Native | `react-native-iap` | ✅ Equivalent |
| Sign in with Apple | ✅ Native | `@invertase/react-native-apple-authentication` | ✅ Equivalent |
| Google Sign-In | ✅ Native | `@react-native-google-signin/google-signin` | ✅ Equivalent |
| RealityKit / SceneKit 3D | ✅ Many USDZ/SceneKit models | `AnatomyViewerScreen` (likely WebView/SVG) | ❌ Major fidelity gap |
| Push notifications | ✅ `NotificationService` | `@notifee/react-native` + Firebase Messaging | ✅ Equivalent |
| PDF / print | `react-native-print` | ✅ Equivalent |
| QR code | Not in allowlist | `react-native-qrcode-svg` | ✅ RN extra |
| App clips / widgets | Possibly present | Not present | ❌ Native-only features |

---

## 14. Biggest gaps to close for parity

1. **3D anatomy / RealityKit content** — the native app has ~25 dedicated 3D viewers. The RN app has one generic screen. This is the hardest area to replicate faithfully.
2. **My Care as a top-level tab** — native shows a 6th tab when linked to a clinician; RN buries it in More.
3. **Dedicated game / calculator / tracker screens** — native has one Swift file per game/calculator/tracker; RN uses generic screens. Layout parity will differ.
4. **Condition-specific education library** — native has 50+ bespoke condition views. RN uses a generic `HealthTopicScreen`.
5. **Goal / habit / streak system** — native has dedicated goal and habit tracking screens.
6. **Social / community features** — native has community feed, leaderboard, challenges, social accountability. RN has Forum/Blog but not the full social suite.
7. **Paywall variants** — native has multiple paywall styles (smart paywall, trial countdown, style selector).
8. **Video library** — native has dedicated video library and player screens.
9. **Advanced profile / preferences** — native has more granular profile, preferences, consent, and data-rights screens.
10. **UI fidelity** — even where screens exist, native uses iOS-specific grouped backgrounds, SF Symbols, and custom charts. RN uses `react-native-gifted-charts` and Ionicons, so the visual language differs.

---

## 15. Recommended phased approach

1. **Phase 1 — Tab structure & navigation**  
   Promote `MyCareHubScreen` to a 6th tab when the patient has a clinician.

2. **Phase 2 — Core screen UI parity**  
   Redesign `AuthMainLandingScreen`, `SignInScreen`, `SignUpScreen`, `HomeScreen`, `ClinicianDashboardScreen`, `AnalyticsDashboardScreen`, `MoreMenuScreen` to match native visual style (grouped backgrounds, native iconography, chart styling).

3. **Phase 3 — Replace generic module screens**  
   Split `BrainGameScreen`, `CalculatorScreen`, `HealthTrackerScreen`, and `HealthTopicScreen` into per-module screens that mirror the native designs, OR heavily parameterize the generic screens with native-style layouts.

4. **Phase 4 — Add missing feature modules**  
   Goal/habit/streak management, social feed/leaderboard/challenges, video library, trial countdown paywall, and in-app guide.

5. **Phase 5 — 3D anatomy**  
   Decide on native module vs. WebView/Three.js. If visual fidelity must be identical, wrap the native SceneKit/RealityKit views in a React Native native module.

6. **Phase 6 — Polish & SDK parity**  
   Match Contentsquare event tracking, HealthKit read granularity, and notification behaviour to the native app.

---

## 16. Files used for this analysis

- Native iOS screen allowlist: `WellnessShift/Utils/AnalyticsHelper.swift`
- Native iOS tab structure: `WellnessShift/Views/MainTabView.swift`
- RN navigation: `src/navigation/MainTabNavigator.tsx`, `src/navigation/RootNavigator.tsx`
- RN module routing: `src/utils/fitnessModuleRouter.ts`, `src/data/fitnessData.ts`
- RN screens: `src/screens/**/*.tsx`
