# Native iOS vs React Native — Like-for-like comparison

Native iOS project: `/Users/afras.nizam/Desktop/Wellness Shift V2 - CSQ SDK IOS/`
RN project: `/Users/afras.nizam/Desktop/WellnessShiftRN/`

## Screen mapping

| RN screen | Native iOS view | Notes |
|-----------|-----------------|-------|
| `AuthLandingScreen.tsx` | `AuthView.swift` → `SimpleAuthLandingView` | Native: purple static bg, large logo, 2 buttons, skip option. RN: full gradient + animated features + social buttons. |
| `SignInScreen.tsx` | `AuthView.swift` → `SimpleSignInView` | Native: hero carousel + email/social buttons + `EmailSignInFormView`. RN: glass form inside gradient header. |
| `SignUpScreen.tsx` | `AuthView.swift` → `SimpleSignUpView` | Native: hero carousel + email/social buttons + role-based form. RN: glass form inside gradient header. |
| `EmailVerificationScreen.tsx` | `EmailVerificationView.swift` | Native: separate verification view. RN: exists. |
| `RoleSelectScreen.tsx` | `SocialAuthPreAuthRoleSheet` / `RoleSelectionView` | Native: role picker sheet shown before social auth. RN: role select screen. |
| `QuizScreen.tsx` | `WellnessAssessmentQuizView.swift` | Native: comprehensive quiz. RN: simpler quiz. |
| `EnhancedWellnessResultsScreen.tsx` | `EnhancedWellnessResultsView.swift`, `WellnessAssessmentResultsView.swift` | Native: detailed results. RN: basic version. |
| `HomeStack` (Home) | `HomeView.swift`, `UserDashboardView.swift` | Native: large home dashboard. RN: separate Home/Dashboard screens. |
| `FitnessStack` | `FitnessHubView.swift`, `StretchingView.swift`, `WorkoutDetailView.swift`, etc. | Native: extensive fitness hub. RN: fewer fitness screens. |
| `AIInsightsStack` | `AIInsightsView.swift`, `AIHealthCoachView.swift`, `AICoachWellnessView.swift`, `DailyAIInsightsView.swift` | Native: multiple AI coach views. RN: simpler AI insights. |
| `AnalyticsStack` | `EnhancedAnalyticsDashboardView.swift`, `HealthAnalyticsDashboardView.swift`, `ModernAnalyticsDashboardView.swift`, `ActivityDashboardView.swift` | Native: rich analytics. RN: basic analytics dashboard. |
| `MoreStack` / `MoreMenuScreen.tsx` | `MoreView.swift`, `SettingsView` | Native: more menu. RN: exists. |
| `ClinicianDashboardScreen.tsx` | `ClinicianDashboardView.swift` | Native: grouped-background cards, inline nav title, triage queues, KPIs, recent activity. RN: gradient header + stat cards + quick actions. |
| `PatientsScreen.tsx` | `ClinicianPatientDetailView.swift`, `PatientsNeedingAttentionView.swift` | Native: detailed patient views. RN: simpler list. |
| `ClinicianSettingsScreen.tsx` | `SettingsView` / clinician settings | Native: more detailed settings. RN: basic settings. |
| `AddPatientScreen.tsx` | `PatientClinicianLinkView.swift` | Native: patient link flow. RN: exists. |
| `ClinicianInboxScreen.tsx` | `ClinicianInboxView.swift` | Native: inbox. RN: exists. |
| `PaywallScreen.tsx` | `OnboardingPaywallView.swift` | Native: paywall. RN: exists. |
| `PostQuizActionPlanScreen.tsx` | `PostQuizActionPlanView.swift` | Native: detailed action plan. RN: basic. |
| `PostQuizOnboardingScreen.tsx` | `PostQuizOnboardingView.swift`, `StartHereOnboardingView.swift` | Native: onboarding. RN: exists. |
| `HealthKitPermissionScreen.tsx` | `HealthKitPermissionView.swift` | Native: HealthKit permission. RN: exists. |
| `ClinicianAnalyticsScreen.tsx` | `EnhancedAnalyticsDashboardView.swift` etc. | Native: richer analytics. RN: basic. |
| `AnatomyViewerScreen.tsx`, `BrainGameScreen.tsx` | Many 3D anatomy/game views | Native: extensive 3D and games. RN: minimal. |
| `ProgramsView.tsx`, `ProgramDetailScreen.tsx` | `ProgramsView.swift`, `ProgramDetailView.swift`, `ProgramTrackingView.swift` | Native: programs. RN: exists. |
| `ProgressTrackingScreen.tsx`, `WellnessExportScreen.tsx` | `ProgressTrackingView.swift`, `WellnessYearExportView.swift` | Native: progress tracking. RN: exists. |
| `ClinicianAuditLogScreen.tsx`, etc. | `ClinicianFeatures/` folder | Native: extensive clinician features. RN: some missing. |

## Biggest differences

1. **Auth flow** — Native uses a purple static landing + hero carousel sign-in/sign-up. RN uses gradient + glass forms.
2. **Clinician dashboard** — Native uses grouped background, inline title, triage queues, KPIs. RN uses gradient header + stat cards.
3. **Home / Dashboard** — Native has a much richer home dashboard with widgets and sections. RN is simpler.
4. **Fitness hub** — Native has extensive fitness content (videos, stretching, workouts). RN is minimal.
5. **AI insights** — Native has multiple AI coach views. RN is simpler.
6. **Analytics** — Native has multiple rich analytics dashboards. RN is basic.
7. **3D / Games** — Native has many 3D anatomy viewers and brain games. RN has minimal versions.

## Suggested phased approach

1. **Phase 1: Auth flow** — Redesign `AuthLandingScreen`, `SignInScreen`, `SignUpScreen` to match native iOS.
2. **Phase 2: Clinician portal** — Redesign `ClinicianDashboardScreen`, `ClinicianSettingsScreen`, `PatientsScreen` to match native.
3. **Phase 3: Patient home** — Redesign `HomeStack` to match native `HomeView`.
4. **Phase 4: Fitness / AI / Analytics** — Bring RN screens closer to native equivalents.
5. **Phase 5: Missing screens** — Add missing native screens (3D, games, advanced clinician features) if needed.
