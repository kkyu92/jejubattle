import React from 'react';
import {Map, Seperator, HView, TextInput, Image} from 'react-native-nuno-ui';
import {View, TouchableOpacity} from 'react-native';
import {ShadowStyle} from '../../styles';
import Icons from '../../commons/Icons';

export default function FullMap(props) {
  return (
    <View style={{flex: 1}} keyboardShouldPersistTaps={'handled'}>
      <Map
        showZoom={true}
        showCompass={true}
        customCenter={
          <Image
            local
            uri={require('../../../assets/img/icon-mylocation.png')}
            height={40}
            width={40}
            resizeMode={'cover'}
          />
        }
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
                value={''}
                onChangeText={() => null}
                borderWidth={0}
                placeholder={'검색하실 키워드를 입력해주세요.'}
                clearButtonMode={true}
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
    </View>
  );
}
