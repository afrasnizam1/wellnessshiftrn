import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
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
  ...rest
}: Props) {
  const [focused, setFocused] = React.useState(false);
  const [hidden, setHidden] = React.useState(secureToggle ? true : (secureTextEntry ?? false));

  return (
    <View style={styles.wrap}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View
        style={[
          styles.field,
          focused && styles.fieldFocused,
          error ? styles.fieldError : null,
        ]}
      >
        {leftIcon ? (
          <Ionicons name={leftIcon} size={18} color={focused ? Colors.primary : Colors.textTertiary} />
        ) : null}
        <TextInput
          {...rest}
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
          <TouchableOpacity onPress={() => setHidden((v) => !v)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Ionicons
              name={hidden ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={Colors.textTertiary}
            />
          </TouchableOpacity>
        ) : null}
      </View>
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
  },
  error: { fontSize: Typography.size.xs, color: Colors.error, fontWeight: '500' },
  hint: { fontSize: Typography.size.xs, color: Colors.textTertiary },
});
