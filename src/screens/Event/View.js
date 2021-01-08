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
  ImageCarousel,
} from '../../react-native-nuno-ui';
import {
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Platform,
} from 'react-native';
import Icons from '../../commons/Icons';
import {custom, API_URL} from '../../config';
import ImageCropPicker from 'react-native-image-crop-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {screenWidth} from '../../styles';
import {share, logApi, showToast} from '../../react-native-nuno-ui/funcs';
import Axios from 'axios';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {AppContext} from '../../context';

export default function EventView(props) {
  const context = React.useContext(AppContext);
  const [event, setEvent] = React.useState({});
  const [eventImgList, setEventImgList] = React.useState([]);
  const [replyList, setReplyList] = React.useState([]);
  const [reply, setReply] = React.useState('');
  const [file, setFile] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    get();
  }, []);

  const get = () => {
    Axios.get(`eventInfo/${props.route.params.item.evPk}`)
      .then((res) => {
        logApi('eventInfo', res.data);
        setEvent(res.data.event);
        setEventImgList(res.data.eventImgList);
        setReplyList(res.data.replyList);
      })
      .catch((err) => {
        logApi('eventInfo error', err.response);
      });
  };
  const delReview = (rePk) => {
    Axios.delete(`eventReply/${rePk}`)
      .then((res) => {
        logApi('delete eventReply', res.data);
        get();
      })
      .catch((err) => {
        logApi('delete eventReply error', err.response);
      });
  };
  const likeOn = () => {
    Axios.post('eventLikeOn', {
      evPk: event.evPk,
    })
      .then((res) => {
        logApi('eventLikeOn', res.data);
        get();
      })
      .catch((err) => {
        logApi('eventLikeOn error', err.response);
      });
  };
  const likeOff = () => {
    Axios.post('eventLikeOff', {
      evPk: event.evPk,
    })
      .then((res) => {
        logApi('eventLikeOff', res.data);
        get();
      })
      .catch((err) => {
        logApi('eventLikeOff error', err.response);
      });
  };
  const save = async () => {
    setLoading(true);
    if (false) {
      const formData = new FormData();
      formData.append('erPk', event.erPk);
      formData.append('erContent', reply);
      if (file) {
        const response = await fetch(file);
        const blob = await response.blob();

        formData.append('file', {
          uri: file,
          name: blob.data.name,
          type: blob.data.type,
        });
      }
    } else {
      const formData = new FormData();
      formData.append('evPk', event.evPk);
      formData.append('erContent', reply);

      if (file) {
        const response = await fetch(file);
        const blob = await response.blob();

        formData.append('file', {
          uri: file,
          name: blob.data.name,
          type: blob.data.type,
        });
      }
      Axios({
        url: API_URL + 'eventReplyInsert',
        method: 'POST',
        data: formData,
        headers: {
          Accept: 'application/json',
          token: global.token,
          'Content-Type': 'multipart/form-data',
        },
      })
        .then((res) => {
          setLoading(false);
          logApi('eventReplyInsert', res.data);
          setReply('');
          setFile('');
          get();
        })
        .catch((err) => {
          setLoading(false);
          logApi('eventReplyInsert error', err.response);
        });
    }
  };

  const FlatListHeader = () => {
    return (
      <View>
        <ImageCarousel
          data={eventImgList.map((e) => e.evImgUrl)}
          height={Math.floor(screenWidth * 0.7)}
          width={Math.floor(screenWidth)}
        />

        <TouchableOpacity
          onPress={() => (event.evLikeType === 'N' ? likeOn() : likeOff())}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 20,
            justifyContent: 'flex-end',
            paddingVertical: 10,
          }}>
          {event.evLikeType === 'N' ? (
            <AntDesign name={'like2'} size={20} color={'gray'} />
          ) : (
            <AntDesign name={'like1'} size={20} color={custom.themeColor} />
          )}
          <Seperator width={5} />
          <Text text={event.evLikeCnt} fontSize={14} color={'gray'} />
        </TouchableOpacity>

        <Seperator marginTop={20} line />
        <View style={{padding: 20}}>
          <HView>
            <Text text={'댓글'} fontSize={18} fontWeight={'bold'} />
            <Text text={`(${event.evReplyCnt})`} fontSize={15} color={'gray'} />
          </HView>
        </View>
      </View>
    );
  };
  const renderItem = ({item, index}) => {
    return (
      <View>
        <HView
          style={{
            padding: 20,
            alignItems: 'flex-start',
          }}>
          <View style={{flex: 1}}>
            {item.erImgUrl && (
              <ImageCarousel
                data={[item.erImgUrl]}
                height={Math.floor(screenWidth - 110) * 0.6}
                width={Math.floor(screenWidth - 110)}
                borderRadius={5}
              />
            )}
            <Seperator height={5} />
            <Text text={item.erContent} fontSize={15} />
            <Seperator height={5} />
            <Text text={item.erDatetime} color={'gray'} fontSize={14} />
            <Seperator height={5} />
            {context.me.userPk === item.userPk && (
              <Button
                text={'삭제'}
                size={'medium'}
                color={'white'}
                onPress={() => delReview(item.erPk)}
              />
            )}
          </View>
          <Seperator width={20} />
          <View style={{alignItems: 'center'}}>
            {item.userImgUrl === '' ? (
              <Image
                local
                height={50}
                width={50}
                borderRadius={25}
                uri={require('../../../assets/img/img-user2.png')}
                onPress={() => null}
                resizeMode={'cover'}
              />
            ) : (
              <Image
                height={50}
                width={50}
                borderRadius={25}
                uri={item.userImgUrl}
                onPress={() => null}
                resizeMode={'cover'}
              />
            )}
            <Seperator height={5} />
            <Text
              text={item.userName}
              color={'gray'}
              fontSize={13}
              style={{width: 50, textAlign: 'center'}}
            />
          </View>
        </HView>
        <Seperator line />
      </View>
    );
  };
  const getPhoto = (index) => {
    ImageCropPicker.openPicker({
      width: 700,
      height: 700,
      mediaType: 'photo',
      smartAlbums: ['UserLibrary'],
      cropping: true,
      // multiple: true,
    })
      .then(async (res) => {
        console.log('ImagePicker openPicker', res);
        setFile(res.path);
        showToast('이미지선택완료', 2000, 'center');
        console.log(res);
      })
      .catch((err) => {
        console.log('ImagePicker openPicker error', err);
        showToast('이미지선택취소', 2000, 'center');
      });
  };

  return (
    <Container>
      <Header
        left={'close'}
        title={'이벤트'}
        navigation={props.navigation}
        rightComponent={
          <HView>
            {/* <TouchableOpacity
              onPress={() => null}
              style={{paddingHorizontal: 5, paddingVertical: 5}}>
              <Icons name={'icon-bookmark-20'} size={20} color={'black'} />
            </TouchableOpacity> */}
            <TouchableOpacity
              onPress={() =>
                share(
                  `https://jejubattle.com/event/${event.evPk}`,
                  props.route.params.item.evName,
                  '',
                  eventImgList[0].evImgUrl,
                  '',
                )
              }
              style={{paddingHorizontal: 20, paddingVertical: 5}}>
              <Icons name={'icon-share-20'} size={20} color={'black'} />
            </TouchableOpacity>
          </HView>
        }
      />

      <FlatList
        data={replyList}
        keyExtractor={(item) => JSON.stringify(item.erPk)}
        renderItem={renderItem}
        // ListEmptyComponent={<Empty />}
        ListHeaderComponent={FlatListHeader()}
        // ListFooterComponent={<Seperator bottom />}
        // refreshing={pullToRefresh}
        // onRefresh={() => {
        //   setIsLast(false);
        //   setPullToRefresh(true);
        // }}
      />
      {/* <View style={{position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'white'}}> */}
      <HView style={{paddingHorizontal: 20}}>
        {/* {file === '' ? (
          <TouchableOpacity onPress={() => getPhoto()}>
            <EvilIcons name={'paperclip'} size={24} color={'gray'} />
          </TouchableOpacity>
        ) : (

        )} */}
        <TouchableOpacity onPress={() => getPhoto()}>
          {file === '' ? (
            <EvilIcons name={'paperclip'} size={24} color={'gray'} />
          ) : (
            <View>
              <TouchableOpacity
                style={{zIndex: 1}}
                onPress={() => {
                  setFile('');
                  showToast('이미지를 선택 취소했습니다.', 2000, 'center');
                }}>
                <AntDesign
                  style={{alignSelf: 'center'}}
                  name={'closecircle'}
                  size={24}
                  color={'red'}
                />
                <Seperator height={5} />
              </TouchableOpacity>
              <Image width={50} height={50} uri={file} />
            </View>
          )}
        </TouchableOpacity>
        <View style={{flex: 1}}>
          <TextInput
            placeholder={'댓글입력'}
            value={reply}
            onChangeText={(e) => setReply(e)}
            borderWidth={0}
          />
        </View>
        <Button
          text={'완료'}
          size={'medium'}
          onPress={() =>
            reply !== ''
              ? save()
              : showToast('댓글을 입력해주세요.', 2000, 'center')
          }
          loading={loading}
          color={'gray'}
        />
      </HView>
      <Seperator bottom />
      {Platform.OS === 'ios' && (
        <KeyboardSpacer topSpacing={-getBottomSpace()} />
      )}
      {/* </View> */}
    </Container>
  );
}
