import React from 'react';
import {
  Container,
  Text,
  Header,
  Seperator,
  HView,
  Button,
  TextInput,
  Picker,
  DateTime,
  Checkbox,
} from 'react-native-nuno-ui';
import {TouchableOpacity, View, FlatList} from 'react-native';
import Icons from '../../commons/Icons';
import {custom} from '../../config';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default function TabBattleChat(props) {
  React.useEffect(() => {
    const ws = new WebSocket('ws://');
    // 소켓 연결 시
    ws.onopen = () => {
      ws.send('something'); // 메세지 전송
    };

    // 메세지 수신
    ws.onmessage = (e) => {
      console.log(e.data);
    };

    // 에러 발생시
    ws.onerror = (e) => {
      console.log(e.message);
    };

    // 소켓 연결 해제
    ws.onclose = (e) => {
      console.log(e.code, e.reason);
    };
  }, []);
  return <Container></Container>;
}
