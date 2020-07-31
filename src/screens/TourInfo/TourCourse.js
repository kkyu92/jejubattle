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
import Axios from 'axios';
import { logApi } from 'react-native-nuno-ui/funcs';
import { AppContext } from '../../context';

export default function TourCourse(props) {
  const context = React.useContext(AppContext);
  const [travle, setTravel] = React.useState([]);
  const [orderType, setOrderType] = React.useState(0);

  React.useEffect(() => {
    Axios.post('travelList', {
      faCode: 1,
      orderType: orderType,
      lat: global.address.coords.latitude,
      lon: global.address.coords.longitude,
    })
      .then((res) => {
        logApi('travelList', res.data);
        setTravel(res.data.facility);
      })
      .catch((err) => {
        logApi('travelList error', err.response);
      });
  }, []);
  const renderItem = ({item, index}) => {
    return (
      <ListItem
        onPress={() =>
          props.navigation.navigate('TourCourseView', {faPk: item.faPk})
        }
        item={item}
      />
    );
  };
  return (
    <Container>
      <Header left={'close'} title={'추천코스'} navigation={props.navigation} />
      <Seperator height={20} />
      <FlatList
        data={travle}
        keyExtractor={(item) => JSON.stringify(item.faPk)}
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
