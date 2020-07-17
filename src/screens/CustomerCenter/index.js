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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function CustomerCenter(props) {
  return (
    <Container>
      <Header left={'close'} title={'고객센터'} navigation={props.navigation} />
      <Seperator height={20} />
      <View style={{padding: 40}}>
        <Text text={'고객센터 문의선택'} fontSize={24} fontWeight={'bold'} />
      </View>

      <View style={{padding: 40}}>
        <TouchableOpacity onPress={() => null}>
          <HView style={{backgroundColor: '#FFEB3B', padding: 20, borderRadius: 10}}>
            <Icons name={'icon-kakaotalk-25'} color={'#623935'} size={24} />
            <Seperator width={20} />
            <Text text={'레스포제주 카카오채널'} fontSize={18} />
          </HView>
        </TouchableOpacity>
        <Seperator height={10} />
        <TouchableOpacity onPress={() => null}>
          <HView style={{backgroundColor: 'white', borderWidth: 1, borderColor: 'lightgray', padding: 20, borderRadius: 10}}>
            <MaterialIcons name={'email'} color={'gray'} size={24} />
            <Seperator width={20} />
            <Text text={'메일보내기'} fontSize={18} />
          </HView>
        </TouchableOpacity>
      </View>
    </Container>
  );
}
