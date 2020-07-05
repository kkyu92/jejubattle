import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import { custom } from '../../config';
import { Text } from 'react-native-nuno-ui';
import { ShadowStyle } from '../../styles';

export default function FloatingButton({onPress}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 60,
        height: 60,
        // paddingTop: 3,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: custom.themeColor,
        borderRadius: 30,
        ...ShadowStyle,
      }}>
      <Text
        text={'+'}
        fontSize={40}
        color={'white'}
        style={{letterSpacing: -1}}
      />
    </TouchableOpacity>
  );
}
