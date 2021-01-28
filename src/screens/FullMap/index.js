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
  const [loading, setLoading] = React.useState(true);
  const [mapReady, setMapReady] = React.useState('');
  const [keyword, setKeyword] = React.useState('');
  const [currentLocation, setCurrentLocation] = React.useState({
    latitude: props.route?.params?.latitude || global.address.coords.latitude,
    longitude:
      props.route?.params?.longitude || global.address.coords.longitude,
  });
  const [result, setResult] = React.useState([]);
  const [actionSheetComponent, setActionSheetComponent] = React.useState(null);
  const [placeInfo, setPlaceInfo] = React.useState(null);
  const [hideFilterGuide, setHideFilterGuide] = React.useState(
    global.hideFilterGuide,
  );
  const [hideSearch, setHideSearch] = React.useState(false);
  const [hideFilter, setHideFilter] = React.useState(false);
  const [hideSearchFilter, setHideSearchFilter] = React.useState(false);

  const [caCode, setCaCode] = React.useState(0);
  const [clCode, setClCode] = React.useState(0);

  const [healthCode, setHealthCode] = React.useState(0);
  const [eatCode, setEatCode] = React.useState(0);
  const [viewCode, setViewCode] = React.useState(0);
  const [playCode, setPlayCode] = React.useState(0);

  const [itemCode, setItemCode] = React.useState(0);
  const [typeCode, setTypeCode] = React.useState(0);

  const [sendCategory, setSendCategory] = React.useState();
  const [sendSubject, setSendSubject] = React.useState([]);
  const [sendType, setSendType] = React.useState([]);

  const DEFAULT_BAPK = 195;

  React.useEffect(() => {
    let category, caCode, clCode;
    if (props.route.params?.selectedCategory) {
      console.log(
        `selected category : ${props.route.params?.selectedCategory}`,
      );
      category = props.route.params.selectedCategory;
      setSendCategory(category);
    }
    if (props.route.params?.itemList) {
      console.log('selected item : ' + props.route.params.itemList);
      caCode = props.route.params.itemList;
      setSendSubject(caCode);
    }
    if (props.route.params?.typeList) {
      console.log('selected type : ' + props.route.params.typeList);
      clCode = props.route.params.typeList;
      setSendType(clCode);
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
    setItemCode(ca);
    setTypeCode(cl);
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
      aroundme(ca, cl);
      console.log('AROUND ME ::::::::::::::');
    } else if (props.route?.params?.noSearchFilter) {
      setMapReady('noSearchFilter');
      // const temp = props.route.params?.info.map((e) => ({
      //   ...e,
      //   coords: {latitude: e.faLat, longitude: e.faLon},
      //   title: e.faName,
      // }));
      // setResult(temp);
    } else if (props.route?.params?.battleChatLink) {
      setMapReady('battleChatLink');
    }
    console.log('useEffect');
    console.log(
      global.address.coords.latitude,
      global.address.coords.longitude,
    );
    setLoading(false);
  }, [props.route.params?.itemList, props.route.params?.typeList]);

  const onMapReady = () => {
    if (props.route?.params?.aroundme) {
      // 내 주변 살펴보기
      getCategoryList(1);
      getCategoryList(2);
      getCategoryList(3);
      getCategoryList(4);
      getCategoryList(5);
      aroundme();
    } else if (props.route?.params?.facilitySearch) {
      // 배틀 장소 설정
      console.log('마커 띄우지말래서 수정함');
      // facilitySearch();
    } else if (props.route?.params?.facilityReco) {
      // 추천 운동시설
      facilityReco();
      setHideSearchFilter(true);
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
    } else if (props.route?.params?.battleChatLink) {
      // 시설정보
      setHideSearchFilter(true);
      const temp = props.route.params?.info.map((e) => ({
        faPk: e.faPk,
        faLat: e.faLat,
        faLon: e.faLon,
        coords: {latitude: e.faLat, longitude: e.faLon},
        title: e.faName,
      }));
      setResult(temp);
      getPlaceInfo(temp[0].faPk);
    }
    console.log('onMapReady : ' + mapReady);
  };

  // 배틀방 장소공유 [ 정보가져오기 ]
  const getPlaceInfo = (faPk) => {
    Axios.get(`getFacility/${faPk}`)
      .then((res) => {
        logApi('getFacility', res.data);
        let item = res.data;
        setPlaceInfo(item);
        const temp = [
          {
            faPk: item.faPk,
            faLat: item.faLat,
            faLon: item.faLon,
            coords: {latitude: item.faLat, longitude: item.faLon},
            title: item.faName,
          },
        ];
        setResult(temp);
      })
      .catch((err) => {
        logApi('getFacility error', err.response);
      });
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
  // 장소 필터[내주변 살펴보기] 운동시설용은 따로라고하네 뭔소리인지는 모르것다
  const getCategoryList = (code) => {
    Axios.get(`getCategoryList/${code}`)
      .then((res) => {
        logApi('getCategoryList', res.data);
        if (code === 1) {
          // 구기종목
          setCaCode(res.data.caCode);
          setClCode(res.data.clCode);
        } else if (code === 2) {
          // 건강운동
          setHealthCode(res.data.caCode);
        } else if (code === 3) {
          // 맛집
          setEatCode(res.data.caCode);
        } else if (code === 4) {
          // 관광지
          setViewCode(res.data.caCode);
        } else {
          // 체험
          setPlayCode(res.data.caCode);
        }
      })
      .catch((err) => {
        logApi('getCategoryList error', err.response);
      });
  };
  // 운동시설 검색 + 필터적용 검색 [배틀방]
  const facilitySearch = (PK, ca, cl) => {
    console.log(PK, ca, cl);
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
        if (res.data?.length === 0 || res.data?.facility?.length === 0) {
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
        console.log('caCode' + JSON.stringify(caCode));
        console.log('clCode' + JSON.stringify(clCode));
        if (caCode !== 0 && clCode !== 0) {
          setResult(temp);
        }
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
  const aroundme = (ca, cl) => {
    // 테스트 좌표
    // "lat": 37.55375859999999,
    // "lon": 126.9809696,
    Axios.post('aroundme', {
      // 움직이는 화면의 중앙 || 저장된 나의 위치
      lat: currentLocation.latitude, //global.address.coords.latitude,
      lon: currentLocation.longitude, //global.address.coords.longitude,
      keyword: keyword,
      caCode: ca,
      clCode: cl,
    })
      .then((res) => {
        logApi('aroundme', res.data);
        console.log(keyword);
        console.log(`ca ${JSON.stringify(ca)}`);
        console.log(`cl ${cl}`);
        if (
          keyword === '' &&
          (JSON.stringify(ca) === '[]' || ca === undefined) &&
          (JSON.stringify(cl) === '[]' || cl === undefined)
        ) {
        } else {
          if (res.data.length === 0) {
            showToast('주변에 등록된 장소가 없습니다.', 2000, 'center');
          } else {
            const temp = res.data.map((e) => ({
              ...e,
              coords: {latitude: e.faLat, longitude: e.faLon},
              title: e.faName,
              // markerComponent: require('../../../assets/img/icon-mylocation.png'),
            }));
            setResult(temp);
          }
        }
      })
      .catch((err) => {
        logApi('aroundme error', err.response);
      });
  };
  const markerOnSelect = (e) => {
    mapReady !== 'battleChatLink'
      ? setActionSheetComponent(
          <>
            <ListItem
              onPress={() => {
                props.navigation.navigate('FacilityViewModal', {
                  faPk: e.faPk,
                });
                actionSheetRef.current?.setModalVisible(false);
              }}
              item={e}
              showScrap={false}
            />
            {mapReady !== 'facilityReco' && mapReady !== 'aroundme' && (
              <View style={{paddingHorizontal: 20, paddingBottom: 10}}>
                <Button
                  text={
                    props.route.params.set === 'set' ? '설정하기' : '공유하기'
                  }
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
            )}
          </>,
        )
      : setActionSheetComponent(
          <ListItem
            onPress={() => {
              props.navigation.navigate('FacilityViewModal', {
                faPk: e.faPk,
              });
              actionSheetRef.current?.setModalVisible(false);
            }}
            item={placeInfo}
            showScrap={false}
          />,
        );
    actionSheetRef.current?.setModalVisible();
  };
  return loading === true ? (
    <Loader />
  ) : (
    <View style={{flex: 1}}>
      <Map
        // currentLocation.latitude,
        // currentLocation.longitude,
        latitude={global.address.coords.latitude}
        longitude={global.address.coords.longitude}
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
                    keyword === ''
                      ? showToast('키워드를 입력해주세요.', 2000, 'center')
                      : mapReady === 'wishList'
                      ? wishMap(keyword)
                      : mapReady === 'facilitySearch'
                      ? facilitySearch(
                          props.route?.params?.baPk,
                          itemCode,
                          typeCode,
                        )
                      : aroundme(itemCode, typeCode);
                  }}
                  placeholder={'키워드를 입력해주세요.'}
                />
              </View>
            </HView>
          )}
          <Seperator width={20} />
          {hideFilter === true || hideSearchFilter === true ? null : (
            <TouchableOpacity
              onPress={() =>
                mapReady === 'aroundme'
                  ? props.navigation.navigate('FullMapFilterAll', {
                      mapReady: mapReady,
                      category: sendCategory,
                      caCode: caCode,
                      clCode: clCode,
                      selectCa: sendSubject.length === 0 ? caCode : sendSubject,
                      selectCl: sendType.length === 0 ? clCode : sendType,
                      healthCode: healthCode,
                      eatCode: eatCode,
                      viewCode: viewCode,
                      playCode: playCode,
                    })
                  : props.navigation.navigate(
                      'FullMapFilter',
                      sendSubject.length === 0 && sendType.length === 0
                        ? {
                            mapReady: mapReady,
                            caCode: caCode,
                            clCode: clCode,
                          }
                        : {
                            mapReady: mapReady,
                            caCode: caCode,
                            clCode: clCode,
                            selectCa: sendSubject,
                            selectCl: sendType,
                            // caCode: sendSubject,
                            // clCode: sendType,
                          },
                    )
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
      {!hideFilterGuide &&
        mapReady !== 'facilityReco' &&
        mapReady !== 'battleChatLink' && (
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
