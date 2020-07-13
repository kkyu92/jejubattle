import React from 'react';
import { HView, Seperator, Text, Image, Checkbox } from 'react-native-nuno-ui';
import Icons from '../Icons';
import { custom } from '../../config';
import { TouchableOpacity, View } from 'react-native';

export default function ListItem(props) {
  return (
    <View>
      <TouchableOpacity onPress={props.onPress}>
        <HView
          style={{
            padding: 20,
            alignItems: props.editMode ? 'center' : 'flex-start',
          }}>
          <Image
            height={105}
            width={140}
            borderRadius={4}
            uri={'https://homepages.cae.wisc.edu/~ece533/images/airplane.png'}
            onPress={props.onPress}
            resizeMode={'cover'}
          />
          <Seperator width={10} />
          <View style={{flex: 1, paddingVertical: 10}}>
            <Text
              text={'스트라이크존 신제주구장'}
              fontSize={16}
              fontWeight={'bold'}
            />
            <Seperator height={10} />
            <Text
              text={'제주시 최고의 스크린야구장'}
              fontSize={14}
              color={'gray'}
            />
            <Seperator height={20} />
            <HView>
              <Icons
                name={'icon-star-12'}
                size={12}
                color={custom.themeColor}
              />
              <Seperator width={5} />
              <Text text={'4.8 / 5.0'} fontSize={13} color={'gray'} />
              <Seperator width={5} />
              <Icons name={'icon-like-12'} size={12} color={'gray'} />
              <Seperator width={5} />
              <Text text={'4,222'} fontSize={13} color={'gray'} />
              <Seperator width={5} />
              <Icons name={'icon-reply-12'} size={12} color={'gray'} />
              <Seperator width={5} />
              <Text text={'4,222'} fontSize={13} color={'gray'} />
            </HView>
          </View>
          <Seperator width={10} />
          {props.editMode ? (
            // <Checkbox value={false} onPress={() => null} />
            <Checkbox multiple checked={true} onPress={() => null} size={'large'} />
          ) : (
            <TouchableOpacity onPress={() => null}>
              <Icons name="icon-bookmark-20" size={20} color={'black'} />
            </TouchableOpacity>
          )}
        </HView>
      </TouchableOpacity>
      <View style={{paddingLeft: 20}}>
        <Seperator line />
      </View>
    </View>
  );
}
