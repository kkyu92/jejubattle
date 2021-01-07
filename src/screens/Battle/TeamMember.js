import React from 'react';
import {
  Container,
  Text,
  Header,
  Seperator,
  HView,
  Button,
  Image,
  Checkbox,
  Modal,
} from '../../react-native-nuno-ui';
import {TouchableOpacity, View, ScrollView} from 'react-native';
import {custom} from '../../config';
import Axios from 'axios';
import {logApi, showToast, swap} from '../../react-native-nuno-ui/funcs';
import {AppContext} from '../../context';
import {sports1Table} from '../../constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {screenWidth} from '../../styles';
import StarRating from 'react-native-star-rating';
import MySports from '../../commons/MySports';
import Icons from '../../commons/Icons';

export default function BattleTeamMember(props) {
  const context = React.useContext(AppContext);
  const [memberModal, setMemberModal] = React.useState(false);
  const [memberOutTeamModal, setMemberOutTeamModal] = React.useState(false);
  const [selectedMember, setSelectedMember] = React.useState({});
  const [mode, setMode] = React.useState('');
  const [selectedTeam, setSelectedTeam] = React.useState(
    props.route.params.teamSide === 'A'
      ? props.route.params.info.teamA
      : props.route.params.info.teamB,
  );

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

  return (
    <Container>
      <Header
        left={'close'}
        title={`${selectedTeam?.name} 팀`}
        navigation={props.navigation}
        rightComponent={
          <TouchableOpacity
            onPress={() => setMode('select')}
            style={{
              paddingHorizontal: 20,
              paddingVertical: 5,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              text={
                selectedTeam.member[0].userPk === context.me.userPk
                  ? '리더변경'
                  : ''
              }
              // text={
              //   selectedTeam.member[0].userPk === context.me.userPk
              //     ? props.route.params.teamSide === 'A'
              //       ? '방장위임'
              //       : '팀장위임'
              //     : ''
              // }
              color={custom.themeColor}
              fontSize={17}
            />
          </TouchableOpacity>
        }
      />
      <ScrollView>
        <View style={{padding: 20}}>
          <HView style={{flexWrap: 'wrap', justifyContent: 'flex-start'}}>
            {selectedTeam?.member.map((e, i) => {
              return (
                <HView key={i} style={{marginRight: 10, marginBottom: 10}}>
                  <Button
                    text={e.userName}
                    onPress={() => {
                      if (mode === 'select') {
                        if (i !== 0) {
                          const temp = {...selectedTeam};
                          temp.member.map((t, ti) => {
                            if (ti === i) {
                              t.selected = true;
                            } else {
                              t.selected = false;
                            }
                          });
                          setSelectedTeam(temp);
                        }
                      } else {
                        setSelectedMember(e);
                        setMemberModal(true);
                      }
                    }}
                    color={
                      mode === 'select' && e.selected
                        ? custom.themeColor
                        : 'whitesmoke'
                    }
                    size={'medium'}
                    textColor={
                      mode === 'select' && e.selected ? 'white' : 'dimgray'
                    }
                    paddingVertical={10}
                    paddingHorizontal={20}
                  />

                  {/* 방장/팀장 표시 */}
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
                        text={'리더'}
                        // text={
                        //   props.route.params.teamSide === 'A' ? '방장' : '팀장'
                        // }
                        fontSize={12}
                        color={'white'}
                      />
                    </View>
                  )}

                  {/* Ready 상태 표시 */}
                  {e.ready === 'Y' && mode === '' && (
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedMember(e);
                        setMemberModal(true);
                      }}
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0,
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: 0.8,
                      }}>
                      <Image
                        local
                        uri={require('../../../assets/img/icon-readymark.png')}
                        width={30}
                        height={30}
                      />
                    </TouchableOpacity>
                  )}
                  {/* 팀장이 아닌멤버의경우 (i !== 0) 삭제버튼을 보여준다.
                   * 대신 내가 (context.me.userPk) 팀장이거나 A팀의 방장인경우에만
                   * 삭제 버튼을 보여준다.
                   */}
                  {i !== 0 &&
                    mode === '' &&
                    (context.me.userPk === selectedTeam?.member[0].userPk ||
                      context.me.userPk ===
                        props.route.params.info.teamA.member[0].userPk) && (
                      <View
                        style={
                          {
                            // marginLeft: -5,
                          }
                        }>
                        <Button
                          text={'X'}
                          size={'medium'}
                          textColor={'dimgray'}
                          paddingVertical={10}
                          // paddingHorizontal={20}
                          color={'whitesmoke'}
                          borderColor={'orange'}
                          onPress={() => {
                            setSelectedMember(e), setMemberOutTeamModal(true);
                          }}
                        />
                      </View>
                    )}
                </HView>
              );
            })}
          </HView>
        </View>
      </ScrollView>
      {mode === 'select' ? (
        <HView
          style={{
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderTopWidth: 1,
            borderTopColor: 'lightgray',
          }}>
          <View style={{flex: 1}}>
            <Button
              text={'취소'}
              color={'gray'}
              onPress={() => {
                const temp = {...selectedTeam};
                temp.member.map((e) => {
                  e.selected = false;
                });
                setSelectedTeam(temp);
                setMode('');
              }}
              size={'large'}
              stretch
            />
          </View>
          <Seperator width={20} />
          <View style={{flex: 1}}>
            <Button
              text={'위임하기'}
              color={custom.themeColor}
              onPress={() => {
                const foundedIndex = selectedTeam.member
                  .map((e) => e.selected)
                  .indexOf(true);
                if (foundedIndex !== -1) {
                  const temp = {...selectedTeam};

                  // array member swapping
                  temp.member = swap(temp.member, 0, foundedIndex);
                  if (props.route.params.teamSide === 'A') {
                    props.route.params?.updateBattle({
                      teamA: temp,
                    });
                  } else {
                    props.route.params?.updateBattle({
                      teamB: temp,
                    });
                  }
                  props.navigation.goBack();
                  showToast('위임을 완료했습니다.', 2000, 'center');
                }
              }}
              size={'large'}
              stretch
            />
          </View>
        </HView>
      ) : (
        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderTopWidth: 1,
            borderTopColor: 'lightgray',
          }}>
          <Button
            text={'확인'}
            color={custom.themeColor}
            onPress={() => props.navigation.goBack()}
            size={'large'}
            stretch
          />
        </View>
      )}
      <Seperator bottom />
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
          {selectedMember.userImgUrl ? (
            <Image
              uri={selectedMember.userImgUrl}
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
              rating={selectedMember.userScope}
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
            text={selectedMember.userName}
          />
          <Seperator height={10} />
          <MySports userSport={selectedMember.userSport} />
          <Seperator height={20} />
          <Text
            fontSize={14}
            // color={'gray'}
            text={`전체 승률: ${selectedMember.winrate}% (${selectedMember.ago}전 ${selectedMember.win}승 ${selectedMember.lose}패)`}
          />
          <Seperator height={10} />
          <Text
            fontSize={14}
            // color={'gray'}
            text={`소개: ${selectedMember.userIntro}`}
          />

          <Seperator height={50} />
          <Button
            text={'확인'}
            size={'large'}
            color={custom.themeColor}
            onPress={() => {
              setSelectedMember({});
              setMemberModal(false);
            }}
            stretch
          />
          {/* 신고 */}
          {context.me.userPk !== selectedMember.userPk && (
            <View style={{position: 'absolute', top: 20, right: 20}}>
              <TouchableOpacity
                onPress={() => {
                  setMemberModal(false);
                  props.navigation.navigate('Report', {
                    type: 1,
                    userPk: selectedMember.userPk,
                    userName: selectedMember.userName,
                    userImgUrl: selectedMember.userImgUrl,
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
      {/* 팀 강퇴 */}
      <Modal
        isVisible={memberOutTeamModal}
        onBackdropPress={() => setMemberOutTeamModal(false)}>
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
                  setMemberOutTeamModal(false);
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
                  if (props.route.params.teamSide === 'A') {
                    const teamA = {...selectedTeam};
                    const foundedIndex = teamA.member
                      .map((f) => f.userPk)
                      .indexOf(selectedMember.userPk);
                    kickUser(
                      selectedMember.userPk,
                      props.route.params.info.baPk,
                    );
                    if (foundedIndex !== -1) {
                      const localHistory = [
                        ...props.route.params.info.history.map((h) => ({
                          userPk: h.userPk,
                        })),
                      ];
                      if (
                        localHistory
                          .map((m) => m.userPk)
                          .indexOf(teamA.member[foundedIndex].userPk) === -1
                      ) {
                        localHistory.push({
                          userPk: teamA.member[foundedIndex].userPk,
                        });
                      }
                      teamA.member.splice(foundedIndex, 1);

                      props.route.params?.updateBattle({
                        teamA: teamA,
                        history: localHistory,
                      });
                      setSelectedTeam(teamA);
                    }
                  }
                  if (props.route.params.teamSide === 'B') {
                    const teamB = {...selectedTeam};
                    const foundedIndex = teamB.member
                      .map((f) => f.userPk)
                      .indexOf(selectedMember.userPk);
                    kickUser(
                      selectedMember.userPk,
                      props.route.params.info.baPk,
                    );
                    if (foundedIndex !== -1) {
                      const localHistory = [
                        ...props.route.params.info.history.map((h) => ({
                          userPk: h.userPk,
                        })),
                      ];
                      if (
                        localHistory
                          .map((m) => m.userPk)
                          .indexOf(teamB.member[foundedIndex].userPk) === -1
                      ) {
                        localHistory.push({
                          userPk: teamB.member[foundedIndex].userPk,
                        });
                      }
                      teamB.member.splice(foundedIndex, 1);
                      props.route.params?.updateBattle({
                        teamB: teamB,
                        history: localHistory,
                      });
                      setSelectedTeam(teamB);
                    }
                  }
                  setMemberOutTeamModal(false);
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
