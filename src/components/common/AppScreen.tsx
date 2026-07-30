import React from 'react';
import { View, StatusBar, StyleSheet, type StatusBarStyle, type ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';
import { Colors, Gradients } from '../../theme';

type Props = {
  children: React.ReactNode;
  edges?: Edge[];
  statusBarStyle?: StatusBarStyle;
  backgroundColor?: string;
  mesh?: boolean;
  style?: ViewStyle;
};

/** Full-bleed screen shell with optional soft gradient mesh background. */
export default function AppScreen({
  children,
  edges = ['top', 'left', 'right'],
  statusBarStyle = 'dark-content',
  backgroundColor = Colors.background,
  mesh = true,
  style,
}: Props) {
  return (
    <View style={[styles.root, { backgroundColor: mesh ? Colors.background : backgroundColor }, style]}>
      <StatusBar barStyle={statusBarStyle} backgroundColor="transparent" translucent />
      {mesh && (
        <LinearGradient
          colors={[...Gradients.mesh]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
          pointerEvents="none"
        />
      )}
      <SafeAreaView style={styles.safe} edges={edges}>
        {children}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  safe: { flex: 1 },
});
