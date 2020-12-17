import React from 'react';
import {View} from 'react-native';
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
} from '../../react-native-nuno-ui';
import {screenHeight, screenWidth} from '../../react-native-nuno-ui/style';

export default function FindBattle() {
  return (
    <View style={{padding: 20}}>
      <Image
        local
        uri={require('../../../assets/img/img-guide-findbattle1.png')}
        height={Math.floor(screenWidth * 2 - 130)}
        width={Math.floor(screenWidth - 40)}
        resizeMode={'contain'}
      />
    </View>
  );
}
