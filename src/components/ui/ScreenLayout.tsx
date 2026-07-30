import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  type ViewStyle,
  type RefreshControlProps,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import type { Edge } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppScreen from '../common/AppScreen';
import ScreenHeader from './ScreenHeader';
import { Spacing } from '../../theme';

type Action = {
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  color?: string;
};

type Props = {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  onBack?: () => void;
  backLabel?: string;
  rightLabel?: string;
  onRightPress?: () => void;
  rightDisabled?: boolean;
  actions?: Action[];
  scroll?: boolean;
  padded?: boolean;
  keyboardAvoid?: boolean;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  contentContainerStyle?: ViewStyle;
  refreshControl?: React.ReactElement<RefreshControlProps>;
  edges?: Edge[];
  animate?: boolean;
};

/** Unified screen shell — replaces SafeAreaView + StatusBar + header boilerplate. */
export default function ScreenLayout({
  children,
  title,
  subtitle,
  onBack,
  backLabel,
  rightLabel,
  onRightPress,
  rightDisabled,
  actions,
  scroll = true,
  padded = true,
  keyboardAvoid = false,
  header,
  footer,
  contentContainerStyle,
  refreshControl,
  edges,
  animate = true,
}: Props) {
  const headerNode = header ?? (title ? (
    <ScreenHeader
      title={title}
      subtitle={subtitle}
      onBack={onBack}
      backLabel={backLabel}
      rightLabel={rightLabel}
      onRightPress={onRightPress}
      rightDisabled={rightDisabled}
      actions={actions}
    />
  ) : null);

  const content = (
    <>
      {headerNode ? (
        <View style={styles.headerPad}>{headerNode}</View>
      ) : null}
      <Animated.View entering={animate ? FadeInDown.duration(320).springify() : undefined}>
        {children}
      </Animated.View>
      {footer}
    </>
  );

  const inner = scroll ? (
    <ScrollView
      style={styles.flex}
      contentContainerStyle={[padded && styles.scrollContent, contentContainerStyle]}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      refreshControl={refreshControl}
    >
      {content}
    </ScrollView>
  ) : (
    <View style={[styles.flex, padded && styles.pad]}>{content}</View>
  );

  const shell = keyboardAvoid ? (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {inner}
    </KeyboardAvoidingView>
  ) : (
    inner
  );

  return <AppScreen edges={edges}>{shell}</AppScreen>;
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  pad: { paddingHorizontal: Spacing.base },
  headerPad: {
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.xs,
  },
  scrollContent: { paddingBottom: Spacing['2xl'], flexGrow: 1 },
});
