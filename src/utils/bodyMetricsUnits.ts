export type HeightUnit = 'cm' | 'ft';
export type WeightUnit = 'kg' | 'lb' | 'stone';

const CM_PER_INCH = 2.54;
const INCHES_PER_FOOT = 12;
const LB_PER_KG = 2.2046226218;
const LB_PER_STONE = 14;

export function roundDisplay(value: number, decimals = 1): string {
  const factor = 10 ** decimals;
  const rounded = Math.round(value * factor) / factor;
  if (Number.isInteger(rounded)) return String(rounded);
  return rounded.toFixed(decimals).replace(/\.?0+$/, '');
}

export function cmToFeetInches(cm: number): { feet: number; inches: number } {
  const totalInches = cm / CM_PER_INCH;
  let feet = Math.floor(totalInches / INCHES_PER_FOOT);
  let inches = Math.round(totalInches - feet * INCHES_PER_FOOT);
  if (inches === 12) {
    feet += 1;
    inches = 0;
  }
  return { feet, inches };
}

export function feetInchesToCm(feet: number, inches: number): number {
  return (feet * INCHES_PER_FOOT + inches) * CM_PER_INCH;
}

export function parseHeightToCm(input: {
  unit: HeightUnit;
  cm?: string;
  feet?: string;
  inches?: string;
}): number | null {
  if (input.unit === 'cm') {
    const cm = Number(input.cm);
    return Number.isFinite(cm) ? cm : null;
  }
  const feet = Number(input.feet);
  const inches = Number(input.inches ?? '0');
  if (!Number.isFinite(feet) || feet < 0 || !Number.isFinite(inches) || inches < 0) return null;
  return feetInchesToCm(feet, inches);
}

export function formatHeightFromCm(
  cm: number | null | undefined,
  unit: HeightUnit,
): { cm: string; feet: string; inches: string } {
  if (cm == null || !Number.isFinite(cm)) return { cm: '', feet: '', inches: '' };
  if (unit === 'cm') return { cm: roundDisplay(cm, 0), feet: '', inches: '' };
  const { feet, inches } = cmToFeetInches(cm);
  return { cm: '', feet: String(feet), inches: String(inches) };
}

export function kgToLb(kg: number): number {
  return kg * LB_PER_KG;
}

export function lbToKg(lb: number): number {
  return lb / LB_PER_KG;
}

export function kgToStone(kg: number): number {
  return kgToLb(kg) / LB_PER_STONE;
}

export function stoneToKg(stone: number): number {
  return lbToKg(stone * LB_PER_STONE);
}

export function parseWeightToKg(weight: string, unit: WeightUnit): number | null {
  const value = Number(weight);
  if (!Number.isFinite(value) || value <= 0) return null;
  if (unit === 'kg') return value;
  if (unit === 'lb') return lbToKg(value);
  return stoneToKg(value);
}

export function formatWeightFromKg(kg: number | null | undefined, unit: WeightUnit): string {
  if (kg == null || !Number.isFinite(kg)) return '';
  if (unit === 'kg') return roundDisplay(kg, 1);
  if (unit === 'lb') return roundDisplay(kgToLb(kg), 1);
  return roundDisplay(kgToStone(kg), 1);
}

export function validateHeightCm(
  cm: number | null,
  options: { required?: boolean; unit?: HeightUnit } = {},
): string | undefined {
  const { required = true, unit = 'cm' } = options;
  if (cm == null || !Number.isFinite(cm)) {
    return required ? 'Height is required' : undefined;
  }
  if (cm <= 0 || cm > 300) {
    return unit === 'cm' ? 'Enter height in centimetres (e.g. 170)' : 'Enter a valid height (e.g. 5 ft 7 in)';
  }
  return undefined;
}

export function validateWeightKg(
  kg: number | null,
  options: { required?: boolean; unit?: WeightUnit } = {},
): string | undefined {
  const { required = true, unit = 'kg' } = options;
  if (kg == null || !Number.isFinite(kg)) {
    return required ? 'Weight is required' : undefined;
  }
  if (kg <= 0 || kg > 500) {
    const examples: Record<WeightUnit, string> = {
      kg: 'e.g. 70',
      lb: 'e.g. 154',
      stone: 'e.g. 11.3',
    };
    return `Enter a valid weight (${examples[unit]})`;
  }
  return undefined;
}
