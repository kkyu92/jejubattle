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
import {View, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import Icons from '../../commons/Icons';
import {custom} from '../../config';
import ListItem from '../../commons/ListItem';
import {screenWidth} from '../../styles';
import {AppContext} from '../../context';
import Axios from 'axios';
import {logApi} from 'react-native-nuno-ui/funcs';
import {sports1Table} from '../../constants';

export default function EditProfile(props) {
  const context = React.useContext(AppContext);
  const [introduce, setIntroduce] = React.useState('');
  const [introduceModal, setIntroduceModal] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [repassword, setRepassword] = React.useState('');
  const [sports, setSports] = React.useState([]);
  const [selectedSports, setSelectedSports] = React.useState([]);
  const [modalIntroduce, setModalIntroduce] = React.useState(false);
  const [modalPassword, setModalPassword] = React.useState(false);
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
        logApi('sportsList success', res.data);
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
    const found = temp.indexOf(e);
    if (found === -1) {
      temp.push(e);
    } else {
      temp.splice(found, 1);
    }
    setSelectedSports(temp);
  };
  return (
    <Container>
      <Header left={'close'} title={'정보수정'} navigation={props.navigation} />
      <ScrollView>
        <View style={{padding: 20}}>
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
                color={'white'}
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
                  color={'white'}
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
          <HView style={{flexWrap: 'wrap'}}>
            {sports.map((e, i) => {
              return (
                <TouchableOpacity onPress={() => handleSports(e)} key={i}>
                  <View
                    style={{
                      padding: 10,
                      alignItems: 'center',
                      opacity: selectedSports.indexOf(e) === -1 ? 0.3 : 1,
                    }}>
                    <Image
                      local
                      height={Math.floor((screenWidth - 140) / 5)}
                      width={Math.floor((screenWidth - 140) / 5)}
                      uri={e.icon}
                      resizeMode={'contain'}
                    />
                    <Seperator height={10} />
                    <Text text={e.name} fontSize={14} />
                  </View>
                </TouchableOpacity>
              );
            })}
          </HView>
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
          onPress={() => null}
          color={custom.themeColor}
          disable={false}
          loading={false}
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
              value={''}
              onChangeText={() => null}
              borderWidth={0}
              placeholder={'비밀번호 (영문숫자포함 6~12)'}
            />
            <Seperator line marginBottom={20} />
            <TextInput
              title={'새 비밀번호'}
              value={''}
              onChangeText={() => null}
              borderWidth={0}
              placeholder={'비밀번호 (영문숫자포함 6~12)'}
            />
            <Seperator line marginBottom={20} />
            <TextInput
              title={'비밀번호 확인'}
              value={''}
              onChangeText={() => null}
              borderWidth={0}
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
                onPress={() => null}
                size={'large'}
                stretch
              />
            </View>
            <Seperator width={20} />
            <View style={{flex: 1}}>
              <Button
                text={'완료'}
                color={custom.themeColor}
                onPress={() => null}
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
