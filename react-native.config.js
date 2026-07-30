const fs = require('fs');
const path = require('path');

const hasGoogleServices = fs.existsSync(
  path.join(__dirname, 'android/app/google-services.json'),
);

/**
 * Firebase App Check's Android native module calls FirebaseAppCheck.getInstance()
 * in its constructor, which crashes when google-services.json is absent (demo mode).
 * Re-enable automatically once the real file is added.
 */
module.exports = {
  assets: ['./node_modules/react-native-vector-icons/Fonts'],
  dependencies: {
    '@react-native-firebase/app-check': {
      platforms: {
        android: hasGoogleServices ? {} : null,
        ios: hasGoogleServices ? {} : null,
      },
    },
  },
};
