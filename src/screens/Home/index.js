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
  Button,
} from '../../react-native-nuno-ui';
import {TouchableOpacity, View, Platform} from 'react-native';
import Icons from '../../commons/Icons';
import BattleComponent from './BattleComponent';
import {custom} from '../../config';
import {ScrollView} from 'react-native-gesture-handler';
import Axios from 'axios';
import {logApi, gotoStore, showToast} from '../../react-native-nuno-ui/funcs';
import AsyncStorage from '@react-native-community/async-storage';
import {AppContext} from '../../context';
import DeviceInfo from 'react-native-device-info';
import BattleComponentEmpty from './BattleComponentEmpty';
import {useIsFocused} from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import moment from 'moment';

export default function Home(props) {
  const context = React.useContext(AppContext);
  const [loading, setLoading] = React.useState(false);
  const [showUpdateModal, setShowUpdateModal] = React.useState(false);
  const [showPopupModal, setShowPopupModal] = React.useState(false);
  const [popupImgUrl, setPopupImgUrl] = React.useState('');
  const [alertTitle, setAertTitle] = React.useState('');
  const [alertText, setAlertText] = React.useState('');
  const [banner, setBanner] = React.useState([]);
  const [battle, setBattle] = React.useState([]);
  const [recommand, setRecommand] = React.useState([]);
  const isFocused = useIsFocused();
  const [appStartGuide] = React.useState(global.appStartGuide);
  const [pop, setPop] = React.useState(false);
  const [popup] = React.useState(global.popup);
  const [popupDate] = React.useState(global.popupDate);
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
    setPop(true);
    if (pop === true) {
      Axios.get('popup')
        .then(async (res) => {
          logApi('popup', res.data.fileUrl);
          if (res.data.fileUrl) {
            setPopupImgUrl(res.data.fileUrl);
            let now = moment().format('LL');
            if (popupDate !== now) {
              // 그만보기 설정한 날짜와 다를경우 보여짐
              setShowPopupModal(true);
            }
          }
        })
        .catch((err) => {
          logApi('popup error', err);
        });
    }
  }, [props.route.params?.pop]);

  const getToken = async () => {
    let token = await AsyncStorage.getItem('fcmToken');
    Axios.post('updatePushkey', {
      userPushkey: token,
    })
      .then((res) => {
        logApi('updatePushkey', res.data);
        console.log(token);
      })
      .catch((err) => {
        logApi('updatePushkey error', err);
        console.log(token);
      });
  };

  React.useEffect(() => {
    if (!appStartGuide) {
      props.navigation.navigate('GuideStart');
    } else {
      Axios.get('popup')
        .then(async (res) => {
          logApi('popup', res.data.fileUrl);
          if (res.data.fileUrl) {
            setPopupImgUrl(res.data.fileUrl);
            let now = moment().format('LL');
            if (popupDate !== now) {
              // 그만보기 설정한 날짜와 다를경우 보여짐
              setShowPopupModal(true);
              // props.route.params.pop = false;
            }
          }
        })
        .catch((err) => {
          logApi('popup error', err);
        });
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

    getToken();
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
          autoPlay={true}
          loop={false}
          data={banner}
          height={200}
          adIndex={true}
          navigation={props.navigation}
          dotColor={'orange'}
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

      <Modal
        isVisible={showPopupModal}
        onBackdropPress={() => setShowPopupModal(false)}>
        <View
          style={{
            padding: 20,
            backgroundColor: 'white',
            borderRadius: 10,
            // alignItems: 'center',
          }}>
          <View style={{alignItems: 'center', paddingVertical: 10}}>
            <Image
              uri={popupImgUrl}
              height={350}
              width={'100%'}
              resizeMode={'cover'}
            />
          </View>
          <Seperator height={20} />
          <View>
            <View>
              <Button
                text={'오늘 하루 그만보기'}
                color={'gray'}
                onPress={async () => {
                  await AsyncStorage.setItem(
                    'popupDate',
                    moment().format('LL'),
                  );
                  setShowPopupModal(false);
                  setPop(false);
                }}
                size={'middle'}
                stretch
              />
            </View>
            <Seperator height={10} />
            <View>
              <Button
                text={'닫기'}
                color={custom.themeColor}
                onPress={() => {
                  setShowPopupModal(false);
                  setPop(false);
                }}
                size={'middle'}
                stretch
              />
            </View>
          </View>
        </View>
      </Modal>
    </Container>
  );
}
