import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {HView, Text, Seperator, Image} from '../../react-native-nuno-ui';
import Icons from '../../commons/Icons';
import {ShadowStyle} from '../../styles';
import MatchMember from '../../commons/MatchMember';

export default function BattleComponentEmpty(props) {
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
          </HView>
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
            text={'다가오는 배틀이 없습니다.'}
            fontSize={18}
            fontWeight={'bold'}
          />
        </View>
        <Seperator height={25} />
      </View>
    </View>
  );
}
