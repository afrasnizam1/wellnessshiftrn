import type { EventArg, NavigationProp } from '@react-navigation/native';
import { Screen } from './screenNames';

/** When a Fitness/Home screen was opened from My Care Plan, Back returns there instead of Home. */
export function carePlanReturnListeners({
  navigation,
  route,
}: {
  navigation: NavigationProp<any>;
  route: { params?: { fromCarePlan?: boolean } };
}) {
  return {
    beforeRemove: (e: EventArg<'beforeRemove', true, { action: { type: string } }>) => {
      if (!route.params?.fromCarePlan) return;
      if (e.data.action.type !== 'GO_BACK' && e.data.action.type !== 'POP') return;
      e.preventDefault();
      navigation.getParent()?.navigate(Screen.tabMyCare, { screen: Screen.carePlan });
    },
  };
}
