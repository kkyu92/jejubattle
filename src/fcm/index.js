import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';

export async function registerAppWithFCM() {
  await messaging().registerDeviceForRemoteMessages();
}

export async function requestPermission() {
  const authorizationStatus = await messaging().requestPermission();

  if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
    console.groupCollapsed('[Messaging Permission Granted]');
    console.log('authorizationStatus', authorizationStatus);
    console.groupEnd();
  } else if (
    authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL // Silent Notification
  ) {
    console.groupCollapsed('[Messaging Permission Provisional]');
    console.log('authorizationStatus', authorizationStatus);
    console.groupEnd();
  } else {
    console.groupCollapsed('[Messaging Permission Denied]');
    console.log('authorizationStatus', authorizationStatus);
    console.groupEnd();
  }
}

export async function hasPermission() {
  return await messaging().hasPermission();
}

export async function getFcmToken() {
  const granted = await hasPermission();
  console.log('getFcmToken authorizationStatus', granted);

  // -1 = messaging.AuthorizationStatus.NOT_DETERMINED: Permission has not yet been requested for your application.
  // 0 = messaging.AuthorizationStatus.DENIED: The user has denied notification permissions.
  // 1 = messaging.AuthorizationStatus.AUTHORIZED: The user has accept the permission & it is enabled.
  // 2 = messaging.AuthorizationStatus.PROVISIONAL: Provisional authorization has been granted.
  if (granted) {
    const token = await messaging().getToken();
    global.fcmToken = token;
    console.groupCollapsed('[FCM]');
    console.info(token);
    console.groupEnd();
    await AsyncStorage.setItem('fcmToken', token);
  }
}
