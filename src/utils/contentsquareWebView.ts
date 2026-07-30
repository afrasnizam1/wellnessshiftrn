/** Mirrors native iOS WebsiteView.swift — must run before the site inline CS tag. */
export const CSQ_WEBVIEW_BOOTSTRAP_SCRIPT = `
  (function () {
    window.isWebView = true;
    window.CS_isWebView = true;
    try { sessionStorage.setItem('cs_isWebView', '1'); } catch (e) {}
  })();
  true;
`;

/**
 * If the first load still picked browser mode, force ?isWebView=1 once and reload
 * so the site loads tag 2095fc2d6ccd8 instead of 4ca4c4362b680.
 */
export const CSQ_WEBVIEW_ENSURE_MODE_SCRIPT = `
  (function () {
    try {
      if (window.__csqWebViewEnsured) return;
      var u = new URL(window.location.href);
      var hasParam = u.searchParams.get('isWebView') === '1' || u.searchParams.get('isWebView') === 'true';
      var inWebViewMode = window.CS_isWebView === true || sessionStorage.getItem('cs_isWebView') === '1';
      if (hasParam && inWebViewMode) return;
      window.__csqWebViewEnsured = true;
      window.isWebView = true;
      window.CS_isWebView = true;
      sessionStorage.setItem('cs_isWebView', '1');
      if (!hasParam) {
        u.searchParams.set('isWebView', '1');
        window.location.replace(u.toString());
      }
    } catch (e) {}
  })();
  true;
`;

/**
 * Re-fire trackPageview after CSQWebView registers on loadEnd.
 * RN registers the bridge after the page loads; the site tag may have already
 * run its initial pageview before CSJavascriptBridge exists (Swift registers before load).
 */
export const CSQ_WEBVIEW_REPLAY_PAGEVIEW_SCRIPT = `
  (function () {
    try {
      if (window._uxa) {
        window._uxa.push([
          'trackPageview',
          window.location.pathname + window.location.search + window.location.hash
        ]);
      }
    } catch (e) {}
    true;
  })();
`;

/** Dev probe — posts bridge status to React Native via onMessage. */
export const CSQ_WEBVIEW_PROBE_SCRIPT = `
  (function () {
    try {
      var payload = {
        type: 'csq_webview_probe',
        cs_isWebView: window.CS_isWebView === true,
        hasUxa: !!window._uxa,
        bridge: typeof CSJavascriptBridge,
        href: window.location.href,
        ua: navigator.userAgent
      };
      window.ReactNativeWebView && window.ReactNativeWebView.postMessage(JSON.stringify(payload));
    } catch (e) {}
    true;
  })();
`;

export const CSQ_WEBVIEW_PROBE_DELAYS_MS = [300, 1000, 2500];

/** Appends isWebView=1 so GTM / the site tag can branch into WebView mode. */
export function urlForContentsquareWebViewTracking(url: string): string {
  try {
    const parsed = new URL(url);
    if (!parsed.searchParams.has('isWebView')) {
      parsed.searchParams.set('isWebView', '1');
    }
    return parsed.toString();
  } catch {
    return url;
  }
}
