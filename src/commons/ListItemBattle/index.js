import React from 'react';
import {
  HView,
  Seperator,
  Text,
  Image,
  Checkbox,
  Button,
} from 'react-native-nuno-ui';
import Icons from '../Icons';
import {custom} from '../../config';
import {TouchableOpacity, View} from 'react-native';
import {ShadowStyle} from '../../styles';

export default function ListItemBattle(props) {
  return (
    <View>
      <View style={{padding: 20}}>
        <TouchableOpacity
          onPress={props.onPress}
          style={{
            padding: 20,
            borderRadius: 10,
            backgroundColor: 'white',
            ...ShadowStyle,
          }}>
          <HView style={{justifyContent: 'space-between'}}>
            <HView>
              <Text
                text={'[1] 배드민턴 하자 드루와라'}
                fontSize={16}
                fontWeight={'bold'}
              />
              <Seperator width={9} />
              <Button
                text={props.item.level}
                size={'small'}
                textColor={custom.themeColor}
                borderColor={custom.themeColor}
              />
            </HView>
            <HView>
              <Icons name={'icon-lock-12'} size={12} color={'dimgray'} />
              <Seperator width={9} />
              <Text text={'2 / 2'} fontSize={13} color={'dimgray'} />
            </HView>
          </HView>
          <Seperator height={20} />
          <HView style={{justifyContent: 'space-between'}}>
            <View style={{flex: 1}}>
              <HView style={{paddingVertical: 4}}>
                <View style={{flex: 0.2}}>
                  <Text text={'종목'} fontSize={14} color={'gray'} />
                </View>
                <View style={{flex: 0.5}}>
                  <Text text={'축구'} fontSize={14} color={'gray'} />
                </View>
              </HView>
              <HView style={{paddingVertical: 4}}>
                <View style={{flex: 0.2}}>
                  <Text text={'날짜'} fontSize={14} color={'gray'} />
                </View>
                <View style={{flex: 0.5}}>
                  <Text text={'2020-05-23'} fontSize={14} color={'gray'} />
                </View>
              </HView>
              <HView style={{paddingVertical: 4}}>
                <View style={{flex: 0.2}}>
                  <Text text={'지역'} fontSize={14} color={'gray'} />
                </View>
                <View style={{flex: 0.5}}>
                  <Text text={'2020-05-23'} fontSize={14} color={'gray'} />
                </View>
              </HView>
              <HView style={{paddingVertical: 4, alignItems: 'flex-start'}}>
                <View style={{flex: 0.2}}>
                  <Text text={'메모'} fontSize={14} color={'gray'} />
                </View>
                <View style={{flex: 0.5}}>
                  <Text
                    text={
                      '메모입니다 메모입니다 메모입니다 메모입니다 메모입니다 메모입니다'
                    }
                    fontSize={14}
                    color={'gray'}
                  />
                </View>
              </HView>
            </View>
            <View>
              {props.item.status === 'waiting' && (
                <>
                  <Button
                    text={'대기중'}
                    size={'medium'}
                    color={'#CECCCD'}
                    borderRadius={20}
                  />
                  <Seperator height={5} />
                  <Button
                    text={'삭제'}
                    size={'medium'}
                    color={'white'}
                    textColor={'gray'}
                    borderRadius={20}
                    stretch
                  />
                </>
              )}
              {props.item.status === 'playing' && (
                <Button
                  text={'배틀중'}
                  size={'medium'}
                  color={custom.themeColor}
                  borderRadius={20}
                />
              )}
              {props.item.status === 'done' && (
                <>
                  {props.item.win ? (
                    <Image
                      local
                      uri={require('../../../assets/img/icon-win.png')}
                      height={70}
                      width={70}
                      resizeMode={'cover'}
                    />
                  ) : (
                    <Image
                      local
                      uri={require('../../../assets/img/icon-lose.png')}
                      height={70}
                      width={70}
                      resizeMode={'cover'}
                    />
                  )}
                  <Button
                    text={'배틀완료'}
                    size={'medium'}
                    color={'#EBEBEB'}
                    textColor={'gray'}
                    borderRadius={20}
                  />
                  <Seperator height={5} />
                  <Button
                    text={'삭제'}
                    size={'medium'}
                    color={'white'}
                    textColor={'gray'}
                    borderRadius={20}
                    stretch
                  />
                </>
              )}
            </View>
          </HView>
        </TouchableOpacity>
      </View>
    </View>
  );
}
