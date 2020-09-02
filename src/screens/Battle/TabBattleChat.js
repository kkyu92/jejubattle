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

export default function TabBattleChat({
  info,
  navigation,
  messages,
  page,
  moredone,
  socket,
}) {
  const context = React.useContext(AppContext);
  const send = (data) => {
    socket.send(
      `/msg/${info.baPk}`,
      {},
      JSON.stringify({
        userPk: context.me.userPk,
        ...data,
      }),
    );
  };
  const more = () => {
    socket.send(`/msgmore/${info.baPk}`, {}, JSON.stringify({pageNum: page}));
  };
  return (
    <Container>
      <Chat
        messages={messages}
        onSend={send}
        openMap={(e) =>
          navigation.navigate('FullMap', {latitude: e.lat, longitude: e.lng})
        }
        emptyAvatar={require('../../../assets/img/user_boy.png')}
        me={{
          id: context.me.userPk,
          name: context.me.userName,
          avatar: context.me.userImgUrl || '',
        }}
        more={more}
        page={page}
        moredone={moredone}
        fontSize={16}
        leftComponent={
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('FullMap', {
                aroundme: true,
                share: (data) => {
                  send({
                    text: data.faName,
                    lat: data.faLat,
                    lon: data.falon,
                    avatar: context.me.userImgUrl || '',
                  });
                },
              })
            }
            style={{paddingRight: 10, paddingVertical: 5}}>
            <Entypo name={'location-pin'} size={26} color={custom.themeColor} />
          </TouchableOpacity>
        }
      />
    </Container>
  );
}
