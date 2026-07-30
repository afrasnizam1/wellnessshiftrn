import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { CSQWebView } from '@contentsquare/react-native-bridge';
import { WebView } from 'react-native-webview';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import { buildSketchfabEmbedUrl } from '../../data/anatomyModels';

type Props = {
  sketchfabId: string;
  height?: number;
  animated?: boolean;
  onFullscreen?: () => void;
};

export default function SketchfabEmbed({ sketchfabId, height = 280, animated, onFullscreen }: Props) {
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <View style={[styles.fallback, { height }]}>
        <Text style={styles.fallbackIcon}>🔄</Text>
        <Text style={styles.fallbackText}>3D viewer unavailable offline</Text>
        {onFullscreen && (
          <TouchableOpacity style={styles.retryBtn} onPress={() => { setFailed(false); setLoading(true); }}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  return (
    <View style={[styles.wrap, { height }]}>
      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loaderText}>Loading 3D model…</Text>
        </View>
      )}
      <CSQWebView>
        <WebView
          source={{ uri: buildSketchfabEmbedUrl(sketchfabId, { animated }) }}
          style={styles.webview}
          onLoadEnd={() => setLoading(false)}
          onError={() => { setLoading(false); setFailed(true); }}
          onHttpError={() => { setLoading(false); setFailed(true); }}
          allowsFullscreenVideo={false}
          allowsInlineMediaPlayback
          mediaPlaybackRequiresUserAction={false}
          javaScriptEnabled
          domStorageEnabled
          scrollEnabled={false}
          bounces={false}
          overScrollMode="never"
          androidHardwareAccelerationDisabled={false}
          originWhitelist={['*']}
          scalesPageToFit={false}
          mixedContentMode="always"
        />
      </CSQWebView>
      {onFullscreen && !loading && (
        <TouchableOpacity style={styles.fullscreenBtn} onPress={onFullscreen}>
          <Text style={styles.fullscreenText}>⛶  Fullscreen</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.hint}>Pinch & drag to explore · Double-tap to focus</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { borderRadius: Radius.xl, overflow: 'hidden', backgroundColor: '#111' },
  webview: { flex: 1, backgroundColor: '#111' },
  loader: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#111',
    zIndex: 2,
    gap: Spacing.sm,
  },
  loaderText: { color: Colors.textSecondary, fontSize: Typography.size.sm },
  fallback: {
    borderRadius: Radius.xl,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  fallbackIcon: { fontSize: 36 },
  fallbackText: { color: Colors.textSecondary, fontSize: Typography.size.sm, textAlign: 'center' },
  retryBtn: {
    marginTop: Spacing.sm,
    backgroundColor: Colors.primary,
    borderRadius: Radius.xl,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
  },
  retryText: { color: Colors.white, fontWeight: '700' },
  fullscreenBtn: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
    backgroundColor: 'rgba(0,0,0,0.55)',
    borderRadius: Radius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
  },
  fullscreenText: { color: Colors.white, fontSize: Typography.size.xs, fontWeight: '700' },
  hint: {
    position: 'absolute',
    bottom: 6,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'rgba(255,255,255,0.65)',
    fontSize: Typography.size.xs,
  },
});
