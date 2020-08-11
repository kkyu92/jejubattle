import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {HView, Text, Seperator, Image} from 'react-native-nuno-ui';
import Icons from '../../commons/Icons';
import {ShadowStyle} from '../../styles';
import MatchMember from '../../commons/MatchMember';

export default function BattleComponent(props) {
  return (
    <View style={{backgroundColor: 'whitesmoke', padding: 20}}>
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 8,
          padding: 20,
          ...ShadowStyle,
        }}>
        <HView style={{justifyContent: 'space-between'}}>
          <HView>
            <Text text={'다가오는 배틀'} fontSize={22} fontWeight={'bold'} />
            <Seperator width={10} />
            <View
              style={{
                backgroundColor: '#FE491B',
                padding: 5,
                borderRadius: 4,
              }}>
              <Text text={'D-2'} fontSize={13} color={'white'} />
            </View>
          </HView>
          <TouchableOpacity onPress={() => null}>
            <Icons name={'icon-more-20'} color={'gray'} size={20} />
          </TouchableOpacity>
        </HView>
        <Seperator height={25} />
        <View
          style={{
            backgroundColor: 'whitesmoke',
            paddingVertical: 10,
            alignItems: 'center',
            borderRadius: 6,
          }}>
          <Text
            text={'다 덤벼보세요 제가 이깁니다'}
            fontSize={18}
            fontWeight={'bold'}
          />
          <View style={{position: 'absolute', top: 0, right: 10}}>
            <Image
              local
              uri={require('../../../assets/img/icon-roomtitle.png')}
              width={22}
              height={27}
            />
          </View>
        </View>
        <Seperator height={25} />
        {/* <MatchMember /> */}
        <Seperator height={25} />
        <HView>
          <View style={{alignItems: 'center', flex: 1}}>
            <Text text={'종목'} fontSize={13} color={'gray'} />
            <Seperator height={5} />
            <Text text={'배드민턴'} fontSize={15} />
          </View>
          <Seperator vline height={40} />
          <View style={{alignItems: 'center', flex: 1}}>
            <Text text={'시간'} fontSize={13} color={'gray'} />
            <Seperator height={5} />
            <Text text={'14:00'} fontSize={15} />
          </View>
          <Seperator vline height={40} />
          <View style={{alignItems: 'center', flex: 1}}>
            <Text text={'장소'} fontSize={13} color={'gray'} />
            <Seperator height={5} />
            <Text text={'제주 중문 체육관'} fontSize={15} />
          </View>
        </HView>
        {/* space for dot */}
        <Seperator height={30} />
      </View>
    </View>
  );
}
