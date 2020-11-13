import messaging from '@react-native-firebase/messaging';
import {Platform} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

class FCMService {
  register = (onNotification, onOpenNotification) => {
    // this.checkPermission(onRegister)
    // this.createNotificationListeners(onRegister, onNotification, onOpenNotification)
    this.createNotificationListeners(onNotification, onOpenNotification);
  };

  requestPermission = async () => {
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
  };

  getFcmToken = async () => {
    const granted = await messaging().hasPermission();

    if (granted) {
      const token = await messaging().getToken();
      global.fcmToken = token;
      console.groupCollapsed('[FCM]');
      console.info(token);
      console.groupEnd();
      await AsyncStorage.setItem('fcmToken', token);
    }
  };

  deleteToken = () => {
    console.log('[FCMService] deleteToken');
    messaging()
      .deleteToken()
      .catch((error) => {
        console.log('[FCMService] Delete token error ', error);
      });
  };

  createNotificationListeners = (onNotification, onOpenNotification) => {
    // background
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log(
        '[FCMService] Message handled in the background!',
        remoteMessage,
      );
      if (remoteMessage) {
        let notification = null;
        if (Platform.OS === 'ios') {
          notification = {
            ...remoteMessage.data,
            id: remoteMessage.data.baPk,
          };
        } else {
          // notification = remoteMessage.notification
          notification = {
            ...remoteMessage.data,
            id: remoteMessage.data.baPk,
            time: remoteMessage.sentTime,
          };
        }
        onNotification(notification);
      }
    });

    // background > foreground
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        '[FCMService] onNotificationOpenedApp Notification caused app to open ',
        JSON.stringify(remoteMessage),
      );
      if (remoteMessage) {
        let notification = null;
        if (Platform.OS === 'ios') {
          notification = {
            ...remoteMessage.data,
            id: remoteMessage.data.baPk,
          };
        } else {
          // notification = remoteMessage.notification
          notification = {
            ...remoteMessage.data,
            id: remoteMessage.data.baPk,
            time: remoteMessage.sentTime,
          };
        }
        onOpenNotification(notification);
      }
    });

    // closed > foreground
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        console.log(
          '[FCMService] getInitialNotification caused app to open from quit state: ',
          JSON.stringify(remoteMessage),
        );
        if (remoteMessage) {
          let notification = null;
          if (Platform.OS === 'ios') {
            notification = {
              ...remoteMessage.data,
              id: remoteMessage.data.baPk,
            };
          } else {
            // notification = remoteMessage.notification
            notification = {
              ...remoteMessage.data,
              id: remoteMessage.data.baPk,
              time: remoteMessage.sentTime,
            };
          }
          onOpenNotification(notification);
        }
      });

    // Foreground
    this.messageListener = messaging().onMessage(async (remoteMessage) => {
      console.log('[FCMService] A new FCM message arrived! ', remoteMessage);
      if (remoteMessage) {
        let notification = null;
        if (Platform.OS === 'ios') {
          notification = {
            ...remoteMessage.data,
            id: remoteMessage.data.baPk,
          };
        } else {
          // notification = remoteMessage.notification
          notification = {
            ...remoteMessage.data,
            id: remoteMessage.data.baPk,
            time: remoteMessage.sentTime,
          };
        }
        onNotification(notification);
      }
    });

    // Triggered when have new token
    // messaging().onTokenRefresh(fcmToken => {
    //     console.log('[FCMService] New token refresh: ', fcmToken)
    //     onRegister(fcmToken)
    // })
  };

  unRegister = () => {
    this.messageListener();
  };
}

export const fcmService = new FCMService();
