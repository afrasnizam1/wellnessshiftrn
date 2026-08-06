import { createNavigationContainerRef, CommonActions } from '@react-navigation/native';
import type { RootStackParamList } from '../types';
import { Screen } from './screenNames';
import { useAppStore } from '../store';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

function patientCareTab() {
  return useAppStore.getState().user?.clinicianId ? Screen.tabMyCare : Screen.tabMore;
}

export function navigateFromNotification(route: string) {
  if (!navigationRef.isReady()) return;

  switch (route) {
    case Screen.carePlan:
      navigationRef.dispatch(
        CommonActions.navigate({
          name: Screen.patientApp,
          params: { screen: patientCareTab(), params: { screen: Screen.carePlan } },
        })
      );
      break;
    case Screen.myCare:
      navigationRef.dispatch(
        CommonActions.navigate({
          name: Screen.patientApp,
          params: { screen: patientCareTab(), params: { screen: Screen.myCare } },
        })
      );
      break;
    case Screen.messages:
      navigationRef.dispatch(
        CommonActions.navigate({
          name: Screen.patientApp,
          params: { screen: patientCareTab(), params: { screen: Screen.messages } },
        })
      );
      break;
    case Screen.dailyPlan:
      navigationRef.dispatch(
        CommonActions.navigate({
          name: Screen.patientApp,
          params: { screen: Screen.tabHome, params: { screen: Screen.dailyPlan } },
        })
      );
      break;
    case Screen.dailyCheckIn:
      navigationRef.dispatch(
        CommonActions.navigate({
          name: Screen.patientApp,
          params: { screen: Screen.tabHome, params: { screen: Screen.dailyCheckIn } },
        })
      );
      break;
    case Screen.tabFitness:
      navigationRef.dispatch(
        CommonActions.navigate({
          name: Screen.patientApp,
          params: { screen: Screen.tabFitness },
        })
      );
      break;
    case Screen.tabAiInsights:
      navigationRef.dispatch(
        CommonActions.navigate({
          name: Screen.patientApp,
          params: { screen: Screen.tabAiInsights },
        })
      );
      break;
    case Screen.clinicianInbox:
      navigationRef.dispatch(
        CommonActions.navigate({
          name: Screen.clinicianPortal,
          params: { screen: Screen.clinicianInbox },
        })
      );
      break;
    default:
      break;
  }
}
