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
} from '../../react-native-nuno-ui';
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
    socket.send(
      `/msgmore/${info.baPk}`,
      {},
      JSON.stringify({pageNum: page + 1}),
    );
  };

  return (
    <Container>
      <Chat
        // messages 안에 해당 멤버가 어느팀에 소속되어 있는지 team 을 추가한다.
        messages={messages.map((e) => {
          let team = '';
          if (info.teamA.name !== '' && info.teamB.name !== '') {
            // N:N 일경우에만 아래 적용됨
            const foundedAtTeamA = info.teamA.member
              .map((m) => m.userPk)
              .indexOf(e.userPk);
            const foundedAtTeamB = info.teamB.member
              .map((m) => m.userPk)
              .indexOf(e.userPk);
            if (foundedAtTeamA !== -1) {
              if (foundedAtTeamA === 0) {
                team = `(${info.teamA.name} 리더)`;
              } else {
                team = `(${info.teamA.name})`;
              }
            }
            if (foundedAtTeamB !== -1) {
              if (foundedAtTeamB === 0) {
                team = `(${info.teamB.name} 리더)`;
              } else {
                team = `(${info.teamB.name})`;
              }
            }
          }
          return {
            ...e,
            team: team,
          };
        })}
        onSend={send}
        openMap={(e) =>
          navigation.navigate('FullMap', {
            battleChatLink: true,
            info: [
              {
                // faImgUrl: e.faImgUrl,
                faLat: e.lat,
                faLon: e.lng,
                faName: e.title,
                // faLikeCnt: e.faLikeCnt,
                faPk: e.faPk,
                // faReplyCnt: e.faReplyCnt,
                // faScopeCnt: e.faScopeCnt,
                // faScrapType: e.faScrapType,
                // faSubject: e.faSubject,
              },
            ],
          })
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
                facilitySearch: true,
                baPk: info.baPk,
                share: (data) => {
                  send({
                    // faSubject: data.faSubject,
                    // faScrapType: data.faScrapType,
                    // faScopeCnt: data.faScopeCnt,
                    // faReplyCnt: data.faReplyCnt,
                    faPk: data.faPk,
                    // faLikeCnt: data.faLikeCnt,
                    // faImgUrl: data.faImgUrl,
                    text: data.faName,
                    lat: data.faLat,
                    lon: data.faLon,
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
