import React from 'react';
import {
  Container,
  Text,
  Header,
  Seperator,
  HView,
  Button,
  Image,
  Modal,
  Checkbox,
  TextInput,
  Nuno,
} from '../../react-native-nuno-ui';
import {TouchableOpacity, View, FlatList, Platform} from 'react-native';
import Icons from '../../commons/Icons';
import {custom} from '../../config';
import {ShadowStyle, screenWidth} from '../../styles';
import ListItemBattle from '../../commons/ListItemBattle';
import FloatingButton from '../../commons/FloatingButton';
import Axios from 'axios';
import {
  getCurrentLocation,
  logApi,
  showToast,
} from '../../react-native-nuno-ui/funcs';
import {AppContext} from '../../context';
import {sports1Table} from '../../constants';
import {useIsFocused} from '@react-navigation/native';
import Init from '../../commons/Init';

export default function Battle(props) {
  const context = React.useContext(AppContext);
  const [showMyBattle, setShowMyBattle] = React.useState(true);
  const [list, setList] = React.useState([]);
  const [stickyHeaderIndices, setStickyHeaderIndices] = React.useState([]);
  const [pullToRefresh, setPullToRefresh] = React.useState(true);
  const isFocused = useIsFocused();
  const [page, setPage] = React.useState(1);
  const [moredone, setMoredone] = React.useState(false);
  const flatListRef = React.useRef();
  const [makeBattle, setMakeBattle] = React.useState(false);

  const [bdCode, setBdCode] = React.useState(0);
  const [boCode, setBoCode] = React.useState(1);
  const [baCode, setBaCode] = React.useState(0);
  const [bmCode, setBmCode] = React.useState(0);
  const [blCode, setBlCode] = React.useState(0);
  const [bpCode, setBpCode] = React.useState(0);
  const [caCode, setCaCode] = React.useState([]);

  const [showPopupModal, setShowPopupModal] = React.useState(false);

  React.useEffect(() => {
    if (props.route.params || pullToRefresh) {
      if (props.route.params === undefined) {
        if (list.length === 0 || makeBattle || pullToRefresh) {
          get();
          setPage(1);
          setMoredone(false);
          flatListRef.current.scrollToOffset({animated: true, offset: 0});
        }
      } else {
        if (props.route.params.caCode === undefined) {
          setBdCode(0);
          setBoCode(1);
          setBaCode(0);
          setBmCode(0);
          setBlCode(0);
          setBpCode(0);
          setCaCode([]);
          get();
        } else {
          setBdCode(props.route.params.bdCode);
          setBoCode(props.route.params.boCode);
          setBaCode(props.route.params.baCode);
          setBmCode(props.route.params.bmCode);
          setBlCode(props.route.params.blCode);
          setBpCode(props.route.params.bpCode);
          setCaCode(props.route.params.caCode);
          get(
            props.route.params.bdCode,
            props.route.params.boCode,
            props.route.params.baCode,
            props.route.params.bmCode,
            props.route.params.blCode,
            props.route.params.bpCode,
            props.route.params.caCode,
          );
        }
        setPage(1);
        setMoredone(false);
        flatListRef.current.scrollToOffset({animated: true, offset: 0});
      }
      getCoin();
      setPullToRefresh(false);
      console.log('params : ' + JSON.stringify(props.route.params));

      console.log(
        'props.route.params.navigate: ' + props.route.params?.navigate,
      );
      if (props.route.params?.navigate === 'myBattle') {
        props.navigation.toggleDrawer();
        props.navigation.navigate('MyBattle');
      }
    }
  }, [pullToRefresh, props.route.params]);

  const addGet = (
    page,
    bdCode,
    boCode,
    baCode,
    bmCode,
    blCode,
    bpCode,
    caCode,
  ) => {
    Axios.post(
      'battle',
      boCode === 3
        ? {
            pageNum: page,
            bdCode,
            boCode,
            baCode,
            bmCode,
            blCode,
            bpCode,
            caCode,
            lat: global?.address?.coords?.latitude,
            lon: global?.address?.coords?.longitude,
          }
        : {
            pageNum: page,
            bdCode,
            boCode,
            baCode,
            bmCode,
            blCode,
            bpCode,
            caCode,
          },
    )
      .then(async (res) => {
        let battleList = res.data.battle;
        const list = battleList.map((item) => ({
          ...item,
        }));
        logApi('battle + add', res.data);
        setList((old) => [...old, ...list]);
        if (res.data.battle.length === 10) {
          Axios.post(
            'battle',
            boCode === 3
              ? {
                  pageNum: page + 1,
                  bdCode,
                  boCode,
                  baCode,
                  bmCode,
                  blCode,
                  bpCode,
                  caCode,
                  lat: global?.address?.coords?.latitude,
                  lon: global?.address?.coords?.longitude,
                }
              : {
                  pageNum: page + 1,
                  bdCode,
                  boCode,
                  baCode,
                  bmCode,
                  blCode,
                  bpCode,
                  caCode,
                },
          ).then(async (res) => {
            if (res.data.battle.length === 0) {
              setMoredone(true);
            }
          });
        } else {
          setMoredone(true);
        }
      })
      .catch((err) => {
        console.log('battle + add error', err);
      });
  };

  const get = (bdCode, boCode, baCode, bmCode, blCode, bpCode, caCode) => {
    if (caCode !== undefined) {
      if (caCode.length === 0) {
        console.log('length : 0');
        console.log(`latitude : ${global?.address?.coords?.latitude}`);
        console.log(`longitude : ${global?.address?.coords?.longitude}`);
      } else {
        console.log('length : ' + caCode.length);
      }
    }
    Axios.post(
      'battle',
      boCode === 3
        ? {
            bdCode,
            boCode,
            baCode,
            bmCode,
            blCode,
            bpCode,
            caCode,
            lat: global?.address?.coords?.latitude,
            lon: global?.address?.coords?.longitude,
          }
        : {bdCode, boCode, baCode, bmCode, blCode, bpCode, caCode},
    )
      .then((res) => {
        logApi('battle', res.data);
        // setMybattles(res.data.myBattle);
        // setBattles(res.data.battle);
        let tempList = [];
        let stickyIndices = [];
        if (res.data.myBattle.length > 0) {
          stickyIndices.push(0);
          tempList.push({
            baPk: 1000000000,
            title: '내가 만든 배틀',
            foldable: true,
          });
          tempList = tempList.concat(
            res.data.myBattle.map((e) => ({...e, foldable: true})),
          );
        }
        if (res.data.battle.length > 0) {
          if (tempList.length > 0) {
            tempList.push({baPk: 2000000000, seperator: true});
          }
          stickyIndices.push(tempList.length);
          tempList.push({baPk: 3000000000, title: '배틀 목록'});
          tempList = tempList.concat(res.data.battle);
        }
        setList(tempList);
        setStickyHeaderIndices(stickyIndices);
        setPullToRefresh(false);
      })
      .catch((err) => {
        logApi('battle error', err.response);
        setPullToRefresh(false);
      });
  };
  const getCoin = () => {
    Axios.get(`getPay`)
      .then((res) => {
        logApi('getPay', res.data);
        context.dispatch({
          type: 'UPDATEME',
          data: {
            userCoin: res.data.userCoin,
            userPoint: res.data.userPoint,
          },
        });
      })
      .catch((err) => {
        // logApi('getPay error', err.response);
      });
  };
  const renderItem = ({item, index}) => {
    if (item.title) {
      return (
        <HView
          style={{
            padding: 20,
            justifyContent: 'space-between',
            backgroundColor: 'white',
          }}>
          <Text text={item.title} fontWeight={'bold'} fontSize={18} />
          {item.foldable && (
            <TouchableOpacity onPress={() => setShowMyBattle(!showMyBattle)}>
              <HView>
                <Text
                  text={showMyBattle ? '접기' : '펼치기'}
                  fontWeight={'500'}
                  fontSize={14}
                />
                <Seperator width={10} />
                <Image
                  local
                  uri={
                    showMyBattle
                      ? require('../../../assets/img/icon-fold.png')
                      : require('../../../assets/img/icon-fold-down.png')
                  }
                  height={27}
                  width={27}
                  resizeMode={'cover'}
                />
              </HView>
            </TouchableOpacity>
          )}
        </HView>
      );
    } else if (item.seperator) {
      return (
        <View
          style={{
            marginTop: 20,
            borderTopWidth: 1,
            borderTopColor: 'lightgray',
          }}>
          <Seperator height={10} color={'orange'} />
        </View>
      );
    } else {
      if (item.foldable && !showMyBattle) {
        return null;
      } else {
        return (
          <ListItemBattle
            item={item}
            navigation={props.navigation}
            // refresh={() => get()}
          />
        );
      }
    }
  };
  return (
    <Container>
      <Header
        leftComponent={
          <View style={{paddingHorizontal: 20, paddingVertical: 5}}>
            <Image
              local
              uri={require('../../../assets/img/icon-hamburger.png')}
              height={20}
              width={20}
              resizeMode={'cover'}
              onPress={() => props.navigation.toggleDrawer()}
            />
          </View>
        }
        centerComponent={
          <TouchableOpacity
            onPress={() => setShowPopupModal(true)}
            style={{
              marginStart: 25,
              paddingHorizontal: 20,
              paddingVertical: 5,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              fontSize={18}
              fontWeight={Nuno.config.headerTitleWeight || '500'}
              color={Nuno.config.textColor || 'dimgray'}
              text={'스포츠배틀'}
            />
            <Seperator width={5} />
            <Image
              local
              uri={require('../../../assets/img/icon_quesmark.png')}
              height={20}
              width={20}
            />
          </TouchableOpacity>
        }
        navigation={props.navigation}
        rightComponent={
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('BattleFilter', {
                bdCode,
                boCode,
                baCode,
                bmCode,
                blCode,
                bpCode,
                caCode,
              })
            }
            style={{
              paddingHorizontal: 20,
              paddingVertical: 5,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Icons name="icon-filter-13" size={13} color={custom.themeColor} />
            <Seperator width={5} />
            <Text text={'필터'} color={custom.themeColor} fontSize={17} />
          </TouchableOpacity>
        }
      />
      {/* <Seperator height={20} /> */}
      <FlatList
        ref={flatListRef}
        data={list}
        keyExtractor={(item) => JSON.stringify(item.baPk)}
        renderItem={renderItem}
        stickyHeaderIndices={
          Platform.OS === 'ios' ? stickyHeaderIndices : undefined
        }
        // ListEmptyComponent={<Empty />}
        // ListHeaderComponent={FlatListHeader()}
        refreshing={pullToRefresh}
        onRefresh={() => {
          // setIsLast(false);
          setPullToRefresh(true);
        }}
        onEndReached={() => {
          if (!moredone) {
            console.log('more endReched!');
            setPage(page + 1);
            addGet(
              page + 1,
              bdCode,
              boCode,
              baCode,
              bmCode,
              blCode,
              bpCode,
              caCode,
            );
          } else {
            console.log('finish endReched!');
          }
        }}
      />
      <FloatingButton
        onPress={() => {
          setMakeBattle(true);
          props.navigation.navigate('BattleEdit');
        }}
      />

      <Modal
        isVisible={showPopupModal}
        onBackdropPress={() => setShowPopupModal(false)}>
        <View
          style={{
            padding: 10,
            backgroundColor: 'white',
            borderRadius: 10,
            // alignItems: 'center',
          }}>
          <View>
            <Image
              local
              uri={require('../../../assets/img/info_sports_battle.png')}
              height={350}
              width={'100%'}
              resizeMode={'contain'}
            />
          </View>
          <View>
            <Button
              text={'닫기'}
              color={custom.themeColor}
              onPress={() => {
                setShowPopupModal(false);
              }}
              size={'middle'}
              stretch
            />
          </View>
        </View>
      </Modal>
    </Container>
  );
}
