import React from 'react';
import {
  Map,
  Seperator,
  HView,
  TextInput,
  Image,
  Text,
  Button,
} from 'react-native-nuno-ui';
import {View, TouchableOpacity, Platform} from 'react-native';
import {ShadowStyle, screenWidth} from '../../styles';
import Icons from '../../commons/Icons';
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
import {logApi} from 'react-native-nuno-ui/funcs';
import {custom} from '../../config';
import Entypo from 'react-native-vector-icons/Entypo';
import ActionSheet from 'react-native-actions-sheet';
import ListItem from '../../commons/ListItem';
import {getStatusBarHeight, getBottomSpace} from 'react-native-iphone-x-helper';

const actionSheetRef = React.createRef();

export default function FullMap(props) {
  const [keyword, setKeyword] = React.useState('');
  const [currentLocation, setCurrentLocation] = React.useState({});
  const [result, setResult] = React.useState([]);
  const [actionSheetComponent, setActionSheetComponent] = React.useState(null);
  const [hideFilterGuide, setHideFilterGuide] = React.useState(
    global.hideFilterGuide,
  );

  React.useEffect(() => {
    aroundme();
  }, []);

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
        const temp = res.data.map((e) => ({
          ...e,
          coords: {latitude: e.faLat, longitude: e.falon},
          title: e.faName,
          markerComponent: require('../../../assets/img/icon-mylocation.png'),
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
        <ListItem onPress={() => null} item={e} showScrap={false} />
        <View style={{paddingHorizontal: 20}}>
          <Button
            text={'공유하기'}
            size={'large'}
            onPress={() => null}
            stretch
            color={custom.themeColor}
          />
          <Seperator bottom />
        </View>
      </>,
    );
    actionSheetRef.current?.setModalVisible();
  };
  return (
    <View style={{flex: 1}}>
      <Map
        latitude={37.55375859999999}
        longitude={126.9809696}
        showZoom={true}
        showCurrent={true}
        markers={result}
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
                onSubmitEditing={() => aroundme()}
                placeholder={'검색하실 키워드를 입력해주세요.'}
              />
            </View>
          </HView>
          <Seperator width={20} />
          <TouchableOpacity
            onPress={() => props.navigation.navigate('FullMapFilter')}
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
