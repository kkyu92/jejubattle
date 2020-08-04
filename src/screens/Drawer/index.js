import React from 'react';
import {
  Container,
  Header,
  Seperator,
  HView,
  Text,
  Image,
} from 'react-native-nuno-ui';
import {TouchableOpacity, View} from 'react-native';
import Icons from '../../commons/Icons';
import StarRating from 'react-native-star-rating';
import {custom} from '../../config';
import {ScrollView} from 'react-native-gesture-handler';
import { AppContext } from '../../context';

export default function Drawer(props) {
  const context = React.useContext(AppContext);
  return (
    <Container>
      <Header
        leftComponent={
          <TouchableOpacity
            onPress={() => props.navigation.toggleDrawer()}
            style={{paddingHorizontal: 20, paddingVertical: 5}}>
            <Icons name="icon-backbtn-16" size={16} color={'black'} />
          </TouchableOpacity>
        }
        rightComponent={
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Notification')}
            style={{paddingHorizontal: 20, paddingVertical: 5}}>
            <Icons name="icon-notification-20" size={18} color={'black'} />
          </TouchableOpacity>
        }
        // navigation={props.navigation}
        containerStyle={{borderBottomWidth: 0}}
      />
      <Seperator height={35} />
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('MyInfoStack', {screen: 'MyInfo'})
        }>
        <HView style={{paddingHorizontal: 20}}>
          <Image
            local
            uri={require('../../../assets/img/img-user2.png')}
            width={68}
            height={68}
            borderRadius={34}
          />
          <Seperator width={22} />
          <View>
            <Text fontSize={21} text={context.me?.userName} fontWeight={'bold'} />
            <Seperator height={10} />
            <Text
              fontSize={15}
              text={'대표종목: 축구, 배드민턴, 농구'}
              color={'gray'}
            />
          </View>
        </HView>
      </TouchableOpacity>
      <HView style={{paddingHorizontal: 20, paddingVertical: 10}}>
        <View
          style={{
            width: 68,
          }}>
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
        <Seperator width={22} />
        <HView>
          <Image
            local
            uri={require('../../../assets/img/icon-coinmoney.png')}
            width={20}
            height={20}
            borderRadius={10}
          />
          <Seperator width={10} />
          <Text fontSize={13} text={'2 coin'} color={'gray'} />
          <Seperator width={20} />
          <Image
            local
            uri={require('../../../assets/img/icon-pointmoney.png')}
            width={20}
            height={20}
            borderRadius={10}
          />
          <Seperator width={10} />
          <Text fontSize={13} text={'3 point'} color={'gray'} />
        </HView>
      </HView>
      <Seperator height={10} />
      <Seperator height={11} color={'whitesmoke'} />

      <Seperator height={20} />

      {/* menu list */}
      <ScrollView>
        <TouchableOpacity onPress={() => props.navigation.navigate('FullMap')}>
          <HView
            style={{
              paddingHorizontal: 20,
              paddingVertical: 20,
              justifyContent: 'space-between',
            }}>
            <HView>
              <Icons name={'icon-mylocation-20'} size={19} color={'dimgray'} />
              <Seperator width={20} />
              <Text text={'내 주변 살펴보기'} fontSize={18} color={'dimgray'} />
            </HView>
            <Icons name={'icon-arrow-10'} size={10} color={'lightgray'} />
          </HView>
        </TouchableOpacity>
        <Seperator line />
        <TouchableOpacity onPress={() => props.navigation.navigate('MyBattle')}>
          <HView
            style={{
              paddingHorizontal: 20,
              paddingVertical: 20,
              justifyContent: 'space-between',
            }}>
            <HView>
              <Icons name={'icon-mybattle-20'} size={19} color={'dimgray'} />
              <Seperator width={20} />
              <Text text={'나의 배틀'} fontSize={18} color={'dimgray'} />
            </HView>
            <Icons name={'icon-arrow-10'} size={10} color={'lightgray'} />
          </HView>
        </TouchableOpacity>
        <Seperator line />
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate('TourInfoStack', {
              screen: 'Travel',
            })
          }>
          <HView
            style={{
              paddingHorizontal: 20,
              paddingVertical: 20,
              justifyContent: 'space-between',
            }}>
            <HView>
              <Icons name={'icon-tripinfo-20'} size={19} color={'dimgray'} />
              <Seperator width={20} />
              <Text text={'여행정보'} fontSize={18} color={'dimgray'} />
            </HView>
            <Icons name={'icon-arrow-10'} size={10} color={'lightgray'} />
          </HView>
        </TouchableOpacity>
        <Seperator line />
        <TouchableOpacity onPress={() => props.navigation.navigate('WishList')}>
          <HView
            style={{
              paddingHorizontal: 20,
              paddingVertical: 20,
              justifyContent: 'space-between',
            }}>
            <HView>
              <Icons name={'icon-wishlist-20'} size={19} color={'dimgray'} />
              <Seperator width={20} />
              <Text text={'위시리스트'} fontSize={18} color={'dimgray'} />
            </HView>
            <Icons name={'icon-arrow-10'} size={10} color={'lightgray'} />
          </HView>
        </TouchableOpacity>
        <Seperator line />
        <TouchableOpacity onPress={() => props.navigation.navigate('Archive')}>
          <HView
            style={{
              paddingHorizontal: 20,
              paddingVertical: 20,
              justifyContent: 'space-between',
            }}>
            <HView>
              <Icons name={'icon-listbox-20'} size={19} color={'dimgray'} />
              <Seperator width={20} />
              <Text text={'보관함'} fontSize={18} color={'dimgray'} />
            </HView>
            <Icons name={'icon-arrow-10'} size={10} color={'lightgray'} />
          </HView>
        </TouchableOpacity>
        <Seperator line />
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate('EventStack', {
              screen: 'Event',
            })
          }>
          <HView
            style={{
              paddingHorizontal: 20,
              paddingVertical: 20,
              justifyContent: 'space-between',
            }}>
            <HView>
              <Icons name={'icon-event-20'} size={19} color={'dimgray'} />
              <Seperator width={20} />
              <Text text={'이벤트'} fontSize={18} color={'dimgray'} />
            </HView>
            <Icons name={'icon-arrow-10'} size={10} color={'lightgray'} />
          </HView>
        </TouchableOpacity>
        <Seperator line />
        <TouchableOpacity onPress={() => props.navigation.navigate('Notice')}>
          <HView
            style={{
              paddingHorizontal: 20,
              paddingVertical: 20,
              justifyContent: 'space-between',
            }}>
            <HView>
              <Icons name={'icon-notice-20'} size={19} color={'dimgray'} />
              <Seperator width={20} />
              <Text text={'공지사항'} fontSize={18} color={'dimgray'} />
            </HView>
            <Icons name={'icon-arrow-10'} size={10} color={'lightgray'} />
          </HView>
        </TouchableOpacity>
        <Seperator line />
        <TouchableOpacity
          onPress={() => props.navigation.navigate('CustomerCenter')}>
          <HView
            style={{
              paddingHorizontal: 20,
              paddingVertical: 20,
              justifyContent: 'space-between',
            }}>
            <HView>
              <Icons name={'icon-cs-20'} size={19} color={'dimgray'} />
              <Seperator width={20} />
              <Text text={'고객센터'} fontSize={18} color={'dimgray'} />
            </HView>
            <Icons name={'icon-arrow-10'} size={10} color={'lightgray'} />
          </HView>
        </TouchableOpacity>
        <Seperator line />
        <TouchableOpacity onPress={() => props.navigation.navigate('Setting')}>
          <HView
            style={{
              paddingHorizontal: 20,
              paddingVertical: 20,
              justifyContent: 'space-between',
            }}>
            <HView>
              <Icons name={'icon-setting-20'} size={19} color={'dimgray'} />
              <Seperator width={20} />
              <Text text={'설정'} fontSize={18} color={'dimgray'} />
            </HView>
            <Icons name={'icon-arrow-10'} size={10} color={'lightgray'} />
          </HView>
        </TouchableOpacity>
        {/* <Seperator line /> */}
      </ScrollView>
    </Container>
  );
}
