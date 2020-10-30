import React from 'react';
import {
  Container,
  Text,
  Seperator,
  Image,
  HView,
} from '../../react-native-nuno-ui';
import {ActivityIndicator, View} from 'react-native';

export default () => (
  <Container>
    <View style={{padding: 20}}>
      <ActivityIndicator color={'#F4A100'} />
    </View>
  </Container>
);
