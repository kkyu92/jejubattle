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
} from 'react-native-nuno-ui';
import {TouchableOpacity, View, ScrollView} from 'react-native';
import Icons from '../../commons/Icons';
import StarRating from 'react-native-star-rating';
import {custom} from '../../config';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function Report(props) {
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
            <Checkbox value={''} onPress={() => null} label={'노 쇼 (No Show)'} checked={true} size={'large'} />
          </View>
          <View style={{paddingVertical: 10}}>
            <Checkbox value={''} onPress={() => null} label={'비매너 플레이 및 언행'} checked={false} size={'large'} />
          </View>
          <View style={{paddingVertical: 10}}>
            <Checkbox value={''} onPress={() => null} label={'악의적인 승부 조작'} checked={false} size={'large'} />
          </View>
          <View style={{paddingVertical: 10}}>
            <Checkbox value={''} onPress={() => null} label={'욕설, 폭력, 협박 등의 형사상의 문제'} checked={false} size={'large'} />
          </View>
          <View style={{paddingVertical: 10}}>
            <Checkbox value={''} onPress={() => null} label={'성희롱, 성추행 등의 성적 불쾌감 형성'} checked={false} size={'large'} />
          </View>
          <View style={{paddingVertical: 10}}>
            <Checkbox value={''} onPress={() => null} label={'사행성, 불법 광고 홍보 및 전파'} checked={false} size={'large'} />
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
            placeholder={
              '신고하실 내용을 자세하게 적어주세요.'
            }
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
            <Text text={'사진 0/5'} fontSize={14} color={'dimgray'} />
          </TouchableOpacity>
        </HView>
      </KeyboardAwareScrollView>
      <View
        style={{
          paddingHorizontal: 20,
          paddingTop: 10,
          borderTopWidth: 1,
          borderTopColor: 'lightgray',
        }}>
        <Button
          text={'위의 사항으로 해당 리뷰를 신고합니다.'}
          onPress={() => null}
          color={'#FE7262'}
          stretch
        />
      </View>
      <Seperator bottom />
    </Container>
  );
}
