import React from 'react';
import {
  Container,
  Header,
  Text,
  Image,
  HView,
  Seperator,
  TextInput,
  Button,
} from '../../react-native-nuno-ui';
import {View, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import Icons from '../../commons/Icons';
import {custom} from '../../config';
import ListItem from '../../commons/ListItem';

export default function PurchaseHistory(props) {
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
  const renderItem = () => {
    return (
      <View style={{paddingHorizontal: 20}}>
        <TouchableOpacity
          style={{
            paddingVertical: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => null}>
          <Image
            local
            uri={require('../../../assets/img/icon-coinmoney.png')}
            height={40}
            width={40}
            resizeMode={'cover'}
          />
          <Seperator width={10} />
          <View style={{flex: 1}}>
            <HView>
              <Text text={'코인 1개'} fontSize={14} fontWeight={'bold'} />
              <Seperator width={20} />
              <Button size={'small'} text={'구매'} textColor={'#FE8A3D'} borderColor={'#FE8A3D'} />
            </HView>
            <Seperator height={5} />
            <Text
              text={'2020-06-24 21;44 사용하지않음'}
              fontSize={12}
              color={'gray'}
            />
          </View>
          <Button size={'medium'} text={'청약철회'} color={'white'} onPress={() => null} borderRadius={20}/>
        </TouchableOpacity>
        <Seperator line />
      </View>
    );
  };
  return (
    <Container>
      <Header left={'close'} title={'구매내역'} navigation={props.navigation} />
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
    </Container>
  );
}
