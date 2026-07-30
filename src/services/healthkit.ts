// src/services/healthkit.ts
// Unified health data access — Apple HealthKit (iOS) + Health Connect (Android)

import { Platform } from 'react-native';
import AppleHealthKit, {
  HealthInputOptions,
  HealthKitPermissions,
} from 'react-native-health';
import type { ActivitySnapshot, DailyActivityPoint } from '../types';
import {
  buildEmptyHistory,
  dateKey,
  lastNDays,
} from '../utils/activityHistoryHelpers';
import { healthConnectService } from './healthConnect';
import { healthKitStorage } from './healthKitStorage';

const isIOS = Platform.OS === 'ios';
const isAndroid = Platform.OS === 'android';

export function getHealthPlatformName(): string {
  return isAndroid ? 'Health Connect' : 'Apple Health';
}

function healthKitReady(): boolean {
  return (
    isIOS &&
    typeof AppleHealthKit?.isAvailable === 'function' &&
    typeof AppleHealthKit?.initHealthKit === 'function'
  );
}

function getPermissions(): HealthKitPermissions {
  const { Permissions } = AppleHealthKit.Constants;
  return {
    permissions: {
      read: [
        Permissions.Steps,
        Permissions.DistanceWalkingRunning,
        Permissions.ActiveEnergyBurned,
        Permissions.AppleExerciseTime,
        Permissions.HeartRate,
        Permissions.SleepAnalysis,
        Permissions.Weight,
        Permissions.Height,
        Permissions.BloodPressureDiastolic,
        Permissions.BloodPressureSystolic,
        Permissions.BloodGlucose,
        Permissions.OxygenSaturation,
        Permissions.RespiratoryRate,
      ],
      write: [],
    },
  };
}

const EMPTY_ACTIVITY: ActivitySnapshot = {
  steps: 0,
  calories: 0,
  distanceKm: 0,
  exerciseMinutes: 0,
};

let healthKitInitialized = false;

async function requestPermissionsIOS(): Promise<boolean> {
  if (!healthKitReady()) return false;
  return new Promise((resolve) => {
    AppleHealthKit.initHealthKit(getPermissions(), (err) => {
      if (err) {
        healthKitInitialized = false;
        resolve(false);
        return;
      }

      // initHealthKit can succeed even when the user denied read access —
      // verify at least one read permission is SharingAuthorized (2).
      AppleHealthKit.getAuthStatus(getPermissions(), (statusErr, results) => {
        if (statusErr) {
          // Fall back to init success if status query fails on older OS builds.
          healthKitInitialized = true;
          healthKitStorage.setEnabled(true).catch(() => {});
          resolve(true);
          return;
        }
        const readStatuses = results?.permissions?.read ?? [];
        const anyAuthorized = readStatuses.includes(2);
        healthKitInitialized = anyAuthorized;
        healthKitStorage.setEnabled(anyAuthorized).catch(() => {});
        resolve(anyAuthorized);
      });
    });
  });
}

/** Re-init HealthKit on app launch when user previously connected (no dialog if already authorized). */
async function ensureInitializedIOS(): Promise<boolean> {
  if (!healthKitReady()) return false;
  if (healthKitInitialized) return true;
  if (!(await healthKitStorage.isEnabled())) return false;
  return requestPermissionsIOS();
}

async function isAvailableIOS(): Promise<boolean> {
  if (!healthKitReady()) return false;
  return new Promise((resolve) => {
    AppleHealthKit.isAvailable((err, available) => {
      resolve(!err && !!available);
    });
  });
}

async function isConnectedIOS(): Promise<boolean> {
  if (!(await isAvailableIOS())) return false;
  if (!(await healthKitStorage.isEnabled())) return false;
  return ensureInitializedIOS();
}

async function getTodayActivityIOS(): Promise<ActivitySnapshot> {
  if (!(await ensureInitializedIOS())) return { ...EMPTY_ACTIVITY };

  return new Promise((resolve) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const options: HealthInputOptions = {
      date: today.toISOString(),
    };

    AppleHealthKit.getStepCount(options, (err, steps) => {
      const stepsValue = err ? 0 : steps.value;

      AppleHealthKit.getActiveEnergyBurned(
        { startDate: today.toISOString() },
        (err2, calories) => {
          const calValue = err2
            ? 0
            : calories.reduce((sum, c) => sum + c.value, 0);

          AppleHealthKit.getDistanceWalkingRunning(options, (err3, dist) => {
            const distValue = err3 ? 0 : (dist.value ?? 0) / 1000;

            AppleHealthKit.getAppleExerciseTime(options, (err4, exercise) => {
              const exerciseValue = err4 ? 0 : (Array.isArray(exercise) ? exercise[0]?.value : (exercise as { value?: number }).value) ?? 0;

              AppleHealthKit.getHeartRateSamples(
                {
                  startDate: today.toISOString(),
                  endDate: new Date().toISOString(),
                  ascending: false,
                  limit: 1,
                },
                (err5, hr) => {
                  const hrValue =
                    err5 || hr.length === 0 ? undefined : hr[0].value;

                  resolve({
                    steps: Math.round(stepsValue),
                    calories: Math.round(calValue),
                    distanceKm: Math.round(distValue * 10) / 10,
                    exerciseMinutes: Math.round(exerciseValue),
                    heartRate: hrValue ? Math.round(hrValue) : undefined,
                  });
                }
              );
            });
          });
        }
      );
    });
  });
}

