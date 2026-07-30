import React from 'react';
import { View, type ViewProps } from 'react-native';

/**
 * No-op stub for Jest / non-native environments only.
 * Production iOS + Android use the real `@contentsquare/react-native-bridge` (do not Metro-stub Android).
 */
export const CSQ = {
  start: () => {},
  optIn: () => {},
  optOut: () => {},
  identify: () => {},
  sendUserIdentifier: () => {},
  addUserProperties: () => {},
  resetIdentity: () => {},
  setDefaultMasking: () => {},
  logToConsole: () => {},
  onMetadataChange: () => () => {},
  onSessionReplayLinkChange: () => () => {},
  trackScreenview: () => {},
  trackTransaction: () => {},
  trackEvent: () => {},
  triggerReplayForCurrentSession: () => {},
  startSessionReplay: () => {},
  stopSessionReplay: () => {},
  handleUrl: (_url?: string | null) => {},
};

export const Currency = { GBP: 'GBP' };

export const StartConfig = {
  withDataSourceId: (_id: string, _opts?: object) => ({}),
  withEnvironmentId: (_id: string, _opts?: object) => ({}),
};

export const CSQWebView = (props: ViewProps) => React.createElement(View, props);

export const CSQMask = ({ children }: { children?: React.ReactNode }) =>
  React.createElement(React.Fragment, null, children);
