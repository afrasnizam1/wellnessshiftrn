# Website privacy updates (paste into CMS)

The app repo cannot edit https://wellnessshift.co.uk. Paste these replacements into your privacy (and AI transparency) pages so they match `src/data/legalContent.ts`.

## 1. Age policy

**Replace** any “13–16 / parental consent” wording **with:**

> You must be at least 16 years old to create an App account. The App is not directed at children under 16. If you believe we have collected data from someone under 16, contact support@wellnessshift.co.uk and we will delete it.

## 2. Crash reporting & analytics (Contentsquare)

**Replace** “Contentsquare … on by default …” **with:**

> Firebase Crashlytics: collects crash stacks, device model, OS version, and related diagnostics so we can fix stability issues. Crash reports are not used for advertising.
>
> Contentsquare analytics and session replay are off by default. Collection starts only if you turn on “Allow analytics” in Profile. When enabled, we may collect screen views, interaction events, and session replay of the app UI (with default masking). You can turn analytics off anytime in Profile.

## 3. AI / Wellness Coach

**Replace** “AI Health Coach generates educational wellness insights…” **with:**

> The App’s Wellness Coach provides rule-based lifestyle guidance based on your profile and messages — not a generative AI model. Outputs are for education only, are not medical advice, and never replace a GP. See the in-app Wellness Coach / AI Disclosure for details.

Also update any standalone **AI transparency** page to say **Wellness Coach** + **rule-based**, not generative AI.

## 4. Embedded in-app privacy block

If the site mirrors the in-app policy, sync sections from `PRIVACY_SECTIONS` in `src/data/legalContent.ts` (especially analytics §7 and Wellness Coach §9).
