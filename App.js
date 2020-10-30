/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import {useColorScheme, AppState, Platform, Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {navigationRef} from './src/navigations/RootNavigation';
import * as RootNavigation from './src/navigations/RootNavigation';
import {
  GEOCODE_API,
  BUNDLE_ID,
  PACKAGE_NAME,
  IOS_STORE_ID,
  FIREBASE_WEB_API,
  custom,
  ANDROID_PLAY_STORE,
  IOS_APP_STORE,
} from './src/config';
import {AppContext, useAppReducer} from './src/context';
import AppStackScreen from './src/navigations/AppStack';
import AuthStackScreen from './src/navigations/AuthStack';
import {requestPermission, getFcmToken} from './src/fcm';
import {fcmService} from './src/fcm/FCMService';
import RNBootSplash from 'react-native-bootsplash';
import Init from './src/commons/Init';
import Axios from 'axios';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import messaging from '@react-native-firebase/messaging';
import {Nuno} from './src/react-native-nuno-ui';
import {logApi, showToast} from './src/react-native-nuno-ui/funcs';
import {localNotificationService} from './src/fcm/LocalNotificationService';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import AsyncStorage from '@react-native-community/async-storage';

const Stack = createStackNavigator();

Nuno.init({
  themeColor: custom.themeColor,
  textColor: custom.textColor,
  headerTitleWeight: custom.headerTitleWeight,
  dynamicLink: custom.dynamicLink,
  mapProvider: custom.mapProvider,
  FIREBASE_WEB_API: FIREBASE_WEB_API,
  IOS_STORE_ID: IOS_STORE_ID,
  PACKAGE_NAME: PACKAGE_NAME,
  BUNDLE_ID: BUNDLE_ID,
  GEOCODE_API: GEOCODE_API,
  ANDROID_PLAY_STORE: ANDROID_PLAY_STORE,
  IOS_APP_STORE: IOS_APP_STORE,
});

// const App: () => React$Node = () => {
export default function App() {
  const context = React.useContext(AppContext);
  const colorScheme = useColorScheme();
  const {state, dispatch} = useAppReducer();
  const [ready, setReady] = React.useState(false);

  const theme = {
    colors: {
      // background: colorScheme === 'light' ? 'white' : 'black',
      background: 'white',
    },
  };

  let init = async () => {
    // …do multiple async tasks
    // await registerAppWithFCM(); // auto registration firebase.json
    await fcmService.requestPermission();
    await fcmService.getFcmToken();
    await Init();
    await getPush();
    // await locationInit();
    if (global.token) {
      await Axios.post('getme', {})
        .then((res) => {
          logApi('getme', res.data);
          dispatch({
            type: 'AUTHORIZED',
            data: {...res.data},
            // data: res.data.baPk
            //   ? {
            //       ...res.data,
            //     }
            //   : {
            //       ...res.data,
            //       baPk: 0,
            //     },
          });
        })
        .catch((err) => {
          logApi('getme error', err.response);
        });
    }
  };

  React.useEffect(() => {
    if (!ready) {
      init().finally(() => {
        setReady(true);
        RNBootSplash.hide({duration: 500});
        dynamicLinks()
          .getInitialLink()
          .then((link) => {
            console.log('dynamic link', link);
            link && handleRoute(link.url);
          });
        fcmService.register(onNotification, onOpenNotification);
        localNotificationService.configure(onOpenNotification);

        async function onNotification(notify) {
          let baPk = await AsyncStorage.getItem('baPk');
          // baPk = JSON.parse(baPk);
          // baPk = JSON.stringify(baPk);
          console.log('async baPk : ' + baPk);
          console.log('onNoti baPk : ' + notify.baPk);
          console.log('[APP] onNotification : ' + JSON.stringify(notify));

          if (notify.screen === 'battleview') {
            // system msg
            if (baPk === '0') {
              // 배틀방이 아님
              console.log('배틀방아님');
              const options = {
                soundName: 'default',
                playSound: true,
              };
              localNotificationService.showNotification(
                notify.baPk,
                notify.title,
                notify.body,
                notify,
                options,
              );
            } else if (
              baPk === notify.baPk ||
              baPk === JSON.stringify(notify.baPk)
            ) {
              // 해당 배틀방 화면
              console.log('해당 배틀방 화면');
              showToast(notify.title + '\n' + notify.body, 2000, 'center');
            } else {
              // 다른 배틀방 화면
              console.log('다른 배틀방 화면');
              const options = {
                soundName: 'default',
                playSound: true,
              };
              localNotificationService.showNotification(
                notify.baPk,
                notify.title,
                notify.body,
                notify,
                options,
              );
            }
          } else if (notify.screen === 'battlechat') {
            // chat msg
            if (baPk === '0') {
              // 배틀방이 아님
              console.log('배틀방아님');
              const options = {
                soundName: 'default',
                playSound: true,
              };
              localNotificationService.showNotification(
                notify.baPk,
                notify.title,
                notify.body,
                notify,
                options,
              );
            } else if (
              baPk === notify.baPk ||
              baPk === JSON.stringify(notify.baPk)
            ) {
              // 해당 배틀방 화면
              console.log('해당 배틀방 화면');
            } else {
              // 다른 배틀방 화면
              console.log('다른 배틀방 화면');
              const options = {
                soundName: 'default',
                playSound: true,
              };
              localNotificationService.showNotification(
                notify.baPk,
                notify.title,
                notify.body,
                notify,
                options,
              );
            }
          } else if (notify.screen === 'battlelist') {
            // kick
            if (baPk === '0') {
              // 다른화면인 경우
              const options = {
                soundName: 'default',
                playSound: true,
              };
              localNotificationService.showNotification(
                notify.baPk,
                notify.title,
                notify.body,
                notify,
                options,
              );
            } else if (
              baPk === notify.baPk ||
              baPk === JSON.stringify(notify.baPk)
            ) {
              // 해당 배틀방 화면
              showToast(notify.title + '\n' + notify.body, 2000, 'center');
              RootNavigation.navigate('Battle', {});
            } else {
              // 다른 배틀방 화면
              showToast(notify.title + '\n' + notify.body, 2000, 'center');
            }
          }
        }

        async function onOpenNotification(notify) {
          let baPk = await AsyncStorage.getItem('baPk');
          // baPk = JSON.parse(baPk);
          // baPk = JSON.stringify(baPk);
          console.log('async baPk : ' + baPk);
          console.log('notti baPk : ' + notify.baPk);
          console.log('[APP] onOpenNotification : ' + JSON.stringify(notify));

          if (Platform.OS === 'ios') {
            let userInfo = {
              id: notify.baPk,
            };
            PushNotificationIOS.cancelLocalNotifications(userInfo);
          } else {
            PushNotification.cancelLocalNotifications({id: notify.baPk});
          }

          if (
            notify.screen === 'battleview' ||
            notify.screen === 'battlechat'
          ) {
            // chat, system msg open
            RootNavigation.navigate('BattleView', {
              baPk: notify.baPk,
              tabIndex: notify.tabIndex,
            });
          } else if (notify.screen === 'battlelist') {
            // kick open
            if (baPk !== notify.baPk || baPk !== JSON.stringify(notify.baPk)) {
              // 다른방에 들어와 있는 경우
              showToast(notify.title + '\n' + notify.body, 2000, 'center');
            } else {
              // 해당방 || 다른화면인 경우
              showToast(notify.title + '\n' + notify.body, 2000, 'center');
              RootNavigation.navigate('Battle', {});
            }
          }
          // getPush();
        }

        // // foreground 상태
        // const unsubscribe = messaging().onMessage(async (remoteMessage) => {
        //   console.log('[foreground] :', remoteMessage.data);
        //   let notification = null
        //   if (remoteMessage) {
        //     if (Platform.OS === 'ios') {
        //         notification = remoteMessage.data.notification
        //     } else {
        //         notification = remoteMessage.data
        //     }
        //     console.log('notification : ', notification)
        //     const options = {
        //       soundName: 'default',
        //       playSound: true,
        //     };
        //     localNotificationService.showNotification(
        //       0,
        //       notification.title,
        //       notification.body,
        //       notification,
        //       options,
        //     );
        //     await getPush();
        //     // handleNotification(notification.screen, {baPk: notification.baPk, tabIndex: notification.tabIndex})
        //   }
        // });

        // // background > foreground
        // messaging().onNotificationOpenedApp(async (remoteMessage) => {
        //   console.log(
        //     'Notification caused app to open from background state:',
        //     remoteMessage,
        //   );
        //   await getPush();
        //   handleNotification(remoteMessage.data.screen, {baPk: notification.baPk, tabIndex: notification.tabIndex})
        // });

        // // closed > foreground
        // messaging()
        //   .getInitialNotification()
        //   .then(async (remoteMessage) => {
        //     if (remoteMessage) {
        //       console.log(
        //         'Notification caused app to open from quit state:',
        //         remoteMessage,
        //       );
        //       await getPush();
        //       handleNotification(remoteMessage.data.screen, remoteMessage.data);
        //     }
        //   });
        // return unsubscribe;
        return () => {
          console.log('[APP] unRegister');
          fcmService.unRegister();
          localNotificationService.unregister();
        };
      });
    }
  }, []);
  // Suspend > Resume Logic
  React.useEffect(() => {
    AppState.addEventListener('change', handleAppState);

    return () => {
      AppState.removeEventListener('change', handleAppState);
    };
  }, []);

  const getPush = () => {
    Axios.get(`getPush/${global.fcmToken}`)
      .then((res) => {
        logApi('getPush', res.data);
        dispatch({
          type: 'UPDATENOTI',
          data: res.data.message.map((e) => ({...e.data})),
        });
      })
      .catch((err) => {
        logApi('getPush error', err.response);
      });
    // getPushInfo()
    //   .then(res => {
    //     console.log('getPushInfo res', res.data);
    //     if (res.status === 200) {
    //       dispatch({type: 'UPDATE_NOTI', data: res.data});
    //     } else {
    //       Alert.alert(res.data.message);
    //     }
    //   })
    //   .catch(err => {
    //     console.log('getPushInfo error', err);
    //     Alert.alert(err);
    //   });
  };

  const handleAppState = (newState) => {
    if (newState === 'active') {
      global.fcmToken && getPush();
    }
  };

  const handleNotification = ({screen, param}) => {
    console.log(
      '[handleNotification] screen : ' + screen + ' param : ' + param,
    );
    if (screen === 'battleview') {
      RootNavigation.navigate('BattleView', {
        baPk: param.baPk,
        tabIndex: param.tabIndex,
      });
    }
    // RootNavigation.navigate('BattleView', {
    //   baPk: 193,
    //   tabIndex: 1,
    // });
  };

  const handleRoute = (url) => {
    const splitArray = url.split('/');
    const id = splitArray[splitArray.length - 1];

    if (url.includes('https://jejubattle.com/facility/')) {
      id && RootNavigation.navigate('FacilityView', {faPk: id});
    }
    if (url.includes('https://jejubattle.com/tourinfo/')) {
      id && RootNavigation.navigate('TravelView', {faPk: id});
    }
  };

  console.groupCollapsed('[CONTEXT]');
  console.info(state);
  console.groupEnd();

  if (!ready) {
    return null;
  }

  return (
    <NavigationContainer theme={theme} ref={navigationRef}>
      <AppContext.Provider value={{...state, dispatch}}>
        <Stack.Navigator headerMode="none">
          {state.me.userPk ? (
            <Stack.Screen name="App" component={AppStackScreen} />
          ) : (
            <Stack.Screen name="Auth" component={AuthStackScreen} />
          )}
        </Stack.Navigator>
      </AppContext.Provider>
    </NavigationContainer>
  );
}

// export default App;
