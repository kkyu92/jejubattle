import React from 'react';
import {
  Container,
  Seperator,
  Text,
  TextInput,
  Button,
  Image,
  HView,
} from 'react-native-nuno-ui';
import {View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {custom} from '../../config';

export default function Login(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <Container
      backgroundImage={require('../../../assets/img/bg/442675-PEKYXF-126.png')}>
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
            onPress={() => props.navigation.navigate('Join')}
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
            placeholder={'이메일'}
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
            borderColor={'white'}
            placeholder={'패스워드'}
            placeholderTextColor={'white'}
          />
          <Seperator height={10} />
          <HView style={{justifyContent: 'flex-end'}}>
            <Text
              text={'비밀번호를 잊어버렸어요'}
              fontSize={13}
              fontWeight={'bold'}
              color={'white'}
              style={{textDecorationLine: 'underline'}}
            />
          </HView>
          <Seperator height={60} />
          <HView style={{justifyContent: 'space-evenly'}}>
            <View
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
            </View>
            <View
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
            </View>
            <View
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
            </View>
          </HView>
          <Seperator height={50} />
          <Button
            text={'로그인'}
            onPress={() => null}
            color={'whitesmoke'}
            size={'large'}
            textColor={'black'}
            borderColor={'whitesmoke'}
            stretch
          />
        </View>
        {/* </View> */}
      </KeyboardAwareScrollView>
    </Container>
  );
}
