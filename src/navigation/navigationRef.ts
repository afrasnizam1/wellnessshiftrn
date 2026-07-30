import { createNavigationContainerRef, CommonActions } from '@react-navigation/native';
import type { RootStackParamList } from '../types';
import { Screen } from './screenNames';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function navigateFromNotification(route: string) {
  if (!navigationRef.isReady()) return;

  switch (route) {
    case Screen.messages:
      navigationRef.dispatch(
        CommonActions.navigate({
          name: Screen.patientApp,
          params: { screen: Screen.tabMore, params: { screen: Screen.messages } },
        })
      );
      break;
    case Screen.carePlan:
      navigationRef.dispatch(
        CommonActions.navigate({
          name: Screen.patientApp,
          params: { screen: Screen.tabMore, params: { screen: Screen.carePlan } },
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
