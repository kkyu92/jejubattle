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
  Chat,
  Image,
} from 'react-native-nuno-ui';
import {TouchableOpacity, View, FlatList, Alert} from 'react-native';
import Icons from '../../commons/Icons';
import {custom} from '../../config';
import Entypo from 'react-native-vector-icons/Entypo';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import {AppContext} from '../../context';

export default function TabBattleChat({info, navigation}) {
  const context = React.useContext(AppContext);
  const [messages, setMessages] = React.useState([]);
  const stompClient = React.useRef();

  React.useEffect(() => {
    const sock = new SockJS('http://15.164.101.169:8080/stompWebSocket');
    stompClient.current = Stomp.over(sock);
    sock.onopen = function () {
      console.log('open');
    };
    stompClient.current.connect({}, function (frame) {
      console.log('Connected: ' + frame);
      //subscribing path
      stompClient.current.subscribe(`/topic/in/${info.baPk}`, (e) => {
        const msgs = JSON.parse(e.body);
        console.log('subscribe msg', msgs);
        setMessages(
          msgs.map((f) => ({...f, id: f.userPk, index: JSON.stringify(f.msgPk)})),
        );
      });
      stompClient.current.subscribe(`/topic/msg/${info.baPk}`, (e) => {
        const msgs = JSON.parse(e.body);
        console.log('subscribe msg', msgs);
        setMessages(
          msgs.map((f) => ({...f, id: f.userPk, index: JSON.stringify(f.msgPk)})),
        );
      });
      stompClient.current.subscribe(`/topic/msgmore/${info.baPk}`, (e) => {
        const msgs = JSON.parse(e.body);
        console.log('subscribe msgmore', msgs);
        let temp = [...messages];
        temp = temp.concat(
          msgs.map((f) => ({...f, id: f.userPk, index: JSON.stringify(f.msgPk)})),
        );
        setMessages(temp);
      });
      stompClient.current.send(`/in/${info.baPk}`, {});
    });
  }, []);
  // return stompClient.disconnect((e) => {
  //   console.log('Socket disconnected', e);
  // });
  const send = (data) => {
    stompClient.current.send(
      `/msg/${info.baPk}`,
      {},
      JSON.stringify({
        userPk: context.me.userPk,
        ...data,
      }),
    );
  };
  return (
    <Container>
      <Chat
        messages={messages}
        onSend={send}
        emptyAvatar={require('../../../assets/img/user_boy.png')}
        me={{
          id: context.me.userPk,
          name: context.me.userName,
          avatar: context.me.userImgUrl || '',
        }}
        fontSize={16}
        leftComponent={
          <TouchableOpacity
            onPress={() => null}
            style={{paddingRight: 10, paddingVertical: 5}}>
            <Entypo name={'location-pin'} size={26} color={custom.themeColor} />
          </TouchableOpacity>
        }
      />
    </Container>
  );
}
