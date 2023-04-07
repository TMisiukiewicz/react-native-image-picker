import {
  ConfigPlugin,
  createRunOncePlugin,
  withInfoPlist,
  AndroidConfig,
} from '@expo/config-plugins';

interface Permissions {
  photoLibraryPermission?: string;
  cameraPermission?: string;
  microphonePermission?: string;
}

const LIBRARY_USAGE = 'Allow to use photo library';
const CAMERA_USAGE = 'Allow to use camera';
const MIC_USAGE = 'Allow to use microphone';

const withImagePicker: ConfigPlugin<Permissions> = (
  config,
  {photoLibraryPermission, cameraPermission, microphonePermission},
) => {
  config = withInfoPlist(config, (config) => {
    config.modResults.NSPhotoLibraryUsageDescription =
      photoLibraryPermission ||
      config.modResults.NSPhotoLibraryUsageDescription ||
      LIBRARY_USAGE;
    config.modResults.NSCameraUsageDescription =
      cameraPermission ||
      config.modResults.NSCameraUsageDescription ||
      CAMERA_USAGE;
    config.modResults.NSMicrophoneUsageDescription =
      microphonePermission ||
      config.modResults.NSMicrophoneUsageDescription ||
      MIC_USAGE;

    return config;
  });

  config = AndroidConfig.Permissions.withPermissions(config, [
    'android.permission.CAMERA',
    // Optional
    'android.permission.RECORD_AUDIO',
  ]);

  return config;
};

export default createRunOncePlugin(
  withImagePicker,
  'react-native-image-picker',
);
