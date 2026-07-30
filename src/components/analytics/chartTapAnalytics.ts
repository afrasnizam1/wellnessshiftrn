import type { WellnessCategoryKey } from '../../types';
import { analyticsHelper } from '../../services/analyticsHelper';
import { getCategoryMeta, shortCategoryLabel } from './chartInteraction';

export type ChartTapContext = {
  screen: string;
  chart: string;
};

export function chartCategoryLabel(key: WellnessCategoryKey): string {
  const meta = getCategoryMeta(key);
  return shortCategoryLabel(meta?.label ?? key);
}

/** CSQ autocapture tap label — e.g. `Wellness Ring · Environmental` */
export function chartTapAccessibilityLabel(chart: string, categoryLabel: string): string {
  return `${chart} · ${categoryLabel}`;
}

export function chartTapTestId(chart: string, categoryLabel: string): string {
  const slug = (value: string) =>
    value.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
  return `tap_${slug(chart)}_${slug(categoryLabel)}`;
}

export function chartTapA11yProps(ctx: ChartTapContext, categoryKey: WellnessCategoryKey) {
  const category = chartCategoryLabel(categoryKey);
  return {
    accessibilityLabel: chartTapAccessibilityLabel(ctx.chart, category),
    accessibilityRole: 'button' as const,
    testID: chartTapTestId(ctx.chart, category),
  };
}

export function trackChartCategoryTap(
  ctx: ChartTapContext,
  categoryKey: WellnessCategoryKey | null,
  action: 'select' | 'deselect' = 'select',
) {
  if (!categoryKey) return;
  analyticsHelper.trackChartCategoryTap({
    screen: ctx.screen,
    chart: ctx.chart,
    category: chartCategoryLabel(categoryKey),
    category_key: categoryKey,
    action,
  });
}
