import React from 'react';
import {
  Container,
  Text,
  Seperator,
  Image,
  HView,
} from '../../react-native-nuno-ui';
import {View, TouchableOpacity, Linking} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import {screenWidth} from '../../styles';
import Icons from '../../commons/Icons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {showToast} from '../../react-native-nuno-ui/funcs';

export default function TabFacilityInfo(props) {
  console.log(JSON.stringify(props));
  return (
    <Container>
      <View style={{padding: 20}}>
        <Text text={'시설 정보'} fontSize={18} fontWeight={'bold'} />
      </View>
      <View style={{padding: 20}}>
        <HView style={{flexWrap: 'wrap'}}>
          {props.data.feList.map((e, i) => {
            return (
              <View style={{padding: 10, alignItems: 'center'}} key={i}>
                <Image
                  height={Math.floor((screenWidth - 140) / 5)}
                  width={Math.floor((screenWidth - 140) / 5)}
                  uri={e.icon}
                  resizeMode={'cover'}
                />
                <Seperator height={10} />
                <Text text={e.name} fontSize={14} />
              </View>
            );
          })}
        </HView>
      </View>

      {props.data.faTimeList[0].name !== '' && (
        <>
          <View style={{padding: 20}}>
            <Text text={'이용 시간'} fontSize={18} fontWeight={'bold'} />
          </View>
          {props.data.faTimeList.map((e, i) => {
            return (
              <HView
                style={{
                  paddingHorizontal: 40,
                  alignItems: 'flex-start',
                  marginBottom: 30,
                }}
                key={i}>
                <View style={{flex: 0.3}}>
                  <Text text={e.name} fontSize={18} color={'dimgray'} />
                </View>
                <View style={{flex: 0.3, alignItems: 'center'}}>
                  <Text text={'••••••••••'} fontSize={12} color={'dimgray'} />
                </View>
                <View style={{flex: 0.4, alignItems: 'flex-end'}}>
                  <Text text={e.time} fontSize={18} color={'dimgray'} />
                </View>
              </HView>
            );
          })}
        </>
      )}

      {props.data.faFareList[0].name !== '' && (
        <>
          <Seperator height={20} />
          <View style={{padding: 20}}>
            <Text text={'이용 요금'} fontSize={18} fontWeight={'bold'} />
          </View>
          {props.data.faFareList.map((e, i) => {
            return (
              <HView
                style={{
                  paddingHorizontal: 40,
                  alignItems: 'flex-start',
                  marginBottom: 30,
                }}
                key={i}>
                <View style={{flex: 0.3}}>
                  <Text text={e.name} fontSize={18} color={'dimgray'} />
                </View>
                <View style={{flex: 0.3, alignItems: 'center'}}>
                  <Text text={'••••••••••'} fontSize={12} color={'dimgray'} />
                </View>
                <View style={{flex: 0.4, alignItems: 'flex-end'}}>
                  <Text text={e.fare} fontSize={18} color={'dimgray'} />
                </View>
              </HView>
            );
          })}
        </>
      )}

      {props.data.faPhone !== '' && (
        <>
          <Seperator height={20} />
          <View style={{padding: 20}}>
            <Text text={'전화'} fontSize={18} fontWeight={'bold'} />
          </View>
          <HView style={{paddingHorizontal: 40}}>
            <Icons name={'icon-call-18'} size={20} color={'dimgray'} />
            <Seperator width={20} />
            <TouchableOpacity
              onPress={() => Linking.openURL(`tel:${props.data.faPhone}`)}>
              <Text text={props.data.faPhone} fontSize={18} color={'dimgray'} />
            </TouchableOpacity>
          </HView>
        </>
      )}

      {props.data.faAddr !== '' && (
        <>
          <Seperator height={20} />
          <View style={{padding: 20}}>
            <Text text={'주소'} fontSize={18} fontWeight={'bold'} />
          </View>
          <HView
            style={{
              paddingHorizontal: 40,
              paddingBottom: 20,
            }}>
            <Icons
              style={{flex: 0.1}}
              name={'icon-loaction-18'}
              size={20}
              color={'dimgray'}
            />
            <Seperator style={{flex: 0.1}} width={20} />
            <TouchableOpacity
              style={{flex: 1}}
              onPress={() => {
                props.navigation.navigate('FullMap', {
                  noSearchFilter: true,
                  // 응답으로 장소에 대한 lat, lng 값이 와야 함. 아래는 임시로 넣음.
                  info: [
                    {
                      faImgUrl: props.data.faImgUrl,
                      faLat: props.data.faLat,
                      faLon: props.data.faLon,
                      faLikeCnt: props.data.faLikeCnt,
                      faName: props.data.faName,
                      faPk: props.data.faPk,
                      faReplyCnt: props.data.faReplyCnt,
                      faScopeCnt: props.data.faScopeCnt,
                      faScrapType: props.data.faScrapType,
                      faSubject: props.data.faSubject,
                    },
                  ],
                });
              }}>
              <Text
                text={props.data.faAddr}
                fontSize={18}
                color={'dimgray'}
                selectable={true}
              />
            </TouchableOpacity>
            <Seperator style={{flex: 0.1}} width={20} />
            <TouchableOpacity
              style={{flex: 0.1}}
              onPress={() => {
                Clipboard.setString(props.data.faAddr);
                showToast('주소가가 복사 되었습니다.', 2000, 'center');
              }}>
              <FontAwesome5 name={'copy'} size={20} />
            </TouchableOpacity>
          </HView>
        </>
      )}
      <Seperator bottom />
    </Container>
  );
}
