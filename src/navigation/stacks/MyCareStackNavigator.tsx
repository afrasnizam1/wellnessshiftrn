// src/navigation/stacks/MyCareStackNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { MyCareStackParamList } from '../../types';
import MyCareHubScreen from '../../screens/more/MyCareHubScreen';
import ConnectClinicianScreen from '../../screens/more/ConnectClinicianScreen';
import CarePlanScreen from '../../screens/more/CarePlanScreen';
import MessagesScreen from '../../screens/more/MessagesScreen';
import ProgramsScreen from '../../screens/more/ProgramsScreen';
import ProgramDetailScreen from '../../screens/more/ProgramDetailScreen';
import CoachingScreen from '../../screens/more/CoachingScreen';
import ScanCustomPlanScreen from '../../screens/more/ScanCustomPlanScreen';
import HealthRecordsScreen from '../../screens/home/HealthRecordsScreen';
import PaywallScreen from '../../screens/auth/PaywallScreen';
import { Screen } from '../screenNames';

const Stack = createNativeStackNavigator<MyCareStackParamList>();

export default function MyCareStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Screen.myCare} component={MyCareHubScreen} />
      <Stack.Screen name={Screen.connectClinician} component={ConnectClinicianScreen} />
      <Stack.Screen name={Screen.carePlan} component={CarePlanScreen} />
      <Stack.Screen name={Screen.messages} component={MessagesScreen} />
      <Stack.Screen name={Screen.programs} component={ProgramsScreen} />
      <Stack.Screen name={Screen.programDetail} component={ProgramDetailScreen} />
      <Stack.Screen name={Screen.coaching} component={CoachingScreen} />
      <Stack.Screen name={Screen.scanCustomPlan} component={ScanCustomPlanScreen} />
      <Stack.Screen name={Screen.healthRecords} component={HealthRecordsScreen} />
      <Stack.Screen
        name={Screen.subscriptionPaywall}
        component={PaywallScreen}
        options={{ presentation: 'modal' }}
      />
    </Stack.Navigator>
  );
}
