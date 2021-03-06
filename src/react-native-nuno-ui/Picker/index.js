import React from 'react';
import {
  Platform,
  Modal,
  View,
  // Picker,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Seperator from '../Seperator';
import Text from '../Text';
import {screenHeight} from '../style';
import {Picker} from '@react-native-community/picker';

export default ({
  items,
  title,
  value,
  onChange,
  disabled,
  placeholder,
  closeBar,
  closeBarColor,
  backgroundColor,
  borderWidth,
}) => {
  const [showPicker, setShowPicker] = React.useState(false);

  const selected = items.filter((e) => e.code !== '' && e.code === value);
  return (
    <View>
      {title && (
        <>
          <Text
            fontSize={16}
            fontWeight={'500'}
            text={title}
            color={'dimgray'}
          />
          <Seperator height={10} />
        </>
      )}

      {Platform.OS === 'ios' ? (
        <View>
          <TouchableOpacity
            onPress={disabled ? () => null : () => setShowPicker(!showPicker)}
            activeOpacity={disabled ? 1 : 0.5}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderWidth: borderWidth !== undefined ? borderWidth : 1,
              borderColor: 'lightgray',
              borderRadius: 4,
              backgroundColor: 'white',
              height: 44,
              paddingHorizontal: 10,
            }}>
            <View>
              {selected.length > 0 ? (
                !disabled ? (
                  <Text
                    fontSize={14}
                    color={'dimgray'}
                    text={selected[0].name}
                  />
                ) : (
                  <Text
                    fontSize={14}
                    color={'darkgray'}
                    text={selected[0].name}
                  />
                )
              ) : (
                <Text fontSize={14} color={'gray'} text={placeholder} />
              )}
            </View>
            <AntDesign name={'down'} size={10} color={'black'} />
          </TouchableOpacity>

          <Modal visible={showPicker} transparent animationType={'slide'}>
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
              }}>
              <TouchableOpacity
                style={{flex: 1}}
                onPress={() => setShowPicker(!showPicker)}
              />
              {closeBar && (
                <View
                  style={{
                    height: 50,
                    backgroundColor: closeBarColor || 'lightgray',
                    borderColor: 'lightgray',
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                  }}>
                  <TouchableOpacity
                    onPress={() => setShowPicker(!showPicker)}
                    style={{paddingHorizontal: 20, paddingVertical: 10}}>
                    <Text text={'확인'} fontSize={16} color={'gray'} />
                    {/* <AntDesign name={'down'} size={20} color={'gray'} /> */}
                  </TouchableOpacity>
                </View>
              )}
              <View style={{backgroundColor: backgroundColor || 'white'}}>
                <View
                  style={{
                    justifyContent: 'center',
                  }}>
                  <Picker
                    selectedValue={value}
                    onValueChange={onChange}
                    enabled={disabled ? false : true}>
                    {items.map((item, index) => {
                      return (
                        <Picker.Item
                          label={item.name}
                          value={item.code}
                          key={index}
                        />
                      );
                    })}
                  </Picker>
                </View>
                <Seperator bottom />
              </View>
            </View>
          </Modal>
        </View>
      ) : (
        <View
          style={{
            borderWidth: borderWidth !== undefined ? borderWidth : 1,
            borderColor: 'lightgray',
            borderRadius: 5,
            height: 44,
            justifyContent: 'center',
          }}>
          <Picker selectedValue={value} onValueChange={onChange}>
            {items.map((item, index) => {
              return (
                <Picker.Item label={item.name} value={item.code} key={index} />
              );
            })}
          </Picker>
        </View>
      )}
    </View>
  );
};
