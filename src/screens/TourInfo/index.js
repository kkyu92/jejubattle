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
  Checkbox,
  Modal,
} from 'react-native-nuno-ui';
import {View, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import Icons from '../../commons/Icons';
import {custom} from '../../config';
import ListItem from '../../commons/ListItem';
import Accordion from 'react-native-collapsible/Accordion';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { screenWidth } from '../../styles';

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

export default function TourInfo(props) {
  const FlatListHeader = () => {
    return (
      <View>
        <View style={{padding: 20}}>
          <Text text={'카테고리'} fontWeight={'bold'} fontSize={18} />
        </View>
        <HView>
          <TouchableOpacity style={{flex: 1, alignItems: 'center'}} onPress={() => props.navigation.navigate('TourCourse')}>
            <Text text={'추천코스'} fontSize={14} fontWeight={'500'} />
          </TouchableOpacity>
          <TouchableOpacity style={{flex: 1, alignItems: 'center'}} onPress={() => props.navigation.navigate('FoodStore')}>
            <Text text={'맛집'} fontSize={14} fontWeight={'500'} />
          </TouchableOpacity>
          <TouchableOpacity style={{flex: 1, alignItems: 'center'}} onPress={() => null}>
            <Text text={'관광지'} fontSize={14} fontWeight={'500'} />
          </TouchableOpacity>
          <TouchableOpacity style={{flex: 1, alignItems: 'center'}} onPress={() => null}>
            <Text text={'체험'} fontSize={14} fontWeight={'500'} />
          </TouchableOpacity>
        </HView>
        <View style={{padding: 20}}>
          <Text text={'제주에서 이런 곳은 어때요?'} fontWeight={'bold'} fontSize={18} />
        </View>
      </View>
    )
  };
  const renderItem = ({item, index}) => {
    return (
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}>
        <Image
          height={Math.floor((screenWidth - 40) * 0.4)}
          width={Math.floor(screenWidth - 40)}
          borderRadius={10}
          uri={'https://homepages.cae.wisc.edu/~ece533/images/airplane.png'}
          onPress={() => props.navigation.navigate('EventView')}
          resizeMode={'cover'}
        />
      </View>
    );
  };
  return (
    <Container>
      <Header left={'close'} title={'여행정보'} navigation={props.navigation} />
      <Seperator height={20} />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        // ListEmptyComponent={<Empty />}
        ListHeaderComponent={FlatListHeader()}
        // refreshing={pullToRefresh}
        // onRefresh={() => {
        //   setIsLast(false);
        //   setPullToRefresh(true);
        // }}
      />
    </Container>
  );
}
