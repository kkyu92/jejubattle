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
} from 'react-native-nuno-ui';
import {View, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import Icons from '../../commons/Icons';
import {custom} from '../../config';
import ListItem from '../../commons/ListItem';
import {screenWidth} from '../../styles';
import { AppContext } from '../../context';

export default function Setting(props) {
  const context = React.useContext(AppContext);
  const signout = () => {
    context.dispatch({type: 'UNAUTHORIZED'});
  };
  return (
    <Container>
      <Header left={'close'} title={'설정'} navigation={props.navigation} />
      <Seperator height={20} />
      <HView style={{paddingHorizontal: 20, paddingVertical: 10, justifyContent: 'space-between'}}>
        <Text
          text={'이벤트 및 마케팅 활용 동의'}
          fontSize={18}
          fontWeight={'500'}
          color={'dimgray'}
        />
        <Switch checked={true} onPress={() => null} />
      </HView>
      <HView style={{paddingHorizontal: 20, paddingVertical: 10, justifyContent: 'space-between'}}>
        <Text
          text={'알림 푸쉬 허용'}
          fontSize={18}
          fontWeight={'500'}
          color={'dimgray'}
        />
        <Switch checked={true} onPress={() => null} />
      </HView>
      <Seperator height={20} />
      <TouchableOpacity style={{paddingHorizontal: 20, paddingVertical: 15}} onPress={() => null}>
        <Text
          text={'개인정보 처리 방침'}
          fontSize={18}
          fontWeight={'500'}
          color={'dimgray'}
        />
      </TouchableOpacity>
      <TouchableOpacity style={{paddingHorizontal: 20, paddingVertical: 15}} onPress={() => null}>
        <Text
          text={'서비스 이용 약관'}
          fontSize={18}
          fontWeight={'500'}
          color={'dimgray'}
        />
      </TouchableOpacity>
      <TouchableOpacity style={{paddingHorizontal: 20, paddingVertical: 15}} onPress={() => null}>
        <Text
          text={'위치정보 이용 약관'}
          fontSize={18}
          fontWeight={'500'}
          color={'dimgray'}
        />
      </TouchableOpacity>
      <TouchableOpacity style={{paddingHorizontal: 20, paddingVertical: 15}} onPress={() => null}>
        <Text
          text={'오픈소스 라이선스'}
          fontSize={18}
          fontWeight={'500'}
          color={'dimgray'}
        />
      </TouchableOpacity>
      <HView style={{paddingHorizontal: 20, paddingVertical: 15, justifyContent: 'space-between'}}>
        <Text
          text={'버전 정보'}
          fontSize={18}
          fontWeight={'500'}
          color={'dimgray'}
        />
        <Text
          text={'v.1.0.20'}
          fontSize={16}
          fontWeight={'500'}
          color={'dimgray'}
        />
      </HView>

      <Seperator height={50} />

      <TouchableOpacity style={{paddingHorizontal: 20, paddingVertical: 15}} onPress={() => signout()}>
        <Text
          text={'로그아웃'}
          fontSize={18}
          fontWeight={'500'}
          color={'dimgray'}
        />
      </TouchableOpacity>
      <TouchableOpacity style={{paddingHorizontal: 20, paddingVertical: 15}} onPress={() => null}>
        <Text
          text={'회원탈퇴'}
          fontSize={18}
          fontWeight={'500'}
          color={'dimgray'}
        />
      </TouchableOpacity>
    </Container>
  );
}
