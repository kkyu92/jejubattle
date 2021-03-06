import React from 'react';
import {
  Container,
  Text,
  Header,
  Seperator,
  HView,
  Button,
  TextInput,
  Picker,
  DateTime,
  Checkbox,
  Modal,
  Image,
} from '../../react-native-nuno-ui';
import {
  TouchableOpacity,
  View,
  FlatList,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import Icons from '../../commons/Icons';
import {custom} from '../../config';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Axios from 'axios';
import {
  logApi,
  getDateFromHours,
  showToast,
} from '../../react-native-nuno-ui/funcs';
import moment from 'moment';
import {AppContext} from '../../context';
import Reward from './Reward';
// import {navigate} from '../../navigations/RootNavigation';
import * as RootNavigation from '../../navigations/RootNavigation';
import {getStatusBarHeight, getBottomSpace} from 'react-native-iphone-x-helper';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-community/async-storage';

export default function TabBattleDetail(props) {
  const context = React.useContext(AppContext);
  const [modalExit, setModalExit] = React.useState(false);
  const [modalExit2, setModalExit2] = React.useState(false);
  const [modalStart, setModalStart] = React.useState(false);
  const [modalStartNoCoin, setModalStartNoCoin] = React.useState(false);
  const [modalSetting, setModalSetting] = React.useState(false);
  const [modalSettingAlert, setModalSettingAlert] = React.useState(false);
  const [modalDateAlert, setModalDateAlert] = React.useState(false);
  const [modalReward, setModalReward] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [place, setPlace] = React.useState(props.info.baPlace);
  const [date, setDate] = React.useState(new Date(props.info.baDate));
  const [startTime, setStartTime] = React.useState(
    new Date(getDateFromHours(props.info.baStartTime || '00:00')),
  );
  const [foundedAtTeamA, setFoundedAtTeamA] = React.useState(
    props.info.teamA.member.map((e) => e.userPk).indexOf(context.me.userPk),
  );
  const [foundedAtTeamB, setFoundedAtTeamB] = React.useState(
    props.info.teamB.member.map((e) => e.userPk).indexOf(context.me.userPk),
  );
  const [battleButtonText, setBattleButtonText] = React.useState('');
  const [reStartBattle, setReStartBattle] = React.useState(false);

  const [hideOutBtnGuide, setHideOutBtnGuide] = React.useState(
    global.hideOutBtnGuide,
  );

  // let reStartBattle = false;
  // let battleButtonText;
  React.useEffect(() => {
    setFoundedAtTeamA(
      props.info.teamA.member.map((e) => e.userPk).indexOf(context.me.userPk),
    );
    setFoundedAtTeamB(
      props.info.teamB.member.map((e) => e.userPk).indexOf(context.me.userPk),
    );
    setDate(new Date(props.info.baDate));
    setStartTime(new Date(getDateFromHours(props.info.baStartTime || '00:00')));
  }, [props.info]);

  React.useEffect(() => {
    console.log('##############################');
    if (props.info.baCode < 3) {
      if (context.me.userPk === props.info.teamA.member[0].userPk) {
        // battleButtonText = '배틀시작';
        setBattleButtonText('배틀시작');
      } else {
        if (
          props.info.teamA.member[foundedAtTeamA]?.ready === 'Y' ||
          props.info.teamB.member[foundedAtTeamB]?.ready === 'Y'
        ) {
          // battleButtonText = '배틀취소';
          setBattleButtonText('배틀취소');
        } else {
          // battleButtonText = '배틀준비';
          setBattleButtonText('배틀준비');
        }
      }
    } else if (props.info.baCode === 3) {
      // battleButtonText = '배틀완료 및 평가하기';
      if (
        context.me.userPk === props.info.teamA.member[0].userPk ||
        context.me.userPk === props.info.teamB.member[0].userPk
      ) {
        setBattleButtonText('배틀완료 및 평가하기');
      } else {
        setBattleButtonText('배틀중');
      }
    } else if (props.info.baCode === 4) {
      props.info.teamA.member.map((m, index) => {
        if (m.userPk === context.me.userPk) {
          if (m.rewardType === 'N') {
            // battleButtonText = '보상받기';
            setBattleButtonText('보상받기');
          } else {
            console.log('index ::: ' + index);
            if (index === 0) {
              // battleButtonText = '배틀 다시하기';
              // reStartBattle = true;
              setBattleButtonText('배틀 다시하기');
              setReStartBattle(true);
            } else {
              // battleButtonText = '보상완료';
              setBattleButtonText('배틀완료');
            }
          }
        }
      });
      props.info.teamB.member.map((m) => {
        if (m.userPk === context.me.userPk) {
          if (m.rewardType === 'N') {
            // battleButtonText = '보상받기';
            setBattleButtonText('보상받기');
          } else {
            // battleButtonText = '보상완료';
            setBattleButtonText('배틀완료');
          }
        }
      });
    }
  }, [props.info.teamA, props.info.teamB, props.info.baCode]);

  const readyNcoinCheck = async (useCoin) => {
    console.log('readyNcoinCheck ::: ' + props.coin);
    const tempTeamA = {...props.info.teamA};
    const tempTeamB = {...props.info.teamB};
    if (foundedAtTeamA !== -1) {
      tempTeamA.member[foundedAtTeamA].ready =
        tempTeamA.member[foundedAtTeamA].ready === 'Y' ? 'N' : 'Y';
      // tempTeamA.member[foundedAtTeamA].coinType =
      //   props.coin === 'OK' ? 'Y' : 'N';
      tempTeamA.member[foundedAtTeamA].coinType = useCoin ? 'Y' : 'N';
    }
    if (foundedAtTeamB !== -1) {
      tempTeamB.member[foundedAtTeamB].ready =
        tempTeamB.member[foundedAtTeamB].ready === 'Y' ? 'N' : 'Y';
      // tempTeamB.member[foundedAtTeamB].coinType =
      //   props.coin === 'OK' ? 'Y' : 'N';
      tempTeamB.member[foundedAtTeamB].coinType = useCoin ? 'Y' : 'N';
    }
    updateBattle(
      {
        teamA: tempTeamA,
        teamB: tempTeamB,
      },
      true,
    );
  };
  const cancelReady = async () => {
    const tempTeamA = {...props.info.teamA};
    const tempTeamB = {...props.info.teamB};
    if (foundedAtTeamA !== -1) {
      tempTeamA.member[foundedAtTeamA].ready =
        tempTeamA.member[foundedAtTeamA].ready === 'Y' ? 'N' : 'Y';
      tempTeamA.member[foundedAtTeamA].coinType = '';
    }
    if (foundedAtTeamB !== -1) {
      tempTeamB.member[foundedAtTeamB].ready =
        tempTeamB.member[foundedAtTeamB].ready === 'Y' ? 'N' : 'Y';
      tempTeamB.member[foundedAtTeamB].coinType = '';
    }
    updateBattle(
      {
        teamA: tempTeamA,
        teamB: tempTeamB,
      },
      true,
    );
    if (Platform.OS === 'android') {
      Alert.alert('배틀을 취소했습니다.');
    } else {
      showToast('배틀을 취소했습니다.', 2000, 'center');
    }
  };
  const updateBattle = (data, update) => {
    props.socket.send(
      `/battle/${props.info.baPk}`,
      {},
      JSON.stringify({
        baPk: props.info.baPk,
        ...data,
      }),
    );
  };
  // 배틀완료 후 방 나가기
  const deleteMyBattle = (baPk) => {
    let data = [
      {
        baPk: baPk,
      },
    ];
    Axios.post('myBattleDelete', data)
      .then((res) => {
        logApi('myBattleDelete', res.data);
        props.navigation.goBack();
        props.refresh();
      })
      .catch((err) => {
        logApi('myBattleDelete error', err.response);
      });
  };
  const deleteBattle = () => {
    Axios.get(`deleteBattle/${props.info.baPk}`)
      .then((res) => {
        logApi('deleteBattle', res.data);
        // setLoading(false);
        // props.refresh && props.refresh();
        props.navigation.goBack();
      })
      .catch((err) => {
        logApi('deleteBattle error', err.response);
        // setLoading(false);
      });
  };
  const reMakeBattle = () => {
    Axios.get(`restartBattle/${props.info.baPk}`)
      .then((res) => {
        logApi('restartBattle', res.data);
        showToast('배틀방이 재생성 되었습니다', 3000, 'center');
      })
      .catch((err) => {
        logApi('restartBattle error', err.response.data);
        showToast(err.response.data.message, 2000, 'center');
      });
  };
  const handleExit = async () => {
    if (foundedAtTeamA !== -1) {
      const localTeam = {...props.info.teamA};
      let localHistory = props.info.history.map((e) => ({userPk: e.userPk}));
      if (localHistory.map((e) => e.userPk).indexOf(context.me.userPk) === -1) {
        localHistory.push({userPk: context.me.userPk});
      }
      localTeam.member.splice(foundedAtTeamA, 1);
      updateBattle({teamA: localTeam, history: localHistory}, false);
    }
    if (foundedAtTeamB !== -1) {
      const localTeam = {...props.info.teamB};
      let localHistory = props.info.history.map((e) => ({userPk: e.userPk}));
      if (localHistory.map((e) => e.userPk).indexOf(context.me.userPk) === -1) {
        localHistory.push({userPk: context.me.userPk});
      }
      localTeam.member.splice(foundedAtTeamB, 1);
      updateBattle({teamB: localTeam, history: localHistory}, false);
    }
    setModalExit2(false);
    // myBattle -> 나가기 -> myBattle
    if (props?.myBattle) {
      console.log('마이배틀에서 나가는 부분');
      RootNavigation.navigate('Battle', {navigate: 'myBattle'});
      // props.navigation.goBack();
    } else {
      // battle -> 나가기 -> battle
      RootNavigation.navigate('Battle', {});
    }
  };
  const readyCheck = (state) => {
    // ready check
    const tempTeamA = {...props.info.teamA};
    const tempTeamB = {...props.info.teamB};
    if (foundedAtTeamA !== -1) {
      tempTeamA.member[foundedAtTeamA].ready = 'Y';
    }
    let readyTeamA = tempTeamA.member.map((e) => ({
      ready: e.ready,
    }));
    let readyTeamB = tempTeamB.member.map((e) => ({
      ready: e.ready,
    }));
    let aReady, bReady;
    aReady = JSON.stringify(readyTeamA.map((e) => e.ready === 'Y'));
    bReady = JSON.stringify(readyTeamB.map((e) => e.ready === 'Y'));

    // state = 1 : 코인사용 아니요
    // state = 2 : 코인사용 예
    // state = 3 : 그냥하기
    if (
      context.me.userPk === props.info.teamA.member[0].userPk &&
      (aReady.includes('false') || bReady.includes('false'))
    ) {
      // 방장 + 준비완료 상태가 아님
      if (state === 1 || state === 2) {
        setModalStart(false);
      } else {
        setModalStartNoCoin(false);
      }
      showToast('모든 사용자가 배틀준비가 되어야 시작합니다.', 2000, 'center');
      if (foundedAtTeamA !== -1) {
        tempTeamA.member[foundedAtTeamA].ready = 'N';
      }
    } else {
      if (foundedAtTeamA !== -1) {
        tempTeamA.member[foundedAtTeamA].ready = 'N';
      }
      if (state === 1) {
        readyNcoinCheck(false);
        setModalStart(false);
      } else if (state === 2) {
        readyNcoinCheck(true);
        setModalStart(false);
      } else {
        readyNcoinCheck(false);
        setModalStartNoCoin(false);
      }
      showToast('준비되었습니다.', 2000, 'center');
    }
  };

  return (
    <Container>
      <ScrollView>
        <HView
          style={{
            justifyContent: 'space-evenly',
            paddingVertical: 30,
            paddingHorizontal: 20,
          }}>
          <TouchableOpacity
            style={{flex: 1, alignItems: 'center'}}
            onPress={() =>
              props.navigation.navigate('BattleMemberReport', {
                info: props.info,
              })
            }>
            <Icons name={'icon-report-30'} size={30} color={'silver'} />
            <Seperator height={10} />
            <Text
              text={'신고하기'}
              fontSize={13}
              fontWeight={'500'}
              color={'gray'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{flex: 1, alignItems: 'center'}}
            onPress={() => setModalSetting(true)}>
            <Icons name={'icon-setting-30'} size={30} color={'silver'} />
            <Seperator height={10} />
            <Text
              text={
                context.me.userPk === props.info.teamA.member[0].userPk
                  ? '필수설정'
                  : '경기정보'
              }
              fontSize={13}
              fontWeight={'500'}
              color={'gray'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{flex: 1, alignItems: 'center'}}
            onPress={() => props.navigation.navigate('Guide', {})}>
            <Icons name={'icon-guide-30'} size={30} color={'silver'} />
            <Seperator height={10} />
            <Text
              text={'가이드'}
              fontSize={13}
              fontWeight={'500'}
              color={'gray'}
            />
          </TouchableOpacity>
        </HView>
        <HView style={{paddingHorizontal: 20, paddingVertical: 10}}>
          <View style={{flex: 0.1}}>
            <Text
              text={'리더'}
              fontSize={14}
              fontWeight={'bold'}
              color={'gray'}
            />
          </View>
          <View style={{flex: 0.4}}>
            <Text
              text={props.info.teamA?.member[0]?.userName}
              fontSize={14}
              color={'gray'}
            />
          </View>
          <View style={{flex: 0.1}}>
            <Text
              text={'종목'}
              fontSize={14}
              fontWeight={'bold'}
              color={'gray'}
            />
          </View>
          <View style={{flex: 0.4}}>
            <Text text={props.info.bcName} fontSize={14} color={'gray'} />
          </View>
        </HView>
        <HView style={{paddingHorizontal: 20, paddingVertical: 10}}>
          <View style={{flex: 0.1}}>
            <Text
              text={'장소'}
              fontSize={14}
              fontWeight={'bold'}
              color={'gray'}
            />
          </View>
          <View style={{flex: 0.4}}>
            <Text
              text={
                props.info.baPlace.faName
                  ? props.info.baPlace.faName
                  : props.info.bzName
              }
              fontSize={14}
              color={'gray'}
            />
          </View>
          <View style={{flex: 0.1}}>
            <Text
              text={'인원'}
              fontSize={14}
              fontWeight={'bold'}
              color={'gray'}
            />
          </View>
          <View style={{flex: 0.4}}>
            <Text text={props.info.btName} fontSize={14} color={'gray'} />
          </View>
        </HView>
        <HView
          style={{
            paddingHorizontal: 20,
            paddingVertical: 10,
            alignItems: 'flex-start',
          }}>
          <View style={{flex: 0.1}}>
            <Text
              text={'소개'}
              fontSize={14}
              fontWeight={'bold'}
              color={'gray'}
            />
          </View>
          <View style={{flex: 0.9}}>
            <Text text={props.info.baContent} fontSize={14} color={'gray'} />
          </View>
        </HView>
        {/* <View style={{flex: 1}} /> */}
      </ScrollView>
      <HView
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderTopColor: 'lightgray',
          borderTopWidth: 1,
        }}>
        {props.info.baCode < 3 ? (
          <>
            <Button
              text={'나가기'}
              onPress={() => {
                if (context.me.userPk === props.info.teamA.member[0].userPk) {
                  setModalExit(true);
                } else {
                  setModalExit2(true);
                }
              }}
              color={'white'}
              disable={false}
              loading={false}
              size={'large'}
              // stretch
            />
            <Seperator width={20} />
          </>
        ) : (
          props.info.baCode === 4 &&
          battleButtonText === '배틀 다시하기' && (
            <>
              <Button
                text={'나가기'}
                onPress={() => {
                  Alert.alert(
                    '선택한 배틀을 삭제합니다',
                    '해당 방 정보가 모두 삭제되며 복구할 수 없습니다.\n아직보상을 받지않은 경우 보상을 받을 수 없습니다.',
                    [
                      {
                        text: '취소',
                        onPress: () => console.log('cancel'),
                      },
                      {
                        text: '삭제',
                        onPress: () => deleteMyBattle(props.info.baPk),
                      },
                    ],
                  );
                }}
                color={'white'}
                disable={false}
                loading={false}
                size={'large'}
                // stretch
              />
              <Seperator width={20} />
            </>
          )
        )}
        <View style={{flex: 1}}>
          <Button
            text={battleButtonText}
            onPress={() => {
              if (props.info.baCode < 3) {
                if (context.me.userPk === props.info.teamA.member[0].userPk) {
                  if (!props.info.baPlace || !props.info.baStartTime) {
                    setModalSettingAlert(true);
                    return;
                  }
                  if (new Date(props.info.baDate) > new Date()) {
                    setModalDateAlert(true);
                    return;
                  }
                  // ready check
                  const tempTeamA = {...props.info.teamA};
                  const tempTeamB = {...props.info.teamB};
                  if (foundedAtTeamA !== -1) {
                    tempTeamA.member[foundedAtTeamA].ready = 'Y';
                  }
                  let readyTeamA = tempTeamA.member.map((e) => ({
                    ready: e.ready,
                  }));
                  let readyTeamB = tempTeamB.member.map((e) => ({
                    ready: e.ready,
                  }));
                  let aReady, bReady;
                  aReady = JSON.stringify(
                    readyTeamA.map((e) => e.ready === 'Y'),
                  );
                  bReady = JSON.stringify(
                    readyTeamB.map((e) => e.ready === 'Y'),
                  );

                  if (aReady.includes('false') || bReady.includes('false')) {
                    showToast(
                      '모든 사용자가 배틀준비가 되어야 시작합니다.',
                      2000,
                      'center',
                    );
                    if (foundedAtTeamA !== -1) {
                      tempTeamA.member[foundedAtTeamA].ready = 'N';
                    }
                    return 'noReady';
                  } else {
                    if (foundedAtTeamA !== -1) {
                      tempTeamA.member[foundedAtTeamA].ready = 'N';
                    }
                  }

                  if (props.coin === 'OK') {
                    setModalStart(true);
                  } else {
                    setModalStartNoCoin(true);
                  }
                } else {
                  // 배틀취소 추가
                  if (battleButtonText === '배틀취소') {
                    cancelReady();
                    return;
                  }
                  if (props.coin === 'OK') {
                    setModalStart(true);
                  } else {
                    setModalStartNoCoin(true);
                  }
                }
              } else if (props.info.baCode === 3) {
                if (
                  context.me.userPk === props.info.teamA.member[0].userPk ||
                  context.me.userPk === props.info.teamB.member[0].userPk
                ) {
                  props.navigation.navigate('Evaluation', {
                    info: props.info,
                    socket: props.socket,
                  });
                } else {
                  showToast(
                    '리더들의 배틀평가가 진행중입니다.',
                    2000,
                    'center',
                  );
                }
              } else if (props.info.baCode === 4) {
                if (
                  context.me.userPk === props.info.teamA.member[0].userPk &&
                  reStartBattle === true
                ) {
                  reMakeBattle();
                  console.log('배틀다시하기 로직 시작');
                } else {
                  if (battleButtonText === '보상받기') {
                    // 보상받기
                    setModalReward(true);
                  } else {
                    showToast('종료된 배틀입니다.', 2000, 'center');
                  }
                }
              }
            }}
            color={battleButtonText === '배틀완료' ? 'gray' : custom.themeColor}
            disable={false}
            loading={loading}
            size={'large'}
            stretch
          />
        </View>
      </HView>
      <Seperator bottom />
      {props.info.baCode < 3 && !hideOutBtnGuide && (
        <View
          style={{
            backgroundColor: '#303441',
            borderRadius: 5,
            paddingHorizontal: 20,
            paddingTop: 20,
            position: 'absolute',
            bottom: getBottomSpace() + 80,
            left: 20,
            alignItems: 'center',
          }}>
          <Text
            text={'해당 방을 원하지 않을시 방을 나가주세요!'}
            color={'white'}
            fontSize={16}
          />
          <TouchableOpacity
            onPress={async () => {
              await AsyncStorage.setItem(
                'hideOutBtnGuide',
                JSON.stringify(true),
              );
              setHideOutBtnGuide(true);
              global.hideOutBtnGuide = true;
            }}
            style={{padding: 15}}>
            <Text text={'X 다시보지않기'} color={'lightgray'} fontSize={12} />
          </TouchableOpacity>
          <View style={{position: 'absolute', bottom: -18, left: 10}}>
            <Entypo name={'triangle-down'} color={'#303441'} size={26} />
          </View>
        </View>
      )}
      {/* 방장 나가기 버튼 */}
      <Modal
        isVisible={modalExit}
        onBackdropPress={() => setModalExit(false)}
        onModalHide={() => console.log('modal hide')}>
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
            text={'해당 방을 삭제하시겠습니까?'}
          />
          <Seperator height={50} />
          <Text
            fontSize={16}
            color={'dimgray'}
            text={'삭제를 원하지 않으시다면\n리더를 위임하세요!'}
            style={{textAlign: 'center'}}
          />
          <Seperator height={50} />
          <HView>
            <View style={{flex: 1}}>
              <Button
                text={'위임하기'}
                color={'gray'}
                onPress={() => {
                  setModalExit(false);
                  if (props.info.teamA.member.length < 2) {
                    showToast('위임할 유저가 없습니다', 2000, 'center');
                  } else {
                    props.navigation.navigate('BattleTeamMember', {
                      teamSide: 'A',
                      info: props.info,
                      updateBattle: updateBattle,
                    });
                  }
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
                onPress={() => {
                  setModalExit(false);
                  deleteBattle();
                }}
                size={'large'}
                stretch
              />
            </View>
          </HView>
        </View>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => setModalExit(false)}
            style={{
              marginTop: 20,
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: 'white',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <AntDesign name={'close'} size={30} color={'dimgray'} />
          </TouchableOpacity>
        </View>
      </Modal>
      {/* 팀장 팀원 나가기 버튼 */}
      <Modal
        isVisible={modalExit2}
        onBackdropPress={() => setModalExit2(false)}
        onModalHide={() => console.log('modal hide')}>
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
            text={'해당 방을 나가겠습니까?'}
          />
          <Seperator height={50} />
          <HView>
            <View style={{flex: 1}}>
              <Button
                text={'아니오'}
                color={'gray'}
                onPress={() => {
                  setModalExit2(false);
                }}
                size={'large'}
                stretch
              />
            </View>
            <Seperator width={20} />
            <View style={{flex: 1}}>
              <Button
                text={'예'}
                color={custom.themeColor}
                onPress={() => handleExit()}
                size={'large'}
                stretch
              />
            </View>
          </HView>
        </View>
      </Modal>
      {/* 배틀시작 버튼 */}
      <Modal
        isVisible={modalStart}
        onBackdropPress={() => setModalStart(false)}>
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
            style={{textAlign: 'center'}}
            text={
              '코인을 사용하여\n배틀을 시작하시겠습니까?\n더욱 풍부한 보상을\n받으실 수 있습니다.'
            }
          />
          <Seperator height={30} />
          <HView ttyle={{justifyContent: 'center'}}>
            <Text fontSize={16} color={'dimgray'} text={'보유 코인'} />
            <Seperator width={30} />
            <Image
              local
              uri={require('../../../assets/img/icon-coinmoney.png')}
              height={20}
              width={20}
              resizeMode={'cover'}
            />
            <Seperator width={10} />
            <Text
              fontSize={16}
              color={'dimgray'}
              text={context.me.userCoin + ' coin'}
            />
          </HView>
          <Seperator height={10} />
          <HView ttyle={{justifyContent: 'center'}}>
            <Text fontSize={16} color={'dimgray'} text={'보유 포인트'} />
            <Seperator width={30} />
            <Image
              local
              uri={require('../../../assets/img/icon-pointmoney.png')}
              height={20}
              width={20}
              resizeMode={'cover'}
            />
            <Seperator width={10} />
            <Text
              fontSize={16}
              color={'dimgray'}
              text={context.me.userPoint + ' point'}
            />
          </HView>
          <Seperator height={20} />
          {/* <View style={{alignItems: 'center'}}>
            <Button
              size={'medium'}
              text={'랜덤박스 보기'}
              onPress={() => {
                setModalStart(false);
                props.navigation.navigate('RandomBox');
              }}
              color={'white'}
              borderRadius={20}
            />
          </View> */}
          <Seperator height={30} />
          <HView>
            <View style={{flex: 1}}>
              <Button
                text={'아니요'}
                color={'gray'}
                onPress={() => {
                  readyCheck(1);
                }}
                size={'large'}
                stretch
              />
            </View>
            <Seperator width={20} />
            <View style={{flex: 1}}>
              <Button
                text={'예'}
                color={custom.themeColor}
                onPress={() => {
                  readyCheck(2);
                }}
                size={'large'}
                stretch
              />
            </View>
          </HView>
        </View>
      </Modal>
      {/* 코인이 없을때 */}
      <Modal
        isVisible={modalStartNoCoin}
        onBackdropPress={() => setModalStartNoCoin(false)}>
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
            style={{textAlign: 'center'}}
            text={'코인이 없습니다. 코인충전소로 이동하여 충전하시겠습니까?'}
          />
          <Seperator height={30} />
          <HView ttyle={{justifyContent: 'center'}}>
            <Text
              fontSize={16}
              color={'dimgray'}
              text={'코인이 없어도 배틀은 진행됩니다.'}
            />
          </HView>
          <Seperator height={20} />
          <HView>
            <View style={{flex: 1}}>
              <Button
                text={'그냥하기'}
                color={'gray'}
                onPress={() => {
                  readyCheck(3);
                }}
                size={'large'}
                stretch
              />
            </View>
            <Seperator width={20} />
            <View style={{flex: 1}}>
              <Button
                text={'코인충전'}
                color={custom.themeColor}
                onPress={() => {
                  setModalStartNoCoin(false);
                  props.navigation.navigate('CoinCharge');
                }}
                size={'large'}
                stretch
              />
            </View>
          </HView>
        </View>
      </Modal>
      {/* 필수설정이 완료되지 않았을때  */}
      <Modal
        isVisible={modalSettingAlert}
        onBackdropPress={() => setModalSettingAlert(false)}>
        <View
          style={{
            padding: 20,
            backgroundColor: 'white',
            borderRadius: 10,
          }}>
          <View style={{alignItems: 'center', paddingVertical: 10}}>
            <Text
              fontSize={18}
              fontWeight={'bold'}
              color={'black'}
              text={'알림'}
            />
          </View>
          <Seperator height={30} />
          <View style={{alignItems: 'center'}}>
            <Text
              fontSize={16}
              style={{textAlign: 'center'}}
              color={'dimgray'}
              text={'필수설정이 완료되지 않았습니다.\n필수설정을 완료해주세요.'}
            />
          </View>
          <Seperator height={30} />
          <Button
            text={'확인'}
            size={'large'}
            onPress={() => setModalSettingAlert(false)}
            stretch
            color={custom.themeColor}
          />
        </View>
      </Modal>
      {/* 배틀시작일이 현재 날짜와 같지 않을경우  */}
      <Modal
        isVisible={modalDateAlert}
        onBackdropPress={() => setModalDateAlert(false)}>
        <View
          style={{
            padding: 20,
            backgroundColor: 'white',
            borderRadius: 10,
          }}>
          <View style={{alignItems: 'center', paddingVertical: 10}}>
            <Text
              fontSize={18}
              fontWeight={'bold'}
              color={'black'}
              text={'알림'}
            />
          </View>
          <Seperator height={30} />
          <View style={{alignItems: 'center'}}>
            <Text
              fontSize={16}
              style={{textAlign: 'center'}}
              color={'dimgray'}
              text={
                '배틀시작 일자가 아닙니다.\n날짜를 변경하거나, 해당 배틀일자에 실행해주세요.'
              }
            />
          </View>
          <Seperator height={30} />
          <Button
            text={'확인'}
            size={'large'}
            onPress={() => setModalDateAlert(false)}
            stretch
            color={custom.themeColor}
          />
        </View>
      </Modal>
      {/* 필수설정 버튼 */}
      <Modal
        isVisible={modalSetting}
        onBackdropPress={() => setModalSetting(false)}>
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
              text={
                context.me.userPk === props.info.teamA.member[0].userPk
                  ? '필수설정'
                  : '경기정보'
              }
            />
          </View>
          <Seperator height={50} />
          <View>
            <Text text={'장소설정'} fontSize={14} fontWeight={'bold'} />
            <HView>
              <View style={{padding: 10, flex: 1}}>
                {props.info.baPlace.faName === '' ? (
                  <Text
                    text={place.faName || '장소이름'}
                    fontSize={14}
                    color={'dimgray'}
                  />
                ) : (
                  <Text
                    text={place.faName || props.info.baPlace.faName}
                    fontSize={14}
                    color={'dimgray'}
                  />
                )}
              </View>
              {context.me.userPk === props.info.teamA.member[0].userPk && (
                <Button
                  text={'설정하기'}
                  color={'white'}
                  borderRadius={20}
                  paddingVertical={5}
                  onPress={() => {
                    setModalSetting(false);
                    props.navigation.navigate('FullMap', {
                      facilitySearch: true,
                      baPk: props.info.baPk,
                      set: 'set',
                      share: (data) => {
                        setModalSetting(true);
                        setPlace({
                          faPk: data.faPk,
                          faName: data.faName,
                        });
                      },
                    });
                  }}
                  size={'medium'}
                  disable={props.info.baCode >= 3}
                />
              )}
            </HView>
            <Seperator line marginBottom={20} />
            <Text text={'시간'} fontSize={14} fontWeight={'bold'} />
            <DateTime
              mode={'time'}
              closeBar
              value={startTime}
              onChange={(e) => setStartTime(e)}
              borderWidth={0}
              locale={global.lang}
              placeholder={'자세한시간'}
              disable={
                context.me.userPk !== props.info.teamA.member[0].userPk ||
                props.info.baCode >= 3
              }
            />
            <Seperator line marginBottom={20} />
            <Text text={'날짜선택'} fontSize={14} fontWeight={'bold'} />
            <DateTime
              value={date}
              closeBar
              onChange={(e) => setDate(e)}
              borderWidth={0}
              locale={global.lang}
              placeholder={'자세한시간'}
              disable={
                context.me.userPk !== props.info.teamA.member[0].userPk ||
                props.info.baCode >= 3
              }
            />
            <Seperator line />
          </View>
          <Seperator height={50} />
          {context.me.userPk === props.info.teamA.member[0].userPk &&
          props.info.baCode < 3 ? (
            <HView>
              <View style={{flex: 1}}>
                <Button
                  text={'취소'}
                  color={'gray'}
                  onPress={() => setModalSetting(false)}
                  size={'large'}
                  stretch
                />
              </View>
              <Seperator width={20} />
              <View style={{flex: 1}}>
                <Button
                  text={'적용'}
                  color={custom.themeColor}
                  onPress={() => {
                    updateBattle(
                      {
                        baPlace: place,
                        baStartTime: moment(startTime).format('HH:mm'),
                        baDate: date,
                      },
                      true,
                    );
                    setModalSetting(false);
                  }}
                  size={'large'}
                  loading={loading}
                  stretch
                />
              </View>
            </HView>
          ) : (
            <Button
              text={'확인'}
              size={'large'}
              onPress={() => setModalSetting(false)}
              stretch
              color={custom.themeColor}
            />
          )}
        </View>
      </Modal>
      {/* 보상받기 */}
      <Modal
        isVisible={modalReward}
        onBackdropPress={() => setModalReward(false)}>
        <Reward
          closeModal={() => setModalReward(false)}
          baPk={props.info.baPk}
          coinType={
            foundedAtTeamA !== -1
              ? props.info.teamA.member[foundedAtTeamA]?.coinType
              : foundedAtTeamB !== -1
              ? props.info.teamB.member[foundedAtTeamB]?.coinType
              : null
          }
          result={
            (foundedAtTeamA !== -1 && props.info.baResultA === '1') ||
            (foundedAtTeamB !== -1 && props.info.baResultB === '1')
              ? 'win'
              : (foundedAtTeamA !== -1 && props.info.baResultA === '2') ||
                (foundedAtTeamB !== -1 && props.info.baResultB === '2')
              ? 'lose'
              : null
          }
        />
      </Modal>
    </Container>
  );
}
