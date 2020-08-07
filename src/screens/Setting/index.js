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
import {custom, API_URL} from '../../config';
import ListItem from '../../commons/ListItem';
import {screenWidth} from '../../styles';
import {AppContext} from '../../context';
import AsyncStorage from '@react-native-community/async-storage';
import Init from '../../commons/Init';
import Axios from 'axios';
import { logApi } from 'react-native-nuno-ui/funcs';

export default function Setting(props) {
  const context = React.useContext(AppContext);
  const [userTermsEvent, setUserTermsEvent] = React.useState(
    context.me.userTermsEvent,
  );
  const [userTermsPush, setUserTermsPush] = React.useState(
    context.me.userTermsPush,
  );
  const signout = async () => {
    await AsyncStorage.removeItem('token');
    await Init();
    context.dispatch({type: 'UNAUTHORIZED'});
  };
  const firstUpdate = React.useRef(true);
  React.useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    updateUser();
  }, [userTermsEvent, userTermsPush]);
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
      })
      .catch((err) => {
        logApi('userUpdate error', err?.response);
      });
  };
  return (
    <Container>
      <Header left={'close'} title={'설정'} navigation={props.navigation} />
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
          onPress={() => setUserTermsEvent(userTermsEvent === 'Y' ? 'N' : 'Y')}
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
          onPress={() => setUserTermsPush(userTermsPush === 'Y' ? 'N' : 'Y')}
        />
      </HView>
      <Seperator height={20} />
      <TouchableOpacity
        style={{paddingHorizontal: 20, paddingVertical: 15}}
        onPress={() => null}>
        <Text
          text={'개인정보 처리 방침'}
          fontSize={18}
          fontWeight={'500'}
          color={'dimgray'}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{paddingHorizontal: 20, paddingVertical: 15}}
        onPress={() => null}>
        <Text
          text={'서비스 이용 약관'}
          fontSize={18}
          fontWeight={'500'}
          color={'dimgray'}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{paddingHorizontal: 20, paddingVertical: 15}}
        onPress={() => null}>
        <Text
          text={'위치정보 이용 약관'}
          fontSize={18}
          fontWeight={'500'}
          color={'dimgray'}
        />
      </TouchableOpacity>
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
          text={'v.1.0.20'}
          fontSize={16}
          fontWeight={'500'}
          color={'dimgray'}
        />
      </HView>

      <Seperator height={50} />

      <TouchableOpacity
        style={{paddingHorizontal: 20, paddingVertical: 15}}
        onPress={() => signout()}>
        <Text
          text={'로그아웃'}
          fontSize={18}
          fontWeight={'500'}
          color={'dimgray'}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{paddingHorizontal: 20, paddingVertical: 15}}
        onPress={() => null}>
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
