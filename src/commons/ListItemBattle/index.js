import React from 'react';
import {
  HView,
  Seperator,
  Text,
  Image,
  TextInput,
  Modal,
  Button,
  Checkbox,
} from 'react-native-nuno-ui';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {custom} from '../../config';
import {Alert, TouchableOpacity, View, CheckBox} from 'react-native';
import {ShadowStyle} from '../../styles';
import {AppContext} from '../../context';
import Axios from 'axios';
import {logApi} from 'react-native-nuno-ui/funcs';

export default function ListItemBattle({
  item,
  navigation,
  // refresh,
  editMode,
  handleCheck,
  index,
  deleteMyBattle,
}) {
  const context = React.useContext(AppContext);
  const [enteranceAlert, setEnteranceAlert] = React.useState(false);
  const [passwordModal, setPasswordModal] = React.useState(false);
  const [password, setPassword] = React.useState('');

  const updateBattle = async (data) => {
    await Axios.post('updateBattle', data)
      .then((res) => {
        logApi('updateBattle', res.data);
      })
      .catch((err) => {
        logApi('updateBattle error', err.response);
      });
  };
  const onPress = () => {
    // 내가 이미 방에 참여중인지 확인
    if (
      item.teamA.member.filter((e) => e.userPk === context.me.userPk).length ===
        0 &&
      item.teamB.member.filter((e) => e.userPk === context.me.userPk).length ===
        0
    ) {
      // 참여하지 않는다면
      // 방이 만원인지 확인
      if (
        item.teamA.member.length >= JSON.parse(item.btName.split(' ')[0]) &&
        item.teamB.member.length >= JSON.parse(item.btName.split(' ')[0])
      ) {
        setEnteranceAlert(true);
      } else {
        // 만원이 아니면
        // 1. 비밀번호가 설정이 되어 있다면 비밀번호 입력창 띄움
        if (item.baPrivate === 'Y') {
          setPasswordModal(true);
          return;
        }
        // 2. 비밀번호가 설정이 되어 있지않다면 방에 몇명이 찼는지 확인하고 적절한 방으로 들어감
        battleJoin();
      }
    } else {
      // 이미 배틀방에 참여하고 있다면
      navigation.navigate('BattleView', {
        baPk: item.baPk,
        // refresh: refresh,
      });
    }
  };
  const battleJoin = async () => {
    if (item.teamA.member.length >= item.teamB.member.length) {
      const team = {...item.teamB};
      team.member.push({
        userPk: context.me.userPk,
        ready: 'N',
        regdate: new Date(),
      });
      await updateBattle({baPk: item.baPk, teamB: team});
    } else {
      const team = {...item.teamA};
      team.member.push({
        userPk: context.me.userPk,
        ready: 'N',
        regdate: new Date(),
      });
      await updateBattle({baPk: item.baPk, teamA: team});
    }
    navigation.navigate('BattleView', {
      baPk: item.baPk,
      // refresh: refresh,
    });
  };
  return (
    <View keyboardShouldPersistTaps={'handled'}>
      <View style={{padding: 20}}>
        <TouchableOpacity
          onPress={onPress}
          style={{
            padding: 20,
            borderRadius: 10,
            backgroundColor: 'white',
            ...ShadowStyle,
          }}>
          <HView style={{justifyContent: 'space-between'}}>
            <HView>
              <Text text={item.baSubject} fontSize={16} fontWeight={'bold'} />
              <Seperator width={9} />
              <Button
                text={item.blName}
                size={'small'}
                textColor={custom.themeColor}
                borderColor={custom.themeColor}
              />
            </HView>
            <HView>
              {item.baPrivate === 'Y' ? (
                <MaterialIcons name={'lock'} color={'dimgray'} size={12} />
              ) : (
                <MaterialIcons name={'lock-open'} color={'dimgray'} size={12} />
              )}
              <Seperator width={9} />
              <Text text={item.btName} fontSize={13} color={'dimgray'} />
            </HView>
          </HView>
          <Seperator height={20} />
          <HView style={{justifyContent: 'space-between'}}>
            <View style={{flex: 1}}>
              <HView style={{paddingVertical: 4}}>
                <View style={{flex: 0.2}}>
                  <Text text={'종목'} fontSize={14} color={'gray'} />
                </View>
                <View style={{flex: 0.8}}>
                  <Text text={item.bcName} fontSize={14} color={'gray'} />
                </View>
              </HView>
              <HView style={{paddingVertical: 4}}>
                <View style={{flex: 0.2}}>
                  <Text text={'날짜'} fontSize={14} color={'gray'} />
                </View>
                <View style={{flex: 0.8}}>
                  <Text text={item.baDate} fontSize={14} color={'gray'} />
                </View>
              </HView>
              <HView style={{paddingVertical: 4}}>
                <View style={{flex: 0.2}}>
                  <Text text={'지역'} fontSize={14} color={'gray'} />
                </View>
                <View style={{flex: 0.8}}>
                  <Text text={item.bzName} fontSize={14} color={'gray'} />
                </View>
              </HView>
              <HView style={{paddingVertical: 4, alignItems: 'flex-start'}}>
                <View style={{flex: 0.2}}>
                  <Text text={'소개'} fontSize={14} color={'gray'} />
                </View>
                <View style={{flex: 0.8}}>
                  <Text text={item.baContent} fontSize={14} color={'gray'} />
                </View>
              </HView>
            </View>
            <View>
              {item.baState === '대기중' && (
                <>
                  <Button
                    text={'대기중'}
                    size={'medium'}
                    color={'#CECCCD'}
                    borderRadius={20}
                  />
                </>
              )}
              {item.baState === 'playing' && (
                <Button
                  text={'배틀중'}
                  size={'medium'}
                  color={custom.themeColor}
                  borderRadius={20}
                />
              )}
              {item.baState === 'done' && (
                <>
                  {item.win ? (
                    <Image
                      local
                      uri={require('../../../assets/img/icon-win.png')}
                      height={70}
                      width={70}
                      resizeMode={'cover'}
                    />
                  ) : (
                    <Image
                      local
                      uri={require('../../../assets/img/icon-lose.png')}
                      height={70}
                      width={70}
                      resizeMode={'cover'}
                    />
                  )}
                  <Button
                    text={'배틀완료'}
                    size={'medium'}
                    color={'#EBEBEB'}
                    textColor={'gray'}
                    borderRadius={20}
                  />
                  <Seperator height={5} />
                  {deleteMyBattle && editMode ? (
                    <View style={{alignItems: 'center'}}>
                      <Checkbox
                        multiple
                        checked={item.checked}
                        onPress={() => handleCheck(index)}
                        size={'large'}
                      />
                    </View>
                  ) : (
                    <Button
                      text={'삭제'}
                      size={'medium'}
                      color={'white'}
                      textColor={'gray'}
                      borderRadius={20}
                      onPress={() =>
                        deleteMyBattle
                          ? deleteMyBattle([{baPk: item.baPk}])
                          : null
                      }
                      stretch
                    />
                  )}
                </>
              )}
            </View>
          </HView>
        </TouchableOpacity>
      </View>
      <Modal
        isVisible={enteranceAlert}
        onBackdropPress={() => setEnteranceAlert(false)}>
        <View style={{padding: 20, backgroundColor: 'white', borderRadius: 10}}>
          <View style={{padding: 20}}>
            <View style={{alignItems: 'center'}}>
              <Text
                text={'인원이 가득 찼습니다.'}
                fontWeight={'bold'}
                fontSize={18}
              />
            </View>
          </View>
          <Seperator height={40} />
          <Button
            text={'확인'}
            size={'large'}
            onPress={() => setEnteranceAlert(false)}
            stretch
            color={custom.themeColor}
          />
        </View>
      </Modal>
      <Modal
        isVisible={passwordModal}
        onBackdropPress={() => {
          setPassword('');
          setPasswordModal(false);
        }}>
        <View style={{padding: 20, backgroundColor: 'white', borderRadius: 10}}>
          <View style={{padding: 20}}>
            <View style={{alignItems: 'center'}}>
              <Text
                text={'배틀방 비밀번호'}
                fontWeight={'bold'}
                fontSize={18}
              />
            </View>
          </View>
          <Seperator height={20} />
          <View>
            <TextInput
              value={password}
              onChangeText={(e) => setPassword(e)}
              placeholder={'비밀번호를 입력해주세요'}
            />
          </View>
          <Seperator height={20} />
          <HView>
            <View style={{flex: 1}}>
              <Button
                text={'취소'}
                color={'gray'}
                onPress={() => {
                  setPassword('');
                  setPasswordModal(false);
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
                  if (password === item.baPwd) {
                    battleJoin();
                    setPassword('');
                    setPasswordModal(false);
                  } else {
                    Alert.alert('비밀번호를 잘못 입력하셨습니다.');
                  }
                }}
                size={'large'}
                stretch
              />
            </View>
          </HView>
        </View>
      </Modal>
    </View>
  );
}
