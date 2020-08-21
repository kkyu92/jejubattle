import React from 'react';
import {
  HView,
  Seperator,
  Text,
  Modal,
  Button,
  Image,
  TextInput,
} from 'react-native-nuno-ui';
import {View, TouchableOpacity} from 'react-native';
import {custom} from '../../config';
import StarRating from 'react-native-star-rating';
import Icons from '../Icons';
import {AppContext} from '../../context';
import MySports from '../MySports';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Axios from 'axios';
import {logApi} from 'react-native-nuno-ui/funcs';

export default function MatchMember(props) {
  const context = React.useContext(AppContext);
  const [memberModal, setMemberModal] = React.useState(false);
  const [editNameModal, setEditNameModal] = React.useState(false);
  const [name, setName] = React.useState('');
  const [selectedTeam, setSelectedTeam] = React.useState('A');
  const [memberModalTeam, setMemberModalTeam] = React.useState();
  const [loading, setLoading] = React.useState(false);

  const updateBattle = (data) => {
    Axios.post('updateBattle', {
      baPk: props.info.baPk,
      ...data,
    })
      .then((res) => {
        logApi('updateBattle', res.data);
        setLoading(false);
        setName('');
        props.refreshBattleView && props.refreshBattleView();
      })
      .catch((err) => {
        logApi('updateBattle error', err.response);
        setLoading(false);
      });
  };
  return (
    <View>
      {props.info.teamA.name === '' ? (
        <HView style={{justifyContent: 'center'}}>
          <View style={{alignItems: 'center'}}>
            {props.info.teamA.member[0]?.userImgUrl ? (
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
                  if (props.info.teamA.member.length > 0) {
                    setMemberModalTeam(props.info.teamA);
                    setMemberModal(true);
                  }
                }}
              />
            )}
            <Seperator height={10} />
            <Text
              text={props.info.teamA.member[0]?.userName}
              fontWeight={'500'}
              fontSize={16}
            />
          </View>
          <View style={{padding: 30}}>
            <Text text={'VS'} fontWeight={'bold'} fontSize={24} />
          </View>
          <View style={{alignItems: 'center'}}>
            {props.info.teamB.member[0]?.userImgUrl ? (
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
                  if (props.info.teamB.member.length > 0) {
                    setMemberModalTeam(props.info.teamB);
                    setMemberModal(true);
                  }
                }}
              />
            )}
            <Seperator height={10} />
            <Text
              text={props.info.teamB.member[0]?.userName}
              fontWeight={'500'}
              fontSize={16}
            />
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
            <Seperator height={10} />
            <Text
              text={`참가인원 ${props.info.teamA.member.length}명`}
              fontSize={14}
              fontWeight={'500'}
            />
          </View>
          <View style={{padding: 30}}>
            <Text text={'VS'} fontWeight={'bold'} fontSize={24} />
            <Seperator height={20} />
            <TouchableOpacity onPress={() => null}>
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
            <Seperator height={10} />
            <Text
              text={`참가인원 ${props.info.teamB.member.length}명`}
              fontSize={14}
              fontWeight={'500'}
            />
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
                onPress={() => {
                  if (selectedTeam === 'A') {
                    const team = {...props.info.teamA};
                    team.name = name;
                    updateBattle({teamA: team});
                  }
                  if (selectedTeam === 'B') {
                    const team = {...props.info.teamB};
                    team.name = name;
                    updateBattle({teamB: team});
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
              uri={require('../../../assets/img/user_girl.png')}
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
          <View style={{position: 'absolute', top: 20, right: 20}}>
            <TouchableOpacity
              onPress={() => {
                setMemberModal(false);
                props.navigation.navigate('Report', {
                  type: 1,
                  userPk: '',
                  userName: '',
                  userImgUrl: '',
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
        </View>
      </Modal>
    </View>
  );
}
