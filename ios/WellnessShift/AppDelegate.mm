#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <ReactAppDependencyProvider/RCTAppDependencyProvider.h>
#import <FirebaseCore/FirebaseCore.h>

@implementation AppDelegate

/// Stash CSQ QR deeplink for JS to handle AFTER CSQ.start().
/// Calling [CSQ handleWithUrl:] here (before start / inside openURL) freezes the app.
static void CSQStashPendingURL(NSURL *url)
{
  if (url == nil) {
    return;
  }
  NSString *scheme = url.scheme ?: @"";
  NSString *abs = url.absoluteString ?: @"";
  BOOL isCsq = [scheme hasPrefix:@"cs-"] || [abs containsString:@"contentsquare"];
  if (!isCsq) {
    return;
  }
  NSLog(@"[CSQ] stash pending activation URL: %@", abs);
  [[NSUserDefaults standardUserDefaults] setObject:abs forKey:@"CSQPendingActivationURL"];
  [[NSUserDefaults standardUserDefaults] synchronize];
}

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [FIRApp configure];

#if TARGET_OS_SIMULATOR
  [[NSUserDefaults standardUserDefaults] setBool:YES forKey:@"WS_IS_SIMULATOR"];
#else
  [[NSUserDefaults standardUserDefaults] setBool:NO forKey:@"WS_IS_SIMULATOR"];
#endif
  [[NSUserDefaults standardUserDefaults] synchronize];

  self.dependencyProvider = [RCTAppDependencyProvider new];
  self.moduleName = @"WellnessShift";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  NSURL *launchURL = launchOptions[UIApplicationLaunchOptionsURLKey];
  if (launchURL != nil) {
    CSQStashPendingURL(launchURL);
  }

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

/**
 * Contentsquare Snapshot / in-app features QR deeplink.
 * Do NOT call CSQ.handle here — SDK is started from JS; early handle freezes UI.
 * Stash + forward to RN Linking; JS calls CSQ.handleUrl after CSQ.start().
 */
- (BOOL)application:(UIApplication *)app
            openURL:(NSURL *)url
            options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
  CSQStashPendingURL(url);
  return [super application:app openURL:url options:options];
}

- (NSURL *)bundleURL
{
  return [self getBundleURL];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self getBundleURL];
}

- (NSURL *)getBundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
