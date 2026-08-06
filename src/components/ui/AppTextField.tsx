import React, { useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Platform,
  type TextInputProps,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../theme';

type Props = TextInputProps & {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  secureToggle?: boolean;
};

export default function AppTextField({
  label,
  error,
  hint,
  leftIcon,
  secureToggle,
  secureTextEntry,
  style,
  onFocus,
  onBlur,
  editable = true,
  ...rest
}: Props) {
  const [focused, setFocused] = React.useState(false);
  const [hidden, setHidden] = React.useState(secureToggle ? true : (secureTextEntry ?? false));
  const inputRef = useRef<TextInput>(null);

  const focusInput = () => {
    if (editable === false) return;
    inputRef.current?.focus();
  };

  return (
    <View style={styles.wrap} pointerEvents="box-none">
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <Pressable
        onPress={focusInput}
        style={[
          styles.field,
          focused && styles.fieldFocused,
          error ? styles.fieldError : null,
        ]}
        accessibilityRole="none"
      >
        {leftIcon ? (
          <Ionicons name={leftIcon} size={18} color={focused ? Colors.primary : Colors.textTertiary} />
        ) : null}
        <TextInput
          ref={inputRef}
          {...rest}
          editable={editable}
          style={[styles.input, style]}
          placeholderTextColor={Colors.textTertiary}
          secureTextEntry={secureToggle ? hidden : secureTextEntry}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
        />
        {secureToggle ? (
          <TouchableOpacity
            onPress={() => setHidden((v) => !v)}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            accessibilityRole="button"
            accessibilityLabel={hidden ? 'Show password' : 'Hide password'}
          >
            <Ionicons
              name={hidden ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={Colors.textTertiary}
            />
          </TouchableOpacity>
        ) : null}
      </Pressable>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {hint && !error ? <Text style={styles.hint}>{hint}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: Spacing.xs },
  label: {
    fontSize: Typography.size.sm,
    fontWeight: '600',
    color: Colors.text,
    letterSpacing: -0.1,
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    borderWidth: 1.5,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.base,
    paddingVertical: Platform.OS === 'ios' ? 13 : 12,
    ...Shadow.sm,
  },
  fieldFocused: {
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
    ...Shadow.md,
  },
  fieldError: {
    borderColor: Colors.error,
    backgroundColor: Colors.errorLight,
  },
  input: {
    flex: 1,
    fontSize: Typography.size.base,
    color: Colors.text,
    padding: 0,
    margin: 0,
    minHeight: Platform.OS === 'ios' ? 22 : 24,
  },
  error: { fontSize: Typography.size.xs, color: Colors.error, fontWeight: '500' },
  hint: { fontSize: Typography.size.xs, color: Colors.textTertiary },
});
