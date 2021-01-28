import React from 'react';
import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
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
    <ScrollView style={{padding: 20}}>
      <Image
        local
        uri={require('../../../assets/img/img_guide_findbattle1.png')}
        height={Math.floor(screenWidth * 2 - 130)}
        width={Math.floor(screenWidth - 40)}
        resizeMode={'contain'}
      />
    </ScrollView>
  );
}
