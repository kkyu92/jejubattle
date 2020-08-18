import React from 'react';
import {
  HView,
  Seperator,
  Text,
  Modal,
  Button,
  Image,
} from 'react-native-nuno-ui';
import {View, TouchableOpacity} from 'react-native';
import {custom} from '../../config';
import StarRating from 'react-native-star-rating';
import Icons from '../Icons';
import {AppContext} from '../../context';
import MySports from '../MySports';

export default function MatchMember(props) {
  const context = React.useContext(AppContext);
  const [memberModal, setMemberModal] = React.useState(false);
  const [memberModalTeam, setMemberModalTeam] = React.useState();
  return (
    <View>
      {props.teamA.name === '' ? (
        <HView style={{justifyContent: 'center'}}>
          <View style={{alignItems: 'center'}}>
            {props.teamA.member[0]?.userImgUrl ? (
              <Image
                uri={props.teamA.member[0]?.userImgUrl}
                width={72}
                height={72}
                borderRadius={36}
                onPress={() => {
                  if (props.teamA.member.length > 0) {
                    setMemberModalTeam(props.teamA);
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
                  if (props.teamA.member.length > 0) {
                    setMemberModalTeam(props.teamA);
                    setMemberModal(true);
                  }
                }}
              />
            )}
            <Seperator height={10} />
            <Text
              text={props.teamA.member[0]?.userName}
              fontWeight={'500'}
              fontSize={16}
            />
          </View>
          <View style={{padding: 30}}>
            <Text text={'VS'} fontWeight={'bold'} fontSize={24} />
          </View>
          <View style={{alignItems: 'center'}}>
            {props.teamB.member[0]?.userImgUrl ? (
              <Image
                uri={props.teamB.member[0]?.userImgUrl}
                width={72}
                height={72}
                borderRadius={36}
                onPress={() => {
                  if (props.teamB.member.length > 0) {
                    setMemberModalTeam(props.teamB);
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
                  if (props.teamB.member.length > 0) {
                    setMemberModalTeam(props.teamB);
                    setMemberModal(true);
                  }
                }}
              />
            )}
            <Seperator height={10} />
            <Text
              text={props.teamB.member[0]?.userName}
              fontWeight={'500'}
              fontSize={16}
            />
          </View>
        </HView>
      ) : (
        <HView style={{justifyContent: 'center'}}>
          <View style={{alignItems: 'center'}}>
            <Image
              local
              uri={props.teamA.require('../../../assets/img/user_boy.png')}
              width={72}
              height={72}
              borderRadius={36}
              onPress={() => {
                setMemberModalTeam(props.teamB);
                setMemberModal(true);
              }}
            />
            <Seperator height={10} />
            <Text text={'소소한유리병'} fontWeight={'500'} fontSize={16} />
          </View>
          <View style={{padding: 30}}>
            <Text text={'VS'} fontWeight={'bold'} fontSize={24} />
          </View>
          <View style={{alignItems: 'center'}}>
            <Image
              local
              uri={require('../../../assets/img/user_girl.png')}
              width={72}
              height={72}
              borderRadius={36}
              onPress={() => setMemberModal(true)}
            />
            <Seperator height={10} />
            <Text text={'게으른슈퍼맨'} fontWeight={'500'} fontSize={16} />
          </View>
        </HView>
      )}

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
          <Image
            local
            uri={
              memberModalTeam?.member[0]?.userImgUrl ||
              require('../../../assets/img/user_girl.png')
            }
            width={72}
            height={72}
            borderRadius={36}
          />
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
                props.navigation.navigate('Report');
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
