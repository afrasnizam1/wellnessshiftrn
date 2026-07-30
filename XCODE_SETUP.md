# WellnessShift — Complete Xcode Setup Guide

Everything you need to go from the zip file to a running app in Xcode.
Follow these steps in order.

---

## Prerequisites

Install these before starting:

```bash
# Node.js 18+
brew install node

# Watchman (React Native file watcher)
brew install watchman

# CocoaPods
sudo gem install cocoapods

# React Native CLI
npm install -g react-native-cli @react-native/cli

# Xcode 15+ from the Mac App Store (free)
# Command Line Tools:
xcode-select --install
```

---

## Step 1 — Initialise the React Native project

```bash
# Create the RN project shell (generates the ios/ and android/ folders)
npx react-native@0.73.6 init WellnessShiftApp --template react-native-template-typescript --version 0.73.6

# ⚠️  This creates a NEW folder called WellnessShiftApp.
#     Copy your src/, App.tsx, babel.config.js, tsconfig.json into it:
cp -r /path/to/WellnessShift/src  WellnessShiftApp/
cp /path/to/WellnessShift/App.tsx  WellnessShiftApp/
cp /path/to/WellnessShift/babel.config.js  WellnessShiftApp/
cp /path/to/WellnessShift/tsconfig.json  WellnessShiftApp/
cp /path/to/WellnessShift/package.json  WellnessShiftApp/

cd WellnessShiftApp
npm install
```

---

## Step 2 — Copy iOS config files

```bash
# Copy pre-built config files from ios-config/ into the ios/ folder
cp ios-config/WellnessShift/Info.plist              ios/WellnessShift/Info.plist
cp ios-config/WellnessShift/WellnessShift.entitlements  ios/WellnessShift/WellnessShift.entitlements
cp ios-config/WellnessShift/AppDelegate.swift        ios/WellnessShift/AppDelegate.swift
cp ios-config/WellnessShift/LaunchScreen.storyboard  ios/WellnessShift/LaunchScreen.storyboard
cp ios-config/WellnessShift/AnatomyViewerModule.swift  ios/WellnessShift/AnatomyViewerModule.swift
cp ios-config/WellnessShift/AnatomyViewerModule.m    ios/WellnessShift/AnatomyViewerModule.m
cp ios-config/Podfile                                ios/Podfile
```

---

## Step 3 — Firebase setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project called **WellnessShift** (or use existing)
3. Add an **iOS app**:
   - Bundle ID: `com.wellnessshift.app` (or your own)
   - App nickname: WellnessShift
4. Download `GoogleService-Info.plist`
5. **Drag it into Xcode** under `ios/WellnessShift/` — make sure "Add to target: WellnessShift" is checked

### Enable Firebase services:
In the Firebase Console, enable:
- **Authentication** → Sign-in methods: Email/Password, Apple, Google
- **Cloud Firestore** → Create database → Start in production mode
- **Cloud Functions** → Enable (for AI proxy)
- **Cloud Messaging** → Enable
- **Remote Config** → Enable
- **Crashlytics** → Enable
- **App Check** → Enable with App Attest

---

## Step 4 — Google Sign In setup

1. In Firebase Console → Authentication → Sign-in methods → Google → Enable
2. Copy your **Web client ID** from the Google provider settings
3. Open `App.tsx` and replace:
   ```ts
   setupGoogleSignIn('YOUR_WEB_CLIENT_ID.apps.googleusercontent.com');
   ```
4. In `ios-config/WellnessShift/Info.plist`, replace:
   ```xml
   <string>com.googleusercontent.apps.YOUR_CLIENT_ID</string>
   ```
   with the `REVERSED_CLIENT_ID` value from your `GoogleService-Info.plist`

---

## Step 5 — Apple Sign In setup

