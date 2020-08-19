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
import {TouchableOpacity, View, FlatList, Alert} from 'react-native';
import Icons from '../../commons/Icons';
import {custom} from '../../config';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import StompWS from 'react-native-stomp-websocket';

export default function TabBattleChat(props) {
  React.useEffect(() => {
    const client = StompWS.client('http://15.164.101.169:8080/stompWebSocket');
    client.debug = (text) => console.log(text);
    client.connect(
      {},
      () => {
        Alert.alert('success');
      },
      (e) => {
        Alert.alert('errr');
        console.log(e);
      },
    );
  }, []);
  return <Container></Container>;
}
