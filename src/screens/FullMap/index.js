import React from 'react';
import {
  Map,
  Seperator,
  HView,
  TextInput,
  Image,
  Text,
  Button,
  Loader,
} from '../../react-native-nuno-ui';
import {View, TouchableOpacity, Platform} from 'react-native';
import {ShadowStyle, screenWidth} from '../../styles';
import Icons from '../../commons/Icons';
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
import {
  getCurrentLocation,
  logApi,
  share,
  showToast,
  sleep,
} from '../../react-native-nuno-ui/funcs';
import {custom} from '../../config';
import Entypo from 'react-native-vector-icons/Entypo';
import ActionSheet from 'react-native-actions-sheet';
import ListItem from '../../commons/ListItem';
import {getStatusBarHeight, getBottomSpace} from 'react-native-iphone-x-helper';
import Geolocation from 'react-native-geolocation-service';
// import deviceInfoModule from 'react-native-device-info';

const actionSheetRef = React.createRef();

export default function FullMap(props) {
  const [loading, setLoading] = React.useState(false);
  const [mapReady, setMapReady] = React.useState('');
  const [keyword, setKeyword] = React.useState('');
  const [currentLocation, setCurrentLocation] = React.useState({
    latitude: props.route?.params?.latitude || undefined,
    longitude: props.route?.params?.longitude || undefined,
  });
  const [result, setResult] = React.useState([]);
  const [actionSheetComponent, setActionSheetComponent] = React.useState(null);
  const [hideFilterGuide, setHideFilterGuide] = React.useState(
    global.hideFilterGuide,
  );
  const [hideSearch, setHideSearch] = React.useState(false);
  const [hideFilter, setHideFilter] = React.useState(false);
  const [hideSearchFilter, setHideSearchFilter] = React.useState(false);

  const [caCode, setCaCode] = React.useState(0);
  const [clCode, setClCode] = React.useState(0);

  const DEFAULT_BAPK = 195;

  // const [selectedSports, setSelectedSports] = React.useState([]);
  // const [selectedClCode, setSelectedClCode] = React.useState([]);
  React.useEffect(() => {
    let caCode, clCode;
    if (props.route.params?.sportsList) {
      console.log('selectedSports : ' + props.route.params.sportsList);
      caCode = props.route.params.sportsList;
    }
    if (props.route.params?.clCodeList) {
      console.log('selectedClCode : ' + props.route.params.clCodeList);
      clCode = props.route.params.clCodeList;
    }
    let ca = [];
    let cl = [];
    if (caCode) {
      caCode.map((c) => {
        ca.push({code: c});
      });
    }
    if (clCode) {
      clCode.map((c) => {
        cl.push({code: c});
      });
    }
    // filter 적용 후
    if (props.route?.params?.facilityReco) {
      setMapReady('facilityReco');
      facilityReco(ca, cl);
    } else if (props.route?.params?.facilitySearch) {
      setMapReady('facilitySearch');
      facilitySearch(props.route?.params?.baPk, ca, cl);
    } else if (props.route?.params?.wishList) {
      setMapReady('wishList');
      wishMap();
    } else if (props.route?.params?.aroundme) {
      setMapReady('aroundme');
      aroundme();
    } else if (props.route?.params?.noSearchFilter) {
      setMapReady('noSearchFilter');
      const temp = props.route.params?.info.map((e) => ({
        ...e,
        coords: {latitude: e.faLat, longitude: e.faLon},
        title: e.faName,
      }));
      setResult(temp);
    }
    console.log('useEffect');
    setLoading(true);
  }, [props.route.params?.sportsList, props.route.params?.clCodeList]);

  const onMapReady = () => {
    if (props.route?.params?.aroundme) {
      // 내 주변 살펴보기
      aroundme();
      setHideFilter(true);
    } else if (props.route?.params?.facilitySearch) {
      // 배틀 장소 설정
      console.log('여기맞아?');
      facilitySearch();
    } else if (props.route?.params?.facilityReco) {
      // 추천 운동시설
      facilityReco();
      setHideSearch(true);
    } else if (props.route?.params?.wishList) {
      // 위시리스트 지도
      wishMap();
      setHideFilter(true);
    } else if (props.route?.params?.noSearchFilter) {
      // 시설정보
      setHideSearchFilter(true);
      const temp = props.route.params?.info.map((e) => ({
        faImgUrl: e.faImgUrl,
        faLikeCnt: e.faLikeCnt,
        faPk: e.faPk,
        faName: e.faName,
        faReplyCnt: e.faReplyCnt,
        faScopeCnt: e.faScopeCnt,
        faScrapType: e.faScrapType,
        faSubject: e.faSubject,
        faLat: e.faLat,
        faLon: e.faLon,
        coords: {latitude: e.faLat, longitude: e.faLon},
        title: e.faName,
      }));
      setResult(temp);
    }
    console.log('onMapReady : ' + mapReady);
  };

  // 위시리스트 지도
  const wishMap = (word) => {
    Axios.post('wishMap', {
      keyword: word,
    })
      .then((res) => {
        logApi('wishMap', res.data);
        if (res.data.length === 0) {
          showToast('위시리스트에 등록된 장소가 없습니다.', 2000, 'center');
        }
        const temp = res.data.map((e) => ({
          ...e,
          coords: {latitude: e.faLat, longitude: e.faLon},
          title: e.faName,
        }));
        setResult(temp);
      })
      .catch((err) => {
        logApi('wishMap error', err.response);
      });
  };
  // 추천 운동시설 리스트 받기 [메인 추천운동시설 지도]
  const facilityReco = (ca, cl) => {
    Axios.post('recomMap', {caCode: ca, clCode: cl})
      .then((res) => {
        logApi('recomMap', res.data);
        if (res.data.facility.length === 0) {
          showToast('조건에 맞는 장소가 없습니다.', 2000, 'center');
        }
        const temp = res.data.facility.map((e) => ({
          ...e,
          coords: {latitude: e.faLat, longitude: e.faLon},
          title: e.faName,
        }));
        setResult(temp);
        if (!ca) {
          setCaCode(res.data.caCode);
          setClCode(res.data.clCode);
        }
      })
      .catch((err) => {
        logApi('recomMap error', err.response);
      });
  };
  // 운동시설 검색 + 필터적용 검색 [배틀방, 내주변 살펴보기]
  const facilitySearch = (PK, ca, cl) => {
    let baPk;
    PK === DEFAULT_BAPK
      ? (baPk = DEFAULT_BAPK)
      : (baPk = props.route?.params?.baPk);
    Axios.post(
      'facilitySearch',
      caCode === 0 && clCode === 0
        ? {
            baPk: baPk,
          }
        : {
            baPk: baPk,
            keyword: keyword,
            caCode: ca,
            clCode: cl,
          },
    )
      .then((res) => {
        logApi('facilitySearch', res.data);
        if (res.data.length === 0) {
          showToast('조건에 맞는 장소가 없습니다.', 2000, 'center');
        }
        const temp = res.data.facility.map((e) => ({
          faImgUrl: e.faImgUrl,
          faLikeCnt: e.faLikeCnt,
          faPk: e.faPk,
          faName: e.faName,
          faReplyCnt: e.faReplyCnt,
          faScopeCnt: e.faScopeCnt,
          faScrapType: e.faScrapType,
          faSubject: e.faSubject,
          faLat: e.faLat,
          faLon: e.faLon,
          coords: {latitude: e.faLat, longitude: e.faLon},
          title: e.faName,
        }));
        setResult(temp);
        // if (
        //   mapReady === 'facilitySearch' ||
        //   mapReady === 'aroundMe' ||
        //   mapReady === ''
        // ) {
        //   setResult(temp);
        //   console.log('facilitySearch ::: ' + JSON.stringify(temp));
        // }
        // console.log('facilitySearch1 ::: ' + mapReady);
        // console.log('facilitySearch2 ::: ' + JSON.stringify(temp));
        setCaCode(res.data.caCode);
        setClCode(res.data.clCode);
      })
      .catch((err) => {
        logApi('facilitySearch error', err.response);
      });
  };
  const aroundme = () => {
    // 테스트 좌표
    // "lat": 37.55375859999999,
    // "lon": 126.9809696,
    Axios.post('aroundme', {
      lat: currentLocation.latitude, //global.address.coords.latitude,
      lon: currentLocation.longitude, //global.address.coords.longitude,
      keyword: keyword,
    })
      .then((res) => {
        logApi('aroundme', res.data);
        if (res.data.length === 0) {
          showToast('주변에 등록된 장소가 없습니다.', 2000, 'center');
        }
        const temp = res.data.map((e) => ({
          ...e,
          coords: {latitude: e.faLat, longitude: e.faLon},
          title: e.faName,
          // markerComponent: require('../../../assets/img/icon-mylocation.png'),
        }));
        setResult(temp);
      })
      .catch((err) => {
        logApi('aroundme error', err.response);
      });
  };
  const markerOnSelect = (e) => {
    setActionSheetComponent(
      <>
        <ListItem
          onPress={() =>
            props.navigation.navigate('FacilityView', {faPk: e.faPk})
          }
          item={e}
          showScrap={false}
        />
        <View style={{paddingHorizontal: 20, paddingBottom: 10}}>
          <Button
            text={'공유하기'}
            size={'large'}
            onPress={async () => {
              if (props.route?.params?.share) {
                actionSheetRef.current?.setModalVisible(false);
                await sleep(500);
                props.navigation.goBack();
                props.route.params.share(e);
              } else {
                share(
                  `https://jejubattle.com/facility/${e.faPk}`,
                  e.faName,
                  e.faSubject,
                  e.faImgUrl,
                  '',
                );
              }
            }}
            stretch
            color={custom.themeColor}
          />
          <Seperator bottom />
        </View>
      </>,
    );
    actionSheetRef.current?.setModalVisible();
  };
  return loading === false ? (
    <Loader />
  ) : (
    <View style={{flex: 1}}>
      <Map
        latitude={currentLocation.latitude}
        longitude={currentLocation.longitude}
        showZoom={true}
        showCurrent={true}
        markers={result}
        onMapReady={onMapReady}
        getCurrentPosition={(e) => setCurrentLocation(e)}
        customCenter={
          <Image
            local
            uri={require('../../../assets/img/icon-mylocation.png')}
            height={40}
            width={40}
            resizeMode={'cover'}
          />
        }
        markerOnSelect={markerOnSelect}
        mapReady={mapReady}
        setLoading={setLoading}
      />
      <View style={{position: 'absolute', top: 0, left: 0, right: 0}}>
        <Seperator top />
        <HView style={{padding: 20, justifyContent: 'space-between'}}>
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={{
              backgroundColor: 'white',
              width: 40,
              height: 40,
              borderRadius: 20,
              borderColor: 'lightgray',
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center',
              ...ShadowStyle,
            }}>
            <Icons name={'icon-cancel-7'} size={12} />
          </TouchableOpacity>
          <Seperator width={20} />
          {hideSearch === true || hideSearchFilter == true ? null : (
            <HView
              style={{
                flex: 1,
                backgroundColor: 'white',
                borderRadius: 22,
                borderColor: 'lightgray',
                borderWidth: 1,
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: 20,
                paddingRight: 20,
                ...ShadowStyle,
              }}>
              <Icons name="icon-search-16" size={16} color={'black'} />
              <View style={{flex: 1}}>
                <TextInput
                  value={keyword}
                  onChangeText={(e) => setKeyword(e)}
                  borderWidth={0}
                  returnKeyType={'search'}
                  returnKeyLabel={'검색'}
                  onSubmitEditing={() => {
                    mapReady === 'wishList' ? wishMap(keyword) : aroundme();
                  }}
                  placeholder={'검색하실 키워드를 입력해주세요.'}
                />
              </View>
            </HView>
          )}
          <Seperator width={20} />
          {hideFilter === true || hideSearchFilter === true ? null : (
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('FullMapFilter', {
                  mapReady: mapReady,
                  caCode: caCode,
                  clCode: clCode,
                })
              }
              style={{
                backgroundColor: 'white',
                width: 40,
                height: 40,
                borderRadius: 20,
                borderColor: 'lightgray',
                borderWidth: 1,
                alignItems: 'center',
                justifyContent: 'center',
                ...ShadowStyle,
              }}>
              <Icons name={'icon-filter-13'} size={13} />
            </TouchableOpacity>
          )}
        </HView>
      </View>
      {!hideFilterGuide && (
        <View
          style={{
            backgroundColor: '#303441',
            borderRadius: 5,
            paddingHorizontal: 20,
            paddingTop: 20,
            position: 'absolute',
            top: (Platform.OS === 'ios' ? getStatusBarHeight() : 0) + 80,
            right: 20,
            alignItems: 'center',
          }}>
          <Text
            text={'필터를 통해 원하는 시설을 찾으세요!'}
            color={'white'}
            fontSize={16}
          />
          <TouchableOpacity
            onPress={async () => {
              await AsyncStorage.setItem(
                'hideFilterGuide',
                JSON.stringify(true),
              );
              setHideFilterGuide(true);
              global.hideFilterGuide = true;
            }}
            style={{padding: 15}}>
            <Text text={'X 다시보지않기'} color={'lightgray'} fontSize={12} />
          </TouchableOpacity>
          <View style={{position: 'absolute', top: -18, right: 10}}>
            <Entypo name={'triangle-up'} color={'#303441'} size={26} />
          </View>
        </View>
      )}
      <ActionSheet
        ref={actionSheetRef}
        gestureEnabled={true}
        // keyboardShouldPersistTaps={'always'}
        defaultOverlayOpacity={0}
        bounceOnOpen={true}>
        {actionSheetComponent}
      </ActionSheet>
    </View>
  );
}
