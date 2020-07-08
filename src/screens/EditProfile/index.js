import React from 'react';
import {
  Container,
  Header,
  Text,
  Image,
  HView,
  Seperator,
  TextInput,
  Button,
  Modal,
} from 'react-native-nuno-ui';
import {View, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import Icons from '../../commons/Icons';
import {custom} from '../../config';
import ListItem from '../../commons/ListItem';
import {screenWidth} from '../../styles';

export default function EditProfile(props) {
  const [modalIntroduce, setModalIntroduce] = React.useState(false);
  const [modalPassword, setModalPassword] = React.useState(false);
  return (
    <Container>
      <Header left={'close'} title={'정보수정'} navigation={props.navigation} />
      <ScrollView>
        <View style={{padding: 20}}>
          <HView style={{paddingVertical: 30}}>
            <View style={{flex: 0.2}}>
              <Text text={'이름'} fontSize={18} fontWeight={'500'} />
            </View>
            <View style={{flex: 0.8}}>
              <Text
                text={'내이름'}
                color={'gray'}
                fontSize={18}
                fontWeight={'500'}
              />
            </View>
          </HView>
          <HView style={{paddingVertical: 10}}>
            <View style={{flex: 0.2}}>
              <Text text={'전화번호'} fontSize={18} fontWeight={'500'} />
            </View>
            <View style={{flex: 0.6}}>
              <Text
                text={'010-9999-2222'}
                color={'gray'}
                fontSize={18}
                fontWeight={'500'}
              />
            </View>
            <View style={{flex: 0.2}}>
              <Button
                text={'인증'}
                size={'medium'}
                borderRadius={20}
                color={'white'}
              />
            </View>
          </HView>
          <HView style={{paddingVertical: 10}}>
            <View style={{flex: 0.2}}>
              <Text text={'이메일'} fontSize={18} fontWeight={'500'} />
            </View>
            <View style={{flex: 0.6}}>
              <Text
                text={'example@gmail.com'}
                color={'gray'}
                fontSize={18}
                fontWeight={'500'}
              />
            </View>
            <View style={{flex: 0.2}}>
              <Button
                text={'인증'}
                size={'medium'}
                borderRadius={20}
                color={'white'}
              />
            </View>
          </HView>
          <HView style={{paddingVertical: 10}}>
            <View style={{flex: 0.2}}>
              <Text text={'성별'} fontSize={18} fontWeight={'500'} />
            </View>
            <View style={{flex: 0.8}}>
              <Text
                text={'여성'}
                color={'gray'}
                fontSize={18}
                fontWeight={'500'}
              />
            </View>
          </HView>
          <HView style={{paddingVertical: 10}}>
            <View style={{flex: 0.2}}>
              <Text text={'SNS연동'} fontSize={18} fontWeight={'500'} />
            </View>
            <View style={{flex: 0.8}}>
              <Text
                text={'연동완료 (FACEBOOK)'}
                color={'gray'}
                fontSize={18}
                fontWeight={'500'}
              />
            </View>
          </HView>
          <HView style={{paddingVertical: 10}}>
            <View style={{flex: 0.2}}>
              <Text text={'소개'} fontSize={18} fontWeight={'500'} />
            </View>
            <View style={{flex: 0.6}}>
              <Text
                text={'잘 부탁드립니다.'}
                color={'gray'}
                fontSize={18}
                fontWeight={'500'}
              />
            </View>
            <View style={{flex: 0.2}}>
              <TouchableOpacity onPress={() => setModalIntroduce(true)}>
                <Icons name={'icon-pencil-12'} size={16} />
              </TouchableOpacity>
            </View>
          </HView>
          <HView style={{paddingVertical: 10}}>
            <View style={{flex: 0.2}}>
              <Text text={'비밀번호'} fontSize={18} fontWeight={'500'} />
            </View>
            <View style={{flex: 0.8}}>
              <Button
                text={'비밀번호 변경'}
                size={'medium'}
                borderRadius={20}
                color={custom.themeColor}
                onPress={() => setModalPassword(true)}
              />
            </View>
          </HView>

          <Seperator height={40} />
          <Text text={'선호 종목 선정'} fontSize={18} fontWeight={'bold'} />
          <Seperator height={20} />
          <HView style={{flexWrap: 'wrap'}}>
            <View style={{padding: 10, alignItems: 'center'}}>
              <Image
                local
                height={Math.floor((screenWidth - 140) / 5)}
                width={Math.floor((screenWidth - 140) / 5)}
                uri={require('../../../assets/img/icon-soccer.png')}
                onPress={() => null}
                resizeMode={'cover'}
              />
              <Seperator height={10} />
              <Text text={'축구'} fontSize={14} />
            </View>
            <View style={{padding: 10, alignItems: 'center'}}>
              <Image
                local
                height={Math.floor((screenWidth - 140) / 5)}
                width={Math.floor((screenWidth - 140) / 5)}
                uri={require('../../../assets/img/icon-basketball.png')}
                onPress={() => null}
                resizeMode={'cover'}
              />
              <Seperator height={10} />
              <Text text={'농구'} fontSize={14} />
            </View>
            <View style={{padding: 10, alignItems: 'center'}}>
              <Image
                local
                height={Math.floor((screenWidth - 140) / 5)}
                width={Math.floor((screenWidth - 140) / 5)}
                uri={require('../../../assets/img/icon-baseball.png')}
                onPress={() => null}
                resizeMode={'cover'}
              />
              <Seperator height={10} />
              <Text text={'야구'} fontSize={14} />
            </View>
            <View style={{padding: 10, alignItems: 'center'}}>
              <Image
                local
                height={Math.floor((screenWidth - 140) / 5)}
                width={Math.floor((screenWidth - 140) / 5)}
                uri={require('../../../assets/img/icon-golf.png')}
                onPress={() => null}
                resizeMode={'cover'}
              />
              <Seperator height={10} />
              <Text text={'골프'} fontSize={14} />
            </View>
            <View style={{padding: 10, alignItems: 'center'}}>
              <Image
                local
                height={Math.floor((screenWidth - 140) / 5)}
                width={Math.floor((screenWidth - 140) / 5)}
                uri={require('../../../assets/img/icon-tennis.png')}
                onPress={() => null}
                resizeMode={'cover'}
              />
              <Seperator height={10} />
              <Text text={'테니스'} fontSize={14} />
            </View>
            <View style={{padding: 10, alignItems: 'center'}}>
              <Image
                local
                height={Math.floor((screenWidth - 140) / 5)}
                width={Math.floor((screenWidth - 140) / 5)}
                uri={require('../../../assets/img/icon-badminton.png')}
                onPress={() => null}
                resizeMode={'cover'}
              />
              <Seperator height={10} />
              <Text text={'배드민턴'} fontSize={14} />
            </View>
            <View style={{padding: 10, alignItems: 'center'}}>
              <Image
                local
                height={Math.floor((screenWidth - 140) / 5)}
                width={Math.floor((screenWidth - 140) / 5)}
                uri={require('../../../assets/img/icon-billards.png')}
                onPress={() => null}
                resizeMode={'cover'}
              />
              <Seperator height={10} />
              <Text text={'당구'} fontSize={14} />
            </View>
            <View style={{padding: 10, alignItems: 'center'}}>
              <Image
                local
                height={Math.floor((screenWidth - 140) / 5)}
                width={Math.floor((screenWidth - 140) / 5)}
                uri={require('../../../assets/img/icon-balling.png')}
                onPress={() => null}
                resizeMode={'cover'}
              />
              <Seperator height={10} />
              <Text text={'볼링'} fontSize={14} />
            </View>
          </HView>
        </View>
      </ScrollView>
      <HView
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderTopColor: 'lightgray',
          borderTopWidth: 1,
        }}>
        <Button
          text={'수정하기'}
          onPress={() => null}
          color={custom.themeColor}
          disable={false}
          loading={false}
          stretch
        />
      </HView>
      <Seperator bottom />
      {/* 소개작성 */}
      <Modal
        isVisible={modalIntroduce}
        onBackdropPress={() => setModalIntroduce(false)}>
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
              text={'소개작성'}
            />
          </View>
          <Seperator height={50} />
          <View>
            <TextInput
              multiline={true}
              maxLength={50}
              showRemain={true}
              value={''}
              onChangeText={() => null}
              placeholder={'최대 50자 까지 작성 가능합니다.'}
            />
          </View>
          <Seperator height={20} />
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
                text={'완료'}
                color={custom.themeColor}
                onPress={() => null}
                stretch
              />
            </View>
          </HView>
        </View>
      </Modal>
      {/* 비밀번호 변경 */}
      <Modal
        isVisible={modalPassword}
        onBackdropPress={() => setModalPassword(false)}>
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
              text={'비밀번호 변경'}
            />
          </View>
          <Seperator height={20} />
          <View>
            <TextInput
              title={'현재 비밀번호'}
              value={''}
              onChangeText={() => null}
              borderWidth={0}
              placeholder={'비밀번호 (영문숫자포함 6~12)'}
            />
            <Seperator line marginBottom={20} />
            <TextInput
              title={'새 비밀번호'}
              value={''}
              onChangeText={() => null}
              borderWidth={0}
              placeholder={'비밀번호 (영문숫자포함 6~12)'}
            />
            <Seperator line marginBottom={20} />
            <TextInput
              title={'비밀번호 확인'}
              value={''}
              onChangeText={() => null}
              borderWidth={0}
              placeholder={'입력했던 비밀번호를 다시 입력해주세요'}
            />
            <Seperator line />
          </View>
          <Seperator height={20} />
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
                text={'완료'}
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
