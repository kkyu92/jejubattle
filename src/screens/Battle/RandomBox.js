import React from 'react';
import {
  Container,
  Text,
  Header,
  Seperator,
  HView,
  Button,
  TextInput,
  Picker,
  DateTime,
  Checkbox,
} from '../../react-native-nuno-ui';
import {TouchableOpacity, View, FlatList} from 'react-native';
import Icons from '../../commons/Icons';
import {custom} from '../../config';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default function RandomBox(props) {
  return (
    <Container>
      <Header
        left={'back'}
        title={'랜덤박스 확률정보'}
        navigation={props.navigation}
      />
      <KeyboardAwareScrollView>
        <Seperator height={20} />
        <View style={{padding: 20}}>
          <Text text={'스포츠 랜덤박스'} fontSize={18} fontWeight={'bold'} />
          <Seperator height={20} />
          <HView style={{backgroundColor: 'whitesmoke'}}>
            <View
              style={{
                flex: 0.7,
                paddingVertical: 10,
                borderWidth: 1,
                borderColor: 'lightgray',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text text={'상품'} fontSize={16} fontWeight={'bold'} />
            </View>
            <View
              style={{
                flex: 0.3,
                marginLeft: -1,
                paddingVertical: 10,
                borderWidth: 1,
                borderColor: 'lightgray',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text text={'확률'} fontSize={16} fontWeight={'bold'} />
            </View>
          </HView>
          <HView style={{marginTop: -1}}>
            <View
              style={{
                flex: 0.7,
                paddingVertical: 10,
                borderWidth: 1,
                borderColor: 'lightgray',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text text={'2 Point'} fontSize={14} color={'dimgray'} />
            </View>
            <View
              style={{
                flex: 0.3,
                marginLeft: -1,
                paddingVertical: 10,
                borderWidth: 1,
                borderColor: 'lightgray',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text text={'66%'} fontSize={14} color={'dimgray'} />
            </View>
          </HView>
          <HView style={{marginTop: -1}}>
            <View
              style={{
                flex: 0.7,
                paddingVertical: 10,
                borderWidth: 1,
                borderColor: 'lightgray',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text text={'2 Point'} fontSize={14} color={'dimgray'} />
            </View>
            <View
              style={{
                flex: 0.3,
                marginLeft: -1,
                paddingVertical: 10,
                borderWidth: 1,
                borderColor: 'lightgray',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text text={'66%'} fontSize={14} color={'dimgray'} />
            </View>
          </HView>
        </View>
        <View style={{padding: 20}}>
          <Text text={'뷰티 랜덤박스'} fontSize={18} fontWeight={'bold'} />
          <Seperator height={20} />
          <HView style={{backgroundColor: 'whitesmoke'}}>
            <View
              style={{
                flex: 0.7,
                paddingVertical: 10,
                borderWidth: 1,
                borderColor: 'lightgray',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text text={'상품'} fontSize={16} fontWeight={'bold'} />
            </View>
            <View
              style={{
                flex: 0.3,
                marginLeft: -1,
                paddingVertical: 10,
                borderWidth: 1,
                borderColor: 'lightgray',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text text={'확률'} fontSize={16} fontWeight={'bold'} />
            </View>
          </HView>
          <HView style={{marginTop: -1}}>
            <View
              style={{
                flex: 0.7,
                paddingVertical: 10,
                borderWidth: 1,
                borderColor: 'lightgray',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text text={'2 Point'} fontSize={14} color={'dimgray'} />
            </View>
            <View
              style={{
                flex: 0.3,
                marginLeft: -1,
                paddingVertical: 10,
                borderWidth: 1,
                borderColor: 'lightgray',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text text={'66%'} fontSize={14} color={'dimgray'} />
            </View>
          </HView>
          <HView style={{marginTop: -1}}>
            <View
              style={{
                flex: 0.7,
                paddingVertical: 10,
                borderWidth: 1,
                borderColor: 'lightgray',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text text={'2 Point'} fontSize={14} color={'dimgray'} />
            </View>
            <View
              style={{
                flex: 0.3,
                marginLeft: -1,
                paddingVertical: 10,
                borderWidth: 1,
                borderColor: 'lightgray',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text text={'66%'} fontSize={14} color={'dimgray'} />
            </View>
          </HView>
        </View>
      </KeyboardAwareScrollView>
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderTopColor: 'lightgray',
          borderTopWidth: 1,
        }}>
        <Button
          text={'확인'}
          onPress={() => {
            props.navigation.goBack();
          }}
          color={custom.themeColor}
          disable={false}
          loading={false}
          size={'large'}
          stretch
        />
        <Seperator bottom />
      </View>
    </Container>
  );
}
