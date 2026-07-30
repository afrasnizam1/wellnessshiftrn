import type { FitnessModule } from '../types';
import { HEALTH_EDUCATION_RICH, type RichHealthEducation } from './healthEducationRichContent';
import { HEALTH_EDUCATION_RICH_EXTENDED } from './healthEducationRichContentExtended';
import { buildEnhancedPlainRich } from './healthEducationPlainEnhancer';

/** Lookup rich education content by route id or resolved alias id. */
export function getRichHealthEducation(
  topicId: string,
  rawTopicId?: string,
  title?: string,
  subtitle?: string,
  module?: FitnessModule,
): RichHealthEducation {
  const keys = [rawTopicId, topicId].filter(Boolean) as string[];
  for (const key of keys) {
    if (HEALTH_EDUCATION_RICH[key]) return HEALTH_EDUCATION_RICH[key];
    if (HEALTH_EDUCATION_RICH_EXTENDED[key]) return HEALTH_EDUCATION_RICH_EXTENDED[key];
  }
  return buildEnhancedPlainRich(topicId, rawTopicId, title ?? 'Health Topic', subtitle, module);
}

export type { RichHealthEducation } from './healthEducationRichContent';
