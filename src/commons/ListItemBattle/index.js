import React from 'react';
import {
  HView,
  Seperator,
  Text,
  Image,
  Checkbox,
  Button,
} from 'react-native-nuno-ui';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
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
                text={props.item.baSubject}
                fontSize={16}
                fontWeight={'bold'}
              />
              <Seperator width={9} />
              <Button
                text={props.item.blName}
                size={'small'}
                textColor={custom.themeColor}
                borderColor={custom.themeColor}
              />
            </HView>
            <HView>
              {props.item.baPrivate === 'Y' ? (
                <MaterialIcons name={'lock'} color={'dimgray'} size={12} />
              ) : (
                <MaterialIcons name={'lock-open'} color={'dimgray'} size={12} />
              )}
              <Seperator width={9} />
              <Text text={props.item.btName} fontSize={13} color={'dimgray'} />
            </HView>
          </HView>
          <Seperator height={20} />
          <HView style={{justifyContent: 'space-between'}}>
            <View style={{flex: 1}}>
              <HView style={{paddingVertical: 4}}>
                <View style={{flex: 0.2}}>
                  <Text text={'종목'} fontSize={14} color={'gray'} />
                </View>
                <View style={{flex: 0.8}}>
                  <Text
                    text={props.item.baSubject}
                    fontSize={14}
                    color={'gray'}
                  />
                </View>
              </HView>
              <HView style={{paddingVertical: 4}}>
                <View style={{flex: 0.2}}>
                  <Text text={'날짜'} fontSize={14} color={'gray'} />
                </View>
                <View style={{flex: 0.8}}>
                  <Text text={props.item.baDate} fontSize={14} color={'gray'} />
                </View>
              </HView>
              <HView style={{paddingVertical: 4}}>
                <View style={{flex: 0.2}}>
                  <Text text={'지역'} fontSize={14} color={'gray'} />
                </View>
                <View style={{flex: 0.8}}>
                  <Text text={props.item.bzName} fontSize={14} color={'gray'} />
                </View>
              </HView>
              <HView style={{paddingVertical: 4, alignItems: 'flex-start'}}>
                <View style={{flex: 0.2}}>
                  <Text text={'메모'} fontSize={14} color={'gray'} />
                </View>
                <View style={{flex: 0.8}}>
                  <Text
                    text={props.item.baContent}
                    fontSize={14}
                    color={'gray'}
                  />
                </View>
              </HView>
            </View>
            <View>
              {props.item.baState === '대기중' && (
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
              {props.item.baState === 'playing' && (
                <Button
                  text={'배틀중'}
                  size={'medium'}
                  color={custom.themeColor}
                  borderRadius={20}
                />
              )}
              {props.item.baState === 'done' && (
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
