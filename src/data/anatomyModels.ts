/** Native iOS USDZ hologram models — same files as Wellness Shift V2 native app */

import type { IoniconName } from '../theme/icons';

export type HologramPreset =
  | 'brain'
  | 'lung'
  | 'stomach'
  | 'anatomy'
  | 'skeleton'
  | 'ecorche'
  | 'beatingHeart'
  | 'heartLungs'
  | 'heartBronchial';

export type AnatomyModelMeta = {
  title: string;
  icon: IoniconName;
  color: string;
  description: string;
  funFacts: string[];
  /** USDZ resource name (without extension) bundled in ios/WellnessShift/Models */
  usdzFile: string;
  preset: HologramPreset;
};

export const ANATOMY_MODELS: Record<string, AnatomyModelMeta> = {
  'heart-hologram': {
    title: 'Beating Heart Hologram',
    icon: 'pulse',
    color: '#E74C3C',
    description: 'Animated realistic heart with smooth beating motion — rotate and zoom to explore chambers and vessels.',
    funFacts: [
      'Beats ~100,000 times per day pumping ~5 L/min',
      'Morph targets drive the beating animation in the native model',
      'Same SceneKit hologram as the native iOS app',
    ],
    usdzFile: 'Beating-heart',
    preset: 'beatingHeart',
  },
  'heart-lungs-hologram': {
    title: 'Heart & Lungs Hologram',
    icon: 'heart-circle-outline',
    color: '#C0392B',
    description: 'Adult heart seated within the bronchial tree and lung fields — the native cardio-respiratory hologram.',
    funFacts: [
      'Shows primary, secondary, and segmental bronchi',
      'Heart rate at rest is typically 60–100 bpm',
      'Adults breathe ~12–18 times per minute at rest',
    ],
    usdzFile: 'adult_heart_and_lungs',
    preset: 'heartLungs',
  },
  'heart-conduction-system': {
    title: 'Heart & Bronchial Airways',
    icon: 'git-network-outline',
    color: '#E74C3C',
    description: 'Adult heart with bronchial airways — native 3D anatomy model for cardio-respiratory study.',
    funFacts: [
      'Shows heart seated within the bronchial tree',
      'Useful for understanding cardio-respiratory anatomy together',
      'Identical USDZ asset from the native iOS app',
    ],
    usdzFile: 'adult_heart_and_bronchial_airways',
    preset: 'heartBronchial',
  },
  'brain-model': {
    title: 'Brain Hologram',
    icon: 'bulb-outline',
    color: '#9B59B6',
    description: 'High-detail human brain hologram — gyri, sulci, and cerebellum in native SceneKit 3D.',
    funFacts: [
      '~86 billion neurons, 100 trillion synapses',
      'Uses ~20% of the body\'s energy at rest',
      'Same Brain_hologram.usdz as native iOS',
    ],
    usdzFile: 'Brain_hologram',
    preset: 'brain',
  },
  'lung-model': {
    title: 'Lung Hologram',
    icon: 'fitness-outline',
    color: '#3498DB',
    description: 'Bilateral lungs with trachea and bronchi — native lung hologram on a black SceneKit canvas.',
    funFacts: [
      '~300 million alveoli — tennis-court surface area',
      'Right lung has three lobes; left has two',
      'You breathe ~22,000 times per day',
    ],
    usdzFile: 'Struktur_Paru-Paru_Manusia_3D_Model',
    preset: 'lung',
  },
  'stomach-model': {
    title: 'Stomach Hologram',
    icon: 'nutrition-outline',
    color: '#27AE60',
    description: 'Realistic isolated stomach with surface detail — curvature, fundus, and pyloric region in 3D.',
    funFacts: [
      'Produces up to 3 L of gastric acid daily',
      'Mucosal lining renews every 3–4 days',
      'Three muscle layers churn food (peristalsis)',
    ],
    usdzFile: 'Realistic_Human_Stomach',
    preset: 'stomach',
  },
  'skeleton-model': {
    title: 'Skeleton Hologram',
    icon: 'skull-outline',
    color: '#95A5A6',
    description: 'Full standing human skeleton with textured bone detail — native SceneKit hologram viewer.',
    funFacts: [
      'Babies have ~270 bones; many fuse with age',
      'Femur is the longest and strongest bone',
      'Bone is living tissue that constantly remodels',
    ],
    usdzFile: 'Free_Pack_-_Human_Skeleton',
    preset: 'skeleton',
  },
  'muscle-model': {
    title: 'Ecorche Hologram',
    icon: 'barbell-outline',
    color: '#E67E22',
    description: 'Full-body écorché muscle anatomy study — same Male_Full_Body_Ecorche.usdz as native iOS.',
    funFacts: [
      '600+ skeletal muscles in the human body',
      'Muscles generate ~85% of body heat during exercise',
      'The masseter can exert the greatest bite force',
    ],
    usdzFile: 'Male_Full_Body_Ecorche',
    preset: 'ecorche',
  },
  'anatomy-study': {
    title: 'Anatomy Study Hologram',
    icon: 'body-outline',
    color: '#E67E22',
    description: 'Écorché anatomy study figure — native Ecorche_-_Anatomy_study.usdz hologram.',
    funFacts: [
      'Classic anatomy study pose for muscle identification',
      '650+ muscles and 206 bones in the human body',
      'Identical asset from the native iOS Fitness Hub',
    ],
    usdzFile: 'Ecorche_-_Anatomy_study',
    preset: 'anatomy',
  },
};

export function getAnatomyModel(modelId: string): AnatomyModelMeta {
  return ANATOMY_MODELS[modelId] ?? ANATOMY_MODELS['heart-hologram'];
}

/** Sketchfab embed URL for WebView anatomy fallbacks. */
export function buildSketchfabEmbedUrl(
  sketchfabId: string,
  options?: { animated?: boolean },
): string {
  const params = new URLSearchParams({
    autostart: '1',
    ui_theme: 'dark',
    ui_infos: '0',
    ui_controls: '1',
    ui_stop: '0',
    transparent: '0',
  });
  if (options?.animated === false) {
    params.set('animation_autoplay', '0');
  }
  return `https://sketchfab.com/models/${encodeURIComponent(sketchfabId)}/embed?${params.toString()}`;
}
