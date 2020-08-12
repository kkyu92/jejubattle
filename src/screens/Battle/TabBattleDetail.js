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
  Image,
} from 'react-native-nuno-ui';
import {TouchableOpacity, View, FlatList, ScrollView} from 'react-native';
import Icons from '../../commons/Icons';
import {custom} from '../../config';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Axios from 'axios';
import { logApi } from 'react-native-nuno-ui/funcs';

export default function TabBattleDetail(props) {
  const [modalExit, setModalExit] = React.useState(false);
  const [modalStart, setModalStart] = React.useState(false);
  const [modalSetting, setModalSetting] = React.useState(false);
  const [modalSettingAlert, setModalSettingAlert] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [place, setPlace] = React.useState('');
  const [startTime, setStartTime] = React.useState(new Date());

  const updateBattle = () => {
    Axios.post('updateBattle', {
      baPlace: '',
      baStartTime: startTime,
    })
      .then((res) => {
        logApi('updateBattle', res.data);
        setLoading(false);
      })
      .catch((err) => {
        logApi('updateBattle error', err.response);
        setLoading(false);
      });
  };
  return (
    <Container>
      <ScrollView>

        <HView
          style={{
            justifyContent: 'space-evenly',
            paddingVertical: 30,
            paddingHorizontal: 20,
          }}>
          <TouchableOpacity
            style={{flex: 1, alignItems: 'center'}}
            onPress={() => props.navigation.navigate('Report')}>
            <Icons name={'icon-report-30'} size={30} color={'silver'} />
            <Seperator height={10} />
            <Text
              text={'신고하기'}
              fontSize={13}
              fontWeight={'500'}
              color={'gray'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{flex: 1, alignItems: 'center'}}
            onPress={() => setModalSetting(true)}>
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
            <Text
              text={props.info.teamA?.member[0]?.userName}
              fontSize={14}
              color={'gray'}
            />
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
            <Text text={props.info.bcName} fontSize={14} color={'gray'} />
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
            <Text text={props.info.bzName} fontSize={14} color={'gray'} />
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
            <Text text={props.info.btName} fontSize={14} color={'gray'} />
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
            <Text text={props.info.baContent} fontSize={14} color={'gray'} />
          </View>
        </HView>
        {/* <View style={{flex: 1}} /> */}
      </ScrollView>
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
          size={'large'}
          // stretch
        />
        <Seperator width={20} />
        <View style={{flex: 1}}>
          <Button
            text={'배틀시작'}
            onPress={() => {
              if (!props.info.baPlace || !baStartTime) {
                setModalSettingAlert(true);
                return;
              }
              setModalStart(true);
            }}
            color={custom.themeColor}
            disable={false}
            loading={false}
            size={'large'}
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
                size={'large'}
                stretch
              />
            </View>
            <Seperator width={20} />
            <View style={{flex: 1}}>
              <Button
                text={'삭제'}
                color={custom.themeColor}
                onPress={() => null}
                size={'large'}
                stretch
              />
            </View>
          </HView>
        </View>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => setModalExit(false)}
            style={{
              marginTop: 20,
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: 'white',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <AntDesign name={'close'} size={30} color={'dimgray'} />
          </TouchableOpacity>
        </View>
      </Modal>
      {/* 배틀시작 버튼 */}
      <Modal
        isVisible={modalStart}
        onBackdropPress={() => setModalStart(false)}>
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
            style={{textAlign: 'center'}}
            text={
              '코인을 사용하여\n배틀을 시작하시겠습니까?\n더욱 풍부한 보상을\n받으실 수 있습니다.'
            }
          />
          <Seperator height={30} />
          <HView ttyle={{justifyContent: 'center'}}>
            <Text fontSize={16} color={'dimgray'} text={'보유 코인'} />
            <Seperator width={30} />
            <Image
              local
              uri={require('../../../assets/img/icon-coinmoney.png')}
              height={20}
              width={20}
              resizeMode={'cover'}
            />
            <Seperator width={10} />
            <Text fontSize={16} color={'dimgray'} text={'2 coin'} />
          </HView>
          <Seperator height={10} />
          <HView ttyle={{justifyContent: 'center'}}>
            <Text fontSize={16} color={'dimgray'} text={'보유 포인트'} />
            <Seperator width={30} />
            <Image
              local
              uri={require('../../../assets/img/icon-pointmoney.png')}
              height={20}
              width={20}
              resizeMode={'cover'}
            />
            <Seperator width={10} />
            <Text fontSize={16} color={'dimgray'} text={'3 point'} />
          </HView>
          <Seperator height={20} />
          <View style={{alignItems: 'center'}}>
            <Button
              size={'medium'}
              text={'랜덤박스 보기'}
              onPress={() => {
                setModalStart(false);
                props.navigation.navigate('RandomBox');
              }}
              color={'white'}
              borderRadius={20}
            />
          </View>
          <Seperator height={30} />
          <HView>
            <View style={{flex: 1}}>
              <Button
                text={'아니요'}
                color={'gray'}
                onPress={() => null}
                size={'large'}
                stretch
              />
            </View>
            <Seperator width={20} />
            <View style={{flex: 1}}>
              <Button
                text={'예'}
                color={custom.themeColor}
                onPress={() => null}
                size={'large'}
                stretch
              />
            </View>
          </HView>
        </View>
      </Modal>
      {/* 필수설정이 완료되지 않았을때  */}
      <Modal
        isVisible={modalSettingAlert}
        onBackdropPress={() => setModalSettingAlert(false)}>
        <View
          style={{
            padding: 20,
            backgroundColor: 'white',
            borderRadius: 10,
          }}>
          <View style={{alignItems: 'center', paddingVertical: 10}}>
            <Text
              fontSize={18}
              fontWeight={'bold'}
              color={'black'}
              text={'알림'}
            />
          </View>
          <Seperator height={30} />
          <View style={{alignItems: 'center'}}>
            <Text
              fontSize={16}
              style={{textAlign: 'center'}}
              color={'dimgray'}
              text={'필수설정이 완료되지 않았습니다.\n필수설정을 완료해주세요.'}
            />
          </View>
          <Seperator height={30} />
          <Button
            text={'확인'}
            size={'large'}
            onPress={() => setModalSettingAlert(false)}
            stretch
            color={custom.themeColor}
          />
        </View>
      </Modal>
      {/* 필수설정 버튼 */}
      <Modal
        isVisible={modalSetting}
        onBackdropPress={() => setModalSetting(false)}>
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
            <Text text={'장소설정'} fontSize={14} fontWeight={'bold'} />
            <TextInput
              value={''}
              onChangeText={() => null}
              borderWidth={0}
              placeholder={'장소이름'}
            />
            <Seperator line marginBottom={20} />
            <Text text={'시간'} fontSize={14} fontWeight={'bold'} />
            <DateTime
              mode={'time'}
              closeBar
              value={startTime}
              onChange={(e) => setStartTime(e)}
              borderWidth={0}
              placeholder={'자세한시간'}
            />
            <Seperator line marginBottom={20} />
            <Text text={'날짜선택'} fontSize={14} fontWeight={'bold'} />
            <DateTime
              value={startTime}
              closeBar
              onChange={(e) => setStartTime(e)}
              borderWidth={0}
              placeholder={'자세한시간'}
            />
            <Seperator line />
          </View>
          <Seperator height={50} />
          <HView>
            <View style={{flex: 1}}>
              <Button
                text={'취소'}
                color={'gray'}
                onPress={() => setModalSetting(false)}
                size={'large'}
                stretch
              />
            </View>
            <Seperator width={20} />
            <View style={{flex: 1}}>
              <Button
                text={'적용'}
                color={custom.themeColor}
                onPress={() => updateBattle()}
                size={'large'}
                stretch
              />
            </View>
          </HView>
        </View>
      </Modal>
    </Container>
  );
}
