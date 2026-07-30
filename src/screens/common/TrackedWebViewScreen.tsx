import React, { useCallback, useRef, useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import { CSQWebView } from '@contentsquare/react-native-bridge';
import { WebView } from 'react-native-webview';
import { Colors, Typography, Spacing } from '../../theme';
import AppScreen from '../../components/common/AppScreen';
import type { WebViewScreenParams } from '../../types';
import {
  CSQ_WEBVIEW_BOOTSTRAP_SCRIPT,
  CSQ_WEBVIEW_ENSURE_MODE_SCRIPT,
  CSQ_WEBVIEW_PROBE_DELAYS_MS,
  CSQ_WEBVIEW_PROBE_SCRIPT,
  CSQ_WEBVIEW_REPLAY_PAGEVIEW_SCRIPT,
  urlForContentsquareWebViewTracking,
} from '../../utils/contentsquareWebView';

type TrackedWebViewRoute = RouteProp<Record<string, WebViewScreenParams>, string>;

export default function TrackedWebViewScreen() {
  const navigation = useNavigation();
  const route = useRoute<TrackedWebViewRoute>();
  const { url, title = 'Website' } = route.params;
  const trackingUrl = urlForContentsquareWebViewTracking(url);
  const webViewRef = useRef<WebView>(null);
  const [loading, setLoading] = useState(true);
  const [canGoBack, setCanGoBack] = useState(false);

  const handleBack = () => {
    if (canGoBack) {
      webViewRef.current?.goBack();
      return;
    }
    navigation.goBack();
  };

  const scheduleBridgeProbe = useCallback(() => {
    CSQ_WEBVIEW_PROBE_DELAYS_MS.forEach((delayMs) => {
      setTimeout(() => {
        webViewRef.current?.injectJavaScript(CSQ_WEBVIEW_REPLAY_PAGEVIEW_SCRIPT);
        webViewRef.current?.injectJavaScript(CSQ_WEBVIEW_PROBE_SCRIPT);
      }, delayMs);
    });
  }, []);

  /** CSQWebView registers on loadEnd — ensure webview tag, then re-probe bridge. */
  const handleLoadEnd = useCallback(() => {
    setLoading(false);
    webViewRef.current?.injectJavaScript(CSQ_WEBVIEW_ENSURE_MODE_SCRIPT);
    scheduleBridgeProbe();
  }, [scheduleBridgeProbe]);

  const handleWebViewMessage = useCallback((event: { nativeEvent: { data: string } }) => {
    if (!__DEV__) return;
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data?.type === 'csq_webview_probe') {
        console.log('[CSQ WebView probe]', data);
      }
    } catch {
      // ignore non-JSON messages
    }
  }, []);

  return (
    <AppScreen style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{title}</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.webviewContainer}>
        <CSQWebView>
          <WebView
            ref={webViewRef}
            source={{ uri: trackingUrl }}
            style={styles.webview}
            javaScriptEnabled
            domStorageEnabled
            sharedCookiesEnabled
            webviewDebuggingEnabled={__DEV__}
            startInLoadingState
            allowsInlineMediaPlayback
            injectedJavaScriptBeforeContentLoaded={CSQ_WEBVIEW_BOOTSTRAP_SCRIPT}
            injectedJavaScriptBeforeContentLoadedForMainFrameOnly
            onLoadStart={() => setLoading(true)}
            onLoadEnd={handleLoadEnd}
            onMessage={handleWebViewMessage}
            onNavigationStateChange={(navState) => setCanGoBack(navState.canGoBack)}
          />
        </CSQWebView>

        {loading ? (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color={Colors.primary} />
          </View>
        ) : null}
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backBtn: { width: 40 },
  backText: { fontSize: 32, color: Colors.primary, lineHeight: 38 },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: Typography.size.base,
    fontWeight: '700',
    color: Colors.text,
  },
  headerSpacer: { width: 40 },
  webviewContainer: { flex: 1 },
  webview: { flex: 1, backgroundColor: Colors.white },
  loadingOverlay: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
  },
});
