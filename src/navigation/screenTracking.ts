import type { NavigationState, PartialState } from '@react-navigation/native';
import { Screen } from './screenNames';
import { resolveCsqLeafName, resolveCsqSection } from './csqScreenNames';

type NavState = NavigationState | PartialState<NavigationState> | undefined;

/** Native view-controller noise — never send as CSQ screenviews. */
const GENERIC_SCREEN_PATTERN =
  /^(View\s)?(RNSScreen|UIViewController|RCTModalHostViewController|RCTView|UIHostingController)/i;

/** Root shells — section is inferred from context, not shown in the label. */
const ROOT_CONTAINERS = new Set<string>([Screen.patientApp, Screen.clinicianPortal, Screen.clinicianTabs]);

export function getActiveRoutePath(state: NavState): string[] {
  const path: string[] = [];
  let current: NavState = state;

  while (current?.routes?.length) {
    const index = current.index ?? current.routes.length - 1;
    const route = current.routes[index];
    if (route?.name) {
      path.push(route.name);
    }
    if (route?.state) {
      current = route.state as NavState;
    } else {
      break;
    }
  }

  return path;
}

/** CSQ pageview label: `Home - Dashboard`, `Fitness - Hub`, `Auth - Sign In` */
export function formatNavigationScreenview(routePath: string[]): string | null {
  const meaningful = routePath.filter((name) => name && !GENERIC_SCREEN_PATTERN.test(name));
  if (meaningful.length === 0) return null;

  const inPatientApp = meaningful.includes(Screen.patientApp);
  const inClinicianApp = meaningful.includes(Screen.clinicianPortal);
  const trimmed = meaningful.filter((name) => !ROOT_CONTAINERS.has(name));
  if (trimmed.length === 0) return null;

  const leaf = trimmed[trimmed.length - 1]!;
  const section = resolveCsqSection(meaningful, { inPatientApp, inClinicianApp });
  const screen = resolveCsqLeafName(leaf, section);

  if (!section) {
    return screen;
  }

  return `${section} - ${screen}`;
}

export function screenviewFromNavigationState(state: NavState): string | null {
  return formatNavigationScreenview(getActiveRoutePath(state));
}
