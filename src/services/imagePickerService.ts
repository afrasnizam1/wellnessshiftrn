import { Alert, Platform } from 'react-native';
import {
  launchCamera,
  launchImageLibrary,
  type ImageLibraryOptions,
  type CameraOptions,
  type Asset,
} from 'react-native-image-picker';

export type PickedImage = {
  uri: string;
  type?: string;
  fileName?: string;
};

const LIBRARY_OPTS: ImageLibraryOptions = {
  mediaType: 'photo',
  quality: 0.75,
  selectionLimit: 1,
};

const CAMERA_OPTS: CameraOptions = {
  mediaType: 'photo',
  quality: 0.75,
  saveToPhotos: false,
  cameraType: 'back',
};

function firstAsset(assets?: Asset[]): PickedImage | null {
  const asset = assets?.[0];
  if (!asset?.uri) return null;
  return {
    uri: asset.uri,
    type: asset.type,
    fileName: asset.fileName,
  };
}

/**
 * Bare-RN image picker (no Expo runtime / globalThis.expo required).
 */
export const imagePickerService = {
  pickFromLibrary: async (): Promise<PickedImage | null> => {
    const result = await launchImageLibrary(LIBRARY_OPTS);
    if (result.didCancel) return null;
    if (result.errorCode) {
      Alert.alert(
        'Photo library',
        result.errorMessage ?? 'Could not open your photo library. Check permissions in Settings.',
      );
      return null;
    }
    return firstAsset(result.assets);
  },

  pickFromCamera: async (): Promise<PickedImage | null> => {
    if (Platform.OS === 'web') {
      Alert.alert('Camera', 'Camera capture is not available on web.');
      return null;
    }
    const result = await launchCamera(CAMERA_OPTS);
    if (result.didCancel) return null;
    if (result.errorCode) {
      Alert.alert(
        'Camera',
        result.errorMessage ?? 'Could not open the camera. Check permissions in Settings.',
      );
      return null;
    }
    return firstAsset(result.assets);
  },
};
