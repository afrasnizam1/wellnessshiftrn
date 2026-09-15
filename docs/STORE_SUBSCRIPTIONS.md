# Subscription products — ASC + Play (manual console)

IDs must match `src/services/iap.ts` exactly.

| Product ID | Tier | Period | Suggested display name |
|------------|------|--------|------------------------|
| `com.wellnessshift.growth.monthly` | Growth | Monthly | Wellness Shift Growth (Monthly) |
| `com.wellnessshift.growth.yearly` | Growth | Yearly | Wellness Shift Growth (Yearly) |
| `com.wellnessshift.pro.monthly` | Pro | Monthly | Wellness Shift Pro (Monthly) |
| `com.wellnessshift.pro.yearly` | Pro | Yearly | Wellness Shift Pro (Yearly) |

## App Store Connect

1. Agreements, Tax, and Banking → Paid Applications active.
2. App (`afras.wellnessshiftrn.ios`) → Subscriptions → create group **Wellness Shift Premium**.
3. Add all four products (EN-GB), pricing, **Cleared for Sale**.
4. Attach the group to the version you submit.
5. Users and Access → Sandbox → create Sandbox Apple ID.
6. On device: Paywall purchase → Metro should log `[IAP] All subscription product IDs resolved`.
7. Restore after reinstall / sign-out of subscription.

## Google Play Console

1. App (`afras.wellnessshiftrn.android`) → Monetize → Subscriptions.
2. Create the same four product IDs (base plans monthly/yearly as appropriate).
3. Activate; license-test with a license tester account.
4. Enroll **Play App Signing**; upload AAB signed with `android/upload-keystore.jks` (see `scripts/create-android-upload-keystore.sh`).

## After console setup

Mark the checkboxes in `docs/APP_STORE_SETUP.md` §§2 and 8.

This cannot be automated from the app repo without App Store Connect API / Play Console API credentials.
