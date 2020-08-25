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
} from 'react-native-nuno-ui';
import {View, TouchableOpacity} from 'react-native';
import {custom} from '../../config';
import StarRating from 'react-native-star-rating';
import Icons from '../Icons';
import {AppContext} from '../../context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MySports from '../MySports';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Axios from 'axios';
import {logApi} from 'react-native-nuno-ui/funcs';

export default function MatchMember(props) {
  const context = React.useContext(AppContext);
  const [memberModal, setMemberModal] = React.useState(false);
  const [teamMemberModal, setTeamMemberModal] = React.useState(false);
  const [editNameModal, setEditNameModal] = React.useState(false);
  const [memberOutModal, setMemberOutModal] = React.useState(false);
  const [switchAlert, setSwitchAlert] = React.useState(false);
  const [alertTitle, setAlertTitle] = React.useState('');
  const [alertText, setAlertText] = React.useState('');
  const [name, setName] = React.useState('');
  const [selectedTeam, setSelectedTeam] = React.useState('A');
  const [memberModalTeam, setMemberModalTeam] = React.useState();
  const [loading, setLoading] = React.useState(false);

  const updateBattle = (data) => {
    props.socket.send(
      `/battle/${props.info.baPk}`,
      {},
      JSON.stringify({
        baPk: props.info.baPk,
        ...data,
      }),
    );
    // await Axios.post('updateBattle', {
    //   baPk: props.info.baPk,
    //   ...data,
    // })
    //   .then((res) => {
    //     logApi('updateBattle', res.data);
    //     setLoading(false);
    //     setName('');
    //     props.refreshBattleView && props.refreshBattleView();
    //   })
    //   .catch((err) => {
    //     logApi('updateBattle error', err.response);
    //     setLoading(false);
    //   });
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
        setAlertText('방장위임을 해야만 변경이 가능합니다.');
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
        setAlertText('팀장위임을 해야만 변경이 가능합니다.');
        setSwitchAlert(true);
        return;
      }
      const teamA = {...props.info.teamA};
      const teamB = {...props.info.teamB};
      teamA.member.push(teamB.member[foundedAtTeamB]);
      teamB.member.splice(foundedAtTeamB, 1);

      await updateBattle({teamA: teamA, teamB: teamB});
    }
  };
  return (
    <Container
      alertVisible={switchAlert}
      alertTitle={alertTitle}
      alertText={alertText}
      onConfirm={() => setSwitchAlert(false)}
      onBackdropPress={() => setSwitchAlert(false)}
      nonFlex={true}>
      {props.info.teamA?.name === '' ? (
        <HView style={{justifyContent: 'center', alignItems: 'flex-start'}}>
          <View
            style={{
              alignItems: 'center',
              width: 100,
              // height: 100,
              paddingTop: 14,
            }}>
            {props.info.teamA?.member[0]?.userImgUrl ? (
              <Image
                uri={props.info.teamA.member[0]?.userImgUrl}
                width={72}
                height={72}
                borderRadius={36}
                onPress={() => {
                  if (props.info.teamA.member.length > 0) {
                    setMemberModalTeam(props.info.teamA);
                    setMemberModal(true);
                  }
                }}
              />
            ) : (
              <Image
                local
                uri={require('../../../assets/img/user_boy.png')}
                width={72}
                height={72}
                borderRadius={36}
                onPress={() => {
                  if (props.info.teamA?.member.length > 0) {
                    setMemberModalTeam(props.info.teamA);
                    setMemberModal(true);
                  }
                }}
              />
            )}
            <Seperator height={10} />
            <Text
              text={props.info.teamA?.member[0]?.userName}
              fontWeight={'500'}
              fontSize={16}
            />
            {/* <View style={{height: 150}} /> */}
          </View>
          <View style={{padding: 30}}>
            <Text text={'VS'} fontWeight={'bold'} fontSize={24} />
          </View>
          <View
            style={{
              alignItems: 'center',
              width: 100,
              // height: 100,
              paddingTop: 14,
            }}>
            {props.info.teamB?.member[0]?.userImgUrl ? (
              <Image
                uri={props.info.teamB.member[0]?.userImgUrl}
                width={72}
                height={72}
                borderRadius={36}
                onPress={() => {
                  if (props.info.teamB.member.length > 0) {
                    setMemberModalTeam(props.info.teamB);
                    setMemberModal(true);
                  }
                }}
              />
            ) : (
              <Image
                local
                uri={require('../../../assets/img/user_boy.png')}
                width={72}
                height={72}
                borderRadius={36}
                onPress={() => {
                  if (props.info.teamB?.member.length > 0) {
                    setMemberModalTeam(props.info.teamB);
                    setMemberModal(true);
                  }
                }}
              />
            )}
            {props.info.teamB?.member[0]?.ready === 'Y' && (
              <View style={{position: 'absolute', top: 0, left: 0}}>
                <Image
                  local
                  uri={require('../../../assets/img/icon-ready.png')}
                  width={100}
                  height={100}
                />
              </View>
            )}

            <Seperator height={10} />
            <Text
              text={props.info.teamB?.member[0]?.userName}
              fontWeight={'500'}
              fontSize={16}
            />
            {props.info.teamB?.member.length > 0 &&
              context.me.userPk !== props.info.teamB?.member[0].userPk && (
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
        <HView style={{justifyContent: 'center'}}>
          <View
            style={{
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
            <Text
              text={props.info.teamA.name}
              fontSize={36}
              color={'#FE7262'}
              fontWeight={'bold'}
            />
            <Seperator height={10} />
            {context.me.userPk === props.info?.teamA?.member[0]?.userPk && (
              <TouchableOpacity
                onPress={() => {
                  setSelectedTeam('A');
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
                }}>
                <MaterialCommunityIcons
                  name={'lead-pencil'}
                  size={14}
                  color={'gray'}
                />
                <Seperator width={10} />
                <Text text={'이름 수정'} fontSize={14} color={'gray'} />
              </TouchableOpacity>
            )}
            <Seperator height={10} />
            <TouchableOpacity
              onPress={() => {
                setSelectedTeam('A');
                setMemberModalTeam(props.info.teamA);
                // setTeamMemberModal(true);
                props.navigation.navigate('BattleTeamMember', {
                  teamSide: 'A',
                  team: props.info.teamA,
                });
              }}
              style={{paddingVertical: 10, paddingHorizontal: 20}}>
              <Text
                text={`참가인원 ${props.info.teamA?.member.length}명`}
                fontSize={14}
                fontWeight={'500'}
              />
            </TouchableOpacity>
          </View>
          <View style={{padding: 30}}>
            <Text text={'VS'} fontWeight={'bold'} fontSize={24} />
            <Seperator height={20} />
            <TouchableOpacity onPress={() => memberSwitch()}>
              <Image
                local
                uri={require('../../../assets/img/icon-change.png')}
                width={26}
                height={26}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
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
            <Text
              text={props.info.teamB.name}
              fontSize={36}
              color={'#0752AB'}
              fontWeight={'bold'}
            />
            <Seperator height={10} />
            {(context.me.userPk === props.info?.teamB?.member[0]?.userPk ||
              context.me.userPk === props.info?.teamA?.member[0]?.userPk) && (
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
                }}>
                <MaterialCommunityIcons
                  name={'lead-pencil'}
                  size={14}
                  color={'gray'}
                />
                <Seperator width={10} />
                <Text text={'이름 수정'} fontSize={14} color={'gray'} />
              </TouchableOpacity>
            )}
            <Seperator height={10} />
            <TouchableOpacity
              onPress={() => {
                if (props.info.teamB.member.length > 0) {
                  setSelectedTeam('B');
                  setMemberModalTeam(props.info.teamB);
                  // setTeamMemberModal(true);
                  props.navigation.navigate('BattleTeamMember', {
                    teamSide: 'B',
                    team: props.info.teamB,
                    updateBattle: updateBattle,
                  });
                }
              }}
              style={{paddingVertical: 10, paddingHorizontal: 20}}>
              <Text
                text={`참가인원 ${props.info.teamB?.member.length}명`}
                fontSize={14}
                fontWeight={'500'}
              />
            </TouchableOpacity>
          </View>
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
              maxLength={15}
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
                }}
                size={'large'}
                stretch
              />
            </View>
          </HView>
        </View>
      </Modal>

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
      <Modal
        isVisible={teamMemberModal}
        onBackdropPress={() => setTeamMemberModal(false)}>
        <View
          style={{
            padding: 20,
            backgroundColor: 'white',
            borderRadius: 10,
            // alignItems: 'center',
          }}>
          <View style={{alignItems: 'center'}}>
            {selectedTeam === 'A' ? (
              <Text text={'A팀'} fontSize={18} fontWeight={'bold'} />
            ) : (
              <Text text={'B팀'} fontSize={18} fontWeight={'bold'} />
            )}
          </View>

          <Seperator height={30} />
          {/* <View>
            <HView style={{flexWrap: 'wrap', justifyContent: 'flex-start'}}>
              {memberModalTeam?.member.map((e, i) => {
                return (
                  <TouchableOpacity
                    key={i}
                    onPress={() => null}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: 'whitesmoke',
                      padding: 12,
                      borderRadius: 5,
                      marginRight: 10,
                      marginBottom: 10,
                    }}>
                    <Text
                      text={e.userName}
                      fontSize={14}
                      fontWeight={'500'}
                      color={'dimgray'}
                    />
                    {i !== 0 &&
                      (context.me.userPk ===
                        props.info?.teamA?.member[0].userPk ||
                        context.me.userPk ===
                          props.info?.teamB?.member[0].userPk) && (
                        <TouchableOpacity
                          onPress={() => {
                            if (selectedTeam === 'A') {
                              const teamA = {...memberModalTeam};
                              const foundedIndex = teamA.member
                                .map((f) => f.userPk)
                                .indexOf(e.userPk);
                              if (foundedIndex !== -1) {
                                const history = [
                                  ...props.info.history.map((h) => ({
                                    userPk: h.userPk,
                                  })),
                                ];
                                history.push({
                                  userPk: teamA.member[foundedIndex].userPk,
                                });
                                teamA.member.splice(foundedIndex, 1);

                                updateBattle({teamA: teamA, history: history});
                              }
                            }
                            if (selectedTeam === 'B') {
                              const teamB = {...memberModalTeam};
                              const foundedIndex = teamB.member
                                .map((f) => f.userPk)
                                .indexOf(e.userPk);
                              if (foundedIndex !== -1) {
                                const history = [
                                  ...props.info.history.map((h) => ({
                                    userPk: h.userPk,
                                  })),
                                ];
                                history.push({
                                  userPk: teamB.member[foundedIndex].userPk,
                                });
                                teamB.member.splice(foundedIndex, 1);
                                updateBattle({teamB: teamB, history: history});
                              }
                            }
                          }}
                          style={{paddingLeft: 20}}>
                          <AntDesign
                            name={'close'}
                            size={13}
                            color={'dimgray'}
                          />
                        </TouchableOpacity>
                      )}
                    {i === 0 && (
                      <View
                        style={{
                          position: 'absolute',
                          top: -15,
                          right: -7,
                          backgroundColor: custom.themeColor,
                          borderRadius: 5,
                          padding: 5,
                        }}>
                        <Text
                          text={selectedTeam === 'A' ? '팀장' : '방장'}
                          fontSize={12}
                          color={'white'}
                        />
                      </View>
                    )}
                    {e.ready === 'Y' && (
                      <View
                        style={{
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          right: 0,
                          bottom: 0,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Image
                          local
                          uri={require('../../../assets/img/icon-readymark.png')}
                          width={30}
                          height={30}
                        />
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </HView>
          </View> */}
          <Seperator height={30} />

          <HView>
            <View style={{flex: 1}}>
              <Button
                text={'취소'}
                size={'large'}
                color={custom.themeColor}
                onPress={() => {
                  setMemberModalTeam();
                  setTeamMemberModal(false);
                }}
                stretch
              />
            </View>
            <Seperator width={20} />
            <View style={{flex: 1}}>
              <Button
                text={'확인'}
                color={custom.themeColor}
                onPress={() => {
                  setMemberModalTeam();
                  setTeamMemberModal(false);
                }}
                size={'large'}
                stretch
              />
            </View>
          </HView>
          {/* 팀장위임 */}
          {context.me.userPk === memberModalTeam?.member[0].userPk && (
            <View style={{position: 'absolute', top: 20, right: 20}}>
              <TouchableOpacity
                onPress={() => {}}
                style={{paddingVertical: 2, paddingHorizontal: 20}}>
                <Text
                  text={'팀장 위임'}
                  fontSize={16}
                  color={custom.themeColor}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Modal>
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
                  const history = [
                    ...props.info.history.map((h) => ({
                      userPk: h.userPk,
                    })),
                  ];
                  history.push({userPk: teamB.member[0].userPk});
                  teamB.member = [];
                  await updateBattle({teamB: teamB, history: history});
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
