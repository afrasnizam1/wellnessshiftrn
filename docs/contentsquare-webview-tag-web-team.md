# ContentSquare WebView tag — implementation guide for web team

**Audience:** Web platform team (wellnessshift.co.uk)  
**Mobile app:** WellnessShift React Native (iOS + Android)  
**Purpose:** Route in-app WebView interactions into the **mobile Apps** session replay, without breaking normal browser tracking.

---

## Context

The mobile app loads `https://wellnessshift.co.uk` inside an in-app WebView wrapped with ContentSquare’s `CSQWebView` component. That registers the WebView with the **native SDK** and injects a JavaScript bridge.

**`CSQWebView` alone is not enough.** The website must load the ContentSquare tag in **WebView mode** so clicks, pageviews, and replay data are forwarded to the native SDK instead of (or in addition to) a standalone browser session.

References:
- [Mobile Apps WebView tracking tag](https://docs.contentsquare.com/en/webview-tracking-tag/)
- [React Native — Track WebViews](https://docs.contentsquare.com/en/csq-sdk-react-native/experience-analytics/track-webviews/)

---

## IDs — please read carefully

| ID | Owner | Used for | Example / placeholder |
|----|--------|----------|------------------------|
| **Web tag ID** | Web team (existing) | Normal browser traffic on wellnessshift.co.uk | `4ca4c4362b680` (web project **743584**) |
| **WebView tag ID** | ContentSquare + mobile | Pages loaded inside the WellnessShift app WebView | `2095fc2d6ccd8` (Apps-linked, project **745996**) |
| **Apps environment ID** | Mobile team | Native SDK only — **not inserted in the web tag** | `2039001180` |

**Do not** put the mobile Apps environment ID (`2039001180`) in the web tag script URL.  
ContentSquare must provision a separate **WebView tag ID** linked to Apps project `2039001180`. Ask your ContentSquare CSM/support for this if you don’t have it yet.

---

## What the mobile app already does

- Native SDK started with Apps environment ID `2039001180`
- WebView wrapped in `CSQWebView` (registers WebView + bridge)
- WebView user agent includes `CS_WebView` (used for detection below)

---

## Required web-side behaviour

When the page runs inside the app WebView:

1. Detect WebView context
2. Push `["setOption", "isWebView", true]`
3. Load the **WebView tag ID** script (not the normal browser tag)
4. Call **`trackPageview`** before or as the tag loads (mandatory)

When the page runs in a normal browser, keep using your existing web tag unchanged.

---

## Option A — Google Tag Manager (Custom HTML)

**Tag type:** Custom HTML  
**Trigger:** All Pages (or equivalent — must fire on first load in WebView)

Replace the two placeholders, then paste:

```html
<script>
(function () {
  window._uxa = window._uxa || [];

  // --- CONFIG: replace these two values ---
  var WEB_TAG_ID = '4ca4c4362b680';           // browser — web project 743584
  var WEBVIEW_TAG_ID = '2095fc2d6ccd8';       // in-app WebView — linked to Apps 2039001180
  // ----------------------------------------

  function isInAppWebView() {
    return (
      (navigator.userAgent && navigator.userAgent.indexOf('CS_WebView') !== -1) ||
      typeof CSJavascriptBridge !== 'undefined' ||
      window.CS_isWebView === true
    );
  }

  var tagId = WEB_TAG_ID;
  var inWebView = isInAppWebView();

  if (inWebView) {
    window._uxa.push(['setOption', 'isWebView', true]);
    tagId = WEBVIEW_TAG_ID;
  }

  // Mandatory for WebView tracking — also fine for browser
  window._uxa.push([
    'trackPageview',
    window.location.pathname + window.location.hash.replace('#', '?__')
  ]);

  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.src = 'https://t.contentsquare.net/uxa/' + tagId + '.js';
  document.head.appendChild(script);

  // Optional: dev-only logging (remove in production or gate behind a query flag)
  if (inWebView && window.location.search.indexOf('csq_debug=1') !== -1) {
    console.log('[CSQ WebView] in-app WebView detected, tagId:', tagId);
  }
})();
</script>
```

### If you already have a ContentSquare GTM tag

- **Update** the existing implementation to branch on WebView detection — do **not** add a second tag that always loads the browser script.
- Ensure only **one** ContentSquare script loads per page view.

---

## Option B — Manual injection (every page `<head>` or shared layout)

Same logic as GTM; place before `</head>`:

```html
<script type="text/javascript">
(function () {
  window._uxa = window._uxa || [];

  var WEB_TAG_ID = '4ca4c4362b680';
  var WEBVIEW_TAG_ID = '2095fc2d6ccd8';

  function isInAppWebView() {
    return (
      (navigator.userAgent && navigator.userAgent.indexOf('CS_WebView') !== -1) ||
      typeof CSJavascriptBridge !== 'undefined' ||
      window.CS_isWebView === true
    );
  }

  var tagId = WEB_TAG_ID;

  if (isInAppWebView()) {
    window._uxa.push(['setOption', 'isWebView', true]);
    tagId = WEBVIEW_TAG_ID;
  }

  window._uxa.push([
    'trackPageview',
    window.location.pathname + window.location.hash.replace('#', '?__')
  ]);

  var mt = document.createElement('script');
  mt.type = 'text/javascript';
  mt.async = true;
  mt.src = 'https://t.contentsquare.net/uxa/' + tagId + '.js';
  document.getElementsByTagName('head')[0].appendChild(mt);
})();
</script>
```

---

## Single-page apps (React / client-side routing)

If navigation does not trigger a full page reload, fire an **artificial pageview** on each route change **when in WebView**:

```javascript
function csqWebViewPageview() {
  if (!window._uxa) return;
  window._uxa.push([
    'trackPageview',
    window.location.pathname + window.location.hash.replace('#', '?__')
  ]);
}

// Example: call csqWebViewPageview() after each client-side route change
// when isInAppWebView() is true
```

Coordinate with mobile on whether wellnessshift.co.uk is MPA or SPA.

---

## Validation checklist

### 1. ContentSquare account

- [ ] WebView tag ID provisioned and linked to Apps project **2039001180**
- [ ] Session Replay enabled on the Apps project

### 2. Web implementation

- [ ] WebView branch sets `isWebView: true`
- [ ] WebView branch uses **WebView tag ID**, not browser tag ID
- [ ] `trackPageview` runs on initial load (and on SPA navigations if applicable)
- [ ] No duplicate ContentSquare tags firing on the same page

### 3. End-to-end test (with mobile team)

1. Mobile: open **More → WellnessShift Website** in the app (not Safari/Chrome).
2. Mobile: confirm native logs (dev build) show WebView registered, then **CSJavascriptBridge detected**.
3. Web: in WebView dev tools (if available), confirm `window._uxa` exists and user agent contains `CS_WebView`.
4. Apps dashboard: in session replay for the **mobile Apps project**, look for events with web/DOM targets (e.g. paths containing `|webview|`).

### 4. What success looks like in native logs (iOS example)

```
[WebView] Registering WebView on native side for page: https://wellnessshift.co.uk/ ...
[WebView] CSJavascriptBridge is detected on page: ...
[WebView JS log] (TAG_CONFIGURATION) ...
Screenview - Screen name: "..." ...
Tap - Target: ...|webview|...
```

If you see “Waiting for Web Tracking Tag messages…” but never “CSJavascriptBridge is detected”, the web tag is not running in WebView mode.

---

## Privacy / masking

WebView personal data masking is handled on the **web** side per ContentSquare web documentation. Apply the same masking rules you use on the public site when `isWebView` is true.

---

## Contacts

| Team | Action |
|------|--------|
| **ContentSquare** | WebView tag `2095fc2d6ccd8` linked to Apps env `2039001180` |
| **Web** | Implement tag branch + `trackPageview` (this doc) |
| **Mobile** | `CSQWebView` + native SDK opt-in (already implemented) |

---

## Email template (copy/paste)

**Subject:** ContentSquare WebView tag — action needed for in-app website tracking

Hi team,

We’ve integrated ContentSquare on the WellnessShift mobile app and load wellnessshift.co.uk in an in-app WebView using `CSQWebView`. To get web interactions into our **mobile session replay**, we need a small change on the web tag side.

**What we need from ContentSquare (if not done yet):** a WebView tag ID linked to our Apps project environment **2039001180** (separate from our existing browser web tag).

**What we need from web:** update the ContentSquare tag (GTM or manual) to:
1. Detect in-app WebView (`CS_WebView` in user agent, `CSJavascriptBridge`, or `window.CS_isWebView`)
2. Set `window._uxa.push(["setOption", "isWebView", true])`
3. Load the **WebView tag ID** (not the normal browser tag) when in WebView
4. Call `trackPageview` on load (mandatory)

Full implementation snippet: see `docs/contentsquare-webview-tag-web-team.md` in the mobile repo (or attached).

We do **not** need you to use our native environment ID in the tag — only the WebView tag ID from ContentSquare.

Happy to pair on validation once deployed.

Thanks,
