import React from 'react';
import {
  Container,
  Header,
  HView,
  Seperator,
  Text,
  TextInput,
  Button,
  Image,
  Checkbox,
  Modal,
} from 'react-native-nuno-ui';
import {TouchableOpacity, View, ScrollView} from 'react-native';
import Icons from '../../commons/Icons';
import StarRating from 'react-native-star-rating';
import {custom} from '../../config';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default function Report(props) {
  const [modalWarning, setModalWarning] = React.useState(false);
  return (
    <Container>
      <Header left={'back'} title={'신고하기'} navigation={props.navigation} />
      <KeyboardAwareScrollView>
        <View style={{paddingVertical: 50, alignItems: 'center'}}>
          <Image
            local
            uri={require('../../../assets/img/img-user2.png')}
            width={68}
            height={68}
            borderRadius={34}
          />
          <Seperator height={10} />
          <Text text={'소소한***'} fontSize={13} color={'gray'} />
        </View>
        <View style={{paddingHorizontal: 40}}>
          <View style={{paddingVertical: 10}}>
            <Checkbox
              value={''}
              onPress={() => null}
              label={'노 쇼 (No Show)'}
              checked={true}
              size={'large'}
            />
          </View>
          <View style={{paddingVertical: 10}}>
            <Checkbox
              value={''}
              onPress={() => null}
              label={'비매너 플레이 및 언행'}
              checked={false}
              size={'large'}
            />
          </View>
          <View style={{paddingVertical: 10}}>
            <Checkbox
              value={''}
              onPress={() => null}
              label={'악의적인 승부 조작'}
              checked={false}
              size={'large'}
            />
          </View>
          <View style={{paddingVertical: 10}}>
            <Checkbox
              value={''}
              onPress={() => null}
              label={'욕설, 폭력, 협박 등의 형사상의 문제'}
              checked={false}
              size={'large'}
            />
          </View>
          <View style={{paddingVertical: 10}}>
            <Checkbox
              value={''}
              onPress={() => null}
              label={'성희롱, 성추행 등의 성적 불쾌감 형성'}
              checked={false}
              size={'large'}
            />
          </View>
          <View style={{paddingVertical: 10}}>
            <Checkbox
              value={''}
              onPress={() => null}
              label={'사행성, 불법 광고 홍보 및 전파'}
              checked={false}
              size={'large'}
            />
          </View>
        </View>
        <Seperator height={20} />
        <View style={{padding: 20}}>
          <Text
            text={'상황설명 및 상세 내용, 기타'}
            fontSize={21}
            fontWeight={'bold'}
          />
          <Seperator height={10} />
          <TextInput
            multiline={true}
            placeholder={'신고하실 내용을 자세하게 적어주세요.'}
            value={''}
            onChangeText={() => null}
            showRemain={true}
            maxLength={5000}
            backgroundColor={'whitesmoke'}
            borderWidth={0}
          />
        </View>
        <HView style={{paddingHorizontal: 20, marginBottom: 20}}>
          <TouchableOpacity
            onPress={() => null}
            style={{
              padding: 10,
              alignItems: 'center',
              borderWidth: 1,
              borderColor: 'lightgray',
              borderRadius: 5,
            }}>
            <Icons name={'icon-camera-20'} size={20} color={'dimgray'} />
            <Seperator height={5} />
            <Text text={'사진'} fontSize={14} color={'dimgray'} />
          </TouchableOpacity>
        </HView>
      </KeyboardAwareScrollView>
      <View
        style={{
          paddingHorizontal: 20,
          padding: 10,
          borderTopWidth: 1,
          borderTopColor: 'lightgray',
        }}>
        <Button
          text={'위의 사항으로 해당 리뷰를 신고합니다.'}
          onPress={() => setModalWarning(true)}
          color={'#FE7262'}
          size={'large'}
          stretch
        />
      </View>
      <Seperator bottom />
      {/* 신고경고 모달 */}
      <Modal
        isVisible={modalWarning}
        onBackdropPress={() => setModalWarning(false)}>
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
            text={'신고하시기 전에'}
          />
          <Seperator height={50} />
          <Text
            fontSize={16}
            color={'#303441'}
            text={'본 신고는 해당 유저의 사용 패널티를 부과하기 위한 신고입니다.\n형사상, 민사상의 문제는 경찰에 직접 신고하여 주시기 바랍니다.\n\n(무고한 사람을 신고할 시 패널티를 받으실 수 있습니다.)'}
            style={{textAlign: 'center'}}
          />
          <Seperator height={50} />
          <HView>
            <View style={{flex: 1}}>
              <Button
                text={'취소'}
                color={'gray'}
                onPress={() => null}
                size={'large'}
                stretch
              />
            </View>
            <Seperator width={20} />
            <View style={{flex: 1}}>
              <Button
                text={'신고'}
                color={'#FE7262'}
                onPress={() => null}
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
