import React from 'react';
import {
  Container,
  Text,
  Header,
  ImageCarousel,
  Modal,
  ImageViewer,
  HView,
  Seperator,
  Carousel,
  Image,
} from 'react-native-nuno-ui';
import {TouchableOpacity, View} from 'react-native';
import Icons from '../../commons/Icons';
import BattleComponent from './BattleComponent';
import {custom} from '../../config';
import {ScrollView} from 'react-native-gesture-handler';
import AwesomeAlert from 'react-native-awesome-alerts';

export default function Home(props) {
  const [showUpdateModal, setShowUpdateModal] = React.useState(false);
  const [alertTitle, setAertTitle] = React.useState('');
  const [alertText, setAlertText] = React.useState('');
  React.useEffect(() => {
    setShowUpdateModal(true);
    setAertTitle('업데이트 알림');
    setAlertText(
      '제주배틀박스 앱이 v.1.0.2 최신버전으로 업데이트되었습니다! 지금 앱 업데이트를 통해 더욱 쾌적해진 제주배틀박스를 만나보세요!',
    );
  }, []);
  return (
    <Container
      alertTitle={alertTitle}
      alertText={alertText}
      alertVisible={showUpdateModal}
      onBackdropPress={() => setShowUpdateModal(false)}
      onConfirm={() => setShowUpdateModal(false)}
      onCancel={() => setShowUpdateModal(false)}>
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
        title={'제주배틀박스'}
        navigation={props.navigation}
      />
      <ScrollView>
        <ImageCarousel
          data={[
            'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
            'https://homepages.cae.wisc.edu/~ece533/images/arctichare.png',
            'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80',
          ]}
          height={170}
        />

        {/* View Carousel */}
        <Carousel
          data={[
            <BattleComponent />,
            <BattleComponent />,
            <BattleComponent />,
            <BattleComponent />,
            <BattleComponent />,
            <BattleComponent />,
            <BattleComponent />,
            <BattleComponent />,
          ]}
          dotColor={custom.themeColor}
          paginationContainerStyle={{bottom: 0}}
        />

        <Seperator height={30} />

        {/* recommand facility */}
        <HView style={{justifyContent: 'space-between', paddingHorizontal: 20}}>
          <Text text={'추천 운동시설'} fontSize={22} fontWeight={'bold'} />
          <TouchableOpacity
            onPress={() => props.navigation.navigate('FullMap')}>
            <Icons name={'icon-map-24'} size={24} color={'gray'} />
          </TouchableOpacity>
        </HView>
        <Seperator height={30} />
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{paddingLeft: 20}}>
          <View>
            <Image
              height={105}
              width={140}
              borderRadius={4}
              uri={'https://homepages.cae.wisc.edu/~ece533/images/airplane.png'}
              onPress={() => props.navigation.navigate('FacilityView')}
              resizeMode={'cover'}
            />
            <Seperator height={10} />
            <Text text={'제주 중문 야구장'} color={'dimgray'} fontSize={16} />
          </View>
          <Seperator width={20} />
          <View>
            <Image
              height={105}
              width={140}
              borderRadius={4}
              uri={'https://homepages.cae.wisc.edu/~ece533/images/airplane.png'}
              onPress={() => props.navigation.navigate('FacilityView')}
              resizeMode={'cover'}
            />
            <Seperator height={10} />
            <Text text={'제주 중문 야구장'} color={'dimgray'} fontSize={16} />
          </View>
          <Seperator width={20} />
          <View>
            <Image
              height={105}
              width={140}
              borderRadius={4}
              uri={'https://homepages.cae.wisc.edu/~ece533/images/airplane.png'}
              onPress={() => props.navigation.navigate('FacilityView')}
              resizeMode={'cover'}
            />
            <Seperator height={10} />
            <Text text={'제주 중문 야구장'} color={'dimgray'} fontSize={16} />
          </View>
          <Seperator width={20} />
          <View>
            <Image
              height={105}
              width={140}
              borderRadius={4}
              uri={'https://homepages.cae.wisc.edu/~ece533/images/airplane.png'}
              onPress={() => props.navigation.navigate('FacilityView')}
              resizeMode={'cover'}
            />
            <Seperator height={10} />
            <Text text={'제주 중문 야구장'} color={'dimgray'} fontSize={16} />
          </View>
          <Seperator width={20} />
        </ScrollView>
        <Seperator bottom />
      </ScrollView>
      {/* <AwesomeAlert
        show={passwordAlert}
        title='비밀번호 오류'
        message='비밀번호는 영문과 숫자 포함 6자 이상입니다'
        showConfirmButton={true}
        confirmText="확인"
        confirmButtonColor={custom.themeColor}
        onConfirmPressed={() => {
          setPasswordAlert(false);
        }}
      /> */}
    </Container>
  );
}
