# WellnessShift — React Native

React Native port of the WellnessShift iOS app.

---

## Quick Start

### 1. Prerequisites
- Node.js 18+
- Xcode 15+ with iOS 17 simulator
- CocoaPods: `sudo gem install cocoapods`
- React Native CLI: `npm install -g react-native-cli`

### 2. Install dependencies
```bash
npm install
cd ios && pod install && cd ..
```

### 3. Firebase setup
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create / use your existing WellnessShift project
3. Download `GoogleService-Info.plist`
4. Drag it into Xcode under the `ios/WellnessShift/` folder
5. Enable: Authentication, Firestore, Functions, Messaging, Remote Config, Crashlytics

### 4. Run on iOS
```bash
npx react-native run-ios
```

---

## Project Structure

```
WellnessShift/
├── App.tsx                        # Entry point
├── src/
│   ├── theme/                     # Colors, typography, spacing
│   ├── types/                     # TypeScript types for whole app
│   ├── store/                     # Zustand global state
│   ├── services/
│   │   ├── firebase.ts            # Firestore + Auth
│   │   ├── ai.ts                  # OpenAI via Firebase proxy
│   │   ├── healthkit.ts           # Apple HealthKit (read-only)
│   │   └── iap.ts                 # StoreKit 2 subscriptions
│   ├── navigation/
│   │   ├── RootNavigator.tsx      # Auth flow gating
│   │   ├── MainTabNavigator.tsx   # 5-tab patient app
│   │   ├── ClinicianTabNavigator.tsx
│   │   ├── AuthNavigator.tsx
│   │   └── stacks/                # Per-tab stack navigators
│   ├── screens/
│   │   ├── auth/                  # Splash, SignIn, SignUp, Quiz, etc.
│   │   ├── home/                  # Home, DailyPlan, TaskDetail
│   │   ├── fitness/               # FitnessHub + all modules
│   │   ├── insights/              # AI Insights + Chat
│   │   ├── analytics/             # Analytics dashboard
│   │   ├── more/                  # Profile, CarePlan, Settings, etc.
│   │   └── clinician/             # Clinician portal
│   └── components/
│       ├── common/                # Shared UI (banners, etc.)
│       └── home/                  # WellnessOrbitRing, DailyPlanCard, etc.
```

---

## Native Modules (iOS-specific)

These require native code — already configured in services/:

| Module | Library | Purpose |
|--------|---------|---------|
| HealthKit | `react-native-health` | Steps, HR, sleep, etc. |
| StoreKit 2 | `react-native-iap` | Subscriptions |
| Sign in with Apple | `@invertase/react-native-apple-authentication` | Auth |
| Google Sign-In | `@react-native-google-signin/google-signin` | Auth |

### HealthKit — Info.plist additions required
Add to `ios/WellnessShift/Info.plist`:
```xml
<key>NSHealthShareUsageDescription</key>
<string>Wellness Shift reads your health data to personalise your wellness score and daily plan.</string>
<key>NSHealthUpdateUsageDescription</key>
<string>Wellness Shift does not write to Apple Health.</string>
```

### Signing & Capabilities (Xcode)
Under Signing & Capabilities, add:
- HealthKit
- Push Notifications
- In-App Purchase
- Sign In with Apple

---

## Screen Build Order (recommended)

The stub screens are placeholders. Build in this order for fastest visible progress:

1. ✅ **SplashScreen** — done
2. ✅ **HomeScreen** — done (WellnessOrbitRing, DailyPlanCard)
3. 🔲 **SignInScreen / SignUpScreen** — auth flow
4. 🔲 **QuizScreen** — onboarding assessment
5. 🔲 **FitnessHubScreen** — content library
6. 🔲 **InsightsFeedScreen + AIChatScreen** — AI tab
7. 🔲 **AnalyticsDashboardScreen** — charts
8. 🔲 **MoreMenuScreen** — settings hub
9. 🔲 All clinician screens

---

## Key Decisions

- **State management:** Zustand (lightweight, no boilerplate)
- **Navigation:** React Navigation v6 (industry standard)
- **Charts:** react-native-gifted-charts (closest to your iOS charts)
- **Animations:** react-native-reanimated (smooth 60fps)
- **SVG rings:** react-native-svg (the orbit ring visualisation)
- **Storage:** react-native-mmkv (fast local storage, replaces UserDefaults)

---

## 3D Anatomy Models

The beating heart and anatomy tutors in iOS use SceneKit/RealityKit. Options for RN:
1. **Keep as native module** — wrap your existing SceneKit views in a React Native NativeModule (recommended, preserves quality)
2. **expo-gl + three.js** — JS-based 3D, more work, less fidelity
3. **WebView + Three.js** — embed a web-based 3D viewer

Recommendation: native module wrapper for the anatomy screens. We can scaffold that next.
