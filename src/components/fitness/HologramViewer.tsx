import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Platform, requireNativeComponent, type ViewStyle } from 'react-native';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import type { HologramPreset } from '../../data/anatomyModels';

type NativeProps = {
  modelFile: string;
  preset: HologramPreset;
  style?: ViewStyle;
};

const NativeHologramSceneView = requireNativeComponent<NativeProps>('HologramSceneView');

type Props = {
  modelFile: string;
  preset: HologramPreset;
  height?: number;
};

/** Native SceneKit (iOS) / Three.js USD viewer (Android) — same USDZ assets. */
export default function HologramViewer({ modelFile, preset, height = 300 }: Props) {
  if (!NativeHologramSceneView) {
    return (
      <View style={[styles.fallback, { height }]}>
        <Text style={styles.fallbackIcon}>🧬</Text>
        <Text style={styles.fallbackTitle}>3D hologram</Text>
        <Text style={styles.fallbackText}>This anatomy model could not be loaded on this device.</Text>
        <ActivityIndicator color={Colors.primary} style={{ marginTop: Spacing.sm }} />
      </View>
    );
  }

  return (
    <View style={[styles.wrap, { height }]}>
      <NativeHologramSceneView
        modelFile={modelFile}
        preset={preset}
        style={styles.nativeView}
      />
      {Platform.OS === 'ios' ? (
        <View style={styles.hintBar}>
          <Text style={styles.hint}>Pinch & drag to rotate · Double-tap to reset</Text>
        </View>
      ) : null}
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
