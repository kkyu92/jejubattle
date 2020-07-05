import React from 'react';
import {
  Container,
  Header,
  Text,
  Image,
  HView,
  Seperator,
  TextInput,
} from 'react-native-nuno-ui';
import {View, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import Icons from '../../commons/Icons';
import {custom} from '../../config';
import ListItem from '../../commons/ListItem';

export default function Search(props) {
  const dataFacility = [{id: '0'}, {id: '1'}];
  const dataRecommand = [{id: '0'}, {id: '1'}];
  const renderFacility = () => {
    return <ListItem />;
  };
  const renderRecommand = () => {
    return <ListItem />;
  };
  return (
    <Container>
      <Header
        leftComponent={
          <View style={{paddingHorizontal: 20, paddingVertical: 5}}>
            <Icons name="icon-search-16" size={20} color={custom.themeColor} />
          </View>
        }
        right={'close'}
        centerComponent={
          <View style={{flex: 1}}>
            <TextInput
              value={''}
              onChangeText={() => null}
              borderWidth={0}
              placeholder={'검색하실 키워드를 입력해주세요.'}
              clearButtonMode={true}
            />
          </View>
        }
        navigation={props.navigation}
      />
      <HView>
        <View style={{padding: 20}}>
          <Text text={'최근 검색어'} color={'gray'} fontSize={13} />
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'whitesmoke',
              padding: 10,
              borderRadius: 4,
              marginRight: 10,
            }}
            onPress={() => null}>
            <Text text={'야구장'} color={'dimgray'} fontSize={14} />
            <Seperator width={8} />
            <Icons name={'icon-cancel-7'} size={7} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'whitesmoke',
              padding: 10,
              borderRadius: 4,
              marginRight: 10,
            }}
            onPress={() => null}>
            <Text text={'야구장'} color={'dimgray'} fontSize={14} />
            <Seperator width={8} />
            <Icons name={'icon-cancel-7'} size={7} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'whitesmoke',
              padding: 10,
              borderRadius: 4,
              marginRight: 10,
            }}
            onPress={() => null}>
            <Text text={'야구장'} color={'dimgray'} fontSize={14} />
            <Seperator width={8} />
            <Icons name={'icon-cancel-7'} size={7} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'whitesmoke',
              padding: 10,
              borderRadius: 4,
              marginRight: 10,
            }}
            onPress={() => null}>
            <Text text={'야구장'} color={'dimgray'} fontSize={14} />
            <Seperator width={8} />
            <Icons name={'icon-cancel-7'} size={7} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'whitesmoke',
              padding: 10,
              borderRadius: 4,
              marginRight: 10,
            }}
            onPress={() => null}>
            <Text text={'야구장'} color={'dimgray'} fontSize={14} />
            <Seperator width={8} />
            <Icons name={'icon-cancel-7'} size={7} />
          </TouchableOpacity>
        </ScrollView>
      </HView>
      <HView style={{padding: 20}}>
        <Text fontSize={16} fontWeight={'bold'} text={'운동시설'} />
        <Text fontSize={16} text={'에서의 검색결과'} />
        <Text fontSize={16} text={'(2)'} color={'gray'} />
      </HView>
      <FlatList
        data={dataFacility}
        keyExtractor={(item) => item.id}
        renderItem={renderFacility}
        // ListEmptyComponent={<Empty />}
        // ListHeaderComponent={FlatListHeader()}
        // refreshing={pullToRefresh}
        // onRefresh={() => {
        //   setIsLast(false);
        //   setPullToRefresh(true);
        // }}
      />
      <Seperator height={10} color={'whitesmoke'} />
      <HView style={{padding: 20}}>
        <Text fontSize={16} fontWeight={'bold'} text={'추천코스'} />
        <Text fontSize={16} text={'에서의 검색결과'} />
        <Text fontSize={16} text={'(2)'} color={'gray'} />
      </HView>
      <FlatList
        data={dataRecommand}
        keyExtractor={(item) => item.id}
        renderItem={renderRecommand}
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
