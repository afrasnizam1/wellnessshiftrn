import type { WellnessScore } from '../types';
import { ageFromDateOfBirth, parseDateOfBirth } from './dateOfBirth';

export type BiologicalAgeComparison = 'younger' | 'aligned' | 'older';

export type BiologicalAgeBand = 'poor' | 'fair' | 'good' | 'great' | 'excellent';

export type BiologicalAgeResult = {
  chronologicalAge: number;
  /** Display age, one decimal for gauge polish. */
  biologicalAge: number;
  /** biological − chronological (negative = younger biologically). */
  deltaYears: number;
  comparison: BiologicalAgeComparison;
  /** 0–1 gauge fill: younger / healthier → closer to 1. */
  gaugeProgress: number;
  band: BiologicalAgeBand;
  bandLabel: string;
  summary: string;
  /** Wellness overall score (0–10) that drove the estimate. */
  wellnessScoreOverall: number;
  /** Years attributed mainly to the wellness score vs a neutral 7/10. */
  scoreImpactYears: number;
  scoreLinkSummary: string;
};

function bodyMassIndex(heightCm?: number, weightKg?: number): number | null {
  if (!heightCm || !weightKg || heightCm < 100 || weightKg < 30) return null;
  const metres = heightCm / 100;
  return weightKg / (metres * metres);
}

function bandFromProgress(progress: number): { band: BiologicalAgeBand; bandLabel: string } {
  if (progress >= 0.82) return { band: 'excellent', bandLabel: 'Excellent' };
  if (progress >= 0.64) return { band: 'great', bandLabel: 'Great' };
  if (progress >= 0.46) return { band: 'good', bandLabel: 'Good' };
  if (progress >= 0.28) return { band: 'fair', bandLabel: 'Fair' };
  return { band: 'poor', bandLabel: 'Poor' };
}

/**
 * Estimate biological age from chronological age + wellness assessment.
 * Wellness overall is 0–10; ~7 is treated as age-aligned. Sleep, stress, fitness,
 * and optional BMI nudge the result. Cap shift at ±12 years.
 */
export function computeBiologicalAge(input: {
  dateOfBirth: string;
  wellnessScore: WellnessScore;
  heightCm?: number;
  weightKg?: number;
  today?: Date;
}): BiologicalAgeResult | null {
  const dob = parseDateOfBirth(input.dateOfBirth);
  if (!dob) return null;

  const chronologicalAge = ageFromDateOfBirth(dob, input.today);
  if (chronologicalAge < 16 || chronologicalAge > 110) return null;

  const { overall, categories } = input.wellnessScore;
  const scoreImpactRaw = (7 - overall) * 1.15;

  const sleep = categories.sleep ?? overall;
  const stress = categories.stress ?? overall;
  const fitness = categories.fitness ?? categories.physical ?? overall;
  const mental = categories.mental ?? overall;

  const lifestyleDelta =
    (7 - sleep) * 0.35 +
    (7 - stress) * 0.3 +
    (7 - fitness) * 0.25 +
    (7 - mental) * 0.2;

  let bmiDelta = 0;
  const bmi = bodyMassIndex(input.heightCm, input.weightKg);
  if (bmi != null) {
    if (bmi >= 30) bmiDelta = Math.min(2.5, (bmi - 30) * 0.35 + 1);
    else if (bmi >= 25) bmiDelta = (bmi - 25) * 0.25;
    else if (bmi < 18.5) bmiDelta = 0.8;
    else bmiDelta = -0.4;
  }

  const rawDelta = scoreImpactRaw + lifestyleDelta + bmiDelta;
  const deltaYears = Math.max(-12, Math.min(12, rawDelta));
  const biologicalAgeRaw = Math.max(16, Math.min(110, chronologicalAge + deltaYears));
  const biologicalAge = Math.round(biologicalAgeRaw * 10) / 10;
  const roundedDelta = Math.round((biologicalAge - chronologicalAge) * 10) / 10;
  const scoreImpactYears = Math.round(scoreImpactRaw * 10) / 10;

  // Younger (negative delta) fills toward Excellent.
  const gaugeProgress = Math.max(0, Math.min(1, (12 - deltaYears) / 24));
  const { band, bandLabel } = bandFromProgress(gaugeProgress);

  let comparison: BiologicalAgeComparison = 'aligned';
  if (roundedDelta <= -1.5) comparison = 'younger';
  else if (roundedDelta >= 1.5) comparison = 'older';

  let summary: string;
  if (comparison === 'younger') {
    const years = Math.abs(roundedDelta).toFixed(1).replace(/\.0$/, '');
    summary = `${years} year${Math.abs(roundedDelta) === 1 ? '' : 's'} younger than your actual age`;
  } else if (comparison === 'older') {
    const years = Math.abs(roundedDelta).toFixed(1).replace(/\.0$/, '');
    summary = `${years} year${Math.abs(roundedDelta) === 1 ? '' : 's'} older than your actual age`;
  } else {
    summary = 'About in line with your actual age';
  }

  const scoreLinkSummary =
    scoreImpactYears <= -0.5
      ? `Wellness score ${overall.toFixed(1)}/10 is pulling your biological age down`
      : scoreImpactYears >= 0.5
        ? `Wellness score ${overall.toFixed(1)}/10 is raising your biological age — improve habits to reverse it`
        : `Wellness score ${overall.toFixed(1)}/10 is keeping biological age close to your real age`;

  return {
    chronologicalAge,
    biologicalAge,
    deltaYears: roundedDelta,
    comparison,
    gaugeProgress,
    band,
    bandLabel,
    summary,
    wellnessScoreOverall: overall,
    scoreImpactYears,
    scoreLinkSummary,
  };
}
