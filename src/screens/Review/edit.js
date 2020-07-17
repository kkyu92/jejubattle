import React from 'react';
import { Container, Header, HView, Seperator, Text, TextInput, Button } from 'react-native-nuno-ui';
import { TouchableOpacity, View, ScrollView } from 'react-native';
import Icons from '../../commons/Icons';
import StarRating from 'react-native-star-rating';
import { custom } from '../../config';

export default function ReviewEdit(props) {
  return (
    <Container>
      <Header left={'back'} title={'리뷰작성'} navigation={props.navigation} />
      <ScrollView>
        <Seperator height={50} />
        <View style={{alignItems: 'center'}}>
          <Text text={'서귀포시 체육관'} fontSize={21} />
          <Seperator height={10} />
          <View style={{width: 220}}>
            <StarRating
              disabled={true}
              maxStars={5}
              rating={5}
              starSize={40}
              emptyStarColor={custom.themeColor}
              halfStarEnabled={true}
              halfStarColor={custom.themeColor}
              fullStarColor={custom.themeColor}
            />
          </View>
        </View>
        <Seperator height={40} />
        <View style={{padding: 20}}>
          <TextInput
            multiline={true}
            placeholder={
              '다른 고객들을 위해 리뷰는 솔직하고 매너있게 작성해주세요!'
            }
            value={''}
            onChangeText={() => null}
            showRemain={true}
            maxLength={100}
            backgroundColor={'whitesmoke'}
            borderWidth={0}
            padding={20}
          />
        </View>
        <HView style={{paddingHorizontal: 20}}>
          <TouchableOpacity onPress={() => null} style={{padding: 10, alignItems: 'center', borderWidth: 1, borderColor: 'lightgray', borderRadius: 5}}>
            <Icons name={'icon-camera-20'} size={20} color={'dimgray'} />
            <Seperator height={5} />
            <Text text={'사진'} fontSize={14} color={'dimgray'} />
          </TouchableOpacity>
        </HView>
      </ScrollView>
      <View style={{paddingHorizontal: 20, padding: 10, borderTopWidth: 1, borderTopColor: 'lightgray'}}>
        <Button
          text={'작성완료'}
          onPress={() => null}
          color={custom.themeColor}
          size={'large'}
          stretch
        />
      </View>
      <Seperator bottom />
    </Container>
  );
}
