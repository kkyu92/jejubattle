/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import moment from 'moment';

console.disableYellowBox = true;

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('Message handled in the background!', remoteMessage);
  PushNotification.createChannel(
    {
      channelId: '3429', // (required)
      channelName: 'My channel', // (required)
      channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
      playSound: true, // (optional) default: true
      soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
      importance: 4, // (optional) default: 4. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    },
    (created) => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
  );
  let data = remoteMessage.data;
  if (data) {
    PushNotification.localNotification({
      /* Android Only Properties */
      ...buildAndroidNotification(data.baPk, data.title, data.body, data),
      /* iOS and Android properties */
      ...buildIOSNotification(data.baPk, data.title, data.body, data),
      /* iOS and Android properties */
      title: data.title || '',
      message: data.body || '',
      playSound: false,
      soundName: 'default',
      userInteraction: false, // If the notification was opened by the user from the notification area or not
      ignoreInForeground: false,
      channelId: '3429',
    });
  }
});

function buildAndroidNotification(id, title, message, data = {}) {
  return {
    id: id,
    autoCancel: true,
    largeIconUrl: data.imgUrl || 'ic_launcher',
    smallIcon: 'ic_notification',
    bigText: message || '',
    // subText: title || '',
    subText: moment(data.time).format('LT'),
    vibrate: true,
    vibration: 300,
    priority: 'high',
    data,
  };
}

function buildIOSNotification(id, title, message, data = {}) {
  return {
    alertAction: 'view',
    category: '',
    userInfo: {
      id: id,
      baPk: data.baPk,
      title: data.title,
      body: data.body,
      screen: data.screen,
      tabIndex: data.tabIndex,
    },
  };
}

function HeadlessCheck({isHeadless}) {
  if (isHeadless) {
    console.log('isHeadless : ' + isHeadless);
    // App has been launched in the background by iOS, ignore
    return null;
  }
  console.log(isHeadless);
  return <App />;
}

AppRegistry.registerComponent(appName, () => HeadlessCheck);
