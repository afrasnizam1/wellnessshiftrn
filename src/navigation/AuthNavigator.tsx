import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import AuthMainLandingScreen from '../screens/auth/AuthMainLandingScreen';
import SignInScreen from '../screens/auth/SignInScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import RoleSelectScreen from '../screens/auth/RoleSelectScreen';
import type { RootStackParamList } from '../types';
import { Screen } from './screenNames';

type AuthStackParamList = {
  [Screen.authLanding]: undefined;
  [Screen.signIn]: undefined;
  [Screen.createAccount]: { savePlan?: boolean } | undefined;
  [Screen.chooseRole]: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

type Props = {
  route: RouteProp<RootStackParamList, typeof Screen.authentication>;
};

export function AuthNavigator({ route }: Props) {
  const initial = route.params?.screen ?? Screen.authLanding;
  const createAccountParams =
    route.params?.screen === Screen.createAccount ? route.params?.params : undefined;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initial}>
      <Stack.Screen name={Screen.authLanding} component={AuthMainLandingScreen} />
      <Stack.Screen name={Screen.signIn} component={SignInScreen} />
      <Stack.Screen
        name={Screen.createAccount}
        component={SignUpScreen}
        initialParams={createAccountParams}
      />
      <Stack.Screen name={Screen.chooseRole} component={RoleSelectScreen} />
    </Stack.Navigator>
  );
}
