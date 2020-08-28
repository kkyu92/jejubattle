import React from 'react';
import {
  Container,
  Header,
  HView,
  Seperator,
  Text,
  TextInput,
  Button,
  Image,
} from 'react-native-nuno-ui';
import {TouchableOpacity, View, ScrollView} from 'react-native';
import Icons from '../../commons/Icons';
import StarRating from 'react-native-star-rating';
import {custom, API_URL} from '../../config';
import Axios from 'axios';
import {logApi} from 'react-native-nuno-ui/funcs';
import ImageCropPicker from 'react-native-image-crop-picker';
import {screenWidth} from '../../styles';
import {AppContext} from '../../context';

export default function ReviewEdit(props) {
  const context = React.useContext(AppContext);
  const [reScope, setReScope] = React.useState(props.route.params.reScope || 0);
  const [reContent, setReContent] = React.useState(
    props.route.params.reContent || '',
  );
  const [file, setFile] = React.useState(props.route.params.file || '');
  const [loading, setLoading] = React.useState(false);

  const save = async () => {
    setLoading(true);
    if (props.route.params.rePk) {
      const formData = new FormData();
      formData.append('rePk', props.route.params.rePk);
      formData.append('reContent', reContent);
      formData.append('reScope', reScope);
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
        url: API_URL + 'replyUpdate',
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
          logApi('replyUpdate', res.data);
          props.route.params?.refresh();
          props.navigation.goBack();
        })
        .catch((err) => {
          setLoading(false);
          logApi('replyUpdate error', err.response);
        });
    } else {
      const formData = new FormData();
      formData.append('faPk', props.route.params.faPk);
      formData.append('userKey', context.me.userPk);
      formData.append('reContent', reContent);
      formData.append('reScope', reScope);
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
        url: API_URL + 'replyInsert',
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
          logApi('replyInsert', res.data);
          props.route.params?.refresh();
          props.navigation.goBack();
        })
        .catch((err) => {
          setLoading(false);
          logApi('replyInsert error', err.response);
        });
    }
  };
  const getPhoto = (index) => {
    ImageCropPicker.openPicker({
      width: 500,
      height: 500,
      mediaType: 'photo',
      smartAlbums: ['UserLibrary'],
      cropping: true,
      // multiple: true,
    })
      .then(async (res) => {
        console.log('ImagePicker openPicker', res);
        setFile(res.path);
        // setFile({path: res.path, mime: res.mime});
      })
      .catch((err) => {
        console.log('ImagePicker openPicker error', err);
      });
  };
  return (
    <Container>
      <Header left={'close'} title={'리뷰작성'} navigation={props.navigation} />
      <ScrollView keyboardShouldPersistTaps={'handled'}>
        <Seperator height={50} />
        <View style={{alignItems: 'center'}}>
          <Text text={'서귀포시 체육관'} fontSize={21} />
          <Seperator height={10} />
          <View style={{width: 220}}>
            <StarRating
              disabled={false}
              maxStars={5}
              rating={reScope}
              starSize={40}
              emptyStarColor={'gray'}
              halfStarEnabled={true}
              halfStarColor={custom.themeColor}
              fullStarColor={custom.themeColor}
              selectedStar={(e) => setReScope(e)}
            />
          </View>
        </View>
        <Seperator height={40} />
        <View style={{padding: 20}}>
          <TextInput
            multiline={true}
            placeholder={
              '다른 고객들을 위해 리뷰는 솔직하고 매너있게 작성해주세요!'
            }
            value={reContent}
            onChangeText={(e) => setReContent(e)}
            showRemain={true}
            maxLength={100}
            backgroundColor={'whitesmoke'}
            borderWidth={0}
            // padding={20}
          />
        </View>
        <HView style={{paddingHorizontal: 20}}>
          <TouchableOpacity onPress={() => getPhoto()}>
            {file ? (
              <Image
                width={Math.floor(screenWidth / 4)}
                height={Math.floor(screenWidth / 4)}
                borderRadius={5}
                // onPress={() => null}
                uri={file}
              />
            ) : (
              <View
                style={{
                  padding: 10,
                  paddingHorizontal: 20,
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: 'lightgray',
                  borderRadius: 5,
                }}>
                <Icons name={'icon-camera-20'} size={20} color={'dimgray'} />
                <Seperator height={5} />
                <Text text={'사진'} fontSize={14} color={'dimgray'} />
              </View>
            )}
          </TouchableOpacity>
        </HView>
      </ScrollView>
      <View
        style={{
          paddingHorizontal: 20,
          padding: 10,
          borderTopWidth: 1,
          borderTopColor: 'lightgray',
        }}>
        <Button
          disable={reScope === 0 || reContent.length === 0}
          text={'작성완료'}
          onPress={() => save()}
          color={custom.themeColor}
          size={'large'}
          stretch
          loading={loading}
        />
      </View>
      <Seperator bottom />
    </Container>
  );
}
