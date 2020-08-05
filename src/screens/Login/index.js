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
} from 'react-native-nuno-ui';
import {View, Alert, Platform} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {custom} from '../../config';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {screenWidth} from '../../styles';
import Axios from 'axios';
import {logApi} from 'react-native-nuno-ui/funcs';
import AsyncStorage from '@react-native-community/async-storage';
import {AppContext} from '../../context';
import RNKakaoLogins from '@react-native-seoul/kakao-login';
import {NaverLogin, getProfile} from '@react-native-seoul/naver-login';
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
import Init from '../../commons/Init';
import Icons from '../../commons/Icons';

export default function Login(props) {
  const context = React.useContext(AppContext);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [modalVisible, setModalVisible] = React.useState(false);
  const [emailForPassword, setEmailForPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [permissionVisible, setPermissionVisible] = React.useState(false);
  const [permission1, setPermission1] = React.useState(false);
  const [permission2, setPermission2] = React.useState(false);
  const joinCallback = React.useRef();

  const gotoJoin = (callback) => {
    setPermissionVisible(true);
    joinCallback.current = callback;
  };
  const signin = () => {
    setLoading(true);
    Axios.post('signin', {
      userId: email,
      userPwd: password,
      userPushkey: global.fcmToken,
    })
      .then(async (res) => {
        logApi('signin success', res.data);
        setLoading(false);
        await AsyncStorage.setItem('token', res.data.token);
        await Init();
        context.dispatch({type: 'AUTHORIZED', data: res.data});
      })
      .catch((err) => {
        logApi('signin error', err?.response);
        setLoading(false);
        Alert.alert('로그인', err.response?.data?.message);
      });
  };
  const startWithSNS = (userId, userCode) => {
    setLoading(true);
    Axios.post('snsSignin', {
      userId: userId,
      userCode: userCode,
      userPushkey: global.fcmToken,
    })
      .then(async (res) => {
        logApi('snsSignin', res.data);
        setLoading(false);
        await AsyncStorage.setItem('token', res.data.token);
        await Init();
        context.dispatch({type: 'AUTHORIZED', data: res.data});
      })
      .catch((err) => {
        logApi('snsSignin error', err?.response);
        setLoading(false);
        if (err?.response.status === 403) {
          gotoJoin(() =>
            props.navigation.navigate('Join', {
              userId: userId,
              userCode: userCode,
            }),
          );
        } else {
          Alert.alert('로그인', err.response?.data?.message);
        }
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
      })
      .catch((err) => {
        logApi('pwInquiry error', err?.response);
        setLoading(false);
      });
  };
  const startWithApple = () => {};
  const startWithNaver = () => {
    NaverLogin.login(
      {
        kConsumerKey: '93lujQArHjePL4C80iwL',
        kConsumerSecret: 'SnqwiyTXhI',
        kServiceAppName: '제주배틀',
      },
      async (err, token) => {
        console.log(`Naver Login : ${token}`);
        if (err) {
          console.log('Naver Login error');
          return;
        }
        const profile = await getProfile(token);
        if (profile.resultcode === '024') {
          Alert.alert('Naver getProfile fail', profile.message);
          return;
        }
        startWithSNS(profile.email, 2);
      },
    );
  };
  const startWithKakao = () => {
    RNKakaoLogins.login((err, res) => {
      if (err) {
        console.log('loginWithKakao Error', err);
        return;
      }

      RNKakaoLogins.getProfile((profileErr, profile) => {
        if (err) {
          console.log('kakao getProfile', err);
          return;
        }
        console.log('kakao getProfile', profile);
        startWithSNS(profile.email, 3);
      });
    });
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
        },
      )
      .then((data) => {
        const responseInfoCallback = (error, result) => {
          if (error) {
            console.log(error);
          } else {
            console.log(result);
            startWithSNS(result.email, 4);
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
        {/* <View style={{flex: 1, padding: 50, justifyContent: 'center'}}> */}
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
              gotoJoin(() => props.navigation.navigate('Join'));
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
            loading={loading}
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
      <Modal
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
              onPress={() => {
                setPermissionVisible(false);
                joinCallback.current();
              }}
              disable={!permission1 || !permission2}
              color={custom.themeColor}
              stretch
            />
          </View>
        </View>
      </Modal>
    </Container>
  );
}
