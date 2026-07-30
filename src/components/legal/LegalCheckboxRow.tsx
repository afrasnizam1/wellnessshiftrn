import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, type ViewStyle } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Typography, Spacing, Radius } from '../../theme';

type Props = {
  checked: boolean;
  onToggle: () => void;
  title: string;
  description?: string;
  style?: ViewStyle;
};

export default function LegalCheckboxRow({
  checked,
  onToggle,
  title,
  description,
  style,
}: Props) {
  return (
    <TouchableOpacity
      style={[styles.row, checked && styles.rowChecked, style]}
      onPress={onToggle}
      activeOpacity={0.85}
    >
      <View style={[styles.box, checked && styles.boxChecked]}>
        {checked ? <Ionicons name="checkmark" size={14} color={Colors.white} /> : null}
      </View>
      <View style={styles.textWrap}>
        <Text style={styles.title}>{title}</Text>
        {description ? <Text style={styles.description}>{description}</Text> : null}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
    padding: Spacing.md,
    borderRadius: Radius.lg,
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  rowChecked: {
    borderColor: Colors.purple,
    backgroundColor: Colors.primaryBg,
  },
  box: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  boxChecked: {
    backgroundColor: Colors.purple,
    borderColor: Colors.purple,
  },
  textWrap: { flex: 1 },
  title: {
    fontSize: Typography.size.sm,
    fontWeight: '700',
    color: Colors.text,
    lineHeight: 20,
  },
  description: {
    fontSize: Typography.size.xs,
    color: Colors.textSecondary,
    marginTop: 4,
    lineHeight: 17,
  },
});
