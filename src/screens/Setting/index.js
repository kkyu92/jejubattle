import React from 'react';
import {
  Container,
  Header,
  Text,
  Image,
  HView,
  Seperator,
  TextInput,
  Button,
  Checkbox,
  Modal,
  Switch,
} from '../../react-native-nuno-ui';
import {
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Linking,
  Platform,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import Icons from '../../commons/Icons';
import {custom, API_URL} from '../../config';
import DeviceInfo from 'react-native-device-info';
import {screenWidth} from '../../styles';
import {AppContext} from '../../context';
import AsyncStorage from '@react-native-community/async-storage';
import Init from '../../commons/Init';
import Axios from 'axios';
import {logApi, showToast} from '../../react-native-nuno-ui/funcs';
import Spinner from 'react-native-loading-spinner-overlay';
import {fcmService} from '../../../src/fcm/FCMService';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {NaverLogin} from '@react-native-seoul/naver-login';
import messaging from '@react-native-firebase/messaging';

export default function Setting(props) {
  const context = React.useContext(AppContext);
  const [loading, setLoading] = React.useState(false);
  const [userTermsEvent, setUserTermsEvent] = React.useState(
    context.me.userTermsEvent,
  );
  const [userTermsPush, setUserTermsPush] = React.useState(
    context.me.userTermsPush,
  );
  const [showLogoutDone, setShowLogoutDone] = React.useState(false);
  const [modalLogout, setModalLogout] = React.useState(false);
  const [userDelete, setUserDelete] = React.useState(false);
  let authorizationStatus;

  React.useEffect(() => {
    init();
  }, []);

  // React.useEffect(() => {
  //   init();
  // }, [messaging().requestPermission()]);

  const init = async (check) => {
    authorizationStatus = await messaging().requestPermission();

    if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
      console.groupCollapsed('[Messaging Permission Granted]');
      console.log('authorizationStatus', authorizationStatus);
      console.groupEnd();
      if (userTermsEvent === 'Y') {
        setUserTermsEvent('Y');
      } else {
        setUserTermsEvent('N');
      }
      if (userTermsPush === 'Y') {
        setUserTermsPush('Y');
      } else {
        setUserTermsPush('N');
      }
    } else if (
      authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL // Silent Notification
    ) {
      console.groupCollapsed('[Messaging Permission Provisional]');
      console.log('authorizationStatus', authorizationStatus);
      console.groupEnd();
    } else {
      // 알림권한 허용안함
      console.groupCollapsed('[Messaging Permission Denied]');
      console.log('authorizationStatus', authorizationStatus);
      console.groupEnd();
      setUserTermsEvent('N');
      setUserTermsPush('N');
    }
  };

  const checkStatus = async (pushSwitch) => {
    authorizationStatus = await messaging().requestPermission();

    // 알림권한 허용 됨
    if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
      if (pushSwitch === 'event') {
        if (userTermsEvent === 'Y') {
          setUserTermsEvent('N');
          showToast(`이벤트 및 마케팅 활용 동의 안함`, 2000, 'center');
        } else {
          setUserTermsEvent('Y');
          showToast(`이벤트 및 마케팅 활용 동의`, 2000, 'center');
        }
      } else {
        if (userTermsPush === 'Y') {
          setUserTermsPush('N');
          showToast(`알림 푸쉬 허용 안함`, 2000, 'center');
        } else {
          setUserTermsPush('Y');
          showToast(`알림 푸쉬 허용`, 2000, 'center');
        }
      }
    } else {
      Alert.alert('알림권한을 허용해주세요.', '', [
        {
          text: '알림권한 설정하기',
          onPress: () => {
            Linking.openSettings().catch(() => {
              Alert.alert('Unable to open settings');
            });
          },
        },
        {
          text: '취소',
          onPress: () => {
            showToast(
              `회원님의 알림권한을 허용 후 다시 시도해주세요.`,
              2000,
              'center',
            );
          },
        },
      ]);
    }
  };

  const signoutNo = async () => {
    setModalLogout(false);
  };

  const signout = async () => {
    setModalLogout(false);
    setTimeout(() => {
      setLoading(true);
    }, 500);
    if (context.me.userCode === 2) {
      await NaverLogin.logout();
    }
    Axios.get('signout')
      .then(logApi('signout'))
      .catch((e) => {
        logApi('signout error : ' + e);
      });
    await AsyncStorage.removeItem('token');
    // await Init();
    context.dispatch({type: 'UNAUTHORIZED'});
    setLoading(false);
  };

  const deleteOut = async () => {
    setModalLogout(false);
    setTimeout(() => {
      setLoading(true);
    }, 500);
    if (context.me.userCode === 2) {
      await NaverLogin.logout();
    }
    let userPk = context.me.userPk;
    console.log(userPk);
    Axios.delete(`user`)
      .then(logApi('delete user'))
      .catch((e) => {
        logApi('delete user error : ' + e);
      });
    await AsyncStorage.removeItem('token');
    // await Init();
    context.dispatch({type: 'UNAUTHORIZED'});
    setLoading(false);
  };
  const firstUpdate = React.useRef(true);
  React.useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    updateUser();
  }, [userTermsEvent, userTermsPush]);
  // React.useEffect(() => {
  //   if (Platform.OS === 'ios') {
  //     PushNotificationIOS.checkPermissions((permission) => {
  //       console.log('IOS : ' + JSON.stringify(permission));
  //     });
  //     if (userTermsPush === 'Y') {
  //       PushNotificationIOS.requestPermissions();
  //       console.log('PushNotification ON');
  //     } else {
  //       PushNotificationIOS.abandonPermissions();
  //       console.log('PushNotification OFF');
  //     }
  //   } else {
  //     PushNotification.checkPermissions((permission) => {
  //       console.log('ANDROID : ' + JSON.stringify(permission));
  //     });
  //     if (userTermsPush === 'Y') {
  //       PushNotification.requestPermissions();
  //       console.log('PushNotification ON');
  //     } else {
  //       PushNotification.abandonPermissions();
  //       console.log('PushNotification OFF');
  //     }
  //   }
  // }, [userTermsPush]);
  const updateUser = async () => {
    const formData = new FormData();
    formData.append('userTermsEvent', userTermsEvent);
    formData.append('userTermsPush', userTermsPush);
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
        context.dispatch({type: 'UPDATEME', data: res.data});
      })
      .catch((err) => {
        logApi('userUpdate error', err?.response);
      });
  };
  return (
    <Container>
      <Header left={'close'} title={'설정'} navigation={props.navigation} />
      <ScrollView>
        <Spinner visible={loading} textContent={''} color={'#F4A100'} />
        <Seperator height={20} />
        <HView
          style={{
            paddingHorizontal: 20,
            paddingVertical: 10,
            justifyContent: 'space-between',
          }}>
          <Text
            text={'이벤트 및 마케팅 활용 동의'}
            fontSize={18}
            fontWeight={'500'}
            color={'dimgray'}
          />
          <Switch
            checked={userTermsEvent === 'Y'}
            onPress={() => checkStatus('event')}
          />
        </HView>
        <HView
          style={{
            paddingHorizontal: 20,
            paddingVertical: 10,
            justifyContent: 'space-between',
          }}>
          <Text
            text={'알림 푸쉬 허용'}
            fontSize={18}
            fontWeight={'500'}
            color={'dimgray'}
          />
          <Switch
            checked={userTermsPush === 'Y'}
            onPress={() => checkStatus('push')}
          />
        </HView>
        <Seperator height={20} />
        <TouchableOpacity
          style={{paddingHorizontal: 20, paddingVertical: 15}}
          onPress={() => Linking.openURL('https://jejubattle.com/privacy')}>
          <Text
            text={'개인정보 처리 방침'}
            fontSize={18}
            fontWeight={'500'}
            color={'dimgray'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{paddingHorizontal: 20, paddingVertical: 15}}
          onPress={() => Linking.openURL('https://jejubattle.com/service')}>
          <Text
            text={'서비스 이용 약관'}
            fontSize={18}
            fontWeight={'500'}
            color={'dimgray'}
          />
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={{paddingHorizontal: 20, paddingVertical: 15}}
          onPress={() => null}>
          <Text
            text={'위치정보 이용 약관'}
            fontSize={18}
            fontWeight={'500'}
            color={'dimgray'}
          />
        </TouchableOpacity> */}
        <TouchableOpacity
          style={{paddingHorizontal: 20, paddingVertical: 15}}
          onPress={() => null}>
          <Text
            text={'오픈소스 라이선스'}
            fontSize={18}
            fontWeight={'500'}
            color={'dimgray'}
          />
        </TouchableOpacity>
        <HView
          style={{
            paddingHorizontal: 20,
            paddingVertical: 15,
            justifyContent: 'space-between',
          }}>
          <Text
            text={'버전 정보'}
            fontSize={18}
            fontWeight={'500'}
            color={'dimgray'}
          />
          <Text
            // text={`${DeviceInfo.getVersion()}.${DeviceInfo.getBuildNumber()}`}
            text={`${DeviceInfo.getVersion()}`}
            fontSize={16}
            fontWeight={'500'}
            color={'dimgray'}
          />
        </HView>

        <Seperator height={50} />

        <TouchableOpacity
          style={{paddingHorizontal: 20, paddingVertical: 15}}
          onPress={() => {
            setUserDelete(false);
            setModalLogout(true);
          }}>
          <Text
            text={'로그아웃'}
            fontSize={18}
            fontWeight={'500'}
            color={'dimgray'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{paddingHorizontal: 20, paddingVertical: 15}}
          onPress={() => {
            setUserDelete(true);
            setModalLogout(true);
          }}>
          <Text
            text={'회원탈퇴'}
            fontSize={18}
            fontWeight={'500'}
            color={'dimgray'}
          />
        </TouchableOpacity>
      </ScrollView>
      <Modal
        isVisible={modalLogout}
        onBackdropPress={() => setModalLogout(false)}>
        <View
          style={{
            padding: 20,
            backgroundColor: 'white',
            borderRadius: 10,
            alignItems: 'center',
          }}>
          <Text
            style={{textAlign: 'center'}}
            fontSize={18}
            fontWeight={'bold'}
            color={'black'}
            text={
              userDelete === true
                ? '지금까지의 전적과 정보는 사라지며 복구할 수 없습니다.\n정말로 회원탈퇴하시겠습니까?'
                : '로그아웃 하시겠습니까?'
            }
          />
          <Seperator height={50} />
          <HView>
            <View style={{flex: 1}}>
              <Button
                text={'아니오'}
                color={'gray'}
                onPress={() => signoutNo()}
                size={'large'}
                stretch
              />
            </View>
            <Seperator width={20} />
            <View style={{flex: 1}}>
              <Button
                text={'예'}
                color={custom.themeColor}
                onPress={() => (userDelete === true ? deleteOut() : signout())}
                size={'large'}
                stretch
              />
            </View>
          </HView>
        </View>
      </Modal>
    </Container>
  );
}
