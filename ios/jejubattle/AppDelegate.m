#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import "RNBootSplash.h" // <- add the header import
#import <GoogleMaps/GoogleMaps.h>
#import <Firebase.h>
#import <UserNotifications/UserNotifications.h>
#import <RNCPushNotificationIOS.h>

#import <KakaoOpenSDK/KakaoOpenSDK.h>
#import <FBSDKCoreKit/FBSDKCoreKit.h>
#import <React/RCTLinkingManager.h>
#import <NaverThirdPartyLogin/NaverThirdPartyLoginConnection.h>

#if DEBUG
#import <FlipperKit/FlipperClient.h>
#import <FlipperKitLayoutPlugin/FlipperKitLayoutPlugin.h>
#import <FlipperKitUserDefaultsPlugin/FKUserDefaultsPlugin.h>
#import <FlipperKitNetworkPlugin/FlipperKitNetworkPlugin.h>
#import <SKIOSNetworkPlugin/SKIOSNetworkAdapter.h>
#import <FlipperKitReactPlugin/FlipperKitReactPlugin.h>

static void InitializeFlipper(UIApplication *application) {
  FlipperClient *client = [FlipperClient sharedClient];
  SKDescriptorMapper *layoutDescriptorMapper = [[SKDescriptorMapper alloc] initWithDefaults];
  [client addPlugin:[[FlipperKitLayoutPlugin alloc] initWithRootNode:application withDescriptorMapper:layoutDescriptorMapper]];
  [client addPlugin:[[FKUserDefaultsPlugin alloc] initWithSuiteName:nil]];
  [client addPlugin:[FlipperKitReactPlugin new]];
  [client addPlugin:[[FlipperKitNetworkPlugin alloc] initWithNetworkAdapter:[SKIOSNetworkAdapter new]]];
  [client start];
}
#endif

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  if (@available(iOS 14, *)) {
  UIDatePicker *picker = [UIDatePicker appearance];
  picker.preferredDatePickerStyle = UIDatePickerStyleWheels;
  }

#if DEBUG
  InitializeFlipper(application);
#endif

  if ([FIRApp defaultApp] == nil) {
    [FIRApp configure];
  }

  [GMSServices provideAPIKey:@"AIzaSyB1MmZqZSsulLsArJQh1bpx63nZzzyP_P8"]; // add this line using the api key obtained from Google Console

  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"jejubattle"
                                            initialProperties:nil];

  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  [RNBootSplash initWithStoryboard:@"BootSplash" rootView:rootView]; // <- initialization using the storyboard file name
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  // Define UNUserNotificationCenter
  UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
  center.delegate = self;

  [[NaverThirdPartyLoginConnection getSharedInstance] setIsInAppOauthEnable:YES];
  NaverThirdPartyLoginConnection *thirdConn = [NaverThirdPartyLoginConnection getSharedInstance];
  [thirdConn setServiceUrlScheme:kServiceAppUrlScheme];
  [thirdConn setConsumerKey:kConsumerKey];
  [thirdConn setConsumerSecret:kConsumerSecret];
  [thirdConn setAppName:kServiceAppName];
  // // datetimepicker darkmode
  // if (@available(iOS 13, *)) {
  //   self.window.overrideUserInterfaceStyle = UIUserInterfaceStyleLight;
  // }
  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
                                                options:(NSDictionary<NSString *,id> *)options {
  // kakao login
  if ([KOSession isKakaoAccountLoginCallback:url]) {
    return [KOSession handleOpenURL:url];
  } else if ([[FBSDKApplicationDelegate sharedInstance] application:application openURL:url options:options]) {
    return true;
  } else if ([RCTLinkingManager application:application openURL:url options:options]) {
     // naver login
    if ([[NaverThirdPartyLoginConnection getSharedInstance] application:application openURL:url options:options]) {
      return true;
      // return [self handleWithUrl:url];
    } else {
      return true;
    }
  } else {
    return [[NaverThirdPartyLoginConnection getSharedInstance] application:application openURL:url options:options];
  }

//   // naver login
//   if ([[NaverThirdPartyLoginConnection getSharedInstance] application:application openURL:url options:options]) {
// //    return true;
//     return [self handleWithUrl:url];
//   }
  
  return false;
}

- (BOOL)handleWithUrl:(NSURL *)url {
  NSLog(@"url : %@", url);
  NSLog(@"url scheme : %@", url.scheme);
  //NSLog(@"url scheme : %@", kServiceAppUrlScheme);
  // NSLog(@"result - %d", [url.scheme isEqualToString:kServiceAppUrlScheme]);

  
      // 네이버앱으로부터 전달받은 url값을 NaverThirdPartyLoginConnection의 인스턴스에 전달
      NaverThirdPartyLoginConnection *thirdConnection = [NaverThirdPartyLoginConnection getSharedInstance];
      THIRDPARTYLOGIN_RECEIVE_TYPE resultType = [thirdConnection receiveAccessToken:url];

      if (SUCCESS == resultType) {
        NSLog(@"Getting auth code from NaverApp success!");
      } else {
        NSLog(@"  Error  ::  %u", resultType);
        // 앱에서 resultType에 따라 실패 처리한다.
        /*  SUCCESS = 0, PARAMETERNOTSET = 1, CANCELBYUSER = 2, NAVERAPPNOTINSTALLED = 3 , NAVERAPPVERSIONINVALID = 4,
         .  OAUTHMETHODNOTSET = 5, INVALIDREQUEST = 6, CLIENTNETWORKPROBLEM = 7, UNAUTHORIZEDCLIENT = 8,
         .  UNSUPPORTEDRESPONSETYPE = 9, NETWORKERROR = 10, UNKNOWNERROR = 11 */
      }
  return YES;
}

- (void)applicationDidBecomeActive:(UIApplication *)application
{
    [KOSession handleDidBecomeActive];
}

// Required to register for notifications
- (void)application:(UIApplication *)application didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings
{
 [RNCPushNotificationIOS didRegisterUserNotificationSettings:notificationSettings];
}
// Required for the register event.
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
 [RNCPushNotificationIOS didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
}
// Required for the notification event. You must call the completion handler after handling the remote notification.
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler
{
  [RNCPushNotificationIOS didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
}
// Required for the registrationError event.
- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
{
 [RNCPushNotificationIOS didFailToRegisterForRemoteNotificationsWithError:error];
}
// IOS 10+ Required for localNotification event
- (void)userNotificationCenter:(UNUserNotificationCenter *)center
didReceiveNotificationResponse:(UNNotificationResponse *)response
         withCompletionHandler:(void (^)(void))completionHandler
{
  [RNCPushNotificationIOS didReceiveNotificationResponse:response];
  completionHandler();
}
// IOS 4-10 Required for the localNotification event.
- (void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification
{
 [RNCPushNotificationIOS didReceiveLocalNotification:notification];
}

//Called when a notification is delivered to a foreground app.
-(void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler
{
  completionHandler(UNAuthorizationOptionSound | UNAuthorizationOptionAlert | UNAuthorizationOptionBadge);
}

@end
