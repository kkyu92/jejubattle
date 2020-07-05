import React from 'react';
import {Container, Text, Header, Seperator, HView, Image} from 'react-native-nuno-ui';
import {TouchableOpacity, View, ScrollView} from 'react-native';
import Icons from '../../commons/Icons';
import {ShadowStyle} from '../../styles';

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
            <TouchableOpacity style={{alignItems: 'center', marginRight: 20}} onPress={() => props.navigation.navigate('FacilityList')}>
              <View
                style={{
                  backgroundColor: 'whitesmoke',
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                }}
              />
              <Seperator height={8} />
              <Text text={'축구'} fontSize={15} color={'gray'} />
            </TouchableOpacity>
            <TouchableOpacity style={{alignItems: 'center', marginRight: 20}} onPress={() => null}>
              <View
                style={{
                  backgroundColor: 'whitesmoke',
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                }}
              />
              <Seperator height={8} />
              <Text text={'축구'} fontSize={15} color={'gray'} />
            </TouchableOpacity>
            <TouchableOpacity style={{alignItems: 'center', marginRight: 20}} onPress={() => null}>
              <View
                style={{
                  backgroundColor: 'whitesmoke',
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                }}
              />
              <Seperator height={8} />
              <Text text={'축구'} fontSize={15} color={'gray'} />
            </TouchableOpacity>
            <TouchableOpacity style={{alignItems: 'center', marginRight: 20}} onPress={() => null}>
              <View
                style={{
                  backgroundColor: 'whitesmoke',
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                }}
              />
              <Seperator height={8} />
              <Text text={'축구'} fontSize={15} color={'gray'} />
            </TouchableOpacity>
            <TouchableOpacity style={{alignItems: 'center', marginRight: 20}} onPress={() => null}>
              <View
                style={{
                  backgroundColor: 'whitesmoke',
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                }}
              />
              <Seperator height={8} />
              <Text text={'축구'} fontSize={15} color={'gray'} />
            </TouchableOpacity>
            <TouchableOpacity style={{alignItems: 'center', marginRight: 20}} onPress={() => null}>
              <View
                style={{
                  backgroundColor: 'whitesmoke',
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                }}
              />
              <Seperator height={8} />
              <Text text={'축구'} fontSize={15} color={'gray'} />
            </TouchableOpacity>
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
