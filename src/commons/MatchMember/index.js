import React from 'react';
import {HView, Seperator, Text, Modal, Button} from 'react-native-nuno-ui';
import {View, TouchableOpacity} from 'react-native';
import { custom } from '../../config';
import StarRating from 'react-native-star-rating';
import Icons from '../Icons';

export default function MatchMember(props) {
  const [memberModal, setMemberModal] = React.useState(false);
  return (
    <HView style={{justifyContent: 'center'}}>
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => setMemberModal(true)}
          style={{
            width: 72,
            height: 72,
            backgroundColor: 'lightgray',
            borderRadius: 36,
          }}
        />
        <Seperator height={10} />
        <Text text={'소소한유리병'} fontWeight={'500'} fontSize={16} />
      </View>
      <View style={{padding: 30}}>
        <Text text={'VS'} fontWeight={'bold'} fontSize={24} />
      </View>
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => setMemberModal(true)}
          style={{
            width: 72,
            height: 72,
            backgroundColor: 'lightgray',
            borderRadius: 36,
          }}
        />
        <Seperator height={10} />
        <Text text={'게으른슈퍼맨'} fontWeight={'500'} fontSize={16} />
      </View>
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
          <View
            style={{
              width: 72,
              height: 72,
              backgroundColor: 'lightgray',
              borderRadius: 36,
            }}
          />
          <View style={{paddingVertical: 8}}>
            <StarRating
              disabled={true}
              maxStars={5}
              rating={5}
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
            text={'게으른 슈퍼맨'}
          />
          <Seperator height={10} />
          <Text
            fontSize={14}
            color={'gray'}
            text={'대표종목: 축구, 배드민턴, 농구'}
          />
          <Seperator height={20} />
          <Text
            fontSize={14}
            // color={'gray'}
            text={'전체 승률: 53.3% (000전 00승 000패)'}
          />
          <Seperator height={10} />
          <Text
            fontSize={14}
            // color={'gray'}
            text={'소개: 잘 부탁드립니다~'}
          />

          <Seperator height={50} />
          <Button
            text={'확인'}
            color={custom.themeColor}
            onPress={() => null}
            stretch
          />
          {/* 신고 */}
          <View style={{position: 'absolute', top: 20, right: 20}}>
            <TouchableOpacity onPress={() => null} style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icons name={'icon-declare-15'} color={custom.themeColor} size={15} />
              <Seperator width={9} />
              <Text text={'신고'} fontSize={15} color={'gray'} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </HView>
  );
}
