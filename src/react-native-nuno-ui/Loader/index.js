import React from 'react';
import {ActivityIndicator, View} from 'react-native';

export default function Loader({size = 35, color = 'orange'}) {
  return <ActivityIndicator size={size} color={color} />;
}
