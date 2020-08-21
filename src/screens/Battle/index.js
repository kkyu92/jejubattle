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
} from 'react-native-nuno-ui';
import {TouchableOpacity, View, FlatList, Platform} from 'react-native';
import Icons from '../../commons/Icons';
import {custom} from '../../config';
import {ShadowStyle, screenWidth} from '../../styles';
import ListItemBattle from '../../commons/ListItemBattle';
import FloatingButton from '../../commons/FloatingButton';
import Axios from 'axios';
import {logApi} from 'react-native-nuno-ui/funcs';
import {AppContext} from '../../context';
import {sports1Table} from '../../constants';

export default function Battle(props) {
  const context = React.useContext(AppContext);
  const [filterVisible, setFilterVisible] = React.useState(false);
  const [enteranceAlert, setEnteranceAlert] = React.useState(false);
  const [showMyBattle, setShowMyBattle] = React.useState(true);
  const [battles, setBattles] = React.useState([]);
  const [mybattles, setMybattles] = React.useState([]);
  const [list, setList] = React.useState([]);
  const [sports, setSports] = React.useState([]);
  const [selectedSports, setSelectedSports] = React.useState(
    context.me.userSport || [],
  );
  const [stickyHeaderIndices, setStickyHeaderIndices] = React.useState([]);
  const [pullToRefresh, setPullToRefresh] = React.useState(true);

  React.useEffect(() => {
    pullToRefresh && get();
  }, [pullToRefresh]);
  React.useEffect(() => {
    Axios.post('sportsList', {})
      .then((res) => {
        logApi('sportsList', res.data);
        let temp = [...res.data.gojiList];
        temp = temp.map((e, i) => {
          return {...e, icon: sports1Table[i].icon};
        });
        setSports(temp);
      })
      .catch((err) => {
        logApi('sportsList error', err.response);
      });
  }, []);
  const get = () => {
    Axios.get('battle')
      .then((res) => {
        logApi('battle', res.data);
        setMybattles(res.data.myBattle);
        setBattles(res.data.battle);
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
          stickyIndices.push(tempList.length);
          tempList.push({baPk: 2000000000, title: '배틀 목록'});
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
  const handleSports = (e) => {
    const temp = [...selectedSports];
    const found = temp.map((t) => t.code).indexOf(e.code);
    if (found === -1) {
      temp.push(e);
    } else {
      temp.splice(found, 1);
    }
    setSelectedSports(temp);
  };
  const updateBattle = async (data) => {
    await Axios.post('updateBattle', data)
      .then((res) => {
        logApi('updateBattle', res.data);
      })
      .catch((err) => {
        logApi('updateBattle error', err.response);
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
                <Text text={'접기'} fontWeight={'500'} fontSize={14} />
                <Seperator width={10} />
                {showMyBattle ? (
                  <Image
                    local
                    uri={require('../../../assets/img/icon-fold.png')}
                    height={27}
                    width={27}
                    resizeMode={'cover'}
                  />
                ) : (
                  <Image
                    local
                    uri={require('../../../assets/img/icon-fold.png')}
                    height={27}
                    width={27}
                    resizeMode={'cover'}
                  />
                )}
              </HView>
            </TouchableOpacity>
          )}
        </HView>
      );
    } else {
      if (item.foldable && !showMyBattle) {
        return null;
      } else {
        return (
          <ListItemBattle
            onPress={async () => {
              // 내가 이미 방에 참여중인지 확인
              if (
                item.teamA.member.filter((e) => e.userPk === context.me.userPk)
                  .length === 0 &&
                item.teamB.member.filter((e) => e.userPk === context.me.userPk)
                  .length === 0
              ) {
                // 참여하지 않는다면
                // 방이 만원인지 확인
                if (
                  item.teamA.member.length >=
                    JSON.parse(item.btName.split(' ')[0]) &&
                  item.teamB.member.length >=
                    JSON.parse(item.btName.split(' ')[0])
                ) {
                  setEnteranceAlert(true);
                } else {
                  // 만원이 아니면
                  // 방에 몇명이 찼는지 확인하고 적절한 방으로 들어감
                  if (item.teamA.member.length >= item.teamB.member.length) {
                    const team = {...item.teamB};
                    team.member.push({
                      userPk: context.me.userPk,
                      ready: 'N',
                      regdate: new Date(),
                    });
                    await updateBattle({baPk: item.baPk, teamB: team});
                  } else {
                    const team = {...item.teamA};
                    team.member.push({
                      userPk: context.me.userPk,
                      ready: 'N',
                      regdate: new Date(),
                    });
                    await updateBattle({baPk: item.baPk, teamA: team});
                  }
                  props.navigation.navigate('BattleView', {
                    baPk: item.baPk,
                    refresh: () => get(),
                  });
                }
              } else {
                // 이미 배틀방에 참여하고 있다면
                props.navigation.navigate('BattleView', {
                  baPk: item.baPk,
                  refresh: () => get(),
                });
              }
            }}
            item={item}
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
            onPress={() => props.navigation.navigate('BattleFilter')}
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
      <FloatingButton
        onPress={() =>
          props.navigation.navigate('BattleEdit', {refresh: () => get()})
        }
      />
      <Modal
        isVisible={enteranceAlert}
        onBackdropPress={() => setEnteranceAlert(false)}>
        <View style={{padding: 20, backgroundColor: 'white', borderRadius: 10}}>
          <View style={{padding: 20}}>
            <View style={{alignItems: 'center'}}>
              <Text
                text={'인원이 가득 찼습니다.'}
                fontWeight={'bold'}
                fontSize={18}
              />
            </View>
          </View>
          <Seperator height={40} />
          <Button
            text={'확인'}
            size={'large'}
            onPress={() => setEnteranceAlert(false)}
            stretch
            color={custom.themeColor}
          />
        </View>
      </Modal>
    </Container>
  );
}
