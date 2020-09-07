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
import {screenWidth} from '../../styles';
import Axios from 'axios';
import { logApi } from '../../react-native-nuno-ui/funcs';

export default function Event(props) {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [events, setEvents] = React.useState([]);
  React.useEffect(() => {
    Axios.get('event')
      .then((res) => {
        logApi('event', res.data);
        setEvents(res.data);
      })
      .catch((err) => {
        logApi('event error', err.response);
      });
  }, []);
  const showDetail = () => {
    setModalVisible(true);
  };
  const renderItem = ({item, index}) => {
    return (
      <View
        style={{
          padding: 20,
        }}>
        <Image
          height={Math.floor((screenWidth - 40) * 0.4)}
          width={Math.floor(screenWidth - 40)}
          borderRadius={10}
          uri={item.evImgUrl}
          onPress={() => props.navigation.navigate('EventView', {item: item})}
          resizeMode={'cover'}
        />
        <Seperator height={20} />
        <Text text={item.evName} fontWeight={'bold'} fontSize={18} />
        <Seperator height={10} />
        <Text
          text={`기간: ${item.startDate} ~ ${item.endDate}`}
          color={'gray'}
          fontSize={14}
        />
      </View>
    );
  };
  return (
    <Container>
      <Header left={'close'} title={'이벤트'} navigation={props.navigation} />
      <FlatList
        data={events}
        keyExtractor={(item) => JSON.stringify(item.evPk)}
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
