import { addDays, format } from 'date-fns';
import { buildSnapshot, type CycleProfile } from './cycleTrackingService';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

const base: CycleProfile = {
  cycleLength: 28,
  periodLength: 5,
  lastPeriodStart: '2026-01-01T12:00:00.000Z',
  history: ['2026-01-01'],
  logs: {},
};

describe('buildSnapshot cycle phases (28-day cycle)', () => {
  const start = new Date('2026-01-01T12:00:00');

  it('is Menstrual on days 1–5', () => {
    expect(buildSnapshot(base, start).phase?.name).toBe('Menstrual');
    expect(buildSnapshot(base, addDays(start, 4)).phase?.name).toBe('Menstrual');
  });

  it('is Follicular after menses and before ovulation', () => {
    expect(buildSnapshot(base, addDays(start, 6)).phase?.name).toBe('Follicular');
    expect(buildSnapshot(base, addDays(start, 10)).phase?.name).toBe('Follicular');
  });

  it('is Ovulation around mid-cycle', () => {
    expect(buildSnapshot(base, addDays(start, 13)).phase?.name).toBe('Ovulation');
    expect(buildSnapshot(base, addDays(start, 14)).phase?.name).toBe('Ovulation');
  });

  it('is Luteal after ovulation until the next period', () => {
    expect(buildSnapshot(base, addDays(start, 16)).phase?.name).toBe('Luteal');
    expect(buildSnapshot(base, addDays(start, 26)).phase?.name).toBe('Luteal');
  });
});

describe('buildSnapshot next-period prediction', () => {
  it('predicts the next period one cycle length after last start', () => {
    const snap = buildSnapshot(base, new Date('2026-01-01T12:00:00'));
    expect(format(snap.nextPeriod!, 'yyyy-MM-dd')).toBe('2026-01-29');
  });

  it('returns nulls when no period has been logged', () => {
    const snap = buildSnapshot({ ...base, lastPeriodStart: null }, new Date('2026-01-10'));
    expect(snap.dayOfCycle).toBeNull();
    expect(snap.phase).toBeNull();
    expect(snap.nextPeriod).toBeNull();
  });
});
