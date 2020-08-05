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
import {View, TouchableOpacity} from 'react-native';
import {ShadowStyle, screenWidth} from '../../styles';
import Icons from '../../commons/Icons';
import Axios from 'axios';
import {logApi} from 'react-native-nuno-ui/funcs';
import {custom} from '../../config';
import ActionSheet from 'react-native-actions-sheet';
import ListItem from '../../commons/ListItem';

const actionSheetRef = React.createRef();

export default function FullMap(props) {
  const [keyword, setKeyword] = React.useState('');
  const [currentLocation, setCurrentLocation] = React.useState({});
  const [result, setResult] = React.useState([]);
  const [actionSheetComponent, setActionSheetComponent] = React.useState(null);

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
