import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Platform, requireNativeComponent, type ViewStyle } from 'react-native';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import type { HologramPreset } from '../../data/anatomyModels';

type NativeProps = {
  modelFile: string;
  preset: HologramPreset;
  style?: ViewStyle;
};

const NativeHologramSceneView = Platform.OS === 'ios'
  ? requireNativeComponent<NativeProps>('HologramSceneView')
  : null;

type Props = {
  modelFile: string;
  preset: HologramPreset;
  height?: number;
};

/** Native SceneKit hologram viewer — uses the same USDZ assets as the iOS native app. */
export default function HologramViewer({ modelFile, preset, height = 300 }: Props) {
  if (Platform.OS === 'ios' && NativeHologramSceneView) {
    const SceneView = NativeHologramSceneView;
    return (
      <View style={[styles.wrap, { height }]}>
        <SceneView
          modelFile={modelFile}
          preset={preset}
          style={styles.nativeView}
        />
        <View style={styles.hintBar}>
          <Text style={styles.hint}>Pinch & drag to rotate · Double-tap to reset</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.fallback, { height }]}>
      <Text style={styles.fallbackIcon}>🧬</Text>
      <Text style={styles.fallbackTitle}>Native hologram model</Text>
      <Text style={styles.fallbackText}>
        This 3D anatomy hologram uses the same USDZ assets as the native iOS app and is available on iPhone and iPad.
      </Text>
      <ActivityIndicator color={Colors.primary} style={{ marginTop: Spacing.sm }} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderRadius: Radius.xl,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  nativeView: {
    flex: 1,
    backgroundColor: '#000',
  },
  hintBar: {
    backgroundColor: '#000',
    paddingBottom: 6,
    paddingTop: 2,
  },
  hint: {
    textAlign: 'center',
    color: 'rgba(255,255,255,0.65)',
    fontSize: Typography.size.xs,
  },
  fallback: {
    borderRadius: Radius.xl,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.lg,
    gap: Spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  fallbackIcon: { fontSize: 36 },
  fallbackTitle: {
    color: Colors.white,
    fontSize: Typography.size.base,
    fontWeight: '700',
    textAlign: 'center',
  },
  fallbackText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: Typography.size.sm,
    textAlign: 'center',
    lineHeight: 20,
  },
});
