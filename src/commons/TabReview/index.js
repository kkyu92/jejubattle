import React from 'react';
import {
  Container,
  Text,
  HView,
  Button,
  Seperator,
  Image,
  ImageCarousel,
  Modal,
} from 'react-native-nuno-ui';
import {View, FlatList, TouchableOpacity} from 'react-native';
import StarRating from 'react-native-star-rating';
import {custom} from '../../config';
import Icons from '../Icons';
import {screenWidth} from '../../styles';
import {AppContext} from '../../context';
import Axios from 'axios';
import {logApi} from 'react-native-nuno-ui/funcs';
import ReviewComponent from './ReviewComponent';

export default function TabReview(props) {
  const context = React.useContext(AppContext);

  const delReview = (rePk) => {
    Axios.delete(`reply/${rePk}`)
      .then((res) => {
        logApi('delete reply', res.data);
        props.refresh();
      })
      .catch((err) => {
        logApi('delete reply error', err.response);
      });
  };
  return (
    <Container>
      <View style={{padding: 20}}>
        <Text text={'시설 정보'} fontSize={18} fontWeight={'bold'} />
      </View>
      <HView style={{padding: 20}}>
        <View style={{flex: 0.2, alignItems: 'flex-end'}}>
          <Text text={props.scopeCnt} fontSize={33} fontWeight={'bold'} />
        </View>
        <View style={{flex: 0.4, paddingLeft: 20}}>
          <View style={{alignItems: 'flex-start'}}>
            <StarRating
              disabled={true}
              maxStars={5}
              rating={5}
              starSize={11}
              emptyStarColor={custom.themeColor}
              halfStarEnabled={true}
              halfStarColor={custom.themeColor}
              fullStarColor={custom.themeColor}
            />
          </View>
          <Seperator height={5} />
          <Text
            text={`${props.replyCnt}개의 평가`}
            fontSize={14}
            color={'gray'}
          />
        </View>
        <View style={{flex: 0.4, alignItems: 'flex-end'}}>
          <Button
            text={'리뷰작성'}
            color={'white'}
            onPress={() =>
              props.navigation.navigate('ReviewEdit', {
                faPk: props.faPk,
                refresh: props.refresh,
              })
            }
          />
        </View>
      </HView>

      <Seperator height={40} />

      <HView style={{padding: 20}}>
        <Text text={'최근 리뷰'} fontSize={18} fontWeight={'bold'} />
        <Text text={`(${props.replyCnt})`} fontSize={18} color={'gray'} />
      </HView>
      {props.data.map((e, i) => {
        return (
          <ReviewComponent
            data={e}
            key={i}
            delReview={delReview}
            navigation={props.navigation}
            refresh={props.refresh}
          />
        );
      })}

      {props.data.length > 10 && (
        <View style={{padding: 20}}>
          <Button
            text={'모든 리뷰보기'}
            color={'white'}
            onPress={() => null}
            stretch
          />
        </View>
      )}

      {props.data.length === 0 && (
        <View style={{padding: 20}}>
          <Text text={'리뷰가 없습니다.'} fontSize={16} color={'dimgray'} />
        </View>
      )}
      <Seperator bottom />
    </Container>
  );
}
