import React from 'react';
import {Container, Text, Seperator, Image, HView} from 'react-native-nuno-ui';
import {View, TouchableOpacity, Linking} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import {screenWidth} from '../../styles';
import Icons from '../../commons/Icons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {showToast} from 'react-native-nuno-ui/funcs';

export default function TabFacilityInfo(props) {
  return (
    <Container>
      <View style={{padding: 20}}>
        <Text text={'시설 정보'} fontSize={18} fontWeight={'bold'} />
      </View>
      <View style={{padding: 20}}>
        <HView style={{flexWrap: 'wrap'}}>
          <View style={{padding: 10, alignItems: 'center'}}>
            <Image
              local
              height={Math.floor((screenWidth - 140) / 5)}
              width={Math.floor((screenWidth - 140) / 5)}
              uri={require('../../../assets/img/icon-soccer.png')}
              onPress={() => null}
              resizeMode={'cover'}
            />
            <Seperator height={10} />
            <Text text={'축구'} fontSize={14} />
          </View>
          <View style={{padding: 10, alignItems: 'center'}}>
            <Image
              local
              height={Math.floor((screenWidth - 140) / 5)}
              width={Math.floor((screenWidth - 140) / 5)}
              uri={require('../../../assets/img/icon-basketball.png')}
              onPress={() => null}
              resizeMode={'cover'}
            />
            <Seperator height={10} />
            <Text text={'농구'} fontSize={14} />
          </View>
          <View style={{padding: 10, alignItems: 'center'}}>
            <Image
              local
              height={Math.floor((screenWidth - 140) / 5)}
              width={Math.floor((screenWidth - 140) / 5)}
              uri={require('../../../assets/img/icon-baseball.png')}
              onPress={() => null}
              resizeMode={'cover'}
            />
            <Seperator height={10} />
            <Text text={'야구'} fontSize={14} />
          </View>
          <View style={{padding: 10, alignItems: 'center'}}>
            <Image
              local
              height={Math.floor((screenWidth - 140) / 5)}
              width={Math.floor((screenWidth - 140) / 5)}
              uri={require('../../../assets/img/icon-golf.png')}
              onPress={() => null}
              resizeMode={'cover'}
            />
            <Seperator height={10} />
            <Text text={'골프'} fontSize={14} />
          </View>
          <View style={{padding: 10, alignItems: 'center'}}>
            <Image
              local
              height={Math.floor((screenWidth - 140) / 5)}
              width={Math.floor((screenWidth - 140) / 5)}
              uri={require('../../../assets/img/icon-tennis.png')}
              onPress={() => null}
              resizeMode={'cover'}
            />
            <Seperator height={10} />
            <Text text={'테니스'} fontSize={14} />
          </View>
          <View style={{padding: 10, alignItems: 'center'}}>
            <Image
              local
              height={Math.floor((screenWidth - 140) / 5)}
              width={Math.floor((screenWidth - 140) / 5)}
              uri={require('../../../assets/img/icon-badminton.png')}
              onPress={() => null}
              resizeMode={'cover'}
            />
            <Seperator height={10} />
            <Text text={'배드민턴'} fontSize={14} />
          </View>
          <View style={{padding: 10, alignItems: 'center'}}>
            <Image
              local
              height={Math.floor((screenWidth - 140) / 5)}
              width={Math.floor((screenWidth - 140) / 5)}
              uri={require('../../../assets/img/icon-billards.png')}
              onPress={() => null}
              resizeMode={'cover'}
            />
            <Seperator height={10} />
            <Text text={'당구'} fontSize={14} />
          </View>
          <View style={{padding: 10, alignItems: 'center'}}>
            <Image
              local
              height={Math.floor((screenWidth - 140) / 5)}
              width={Math.floor((screenWidth - 140) / 5)}
              uri={require('../../../assets/img/icon-balling.png')}
              onPress={() => null}
              resizeMode={'cover'}
            />
            <Seperator height={10} />
            <Text text={'볼링'} fontSize={14} />
          </View>
        </HView>
      </View>
      <View style={{padding: 20}}>
        <Text text={'이용 시간'} fontSize={18} fontWeight={'bold'} />
      </View>
      <HView
        style={{
          paddingHorizontal: 40,
          alignItems: 'flex-start',
          marginBottom: 30,
        }}>
        <View style={{flex: 0.3}}>
          <Text text={'토요일'} fontSize={18} color={'dimgray'} />
        </View>
        <View style={{flex: 0.3, alignItems: 'center'}}>
          <Text text={'••••••••••'} fontSize={12} color={'dimgray'} />
        </View>
        <View style={{flex: 0.4, alignItems: 'flex-end'}}>
          <Text text={'09:00 ~ 14:00'} fontSize={18} color={'dimgray'} />
        </View>
      </HView>
      <HView
        style={{
          paddingHorizontal: 40,
          alignItems: 'flex-start',
          marginBottom: 30,
        }}>
        <View style={{flex: 0.3}}>
          <Text text={'일요일,공휴일'} fontSize={18} color={'dimgray'} />
        </View>
        <View style={{flex: 0.3, alignItems: 'center'}}>
          <Text text={'••••••••••'} fontSize={12} color={'dimgray'} />
        </View>
        <View style={{flex: 0.4, alignItems: 'flex-end'}}>
          <Text text={'09:00 ~ 14:00'} fontSize={18} color={'dimgray'} />
        </View>
      </HView>

      <Seperator height={20} />

      <View style={{padding: 20}}>
        <Text text={'이용 요금'} fontSize={18} fontWeight={'bold'} />
      </View>
      <HView
        style={{
          paddingHorizontal: 40,
          alignItems: 'flex-start',
          marginBottom: 30,
        }}>
        <View style={{flex: 0.3}}>
          <Text text={'평일 주간'} fontSize={18} color={'dimgray'} />
        </View>
        <View style={{flex: 0.3, alignItems: 'center'}}>
          <Text text={'••••••••••'} fontSize={12} color={'dimgray'} />
        </View>
        <View style={{flex: 0.4, alignItems: 'flex-end'}}>
          <Text text={'2시간 / 20,000원'} fontSize={18} color={'dimgray'} />
          <Text text={'2시간 / 20,000원'} fontSize={18} color={'dimgray'} />
        </View>
      </HView>
      <HView
        style={{
          paddingHorizontal: 40,
          alignItems: 'flex-start',
          marginBottom: 30,
        }}>
        <View style={{flex: 0.3}}>
          <Text text={'평일 야간'} fontSize={18} color={'dimgray'} />
        </View>
        <View style={{flex: 0.3, alignItems: 'center'}}>
          <Text text={'••••••••••'} fontSize={12} color={'dimgray'} />
        </View>
        <View style={{flex: 0.4, alignItems: 'flex-end'}}>
          <Text text={'2시간 / 20,000원'} fontSize={18} color={'dimgray'} />
          <Text text={'2시간 / 20,000원'} fontSize={18} color={'dimgray'} />
        </View>
      </HView>

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

      <Seperator height={20} />

      <View style={{padding: 20}}>
        <Text text={'주소'} fontSize={18} fontWeight={'bold'} />
      </View>
      <HView
        style={{
          paddingHorizontal: 40,
          paddingBottom: 20,
          alignItems: 'flex-start',
        }}>
        <Icons name={'icon-loaction-18'} size={20} color={'dimgray'} />
        <Seperator width={20} />
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('FullMap', {
              // 응답으로 장소에 대한 lat, lng 값이 와야 함. 아래는 임시로 넣음.
              latitude: 100,
              longitude: 50,
            });
          }}>
          <Text
            text={props.data.faAddr}
            fontSize={18}
            color={'dimgray'}
            selectable={true}
          />
        </TouchableOpacity>
        <Seperator width={20} />
        <TouchableOpacity
          onPress={() => {
            Clipboard.setString(props.data.faAddr);
            showToast('주소가가 복사 되었습니다.', 2000, 'center');
          }}>
          <FontAwesome5 name={'copy'} size={20} />
        </TouchableOpacity>
      </HView>
      <Seperator bottom />
    </Container>
  );
}
