import React from 'react';
import IconBadge from './IconBadge';
import { WELLNESS_CATEGORIES } from '../../theme';
import { categoryIonIcon } from '../../theme/icons';
import type { WellnessCategoryKey } from '../../types';

type Props = {
  categoryKey: WellnessCategoryKey;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'soft' | 'plain' | 'solid';
};

export default function CategoryIcon({ categoryKey, color, size = 'md', variant = 'soft' }: Props) {
  const cat = WELLNESS_CATEGORIES.find((c) => c.key === categoryKey);
  return (
    <IconBadge
      name={cat?.ionIcon ?? categoryIonIcon(categoryKey)}
      color={color ?? cat?.color ?? undefined}
      size={size}
      variant={variant}
    />
  );
}
