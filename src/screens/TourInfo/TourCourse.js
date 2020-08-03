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
import {logApi} from 'react-native-nuno-ui/funcs';
import {AppContext} from '../../context';
import {useIsFocused} from '@react-navigation/native';

export default function TourCourse(props) {
  const context = React.useContext(AppContext);
  const [travel, setTravel] = React.useState([]);
  const [orderType, setOrderType] = React.useState(0);
  const isFocused = useIsFocused();

  React.useEffect(() => {
    isFocused &&
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
  }, [isFocused]);
  const renderItem = ({item, index}) => {
    return (
      <ListItem
        onPress={() =>
          props.navigation.navigate('TourCourseView', {faPk: item.faPk})
        }
        item={item}
        index={index}
        scrapOn={scrapOn}
        scrapOff={scrapOff}
      />
    );
  };
  const scrapOn = (item, index) => {
    Axios.post('scrapOn', {
      faPk: item.faPk,
      userPk: context.me.userPk,
    })
      .then((res) => {
        logApi('scrapOn', res.data);
        const temp = [...travel];
        temp[index].faScrapType = temp[index].faScrapType === 'Y' ? 'N' : 'Y';
        setTravel(temp);
      })
      .catch((err) => {
        logApi('scrapOn error', err.response);
      });
  };
  const scrapOff = (item, index) => {
    Axios.post('scrapOff', {
      faPk: item.faPk,
      userPk: context.me.userPk,
    })
      .then((res) => {
        logApi('scrapOff', res.data);
        const temp = [...travel];
        temp[index].faScrapType = temp[index].faScrapType === 'Y' ? 'N' : 'Y';
        setTravel(temp);
      })
      .catch((err) => {
        logApi('scrapOff error', err.response);
      });
  };
  return (
    <Container>
      <Header left={'close'} title={'추천코스'} navigation={props.navigation} />
      <Seperator height={20} />
      <FlatList
        data={travel}
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
