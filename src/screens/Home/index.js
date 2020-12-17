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
} from '../../react-native-nuno-ui';
import {TouchableOpacity, View, Platform} from 'react-native';
import Icons from '../../commons/Icons';
import BattleComponent from './BattleComponent';
import {custom} from '../../config';
import {ScrollView} from 'react-native-gesture-handler';
import Axios from 'axios';
import {logApi, gotoStore} from '../../react-native-nuno-ui/funcs';
import AsyncStorage from '@react-native-community/async-storage';
import {AppContext} from '../../context';
import DeviceInfo from 'react-native-device-info';
import BattleComponentEmpty from './BattleComponentEmpty';
import {useIsFocused} from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';

export default function Home(props) {
  const context = React.useContext(AppContext);
  const [loading, setLoading] = React.useState(false);
  const [showUpdateModal, setShowUpdateModal] = React.useState(false);
  const [alertTitle, setAertTitle] = React.useState('');
  const [alertText, setAlertText] = React.useState('');
  const [banner, setBanner] = React.useState([]);
  const [battle, setBattle] = React.useState([]);
  const [recommand, setRecommand] = React.useState([]);
  const isFocused = useIsFocused();
  const [appStartGuide] = React.useState(global.appStartGuide);
  let list = [];
  React.useEffect(() => {
    if (isFocused) {
      setLoading(true);
      Axios.get('mainList')
        .then(async (res) => {
          logApi('mainList', res.data);
          setBanner(res.data.bannerList);
          // setBanner(res.data.bannerList.map((e) => e.imgUrl));
          setBattle(res.data.battleList);
          setRecommand(res.data.recomList);
        })
        .catch((err) => {
          logApi('mainList error', err?.response);
        });
      setLoading(false);
      let teamB = {
        member: [{ready: 'N'}, {ready: 'Y'}, {ready: 'N'}],
      };
      let check = teamB.member.findIndex((e) => e.ready === 'N');
      console.log('findIndex: ' + check);
    }
  }, [isFocused]);

  React.useEffect(() => {
    if (!appStartGuide) {
      props.navigation.navigate('GuideStart');
    }
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
      <Spinner visible={loading} textContent={''} color={'#F4A100'} />
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
          // data={banner.map((e) => e.imgUrl)}
          data={banner}
          height={200}
          adIndex={true}
          navigation={props.navigation}
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
        {battle.length === 0 ? (
          <Carousel
            data={[<BattleComponentEmpty />]}
            dotColor={custom.themeColor}
            paginationContainerStyle={{
              position: 'absolute',
              bottom: 20,
              left: 0,
              right: 0,
              alignItems: 'center',
            }}
          />
        ) : (
          <Carousel
            data={
              (list = battle.map((b, i) => (
                <BattleComponent
                  key={i}
                  data={b}
                  navigation={props.navigation}
                />
              )))
            }
            dotColor={custom.themeColor}
            paginationContainerStyle={{
              position: 'absolute',
              bottom: 20,
              left: 0,
              right: 0,
              alignItems: 'center',
            }}
          />
        )}
        <Seperator height={30} />

        {/* recommand facility */}
        <HView style={{justifyContent: 'space-between', paddingHorizontal: 20}}>
          <Text text={'추천 운동시설'} fontSize={22} fontWeight={'bold'} />
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('FullMap', {
                // facilitySearch: true,
                // 추천 운동시설들의 좌표값이 필요함
                facilityReco: true,
              })
            }>
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
