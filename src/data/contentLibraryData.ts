import { LEARNING_GUIDES } from './learningGuides';
import { FITNESS_MODULES } from './fitnessData';
import { PROGRAM_CATALOG } from './programCatalog';
import { Screen } from '../navigation/screenNames';

export type ContentLibraryCategory =
  | 'All'
  | 'Learning Guides'
  | 'Health Education'
  | 'Mind & Body'
  | 'Nutrition'
  | 'Programs';

export type ContentLibraryItem = {
  id: string;
  title: string;
  subtitle: string;
  category: Exclude<ContentLibraryCategory, 'All'>;
  icon: string;
  /** Fitness tab screen or More stack screen */
  navigate: { tab?: typeof Screen.tabFitness | typeof Screen.tabMore; screen: string; params?: Record<string, unknown> };
};

const LEARNING_ROUTES: Record<string, { screen: string; params?: Record<string, unknown> }> = {
  vitamins: { screen: Screen.vitaminsLearning },
  'nutrition-basics': { screen: Screen.nutritionBasics },
};

function learningNavigate(guideId: string) {
  const dedicated = LEARNING_ROUTES[guideId];
  if (dedicated) return { tab: Screen.tabFitness, screen: dedicated.screen, params: dedicated.params };
  return { tab: Screen.tabFitness, screen: Screen.learningGuide, params: { topicId: guideId } };
}

function buildItems(): ContentLibraryItem[] {
  const guides: ContentLibraryItem[] = LEARNING_GUIDES.map((g) => ({
    id: `guide-${g.id}`,
    title: g.title,
    subtitle: g.subtitle,
    category: 'Learning Guides',
    icon: '📚',
    navigate: learningNavigate(g.id),
  }));

  const education: ContentLibraryItem[] = FITNESS_MODULES
    .filter((m) => m.category === 'education')
    .map((m) => ({
      id: `edu-${m.id}`,
      title: m.title,
      subtitle: m.subtitle,
      category: 'Health Education',
      icon: m.icon,
      navigate: { tab: Screen.tabFitness, screen: Screen.healthTopic, params: { topicId: m.id } },
    }));

  const mindBody: ContentLibraryItem[] = FITNESS_MODULES
    .filter((m) => m.category === 'mindBody' || m.category === 'workouts')
    .map((m) => ({
      id: `mb-${m.id}`,
      title: m.title,
      subtitle: m.subtitle,
      category: 'Mind & Body',
      icon: m.icon,
      navigate: { tab: Screen.tabFitness, screen: Screen.guidedProgram, params: { module: m } },
    }));

  const nutrition: ContentLibraryItem[] = FITNESS_MODULES
    .filter((m) => m.wellnessCategory === 'nutrition' || m.exploreTags?.includes('Nutrition'))
    .slice(0, 40)
    .map((m) => ({
      id: `nut-${m.id}`,
      title: m.title,
      subtitle: m.subtitle,
      category: 'Nutrition',
      icon: m.icon,
      navigate: m.id === 'meal-planner'
        ? { tab: Screen.tabFitness, screen: Screen.mealPlanner }
        : m.category === 'calculators'
          ? { tab: Screen.tabFitness, screen: Screen.healthCalculator, params: { calculatorId: m.id } }
          : { tab: Screen.tabFitness, screen: Screen.healthTopic, params: { topicId: m.id } },
    }));

  const programs: ContentLibraryItem[] = PROGRAM_CATALOG.map((p) => ({
    id: `prog-${p.id}`,
    title: p.title,
    subtitle: `${p.durationDays} days · ${p.description}`,
    category: 'Programs',
    icon: p.icon,
    navigate: { tab: Screen.tabMore, screen: Screen.programs },
  }));

  const seen = new Set<string>();
  return [...guides, ...education, ...mindBody, ...nutrition, ...programs].filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

export const CONTENT_LIBRARY_ITEMS = buildItems();

export const CONTENT_LIBRARY_CATEGORIES: ContentLibraryCategory[] = [
  'All', 'Learning Guides', 'Health Education', 'Mind & Body', 'Nutrition', 'Programs',
];

export function searchContentLibrary(
  query: string,
  category: ContentLibraryCategory = 'All',
): ContentLibraryItem[] {
  const q = query.trim().toLowerCase();
  return CONTENT_LIBRARY_ITEMS.filter((item) => {
    if (category !== 'All' && item.category !== category) return false;
    if (!q) return true;
    return (
      item.title.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  });
}
