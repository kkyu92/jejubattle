import React from 'react';
import {
  Container,
  Text,
  Header,
  Seperator,
  HView,
  Image,
  Loader,
} from '../../react-native-nuno-ui';
import {TouchableOpacity, View} from 'react-native';
import {custom, SOCKET_URL} from '../../config';
import {TabView} from 'react-native-tab-view';
import {screenWidth} from '../../styles';
import TabBattleDetail from './TabBattleDetail';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import TabBattleChat from './TabBattleChat';
import MatchMember from '../../commons/MatchMember';
import Axios from 'axios';
import {logApi} from '../../react-native-nuno-ui/funcs';
import AsyncStorage from '@react-native-community/async-storage';
import {useIsFocused} from '@react-navigation/native';

const initialLayout = {width: screenWidth};

export default function BattleView(props) {
  const [showMatchMember, setShowMatchMember] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const [info, setInfo] = React.useState({});
  const [routes] = React.useState([
    {key: '1', title: '배틀상세내용'},
    {key: '2', title: '배틀 톡'},
  ]);
  const [messages, setMessages] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [moredone, setMoredone] = React.useState(false);
  const [coin, setCoin] = React.useState('');
  const stompClient = React.useRef();

  const [baPk, setBaPk] = React.useState(props.route?.params?.baPk);
  let getBaPk = props.route?.params?.baPk;
  let getTabIndex = props.route?.params?.tabIndex;

  const isFocused = useIsFocused();

  React.useEffect(() => {
    if (getBaPk && getTabIndex) {
      setShowMatchMember(false);
      setIndex(1);
    }
  }, [getBaPk, getTabIndex]);

  React.useEffect(() => {
    coinCheck();
  }, [isFocused]);

  const socketConn = () => {
    const sock = new SockJS(SOCKET_URL);
    stompClient.current = Stomp.over(sock);
    stompClient.current.connect(
      {},
      function (frame) {
        AsyncStorage.setItem('baPk', JSON.stringify(props.route.params.baPk));
        console.log('set baPk : ' + props.route.params.baPk);
        // alert(frame);
        //subscribing path
        stompClient.current.subscribe(
          `/topic/in/${props.route.params.baPk}`,
          (e) => {
            const msgs = JSON.parse(e.body);
            console.log('subscribe in', msgs);
            if (
              msgs.length <= 40 &&
              msgs[msgs.length - 1].userPk === 0 &&
              msgs[msgs.length - 1].text ===
                '대화를 통해 배틀장소와 시간을 정해주세요.'
            ) {
              console.log('subscribe in', 'setMoredone = true');
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
            if (
              msgs.length <= 40 &&
              msgs[msgs.length - 1].userPk === 0 &&
              msgs[msgs.length - 1].text ===
                '대화를 통해 배틀장소와 시간을 정해주세요.'
            ) {
              console.log('subscribe msgmore', 'setMoredone = true');
              setMoredone(true);
            }
            const temp = msgs.map((f) => ({
              ...f,
              id: f.userPk,
              index: JSON.stringify(f.msgPk),
            }));
            setPage(page + 1);
            setMessages((old) => [...old, ...temp]); //index가 작은수록 최신 메시지
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
        stompClient.current.send(
          `/battle/${props.route.params.baPk}`,
          {},
          JSON.stringify({}),
        );
      },
      function (message) {
        // check message for disconnect
        console.log('disconnect socket:::::::');
        stompClient.current.disconnect();
        setTimeout(socketConn, 3000);
      },
      // (fail) => {
      //   alert(fail);
      // },
    );
  };

  React.useEffect(() => {
    get();
    coinCheck();
    socketConn();
    console.log('인덱스 값 ::: ' + index);
    return () => {
      AsyncStorage.setItem('baPk', '0');
      console.log('delete baPk');
      stompClient.current && stompClient.current.disconnect();
    };
  }, []);

  React.useEffect(() => {
    console.log('baPk : ' + baPk);
    console.log('props baPk : ' + props.route.params.baPk);
    if (baPk !== props.route.params.baPk) {
      setLoading(true);
      stompClient.current && stompClient.current.disconnect();
      get();
      coinCheck();
      socketConn();
      setBaPk(props.route.params.baPk);
      setTimeout(() => {
        setLoading(false);
      }, 200);
    } else {
      console.log('samsam');
    }
  }, [props.route.params.baPk, baPk]);

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
                } else {
                  setShowMatchMember(true);
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
  return loading === true ? (
    <Loader />
  ) : (
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
            uri={
              showMatchMember
                ? require('../../../assets/img/icon-fold.png')
                : require('../../../assets/img/icon-fold-down.png')
            }
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
          gameResult={props.route.params.gameResult}
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
