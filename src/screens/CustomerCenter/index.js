import React from 'react';
import {
  Container,
  Header,
  Text,
  Image,
  HView,
  Seperator,
  TextInput,
  Button,
  Checkbox,
  Modal,
} from 'react-native-nuno-ui';
import {View, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import Icons from '../../commons/Icons';
import {custom} from '../../config';
import ListItem from '../../commons/ListItem';
import {screenWidth} from '../../styles';

export default function CustomerCenter(props) {
  return (
    <Container>
      <Header left={'close'} title={'고객센터'} navigation={props.navigation} />
      <Seperator height={20} />
      <View style={{padding: 40}}>
        <Text text={'고객센터 문의선택'} fontSize={24} fontWeight={'bold'} />
      </View>

      <View style={{padding: 40}}>
        <Button text={'레스포제주 카카오채널'} fontSize={18} onPress={() => null} color={'#FFEB3B'} textColor={'black'} stretch />
        <Seperator height={10} />
        <Button text={'메일보내기'} fontSize={18} onPress={() => null} color={'white'} textColor={'black'} stretch />
      </View>
    </Container>
  );
}
