import React from 'react';
import Icons from '../Icons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {custom} from '../../config';
import {TouchableOpacity, View} from 'react-native';
import {
  HView,
  Seperator,
  Text,
  Image,
  Checkbox,
} from '../../react-native-nuno-ui';

export default function ListItem(props) {
  let tagList = '';
  props.item?.faHashtag?.map((tag) => {
    tagList = tagList + tag.tag + ' ';
  });
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
            uri={props.item.faImgUrl}
            onPress={props.onPress}
            resizeMode={'cover'}
          />
          <Seperator width={10} />
          <View style={{flex: 1, alignSelf: 'center'}}>
            <Text text={props.item.faName} fontSize={16} fontWeight={'bold'} />
            <Seperator height={10} />
            <Text
              text={props.item.faSubject?.replace(/<br>/g, '\n')}
              fontSize={14}
              ellipsizeMode={'tail'}
              numberOfLines={2}
              color={'gray'}
            />
            <Seperator height={5} />
            {tagList !== '' ? (
              <>
                <Text
                  text={tagList}
                  fontSize={12}
                  fontWeight={'bold'}
                  color={'orange'}
                />
                <Seperator height={5} />
              </>
            ) : (
              <Seperator height={5} />
            )}
            <HView>
              <Icons
                name={'icon-star-12'}
                size={12}
                color={custom.themeColor}
              />
              <Seperator width={5} />
              <Text
                text={`${props.item.faScopeCnt} / 5.0`}
                fontSize={13}
                color={'gray'}
              />
              <Seperator width={5} />
              <Icons name={'icon-like-12'} size={12} color={'gray'} />
              <Seperator width={5} />
              <Text text={props.item.faLikeCnt} fontSize={13} color={'gray'} />
              <Seperator width={5} />
              <Icons name={'icon-reply-12'} size={12} color={'gray'} />
              <Seperator width={5} />
              <Text text={props.item.faReplyCnt} fontSize={13} color={'gray'} />
            </HView>
          </View>
          <Seperator width={10} />
          {props.editMode ? (
            <Checkbox
              multiple
              checked={props.item.checked}
              onPress={() => props.handleCheck(props.index)}
              size={'large'}
            />
          ) : (
            props.showScrap &&
            (props.item.faScrapType === 'N' ? (
              <TouchableOpacity
                onPress={() => props.scrapOn(props.item, props.index)}>
                {/* <Icons name="icon-bookmark-20" size={20} color={'black'} /> */}
                <MaterialIcons
                  name={'bookmark-border'}
                  size={24}
                  color={'black'}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => props.scrapOff(props.item, props.index)}>
                {/* <Icons
                  name="icon-bookmark-s-20"
                  size={24}
                  color={custom.themeColor}
                /> */}
                <MaterialIcons
                  name={'bookmark'}
                  size={24}
                  color={custom.themeColor}
                />
              </TouchableOpacity>
            ))
          )}
        </HView>
      </TouchableOpacity>
    </View>
  );
}
