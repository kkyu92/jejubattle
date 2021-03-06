import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Text from '../Text';
import {Nuno} from '..';

export default function Checkbox({
  multiple,
  type,
  size,
  color,
  checked,
  onPress,
  label,
  labelColor,
  fontWeight,
  disabled,
  customChecked,
  customUnChecked,
  labelPress,
}) {
  let iconChecked, iconUnchecked, labelSize, iconSize;
  switch (size) {
    case 'small':
      labelSize = 12;
      iconSize = 18;
      break;
    case 'large':
      labelSize = 18;
      iconSize = 28;
      break;
    default:
      labelSize = 14;
      iconSize = 22;
      break;
  }
  if (multiple) {
    iconChecked = customChecked || (
      <MaterialIcons
        name={'check-box'}
        color={disabled ? 'gray' : Nuno.config.themeColor}
        size={iconSize}
      />
    );
    iconUnchecked = customUnChecked || (
      <MaterialIcons
        name={'check-box-outline-blank'}
        color={disabled ? 'gray' : 'dimgray'}
        size={iconSize}
      />
    );
  } else {
    iconChecked = customChecked || (
      <MaterialIcons
        name={'radio-button-checked'}
        color={disabled ? 'gray' : Nuno.config.themeColor}
        size={iconSize}
      />
    );
    iconUnchecked = customUnChecked || (
      <MaterialIcons
        name={'radio-button-unchecked'}
        color={disabled ? 'gray' : 'dimgray'}
        size={iconSize}
      />
    );
  }

  return labelPress ? (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <TouchableOpacity onPress={onPress}>
        {checked ? iconChecked : iconUnchecked}
      </TouchableOpacity>
      {label && (
        <TouchableOpacity onPress={labelPress} style={{marginLeft: 6}}>
          <Text
            fontSize={labelSize}
            fontWeight={fontWeight ? fontWeight : checked ? 'bold' : '300'}
            color={disabled || !checked ? 'gray' : labelColor || 'dimgray'}
            text={label}
          />
        </TouchableOpacity>
      )}
    </View>
  ) : (
    <TouchableOpacity
      onPress={onPress}
      style={{flexDirection: 'row', alignItems: 'center'}}>
      {checked ? iconChecked : iconUnchecked}
      {label && (
        <View style={{marginLeft: 6}}>
          <Text
            fontSize={labelSize}
            fontWeight={fontWeight ? fontWeight : checked ? 'bold' : '300'}
            color={disabled || !checked ? 'gray' : labelColor || 'dimgray'}
            text={label}
          />
        </View>
      )}
    </TouchableOpacity>
  );
}
