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
  Image,
  Modal,
} from '../../react-native-nuno-ui';
import {TouchableOpacity, View, FlatList, Alert} from 'react-native';
import Icons from '../../commons/Icons';
import {custom, SOCKET_URL} from '../../config';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {TabView} from 'react-native-tab-view';
import {screenWidth} from '../../styles';
import TabBattleDetail from './TabBattleDetail';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import TabBattleChat from './TabBattleChat';
import MatchMember from '../../commons/MatchMember';
import Axios from 'axios';
import {logApi} from '../../react-native-nuno-ui/funcs';

const initialLayout = {width: screenWidth};

export default function BattleView(props) {
  const [showMatchMember, setShowMatchMember] = React.useState(true);
  const [index, setIndex] = React.useState(0);
  const [info, setInfo] = React.useState({});
  const [routes] = React.useState([
    {key: '1', title: '배틀상세내용'},
    {key: '2', title: '배틀 톡'},
  ]);
  const [messages, setMessages] = React.useState([]);
  const [page, setPage] = React.useState(2);
  const [moredone, setMoredone] = React.useState(false);
  const [coin, setCoin] = React.useState('');
  const stompClient = React.useRef();

  React.useEffect(() => {
    get();
    coinCheck();
    const sock = new SockJS(SOCKET_URL);
    stompClient.current = Stomp.over(sock);
    stompClient.current.connect(
      {},
      function (frame) {
        // console.log('Connected: ' + frame);
        // alert(frame);
        //subscribing path
        stompClient.current.subscribe(
          `/topic/in/${props.route.params.baPk}`,
          (e) => {
            const msgs = JSON.parse(e.body);
            console.log('subscribe in', msgs);
            if (msgs.length < 40) {
              setMoredone(true);
            }
            setMessages(
              msgs.map((f) => ({
                ...f,
                id: f.userPk,
                index: JSON.stringify(f.msgPk),
              })),
            );
          },
        );
        stompClient.current.subscribe(
          `/topic/msg/${props.route.params.baPk}`,
          (e) => {
            const msgs = JSON.parse(e.body);
            console.log('subscribe msg', msgs);
            setMessages((old) => [
              {
                ...msgs,
                id: msgs.userPk,
                index: JSON.stringify(msgs.msgPk),
              },
              ...old,
            ]);
          },
        );
        stompClient.current.subscribe(
          `/topic/msgmore/${props.route.params.baPk}`,
          (e) => {
            const msgs = JSON.parse(e.body);
            console.log('subscribe msgmore', msgs);
            if (msgs.length < 40) {
              setMoredone(true);
            }
            const temp = msgs.map((f) => ({
              ...f,
              id: f.userPk,
              index: JSON.stringify(f.msgPk),
            }));
            setPage(page + 1);
            setMessages((old) => [...old, ...temp]);
          },
        );
        stompClient.current.subscribe(
          `/topic/battle/${props.route.params.baPk}`,
          (e) => {
            const battle = JSON.parse(e.body);
            setInfo(battle);
          },
        );
        stompClient.current.send(`/in/${props.route.params.baPk}`, {});
      },
      // (fail) => {
      //   alert(fail);
      // },
    );
    return () => {
      stompClient.current && stompClient.current.disconnect();
    };
  }, []);
  const get = () => {
    Axios.get(`getBattle/${props.route.params.baPk}`)
      .then((res) => {
        logApi('getBattle', res.data);
        setInfo(res.data);
      })
      .catch((err) => {
        logApi('getBattle error', err.response);
      });
  };
  const coinCheck = () => {
    Axios.get('coinCheck')
      .then((res) => {
        logApi('coinCheck', res.data);
        setCoin('OK');
      })
      .catch((err) => {
        if (err?.response?.status === 403) {
          logApi('coinCheck 403 보유코인이 없습니다.');
          setCoin('');
        } else {
          logApi('coinCheck error', err.response);
        }
      });
  };
  const renderTabBar = (tabprops) => {
    return (
      <HView
        style={{
          justifyContent: 'space-between',
          borderBottomColor: 'lightgray',
          borderBottomWidth: 1,
          backgroundColor: 'white',
        }}>
        {tabprops.navigationState.routes.map((route, i) => {
          return (
            <TouchableOpacity
              style={{
                flex: 1,
                alignItems: 'center',
                paddingVertical: 15,
                borderBottomColor: custom.themeColor,
                borderBottomWidth: index === i ? 3 : 0,
              }}
              key={i}
              onPress={() => {
                console.log('onIndexChange', i);
                if (i === 1) {
                  setShowMatchMember(false);
                }
                setIndex(i);
              }}>
              {index === i ? (
                <Text text={route.title} fontWeight={'bold'} fontSize={17} />
              ) : (
                <Text text={route.title} color={'gray'} fontSize={17} />
              )}
            </TouchableOpacity>
          );
        })}
      </HView>
    );
  };
  const renderScene = ({route}) => {
    switch (route.key) {
      case '1':
        return (
          <TabBattleDetail
            navigation={props.navigation}
            info={info}
            refresh={props.route.params.refresh}
            refreshBattleView={() => get()}
            coin={coin}
            socket={stompClient.current}
          />
        );
      case '2':
        return (
          <TabBattleChat
            navigation={props.navigation}
            info={info}
            messages={messages}
            page={page}
            moredone={moredone}
            socket={stompClient.current}
          />
        );
    }
  };
  return (
    <Container>
      <Header
        left={'back'}
        title={info.baSubject}
        navigation={props.navigation}
      />
      <View style={{alignItems: 'flex-end', padding: 20}}>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={() => setShowMatchMember(!showMatchMember)}>
          <Text
            text={showMatchMember ? '접기' : '펼치기'}
            fontWeight={'500'}
            fontSize={14}
          />
          <Seperator width={10} />
          <Image
            local
            uri={require('../../../assets/img/icon-fold.png')}
            height={27}
            width={27}
            resizeMode={'cover'}
          />
        </TouchableOpacity>
      </View>
      {showMatchMember && info.teamA && (
        <MatchMember
          info={info}
          navigation={props.navigation}
          refreshBattleView={() => get()}
          socket={stompClient.current}
        />
      )}
      {/* <Seperator height={50} /> */}
      {info.baDate && (
        <TabView
          lazy
          renderTabBar={renderTabBar}
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
        />
      )}
    </Container>
  );
}
