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
} from 'react-native-nuno-ui';
import {TouchableOpacity, View, ScrollView} from 'react-native';
import {custom} from '../../config';
import Axios from 'axios';
import {logApi} from 'react-native-nuno-ui/funcs';
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
  const [selectedMember, setSelectedMember] = React.useState({});
  const selectedTeam =
    props.route.params.teamSide === 'A'
      ? props.route.params.info.teamA
      : props.route.params.info.teamB;

  React.useEffect(() => {}, []);
  return (
    <Container>
      <Header
        left={'close'}
        title={`${selectedTeam.name} 팀`}
        navigation={props.navigation}
        rightComponent={
          <TouchableOpacity
            onPress={() => null}
            style={{
              paddingHorizontal: 20,
              paddingVertical: 5,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              text={
                props.route.params.teamSide === 'A' ? '팀장위임' : '방장위임'
              }
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
                <TouchableOpacity
                  key={i}
                  onPress={() => {
                    setSelectedMember(e);
                    setMemberModal(true);
                  }}
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
                  {/* 팀장이 아니고 (i !== 0)
                   * 내가 (context.me.userPk) 선택한 팀의 팀장이거나 A팀의 방장인경우에
                   * 삭제 버튼을 보여준다.
                   */}
                  {i !== 0 &&
                    (context.me.userPk === selectedTeam?.member[0].userPk ||
                      context.me.userPk ===
                        props.route.params.info.teamA.member[0].userPk) && (
                      <TouchableOpacity
                        onPress={() => {
                          if (props.route.params.teamSide === 'A') {
                            const teamA = {...selectedTeam};
                            const foundedIndex = teamA.member
                              .map((f) => f.userPk)
                              .indexOf(e.userPk);
                            if (foundedIndex !== -1) {
                              const history = [
                                ...props.route.params.info.history.map((h) => ({
                                  userPk: h.userPk,
                                })),
                              ];
                              history.push({
                                userPk: teamA.member[foundedIndex].userPk,
                              });
                              teamA.member.splice(foundedIndex, 1);

                              props.route.params?.updateBattle({
                                teamA: teamA,
                                history: history,
                              });
                            }
                          }
                          if (props.route.params.teamSide === 'B') {
                            const teamB = {...selectedTeam};
                            const foundedIndex = teamB.member
                              .map((f) => f.userPk)
                              .indexOf(e.userPk);
                            if (foundedIndex !== -1) {
                              const history = [
                                ...props.route.params.info.history.map((h) => ({
                                  userPk: h.userPk,
                                })),
                              ];
                              history.push({
                                userPk: teamB.member[foundedIndex].userPk,
                              });
                              teamB.member.splice(foundedIndex, 1);
                              props.route.params?.updateBattle({
                                teamB: teamB,
                                history: history,
                              });
                            }
                          }
                        }}
                        style={{paddingLeft: 20}}>
                        <AntDesign name={'close'} size={13} color={'dimgray'} />
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
                        text={
                          props.route.params.teamSide === 'A' ? '방장' : '팀장'
                        }
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
        </View>
      </ScrollView>
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
              props.navigation.goBack();
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
            onPress={() => null}
            size={'large'}
            stretch
          />
        </View>
      </HView>
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
    </Container>
  );
}
