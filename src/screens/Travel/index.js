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
} from '../../react-native-nuno-ui';
import {View, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import Icons from '../../commons/Icons';
import {custom} from '../../config';
import ListItem from '../../commons/ListItem';
import Accordion from 'react-native-collapsible/Accordion';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {screenWidth} from '../../styles';
import Axios from 'axios';
import {logApi} from '../../react-native-nuno-ui/funcs';

export default function Travel(props) {
  const [travel, setTravel] = React.useState([]);
  React.useEffect(() => {
    Axios.get('travel')
      .then((res) => {
        logApi('travel', res.data);
        setTravel(res.data);
      })
      .catch((err) => {
        logApi('travel error', err.response);
      });
  }, []);
  const FlatListHeader = () => {
    return (
      <View>
        <View style={{padding: 20}}>
          <Text text={'카테고리'} fontWeight={'bold'} fontSize={18} />
        </View>
        <HView style={{padding: 20}}>
          <TouchableOpacity
            style={{flex: 1, alignItems: 'center'}}
            onPress={() =>
              props.navigation.navigate('TravelList', {faCode: 1})
            }>
            <Image
              local
              uri={require('../../../assets/img/icon-bestcourse.png')}
              width={46}
              height={46}
            />
            <Seperator height={10} />
            <Text text={'추천코스'} fontSize={14} fontWeight={'500'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{flex: 1, alignItems: 'center'}}
            onPress={() =>
              props.navigation.navigate('TravelList', {faCode: 2})
            }>
            <Image
              local
              uri={require('../../../assets/img/icon-gourmet.png')}
              width={46}
              height={46}
            />
            <Seperator height={10} />
            <Text text={'맛집'} fontSize={14} fontWeight={'500'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{flex: 1, alignItems: 'center'}}
            onPress={() =>
              props.navigation.navigate('TravelList', {faCode: 3})
            }>
            <Image
              local
              uri={require('../../../assets/img/icon-sightseeing.png')}
              width={45}
              height={43}
            />
            <Seperator height={10} />
            <Text text={'관광지'} fontSize={14} fontWeight={'500'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{flex: 1, alignItems: 'center'}}
            onPress={() =>
              props.navigation.navigate('TravelList', {faCode: 4})
            }>
            <Image
              local
              uri={require('../../../assets/img/icon-leisure.png')}
              width={45}
              height={45}
            />
            <Seperator height={10} />
            <Text text={'체험'} fontSize={14} fontWeight={'500'} />
          </TouchableOpacity>
        </HView>
        <Seperator height={20} />
        <View style={{padding: 20}}>
          <Text
            text={'제주에서 이런 곳은 어때요?'}
            fontWeight={'bold'}
            fontSize={18}
          />
        </View>
      </View>
    );
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
          uri={item.faImgUrl}
          onPress={() =>
            props.navigation.navigate('TravelView', {faPk: item.faPk})
          }
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
        data={travel}
        keyExtractor={(item) => JSON.stringify(item.faPk)}
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
