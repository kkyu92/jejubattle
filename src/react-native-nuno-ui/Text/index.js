import React from 'react';
import {Text} from 'react-native';
import {Nuno} from '..';

export default ({
  text,
  onPress,
  textDecorationLine,
  ellipsizeMode,
  numberOfLines,
  fontSize,
  fontWeight,
  color,
  style,
}) => {
  return (
    <Text
      onPress={onPress}
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      style={{
        textDecorationLine: textDecorationLine,
        fontSize: fontSize,
        fontWeight: fontWeight,
        color: color || Nuno.config.textColor,
        ...style,
      }}>
      {text}
    </Text>
  );
};
