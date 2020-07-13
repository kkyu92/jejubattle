import React from 'react';
import {
  Container,
  Text,
  Header,
  Seperator,
  HView,
  Button,
  TextInput,
  Picker,
  DateTime,
  Checkbox,
  Modal,
} from 'react-native-nuno-ui';
import {TouchableOpacity, View, FlatList} from 'react-native';
import Icons from '../../commons/Icons';
import {custom} from '../../config';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default function TabBattleDetail(props) {
  const [modalExit, setModalExit] = React.useState(false);
  const [modalSetting, setModalSetting] = React.useState(false);
  return (
    <Container>
      <HView
        style={{
          justifyContent: 'space-evenly',
          paddingVertical: 30,
          paddingHorizontal: 20,
        }}>
        <TouchableOpacity style={{flex: 1, alignItems: 'center'}} onPress={() => props.navigation.navigate('Report')}>
          <Icons name={'icon-report-30'} size={30} color={'silver'} />
          <Seperator height={10} />
          <Text
            text={'신고하기'}
            fontSize={13}
            fontWeight={'500'}
            color={'gray'}
          />
        </TouchableOpacity>
        <TouchableOpacity style={{flex: 1, alignItems: 'center'}} onPress={() => setModalSetting(true)}>
          <Icons name={'icon-setting-30'} size={30} color={'silver'} />
          <Seperator height={10} />
          <Text
            text={'필수설정'}
            fontSize={13}
            fontWeight={'500'}
            color={'gray'}
          />
        </TouchableOpacity>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Icons name={'icon-guide-30'} size={30} color={'silver'} />
          <Seperator height={10} />
          <Text
            text={'가이드'}
            fontSize={13}
            fontWeight={'500'}
            color={'gray'}
          />
        </View>
      </HView>
      <HView style={{paddingHorizontal: 20, paddingVertical: 10}}>
        <View style={{flex: 0.1}}>
          <Text
            text={'방장'}
            fontSize={14}
            fontWeight={'bold'}
            color={'gray'}
          />
        </View>
        <View style={{flex: 0.4}}>
          <Text text={'게으른슈퍼맨'} fontSize={14} color={'gray'} />
        </View>
        <View style={{flex: 0.1}}>
          <Text
            text={'종목'}
            fontSize={14}
            fontWeight={'bold'}
            color={'gray'}
          />
        </View>
        <View style={{flex: 0.4}}>
          <Text text={'축구'} fontSize={14} color={'gray'} />
        </View>
      </HView>
      <HView style={{paddingHorizontal: 20, paddingVertical: 10}}>
        <View style={{flex: 0.1}}>
          <Text
            text={'지역'}
            fontSize={14}
            fontWeight={'bold'}
            color={'gray'}
          />
        </View>
        <View style={{flex: 0.4}}>
          <Text text={'제주시 연동'} fontSize={14} color={'gray'} />
        </View>
        <View style={{flex: 0.1}}>
          <Text
            text={'인원'}
            fontSize={14}
            fontWeight={'bold'}
            color={'gray'}
          />
        </View>
        <View style={{flex: 0.4}}>
          <Text text={'1 vs 1'} fontSize={14} color={'gray'} />
        </View>
      </HView>
      <HView
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          alignItems: 'flex-start',
        }}>
        <View style={{flex: 0.1}}>
          <Text
            text={'메모'}
            fontSize={14}
            fontWeight={'bold'}
            color={'gray'}
          />
        </View>
        <View style={{flex: 0.9}}>
          <Text
            text={
              '메모입니다.메모입니다.메모입니다.메모입니다.메모입니다.메모입니다.메모입니다.메모입니다.메모입니다.메모입니다.메모입니다.'
            }
            fontSize={14}
            color={'gray'}
          />
        </View>
      </HView>
      <View style={{flex: 1}} />
      <HView
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderTopColor: 'lightgray',
          borderTopWidth: 1,
        }}>
        <Button
          text={'나가기'}
          onPress={() => setModalExit(true)}
          color={'white'}
          disable={false}
          loading={false}
          // stretch
        />
        <Seperator width={20} />
        <View style={{flex: 1}}>
          <Button
            text={'배틀시작'}
            onPress={() => null}
            color={custom.themeColor}
            disable={false}
            loading={false}
            stretch
          />
        </View>
      </HView>
      <Seperator bottom />
      {/* 나가기 버튼 */}
      <Modal isVisible={modalExit} onBackdropPress={() => setModalExit(false)}>
        <View
          style={{
            padding: 20,
            backgroundColor: 'white',
            borderRadius: 10,
            alignItems: 'center',
          }}>
          <Text
            fontSize={18}
            fontWeight={'bold'}
            color={'black'}
            text={'해당 방을 삭제하시겠습니까?'}
          />
          <Seperator height={50} />
          <Text
            fontSize={16}
            color={'dimgray'}
            text={'삭제를 원하지 않으시다면\n방장을 위임하세요!'}
            style={{textAlign: 'center'}}
          />
          <Seperator height={50} />
          <HView>
            <View style={{flex: 1}}>
              <Button
                text={'위임하기'}
                color={'gray'}
                onPress={() => null}
                stretch
              />
            </View>
            <Seperator width={20} />
            <View style={{flex: 1}}>
              <Button
                text={'삭제'}
                color={custom.themeColor}
                onPress={() => null}
                stretch
              />
            </View>
          </HView>
        </View>
      </Modal>
      {/* 필수설정 버튼 */}
      <Modal isVisible={modalSetting} onBackdropPress={() => setModalSetting(false)}>
        <View
          style={{
            padding: 20,
            backgroundColor: 'white',
            borderRadius: 10,
          }}>
          <View style={{alignItems: 'center'}}>
            <Text
              fontSize={18}
              fontWeight={'bold'}
              color={'black'}
              text={'필수설정'}
            />
          </View>
          <Seperator height={50} />
          <View>
            <TextInput title={'장소설정'} value={''} onChangeText={() => null} borderWidth={0} placeholder={'장소이름'} />
            <Seperator line marginBottom={20} />
            <DateTime type={'time'} title={'시간'} value={''} onPress={() => null} borderWidth={0} placeholder={'자세한시간'} />
            <Seperator line marginBottom={20} />
            <DateTime title={'날짜선택'} value={''} onPress={() => null} borderWidth={0} placeholder={'자세한시간'} />
            <Seperator line />
          </View>
          <Seperator height={50} />
          <HView>
            <View style={{flex: 1}}>
              <Button
                text={'취소'}
                color={'gray'}
                onPress={() => null}
                stretch
              />
            </View>
            <Seperator width={20} />
            <View style={{flex: 1}}>
              <Button
                text={'적용'}
                color={custom.themeColor}
                onPress={() => null}
                stretch
              />
            </View>
          </HView>
        </View>
      </Modal>
    </Container>
  );
}
