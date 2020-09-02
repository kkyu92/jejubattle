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
  Modal,
} from 'react-native-nuno-ui';
import {
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import Icons from '../../commons/Icons';
import {custom, API_URL} from '../../config';
import ListItem from '../../commons/ListItem';
import {screenWidth} from '../../styles';
import {AppContext} from '../../context';
import Axios from 'axios';
import ImagePicker from 'react-native-image-crop-picker';
import {logApi, checkPassword, showToast} from 'react-native-nuno-ui/funcs';
import {sports1Table} from '../../constants';

export default function EditProfile(props) {
  const context = React.useContext(AppContext);
  const [photo, setPhoto] = React.useState('');
  const [introduce, setIntroduce] = React.useState(context.me.userIntro || '');
  const [introduceModal, setIntroduceModal] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [currentPassword, setCurrentPassword] = React.useState('');
  const [passwordModal, setPasswordModal] = React.useState('');
  const [repasswordModal, setRepasswordModal] = React.useState('');
  const [sports, setSports] = React.useState([]);
  const [selectedSports, setSelectedSports] = React.useState(
    context.me.userSport || [],
  );
  const [modalIntroduce, setModalIntroduce] = React.useState(false);
  const [modalPassword, setModalPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  let provider = '';
  switch (context.me.userCode) {
    case 1:
      provider = '없음';
      break;
    case 2:
      provider = '연동완료(네이버)';
      break;
    case 3:
      provider = '연동완료(카카오)';
      break;
    case 4:
      provider = '연동완료(페이스북)';
      break;
  }
  React.useEffect(() => {
    Axios.post('sportsList', {})
      .then((res) => {
        logApi('sportsList', res.data);
        let temp = [...res.data.gojiList];
        temp = temp.map((e, i) => {
          return {...e, icon: sports1Table[i].icon};
        });
        setSports(temp);
      })
      .catch((err) => {
        logApi('sportsList error', err.response);
      });
  }, []);
  const handleSports = (e) => {
    const temp = [...selectedSports];
    const found = temp.map((t) => t.code).indexOf(e.code);
    if (found === -1) {
      temp.push(e);
    } else {
      temp.splice(found, 1);
    }
    setSelectedSports(temp);
  };
  const getPhoto = (index) => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      mediaType: 'photo',
      smartAlbums: ['UserLibrary'],
      cropping: true,
    })
      .then(async (res) => {
        console.log('ImagePicker openPicker', res);
        setPhoto(res.path);
      })
      .catch((err) => {
        console.log('ImagePicker openPicker error', err);
      });
  };
  const pwdCheck = (cpw, npw, nrpw) => {
    if (npw !== nrpw) {
      Alert.alert('두개의 새 비밀번호가 서로 다릅니다');
      return;
    }
    if (!checkPassword(npw, nrpw).valid) {
      Alert.alert('비밀번호는 문자와 숫자포함 6자 이상입니다');
      return;
    }
    Axios.post('pwdCheck', {
      userPwd: cpw,
    })
      .then((res) => {
        logApi('pwdCheck', res.data);
        setNewPassword(npw);
        setModalPassword(false);
        showToast('가장 하단에 있는 수정 완료 버튼을 눌러야 적용됩니다.');
      })
      .catch((err) => {
        logApi('pwdCheck error', err.response?.data?.message);
        Alert.alert(err.response?.data?.message);
      });
  };
  const updateUser = async () => {
    setLoading(true);
    const formData = new FormData();
    newPassword && formData.append('userPwd', newPassword);
    introduce && formData.append('userIntro', introduce);
    formData.append('userSport', JSON.stringify(selectedSports));
    if (photo) {
      const response = await fetch(photo);
      const blob = await response.blob();

      formData.append('file', {
        uri: photo,
        name: blob.data.name,
        type: blob.data.type,
      });
    }
    Axios({
      url: API_URL + 'userUpdate',
      method: 'POST',
      data: formData,
      headers: {
        Accept: 'application/json',
        token: global.token,
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(async (res) => {
        setLoading(false);
        logApi('userUpdate', res.data);
        context.dispatch({type: 'UPDATEME', data: res.data});
        props.navigation.goBack();
      })
      .catch((err) => {
        setLoading(false);
        logApi('userUpdate error', err?.response);
        Alert.alert(err.response?.data?.message);
      });
  };
  const renderItemCategory = ({item, index}) => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          opacity:
            selectedSports.map((s) => s.code).indexOf(item.code) === -1
              ? 0.3
              : 1,
        }}>
        <Image
          local
          height={Math.floor((screenWidth - 180) / 5)}
          width={Math.floor((screenWidth - 180) / 5)}
          uri={item.icon}
          resizeMode={'contain'}
          onPress={() => handleSports(item)}
        />
        <Seperator height={10} />
        <Text text={item.name} fontSize={14} />
      </View>
    );
  };
  return (
    <Container>
      <Header left={'close'} title={'정보수정'} navigation={props.navigation} />
      <ScrollView>
        <View style={{padding: 20}}>
          <HView>
            {context.me.userImgUrl || photo ? (
              <Image
                uri={context.me.userImgUrl || photo}
                width={72}
                height={72}
                borderRadius={36}
                onPress={() => getPhoto()}
              />
            ) : (
              <Image
                local
                uri={require('../../../assets/img/img-user1.png')}
                width={72}
                height={72}
                borderRadius={36}
                onPress={() => getPhoto()}
              />
            )}
          </HView>
          <HView style={{paddingVertical: 30}}>
            <View style={{flex: 0.2}}>
              <Text text={'이름'} fontSize={18} fontWeight={'500'} />
            </View>
            <View style={{flex: 0.8}}>
              <Text
                text={context.me.userName}
                color={'gray'}
                fontSize={18}
                fontWeight={'500'}
              />
            </View>
          </HView>
          <HView style={{paddingVertical: 10}}>
            <View style={{flex: 0.2}}>
              <Text text={'전화번호'} fontSize={18} fontWeight={'500'} />
            </View>
            <View style={{flex: 0.6}}>
              <Text
                text={context.me.userPhone}
                color={'gray'}
                fontSize={18}
                fontWeight={'500'}
              />
            </View>
            <View style={{flex: 0.2}}>
              <Button
                text={'인증'}
                size={'medium'}
                borderRadius={20}
                color={custom.themeColor}
                stretch
              />
            </View>
          </HView>
          {context.me.userCode === 1 && (
            <HView style={{paddingVertical: 10}}>
              <View style={{flex: 0.2}}>
                <Text text={'이메일'} fontSize={18} fontWeight={'500'} />
              </View>
              <View style={{flex: 0.6}}>
                <Text
                  text={context.me.userId}
                  color={'gray'}
                  fontSize={18}
                  fontWeight={'500'}
                />
              </View>
              <View style={{flex: 0.2}}>
                <Button
                  text={'인증'}
                  size={'medium'}
                  borderRadius={20}
                  color={custom.themeColor}
                  stretch
                />
              </View>
            </HView>
          )}
          <HView style={{paddingVertical: 10}}>
            <View style={{flex: 0.2}}>
              <Text text={'성별'} fontSize={18} fontWeight={'500'} />
            </View>
            <View style={{flex: 0.8}}>
              <Text
                text={context.me.userSex === 'M' ? '남성' : '여성'}
                color={'gray'}
                fontSize={18}
                fontWeight={'500'}
              />
            </View>
          </HView>
          {context.me.userCode !== 1 && (
            <HView style={{paddingVertical: 10}}>
              <View style={{flex: 0.2}}>
                <Text text={'SNS연동'} fontSize={18} fontWeight={'500'} />
              </View>
              <View style={{flex: 0.8}}>
                <Text
                  text={provider}
                  color={'gray'}
                  fontSize={18}
                  fontWeight={'500'}
                />
              </View>
            </HView>
          )}
          <HView style={{paddingVertical: 10, alignItems: 'flex-start'}}>
            <View style={{flex: 0.2}}>
              <Text text={'소개'} fontSize={18} fontWeight={'500'} />
            </View>
            <View style={{flex: 0.7}}>
              <Text
                text={introduce || '잘 부탁드립니다.'}
                color={'gray'}
                fontSize={18}
                fontWeight={'500'}
              />
            </View>
            <View style={{flex: 0.1, alignItems: 'flex-end'}}>
              <TouchableOpacity
                onPress={() => {
                  setIntroduceModal(introduce);
                  setModalIntroduce(true);
                }}>
                <Icons name={'icon-pencil-12'} size={16} />
              </TouchableOpacity>
            </View>
          </HView>
          {context.me.userCode === 1 && (
            <HView style={{paddingVertical: 10}}>
              <View style={{flex: 0.2}}>
                <Text text={'비밀번호'} fontSize={18} fontWeight={'500'} />
              </View>
              <View style={{flex: 0.8}}>
                <Button
                  text={'비밀번호 변경'}
                  size={'medium'}
                  borderRadius={20}
                  color={custom.themeColor}
                  onPress={() => setModalPassword(true)}
                />
              </View>
            </HView>
          )}

          <Seperator height={40} />
          <Text text={'선호 종목 선정'} fontSize={18} fontWeight={'bold'} />
          <Seperator height={20} />
          <FlatList
            data={sports}
            keyExtractor={(item) => JSON.stringify(item.code)}
            renderItem={renderItemCategory}
            numColumns={5}
          />
        </View>
      </ScrollView>
      <HView
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderTopColor: 'lightgray',
          borderTopWidth: 1,
        }}>
        <Button
          text={'수정하기'}
          onPress={() => updateUser()}
          color={custom.themeColor}
          disable={false}
          loading={loading}
          size={'large'}
          stretch
        />
      </HView>
      <Seperator bottom />
      {/* 소개작성 */}
      <Modal
        isVisible={modalIntroduce}
        onBackdropPress={() => setModalIntroduce(false)}>
        <View
          style={{
            padding: 20,
            backgroundColor: 'white',
            borderRadius: 10,
          }}>
          <View style={{alignItems: 'center'}}>
            <Text
              fontSize={18}
              fontWeight={'bold'}
              color={'black'}
              text={'소개작성'}
            />
          </View>
          <Seperator height={50} />
          <View>
            <TextInput
              multiline={true}
              maxLength={50}
              showRemain={true}
              value={introduceModal}
              onChangeText={(e) => setIntroduceModal(e)}
              placeholder={'최대 50자 까지 작성 가능합니다.'}
            />
          </View>
          <Seperator height={20} />
          <HView>
            <View style={{flex: 1}}>
              <Button
                text={'취소'}
                color={'gray'}
                onPress={() => {
                  setModalIntroduce(false);
                }}
                size={'large'}
                stretch
              />
            </View>
            <Seperator width={20} />
            <View style={{flex: 1}}>
              <Button
                text={'완료'}
                color={custom.themeColor}
                onPress={() => {
                  setIntroduce(introduceModal);
                  setModalIntroduce(false);
                }}
                size={'large'}
                stretch
              />
            </View>
          </HView>
        </View>
      </Modal>
      {/* 비밀번호 변경 */}
      <Modal
        isVisible={modalPassword}
        onBackdropPress={() => setModalPassword(false)}>
        <View
          style={{
            padding: 20,
            backgroundColor: 'white',
            borderRadius: 10,
          }}>
          <View style={{alignItems: 'center'}}>
            <Text
              fontSize={18}
              fontWeight={'bold'}
              color={'black'}
              text={'비밀번호 변경'}
            />
          </View>
          <Seperator height={20} />
          <View>
            <TextInput
              title={'현재 비밀번호'}
              value={currentPassword}
              onChangeText={(e) => setCurrentPassword(e)}
              borderWidth={0}
              showEye={true}
              placeholder={'비밀번호 (영문숫자포함 6~12)'}
            />
            <Seperator line marginBottom={20} />
            <TextInput
              title={'새 비밀번호'}
              value={passwordModal}
              onChangeText={(e) => setPasswordModal(e)}
              borderWidth={0}
              maxLength={12}
              showEye={true}
              placeholder={'비밀번호 (영문숫자포함 6~12)'}
            />
            <Seperator line marginBottom={20} />
            <TextInput
              title={'비밀번호 확인'}
              value={repasswordModal}
              onChangeText={(e) => setRepasswordModal(e)}
              borderWidth={0}
              maxLength={12}
              showEye={true}
              placeholder={'입력했던 비밀번호를 다시 입력해주세요'}
            />
            <Seperator line />
          </View>
          <Seperator height={20} />
          <HView>
            <View style={{flex: 1}}>
              <Button
                text={'취소'}
                color={'gray'}
                onPress={() => setModalPassword(false)}
                size={'large'}
                stretch
              />
            </View>
            <Seperator width={20} />
            <View style={{flex: 1}}>
              <Button
                text={'완료'}
                color={custom.themeColor}
                onPress={() => {
                  pwdCheck(currentPassword, passwordModal, repasswordModal);
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
