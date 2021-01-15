import React from 'react';
import {
  HView,
  Seperator,
  Text,
  Modal,
  Button,
  Image,
  TextInput,
  Container,
  Loader,
} from '../../react-native-nuno-ui';
import {View, TouchableOpacity} from 'react-native';
import {custom} from '../../config';
import StarRating from 'react-native-star-rating';
import Icons from '../Icons';
import {AppContext} from '../../context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MySports from '../MySports';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Axios from 'axios';
import {logApi, showToast} from '../../react-native-nuno-ui/funcs';
import {screenWidth} from '../../styles';
import TextTicker from 'react-native-text-ticker';

export default function MatchMember(props) {
  const context = React.useContext(AppContext);
  const [memberModal, setMemberModal] = React.useState(false);
  const [editNameModal, setEditNameModal] = React.useState(false);
  const [memberOutModal, setMemberOutModal] = React.useState(false);
  const [switchAlert, setSwitchAlert] = React.useState(false);
  const [alertTitle, setAlertTitle] = React.useState('');
  const [alertText, setAlertText] = React.useState('');
  const [name, setName] = React.useState('');
  const [selectedTeam, setSelectedTeam] = React.useState('A');
  const [memberModalTeam, setMemberModalTeam] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [aReady, setAReady] = React.useState(false);
  const [bReady, setBReady] = React.useState(false);
  const [leaderA, setLeaderA] = React.useState(
    props.info?.teamA?.member[0]?.userPk,
  );
  const [leaderB, setLeaderB] = React.useState(
    props.info?.teamB?.member[0]?.userPk,
  );

  React.useEffect(() => {
    const newLeaderA = props.info?.teamA?.member[0]?.userPk;
    const newLeaderB = props.info?.teamB?.member[0]?.userPk;
    console.log('leaderA' + leaderA);
    console.log('newLeaderA' + newLeaderA);
    console.log('context.me.userPk' + context.me.userPk);
    console.log('newLeaderB' + newLeaderB);
    if (leaderA !== newLeaderA) {
      if (context.me.userPk === newLeaderA) {
        showToast('리더를 위임 받았습니다.', 2000, 'center');
      }
    }
    if (leaderB !== newLeaderB) {
      if (context.me.userPk === newLeaderB) {
        showToast('리더를 위임 받았습니다.', 2000, 'center');
      }
    }
    setLeaderA(props.info?.teamA?.member[0]?.userPk);
    setLeaderB(props.info?.teamB?.member[0]?.userPk);
  }, [
    props.info?.teamA?.member[0]?.userPk,
    props.info?.teamB?.member[0]?.userPk,
  ]);

  const updateBattle = (data) => {
    props.socket.send(
      `/battle/${props.info.baPk}`,
      {},
      JSON.stringify({
        baPk: props.info.baPk,
        ...data,
      }),
    );
  };
  const kickUser = async (userPk, baPk) => {
    // console.log('userPk : ' + userPk);
    // console.log('baPk : ' + baPk);
    Axios.post('fcmMemberDelete', {
      userPk: userPk,
      baPk: baPk,
    })
      .then((res) => {
        logApi('kickUser success', res.data);
      })
      .catch((err) => {
        logApi('kickUser error', err?.response);
      });
  };
  const memberSwitch = async () => {
    const foundedAtTeamA = props.info.teamA.member
      .map((e) => e.userPk)
      .indexOf(context.me.userPk);
    const foundedAtTeamB = props.info.teamB.member
      .map((e) => e.userPk)
      .indexOf(context.me.userPk);
    if (foundedAtTeamA !== -1) {
      if (foundedAtTeamA === 0) {
        setAlertTitle('알림');
        setAlertText('리더변경을 해야만 변경이 가능합니다.');
        setSwitchAlert(true);
        return;
      }
      // if (
      //   props.info.teamB.member.length ===
      //   JSON.parse(props.info.btName.split(' ')[0])
      // ) {
      //   setAlertTitle('알림');
      //   setAlertText('B팀의 정원 초과 입니다.');
      //   setSwitchAlert(true);
      //   return;
      // } else {

      // }
      const teamA = {...props.info.teamA};
      const teamB = {...props.info.teamB};
      teamB.member.push(teamA.member[foundedAtTeamA]);
      teamA.member.splice(foundedAtTeamA, 1);

      await updateBattle({teamA: teamA, teamB: teamB});
    }

    if (foundedAtTeamB !== -1) {
      if (foundedAtTeamB === 0) {
        setAlertTitle('알림');
        setAlertText('리더위임을 해야만 변경이 가능합니다.');
        setSwitchAlert(true);
        return;
      }
      const teamA = {...props.info.teamA};
      const teamB = {...props.info.teamB};
      teamA.member.push(teamB.member[foundedAtTeamB]);
      teamB.member.splice(foundedAtTeamB, 1);

      await updateBattle({teamA: teamA, teamB: teamB});
    }
    showToast('팀이 변경되었습니다.', 2000, 'center');
  };
  return loading ? (
    <Loader />
  ) : (
    <Container
      alertVisible={switchAlert}
      alertTitle={alertTitle}
      alertText={alertText}
      onConfirm={() => setSwitchAlert(false)}
      onBackdropPress={() => setSwitchAlert(false)}
      nonFlex={true}>
      {props.info.teamA?.name === '' ? (
        <HView
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingBottom: 10,
          }}>
          <View
            style={{
              flex: 0.4,
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                if (props.info.teamA.member.length > 0) {
                  setMemberModalTeam(props.info.teamA);
                  setMemberModal(true);
                }
              }}>
              {props.info.teamA?.member[0]?.userImgUrl ? (
                <Image
                  uri={props.info.teamA.member[0]?.userImgUrl}
                  width={72}
                  height={72}
                  borderRadius={36}
                />
              ) : (
                <Image
                  local
                  uri={require('../../../assets/img/user_boy.png')}
                  width={72}
                  height={72}
                  borderRadius={36}
                />
              )}
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  local
                  uri={
                    props.info.baResultA === '1'
                      ? require('../../../assets/img/icon-win.png')
                      : props.info.baResultA === '2'
                      ? require('../../../assets/img/icon-lose.png')
                      : props.info.teamA?.member[0]?.ready === 'Y' &&
                        props.info.baCode < 3
                      ? require('../../../assets/img/icon-ready.png')
                      : props.info.baCode === 3 &&
                        require('../../../assets/img/icon-battle.png')
                  }
                  width={100}
                  height={100}
                />
              </View>
            </TouchableOpacity>
            <Seperator height={10} />
            <Text
              text={props.info.teamA?.member[0]?.userName}
              fontWeight={'500'}
              fontSize={16}
            />
            {/* 아래는 오른쪽 강퇴하기 버튼과 같이 높이를 맞추기위한 fake button */}
            {props.info.teamA?.member[0].userPk === context.me.userPk &&
              props.info.baCode < 3 && (
                <View>
                  <Seperator height={10} />
                  <Button
                    text={''}
                    color={'white'}
                    borderColor={'white'}
                    borderRadius={20}
                    size={'medium'}
                    onPress={() => null}
                  />
                </View>
              )}
          </View>
          <View style={{flex: 0.2, alignItems: 'center'}}>
            <Text text={'VS'} fontWeight={'bold'} fontSize={24} />
          </View>
          <View
            style={{
              flex: 0.4,
              alignItems: 'center',
            }}>
            <View>
              {props.info.teamB?.member.length === 0 ? (
                <Text
                  text={'대결상대가\n없습니다'}
                  fontSize={18}
                  fontWeight={'bold'}
                  style={{textAlign: 'center'}}
                />
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    if (props.info.teamB.member.length > 0) {
                      setMemberModalTeam(props.info.teamB);
                      setMemberModal(true);
                    }
                  }}>
                  {props.info.teamB?.member[0]?.userImgUrl ? (
                    <Image
                      uri={props.info.teamB.member[0]?.userImgUrl}
                      width={72}
                      height={72}
                      borderRadius={36}
                    />
                  ) : (
                    <Image
                      local
                      uri={require('../../../assets/img/user_boy.png')}
                      width={72}
                      height={72}
                      borderRadius={36}
                    />
                  )}
                  <View
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image
                      local
                      uri={
                        props.info.baResultB === '1'
                          ? require('../../../assets/img/icon-win.png')
                          : props.info.baResultB === '2'
                          ? require('../../../assets/img/icon-lose.png')
                          : props.info.teamB?.member[0]?.ready === 'Y' &&
                            props.info.baCode < 3
                          ? require('../../../assets/img/icon-ready.png')
                          : props.info.baCode === 3 &&
                            require('../../../assets/img/icon-battle.png')
                      }
                      width={100}
                      height={100}
                    />
                  </View>
                </TouchableOpacity>
              )}
            </View>
            <Seperator height={10} />
            <Text
              text={props.info.teamB?.member[0]?.userName}
              fontWeight={'500'}
              fontSize={16}
              style={{textAlign: 'center'}}
            />
            {props.info.teamB?.member.length > 0 &&
              context.me.userPk !== props.info.teamB?.member[0].userPk &&
              props.info.baCode < 3 && (
                <View>
                  <Seperator height={10} />
                  <Button
                    text={'강퇴하기'}
                    color={'white'}
                    borderRadius={20}
                    size={'medium'}
                    onPress={() => setMemberOutModal(true)}
                  />
                </View>
              )}
          </View>
        </HView>
      ) : (
        <HView
          style={{
            justifyContent: 'center',
            paddingHorizontal: 20,
          }}>
          <TouchableOpacity
            onPress={() => {
              setSelectedTeam('A');
              setMemberModalTeam(props.info.teamA);
              props.navigation.navigate('BattleTeamMember', {
                teamSide: 'A',
                info: props.info,
                updateBattle: updateBattle,
              });
            }}
            style={{
              flex: 0.4,
              alignItems: 'center',
              padding: 10,
              borderWidth: 1,
              borderColor: 'lightgray',
              borderRadius: 10,
            }}>
            <Text
              text={'Team'}
              fontSize={16}
              color={'#FE7262'}
              fontWeight={'500'}
            />
            <Seperator height={10} />
            <TextTicker
              style={{
                color: '#FE7262',
                fontSize: 34,
                fontWeight: 'bold',
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              duration={4000}
              loop
              repeatSpacer={50}
              marqueeDelay={1000}>
              {props.info.teamA.name}
            </TextTicker>
            <Seperator height={10} />
            {context.me.userPk === props.info?.teamA?.member[0]?.userPk ? (
              <TouchableOpacity
                onPress={() => {
                  if (
                    context.me.userPk === props.info?.teamA?.member[0]?.userPk
                  ) {
                    setSelectedTeam('A');
                    setEditNameModal(true);
                  }
                }}
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: 'lightgray',
                  borderRadius: 20,
                  zIndex: 1,
                }}>
                <MaterialCommunityIcons
                  name={'lead-pencil'}
                  size={14}
                  color={'gray'}
                />
                <Seperator width={10} />
                <Text text={'이름 수정'} fontSize={14} color={'gray'} />
              </TouchableOpacity>
            ) : (
              <View
                style={{
                  paddingVertical: 5,
                }}>
                <Text text={''} fontSize={14} />
              </View>
            )}
            <Seperator height={10} />
            <View style={{paddingVertical: 10, paddingHorizontal: 20}}>
              <Text
                text={`참가인원 ${props.info.teamA?.member.length}명`}
                fontSize={14}
                fontWeight={'500'}
              />
            </View>
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                local
                uri={
                  props.info.baResultA === '1'
                    ? require('../../../assets/img/icon-win.png')
                    : props.info.baResultA === '2'
                    ? require('../../../assets/img/icon-lose.png')
                    : props.info.teamA?.member.findIndex(
                        (e) => e.ready === 'N',
                      ) === -1 && props.info.baCode < 3
                    ? require('../../../assets/img/icon-ready.png')
                    : props.info.baCode === 3 &&
                      require('../../../assets/img/icon-battle.png')
                }
                width={100}
                height={100}
              />
            </View>
          </TouchableOpacity>
          <View style={{flex: 0.2, alignItems: 'center'}}>
            <Text text={'VS'} fontWeight={'bold'} fontSize={24} />
            <Seperator height={20} />
            <TouchableOpacity
              onPress={() =>
                props.info.baCode < 3
                  ? memberSwitch()
                  : showToast(
                      '배틀시작 이후로는 팀 변경이 불가능합니다.',
                      2000,
                      'center',
                    )
              }>
              <Image
                local
                uri={require('../../../assets/img/icon-change.png')}
                width={26}
                height={26}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              if (props.info.teamB.member.length > 0) {
                setSelectedTeam('B');
                setMemberModalTeam(props.info.teamB);
                props.navigation.navigate('BattleTeamMember', {
                  teamSide: 'B',
                  info: props.info,
                  updateBattle: updateBattle,
                });
              }
            }}
            style={{
              flex: 0.4,
              alignItems: 'center',
              padding: 10,
              borderWidth: 1,
              borderColor: 'lightgray',
              borderRadius: 10,
            }}>
            <Text
              text={'Team'}
              fontSize={16}
              color={'#0752AB'}
              fontWeight={'500'}
            />
            <Seperator height={10} />
            <TextTicker
              style={{
                color: '#0752AB',
                fontSize: 34,
                fontWeight: 'bold',
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              duration={4000}
              loop
              repeatSpacer={50}
              marqueeDelay={1000}>
              {props.info.teamB.name}
            </TextTicker>
            <Seperator height={10} />
            {context.me.userPk === props.info?.teamB?.member[0]?.userPk ? (
              <TouchableOpacity
                onPress={() => {
                  setSelectedTeam('B');
                  setEditNameModal(true);
                }}
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: 'lightgray',
                  borderRadius: 20,
                  zIndex: 1,
                }}>
                <MaterialCommunityIcons
                  name={'lead-pencil'}
                  size={14}
                  color={'gray'}
                />
                <Seperator width={10} />
                <Text text={'이름 수정'} fontSize={14} color={'gray'} />
              </TouchableOpacity>
            ) : (
              <View
                style={{
                  paddingVertical: 5,
                }}>
                <Text text={''} fontSize={14} />
              </View>
            )}
            <Seperator height={10} />
            <View style={{paddingVertical: 10, paddingHorizontal: 20}}>
              <Text
                text={`참가인원 ${props.info.teamB?.member.length}명`}
                fontSize={14}
                fontWeight={'500'}
              />
            </View>
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                local
                uri={
                  props.info.baResultB === '1'
                    ? require('../../../assets/img/icon-win.png')
                    : props.info.baResultB === '2'
                    ? require('../../../assets/img/icon-lose.png')
                    : props.info.teamB?.member?.findIndex(
                        (e) => e.ready === 'N',
                      ) === -1 &&
                      props.info.baCode < 3 &&
                      props.info.teamB.member.length !== 0
                    ? require('../../../assets/img/icon-ready.png')
                    : props.info.baCode === 3 &&
                      require('../../../assets/img/icon-battle.png')
                }
                width={100}
                height={100}
              />
            </View>
          </TouchableOpacity>
        </HView>
      )}

      <Modal
        isVisible={editNameModal}
        onBackdropPress={() => setEditNameModal(false)}>
        <View
          style={{
            padding: 20,
            backgroundColor: 'white',
            borderRadius: 10,
            // alignItems: 'center',
          }}>
          <View style={{alignItems: 'center', paddingVertical: 10}}>
            <Text
              fontSize={18}
              fontWeight={'bold'}
              color={'black'}
              text={'이름 수정'}
            />
          </View>
          <Seperator height={30} />
          <View>
            <TextInput
              maxLength={8}
              value={name}
              onChangeText={(e) => setName(e)}
              placeholder={'수정할 팀이름을 입력해주세요'}
            />
          </View>
          <Seperator height={20} />
          <HView>
            <View style={{flex: 1}}>
              <Button
                text={'취소'}
                color={'gray'}
                onPress={() => {
                  setEditNameModal(false);
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
                onPress={async () => {
                  if (name.length > 0) {
                    if (selectedTeam === 'A') {
                      const team = {...props.info.teamA};
                      team.name = name;
                      await updateBattle({teamA: team});
                    }
                    if (selectedTeam === 'B') {
                      const team = {...props.info.teamB};
                      team.name = name;
                      await updateBattle({teamB: team});
                    }
                    setEditNameModal(false);
                  }
                }}
                size={'large'}
                stretch
              />
            </View>
          </HView>
        </View>
      </Modal>

      {/* 프로필 보기 */}
      <Modal
        isVisible={memberModal}
        onBackdropPress={() => setMemberModal(false)}>
        <View
          style={{
            padding: 20,
            backgroundColor: 'white',
            borderRadius: 10,
            alignItems: 'center',
          }}>
          {memberModalTeam?.member[0]?.userImgUrl ? (
            <Image
              uri={memberModalTeam?.member[0]?.userImgUrl}
              width={72}
              height={72}
              borderRadius={36}
            />
          ) : (
            <Image
              local
              uri={require('../../../assets/img/user_boy.png')}
              width={72}
              height={72}
              borderRadius={36}
            />
          )}
          <View style={{paddingVertical: 8}}>
            <StarRating
              disabled={true}
              maxStars={5}
              rating={memberModalTeam?.member[0]?.userScope}
              starSize={11}
              emptyStarColor={custom.themeColor}
              halfStarEnabled={true}
              halfStarColor={custom.themeColor}
              fullStarColor={custom.themeColor}
            />
          </View>
          <Text
            fontSize={18}
            fontWeight={'bold'}
            color={'black'}
            text={memberModalTeam?.member[0]?.userName}
          />
          <Seperator height={10} />
          <MySports userSport={memberModalTeam?.member[0]?.userSport} />
          <Seperator height={20} />
          <Text
            fontSize={14}
            // color={'gray'}
            text={`전체 승률: ${memberModalTeam?.member[0]?.winrate}% (${memberModalTeam?.member[0]?.ago}전 ${memberModalTeam?.member[0]?.win}승 ${memberModalTeam?.member[0]?.lose}패)`}
          />
          <Seperator height={10} />
          <Text
            fontSize={14}
            // color={'gray'}
            text={`소개: ${memberModalTeam?.member[0]?.userIntro}`}
          />

          <Seperator height={50} />
          <Button
            text={'확인'}
            size={'large'}
            color={custom.themeColor}
            onPress={() => {
              setMemberModalTeam();
              setMemberModal(false);
            }}
            stretch
          />
          {/* 신고 */}
          {context.me.userPk !== memberModalTeam?.member[0]?.userPk && (
            <View style={{position: 'absolute', top: 20, right: 20}}>
              <TouchableOpacity
                onPress={() => {
                  setMemberModal(false);
                  props.navigation.navigate('Report', {
                    type: 1,
                    userPk: memberModalTeam?.member[0]?.userPk,
                    userName: memberModalTeam?.member[0]?.userName,
                    userImgUrl: memberModalTeam?.member[0]?.userImgUrl,
                  });
                }}
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icons
                  name={'icon-declare-15'}
                  color={custom.themeColor}
                  size={15}
                />
                <Seperator width={9} />
                <Text text={'신고'} fontSize={15} color={'gray'} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Modal>

      {/* 개인 강퇴 */}
      <Modal
        isVisible={memberOutModal}
        onBackdropPress={() => setMemberOutModal(false)}>
        <View
          style={{
            padding: 20,
            backgroundColor: 'white',
            borderRadius: 10,
            alignItems: 'center',
          }}>
          <View style={{padding: 20}}>
            <View style={{alignItems: 'center'}}>
              <Text text={'강퇴하기'} fontWeight={'bold'} fontSize={18} />
            </View>
          </View>
          <Seperator height={10} />
          <Text
            fontSize={16}
            color={'dimgray'}
            text={'해당 유저를 강퇴하시겠습니까?'}
            style={{textAlign: 'center'}}
          />
          <Seperator height={30} />
          <HView>
            <View style={{flex: 1}}>
              <Button
                text={'취소'}
                color={'gray'}
                onPress={() => {
                  setMemberOutModal(false);
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
                onPress={async () => {
                  const teamB = {...props.info.teamB};
                  const localHistory = [
                    ...props.info.history.map((h) => ({
                      userPk: h.userPk,
                    })),
                  ];
                  if (
                    localHistory
                      .map((e) => e.userPk)
                      .indexOf(teamB.member[0].userPk) === -1
                  ) {
                    localHistory.push({userPk: teamB.member[0].userPk});
                  }
                  teamB.member = [];
                  await updateBattle({teamB: teamB, history: localHistory});
                  kickUser(props.info.teamB.member[0].userPk, props.info.baPk);
                  setMemberOutModal(false);
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
