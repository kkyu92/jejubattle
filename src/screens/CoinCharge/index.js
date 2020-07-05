import React from 'react';
import {
  Container,
  Header,
  Text,
  Image,
  HView,
  Seperator,
  TextInput,
} from 'react-native-nuno-ui';
import {View, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import Icons from '../../commons/Icons';
import {custom} from '../../config';
import ListItem from '../../commons/ListItem';

export default function CoinCharge(props) {
  return (
    <Container>
      <Header
        left={'back'}
        rightComponent={
          <TouchableOpacity
            onPress={() => props.navigation.navigate('PurchaseHistory')}
            style={{paddingHorizontal: 20, paddingVertical: 5}}>
            <Text
              text={'구매내역'}
              fontSize={16}
              fontWeight={'500'}
              color={'dimgray'}
            />
          </TouchableOpacity>
        }
        title={'코인충전소'}
        navigation={props.navigation}
      />
      <ScrollView>

        <Seperator height={20} />
        <View style={{padding: 20}}>
          <Text text={'현재 내 코인&포인트'} fontSize={18} fontWeight={'bold'} />
        </View>
        <HView>
          <HView style={{flex: 0.5, padding: 20, alignItems: 'flex-end'}}>
            <Text text={'배틀코인 '} fontSize={13} color={'dimgray'} />
            <Text text={'2'} fontSize={23} color={'dimgray'} />
            <Text text={'개'} fontSize={13} color={'dimgray'} />
          </HView>
          <HView style={{flex: 0.5, padding: 20, alignItems: 'flex-end'}}>
            <Text text={'배틀코인 '} fontSize={13} color={'dimgray'} />
            <Text text={'2'} fontSize={23} color={'dimgray'} />
            <Text text={'개'} fontSize={13} color={'dimgray'} />
          </HView>
        </HView>

        <Seperator height={50} />

        <View style={{padding: 20}}>
          <Text text={'유료 구매하기'} fontSize={18} fontWeight={'bold'} />
        </View>
        <View style={{paddingHorizontal: 20}}>
          <HView style={{paddingVertical: 20}}>
            <View style={{paddingHorizontal: 20}}>
              <View style={{backgroundColor: 'lightgray', width: 40, height: 40, borderRadius: 20}} />
            </View>
            <View>
              <HView>
                <Text text={'배틀코인 '} fontSize={18} />
                <Text text={'1개'} fontSize={18} />
              </HView>
              <HView style={{alignItems: 'flex-end'}}>
                <Text text={'1,200'} fontSize={23} />
                <Text text={'원'} fontSize={14} />
              </HView>
            </View>
          </HView>
          <Seperator line />
          <HView style={{paddingVertical: 20}}>
            <View style={{paddingHorizontal: 20}}>
              <View style={{backgroundColor: 'lightgray', width: 40, height: 40, borderRadius: 20}} />
            </View>
            <View>
              <HView>
                <Text text={'배틀코인 '} fontSize={18} />
                <Text text={'1개'} fontSize={18} />
              </HView>
              <HView style={{alignItems: 'flex-end'}}>
                <Text text={'1,200 원'} fontSize={23} style={{textDecorationLine: 'line-through'}} />
                <Text text={'1,200'} fontSize={23} />
                <Text text={'원'} fontSize={14} />
              </HView>
            </View>
          </HView>
        </View>

        <Seperator height={30} />

        <View style={{padding: 20}}>
          <Text text={'포인트로 구매하기'} fontSize={18} fontWeight={'bold'} />
        </View>
        <View style={{paddingHorizontal: 20}}>
          <HView style={{paddingVertical: 20}}>
            <View style={{paddingHorizontal: 20}}>
              <View style={{backgroundColor: 'lightgray', width: 40, height: 40, borderRadius: 20}} />
            </View>
            <View>
              <HView>
                <Text text={'배틀코인 '} fontSize={18} />
                <Text text={'1개'} fontSize={18} />
              </HView>
              <HView style={{alignItems: 'flex-end'}}>
                <Text text={'1,200'} fontSize={23} />
                <Text text={'원'} fontSize={14} />
              </HView>
            </View>
          </HView>
          <Seperator line />
          <HView style={{paddingVertical: 20}}>
            <View style={{paddingHorizontal: 20}}>
              <View style={{backgroundColor: 'lightgray', width: 40, height: 40, borderRadius: 20}} />
            </View>
            <View>
              <HView>
                <Text text={'배틀코인 '} fontSize={18} />
                <Text text={'1개'} fontSize={18} />
              </HView>
              <HView style={{alignItems: 'flex-end'}}>
                <Text text={'포인트 3개 필요'} fontSize={14} />
              </HView>
            </View>
          </HView>
        </View>
      </ScrollView>
    </Container>
  );
}