1. In [Apple Developer Console](https://developer.apple.com) → Identifiers → your App ID
2. Enable **Sign In with Apple** capability
3. In Xcode → your target → Signing & Capabilities → + Capability → **Sign In with Apple**

---

## Step 6 — Add Capabilities in Xcode

Open `ios/WellnessShift.xcworkspace` in Xcode.

Select your target → **Signing & Capabilities** → click **+** and add:

| Capability | Notes |
|---|---|
| **HealthKit** | Check "Clinical Health Records" if needed |
| **Push Notifications** | Required for FCM |
| **In-App Purchase** | For StoreKit subscriptions |
| **Sign In with Apple** | For Apple auth |
| **Associated Domains** | Add `applinks:wellnessshift.co.uk` |
| **App Attest** | For Firebase App Check |

---

## Step 7 — App Store Connect subscription products

1. Go to [App Store Connect](https://appstoreconnect.apple.com)
2. Your App → In-App Purchases → Create 4 subscriptions:

| Product ID | Type | Price |
|---|---|---|
| `com.wellnessshift.growth.monthly` | Auto-Renewable | £6.99 |
| `com.wellnessshift.growth.yearly` | Auto-Renewable | £59.99 |
| `com.wellnessshift.pro.monthly` | Auto-Renewable | £8.99 |
| `com.wellnessshift.pro.yearly` | Auto-Renewable | £79.99 |

3. Set review screenshots and descriptions for each
4. Create a **Subscription Group** called "WellnessShift Premium"

---

## Step 8 — Add the AnatomyViewer files to Xcode

1. In Xcode, right-click `WellnessShift` group → **Add Files to "WellnessShift"**
2. Select `AnatomyViewerModule.swift` and `AnatomyViewerModule.m`
3. Make sure "Add to target: WellnessShift" is checked
4. If prompted to create a bridging header, click **Create Bridging Header**
5. In the bridging header, add:
   ```objc
   #import <React/RCTBridgeModule.h>
   ```
6. Add your 3D model assets (.scn or .usdz files) to the project bundle

---

## Step 9 — Firebase Cloud Functions (AI proxy)

Deploy the OpenAI proxy function:

```bash
npm install -g firebase-tools
firebase login
firebase init functions  # choose TypeScript

# In functions/src/index.ts:
```

```typescript
import * as functions from 'firebase-functions';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: functions.config().openai.key });

export const openAIChat = functions.https.onCall(async (data, context) => {
  if (!context.auth) throw new functions.https.HttpsError('unauthenticated', 'Login required');
  const { messages, context: wellnessContext } = data;

  const systemPrompt = `You are an AI Health Coach for Wellness Shift, a UK wellness app.
You provide evidence-based, personalised wellness guidance.
${wellnessContext ? `The user's current wellness score is ${wellnessContext.overallScore}/10.` : ''}
Always recommend seeing a GP for medical concerns. Never diagnose conditions.
Keep responses concise and actionable.`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'system', content: systemPrompt }, ...messages],
    max_tokens: 400,
  });

  return { reply: response.choices[0].message.content };
});

export const generateInsights = functions.https.onCall(async (data, context) => {
  if (!context.auth) throw new functions.https.HttpsError('unauthenticated', 'Login required');
  // Generate AI insights based on wellness score
  // ... implement based on your needs
  return { insights: [] };
});
```

```bash
# Set your OpenAI API key
firebase functions:config:set openai.key="sk-your-key-here"

# Deploy
firebase deploy --only functions
```

---

## Step 10 — Install pods and run

```bash
cd ios
pod install
cd ..

# Run on simulator
npx react-native run-ios

# Run on physical device (must have Apple Developer account)
npx react-native run-ios --device "Your iPhone Name"
```

---

## Step 11 — Push notifications on device

Push notifications only work on a **physical device**, not the simulator.

1. In Xcode → Signing & Capabilities → Push Notifications (already added in Step 6)
2. In Firebase Console → Project Settings → Cloud Messaging → iOS app
3. Upload your **APNs Auth Key** (from Apple Developer → Keys → Create key with Push Notifications)
4. Enter your Team ID and Key ID

---

## Step 12 — Firestore security rules

In Firebase Console → Firestore → Rules, replace with:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;

      match /wellnessScores/{scoreId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
      match /dailyPlans/{planId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
      match /carePlans/{planId} {
        allow read: if request.auth != null &&
          (request.auth.uid == userId ||
           resource.data.clinicianId == request.auth.uid);
        allow write: if request.auth != null &&
          resource.data.clinicianId == request.auth.uid;
      }
    }

    // Message threads — both patient and clinician can read/write
    match /messageThreads/{threadId} {
      allow read, write: if request.auth != null &&
        threadId.matches('.*' + request.auth.uid + '.*');
      match /messages/{messageId} {
        allow read, write: if request.auth != null &&
          get(/databases/$(database)/documents/messageThreads/$(threadId)).data.keys().hasAny([request.auth.uid]);
      }
    }

    // Invite codes — clinicians write, patients read
    match /inviteCodes/{code} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
  }
}
```

---

## Common issues

**`pod install` fails:**
```bash
sudo gem install cocoapods
pod repo update
cd ios && pod install --repo-update
```

**`react-native run-ios` fails with signing error:**
- Open `ios/WellnessShift.xcworkspace` in Xcode
- Select your team under Signing & Capabilities
- Change bundle ID to something unique: `com.yourname.wellnessshift`

**Firebase not initialising:**
- Make sure `GoogleService-Info.plist` is in the Xcode project (not just the folder)
- Right-click in Xcode → Add Files → select the plist

**HealthKit entitlement error:**
- Confirm HealthKit capability is added in Xcode
- Confirm `Info.plist` has both HealthKit usage strings

**`react-native-reanimated` crash:**
- Add to `babel.config.js` plugins (already done): `'react-native-reanimated/plugin'`
- Clean build: `cd ios && xcodebuild clean && cd ..`

---

## Build for TestFlight

```bash
# In Xcode:
# 1. Set scheme to Release: Product → Scheme → Edit Scheme → Run → Release
# 2. Select "Any iOS Device (arm64)" as destination
# 3. Product → Archive
# 4. In Organiser → Distribute App → App Store Connect → Upload
```

---

## Contentsquare integration

Add to `AppDelegate.swift` after `FirebaseApp.configure()`:

```swift
// import Contentsquare
// Contentsquare.start(withKey: "YOUR_CS_KEY")
```

And in `package.json`, add `@contentsquare/react-native` when available.

---

*Setup complete. For support: support@wellnessshift.co.uk*
