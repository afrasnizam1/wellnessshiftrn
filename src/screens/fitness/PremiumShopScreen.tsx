import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing, Radius } from '../../theme';
import { AppCard, ScreenHeader } from '../../components/ui';
import AppScreen from '../../components/common/AppScreen';

/** Placeholder surface — digital shop checkout is not shipping yet. */
export default function PremiumShopScreen() {
  const navigation = useNavigation<any>();

  return (
    <AppScreen style={styles.safe}>
      <View style={styles.header}>
        <ScreenHeader
          title="Premium Shop"
          subtitle="Coming soon"
          onBack={() => navigation.goBack()}
        />
      </View>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <AppCard style={styles.card}>
          <View style={styles.iconWrap}>
            <Ionicons name="storefront-outline" size={28} color={Colors.primary} />
          </View>
          <Text style={styles.title}>Shop coming soon</Text>
          <Text style={styles.body}>
            Digital meal plans and guides are not available for purchase in this version.
            Subscription upgrades live under More → Subscription.
          </Text>
        </AppCard>
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: { paddingHorizontal: Spacing.base },
  content: { padding: Spacing.base, gap: Spacing.md },
  card: { alignItems: 'center', gap: Spacing.md, paddingVertical: Spacing.xl },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: Radius.lg,
    backgroundColor: Colors.primaryBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { fontSize: Typography.size.lg, fontWeight: '700', color: Colors.text },
  body: {
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    lineHeight: 22,
    textAlign: 'center',
  },
});
