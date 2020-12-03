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
import {logApi} from '../../react-native-nuno-ui/funcs';

export default function Event(props) {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [events, setEvents] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [moredone, setMoredone] = React.useState(false);
  const evRef = React.useRef();

  React.useEffect(() => {
    getEvent(1);
  }, []);
  const getEvent = (page) => {
    Axios.post('event', {pageNum: page})
      .then((res) => {
        let eventList = res.data;
        const list = eventList.map((item) => ({
          ...item,
        }));
        logApi('event', res.data);
        setEvents((old) => [...old, ...list]);
        if (res.data.length === 10) {
          Axios.post('event', {pageNum: page + 1}).then(async (res) => {
            if (res.data.length === 0) {
              setMoredone(true);
            }
          });
        } else {
          setMoredone(true);
        }
      })
      .catch((err) => {
        logApi('event error', err.response);
      });
  };
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
        <HView
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 20,
            paddingEnd: 10,
          }}>
          <View>
            <Text text={item.evName} fontWeight={'bold'} fontSize={18} />
            <Seperator height={10} />
            <Text
              text={`기간: ${item.startDate} ~ ${item.endDate}`}
              color={'gray'}
              fontSize={14}
            />
          </View>
          <HView>
            <Icons name="icon-like-12" size={16} color={'black'} />
            <Seperator width={10} />
            <Text text={item.evLikeCnt} fontSize={16} />
          </HView>
        </HView>
      </View>
    );
  };
  return (
    <Container>
      <Header left={'close'} title={'이벤트'} navigation={props.navigation} />
      <FlatList
        ref={evRef}
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
        onEndReached={() => {
          if (!moredone) {
            console.log('more endReched!');
            setPage(page + 1);
            getEvent(page + 1);
          } else {
            console.log('finish endReched!');
          }
        }}
      />
    </Container>
  );
}
