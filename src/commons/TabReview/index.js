import React from 'react';
import {
  Container,
  Text,
  HView,
  Button,
  Seperator,
  Image,
  ImageCarousel,
} from 'react-native-nuno-ui';
import {View, FlatList, TouchableOpacity} from 'react-native';
import StarRating from 'react-native-star-rating';
import {custom} from '../../config';
import Icons from '../Icons';
import {screenWidth} from '../../styles';
import {AppContext} from '../../context';
import Axios from 'axios';
import { logApi } from 'react-native-nuno-ui/funcs';

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
          <HView style={{padding: 20, alignItems: 'flex-start'}} key={i}>
            <View style={{marginTop: 10, alignItems: 'center'}}>
              {e.userImgUrl ? (
                <Image
                  height={50}
                  width={50}
                  borderRadius={25}
                  uri={e.userImgUrl}
                  onPress={() => null}
                  resizeMode={'cover'}
                />
              ) : (
                <Image
                  local
                  uri={require('../../../assets/img/img-user2.png')}
                  width={50}
                  height={50}
                  borderRadius={25}
                  onPress={() => null}
                />
              )}
              <Seperator height={5} />
              <Text text={e.userName} fontSize={13} color={'gray'} />
            </View>
            <Seperator width={20} />
            <View style={{flex: 1}}>
              <HView>
                <StarRating
                  disabled={true}
                  maxStars={5}
                  rating={e.reScope}
                  starSize={11}
                  emptyStarColor={custom.themeColor}
                  halfStarEnabled={true}
                  halfStarColor={custom.themeColor}
                  fullStarColor={custom.themeColor}
                />
                <Seperator width={5} />
                <Text text={e.reScope} fontSize={14} color={'gray'} />
              </HView>
              <Seperator height={5} />
              {e.reImgUrl && (
                <ImageCarousel
                  data={[e.reImgUrl]}
                  height={Math.floor(screenWidth - 110) * 0.6}
                  width={Math.floor(screenWidth - 110)}
                  borderRadius={5}
                />
              )}
              <Seperator height={6} />
              <Text text={e.reContent} fontSize={15} color={'dimgray'} />
              <Seperator height={6} />
              <HView style={{justifyContent: 'space-between'}}>
                <HView>
                  <Text
                    text={e.reUpdatetime}
                    fontSize={14}
                    color={'darkgray'}
                  />
                  <Seperator width={20} />
                  {e.userPk !== context.me.userPk && (
                    <TouchableOpacity
                      onPress={() =>
                        props.navigation.navigate('Report', {
                          type: 2,
                          userPk: e.userPk,
                          userName: e.userName,
                          userImgUrl: e.userImgUrl,
                          rePk: e.rePk,
                          reContent: e.reContent,
                          reDate: e.reUpdatetime,
                        })
                      }
                      style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Icons
                        name={'icon-declare-15'}
                        size={15}
                        color={'orangered'}
                      />
                      <Seperator width={5} />
                      <Text text={'신고'} fontSize={14} color={'darkgray'} />
                    </TouchableOpacity>
                  )}
                </HView>
                <TouchableOpacity
                  onPress={() => null}
                  style={{paddingRight: 10}}>
                  <Text
                    text={'+ 더보기'}
                    fontSize={14}
                    color={custom.themeColor}
                  />
                </TouchableOpacity>
              </HView>
              <Seperator height={10} />
              {e.userPk === context.me.userPk && (
                <HView>
                  <Button
                    text={'수정'}
                    size={'medium'}
                    color={'white'}
                    onPress={() =>
                      props.navigation.navigate('ReviewEdit', {
                        rePk: e.rePk,
                        reScope: e.reScope,
                        reContent: e.reContent,
                        file: e.reImgUrl,
                        refresh: props.refresh,
                      })
                    }
                  />
                  <Seperator width={10} />
                  <Button
                    text={'삭제'}
                    size={'medium'}
                    color={'white'}
                    onPress={() => delReview(e.rePk)}
                  />
                </HView>
              )}
            </View>
          </HView>
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
      <Seperator bottom />
    </Container>
  );
}
