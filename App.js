/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, {useRef, useState} from 'react';
import {
  useColorScheme,
  AppState,
  Platform,
  Alert,
  BackHandler,
  StatusBar,
  Linking,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
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
  API_URL,
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
import {Loader, Nuno} from './src/react-native-nuno-ui';
import {logApi, showToast} from './src/react-native-nuno-ui/funcs';
import {localNotificationService} from './src/fcm/LocalNotificationService';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';

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
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

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
    // if (Platform.OS === 'android') {
    await Init();
    await getPush();
    // }
    // await locationInit();
    if (global.token) {
      await Axios.post('getme', {})
        .then((res) => {
          logApi('getme', res.data);
          if (res.data.blackList === 'Y') {
            showToast(
              `블랙리스트 회원으로 로그아웃 되었습니다.`,
              2000,
              'center',
            );
            AuthStackScreen.navigate('Login', {});
          }
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

  // const handleDynamicLink = link => {
  //   console.log('useEffect');
  //   dynamicLinks()
  //     .getInitialLink()
  //     .then((link) => {
  //       console.log('dynamic link', link);
  //       link && handleRoute(link.url);
  //     });
  // }

  React.useEffect(() => {
    if (!ready) {
      init().finally(() => {
        console.log('init-start');
        setReady(true);
        RNBootSplash.hide({duration: 500});
        const dynamicUnsubscribe = dynamicLinks().onLink(handleRoute);
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
            Axios.get(`getPay`)
              .then((res) => {
                logApi('getPay', res.data);
                dispatch({
                  type: 'UPDATEME',
                  data: {
                    notification: 'N',
                    userCoin: res.data.userCoin,
                    userPoint: res.data.userPoint,
                  },
                });
              })
              .catch((err) => {
                logApi('getPay error', err.response);
              });
          } else if (notify.screen === 'battlechat') {
            console.log(`appStateVisible: ${appStateVisible}`);
            console.log(`appState: ${appState.current}`);
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
              (baPk === notify.baPk || baPk === JSON.stringify(notify.baPk)) &&
              appState.current === 'active'
            ) {
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
              showToast(notify.body, 2000, 'center');
              RootNavigation.navigate('Battle', {});
            } else {
              // 다른 배틀방 화면
              showToast(notify.body, 2000, 'center');
            }
            dispatch({
              type: 'UPDATEME',
              data: {
                notification: 'N',
              },
            });
          } else if (notify.screen === 'no') {
            // 신고하기
            const options = {
              soundName: 'default',
              playSound: true,
            };
            localNotificationService.showNotification(
              0,
              notify.title,
              notify.body,
              notify,
              options,
            );
            dispatch({
              type: 'UPDATEME',
              data: {
                notification: 'N',
              },
            });
          } else if (notify.screen === 'locker') {
            const options = {
              soundName: 'default',
              playSound: true,
            };
            localNotificationService.showNotification(
              0,
              notify.title,
              notify.body,
              notify,
              options,
            );
            dispatch({
              type: 'UPDATEME',
              data: {
                notification: 'N',
              },
            });
          } else if (notify.screen === 'admin') {
            const options = {
              soundName: 'default',
              playSound: true,
            };
            localNotificationService.showNotification(
              0,
              notify.title,
              notify.body,
              notify,
              options,
            );
            dispatch({
              type: 'UPDATEME',
              data: {
                notification: 'N',
              },
            });
          } else if (notify.screen === 'join') {
            dispatch({type: 'UPDATENOTI', data: notify});
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
            PushNotificationIOS.cancelAllLocalNotifications(userInfo);
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
          } else if (notify.screen === 'locker') {
            RootNavigation.navigate('Archive', {});
          } else if (notify.screen === 'admin') {
            // showToast('admin push', 2000, 'center');
          }
          // getPush();
        }
        console.log('init-fin');
        return () => {
          console.log('[APP] unRegister');
          fcmService.unRegister();
          localNotificationService.unregister();
          dynamicUnsubscribe();
        };
      });
    }
  }, []);
  // Suspend > Resume Logic
  React.useEffect(() => {
    AppState.addEventListener('change', handleAppState);
    // Subscribe
    const unsubscribe = NetInfo.addEventListener((state) => {
      // Alert.alert(
      //   'Connection type : ' + state.type,
      //   'Is connected :' + state.isConnected,
      // );
      if (state.type === 'none' || state.isConnected === false) {
        setTimeout(() => {
          Alert.alert(
            '인터넷 연결',
            '인터넷 연결 상태를 확인 후 다시 시도해주세요!.',
            [
              {
                text: '확인',
                onPress: () => {
                  BackHandler.exitApp();
                },
              },
            ],
          );
        }, 1000);
      }
    });
    return () => {
      AppState.removeEventListener('change', handleAppState);
      unsubscribe();
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
        logApi('getPush error', err);
      });
  };

  const handleAppState = async (newState) => {
    appState.current = newState;
    setAppStateVisible(appState.current);

    if (newState === 'active') {
      let authorizationStatus = await messaging().requestPermission();
      if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
        await fcmService.getFcmToken();
        // await localNotificationService.configure(onOpenNotification);
      } else {
        const formData = new FormData();
        formData.append('userTermsEvent', 'N');
        formData.append('userTermsPush', 'N');
        Axios({
          url: API_URL + 'userUpdate',
          method: 'POST',
          data: formData,
          headers: {
            Accept: 'application/json',
            token: global.token,
            'Content-Type': 'multipart/form-data',
          },
        })
          .then(async (res) => {
            logApi('userUpdate', res.data);
            dispatch({type: 'UPDATEME', data: res.data});
          })
          .catch((err) => {
            logApi('userUpdate error', err?.response);
          });
        // await fcmService.unRegister();
        // await localNotificationService.unregister();
      }
      console.log('state::: ' + newState);
      console.log(JSON.stringify(appState));
      global.fcmToken && getPush();
    } else if (newState === 'background') {
      console.log('state::: ' + newState);
      console.log(JSON.stringify(appState));
    } else {
      console.log('state::: ' + newState);
      console.log(JSON.stringify(appState));
    }
  };
  const openSetting = () => {
    Linking.openSettings().catch(() => {
      Alert.alert('Unable to open settings');
    });
  };
  const handleRoute = (getUrl) => {
    let url;
    if (getUrl.url) {
      url = getUrl.url;
      console.log('url ::: JSON\n' + url);
    } else {
      url = getUrl;
      console.log('url ::: NO JSON\n' + url);
    }

    const splitArray = url.split('/');
    const id = splitArray[splitArray.length - 1];

    // 운동시설 공유 링크
    if (url.includes('https://jejubattle.com/facility/')) {
      id && RootNavigation.navigate('FacilityView', {faPk: id});
    }
    // 여행정보 공유 링크
    if (url.includes('https://jejubattle.com/tourinfo/')) {
      id && RootNavigation.navigate('TravelView', {faPk: id});
    }
    // banner, event 공유 링크
    if (url.includes('https://jejubattle.com/event/ad')) {
      id && RootNavigation.navigate('Ad', {adPk: id});
    } else if (url.includes('https://jejubattle.com/event/')) {
      id && RootNavigation.navigate('EventView', {item: {evPk: id}});
    }
  };

  console.groupCollapsed('[CONTEXT]');
  console.info(state);
  console.groupEnd();

  if (!ready) {
    return (
      <Loader />
      // <NavigationContainer theme={theme} ref={navigationRef}>
      //   {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
      //   <AppContext.Provider value={{...state, dispatch}}>
      //     <Stack.Navigator headerMode="none">
      //       {state.me?.userPk ? (
      //         <Stack.Screen name="App" component={AppStackScreen} />
      //       ) : (
      //         <Stack.Screen name="Auth" component={AuthStackScreen} />
      //       )}
      //     </Stack.Navigator>
      //   </AppContext.Provider>
      // </NavigationContainer>
    );
  }

  return (
    <NavigationContainer theme={theme} ref={navigationRef}>
      {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
      <AppContext.Provider value={{...state, dispatch}}>
        <Stack.Navigator headerMode="none">
          {state.me?.userPk ? (
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
