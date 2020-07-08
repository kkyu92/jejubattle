import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AppStackScreen from './AppStack';
import {AppContext, useAppReducer} from '../context';
// import {getme} from '../api/user';
import {Alert, AppState} from 'react-native';
import messaging from '@react-native-firebase/messaging';
// import {getPushInfo} from '../api/notification';
import * as RootNavigation from './RootNavigation';
import RNBootSplash from "react-native-bootsplash";

const RootStack = createStackNavigator();

export function RootStackScreen(props) {
  const {state, dispatch} = useAppReducer();

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let token;
      RNBootSplash.hide({ duration: 250 }); // fade
      // try {
      //   token = await AsyncStorage.getItem('token');
      // } catch (e) {
      //   // Restoring token failed
      // }
      // if (token) {
      //   getme()
      //     .then(me => {
      //       dispatch({type: 'GET_ME', data: {me: me}});
      //       RNBootSplash.hide({duration: 500});
      //       getPushInfo()
      //         .then(res => {
      //           console.log('getPushInfo res', res.data);
      //           if (res.status === 200) {
      //             dispatch({type: 'UPDATE_NOTI', data: res.data});
      //           } else {
      //             Alert.alert(res.data.message);
      //           }
      //         })
      //         .catch(err => {
      //           console.log('getPushInfo error', err);
      //           Alert.alert(err);
      //         });
      //     })
      //     .catch(() => {
      //       dispatch({type: 'RESTORE_TOKEN', data: {me: {}}});
      //     });
      // } else {
      //   dispatch({type: 'RESTORE_TOKEN', data: {me: {}}});
      //   RNBootSplash.hide({duration: 500});
      // }
    };

    bootstrapAsync();
  }, []);

  React.useEffect(() => {
    if (state.isLoading === false) {
      const unsubscribe = messaging().onMessage(async (remoteMessage) => {
        console.log('Receiving FCM Message Data:', remoteMessage.data);

        if (
          (remoteMessage.data.code1 === '001' &&
            remoteMessage.data.code2 === '003') ||
          (remoteMessage.data.code1 === '001' &&
            remoteMessage.data.code2 === '004') ||
          (remoteMessage.data.code1 === '001' &&
            remoteMessage.data.code2 === '007') ||
          (remoteMessage.data.code1 === '001' &&
            remoteMessage.data.code2 === '009') ||
          (remoteMessage.data.code1 === '002' &&
            remoteMessage.data.code2 === '003') ||
          (remoteMessage.data.code1 === '002' &&
            remoteMessage.data.code2 === '004') ||
          (remoteMessage.data.code1 === '002' &&
            remoteMessage.data.code2 === '007') ||
          (remoteMessage.data.code1 === '002' &&
            remoteMessage.data.code2 === '008')
        ) {
          if (remoteMessage.notification) {
            // cf.showToast(remoteMessage.notification.title);
            Alert.alert(
              remoteMessage.notification.title,
              remoteMessage.notification.body,
            );
          }
        }
        // getPushInfo()
        //   .then((res) => {
        //     console.log('getPushInfo res', res.data);
        //     if (res.status === 200) {
        //       dispatch({type: 'UPDATE_NOTI', data: res.data});
        //     } else {
        //       Alert.alert(res.data.message);
        //     }
        //   })
        //   .catch((err) => {
        //     console.log('getPushInfo error', err);
        //     Alert.alert(err);
        //   });
      });

      // background > foreground
      messaging().onNotificationOpenedApp((remoteMessage) => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage,
        );
        // getPushInfo()
        //   .then((res) => {
        //     console.log('getPushInfo res', res.data);
        //     if (res.status === 200) {
        //       dispatch({type: 'UPDATE_NOTI', data: res.data});
        //     } else {
        //       Alert.alert(res.data.message);
        //     }
        //   })
        //   .catch((err) => {
        //     console.log('getPushInfo error', err);
        //     Alert.alert(err);
        //   });
        handleNotification(remoteMessage.data);
      });

      // closed > foreground
      messaging()
        .getInitialNotification()
        .then((remoteMessage) => {
          if (remoteMessage) {
            console.log(
              'Notification caused app to open from quit state:',
              remoteMessage,
            );
            // getPushInfo()
            //   .then((res) => {
            //     console.log('getPushInfo res', res.data);
            //     if (res.status === 200) {
            //       dispatch({type: 'UPDATE_NOTI', data: res.data});
            //     } else {
            //       Alert.alert(res.data.message);
            //     }
            //   })
            //   .catch((err) => {
            //     console.log('getPushInfo error', err);
            //     Alert.alert(err);
            //   });
            handleNotification(remoteMessage.data);
          }
        });

      global.deeplink && handleRoute(global.deeplink.type, global.deeplink.id);
      global.deeplink = null;
      return unsubscribe;
    }
  }, [state.isLoading]);

  // Suspend > Resume Logic
  // React.useEffect(() => {
  //   AppState.addEventListener('change', handleAppState);

  //   return () => {
  //     AppState.removeEventListener('change', handleAppState);
  //   };
  // }, []);

  // const handleAppState = (newState) => {
  //   if (newState === 'active') {
  //     getPushInfo()
  //       .then((res) => {
  //         console.log('getPushInfo res', res.data);
  //         if (res.status === 200) {
  //           dispatch({type: 'UPDATE_NOTI', data: res.data});
  //         } else {
  //           Alert.alert(res.data.message);
  //         }
  //       })
  //       .catch((err) => {
  //         console.log('getPushInfo error', err);
  //         Alert.alert(err);
  //       });
  //   }
  // };

  const handleNotification = ({code1, code2, order_id}) => {
    if (code1 === '001') {
      RootNavigation.navigate('Delivery');
      RootNavigation.navigate('OrderViewStack', {
        screen: 'OrderView',
        params: {
          order_id: order_id,
        },
      });
      // } else {
      //   RootNavigation.navigate('Delivery');
      // }
    }
    if (code1 === '002') {
      RootNavigation.navigate('Mart');
      RootNavigation.navigate('OrderViewStack', {
        screen: 'OrderView',
        params: {
          order_id: order_id,
        },
      });
      // } else {
      //   RootNavigation.navigate('Mart');
      // }
    }
  };

  const handleRoute = (type, id) => {
    if (type === 'DeliveryView') {
      RootNavigation.navigate('Delivery');
      id && RootNavigation.navigate('DeliveryView', {id: id});
    }
    if (type === 'MartView') {
      RootNavigation.navigate('Mart');
      id && RootNavigation.navigate('MartView', {id: id});
    }
    if (type === 'EstateProduct') {
      RootNavigation.navigate('Estate');
      id && RootNavigation.navigate('EstateProduct', {id: id});
    }
  };

  console.groupCollapsed('[CONTEXT]');
  console.info(state);
  console.groupEnd();

  // if (state.isLoading) {
  //   return null;
  // }

  return (
    <AppContext.Provider value={{...state, dispatch}}>
      <RootStack.Navigator headerMode="none">
        <RootStack.Screen name="App" component={AppStackScreen} />
      </RootStack.Navigator>
    </AppContext.Provider>
  );
}
