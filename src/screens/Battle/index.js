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
import {TouchableOpacity, View, FlatList} from 'react-native';
import Icons from '../../commons/Icons';
import {custom} from '../../config';
import {ShadowStyle, screenWidth} from '../../styles';
import ListItemBattle from '../../commons/ListItemBattle';
import FloatingButton from '../../commons/FloatingButton';
import Axios from 'axios';
import { logApi } from 'react-native-nuno-ui/funcs';

export default function Battle(props) {
  const [filterVisible, setFilterVisible] = React.useState(false);
  const [showMyBattle, setShowMyBattle] = React.useState(true);
  const data = [
    {id: 'e', title: '내가 만든 배틀', foldable: true},
    {id: '0', status: 'waiting', level: '중수', foldable: true},
    {id: '1', status: 'playing', level: '고수', foldable: true},
    {id: 'e', title: '배틀 목록'},
    {id: '2', status: 'done', level: '프로', win: true},
    {id: '3', status: 'waiting', level: '프로', win: false},
    {id: '4', status: 'waiting', level: '프로', win: true},
    {id: '5', status: 'waiting', level: '프로', win: true},
    {id: '6', status: 'waiting', level: '프로', win: true},
    {id: 's', status: 'waiting', level: '프로', win: true},
  ];
  React.useEffect(() => {
    Axios.get('battle')
      .then((res) => {
        logApi('battle', res.data);
      })
      .catch((err) => {
        logApi('battle error', err.response);
      });
  }, []);
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
            onPress={() => props.navigation.navigate('BattleView')}
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
            onPress={() => setFilterVisible(true)}
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
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        stickyHeaderIndices={[0, 3]}
        // ListEmptyComponent={<Empty />}
        // ListHeaderComponent={FlatListHeader()}
        // refreshing={pullToRefresh}
        // onRefresh={() => {
        //   setIsLast(false);
        //   setPullToRefresh(true);
        // }}
      />
      <FloatingButton onPress={() => props.navigation.navigate('BattleEdit')} />
      <Modal
        isVisible={filterVisible}
        onBackdropPress={() => setFilterVisible(false)}>
        <View style={{padding: 20, backgroundColor: 'white', borderRadius: 10}}>
          <View style={{padding: 20}}>
            <View style={{alignItems: 'center'}}>
              <Text text={'필터'} fontWeight={'bold'} fontSize={18} />
            </View>
            <Seperator height={20} />
            <HView style={{flexWrap: 'wrap', justifyContent: 'space-between'}}>
              <View style={{paddingVertical: 10}}>
                <Checkbox label={'등록순'} checked={true} />
              </View>
              <View style={{paddingVertical: 10}}>
                <Checkbox label={'추천순'} checked={false} />
              </View>
              <View style={{paddingVertical: 10}}>
                <Checkbox label={'내 위치순'} checked={false} />
              </View>
              <View style={{paddingVertical: 10}}>
                <Checkbox label={'평점순'} checked={false} />
              </View>
            </HView>
          </View>
          <HView style={{padding: 10}}>
            <View style={{flex: 1}}>
              <Button
                text={'취소'}
                onPress={() => setFilterVisible(false)}
                color={'gray'}
                stretch
              />
            </View>
            <Seperator width={10} />
            <View style={{flex: 1}}>
              <Button
                text={'적용하기'}
                onPress={() => null}
                color={custom.themeColor}
                stretch
                disable={false}
              />
            </View>
          </HView>
        </View>
      </Modal>
    </Container>
  );
}
