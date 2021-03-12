import React from 'react';
import {ActivityIndicator, View} from 'react-native';

export default function Loader({size = 35, color = 'orange'}) {
  return (
    <View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
}
