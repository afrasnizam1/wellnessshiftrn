import type { NavigationProp } from '@react-navigation/native';
import { FITNESS_MODULES } from '../data/fitnessData';
import { Screen } from '../navigation/screenNames';
import type { CarePlanTask } from '../types';
import { navigateToLinkedModule } from './fitnessModuleRouter';

export function resolveCarePlanModuleId(task: CarePlanTask): string | undefined {
  if (task.moduleId) return task.moduleId;
  const match = FITNESS_MODULES.find(
    (m) => m.title.toLowerCase() === task.title.toLowerCase() || m.id === task.id,
  );
  return match?.id;
}

export function openCarePlanTask(
  navigation: NavigationProp<any>,
  task: CarePlanTask,
) {
  const moduleId = resolveCarePlanModuleId(task);
  if (moduleId) {
    const mod = FITNESS_MODULES.find((m) => m.id === moduleId);
    navigateToLinkedModule(navigation, mod?.title ?? moduleId, { fromCarePlan: true });
    return;
  }

  const title = task.title.toLowerCase();
  if (title.includes('check-in')) {
    navigation.navigate(Screen.tabHome, {
      screen: Screen.dailyCheckIn,
      params: { fromCarePlan: true },
    });
    return;
  }
  if (title.includes('daily plan')) {
    navigation.navigate(Screen.tabHome, {
      screen: Screen.dailyPlan,
      params: { fromCarePlan: true },
    });
  }
}
