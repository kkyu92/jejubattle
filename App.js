/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import {useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {navigationRef} from './src/navigations/RootNavigation';
import * as RootNavigation from './src/navigations/RootNavigation';
import {Nuno} from 'react-native-nuno-ui';
import {
  GEOCODE_API,
  BUNDLE_ID,
  PACKAGE_NAME,
  IOS_STORE_ID,
  FIREBASE_WEB_API,
  custom,
} from './src/config';
import { AppContext, useAppReducer } from './src/context';
import AppStackScreen from './src/navigations/AppStack';
import AuthStackScreen from './src/navigations/AuthStack';
import {requestPermission, getFcmToken} from './src/fcm';
import RNBootSplash from 'react-native-bootsplash';
import Init from './src/commons/Init';
import Axios from 'axios';
import { logApi } from 'react-native-nuno-ui/funcs';
import dynamicLinks from '@react-native-firebase/dynamic-links';

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
});

const App: () => React$Node = () => {
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
    // await registerAppWithFCM();
    await requestPermission();
    await getFcmToken();
    await Init();
    // await locationInit();
    if (global.token) {
      await Axios.post('getme', {})
        .then((res) => {
          logApi('getme', res.data);
          dispatch({
            type: 'AUTHORIZED',
            data: res.data,
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
            handleRoute(link.url);
          });
      });
    }
  }, []);

  const handleRoute = (url) => {
    const splitArray = url.split('/');
    const id = splitArray[splitArray.length - 1];

    if (url.includes('https://jejubattle.com/facility/')) {
      id && RootNavigation.navigate('FacilityView', {faPk: id});
    }
    if (url.includes('https://jejubattle.com/tourinfo/')) {
      id && RootNavigation.navigate('TourCourseView', {faPk: id});
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
          {state.me ? (
            <Stack.Screen name="App" component={AppStackScreen} />
          ) : (
            <Stack.Screen name="Auth" component={AuthStackScreen} />
          )}
        </Stack.Navigator>
      </AppContext.Provider>
    </NavigationContainer>
  );
};

export default App;
