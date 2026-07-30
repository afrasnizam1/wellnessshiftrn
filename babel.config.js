module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    '@babel/plugin-transform-class-static-block',
    ['module-resolver', {
      root: ['./src'],
      alias: { '@': './src' },
    }],
    // CSQ autocapture for interactions. Pageviews are manual via RootNavigator
    // (`Section - Screen`); babel pageview instrumentation would double-fire.
    ['@contentsquare/react-native-bridge/babel', {
      disablePageviewInstrumentation: true,
    }],
    'react-native-worklets/plugin', // must be last
  ],
};
