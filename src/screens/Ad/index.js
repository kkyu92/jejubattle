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

export default function Ad(props) {
  const context = React.useContext(AppContext);
  const [banner, setBanner] = React.useState({});
  const [bannerImgList, setBannerImgList] = React.useState([]);
  const [replyList, setReplyList] = React.useState([]);
  const [reply, setReply] = React.useState('');
  const [file, setFile] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  let adPk = props.route.params.adPk;

  React.useEffect(() => {
    if (String(props.route.params.adPk).includes('ad')) {
      adPk = String(props.route.params.adPk).substr(2);
    }
    console.log('get adPk: ' + props.route.params.adPk);
    get(adPk);
  }, []);

  const get = (adPk) => {
    Axios.get(`bannerInfo/${adPk}`)
      .then((res) => {
        logApi('bannerInfo', res.data);
        setBanner(res.data.banner);
        setBannerImgList(res.data.bannerImgList);
        setReplyList(res.data.replyList);
      })
      .catch((err) => {
        logApi('bannerInfo error', err);
      });
  };
  const delReview = (arPk) => {
    console.log('arPk : ' + arPk);
    Axios.delete(`advertReply/${arPk}`)
      .then((res) => {
        logApi('delete advertReply', res.data);
        get(adPk);
      })
      .catch((err) => {
        logApi('delete advertReply error', err.response);
      });
  };
  const likeOn = () => {
    Axios.post('advertLikeOn', {
      adPk: banner.adPk,
    })
      .then((res) => {
        logApi('advertLikeOn', res.data);
        get(adPk);
      })
      .catch((err) => {
        logApi('advertLikeOn error', err.response);
      });
  };
  const likeOff = () => {
    Axios.post('advertLikeOff', {
      adPk: banner.adPk,
    })
      .then((res) => {
        logApi('advertLikeOff', res.data);
        get(adPk);
      })
      .catch((err) => {
        logApi('advertLikeOff error', err.response);
      });
  };
  const save = async () => {
    setLoading(true);
    if (false) {
      const formData = new FormData();
      formData.append('adPk', banner.adPk);
      formData.append('arContent', reply);
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
      formData.append('adPk', banner.adPk);
      formData.append('arContent', reply);

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
        url: API_URL + 'advertReplyInsert',
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
          logApi('advertReplyInsert', res.data);
          setReply('');
          setFile('');
          get(adPk);
        })
        .catch((err) => {
          setLoading(false);
          logApi('advertReplyInsert error', err.response);
        });
    }
  };

  const FlatListHeader = () => {
    return (
      <View>
        <View>
          <ImageCarousel
            data={bannerImgList.map((e) => e.adImgUrl)}
            height={Math.floor(screenWidth * 0.7)}
            width={Math.floor(screenWidth)}
          />
        </View>

        <TouchableOpacity
          onPress={() => (banner.adLikeType === 'N' ? likeOn() : likeOff())}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 20,
            justifyContent: 'flex-end',
            paddingVertical: 10,
          }}>
          {banner.adLikeType === 'N' ? (
            <AntDesign name={'like2'} size={20} color={'gray'} />
          ) : (
            <AntDesign name={'like1'} size={20} color={custom.themeColor} />
          )}
          <Seperator width={5} />
          <Text text={banner.adLikeCnt} fontSize={14} color={'gray'} />
        </TouchableOpacity>

        <Seperator marginTop={20} line />
        <View style={{padding: 20}}>
          <HView>
            <Text text={'댓글'} fontSize={18} fontWeight={'bold'} />
            <Text
              text={`(${banner.adReplyCnt})`}
              fontSize={15}
              color={'gray'}
            />
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
            {item.arImgUrl && (
              <ImageCarousel
                data={[item.arImgUrl]}
                height={Math.floor(screenWidth - 110) * 0.6}
                width={Math.floor(screenWidth - 110)}
                borderRadius={5}
              />
            )}
            <Seperator height={5} />
            <Text text={item.arContent} fontSize={15} />
            <Seperator height={5} />
            <Text text={item.arDatetime} color={'gray'} fontSize={14} />
            <Seperator height={5} />
            {context.me.userPk === item.userPk && (
              <Button
                text={'삭제'}
                size={'medium'}
                color={'white'}
                onPress={() => delReview(item.arPk)}
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
        title={'메인광고'}
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
                  `https://jejubattle.com/event/ad${props.route.params.adPk}`,
                  '',
                  '',
                  bannerImgList[0].adImgUrl,
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
        keyExtractor={(item) => JSON.stringify(item.arPk)}
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
            onChangeText={(e) => {
              setReply(e), console.log(e);
            }}
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
