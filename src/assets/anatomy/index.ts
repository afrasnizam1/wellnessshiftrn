import type { ImageSourcePropType } from 'react-native';

/** Photorealistic hologram thumbnails for clinician / hub chips. */
export const ANATOMY_MODULE_IMAGES: Record<string, ImageSourcePropType> = {
  'heart-hologram': require('./heart.png'),
  'heart-lungs-hologram': require('./heart-lungs.png'),
  'heart-conduction-system': require('./heart-bronchial.png'),
  'brain-model': require('./brain.png'),
  'lung-model': require('./lungs.png'),
  'stomach-model': require('./stomach.png'),
  'skeleton-model': require('./skeleton.png'),
  'muscle-model': require('./skeleton.png'),
  'anatomy-study': require('./skeleton.png'),
};
