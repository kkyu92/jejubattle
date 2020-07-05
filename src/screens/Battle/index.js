import React from 'react';
import {
  Container,
  Text,
  Header,
  Seperator,
  HView,
  Button,
  Image,
} from 'react-native-nuno-ui';
import {TouchableOpacity, View, FlatList} from 'react-native';
import Icons from '../../commons/Icons';
import {custom} from '../../config';
import {ShadowStyle, screenWidth} from '../../styles';
import ListItemBattle from '../../commons/ListItemBattle';
import FloatingButton from '../../commons/FloatingButton';

export default function Battle(props) {
  const [filterVisible, setFilterVisible] = React.useState(false);
  const data = [
    {id: '0'},
    {id: '1'},
    {id: '2'},
    {id: '3'},
    {id: '4'},
    {id: '5'},
    {id: '6'},
    {id: 's'},
  ];
  const renderItem = ({item, index}) => {
    return (
      <ListItemBattle onPress={() => props.navigation.navigate('BattleView')} />
    );
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
      <Seperator height={20} />
      <HView style={{padding: 20, justifyContent: 'space-between'}}>
        <Text text={'내가 만든 배틀'} fontWeight={'bold'} fontSize={18} />
        <HView>
          <Text text={'접기'} fontWeight={'500'} fontSize={14} />
          <Icons name={'icon-folding-27'} size={23} color={'dimgray'} />
        </HView>
      </HView>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        // ListEmptyComponent={<Empty />}
        // ListHeaderComponent={FlatListHeader()}
        // refreshing={pullToRefresh}
        // onRefresh={() => {
        //   setIsLast(false);
        //   setPullToRefresh(true);
        // }}
      />
      <FloatingButton onPress={() => props.navigation.navigate('BattleEdit')} />
    </Container>
  );
}
