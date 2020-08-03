import React from 'react';
import {HView, Seperator, Text, Image, Checkbox} from 'react-native-nuno-ui';
import Icons from '../Icons';
import {custom} from '../../config';
import {TouchableOpacity, View} from 'react-native';
import Axios from 'axios';
import {AppContext} from '../../context';
import {logApi} from 'react-native-nuno-ui/funcs';

export default function ListItem(props) {
  const context = React.useContext(AppContext);
  const scrapOn = () => {
    Axios.post('scrapOn', {
      faPk: props.item.faPk,
      userPk: context.me.userPk,
    })
      .then((res) => {
        logApi('scrapOn', res.data);
      })
      .catch((err) => {
        logApi('scrapOn error', err.response);
      });
  };
  const scrapOff = () => {
    Axios.post('scrapOff', {
      faPk: props.item.faPk,
      userPk: context.me.userPk,
    })
      .then((res) => {
        logApi('scrapOff', res.data);
      })
      .catch((err) => {
        logApi('scrapOff error', err.response);
      });
  };
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
          <View style={{flex: 1, paddingVertical: 10}}>
            <Text text={props.item.faName} fontSize={16} fontWeight={'bold'} />
            <Seperator height={10} />
            <Text text={props.item.faSubject} fontSize={14} color={'gray'} />
            <Seperator height={20} />
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
            // <Checkbox value={false} onPress={() => null} />
            <Checkbox
              multiple
              checked={true}
              onPress={() => null}
              size={'large'}
            />
          ) : props.item.faScrapType === 'N' ? (
            <TouchableOpacity onPress={() => scrapOn()}>
              <Icons name="icon-bookmark-20" size={20} color={'black'} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => scrapOff()}>
              <Icons name="icon-bookmark-s-20" size={20} color={custom.themeColor} />
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
