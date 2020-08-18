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
import {TouchableOpacity, View, Platform} from 'react-native';
import Icons from '../../commons/Icons';
import BattleComponent from './BattleComponent';
import {custom} from '../../config';
import {ScrollView} from 'react-native-gesture-handler';
import Axios from 'axios';
import {logApi, gotoStore} from 'react-native-nuno-ui/funcs';
import AsyncStorage from '@react-native-community/async-storage';
import {AppContext} from '../../context';
import DeviceInfo from 'react-native-device-info';

export default function Home(props) {
  const context = React.useContext(AppContext);
  const [showUpdateModal, setShowUpdateModal] = React.useState(false);
  const [alertTitle, setAertTitle] = React.useState('');
  const [alertText, setAlertText] = React.useState('');
  const [banner, setBanner] = React.useState([]);
  const [recommand, setRecommand] = React.useState([]);
  React.useEffect(() => {
    Axios.get('mainList')
      .then(async (res) => {
        logApi('mainList', res.data);
        setBanner(res.data.bannerList.map((e) => e.imgUrl));
        setRecommand(res.data.recomList);
      })
      .catch((err) => {
        // setLoading(false);
        logApi('mainList error', err?.response);
      });

    Axios.post('version', {})
      .then(async (res) => {
        const version = DeviceInfo.getVersion();
        // const buildNumber = DeviceInfo.getBuildNumber();
        console.log(`Device Version ${version}`);
        console.log(`Store Version ${res.data.appVersion}`);
        if (version !== res.data.appVersion) {
          setShowUpdateModal(true);
          setAertTitle('업데이트 알림');
          setAlertText(
            `제주배틀박스 앱이 v.${res.data.appVersion} 최신버전으로 업데이트되었습니다! 지금 앱 업데이트를 통해 더욱 쾌적해진 제주배틀박스를 만나보세요!`,
          );
        }
        // if (res.data.build_no !== buildNumber) {
        //   setShowUpdateModal(true);
        //   setAertTitle('업데이트 알림');
        //   setAlertText(
        //     `제주배틀박스 앱이 v.${res.data.appVersion} 최신버전으로 업데이트되었습니다! 지금 앱 업데이트를 통해 더욱 쾌적해진 제주배틀박스를 만나보세요!`,
        //   );
        // }
      })
      .catch((err) => {
        console.log('Version error', err.response);
      });
  }, []);
  return (
    <Container
      alertTitle={alertTitle}
      alertText={alertText}
      alertVisible={showUpdateModal}
      onBackdropPress={() => setShowUpdateModal(false)}
      onConfirm={() => {
        setShowUpdateModal(false);
        gotoStore();
      }}
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
          data={banner}
          height={170}
          onPress={() => null}
          dotColor={'white'}
          paginationContainerStyle={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            alignItems: 'center',
          }}
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
          paginationContainerStyle={{
            position: 'absolute',
            bottom: 20,
            left: 0,
            right: 0,
            alignItems: 'center',
          }}
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
          {recommand.map((e) => {
            return (
              <View style={{width: 140, marginRight: 20}} key={e.code}>
                <Image
                  height={105}
                  width={140}
                  borderRadius={4}
                  uri={e.imgUrl}
                  onPress={() =>
                    props.navigation.navigate('FacilityView', {faPk: e.code})
                  }
                  resizeMode={'cover'}
                />
                <Seperator height={10} />
                <Text text={e.name} color={'dimgray'} fontSize={16} />
              </View>
            );
          })}
        </ScrollView>
        <Seperator bottom />
      </ScrollView>
    </Container>
  );
}
