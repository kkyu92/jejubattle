import React from 'react';
import {
  Container,
  Header,
  Seperator,
  HView,
  Text,
  Image,
} from '../../react-native-nuno-ui';
import {TouchableOpacity, View} from 'react-native';
import Icons from '../../commons/Icons';
import StarRating from 'react-native-star-rating';
import {custom} from '../../config';
import {ScrollView} from 'react-native-gesture-handler';
import {AppContext} from '../../context';
import MySports from '../../commons/MySports';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
            {context.me.notification === 'Y' ? (
              <MaterialCommunityIcons
                name={
                  context.me.userTermsPush === 'Y'
                    ? 'bell-outline'
                    : 'bell-off-outline'
                }
                size={18}
                color={context.me.userTermsPush === 'Y' ? 'black' : 'red'}
              />
            ) : (
              <>
                {console.log(context.me.notification + 'cNoti')}
                <MaterialCommunityIcons
                  name={
                    context.me.userTermsPush === 'Y'
                      ? 'bell-outline'
                      : 'bell-off-outline'
                  }
                  size={18}
                  color={context.me.userTermsPush === 'Y' ? 'black' : 'red'}
                />
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 37,
                    width: 5,
                    height: 5,
                    // paddingTop: 3,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#FF402B',
                    borderRadius: 2.5,
                  }}
                />
              </>
            )}
          </TouchableOpacity>
        }
        // navigation={props.navigation}
        containerStyle={{borderBottomWidth: 0}}
      />
      <Seperator height={25} />
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('MyInfoStack', {screen: 'MyInfo'})
        }>
        <View>
          <HView style={{paddingHorizontal: 20}}>
            {context.me.userImgUrl ? (
              <Image
                uri={context.me.userImgUrl}
                width={68}
                height={68}
                borderRadius={34}
              />
            ) : (
              <Image
                local
                uri={require('../../../assets/img/img-user2.png')}
                width={68}
                height={68}
                borderRadius={34}
              />
            )}
            <Seperator width={22} />
            <View style={{flex: 1}}>
              <Text
                fontSize={21}
                text={context.me?.userName}
                fontWeight={'bold'}
              />
              <Seperator height={10} />
              <MySports userSport={context.me?.userSport} />
            </View>
          </HView>
        </View>
        <HView style={{paddingHorizontal: 20, paddingVertical: 10}}>
          <View
            style={{
              width: 68,
            }}>
            <StarRating
              disabled={true}
              maxStars={5}
              rating={context.me.userScope}
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
            <Text
              fontSize={13}
              text={`${context.me.userCoin} coin`}
              color={'gray'}
            />
            <Seperator width={20} />
            <Image
              local
              uri={require('../../../assets/img/icon-pointmoney.png')}
              width={20}
              height={20}
              borderRadius={10}
            />
            <Seperator width={10} />
            <Text
              fontSize={13}
              text={`${context.me.userPoint} point`}
              color={'gray'}
            />
          </HView>
        </HView>
      </TouchableOpacity>
      <Seperator height={10} />
      <Seperator height={11} color={'whitesmoke'} />

      {/* menu list */}
      <ScrollView>
        <Seperator height={20} />
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate('FullMap', {aroundme: true})
          }>
          <HView
            style={{
              paddingHorizontal: 20,
              paddingVertical: 20,
              justifyContent: 'space-between',
            }}>
            <HView>
              <Icons name={'icon-mylocation-20'} size={19} color={'dimgray'} />
              <Seperator width={20} />
              <Text text={'주변 살펴보기'} fontSize={16} color={'dimgray'} />
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
              <Text text={'나의 배틀'} fontSize={16} color={'dimgray'} />
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
              <Text text={'맛집소개'} fontSize={16} color={'dimgray'} />
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
              <Text text={'위시리스트'} fontSize={16} color={'dimgray'} />
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
              <Text text={'보관함'} fontSize={16} color={'dimgray'} />
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
              <Text text={'이벤트'} fontSize={16} color={'dimgray'} />
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
              <Text text={'공지사항'} fontSize={16} color={'dimgray'} />
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
              <Text text={'고객센터'} fontSize={16} color={'dimgray'} />
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
              <Text text={'설정'} fontSize={16} color={'dimgray'} />
            </HView>
            <Icons name={'icon-arrow-10'} size={10} color={'lightgray'} />
          </HView>
        </TouchableOpacity>
        {/* <Seperator line /> */}
      </ScrollView>
    </Container>
  );
}
