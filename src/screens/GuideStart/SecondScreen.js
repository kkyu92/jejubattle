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
import {screenHeight, screenWidth} from '../../react-native-nuno-ui/style';

export default function FirstScreen() {
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
        uri={require('../../../assets/img/img-start-guide2.png')}
        height={Math.floor(screenHeight)}
        width={Math.floor(screenWidth)}
        resizeMode={'stretch'}
      />
    </View>
  );
}
