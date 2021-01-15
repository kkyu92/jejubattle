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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {custom} from '../../config';
import ListItem from '../../commons/ListItem';
import {screenWidth, screenHeight} from '../../styles';
import Axios from 'axios';
import {logApi} from '../../react-native-nuno-ui/funcs';

export default function Archive(props) {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [archive, setArchive] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [moredone, setMoredone] = React.useState(false);
  const [clickItem, setClickItem] = React.useState({});
  const showDetail = (item) => {
    setClickItem(item);
    setModalVisible(true);
  };
  const getArchive = () => {
    Axios.post('locker', {pageNum: 1})
      .then((res) => {
        logApi('getArchive', res.data);
        res.data.length < 9 ? setMoredone(true) : setPage(page + 1);
        setArchive(
          res.data.map((f) => ({
            ...f,
            id: f.loGoods,
          })),
        );
      })
      .catch((err) => {
        if (err.response.status === 403) {
          logApi('getArchive 403', err.response.data);
        } else {
          logApi('getArchive error', err.response);
        }
      });
  };
  const moreArchive = () => {
    Axios.post('locker', {pageNum: page}).then((res) => {
      logApi('moreArchive', res.data);
      res.data.length < 9 ? setMoredone(true) : setPage(page + 1);
      const temp = res.data.map((f) => ({
        ...f,
        id: f.loGoods,
      }));
      setArchive((old) => [...old, ...temp]); //index가 작은수록 최신 메시지
    });
  };
  const deleteArchive = (id) => {
    Axios.delete('locker/' + id)
      .then((res) => {
        logApi('deleteArchive', 'deleteItem : ' + id);
        getArchive();
      })
      .catch((err) => {
        logApi('deleteArchive error', err.response);
      });
  };

  React.useEffect(() => {
    getArchive();
  }, []);

  const renderItem = ({item, index}) => {
    return (
      <View
        style={{
          marginLeft: index % 3 === 0 ? 20 : 10,
          marginRight: index % 3 === 2 ? 20 : 10,
        }}>
        <TouchableOpacity
          onPress={() => showDetail(item)}
          style={{
            borderColor: 'lightgray',
            borderWidth: 1,
            borderRadius: 10,
            alignItems: 'center',
            padding: 10,
          }}>
          <Image
            height={Math.floor(((screenWidth - 140) / 3) * 0.9)}
            width={Math.floor((screenWidth - 140) / 3)}
            uri={item.loImgUrl}
            resizeMode={'cover'}
            borderRadius={10}
          />
          <View style={{position: 'absolute', top: 5, right: 5}}>
            {item.loUsed === 'N' ? (
              <Button
                text={'D-' + item.dday}
                color={item.dday <= 7 ? '#FE491B' : '#F4A100'}
                size={'small'}
              />
            ) : (
              <Button text={'사용완료'} color={'#CECCCD'} size={'small'} />
            )}
          </View>
        </TouchableOpacity>
        <View
          style={{
            padding: 10,
            // alignItems: 'center',
            width: Math.floor((screenWidth - 80) / 3),
            marginBottom: 20,
          }}>
          <Text
            text={item.loName}
            fontSize={13}
            fontWeight={'500'}
            color={'gray'}
          />
        </View>
      </View>
    );
  };
  return (
    <Container>
      <Header left={'close'} title={'보관함'} navigation={props.navigation} />
      <Seperator height={20} />
      <View style={{padding: 20}}>
        <Text text={'미사용 상품'} fontSize={18} fontWeight={'bold'} />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={archive}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={3}
        // ListEmptyComponent={<Empty />}
        // ListHeaderComponent={FlatListHeader()}
        // refreshing={pullToRefresh}
        // onRefresh={() => {
        //   setIsLast(false);
        //   setPullToRefresh(true);
        // }}
        onEndReached={() => {
          console.log('archive endReched!');
          if (!moredone) {
            moreArchive();
          }
        }}
      />
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 5,
            maxHeight: screenHeight - 100,
          }}>
          <ScrollView style={{padding: 10}} showsVerticalScrollIndicato={false}>
            {clickItem.loUsed === 'N' ? (
              <>
                <Image
                  height={230}
                  width={Math.floor(screenWidth - 110)}
                  borderRadius={8}
                  uri={clickItem.loImgUrl}
                  resizeMode={'cover'}
                />
                <View style={{padding: 10, alignItems: 'center'}}>
                  <Button size={'medium'} text={'사용가능'} color={'#F4A100'} />
                </View>
              </>
            ) : (
              <>
                <View
                  height={230}
                  width={Math.floor(screenWidth - 110)}
                  borderRadius={8}
                  backgroundColor={'#000000'}
                  style={{
                    opacity: 0.7,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <MaterialIcons name={'check'} color={'white'} size={50} />
                  <Text
                    text={'사용완료'}
                    color={'white'}
                    fontWeight={'bold'}
                    fontSize={18}
                    style={{marginTop: 17}}
                  />
                </View>
                <View style={{padding: 10, alignItems: 'center'}}>
                  <Button
                    size={'medium'}
                    text={'사용완료'}
                    fontSize={14}
                    color={'#CECCCD'}
                  />
                </View>
              </>
            )}

            <View style={{padding: 10, alignItems: 'center'}}>
              {/* <Text
                text={'상품코드 : ' + clickItem.loGoods}
                fontWeight={'bold'}
                fontSize={22}
              /> */}
              <Text text={clickItem.loName} color={'#4F4F4F'} fontSize={18} />
            </View>
            <View style={{paddingVertical: 10, alignItems: 'center'}}>
              <Text
                text={
                  '사용기한: ' + clickItem.startDate + ' ~ ' + clickItem.endDate
                }
                color={'#4F4F4F'}
                fontSize={15}
                style={{opacity: 0.5}}
              />
            </View>
            <View style={{paddingBottom: 30, alignItems: 'center'}}>
              <Text text={clickItem.loText} color={'#4F4F4F'} fontSize={16} />
            </View>
            <Seperator line />
            <View style={{alignSelf: 'center'}}>
              <Image
                height={Math.floor((screenWidth - 140) / 2)}
                width={Math.floor((screenWidth - 140) / 2)}
                uri={clickItem.loQrcode}
                // uri={clickItem.loImgUrl}
                resizeMode={'cover'}
                borderRadius={10}
              />
            </View>
          </ScrollView>
          {clickItem.loUsed === 'N' ? (
            <View style={{padding: 10}}>
              <Button
                text={'닫기'}
                onPress={() => setModalVisible(false)}
                color={custom.themeColor}
                stretch
              />
            </View>
          ) : (
            <View style={{padding: 10}}>
              <Button
                text={'삭제하기'}
                onPress={() => {
                  setModalVisible(false), deleteArchive(clickItem.loPk);
                }}
                color={custom.themeColor}
                stretch
              />
            </View>
          )}
        </View>
      </Modal>
    </Container>
  );
}
