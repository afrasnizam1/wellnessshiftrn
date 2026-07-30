/** Local CSQ overrides — do not commit real production IDs to shared branches. */
export default {
  dataSourceId: undefined as string | undefined,
  /** Shared fallback if a platform-specific ID is not set */
  environmentId: '2039001180',
  /** iOS Contentsquare Apps environment / project ID */
  environmentIdIos: '2039001180',
  /** Android Contentsquare Apps environment / project ID */
  environmentIdAndroid: '2039001180',
};
