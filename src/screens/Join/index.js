import React from 'react';
import {
  Container,
  Seperator,
  Text,
  TextInput,
  Button,
  Image,
  HView,
  Header,
  Checkbox,
  Picker,
} from '../../react-native-nuno-ui';
import {View, TouchableOpacity, Alert, Linking, Platform} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {custom, API_URL} from '../../config';
import Icons from '../../commons/Icons';
import ImagePicker from 'react-native-image-crop-picker';
import Axios from 'axios';
import {
  logApi,
  checkEmail,
  checkPassword,
  getQueryParam,
  showToast,
} from '../../react-native-nuno-ui/funcs';
import {AppContext} from '../../context';
import AsyncStorage from '@react-native-community/async-storage';
import Init from '../../commons/Init';
import Spinner from 'react-native-loading-spinner-overlay';
import {show} from 'react-native-bootsplash';
import InAppBrowser from 'react-native-inappbrowser-reborn';

export default function Join(props) {
  const context = React.useContext(AppContext);
  const [photo, setPhoto] = React.useState('');
  const [name, setName] = React.useState(props.route?.params?.userName || '');
  const [mobile, setMobile] = React.useState('');
  const [gender, setGender] = React.useState(
    props.route?.params?.userGender || '',
  );
  const [uid, setUid] = React.useState(props.route?.params?.uid || '');
  const [email, setEmail] = React.useState(props.route?.params?.userId || '');
  const [userAuthkey, setUserAuthkey] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [repassword, setRepassword] = React.useState('');
  const [emailVerified, setEmailVerified] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [agreement, setAgreement] = React.useState(false);
  const [agreement1, setAgreement1] = React.useState(false);
  const [agreement2, setAgreement2] = React.useState(false);

  React.useEffect(() => {
    // if (props.route?.params?.userCode !== undefined) {
    setGender('U');
    // }
    // console.log(JSON.stringify(props.route.params));
    // if (props.route?.params?.userId === undefined) {
    //   // setEmail(`${uid}@null.com`);
    //   console.log(`email 없음 ${props.route?.param?.userId}`);
    //   console.log(`email 없음 ${email}`);
    //   console.log(`uid 없음 ${uid}`);
    // } else {
    //   console.log(`email 있음 ${props.route?.params?.userId}`);
    //   console.log(`email 있음 ${email}`);
    //   console.log(`uid 있음 ${uid}`);
    // }
    // Alert.alert(
    //   'SNS 받아오는 정보',
    //   `userCode [SNS] : ${props.route?.params?.userCode}
    // userId [email] : ${props.route?.params?.userId}
    // uid [고유ID] : ${props.route?.params?.uid}`,
    // );
    Linking.getInitialURL()
      .then((url) => {
        if (url) {
          handleOpenURL(url);
        }
      })
      .catch((err) => {});
    Linking.addEventListener('url', handleOpenURL);
    return () => Linking.removeEventListener('url', handleOpenURL);
  }, []);
  React.useEffect(() => {
    console.log('context.noti : ' + JSON.stringify(context.noti));
    const noti = context.noti;
    if (
      noti.screen === 'join' &&
      noti.param === 'email_approved' &&
      noti.email === email
    ) {
      setEmailVerified(true);
      console.log('인증 오케');
    } else {
      console.log('인증 노');
    }
    // const count = context.noti.filter(
    //   (e) =>
    //     e.screen === 'join' &&
    //     e.param === 'email_approved' &&
    //     e.email === email,
    // ).length;
    // if (count > 0) {
    //   setEmailVerified(true);
    //   console.log('인증 오케');
    // } else {
    //   console.log('아직인증 노');
    // }
  }, [context.noti]);
  const handleOpenURL = async (e) => {
    const temp = e.url.split('/');
    const param = temp[temp.length - 1];
    await InAppBrowser.close();
    await console.log('handleOpenURL', e.url, param);
    await Alert.alert('핸드폰 본인인증이 완료되었습니다', param);
    await setMobile(param);
  };
  const handleAgreementAll = () => {
    if (agreement) {
      setAgreement(!agreement);
      setAgreement1(false);
      setAgreement2(false);
    } else {
      setAgreement(!agreement);
      setAgreement1(true);
      setAgreement2(true);
    }
  };
  const verifyEmail = () => {
    if (!email) {
      Alert.alert('인증을 위한 이메일을 입력해주세요');
      return;
    }
    Axios.post('idCheckd', {
      userId: email,
      userPushkey: global.fcmToken,
    })
      .then(async (res) => {
        logApi('idCheck', res.data);
        setUserAuthkey(res.data.userAuthkey);
        setEmailVerified(true);
        Alert.alert('중복확인완료', '입력하신 이메일로 가입이 가능합니다');
      })
      .catch((err) => {
        logApi('idCheckd error', err?.response);
        setEmailVerified(false);
        Alert.alert('이메일중복', err?.response?.data?.message);
      });
  };
  const prePostUser = () => {
    if (
      !name ||
      !agreement1 ||
      !gender ||
      (!email && props.route?.params?.userCode) ||
      !mobile
    ) {
      if (!name) {
        showToast('이름을 확인해주세요', 2000, 'center');
      } else if (!agreement1) {
        showToast('(필수) 이용약관에 동의해주세요', 2000, 'center');
      } else if (!gender) {
        showToast('성별을 체크해주세요', 2000, 'center');
      } else if (!email) {
        showToast('인증을 위한 이메일을 입력해주세요', 2000, 'center');
      } else if (!mobile) {
        showToast('휴대폰 인증을 완료해주세요', 2000, 'center');
      }
      return;
    }
    const checkemail = checkEmail(email);
    const checkpassword = checkPassword(password, repassword);
    if (!emailVerified && !props.route?.params?.userCode) {
      Alert.alert('이메일 중복확인을 해주세요');
      return;
    }
    // if (props.route?.params?.userCode === undefined && !userAuthkey) {
    //   Alert.alert('이메일 인증요청을 해주세요');
    //   return;
    // }
    if (props.route?.params?.userCode === undefined && !checkemail.valid) {
      Alert.alert('이메일 오류', '이메일 형식이 아닙니다');
      return;
    }
    if (
      props.route?.params?.userCode === undefined &&
      password !== repassword
    ) {
      Alert.alert('비밀번호 오류', '두 비밀번호가 서로 다릅니다');
      return;
    }
    if (props.route?.params?.userCode === undefined && !checkpassword.valid) {
      Alert.alert('비밀번호 오류', '비밀번호는 문자와 숫자포함 6자 이상입니다');
      return;
    }
    postUser();
  };
  const postUser = async () => {
    await setLoading(true);
    if (props.route?.params?.userCode) {
      const formData = new FormData();
      formData.append('userCode', props.route?.params?.userCode);
      formData.append('userId', uid);
      formData.append('userName', name);
      formData.append('userEmail', email);
      formData.append('userSex', gender);
      formData.append('userPhone', mobile);
      formData.append('userPushkey', global.fcmToken);
      formData.append('deviceOs', Platform.OS === 'android' ? 1 : 2);
      formData.append('deviceOsVer', Platform.Version);
      if (photo) {
        const response = await fetch(photo);
        const blob = await response.blob();

        formData.append('file', {
          uri: photo,
          name: blob.data.name,
          type: blob.data.type,
        });
      }
      Axios({
        url: API_URL + 'snsSignup',
        method: 'POST',
        data: formData,
        headers: {
          Accept: 'application/json',
          token: global.token,
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(async (res) => {
          logApi('snsSignup', res.data);
          if (res.data.token) {
            await AsyncStorage.setItem('token', res.data.token);
            await Init();
            context.dispatch({type: 'AUTHORIZED', data: res.data});
          }
          await setLoading(false);
        })
        .catch(async (err) => {
          logApi('snsSignup error', err?.response);
          Alert.alert(err.response?.data?.message);
          await setLoading(false);
        });
    } else {
      const formData = new FormData();
      formData.append('userCode', 1);
      formData.append('userId', email);
      formData.append('userPwd', password);
      formData.append('userName', name);
      formData.append('userSex', gender);
      formData.append('userPhone', mobile);
      formData.append('userPushkey', global.fcmToken);
      formData.append('userAuthkey', userAuthkey);
      formData.append('deviceOs', Platform.OS === 'android' ? 1 : 2);
      formData.append('deviceOsVer', Platform.Version);
      if (photo) {
        const response = await fetch(photo);
        const blob = await response.blob();

        formData.append('file', {
          uri: photo,
          name: blob.data.name,
          type: blob.data.type,
        });
      }
      Axios({
        url: API_URL + 'signup',
        method: 'POST',
        data: formData,
        headers: {
          Accept: 'application/json',
          token: global.token,
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(async (res) => {
          logApi('signup', res.data);
          if (res.data.token) {
            await AsyncStorage.setItem('token', res.data.token);
            await Init();
            context.dispatch({type: 'AUTHORIZED', data: res.data});
          }
          await setLoading(false);
        })
        .catch(async (err) => {
          logApi('signup error', err?.response);
          Alert.alert(err.response?.data?.message);
          await setLoading(false);
        });
    }
  };
  const getPhoto = (index) => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      mediaType: 'photo',
      smartAlbums: ['UserLibrary'],
      cropping: true,
    })
      .then(async (res) => {
        console.log('ImagePicker openPicker', res);
        setPhoto(res.path);
      })
      .catch((err) => {
        console.log('ImagePicker openPicker error', err);
      });
  };
  const linkBrowser = async () => {
    try {
      const url = 'https://jejubattle.com/nice/main';
      if (Platform.OS === 'ios') {
        if (await InAppBrowser.isAvailable()) {
          const result = await InAppBrowser.open(url, {
            // iOS Properties
            dismissButtonStyle: 'cancel',
            preferredBarTintColor: custom.themeColor,
            preferredControlTintColor: 'white',
            readerMode: false,
            animated: true,
            modalPresentationStyle: 'fullScreen',
            modalTransitionStyle: 'coverVertical',
            modalEnabled: true,
            enableBarCollapsing: false,
            // Android Properties
            showTitle: true,
            toolbarColor: custom.themeColor,
            secondaryToolbarColor: 'black',
            enableUrlBarHiding: true,
            enableDefaultShare: true,
            forceCloseOnRedirection: false,
            // Specify full animation resource identifier(package:anim/name)
            // or only resource name(in case of animation bundled with app).
            animations: {
              startEnter: 'slide_in_right',
              startExit: 'slide_out_left',
              endEnter: 'slide_in_left',
              endExit: 'slide_out_right',
            },
            headers: {
              'my-custom-header': 'my custom header value',
            },
          });
          // Alert.alert(JSON.stringify(result));
        }
      } else Linking.openURL(url);
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  return (
    <Container>
      <Spinner
        visible={loading}
        textContent={''}
        color={'#F4A100'}
        // textStyle={styles.spinnerTextStyle}
      />
      <Header left={'close'} navigation={props.navigation} title={'회원가입'} />
      <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'}>
        <Seperator height={30} />
        <View style={{padding: 20}}>
          <HView>
            <TouchableOpacity onPress={() => getPhoto()}>
              <View>
                {photo ? (
                  <Image uri={photo} width={72} height={72} borderRadius={36} />
                ) : (
                  <Image
                    local
                    uri={require('../../../assets/img/img-user1.png')}
                    width={72}
                    height={72}
                    borderRadius={36}
                  />
                )}
                <View
                  style={{
                    backgroundColor: 'white',
                    position: 'absolute',
                    borderWidth: 1,
                    borderColor: 'lightgray',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    right: 0,
                    bottom: 0,
                  }}>
                  <Icons
                    name={'icon-pencil-12'}
                    size={13}
                    color={'lightgray'}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </HView>
          <Seperator height={30} />
          <Text text={'이름'} fontSize={16} fontWeight={'500'} />
          <Seperator height={10} />
          <TextInput
            value={name}
            onChangeText={(e) => setName(e)}
            borderWidth={0}
            placeholder={'본인의 이름을 입력해주세요'}
          />
          <Seperator line />
          <Seperator height={30} />
          <Text text={'성별'} fontSize={16} fontWeight={'500'} />
          <Seperator height={10} />
          <HView>
            <Checkbox
              // size={'large'}
              checked={gender === 'M'}
              label={'남성'}
              onPress={() => setGender('M')}
            />
            <Seperator width={60} />
            <Checkbox
              // size={'large'}
              checked={gender === 'F'}
              label={'여성'}
              onPress={() => setGender('F')}
            />
          </HView>

          <Seperator height={30} />
          <HView style={{justifyContent: 'space-between'}}>
            <Text text={'휴대폰 인증'} fontSize={16} fontWeight={'500'} />
            <Button
              text={mobile ? '인증완료' : '인증요청'}
              size={'medium'}
              onPress={
                // () => Linking.openURL('https://jejubattle.com/nice/main')
                // () =>
                //   props.navigation.navigate('Webview', {
                //     url: 'https://jejubattle.com/nice/main',
                //     title: '본인인증',
                //   })
                () => linkBrowser()
              }
              // textColor={'dimgray'}
              color={mobile ? custom.themeColor : 'white'}
              borderRadius={20}
            />
          </HView>

          {props.route?.params?.userCode === undefined && (
            <>
              <Seperator height={30} />
              <Text text={'아이디'} fontSize={16} fontWeight={'500'} />
              <Seperator height={10} />
              <HView>
                <View style={{flex: 1}}>
                  <TextInput
                    value={email}
                    onChangeText={(e) => {
                      setEmail(e), setEmailVerified(false);
                    }}
                    borderWidth={0}
                    autoCapitalize={'none'}
                    keyboardType={'email-address'}
                    placeholder={'아이디로 사용할 이메일을 입력해주세요'}
                  />
                </View>
                <Button
                  text={emailVerified ? '확인완료' : '중복확인'}
                  size={'medium'}
                  onPress={() => {
                    if (email) {
                      const checkemail = checkEmail(email);
                      if (!checkemail.valid) {
                        Alert.alert('이메일 오류', '이메일 형식이 아닙니다');
                        return;
                      }
                      verifyEmail();
                    }
                  }}
                  color={emailVerified ? custom.themeColor : 'white'}
                  borderRadius={20}
                />
              </HView>
              <Seperator line />
            </>
          )}

          {props.route?.params?.userCode === undefined && (
            <>
              <Seperator height={30} />
              <Text text={'비밀번호'} fontSize={16} fontWeight={'500'} />
              <Seperator height={10} />
              <TextInput
                value={password}
                onChangeText={(e) => setPassword(e)}
                showEye={true}
                maxLength={12}
                borderWidth={0}
                placeholder={'비밀번호(영문숫자포함 6~12자)'}
              />
              <Seperator line />

              <Seperator height={30} />
              <Text text={'비밀번호 확인'} fontSize={16} fontWeight={'500'} />
              <TextInput
                value={repassword}
                showEye={true}
                maxLength={12}
                onChangeText={(e) => setRepassword(e)}
                borderWidth={0}
                placeholder={'입력했던 비밀번호를 다시 입력해주세요'}
              />
              <Seperator line />
            </>
          )}
          <Seperator height={30} />
          <Text text={'마케팅 수신동의서'} fontSize={16} fontWeight={'500'} />
          <Seperator height={10} />
          {/* 약관동의 */}
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Checkbox
              multiple
              // customChecked={<Icons name={'icon-radiocheck-28'} size={28} color={custom.themeColor} />}
              label={'개인정보 수집 및 이용 동의서 (필수)'}
              onPress={() => {
                setAgreement(
                  agreement ? !agreement : agreement2 ? !agreement : agreement,
                ),
                  setAgreement1(!agreement1);
              }}
              checked={agreement1}
              labelPress={() =>
                Linking.openURL('https://jejubattle.com/privacyRequired')
              }
            />
          </View>
          <Seperator height={5} />
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Checkbox
              multiple
              label={'개인정보 수집 및 이용 동의서 (선택)'}
              onPress={() => {
                setAgreement(
                  agreement ? !agreement : agreement1 ? !agreement : agreement,
                ),
                  setAgreement2(!agreement2);
              }}
              checked={agreement2}
              labelPress={() =>
                Linking.openURL('https://jejubattle.com/privacySelect')
              }
            />
          </View>
          {/* <Seperator height={5} />
          <HView>
            <View style={{flex: 1, alignItems: 'flex-start'}}>
              <Checkbox
                multiple
                label={'약관3'}
                onPress={() => setAgreement3(!agreement3)}
                checked={agreement3}
              />
            </View>
            <View style={{flex: 1, alignItems: 'flex-start'}}>
              <Checkbox
                multiple
                label={'약관4'}
                onPress={() => setAgreement4(!agreement4)}
                checked={agreement4}
              />
            </View>
          </HView> */}
          <Seperator height={20} />
          <Checkbox
            label={'모두선택'}
            checked={agreement}
            onPress={() => handleAgreementAll()}
          />
        </View>
      </KeyboardAwareScrollView>
      <View
        style={{
          borderTopColor: 'lightgray',
          borderTopWidth: 1,
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}>
        <Button
          stretch
          size={'large'}
          text={'회원가입'}
          onPress={() => prePostUser()}
          color={custom.themeColor}
        />
        <Seperator bottom />
      </View>
    </Container>
  );
}
