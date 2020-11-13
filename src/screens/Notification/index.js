import React from 'react';
import {
  Container,
  Header,
  Text,
  Image,
  HView,
  Seperator,
} from '../../react-native-nuno-ui';
import {View, ScrollView, FlatList, TouchableOpacity} from 'react-native';
import Icons from '../../commons/Icons';
import {AppContext} from '../../context';
import Axios from 'axios';
import {logApi} from '../../react-native-nuno-ui/funcs';

export default function Notification(props) {
  const context = React.useContext(AppContext);
  const [notification, setNotification] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [moredone, setMoredone] = React.useState(false);

  const getNoti = (page) => {
    Axios.post('notification', {pageNum: page})
      .then(async (res) => {
        let notiList = res.data;
        const list = notiList.map((item) => ({
          ...item,
        }));
        logApi('notification', res.data);
        setNotification((old) => [...old, ...list]);
        if (res.data.length === 10) {
          Axios.post('notification', {pageNum: page + 1}).then(async (res) => {
            if (res.data.length === 0) {
              setMoredone(true);
            }
          });
        } else {
          setMoredone(true);
        }
      })
      .catch((err) => {
        logApi('notification error', err.response);
      });
  };

  const notiRead = () => {
    Axios.post('updateNotification', {})
      .then(async (res) => {
        logApi('updateNotification', res.data);
      })
      .catch((err) => {
        logApi('updateNotification error', err.response);
      });

    context.dispatch({
      type: 'UPDATEME',
      data: {
        notification: 'Y',
      },
    });
  };

  React.useEffect(() => {
    getNoti(page);
  }, []);

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          item.fmCode === 1
            ? console.log('관리자 알림')
            : item.fmCode === 2
            ? props.navigation.navigate('Archive', {})
            : item.fmCode === 3
            ? props.navigation.navigate('BattleView', {
                baPk: item.baPk,
              })
            : item.fmCode === 4
            ? props.navigation.navigate('Battle', {})
            : item.fmCode === 5
            ? console.log('신고 알림')
            : null
        }>
        <HView
          style={
            item.fmRead === 'N'
              ? {
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  backgroundColor: 'rgba(244, 161, 0, 0.3)',
                }
              : {
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                }
          }>
          <Image
            height={52}
            width={52}
            borderRadius={4}
            uri={item.faImgUrl}
            onPress={() => null}
            resizeMode={'cover'}
          />
          <Seperator width={10} />
          <View style={{flex: 1}}>
            <Text fontWeight={'bold'} fontSize={14} text={item.message} />
            <Seperator height={5} />
            <Text color={'gray'} fontSize={12} text={item.agoTime} />
          </View>
        </HView>
        <Seperator marginTop={1} marginBottom={1} line />
      </TouchableOpacity>
    );
  };

  return (
    <Container flex={1}>
      <Header left={'close'} navigation={props.navigation} title={'알림'} />
      <Seperator marginTop={1} marginBottom={1} />
      <FlatList
        data={notification}
        keyExtractor={(item) => item.index}
        renderItem={renderItem}
        inverted={false}
        // ListEmptyComponent={<Empty />}
        // ListHeaderComponent={FlatListHeader()}
        // refreshing={pullToRefresh}
        // ListFooterComponent={moredone ? null : <View style={{paddingVertical: 10}}><Loader /></View>}
        onEndReached={() => {
          if (!moredone) {
            console.log('more endReched!');
            setPage(page + 1);
            getNoti(page + 1);
          } else {
            console.log('finish endReched!');
            notiRead();
          }
        }}
      />
      {/* <ScrollView>
        <View style={{padding: 20}}>
          <Text fontWeight={'bold'} fontSize={18} text={'06.03 (수)'} />
        </View>
         <HView
          style={{
            paddingHorizontal: 20,
            paddingVertical: 10,
            backgroundColor: 'rgba(244, 161, 0, 0.3)',
          }}>
          <Image
            height={52}
            width={52}
            borderRadius={4}
            uri={'https://homepages.cae.wisc.edu/~ece533/images/airplane.png'}
            onPress={() => null}
            resizeMode={'cover'}
          />
          <Seperator width={10} />
          <View style={{flex: 1}}>
            <Text
              fontWeight={'bold'}
              fontSize={14}
              text={
                '스포츠배틀방이름의 모든 인원이 배틀 준비가 되었습니다. 배틀을 시작하세요!'
              }
            />
            <Seperator height={5} />
            <Text color={'gray'} fontSize={12} text={'1시간 전'} />
          </View>
        </HView>
        <Seperator marginTop={10} marginBottom={10} line />
        <HView style={{paddingHorizontal: 20, paddingVertical: 10}}>
          <Image
            height={52}
            width={52}
            borderRadius={4}
            uri={'https://homepages.cae.wisc.edu/~ece533/images/airplane.png'}
            onPress={() => null}
            resizeMode={'cover'}
          />
          <Seperator width={10} />
          <View style={{flex: 1}}>
            <Text
              fontWeight={'bold'}
              fontSize={14}
              text={
                '스포츠배틀방이름의 모든 인원이 배틀 준비가 되었습니다. 배틀을 시작하세요!'
              }
            />
            <Seperator height={5} />
            <Text color={'gray'} fontSize={12} text={'1시간 전'} />
          </View>
        </HView>
      </ScrollView> */}
    </Container>
  );
}
