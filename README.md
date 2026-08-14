# WellnessShift

React Native app for patients and clinicians (`afras.wellnessshiftrn.ios` / `afras.wellnessshiftrn.android`).

Firebase project: **wellnessshift-rn-ios**  
Site: [wellnessshift.co.uk](https://wellnessshift.co.uk)

---

## What the app includes

**Patients**
- Auth (email, Apple, optional Google), onboarding quiz, wellness results
- Home (score, daily plan, activity, body metrics)
- Fitness Hub (modules, anatomy holograms, workouts, nutrition, meditation)
- AI Insights and health coach chat
- Analytics and progress
- Care plans when connected to a clinician (My Care tab)
- Profile, subscriptions, HealthKit / Health Connect, social, settings

**Clinicians**
- Dashboard, patients, care plans and templates
- Fitness Hub recommendations sent as care-plan tasks
- Messages, analytics, practice settings

**3D holograms**
- iOS: SceneKit + USDZ (`ios/WellnessShift/HologramSceneView.swift`, models in `ios/WellnessShift/Models/`)
- Android: WebView + Three.js USD loader (`src/hologram/androidHologramViewer.ts` → `android/app/src/main/assets/hologram/`)

---

## Prerequisites

- Node.js 18+
- Xcode 16+ (iOS Simulator; current simulators are iOS 26.x)
- Android Studio + an emulator (e.g. Pixel)
- CocoaPods (`bundle exec pod install` in `ios/` if you use the Gemfile)
- Watchman recommended for Metro

Do **not** install the old global `react-native-cli`. Use the project scripts below.

---

## Setup

```bash
npm install
cd ios && pod install && cd ..
```

Native Firebase config should already be in the repo:

- iOS: `ios/WellnessShift/GoogleService-Info.plist`
- Android: `android/app/google-services.json`

Google Sign-In needs a real web client ID in `src/config/googleAuth.local.ts` (see `googleAuthConfig`). Leave it empty to hide Google.

---

## Run

Start Metro once:

```bash
npm start
```

Then in another terminal:

```bash
npm run ios          # default simulator
npm run android      # connected device / emulator + adb reverse 8081
```

Target a specific iPhone:

```bash
npx react-native run-ios --simulator "iPhone 17 Pro"
```

Android debug JS is packaged in the APK (`debuggableVariants = []`). After changing native code, hologram assets, or `viewer.js`, do a **full** `npm run android` (not a Metro-only reload).

Rebuild the Android hologram viewer after editing `src/hologram/androidHologramViewer.ts`:

```bash
npm run bundle:hologram
```

---

## Backend

| Script | Purpose |
|--------|---------|
| `npm run deploy:rules` | Firestore rules |
| `npm run functions:deploy` | Cloud Functions |
| `npm run deploy:backend` | Firestore + Functions |
| `npm run deploy:hosting` | Email-verified / auth-action pages |

Email verification continue URL: `https://wellnessshift-rn-ios.firebaseapp.com/email-verified.html`

---

## Layout

```
App.tsx
src/
  config/          # appConfig, Google / Contentsquare locals
  navigation/      # auth, patient tabs (+ My Care), clinician tabs
  screens/         # auth, home, fitness, insights, analytics, more, clinician
  components/
  services/        # Firebase, AI, HealthKit, Health Connect, IAP, care plans
  hologram/        # Android Three.js USD viewer source
  store/           # Zustand
  theme/
ios/WellnessShift/ # SceneKit holograms, USDZ models, Info.plist
android/app/       # Hologram WebView, google-services.json
functions/         # Firebase Cloud Functions
public/            # Hosting (email-verified.html)
```

---

## Stack

| Area | Choice |
|------|--------|
| State | Zustand |
| Navigation | React Navigation v6 |
| Charts | react-native-gifted-charts |
| Motion | react-native-reanimated |
| Graphics | react-native-svg |
| Local storage | react-native-mmkv |
| iOS health | react-native-health (HealthKit) |
| Android health | react-native-health-connect |
| Subscriptions | react-native-iap |
| Auth extras | Apple + Google Sign-In |

Xcode capabilities already in use: HealthKit, Push Notifications, In-App Purchase, Sign In with Apple.
