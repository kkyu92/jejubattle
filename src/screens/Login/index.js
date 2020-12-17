import React from 'react';
import {
  Container,
  Seperator,
  Text,
  TextInput,
  Button,
  Image,
  HView,
  Modal,
  Checkbox,
} from '../../react-native-nuno-ui';
import {View, Alert, Platform, Linking, StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// import {listenToKeyboardEvents} from 'react-native-keyboard-aware-scroll-view';
// import {ScrollView} from 'react-native';

import {custom} from '../../config';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {screenWidth} from '../../styles';
import Axios from 'axios';
import {
  getCurrentLocation,
  logApi,
  showToast,
} from '../../react-native-nuno-ui/funcs';
import AsyncStorage from '@react-native-community/async-storage';
import {AppContext} from '../../context';
import RNKakaoLogins, {KAKAO_AUTH_TYPES} from '@react-native-seoul/kakao-login';
import {NaverLogin, getProfile} from '@react-native-seoul/naver-login';
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
import {
  appleAuth,
  AppleButton,
} from '@invertase/react-native-apple-authentication';
import Init from '../../commons/Init';
import Icons from '../../commons/Icons';
import jwt_decode from 'jwt-decode';
import Spinner from 'react-native-loading-spinner-overlay';

export default function Login(props) {
  const context = React.useContext(AppContext);
  const [granted, setGranted] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [modalVisible, setModalVisible] = React.useState(false);
  const [emailForPassword, setEmailForPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  // const [permissionVisible, setPermissionVisible] = React.useState(false);
  // const [permission1, setPermission1] = React.useState(false);
  // const [permission2, setPermission2] = React.useState(false);
  // const [hidePermissionAlert, setHidePermissionAlert] = React.useState(
  //   global.hidePermissionAlert,
  // );

  let user = null;
  const [credentialStateForUser, updateCredentialStateForUser] = React.useState(
    -1,
  );
  async function fetchAndUpdateCredentialState(updateCredentialStateForUser) {
    if (user === null) {
      updateCredentialStateForUser('N/A');
    } else {
      const credentialState = await appleAuth.getCredentialStateForUser(user);
      if (credentialState === appleAuth.State.AUTHORIZED) {
        updateCredentialStateForUser('AUTHORIZED');
      } else {
        updateCredentialStateForUser(credentialState);
      }
    }
  }
  async function onAppleButtonPress(updateCredentialStateForUser) {
    console.warn('Beginning Apple Authentication');
    // start a login request
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });
      console.log('appleAuthRequestResponse', appleAuthRequestResponse);
      let {
        user: newUser,
        email,
        nonce,
        identityToken,
        realUserStatus /* etc */,
      } = appleAuthRequestResponse;
      user = newUser;
      fetchAndUpdateCredentialState(
        updateCredentialStateForUser,
      ).catch((error) => updateCredentialStateForUser(`Error: ${error.code}`));
      // Alert.alert(
      //   'get apple info\n아직 미구현\n\n',
      //   JSON.stringify(appleAuthRequestResponse),
      // );
      console.warn(`Apple Authentication Completed, ${user}, ${email}`);
      if (email === null) {
        var decoded = jwt_decode(identityToken);
        console.log(JSON.stringify(decoded));
        email = decoded.email;
      }
      startWithSNS(user, email, 5);
    } catch (error) {
      if (error.code === appleAuth.Error.CANCELED) {
        console.warn('User canceled Apple Sign in.');
      } else {
        console.error(error);
      }
    }
  }
  // const onAppleButtonPress = async () => {
  //   // performs login request
  //   const appleAuthRequestResponse = await appleAuth.performRequest({
  //     requestedOperation: appleAuth.Operation.LOGIN,
  //     requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  //   });

  //   // get current authentication state for user
  //   const credentialState = await appleAuth.getCredentialStateForUser(
  //     appleAuthRequestResponse.user,
  //     appleAuthRequestResponse.email,
  //     appleAuthRequestResponse.fullName,
  //     appleAuthRequestResponse.identityToken,
  //   );
  //   Alert.alert(
  //     appleAuthRequestResponse.user +
  //       '\n' +
  //       appleAuthRequestResponse.email +
  //       '\n' +
  //       appleAuthRequestResponse.fullName +
  //       '\n' +
  //       appleAuthRequestResponse.identityToken,
  //   );
  //   console.log('credentialState::: ' + JSON.stringify(credentialState));
  //   // use credentialState response to ensure the user is authenticated
  //   if (credentialState === appleAuth.State.AUTHORIZED) {
  //     console.log('user is authenticated');
  //   }
  // };

  React.useEffect(() => {
    // if (!hidePermissionAlert) {
    //   setPermissionVisible(true);
    // }
    GCL();
    if (!appleAuth.isSupported) return;

    fetchAndUpdateCredentialState(updateCredentialStateForUser).catch((error) =>
      updateCredentialStateForUser(`Error: ${error.code}`),
    );
  }, []);

  React.useEffect(() => {
    if (!appleAuth.isSupported) return;

    return appleAuth.onCredentialRevoked(async () => {
      console.warn('Credential Revoked');
      fetchAndUpdateCredentialState(
        updateCredentialStateForUser,
      ).catch((error) => updateCredentialStateForUser(`Error: ${error.code}`));
    });
  }, []);

  async function GCL() {
    global.address = getCurrentLocation(global.lang);
  }
  const signin = async () => {
    global.address = getCurrentLocation(global.lang);
    setLoading(true);
    Axios.post('signin', {
      userId: email,
      userPwd: password,
      userPushkey: global.fcmToken,
      deviceOs: Platform.OS === 'android' ? 1 : 2,
      deviceOsVer: Platform.Version,
    })
      .then(async (res) => {
        logApi('signin success', res.data);
        await AsyncStorage.setItem('token', res.data.token);
        await Init();
        context.dispatch({type: 'AUTHORIZED', data: res.data});
        setLoading(false);
      })
      .catch((err) => {
        logApi('signin error', err?.response);
        console.log('e : ' + JSON.stringify(err));
        if (err.code !== 1) {
          setLoading(false);
          setTimeout(() => {
            Alert.alert('로그인 실패', err.response?.data?.message);
          }, 200);
        }
      });
  };
  const startWithSNS = async (userId, userEmail, userCode) => {
    console.log('userId : ' + userId);
    console.log('userCode : ' + userCode);
    console.log('userEmail : ' + userEmail);
    console.log('token : ' + global.fcmToken);
    global.address = getCurrentLocation(global.lang);
    setLoading(true);
    Axios.post('snsSignin', {
      userId: userId,
      userCode: userCode,
      userPushkey: global.fcmToken,
      deviceOs: Platform.OS === 'android' ? 1 : 2,
      deviceOsVer: Platform.Version,
    })
      .then(async (res) => {
        logApi('snsSignin', res.data);
        await AsyncStorage.setItem('token', res.data.token);
        await Init();
        context.dispatch({type: 'AUTHORIZED', data: res.data});
        setLoading(false);
      })
      .catch((err) => {
        logApi('snsSignin error', err);
        if (err?.response.status === 403) {
          props.navigation.navigate('Join', {
            uid: userId,
            userId: userEmail,
            userCode: userCode,
          });
        } else {
          Alert.alert('로그인', err.response?.data?.message);
        }
        setLoading(false);
      });
  };
  const pwInquiry = () => {
    setLoading(true);
    Axios.post('pwInquiry', {
      userEmail: emailForPassword,
    })
      .then((res) => {
        logApi('pwInquiry success', res.data);
        setLoading(false);
        setModalVisible(false);
        showToast('임시 비밀번호를 발송했습니다.', 2000, 'center');
      })
      .catch((err) => {
        logApi('pwInquiry error', err?.response);
        setLoading(false);
        Alert.alert(err?.response?.data?.message);
      });
  };

  const startWithNaver = () => {
    NaverLogin.login(
      {
        kConsumerKey: '0bje5MBfj02OLYYq102o',
        kConsumerSecret: '2Z62bOJe_U',
        kServiceAppName: '제주배틀',
        kServiceAppUrlScheme: Platform.OS === 'ios' ? 'jejubattle' : undefined, // ios only
      },
      async (err, token) => {
        console.log(`Naver Login : ${token.accessToken}`);
        if (err) {
          console.log('Naver Login error');
          return;
        }
        const profile = await getProfile(token.accessToken);
        if (profile.resultcode === '024') {
          Alert.alert('Naver getProfile fail', profile.message);
          return;
        }
        startWithSNS(profile.response.id, profile.response.email, 2);
      },
    );
  };
  const callback = () => {
    console.log('callback');
  };
  const startWithKakao = () => {
    RNKakaoLogins.logout()
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
    RNKakaoLogins.login([
      KAKAO_AUTH_TYPES.Talk,
      KAKAO_AUTH_TYPES.Story,
      KAKAO_AUTH_TYPES.Account,
    ])
      .then((result) => {
        console.log(`Login Finished:${JSON.stringify(result)}`);
        RNKakaoLogins.getProfile((profileErr, profile) => {
          console.log('kakao getProfile', profile);
          startWithSNS(profile.id, profile.email, 3);
        });
      })
      .catch((err) => {
        if (err.code === 'E_CANCELLED_OPERATION') {
          console.log(`Login Cancelled:${err.message}`);
        } else {
          console.log(`Login Failed:${err.code} ${err.message}`);
        }
      });
    // RNKakaoLogins.login((err, res) => {
    //   if (err) {
    //     console.log('loginWithKakao Error', err);
    //     return;
    //   }
    //   console.log(JSON.stringify(res));
    // RNKakaoLogins.getProfile((profileErr, profile) => {
    //   if (err) {
    //     console.log('kakao getProfile', err);
    //     return;
    //   }
    //   console.log('kakao getProfile', profile);
    //   startWithSNS(profile.id, profile.email, 3);
    // });
    // });
  };
  const startWithFacebook = () => {
    LoginManager.logInWithPermissions(['public_profile', 'email'])
      .then(
        (result) => {
          if (result.isCancelled) {
            console.log('Login cancelled');
          } else {
            console.log('Login success with permissions: ', result);
            return AccessToken.getCurrentAccessToken();
          }
        },
        (error) => {
          console.log('Login fail with error: ', error);
          Alert.alert('Facebook getPermission fail', JSON.stringify(error));
        },
      )
      .then((data) => {
        const responseInfoCallback = (error, profile) => {
          if (error) {
            console.log(error);
            Alert.alert('Facebook getAccessToken fail', JSON.stringify(error));
          } else {
            console.log(profile);
            startWithSNS(profile.id, profile.email, 4);
          }
        };
        const infoRequest = new GraphRequest(
          '/me',
          {
            accessToken: data.accessToken,
            parameters: {
              fields: {
                string: 'email, name',
              },
            },
          },
          responseInfoCallback,
        );
        new GraphRequestManager().addRequest(infoRequest).start();
      });
  };

  return (
    <Container
      backgroundImage={require('../../../assets/img/bg/img-background-login.png')}>
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flex: 1,
          padding: 50,
          justifyContent: 'center',
        }}>
        <Spinner
          visible={loading}
          textContent={''}
          color={'#F4A100'}
          // textStyle={styles.spinnerTextStyle}
        />
        <View>
          <Image
            local
            uri={require('../../../assets/img/title/title.png')}
            height={36}
            resizeMode={'contain'}
          />
        </View>
        <Seperator height={50} />
        <HView style={{justifyContent: 'space-between'}}>
          <Text
            text={'로그인'}
            fontSize={25}
            fontWeight={'bold'}
            color={'white'}
          />
          <Button
            text={'+ 회원가입'}
            fontSize={15}
            fontWeight={'bold'}
            color={'rgba(0, 0, 0, 0.6)'}
            borderRadius={20}
            onPress={() => {
              // gotoJoin(() => props.navigation.navigate('Join'));
              props.navigation.navigate('Join');
            }}
          />
        </HView>
        <Seperator height={30} />
        <View>
          <Text
            text={'아이디'}
            fontSize={13}
            fontWeight={'bold'}
            color={'white'}
          />
          <Seperator height={10} />
          <TextInput
            value={email}
            onChangeText={(e) => setEmail(e)}
            backgroundColor={'transparent'}
            textColor={'white'}
            borderColor={'white'}
            autoCapitalize={'none'}
            placeholder={'이메일'}
            keyboardType={'email-address'}
            placeholderTextColor={'white'}
          />
          <Seperator height={20} />
          <Text
            text={'비밀번호'}
            fontSize={13}
            fontWeight={'bold'}
            color={'white'}
          />
          <Seperator height={10} />
          <TextInput
            value={password}
            onChangeText={(e) => setPassword(e)}
            backgroundColor={'transparent'}
            textColor={'white'}
            showEye={true}
            borderColor={'white'}
            placeholder={'패스워드'}
            placeholderTextColor={'white'}
          />
          <Seperator height={10} />
          <HView style={{justifyContent: 'flex-end'}}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text
                text={'비밀번호를 잊어버렸어요'}
                fontSize={13}
                fontWeight={'bold'}
                color={'white'}
                style={{textDecorationLine: 'underline'}}
              />
            </TouchableOpacity>
          </HView>
          <Seperator height={60} />
          <HView style={{justifyContent: 'space-evenly'}}>
            <TouchableOpacity
              onPress={() => startWithKakao()}
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: '#FFEB3B',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                local
                uri={require('../../../assets/img/kakao-talk.png')}
                width={23}
                height={23}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => startWithNaver()}
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: '#03CF5D',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                local
                uri={require('../../../assets/img/icon-naver.png')}
                width={23}
                height={23}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => startWithFacebook()}
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: '#1976D2',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                local
                uri={require('../../../assets/img/icon-facebook.png')}
                width={23}
                height={23}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
            {Platform.OS === 'ios' && Platform.Version >= '13' ? (
              <AppleButton
                buttonStyle={AppleButton.Style.BLACK}
                buttonType={AppleButton.Type.CONTINUE}
                style={{
                  width: 60,
                  height: 60,
                  // borderRadius: 30,
                  //   backgroundColor: '#000000',
                  //   alignItems: 'center',
                  //   justifyContent: 'center',
                }}
                onPress={() => onAppleButtonPress(updateCredentialStateForUser)}
              />
            ) : null}
          </HView>
          <Seperator height={50} />
          <Button
            text={'로그인'}
            onPress={() => signin()}
            color={'whitesmoke'}
            size={'large'}
            textColor={'black'}
            borderColor={'whitesmoke'}
            stretch
          />
        </View>
        {/* </View> */}
      </KeyboardAwareScrollView>
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}>
        <View style={{padding: 10, backgroundColor: 'white', borderRadius: 5}}>
          <View style={{paddingHorizontal: 30, paddingVertical: 20}}>
            <Text
              text={'가입시 등록한 이메일(아이디)을 입력해주세요'}
              fontWeight={'bold'}
              fontSize={18}
              style={{textAlign: 'center'}}
            />
          </View>
          <View style={{paddingHorizontal: 20, paddingVertical: 20}}>
            <Text text={'이메일'} fontSize={14} fontWeight={'500'} />
            <Seperator height={10} />
            <TextInput
              value={emailForPassword}
              onChangeText={(e) => setEmailForPassword(e)}
              borderWidth={0}
              autoCapitalize={'none'}
              keyboardType={'email-address'}
              placeholder={'이메일을 입력해주세요'}
            />
            <Seperator line />
            <Seperator height={30} />
            <HView>
              <View style={{flex: 1}}>
                <Button
                  text={'취소'}
                  onPress={() => setModalVisible(false)}
                  color={'gray'}
                  size={'large'}
                  stretch
                />
              </View>
              <Seperator width={10} />
              <View style={{flex: 1}}>
                <Button
                  text={'확인'}
                  onPress={() => pwInquiry()}
                  color={custom.themeColor}
                  size={'large'}
                  stretch
                />
              </View>
            </HView>
          </View>
        </View>
      </Modal>
      {/* <Modal
        isVisible={permissionVisible}
        onBackdropPress={() => setPermissionVisible(false)}>
        <View style={{padding: 20, backgroundColor: 'white', borderRadius: 10}}>
          <View style={{padding: 20}}>
            <View style={{alignItems: 'center'}}>
              <Text text={'레스포 앱 권한'} fontWeight={'bold'} fontSize={18} />
            </View>
            <Seperator height={20} />
            <HView>
              <HView style={{flex: 1}}>
                <Icons name={'icon-appreport-20'} size={20} color={'gray'} />
                <Seperator width={10} />
                <Text text={'기기 및 앱 기록'} fontSize={16} />
              </HView>
              <View style={{paddingVertical: 10}}>
                <Checkbox
                  size={'large'}
                  checked={permission1}
                  onPress={() => setPermission1(!permission1)}
                />
              </View>
            </HView>
            <HView>
              <HView style={{flex: 1}}>
                <Icons name={'icon-loaction-20'} size={20} color={'gray'} />
                <Seperator width={10} />
                <Text text={'위치'} fontSize={16} />
              </HView>
              <View style={{paddingVertical: 10}}>
                <Checkbox
                  size={'large'}
                  checked={permission2}
                  onPress={() => setPermission2(!permission2)}
                />
              </View>
            </HView>
          </View>
          <View style={{padding: 10}}>
            <Button
              text={'동의하고 계속하기'}
              onPress={async () => {
                await AsyncStorage.setItem(
                  'hidePermissionAlert',
                  JSON.stringify(true),
                );
                setPermissionVisible(false);
                global.hidePermissionAlert = true;
              }}
              disable={!permission1 || !permission2}
              color={custom.themeColor}
              stretch
            />
          </View>
        </View>
      </Modal> */}
    </Container>
  );
}
const styles = StyleSheet.create({
  appleButton: {
    width: 200,
    height: 60,
    margin: 10,
  },
  header: {
    margin: 10,
    marginTop: 30,
    fontSize: 18,
    fontWeight: '600',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'pink',
  },
  horizontal: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});
