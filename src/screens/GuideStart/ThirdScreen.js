import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';
import {View} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {
  Container,
  Text,
  Header,
  Seperator,
  HView,
  Image,
  Checkbox,
  Button,
  Modal,
  Nuno,
  Loader,
} from '../../react-native-nuno-ui';
import {showToast} from '../../react-native-nuno-ui/funcs';
import {screenHeight, screenWidth} from '../../react-native-nuno-ui/style';

export default function FirstScreen({navigation}) {
  const [loading, setLoading] = React.useState(false);

  return loading === true ? (
    <Loader />
  ) : (
    <View
      style={{
        position: 'absolute',
        bottom: -20,
        height: screenHeight,
        width: screenWidth,
        alignSelf: 'center',
        // backgroundColor: 'black',
        // opacity: 0.8,
      }}>
      <Image
        local
        uri={require('../../../assets/img/img-start-guide3.png')}
        height={Math.floor(screenHeight)}
        width={Math.floor(screenWidth)}
        resizeMode={'stretch'}
        // resizeMode={'contain'}
      />
      <Text
        onPress={async () => {
          await AsyncStorage.setItem('appStartGuide', JSON.stringify(true));
          global.appStartGuide = true;
          navigation.navigate('Home', {pop: true});
        }}
        style={{
          position: 'absolute',
          bottom: 120,
          alignSelf: 'center',
        }}
        textDecorationLine={'underline'}
        text={'더 이상 보지 않기 X'}
        color={'white'}
        fontSize={15}
        fontWeight={'bold'}
      />
      <Text
        onPress={() => navigation.navigate('Home', {pop: true})}
        style={{
          position: 'absolute',
          bottom: 60,
          alignSelf: 'center',
        }}
        textDecorationLine={'underline'}
        text={'CLOSE'}
        color={'white'}
        fontSize={15}
        fontWeight={'bold'}
      />
    </View>
  );
}
