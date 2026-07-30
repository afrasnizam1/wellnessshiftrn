import React from 'react';
import { CSQMask } from '@contentsquare/react-native-bridge';
import { appConfig } from '../../config/appConfig';

type Props = {
  children: React.ReactNode;
};

/**
 * Optionally masks sensitive inputs in Session Replay.
 * When contentsquareDefaultMasking is false, content is left unmasked (full replays).
 */
export function SensitiveCSQMask({ children }: Props) {
  if (!appConfig.contentsquareDefaultMasking) {
    return <>{children}</>;
  }

  return (
    <CSQMask isSessionReplayMasked ignoreTextOnly>
      {children}
    </CSQMask>
  );
}
