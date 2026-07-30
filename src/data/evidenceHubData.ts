export type EvidenceArticle = {
  id: string;
  title: string;
  summary: string;
  source: string;
  year: number;
  category: string;
  url?: string;
};

export const EVIDENCE_ARTICLES: EvidenceArticle[] = [
  {
    id: 'steps-mortality',
    title: 'Daily step count and all-cause mortality',
    summary: 'Higher daily step counts associate with lower mortality in adults, with benefits continuing beyond 8,000 steps/day in older populations.',
    source: 'JAMA Internal Medicine',
    year: 2022,
    category: 'Physical Activity',
    url: 'https://pubmed.ncbi.nlm.nih.gov/',
  },
  {
    id: 'meditation-anxiety',
    title: 'Mindfulness meditation for anxiety',
    summary: 'Structured mindfulness programmes show moderate reductions in anxiety symptoms compared to control conditions.',
    source: 'JAMA Psychiatry',
    year: 2021,
    category: 'Mental Health',
  },
  {
    id: 'sleep-duration',
    title: 'Sleep duration and cardiometabolic risk',
    summary: 'Both short and long sleep durations are linked to adverse cardiometabolic profiles; 7–9 hours is recommended for adults.',
    source: 'Sleep Medicine Reviews',
    year: 2020,
    category: 'Sleep',
  },
  {
    id: 'mediterranean-diet',
    title: 'Mediterranean diet and cardiovascular outcomes',
    summary: 'Diets rich in vegetables, olive oil, fish, and whole grains reduce major cardiovascular events in high-risk groups.',
    source: 'New England Journal of Medicine',
    year: 2018,
    category: 'Nutrition',
  },
  {
    id: 'resistance-training',
    title: 'Resistance training for older adults',
    summary: 'Progressive resistance exercise improves strength, balance, and functional independence in adults over 65.',
    source: 'British Journal of Sports Medicine',
    year: 2019,
    category: 'Physical Activity',
  },
];
