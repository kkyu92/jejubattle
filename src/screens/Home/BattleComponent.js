import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {HView, Text, Seperator, Image} from '../../react-native-nuno-ui';
import Icons from '../../commons/Icons';
import {ShadowStyle} from '../../styles';
import MatchMember from '../../commons/MatchMember';

export default function BattleComponent(props) {
  return (
    <TouchableOpacity
      style={{backgroundColor: 'whitesmoke', padding: 20}}
      onPress={() => {
        props.navigation.navigate('BattleView', {
          baPk: props.data.baPk,
        });
      }}>
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
              <Text
                text={'D-' + props.data.dday}
                fontSize={13}
                color={'white'}
              />
            </View>
          </HView>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('MyBattle');
            }}>
            <Icons
              name={'icon-more-20'}
              color={'gray'}
              size={20}
              style={{padding: 10}}
            />
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
          <Text text={props.data.baSubject} fontSize={18} fontWeight={'bold'} />
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
            <View>
              {props.data.teamA?.member?.userImgUrl !== '' ? (
                <Image
                  uri={props.data.teamA.member?.userImgUrl}
                  width={72}
                  height={72}
                  borderRadius={36}
                />
              ) : (
                <Image
                  local
                  uri={require('../../../assets/img/img-user2.png')}
                  width={72}
                  height={72}
                  borderRadius={36}
                />
              )}
            </View>
            <Seperator height={10} />
            <Text
              text={props.data.teamA?.member?.userName}
              fontWeight={'500'}
              fontSize={16}
            />
          </View>
          <View style={{flex: 0.2, alignItems: 'center'}}>
            <Text text={'VS'} fontWeight={'bold'} fontSize={24} />
          </View>
          <View
            style={{
              flex: 0.4,
              alignItems: 'center',
            }}>
            {props.data.teamB?.member === null ? (
              <View height={72} width={85} style={{justifyContent: 'center'}}>
                <Text
                  text={'대결상대가\n없습니다'}
                  fontSize={18}
                  fontWeight={'bold'}
                  style={{textAlign: 'center'}}
                />
              </View>
            ) : (
              <View style={{alignItems: 'center'}}>
                {props.data.teamB?.member?.userImgUrl !== '' ? (
                  <Image
                    uri={props.data.teamB.member?.userImgUrl}
                    width={72}
                    height={72}
                    borderRadius={36}
                  />
                ) : (
                  <Image
                    local
                    uri={require('../../../assets/img/img-user2.png')}
                    width={72}
                    height={72}
                    borderRadius={36}
                  />
                )}
                <Seperator height={10} />
                <Text
                  text={props.data.teamB?.member?.userName}
                  fontWeight={'500'}
                  fontSize={16}
                  style={{textAlign: 'center'}}
                />
              </View>
            )}
          </View>
        </HView>

        <Seperator height={25} />
        <HView>
          <View style={{alignItems: 'center', flex: 0.3}}>
            <Text text={'종목'} fontSize={13} color={'gray'} />
            <Seperator height={5} />
            <Text text={props.data.bcName} fontSize={15} />
          </View>
          <Seperator vline height={40} />
          <View style={{alignItems: 'center', flex: 0.3}}>
            <Text text={'시간'} fontSize={13} color={'gray'} />
            <Seperator height={5} />
            <Text
              text={
                props.data.baStartTime === '' ? '미정' : props.data.baStartTime
              }
              fontSize={15}
            />
          </View>
          <Seperator vline height={40} />
          <View style={{alignItems: 'center', flex: 0.4}}>
            <Text text={'장소'} fontSize={13} color={'gray'} />
            <Seperator height={5} />
            <Text
              text={props.data.faName ? props.data.faName : '미정'}
              fontSize={15}
            />
          </View>
        </HView>
        {/* space for dot */}
        <Seperator height={30} />
      </View>
    </TouchableOpacity>
  );
}
