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
} from '../../react-native-nuno-ui';
import {TouchableOpacity, View, FlatList, Platform} from 'react-native';
import Icons from '../../commons/Icons';
import {custom} from '../../config';
import {ShadowStyle, screenWidth} from '../../styles';
import ListItemBattle from '../../commons/ListItemBattle';
import FloatingButton from '../../commons/FloatingButton';
import Axios from 'axios';
import {logApi} from '../../react-native-nuno-ui/funcs';
import {AppContext} from '../../context';
import {sports1Table} from '../../constants';
import {useIsFocused} from '@react-navigation/native';

export default function Battle(props) {
  const context = React.useContext(AppContext);
  const [showMyBattle, setShowMyBattle] = React.useState(true);
  const [list, setList] = React.useState([]);
  const [stickyHeaderIndices, setStickyHeaderIndices] = React.useState([]);
  const [pullToRefresh, setPullToRefresh] = React.useState(true);
  const isFocused = useIsFocused();

  const [boCode, setBoCode] = React.useState(1);
  const [baCode, setBaCode] = React.useState(0);
  const [bmCode, setBmCode] = React.useState(0);
  const [blCode, setBlCode] = React.useState(0);
  const [bpCode, setBpCode] = React.useState(0);
  const [caCode, setCaCode] = React.useState([]);

  React.useEffect(() => {
    if (isFocused || pullToRefresh) {
      if (props.route.params === undefined) {
        get();
      } else {
        setBoCode(props.route.params.boCode);
        setBaCode(props.route.params.baCode);
        setBmCode(props.route.params.bmCode);
        setBlCode(props.route.params.blCode);
        setBpCode(props.route.params.bpCode);
        setCaCode(props.route.params.caCode);
        get(
          props.route.params.boCode,
          props.route.params.baCode,
          props.route.params.bmCode,
          props.route.params.blCode,
          props.route.params.bpCode,
          props.route.params.caCode,
        );
      }
      getCoin();
      console.log('params : ' + JSON.stringify(props.route.params));
    }
  }, [pullToRefresh, isFocused]);
  // React.useEffect(() => {
  //   Axios.post('sportsList', {})
  //     .then((res) => {
  //       logApi('sportsList', res.data);
  //       let temp = [...res.data.gojiList];
  //       temp = temp.map((e, i) => {
  //         return {...e, icon: sports1Table[i].icon};
  //       });
  //       setSports(temp);
  //     })
  //     .catch((err) => {
  //       logApi('sportsList error', err.response);
  //     });
  // }, []);
  const get = (boCode, baCode, bmCode, blCode, bpCode, caCode) => {
    if (caCode !== undefined) {
      if (caCode.length === 0) {
        console.log('length : 0');
      } else {
        console.log('length : ' + caCode.length);
      }
    }
    Axios.post(
      'battle',
      boCode === 3
        ? {
            boCode,
            baCode,
            bmCode,
            blCode,
            bpCode,
            caCode,
            lat: global.address.coords.latitude,
            lon: global.address.coords.longitude,
          }
        : {boCode, baCode, bmCode, blCode, bpCode, caCode},
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
  // const handleSports = (e) => {
  //   const temp = [...selectedSports];
  //   const found = temp.map((t) => t.code).indexOf(e.code);
  //   if (found === -1) {
  //     temp.push(e);
  //   } else {
  //     temp.splice(found, 1);
  //   }
  //   setSelectedSports(temp);
  // };
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
                  uri={require('../../../assets/img/icon-fold.png')}
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
          <Seperator height={10} color={'whitesmoke'} />
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
        title={'스포츠배틀'}
        navigation={props.navigation}
        rightComponent={
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('BattleFilter', {
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
      />
      <FloatingButton onPress={() => props.navigation.navigate('BattleEdit')} />
    </Container>
  );
}
