import React from 'react';
import {
  Container,
  Text,
  Header,
  Seperator,
  HView,
  Image,
} from 'react-native-nuno-ui';
import {TouchableOpacity, View, ScrollView} from 'react-native';
import Icons from '../../commons/Icons';
import {ShadowStyle, screenWidth} from '../../styles';

export default function Facility(props) {
  return (
    <Container>
      <Header
        leftComponent={
          <View style={{paddingHorizontal: 20, paddingVertical: 5}}>
            <Image
              local
              uri={require('../../../assets/img/icon-hamburger.png')}
              height={20}
              width={20}
              resizeMode={'cover'}
              onPress={() => props.navigation.toggleDrawer()}
            />
          </View>
        }
        rightComponent={
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Search')}
            style={{paddingHorizontal: 20, paddingVertical: 5}}>
            <Icons name="icon-search-16" size={20} color={'black'} />
          </TouchableOpacity>
        }
        title={'운동시설'}
        navigation={props.navigation}
      />
      <ScrollView style={{backgroundColor: 'whitesmoke'}}>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 8,
            margin: 20,
            padding: 20,
            ...ShadowStyle,
          }}>
          <Text text={'구기종목'} fontWeight={'bold'} fontSize={21} />
          <Seperator height={30} />
          <HView style={{flexWrap: 'wrap'}}>
            <View style={{padding: 10, alignItems: 'center'}}>
              <Image
                local
                height={Math.floor((screenWidth - 180) / 5)}
                width={Math.floor((screenWidth - 180) / 5)}
                uri={require('../../../assets/img/icon-soccer.png')}
                onPress={() => props.navigation.navigate('FacilityList')}
                resizeMode={'cover'}
              />
              <Seperator height={10} />
              <Text text={'축구'} fontSize={14} />
            </View>
            <View style={{padding: 10, alignItems: 'center'}}>
              <Image
                local
                height={Math.floor((screenWidth - 180) / 5)}
                width={Math.floor((screenWidth - 180) / 5)}
                uri={require('../../../assets/img/icon-basketball.png')}
                onPress={() => props.navigation.navigate('FacilityList')}
                resizeMode={'cover'}
              />
              <Seperator height={10} />
              <Text text={'농구'} fontSize={14} />
            </View>
            <View style={{padding: 10, alignItems: 'center'}}>
              <Image
                local
                height={Math.floor((screenWidth - 180) / 5)}
                width={Math.floor((screenWidth - 180) / 5)}
                uri={require('../../../assets/img/icon-baseball.png')}
                onPress={() => props.navigation.navigate('FacilityList')}
                resizeMode={'cover'}
              />
              <Seperator height={10} />
              <Text text={'야구'} fontSize={14} />
            </View>
            <View style={{padding: 10, alignItems: 'center'}}>
              <Image
                local
                height={Math.floor((screenWidth - 180) / 5)}
                width={Math.floor((screenWidth - 180) / 5)}
                uri={require('../../../assets/img/icon-golf.png')}
                onPress={() => props.navigation.navigate('FacilityList')}
                resizeMode={'cover'}
              />
              <Seperator height={10} />
              <Text text={'골프'} fontSize={14} />
            </View>
            <View style={{padding: 10, alignItems: 'center'}}>
              <Image
                local
                height={Math.floor((screenWidth - 180) / 5)}
                width={Math.floor((screenWidth - 180) / 5)}
                uri={require('../../../assets/img/icon-tennis.png')}
                onPress={() => props.navigation.navigate('FacilityList')}
                resizeMode={'cover'}
              />
              <Seperator height={10} />
              <Text text={'테니스'} fontSize={14} />
            </View>
            <View style={{padding: 10, alignItems: 'center'}}>
              <Image
                local
                height={Math.floor((screenWidth - 180) / 5)}
                width={Math.floor((screenWidth - 180) / 5)}
                uri={require('../../../assets/img/icon-badminton.png')}
                onPress={() => props.navigation.navigate('FacilityList')}
                resizeMode={'cover'}
              />
              <Seperator height={10} />
              <Text text={'배드민턴'} fontSize={14} />
            </View>
            <View style={{padding: 10, alignItems: 'center'}}>
              <Image
                local
                height={Math.floor((screenWidth - 180) / 5)}
                width={Math.floor((screenWidth - 180) / 5)}
                uri={require('../../../assets/img/icon-billards.png')}
                onPress={() => props.navigation.navigate('FacilityList')}
                resizeMode={'cover'}
              />
              <Seperator height={10} />
              <Text text={'당구'} fontSize={14} />
            </View>
            <View style={{padding: 10, alignItems: 'center'}}>
              <Image
                local
                height={Math.floor((screenWidth - 180) / 5)}
                width={Math.floor((screenWidth - 180) / 5)}
                uri={require('../../../assets/img/icon-balling.png')}
                onPress={() => props.navigation.navigate('FacilityList')}
                resizeMode={'cover'}
              />
              <Seperator height={10} />
              <Text text={'볼링'} fontSize={14} />
            </View>
          </HView>
        </View>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 8,
            margin: 20,
            padding: 20,
            ...ShadowStyle,
          }}>
          <Text text={'건강운동'} fontWeight={'bold'} fontSize={21} />
        </View>
      </ScrollView>
    </Container>
  );
}
