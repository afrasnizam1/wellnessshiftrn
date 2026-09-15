import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../theme';
import AppScreen from '../../components/common/AppScreen';
import { Screen } from '../../navigation/screenNames';
import { appConfig } from '../../config/appConfig';

/**
 * Shop is not shipping in v1. Redirect to subscriptions (or back if paywall unavailable).
 */
export default function PremiumShopScreen() {
  const navigation = useNavigation<any>();

  useEffect(() => {
    if (!appConfig.enablePremiumShop) {
      navigation.replace(Screen.subscriptionPaywall, { feature: 'shop' });
    }
  }, [navigation]);

  return (
    <AppScreen style={styles.safe}>
      <View style={styles.center}>
        <ActivityIndicator color={Colors.primary} />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
