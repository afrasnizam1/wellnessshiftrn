/**
 * @format
 */

import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';

// Defer heavy module graph + native hooks until after AppRegistry is set up.
AppRegistry.registerComponent(appName, () => require('./App').default);
