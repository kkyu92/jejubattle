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
  Checkbox,
  Modal,
} from '../../react-native-nuno-ui';
import {TouchableOpacity, View, ScrollView} from 'react-native';
import Icons from '../../commons/Icons';
import ImageCropPicker from 'react-native-image-crop-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Axios from 'axios';
import {logApi, showToast} from '../../react-native-nuno-ui/funcs';
import {API_URL} from '../../config';
import {screenWidth} from '../../styles';

export default function Report(props) {
  const [modalWarning, setModalWarning] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [code, setCode] = React.useState('');
  const [text, setText] = React.useState('');
  const [file, setFile] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    Axios.get(`getReport/${props.route.params.type}`)
      .then((res) => {
        logApi('getReport', res.data);
        setItems(res.data);
      })
      .catch((err) => {
        logApi('getReport error', err.response);
      });
  }, []);
  const save = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('target', props.route.params.userPk);
    formData.append('bcName', props.route.params.bcName);
    formData.append('code', code);
    formData.append('text', text);
    props.route.params.rePk && formData.append('rePk', props.route.params.rePk);
    props.route.params.reContent &&
      formData.append('reContent', props.route.params.reContent);
    props.route.params.reDate &&
      formData.append('reDate', props.route.params.reDate);
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
      url: API_URL + 'report',
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
        logApi('report', res.data);
        setModalWarning(false);
        props.navigation.goBack();
        showToast('신고가 완료되었습니다', 2000, 'center');
      })
      .catch((err) => {
        setLoading(false);
        logApi('report error', err.response);
      });
  };
  const getPhoto = (index) => {
    ImageCropPicker.openPicker({
      width: 700,
      height: 700,
      mediaType: 'photo',
      smartAlbums: ['UserLibrary'],
      cropping: true,
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
      <Header left={'close'} title={'신고하기'} navigation={props.navigation} />
      <KeyboardAwareScrollView>
        <View style={{paddingVertical: 50, alignItems: 'center'}}>
          {props.route.params.userImgUrl ? (
            <Image
              uri={props.route.params.userImgUrl}
              width={68}
              height={68}
              borderRadius={34}
            />
          ) : (
            <Image
              local
              uri={require('../../../assets/img/img-user2.png')}
              width={68}
              height={68}
              borderRadius={34}
            />
          )}
          <Seperator height={10} />
          <Text
            text={props.route.params.userName}
            fontSize={13}
            color={'gray'}
          />
        </View>
        <View style={{paddingHorizontal: 40}}>
          {items.map((e, i) => {
            return (
              <View style={{paddingVertical: 10}} key={i}>
                <Checkbox
                  onPress={() => setCode(e.code)}
                  label={e.name}
                  checked={e.code === code}
                  // size={'large'}
                />
              </View>
            );
          })}
        </View>
        <Seperator height={20} />
        <View style={{padding: 20}}>
          <Text
            text={'상황설명 및 상세 내용, 기타'}
            fontSize={21}
            fontWeight={'bold'}
          />
          <Seperator height={10} />
          <TextInput
            multiline={true}
            placeholder={'신고하실 내용을 자세하게 적어주세요.'}
            value={text}
            onChangeText={(e) => setText(e)}
            showRemain={true}
            maxLength={500}
            backgroundColor={'whitesmoke'}
            borderWidth={0}
          />
        </View>
        <HView style={{paddingHorizontal: 20, marginBottom: 20}}>
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
      </KeyboardAwareScrollView>
      <View
        style={{
          paddingHorizontal: 20,
          padding: 10,
          borderTopWidth: 1,
          borderTopColor: 'lightgray',
        }}>
        <Button
          disable={code === '' || text === ''}
          text={'위 사항으로 해당 유저를 신고합니다.'}
          onPress={() => setModalWarning(true)}
          color={'#FE7262'}
          size={'large'}
          stretch
        />
      </View>
      <Seperator bottom />
      {/* 신고경고 모달 */}
      <Modal
        isVisible={modalWarning}
        onBackdropPress={() => setModalWarning(false)}>
        <View
          style={{
            padding: 20,
            backgroundColor: 'white',
            borderRadius: 10,
            alignItems: 'center',
          }}>
          <Text
            fontSize={18}
            fontWeight={'bold'}
            color={'black'}
            text={'신고하시기 전에'}
          />
          <Seperator height={50} />
          <Text
            fontSize={16}
            color={'#303441'}
            text={
              '본 신고는 해당 유저의 사용 패널티를 부과하기 위한 신고입니다.\n형사상, 민사상의 문제는 경찰에 직접 신고하여 주시기 바랍니다.\n\n(무고한 사람을 신고할 시 패널티를 받으실 수 있습니다.)'
            }
            style={{textAlign: 'center'}}
          />
          <Seperator height={50} />
          <HView>
            <View style={{flex: 1}}>
              <Button
                text={'취소'}
                color={'gray'}
                onPress={() => setModalWarning(false)}
                size={'large'}
                stretch
              />
            </View>
            <Seperator width={20} />
            <View style={{flex: 1}}>
              <Button
                text={'신고'}
                color={'#FE7262'}
                onPress={() => save()}
                size={'large'}
                stretch
                loading={loading}
              />
            </View>
          </HView>
        </View>
      </Modal>
    </Container>
  );
}
