import React from 'react';
import {Platform, View} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {custom} from '../../config';
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
import {screenHeight, screenWidth} from '../../react-native-nuno-ui/style';

export default function FirstScreen() {
  const [loading, setLoading] = React.useState(false);

  return loading === true ? (
    <Loader />
  ) : (
    <View
      style={
        // Platform.OS === 'ios'
        //   ? {
        //       position: 'absolute',
        //       bottom: -20,
        //       height: 'auto',
        //       maxHeight: screenHeight,
        //     }
        //   :
        {
          position: 'absolute',
          bottom: -20,
          height: screenHeight,
          width: screenWidth,
          alignSelf: 'center',
          //   backgroundColor: 'black',
          //   opacity: 0.8,
        }
      }>
      <Image
        local
        uri={require('../../../assets/img/img-start-guide.png')}
        height={Math.floor(screenHeight)}
        width={Math.floor(screenWidth)}
        resizeMode={'stretch'}
      />
    </View>
  );
}
