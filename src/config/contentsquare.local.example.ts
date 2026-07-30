/**
 * Copy to `contentsquare.local.ts` and set your Contentsquare IDs.
 * CI can generate that file from env vars before build:
 *   CONTENTSQUARE_DATA_SOURCE_ID
 *   CONTENTSQUARE_ENVIRONMENT_ID (shared fallback)
 *   CONTENTSQUARE_ENVIRONMENT_ID_IOS
 *   CONTENTSQUARE_ENVIRONMENT_ID_ANDROID
 */
export default {
  /** Preferred when available — ask Contentsquare for your data source ID */
  dataSourceId: undefined as string | undefined,
  /** Shared fallback if a platform-specific ID is not set */
  environmentId: 'YOUR_ENVIRONMENT_ID',
  /** iOS Contentsquare Apps environment / project ID */
  environmentIdIos: 'YOUR_IOS_ENVIRONMENT_ID',
  /** Android Contentsquare Apps environment / project ID */
  environmentIdAndroid: 'YOUR_ANDROID_ENVIRONMENT_ID',
};
