# App Store / Play production checklist

Canonical app IDs (must match across Xcode, Android, Firebase, Contentsquare, ASC):

| Platform | ID |
|----------|----|
| iOS Bundle ID | `afras.wellnessshiftrn.ios` |
| Android applicationId | `afras.wellnessshiftrn.android` |

> **Android note:** Java/Kotlin package names must be fully lowercase. `afras.wellnessshiftrn.android` is the valid form of the intended `Afras.WellnessShiftRNAndroid` identifier.

## 1. Firebase

### iOS
1. In the Firebase console → Project settings → Your apps → iOS app, the **Bundle ID** must be `afras.wellnessshiftrn.ios`.
2. Download the updated `GoogleService-Info.plist` and place it at `ios/WellnessShift/GoogleService-Info.plist`. The `BUNDLE_ID` key in the plist must read `afras.wellnessshiftrn.ios`.

### Android
1. In the Firebase console → Project settings → Your apps → Android app, the **Android package name** must be `afras.wellnessshiftrn.android`.
2. Download the updated `google-services.json` and place it at `android/app/google-services.json`. The `package_name` field must read `afras.wellnessshiftrn.android`.

### Both
3. Enable Auth providers you ship (Email, Apple, Google).
4. For Google Sign-In: copy the **Web client ID** into `src/config/googleAuth.local.ts` (see `googleAuth.local.example.ts`). Leave empty to keep Google Sign-In disabled.

## 2. App Store Connect — subscription products

Product IDs must exist in ASC (Subscriptions) and match `src/services/iap.ts`:

| Product ID | Tier | Period |
|------------|------|--------|
| `com.wellnessshift.growth.monthly` | Growth | Monthly |
| `com.wellnessshift.growth.yearly` | Growth | Yearly |
| `com.wellnessshift.pro.monthly` | Pro | Monthly |
| `com.wellnessshift.pro.yearly` | Pro | Yearly |

Checklist:

- [ ] Products created under the ASC app with Bundle ID `afras.wellnessshiftrn.ios`
- [ ] Paid Applications Agreement + banking + tax active
- [ ] Subscription group attached; products Cleared for Sale
- [ ] Sandbox tester can purchase; `getSubscriptions` returns all four (watch Metro `[IAP]` logs)
- [ ] **Do not** market "7-day free trial" in the app unless ASC has a matching introductory offer and StoreKit shows it

Local complimentary preview (`freeTrialService`) is **not** an App Store intro offer.

## 3. Privacy / Terms (website)

In-app disclosures cover HealthKit, IAP, Crashlytics, and Contentsquare session replay (`src/data/legalContent.ts`).

Before review, update https://wellnessshift.co.uk/privacy and `/terms` to the same topics (no placeholder company details). App Review often opens the website URLs from App Store Connect metadata.

## 4. Contentsquare

- Environment IDs: `src/config/contentsquare.local.ts`
- Register **iOS** Bundle ID `afras.wellnessshiftrn.ios` in Contentsquare Apps
- Register **Android** package `afras.wellnessshiftrn.android` in Contentsquare Apps
- iOS Snapshot Capture URL scheme: `cs-afras.wellnessshiftrn.ios`
- Android Snapshot Capture URL scheme: `cs-afras.wellnessshiftrn.android`
- Session replay: auto-start enabled for signed-in users on **iOS and Android** (Profile can opt out); default masking **off** (full UI in replays)
- Console apps must use env `2039001180` with package/bundle IDs above — mismatch = no data
- Confirm Session Replay is enabled for the project in Contentsquare console (Settings → Session Replay)
- Look for `[CSQ] session replay started` / `sessionReplayURL` in Metro logs after sign-in on each platform
- If replays still look masked, check CSQ Console → Data Masking (remote rules can override the app)

## 5. Google Play

Mirror the four product IDs in Play Console subscriptions under the app with package `afras.wellnessshiftrn.android`.
