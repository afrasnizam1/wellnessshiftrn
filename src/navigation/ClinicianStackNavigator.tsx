import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { ClinicianStackParamList } from '../types';
import { ClinicianTabNavigator } from './ClinicianTabNavigator';
import PatientDetailScreen from '../screens/clinician/PatientDetailScreen';
import ClinicianMessagesScreen from '../screens/clinician/ClinicianMessagesScreen';
import CreateCarePlanScreen from '../screens/clinician/CreateCarePlanScreen';
import FitnessRecommendationsScreen from '../screens/clinician/FitnessRecommendationsScreen';
import AddPatientScreen from '../screens/clinician/AddPatientScreen';
import ClinicianInboxScreen from '../screens/clinician/ClinicianInboxScreen';
import ClinicianEditProfileScreen from '../screens/clinician/ClinicianEditProfileScreen';
import HelpScreen from '../screens/more/HelpScreen';
import ClinicianTemplatesScreen from '../screens/clinician/ClinicianTemplatesScreen';
import ClinicianScheduleScreen from '../screens/clinician/ClinicianScheduleScreen';
import ClinicianConversationStartersScreen from '../screens/clinician/ClinicianConversationStartersScreen';
import ClinicianBetweenVisitsScreen from '../screens/clinician/ClinicianBetweenVisitsScreen';
import ClinicianAuditLogScreen from '../screens/clinician/ClinicianAuditLogScreen';
import ClinicianPracticeModeScreen from '../screens/clinician/ClinicianPracticeModeScreen';
import ClinicianLegalScreen from '../screens/clinician/ClinicianLegalScreen';
import TrackedWebViewScreen from '../screens/common/TrackedWebViewScreen';
import ClinicianBulkActionsScreen from '../screens/clinician/ClinicianBulkActionsScreen';
import ClinicianFitnessLibraryScreen from '../screens/clinician/ClinicianFitnessLibraryScreen';
import EvidenceHubScreen from '../screens/clinician/EvidenceHubScreen';
import ClinicalNotesScreen from '../screens/clinician/ClinicalNotesScreen';
import { FITNESS_MODULE_SCREEN_CONFIG } from './shared/fitnessModuleScreens';
import { Screen } from './screenNames';

const Stack = createNativeStackNavigator<ClinicianStackParamList>();

export function ClinicianStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Screen.clinicianTabs} component={ClinicianTabNavigator} />
      <Stack.Screen name={Screen.clinicianInbox} component={ClinicianInboxScreen} />
      <Stack.Screen name={Screen.patientDetail} component={PatientDetailScreen} />
      <Stack.Screen name={Screen.clinicianMessages} component={ClinicianMessagesScreen} />
      <Stack.Screen name={Screen.createCarePlan} component={CreateCarePlanScreen} />
      <Stack.Screen name={Screen.fitnessRecommendations} component={FitnessRecommendationsScreen} />
      <Stack.Screen name={Screen.addPatient} component={AddPatientScreen} />
      <Stack.Screen name={Screen.editClinicianProfile} component={ClinicianEditProfileScreen} />
      <Stack.Screen name={Screen.clinicianHelp} component={HelpScreen} />
      <Stack.Screen name={Screen.messageTemplates} component={ClinicianTemplatesScreen} />
      <Stack.Screen name={Screen.clinicianSchedule} component={ClinicianScheduleScreen} />
      <Stack.Screen name={Screen.conversationStarters} component={ClinicianConversationStartersScreen} />
      <Stack.Screen name={Screen.betweenVisits} component={ClinicianBetweenVisitsScreen} />
      <Stack.Screen name={Screen.auditLog} component={ClinicianAuditLogScreen} />
      <Stack.Screen name={Screen.practiceMode} component={ClinicianPracticeModeScreen} />
      <Stack.Screen name={Screen.clinicianLegal} component={ClinicianLegalScreen} />
      <Stack.Screen name={Screen.website} component={TrackedWebViewScreen} />
      <Stack.Screen name={Screen.bulkActions} component={ClinicianBulkActionsScreen} />
      <Stack.Screen name={Screen.clinicianModuleLibrary} component={ClinicianFitnessLibraryScreen} />
      <Stack.Screen name={Screen.evidenceHub} component={EvidenceHubScreen} />
      <Stack.Screen name={Screen.clinicalNotes} component={ClinicalNotesScreen} />
      {FITNESS_MODULE_SCREEN_CONFIG.map(({ name, component }) => (
        <Stack.Screen key={name} name={name} component={component} />
      ))}
    </Stack.Navigator>
  );
}
