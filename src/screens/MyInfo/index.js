import React from 'react';
import {
  Container,
  Header,
  Text,
  Image,
  HView,
  Seperator,
  Button,
} from 'react-native-nuno-ui';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import Icons from '../../commons/Icons';
import StarRating from 'react-native-star-rating';
import { custom } from '../../config';
import ActionSheet from 'react-native-actions-sheet';
import { AppContext } from '../../context';

const actionSheetRef = React.createRef();

export default function MyInfo(props) {
  const context = React.useContext(AppContext);
  return (
    <Container>
      <Header left={'close'} navigation={props.navigation} title={'내정보'} />
      <View
        style={{
          backgroundColor: 'rgba(242, 243, 246, 1)',
          alignItems: 'center',
          padding: 30,
        }}>
        <Image
          local
          uri={require('../../../assets/img/img-user2.png')}
          width={68}
          height={68}
          borderRadius={34}
        />
        <Seperator height={10} />
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
        <Seperator height={10} />
        <Text text={context.me.userName} fontWeight={'bold'} fontSize={21} />
        <Seperator height={10} />
        <Text
          text={'대표종목: 축구, 배드민턴, 농구'}
          fontSize={15}
          color={'gray'}
        />
        <Seperator height={15} />
        <HView>
          <Image
            local
            uri={require('../../../assets/img/icon-coinmoney.png')}
            width={20}
            height={20}
            borderRadius={10}
          />
          <Seperator width={10} />
          <Text fontSize={13} text={'2 coin'} />
          <Seperator width={20} />
          <Image
            local
            uri={require('../../../assets/img/icon-pointmoney.png')}
            width={20}
            height={20}
            borderRadius={10}
          />
          <Seperator width={10} />
          <Text fontSize={13} text={'3 point'} />
        </HView>
      </View>
      <HView style={{padding: 50, justifyContent: 'space-around'}}>
        <TouchableOpacity
          onPress={() => actionSheetRef.current?.setModalVisible()}
          style={{alignItems: 'center'}}>
          <Image
            local
            uri={require('../../../assets/img/icon-myscore.png')}
            width={34}
            height={44}
          />
          <Seperator height={10} />
          <Text fontSize={14} text={'전적'} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('CoinCharge')}
          style={{alignItems: 'center'}}>
          <Image
            local
            uri={require('../../../assets/img/icon-coinchange.png')}
            width={44}
            height={44}
          />
          <Seperator height={10} />
          <Text fontSize={14} text={'코인충전소'} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('EditProfile')}
          style={{alignItems: 'center'}}>
          <Image
            local
            uri={require('../../../assets/img/icon-mypage-modify.png')}
            width={40}
            height={44}
          />
          <Seperator height={10} />
          <Text fontSize={14} text={'정보 수정'} />
        </TouchableOpacity>
      </HView>
      <ActionSheet
        ref={actionSheetRef}
        headerAlwaysVisible={true}
        footerAlwaysVisible={true}
        gestureEnabled={true}
        bounceOnOpen={true}>
        <View>
          <View style={{padding: 20}}>
            <Text text={'전적'} fontWeight={'bold'} fontSize={22} />
          </View>
          <View style={{paddingHorizontal: 20, paddingVertical: 5}}>
            <HView>
              <View style={{flex: 0.3}}>
                <Text
                  text={'종합전적'}
                  fontSize={16}
                  fontWeight={'bold'}
                  color={'dimgray'}
                />
              </View>
              <View style={{flex: 0.7}}>
                <Text
                  text={'100전 60승 10패'}
                  fontSize={16}
                  color={'dimgray'}
                />
              </View>
            </HView>
          </View>
          <View style={{paddingHorizontal: 20, paddingVertical: 5}}>
            <HView>
              <View style={{flex: 0.3}}>
                <Text
                  text={'전체승률'}
                  fontSize={16}
                  fontWeight={'bold'}
                  color={'dimgray'}
                />
              </View>
              <View style={{flex: 0.7}}>
                <Text text={'60%'} fontSize={16} color={'dimgray'} />
              </View>
            </HView>
          </View>
          <Seperator height={30} />
          <View style={{paddingHorizontal: 20, paddingVertical: 5}}>
            <Text
              text={'세부전적'}
              fontSize={16}
              fontWeight={'bold'}
              color={'dimgray'}
            />
          </View>

          <View style={{paddingHorizontal: 20, paddingVertical: 5}}>
            <HView>
              <View style={{flex: 0.3}}>
                <Text
                  text={'축구'}
                  fontSize={16}
                  fontWeight={'bold'}
                  color={'dimgray'}
                />
              </View>
              <View style={{flex: 0.7}}>
                <Text text={'16전 12승 4패'} fontSize={16} color={'dimgray'} />
              </View>
            </HView>
          </View>
          <View style={{paddingHorizontal: 20, paddingVertical: 5}}>
            <HView>
              <View style={{flex: 0.3}}>
                <Text
                  text={'농구'}
                  fontSize={16}
                  fontWeight={'bold'}
                  color={'dimgray'}
                />
              </View>
              <View style={{flex: 0.7}}>
                <Text text={'16전 12승 4패'} fontSize={16} color={'dimgray'} />
              </View>
            </HView>
          </View>
          <View style={{paddingHorizontal: 20, paddingVertical: 5}}>
            <HView>
              <View style={{flex: 0.3}}>
                <Text
                  text={'골프'}
                  fontSize={16}
                  fontWeight={'bold'}
                  color={'dimgray'}
                />
              </View>
              <View style={{flex: 0.7}}>
                <Text text={'16전 12승 4패'} fontSize={16} color={'dimgray'} />
              </View>
            </HView>
          </View>
          <View style={{paddingHorizontal: 20, paddingVertical: 5}}>
            <HView>
              <View style={{flex: 0.3}}>
                <Text
                  text={'테니스'}
                  fontSize={16}
                  fontWeight={'bold'}
                  color={'dimgray'}
                />
              </View>
              <View style={{flex: 0.7}}>
                <Text text={'16전 12승 4패'} fontSize={16} color={'dimgray'} />
              </View>
            </HView>
          </View>
          <Seperator height={50} />
          <View style={{paddingHorizontal: 10}}>
            <Button
              text={'확인'}
              onPress={() => null}
              color={custom.themeColor}
              stretch
            />
          </View>
        </View>
      </ActionSheet>
    </Container>
  );
}
