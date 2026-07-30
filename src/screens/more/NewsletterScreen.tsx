import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import { ScreenHeader } from '../../components/ui';
import { useAppStore } from '../../store';
import AppScreen from '../../components/common/AppScreen';

export default function NewsletterScreen() {
  const navigation = useNavigation<any>();
  const { user } = useAppStore();
  const [email, setEmail] = useState(user?.email ?? '');
  const [subscribed, setSubscribed] = useState(false);

  const subscribe = () => {
    if (!email.includes('@')) {
      Alert.alert('Invalid email', 'Please enter a valid email address.');
      return;
    }
    setSubscribed(true);
    Alert.alert('Subscribed!', 'Weekly wellness tips will be sent to ' + email);
  };

  return (
    <AppScreen style={styles.safe}>
      <ScreenHeader title="Newsletter" subtitle="Weekly tips, recipes & wellness content" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.body}>
          Join the Wellness Shift newsletter for curated health tips, seasonal recipes, and product updates — delivered weekly.
        </Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email address"
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!subscribed}
        />
        <TouchableOpacity
          style={[styles.btn, subscribed && styles.btnDone]}
          onPress={subscribe}
          disabled={subscribed}
        >
          <Text style={styles.btnText}>{subscribed ? '✓ Subscribed' : 'Subscribe'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.base, gap: Spacing.md },
  body: { fontSize: Typography.size.sm, color: Colors.textSecondary, lineHeight: 22 },
  input: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: Spacing.base,
    fontSize: Typography.size.base,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderLight,
  },
  btn: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.lg,
    padding: Spacing.base,
    alignItems: 'center',
  },
  btnDone: { backgroundColor: Colors.success },
  btnText: { color: Colors.white, fontWeight: '700' },
});
