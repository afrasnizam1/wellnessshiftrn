declare module 'react-native-vector-icons/Ionicons' {
  import * as React from 'react';
  import { TextProps } from 'react-native';

  export type IoniconName = string;
  export const glyphMap: Record<string, number>;

  export interface IconProps extends TextProps {
    name: IoniconName;
    size?: number;
    color?: string;
    allowFontScaling?: boolean;
  }

  export default class Icon extends React.Component<IconProps> {
    static glyphMap: Record<string, number>;
    static getRawGlyphMap(): Record<string, number>;
    static hasIcon(name: string): boolean;
    static loadFont(file?: string): Promise<void>;
  }
}

declare module 'react-native-reanimated' {
  import * as React from 'react';

  namespace Animated {
    export const View: React.ComponentType<any>;
    export const Text: React.ComponentType<any>;
    export const ScrollView: React.ComponentType<any>;
    export const createAnimatedComponent: <T extends React.ComponentType<any>>(component: T) => T;
  }
}

declare module 'react-native-health-connect' {
  export type TimeRangeFilter = {
    operator: 'between' | 'before' | 'after';
    startTime?: string;
    endTime?: string;
  };
}