function mergeDailySamples(
  days: Date[],
  stepsSamples: { startDate: string; value: number }[],
  calSamples: { startDate: string; value: number }[],
  distSamples: { startDate: string; value: number }[],
  sleepSamples: { startDate: string; endDate: string; value: string }[]
): DailyActivityPoint[] {
  const byDate = (samples: { startDate: string; value: number }[]) => {
    const map: Record<string, number> = {};
    for (const s of samples) {
      const key = dateKey(new Date(s.startDate));
      map[key] = (map[key] ?? 0) + s.value;
    }
    return map;
  };

  const stepsMap = byDate(stepsSamples);
  const calMap = byDate(calSamples);
  const distMap = byDate(distSamples);

  const sleepMap: Record<string, number> = {};
  for (const s of sleepSamples) {
    const key = dateKey(new Date(s.startDate));
    const hours =
      (new Date(s.endDate).getTime() - new Date(s.startDate).getTime()) / 3600000;
    sleepMap[key] = (sleepMap[key] ?? 0) + hours;
  }

  return days.map((d) => {
    const key = dateKey(d);
    return {
      date: key,
      steps: Math.round(stepsMap[key] ?? 0),
      calories: Math.round(calMap[key] ?? 0),
      distanceKm: Math.round((distMap[key] ?? 0) / 1000 * 10) / 10,
      exerciseMinutes: 0,
      sleepHours: Math.round((sleepMap[key] ?? 0) * 10) / 10,
    };
  });
}

async function getActivityHistoryIOS(days: number): Promise<DailyActivityPoint[]> {
  if (!(await ensureInitializedIOS())) return buildEmptyHistory(days);

  const dayList = lastNDays(days);
  const start = new Date(dayList[0]);
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  const range = { startDate: start.toISOString(), endDate: end.toISOString() };

  return new Promise((resolve) => {
    AppleHealthKit.getDailyStepCountSamples(range, (errSteps, steps) => {
      AppleHealthKit.getActiveEnergyBurned(range, (errCal, cals) => {
        AppleHealthKit.getDailyDistanceWalkingRunningSamples(range, (errDist, dists) => {
          AppleHealthKit.getSleepSamples(range, (errSleep, sleep) => {
            const calSamples = (cals ?? []).map((c) => ({
              startDate: c.startDate ?? c.endDate ?? '',
              value: c.value ?? 0,
            }));

            resolve(
              mergeDailySamples(
                dayList,
                (steps ?? []).map((s) => ({ startDate: s.startDate, value: s.value })),
                calSamples,
                (dists ?? []).map((d) => ({ startDate: d.startDate, value: d.value ?? 0 })),
                (sleep ?? []).map((s) => ({
                  startDate: s.startDate,
                  endDate: s.endDate,
                  value: String(s.value ?? ''),
                }))
              )
            );
          });
        });
      });
    });
  });
}

/** Cross-platform health service (HealthKit on iOS, Health Connect on Android). */
export const healthKitService = {
  requestPermissions: async (): Promise<boolean> => {
    if (isAndroid) {
      const ok = await healthConnectService.requestPermissions();
      if (ok) await healthKitStorage.setEnabled(true);
      return ok;
    }
    return requestPermissionsIOS();
  },

  /** HealthKit / Health Connect exists on this device. */
  isAvailable: (): Promise<boolean> => {
    if (isAndroid) return healthConnectService.isAvailable();
    return isAvailableIOS();
  },

  /** User has connected and the SDK is initialized for reads. */
  isConnected: async (): Promise<boolean> => {
    if (isAndroid) {
      if (!(await healthConnectService.isAvailable())) return false;
      return healthKitStorage.isEnabled();
    }
    return isConnectedIOS();
  },

  getTodayActivity: (): Promise<ActivitySnapshot> => {
    if (isAndroid) return healthConnectService.getTodayActivity();
    return getTodayActivityIOS();
  },

  getActivityHistory: (days = 7): Promise<DailyActivityPoint[]> => {
    if (isAndroid) return healthConnectService.getActivityHistory(days);
    return getActivityHistoryIOS(days);
  },
};
