import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { AUTH_BACKGROUND } from '../../theme/authTheme';
import { Colors, Typography } from '../../theme';

type Props = {
  message?: string;
};

/** Matches native AuthView ProgressView("Loading your profile...") */
export default function AppLoadingScreen({ message = 'Loading your profile...' }: Props) {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={Colors.white} size="large" />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AUTH_BACKGROUND,
    gap: 16,
    paddingHorizontal: 24,
  },
  message: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: Typography.size.base,
    fontWeight: '500',
    textAlign: 'center',
  },
});
