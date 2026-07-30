export type HologramQuickStat = {
  icon: string;
  value: string;
  label: string;
};

export type HologramStatCard = {
  icon: string;
  title: string;
  stat: string;
  description: string;
  color: string;
};

export type HologramFactCard = {
  icon: string;
  title: string;
  fact: string;
  color: string;
};

export type HologramHealthIssue = {
  name: string;
  causes: string[];
};

export type HologramOrganHealth = {
  organName: string;
  bestFoods: string[];
  bestFluids: string[];
  commonIssues: HologramHealthIssue[];
  preventionTips: string[];
};

export type HologramImportance = {
  title: string;
  importance: string;
  value: string;
  benefits: string[];
};

export type HologramTabLabels = {
  model: string;
  stats: string;
  facts: string;
};

export type HologramTutorContent = {
  tabs: HologramTabLabels;
  importance: HologramImportance | null;
  organHealth: HologramOrganHealth | null;
  quickStats: HologramQuickStat[];
  stats: HologramStatCard[];
  facts: HologramFactCard[];
};

export type HologramTutorTab = 'model' | 'stats' | 'facts';
