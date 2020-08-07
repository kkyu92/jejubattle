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
} from 'react-native-nuno-ui';
import {View, TouchableOpacity, Alert, Linking} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {custom, API_URL} from '../../config';
import Icons from '../../commons/Icons';
import ImagePicker from 'react-native-image-crop-picker';
import Axios from 'axios';
import {logApi, checkEmail, checkPassword, getQueryParam} from 'react-native-nuno-ui/funcs';
import {AppContext} from '../../context';
import AsyncStorage from '@react-native-community/async-storage';
import Init from '../../commons/Init';

export default function Join(props) {
  const context = React.useContext(AppContext);
  const [photo, setPhoto] = React.useState('');
  const [name, setName] = React.useState('');
  const [mobile, setMobile] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [uid, setUid] = React.useState(props.route?.params?.uid || '');
  const [email, setEmail] = React.useState(props.route?.params?.userId || '');
  const [userAuthkey, setUserAuthkey] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [repassword, setRepassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [agreement, setAgreement] = React.useState(false);
  const [agreement1, setAgreement1] = React.useState(false);
  const [agreement2, setAgreement2] = React.useState(false);
  const [agreement3, setAgreement3] = React.useState(false);
  const [agreement4, setAgreement4] = React.useState(false);

  React.useEffect(() => {
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
  const handleOpenURL = (e) => {
    const temp = e.url.split('/');
    const param = temp[temp.length - 1];
    console.log('handleOpenURL', e.url, param);
    setMobile(param);
  };
  const verifyEmail = () => {
    if (!email) {
      Alert.alert('인증을 위한 이메일을 입력해주세요');
      return;
    }
    Axios.post('idCheck', {
      userId: email,
    })
      .then(async (res) => {
        logApi('idCheck', res.data);
        setUserAuthkey(res.data.userAuthkey);
        Alert.alert(
          '이메일인증',
          '입력하신 이메일로 인증메일을 보냈습니다. 이메일을 확인하여 인증을 완료해주세요',
        );
      })
      .catch((err) => {
        logApi('idCheck error', err?.response);
      });
  };
  const prePostUser = () => {
    const checkemail = checkEmail(email);
    const checkpassword = checkPassword(password, repassword);
    if (props.route?.params?.userCode === undefined && !userAuthkey) {
      Alert.alert('이메일 인증요청을 해주세요');
      return;
    }
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
    setLoading(true);
    if (props.route?.params?.userCode) {
      const formData = new FormData();
      formData.append('userCode', props.route?.params?.userCode);
      formData.append('userId', uid);
      formData.append('userName', name);
      formData.append('userEmail', email);
      formData.append('userSex', gender);
      formData.append('userPhone', mobile);
      formData.append('userPushkey', global.fcmToken);
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
          setLoading(false);
          logApi('snsSignup', res.data);
          if (res.data.token) {
            await AsyncStorage.setItem('token', res.data.token);
            await Init();
            context.dispatch({type: 'AUTHORIZED', data: res.data});
          }
        })
        .catch((err) => {
          setLoading(false);
          logApi('snsSignup error', err?.response);
          Alert.alert(err.response?.data?.message);
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
          setLoading(false);
          logApi('signup', res.data);
          if (res.data.token) {
            await AsyncStorage.setItem('token', res.data.token);
            await Init();
            context.dispatch({type: 'AUTHORIZED', data: res.data});
          }
        })
        .catch((err) => {
          setLoading(false);
          logApi('signup error', err?.response);
          Alert.alert(err.response?.data?.message);
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

  return (
    <Container>
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
                () => Linking.openURL('https://kangmin.shop/nice/main')
                // () =>
                //   props.navigation.navigate('Webview', {
                //     url: 'https://kangmin.shop/nice/main',
                //     title: '본인인증',
                //   })
              }
              // textColor={'dimgray'}
              color={mobile ? custom.themeColor : 'white'}
              borderRadius={20}
            />
          </HView>

          <Seperator height={30} />
          <Text text={'아이디'} fontSize={16} fontWeight={'500'} />
          <Seperator height={10} />
          <HView>
            <View style={{flex: 1}}>
              <TextInput
                value={email}
                onChangeText={(e) => setEmail(e)}
                borderWidth={0}
                autoCapitalize={'none'}
                keyboardType={'email-address'}
                editable={props.route?.params?.userCode === undefined}
                placeholder={'아이디로 사용할 이메일을 입력해주세요'}
              />
            </View>
            {props.route?.params?.userCode === undefined && (
              <Button
                text={'인증요청'}
                size={'medium'}
                onPress={() => verifyEmail()}
                textColor={'dimgray'}
                color={'white'}
                borderRadius={20}
              />
            )}
          </HView>
          <Seperator line />

          {props.route?.params?.userCode === undefined && (
            <>
              <Seperator height={30} />
              <Text text={'비밀번호'} fontSize={16} fontWeight={'500'} />
              <Seperator height={10} />
              <TextInput
                value={password}
                onChangeText={(e) => setPassword(e)}
                showEye={true}
                borderWidth={0}
                placeholder={'비밀번호(영문숫자포함 6~12자)'}
              />
              <Seperator line />

              <Seperator height={30} />
              <Text text={'비밀번호 확인'} fontSize={16} fontWeight={'500'} />
              <TextInput
                value={repassword}
                showEye={true}
                onChangeText={(e) => setRepassword(e)}
                borderWidth={0}
                placeholder={'입력했던 비밀번호를 다시 입력해주세요'}
              />
              <Seperator line />
            </>
          )}
          <Seperator height={20} />
          {/* 약관동의 */}
          <HView>
            <View style={{flex: 1, alignItems: 'flex-start'}}>
              <Checkbox
                multiple
                // customChecked={<Icons name={'icon-radiocheck-28'} size={28} color={custom.themeColor} />}
                label={'약관1'}
                onPress={() => setAgreement1(!agreement1)}
                checked={agreement1}
              />
            </View>
            <View style={{flex: 1, alignItems: 'flex-start'}}>
              <Checkbox
                multiple
                label={'약관2'}
                onPress={() => setAgreement2(!agreement2)}
                checked={agreement2}
              />
            </View>
          </HView>
          <Seperator height={5} />
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
          </HView>
          <Seperator height={20} />
          <Checkbox
            label={'약관에 동의하였습니다'}
            checked={agreement}
            onPress={() => setAgreement(!agreement)}
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
          loading={loading}
          disable={
            !name ||
            !agreement ||
            !agreement1 ||
            !agreement2 ||
            !agreement3 ||
            !agreement4 ||
            !gender ||
            !email ||
            !mobile
          }
          onPress={() => prePostUser()}
          color={custom.themeColor}
        />
        <Seperator bottom />
      </View>
    </Container>
  );
}
