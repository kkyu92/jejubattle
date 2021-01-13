import React from 'react';
import Icons from '../Icons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {custom} from '../../config';
import {ShadowStyle} from '../../styles';
import {TouchableOpacity, View} from 'react-native';
import {
  HView,
  Seperator,
  Text,
  Image,
  Checkbox,
} from '../../react-native-nuno-ui';

export default function ListItemReco(props) {
  let tagList = '';
  // props.item.faHashtag.map((tag) => {
  //   tagList = tagList + tag.tag + ' ';
  // });
  return (
    <View
      style={{
        backgroundColor: 'white',
        borderRadius: 8,
        marginVertical: 10,
        marginHorizontal: 20,
        ...ShadowStyle,
      }}>
      <TouchableOpacity onPress={props.onPress}>
        <HView
          style={{
            padding: 10,
            alignItems: 'center',
          }}>
          <Image
            height={105}
            width={140}
            borderRadius={4}
            uri={props.item.faImgUrl}
            onPress={props.onPress}
            resizeMode={'cover'}
          />
          <Seperator width={20} />
          <View style={{flex: 1, paddingVertical: 10}}>
            <Text text={props.item.faName} fontSize={16} fontWeight={'bold'} />
            <Seperator height={10} />
            <Text
              text={tagList}
              fontSize={13}
              ellipsizeMode={'tail'}
              numberOfLines={2}
              color={'orange'}
            />
            <Seperator height={20} />
            <Text
              text={props.item.faSubject}
              fontSize={14}
              ellipsizeMode={'tail'}
              numberOfLines={1}
              color={'gray'}
            />
          </View>
        </HView>
      </TouchableOpacity>
    </View>
  );
}
