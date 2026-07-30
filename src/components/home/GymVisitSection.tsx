import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Typography, Spacing, Radius } from '../../theme';

interface Props {
  gymVisitToday: boolean | null | undefined;
  onSelect: (visited: boolean) => void;
}

export default function GymVisitSection({ gymVisitToday, onSelect }: Props) {
  return (
    <View style={[styles.container, gymVisitToday === true && styles.containerDone]}>
      <View style={styles.header}>
        <Text style={styles.icon}>{gymVisitToday === true ? '✅' : '🏋️'}</Text>
        <Text style={styles.title}>Have you been to the gym today?</Text>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={[styles.button, gymVisitToday === true && styles.buttonActive]}
          onPress={() => onSelect(true)}
        >
          <Text style={[styles.buttonText, gymVisitToday === true && styles.buttonTextActive]}>
            Yes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, gymVisitToday === false && styles.buttonActive]}
          onPress={() => onSelect(false)}
        >
          <Text style={[styles.buttonText, gymVisitToday === false && styles.buttonTextActive]}>
            Not yet
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: Radius.md,
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  containerDone: { backgroundColor: Colors.success + '18' },
  header: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  icon: { fontSize: 22 },
  title: { flex: 1, fontSize: Typography.size.base, fontWeight: '600', color: Colors.text },
  buttons: { flexDirection: 'row', gap: Spacing.sm },
  button: {
    flex: 1,
    borderRadius: Radius.md,
    paddingVertical: Spacing.sm,
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  buttonActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  buttonText: { fontSize: Typography.size.sm, fontWeight: '600', color: Colors.text },
  buttonTextActive: { color: Colors.white },
});
