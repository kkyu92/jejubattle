import React from 'react';
import {
  Container,
  Header,
  Text,
  Image,
  HView,
  Seperator,
  Modal,
  Button,
} from '../../react-native-nuno-ui';
import {View, ScrollView, FlatList, TouchableOpacity} from 'react-native';
import Icons from '../../commons/Icons';
import {AppContext} from '../../context';
import Axios from 'axios';
import {logApi, showToast} from '../../react-native-nuno-ui/funcs';
import { custom } from '../../config';

export default function Notification(props) {
  const context = React.useContext(AppContext);
  const [deleteAllModal, setDeleteAllModal] = React.useState(false)
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

  const deleteAll = () => {
    Axios.delete('deleteNotification', {})
      .then(res => {
        logApi('deleteNotification [success]')
      })
      .catch(err => {
        logApi('deleteNotification [error]')
      })
      setNotification([])
  }

  React.useEffect(() => {
    getNoti(page);
    notiRead();
  }, []);

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          item.fmCode === 1 // 어드민
            ? showToast(item.message, 2000, 'center')
            : item.fmCode === 2 // 보관함
            ? props.navigation.navigate('Archive', {})
            : item.fmCode === 3 && item.inValid === 'Y' // 배틀
            ? props.navigation.navigate('BattleView', {
                baPk: item.baPk,
              })
            : item.fmCode === 3 && item.inValid === 'N'
            ? showToast('배틀방이 존재하지 않습니다.', 2000, 'center')
            : item.fmCode === 4 // 강퇴
            ? // ? props.navigation.navigate('Battle', {})
              showToast(item.message, 2000, 'center')
            : item.fmCode === 5 // 신고
            ? showToast(item.message, 2000, 'center')
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
      <Header left={'close'} navigation={props.navigation} title={'알림'} rightComponent={
          <TouchableOpacity
            onPress={() => setDeleteAllModal(true)}
            style={{
              paddingHorizontal: 20,
              paddingVertical: 5,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text text={'전체삭제'} color={custom.themeColor} fontSize={17} />
          </TouchableOpacity>
        }
      />
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
     
      {/* 알림 전체삭제 */}
      <Modal
        isVisible={deleteAllModal}
        onBackdropPress={() => setDeleteAllModal(false)}>
        <View
          style={{
            padding: 20,
            backgroundColor: 'white',
            borderRadius: 10,
            alignItems: 'center',
          }}>
          <View style={{padding: 20}}>
            <View style={{alignItems: 'center'}}>
              <Text text={'알림 전체삭제'} fontWeight={'bold'} fontSize={18} />
            </View>
          </View>
          <Seperator height={10} />
          <Text
            fontSize={16}
            color={'dimgray'}
            text={'전체 알림을 삭제하시겠습니까?'}
            style={{textAlign: 'center'}}
          />
          <Seperator height={30} />
          <HView>
            <View style={{flex: 1}}>
              <Button
                text={'취소'}
                color={'gray'}
                onPress={() => {
                  setDeleteAllModal(false);
                }}
                size={'large'}
                stretch
              />
            </View>
            <Seperator width={20} />
            <View style={{flex: 1}}>
              <Button
                text={'삭제'}
                color={custom.themeColor}
                onPress={async () => {
                  deleteAll(),
                  setDeleteAllModal(false)
                }}
                size={'large'}
                stretch
              />
            </View>
          </HView>
        </View>
      </Modal>
    </Container>
  );
}
