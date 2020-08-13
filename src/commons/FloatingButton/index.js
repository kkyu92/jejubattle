import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import { custom } from '../../config';
import { Text } from 'react-native-nuno-ui';
import { ShadowStyle } from '../../styles';
import Feather from 'react-native-vector-icons/Feather';

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
      <Feather name={'plus'} color={'white'} size={30} />
    </TouchableOpacity>
  );
}
