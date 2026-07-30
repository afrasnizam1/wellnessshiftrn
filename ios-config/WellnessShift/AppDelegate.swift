// ios/WellnessShift/AppDelegate.swift
// Replace the generated AppDelegate with this file after running react-native init

import UIKit
import React
import Firebase
import FirebaseMessaging
import GoogleSignIn
import UserNotifications

@main
class AppDelegate: UIResponder, UIApplicationDelegate, UNUserNotificationCenterDelegate, MessagingDelegate {

  var window: UIWindow?

  func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
  ) -> Bool {

    // ── Firebase ──────────────────────────────────────────────────────────
    FirebaseApp.configure()

    // ── Firebase Messaging ────────────────────────────────────────────────
    Messaging.messaging().delegate = self
    UNUserNotificationCenter.current().delegate = self

    // ── React Native bridge ───────────────────────────────────────────────
    let bridge = RCTBridge(delegate: self, launchOptions: launchOptions)!
    let rootView = RCTRootView(bridge: bridge, moduleName: "WellnessShift", initialProperties: nil)
    rootView.backgroundColor = UIColor(red: 0.48, green: 0.31, blue: 0.83, alpha: 1) // primary purple

    let rootViewController = UIViewController()
    rootViewController.view = rootView

    self.window = UIWindow(frame: UIScreen.main.bounds)
    self.window!.rootViewController = rootViewController
    self.window!.makeKeyAndVisible()

    return true
  }

  // ── Google Sign In URL handler ────────────────────────────────────────
  func application(
    _ app: UIApplication,
    open url: URL,
    options: [UIApplication.OpenURLOptionsKey: Any] = [:]
  ) -> Bool {
    return GIDSignIn.sharedInstance.handle(url)
  }

  // ── Push notification registration ───────────────────────────────────
  func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
    Messaging.messaging().apnsToken = deviceToken
  }

  func application(_ application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: Error) {
    print("Failed to register for push notifications: \(error)")
  }

  // ── FCM token refresh ─────────────────────────────────────────────────
  func messaging(_ messaging: Messaging, didReceiveRegistrationToken fcmToken: String?) {
    print("FCM token: \(fcmToken ?? "nil")")
    // Post to React Native side via NotificationCenter if needed
    NotificationCenter.default.post(
      name: Notification.Name("FCMToken"),
      object: nil,
      userInfo: ["token": fcmToken ?? ""]
    )
  }

  // ── Foreground notification display ───────────────────────────────────
  func userNotificationCenter(
    _ center: UNUserNotificationCenter,
    willPresent notification: UNNotification,
    withCompletionHandler completionHandler: @escaping (UNNotificationPresentationOptions) -> Void
  ) {
    completionHandler([.banner, .sound, .badge])
  }

  // ── Notification tap handler ──────────────────────────────────────────
  func userNotificationCenter(
    _ center: UNUserNotificationCenter,
    didReceive response: UNNotificationResponse,
    withCompletionHandler completionHandler: @escaping () -> Void
  ) {
    let userInfo = response.notification.request.content.userInfo
    // React Native Firebase handles this automatically
    completionHandler()
  }
}

// ── React Native bridge delegate ─────────────────────────────────────────────
extension AppDelegate: RCTBridgeDelegate {
  func sourceURL(for bridge: RCTBridge!) -> URL! {
#if DEBUG
    return RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
#else
    return Bundle.main.url(forResource: "main", withExtension: "jsbundle")
#endif
  }
}
