import React from 'react';
import {
  Container,
  Text,
  HView,
  Button,
  Seperator,
  Image,
} from 'react-native-nuno-ui';
import {View, FlatList, TouchableOpacity} from 'react-native';
import StarRating from 'react-native-star-rating';
import {custom} from '../../config';
import Icons from '../../commons/Icons';
import {screenWidth} from '../../styles';

export default function TabFacilityReview(props) {
  const data = [
    {id: '0'},
    {id: '1'},
    {id: '2'},
    {id: '3'},
    {id: '4'},
    {id: '5'},
    {id: '6'},
    {id: 's'},
  ];
  const renderItem = ({item, index}) => {
    return (
      <HView style={{padding: 20, alignItems: 'flex-start'}}>
        <View style={{marginTop: 10}}>
          <Image
            height={50}
            width={50}
            borderRadius={25}
            uri={'https://homepages.cae.wisc.edu/~ece533/images/airplane.png'}
            onPress={() => null}
            resizeMode={'cover'}
          />
          <Text text={'소소한***'} fontSize={13} color={'gray'} />
        </View>
        <Seperator width={20} />
        <View style={{flex: 1}}>
          <HView>
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
            <Text text={'4.0'} fontSize={14} color={'gray'} />
          </HView>
          <Image
            height={Math.floor(screenWidth - 110) * 0.6}
            width={Math.floor(screenWidth - 110)}
            borderRadius={5}
            uri={'https://homepages.cae.wisc.edu/~ece533/images/airplane.png'}
            resizeMode={'cover'}
          />
          <Seperator height={6} />
          <Text
            text={
              '이 이벤트 짱이었어요! 덕분에 제주에서 좋은 추억 남긴 것 같아 모두에게 추천하고싶고 또 가게 된다..'
            }
            fontSize={15}
            color={'dimgray'}
          />
          <Seperator height={6} />
          <HView style={{justifyContent: 'space-between'}}>
            <HView>
              <Text text={'20.05.11 10:21'} fontSize={14} color={'lightgray'} />
              <Seperator width={20} />
              <TouchableOpacity
                onPress={() => props.navigation.navigate('Report')} style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icons name={'icon-declare-15'} size={15} color={'orangered'} />
                <Seperator width={5} />
                <Text text={'신고'} fontSize={14} color={'lightgray'} />
              </TouchableOpacity>
            </HView>
            <TouchableOpacity onPress={() => null} style={{paddingRight: 10}}>
              <Text text={'+ 더보기'} fontSize={14} color={custom.themeColor} />
            </TouchableOpacity>
          </HView>
          <Seperator height={10} />
          <Button
            text={'수정'}
            size={'medium'}
            color={'white'}
            onPress={() => null}
          />
        </View>
      </HView>
    );
  };

  return (
    <Container>
      <View style={{padding: 20}}>
        <Text text={'시설 정보'} fontSize={18} fontWeight={'bold'} />
      </View>
      <HView style={{padding: 20}}>
        <View style={{flex: 0.2, alignItems: 'flex-end'}}>
          <Text text={'4.5'} fontSize={33} fontWeight={'bold'} />
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
          <Text text={'8개의 평가'} fontSize={14} color={'gray'} />
        </View>
        <View style={{flex: 0.4, alignItems: 'flex-end'}}>
          <Button
            text={'리뷰작성'}
            color={'white'}
            onPress={() => props.navigation.navigate('ReviewEdit')}
          />
        </View>
      </HView>

      <Seperator height={40} />

      <HView style={{padding: 20}}>
        <Text text={'최근 리뷰'} fontSize={18} fontWeight={'bold'} />
        <Text text={'(6)'} fontSize={18} color={'gray'} />
      </HView>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        // ListEmptyComponent={<Empty />}
        // ListHeaderComponent={FlatListHeader()}
        // refreshing={pullToRefresh}
        // onRefresh={() => {
        //   setIsLast(false);
        //   setPullToRefresh(true);
        // }}
      />
      <View style={{padding: 20}}>
        <Button
          text={'모든 리뷰보기'}
          color={'white'}
          onPress={() => null}
          stretch
        />
      </View>
      <Seperator bottom />
    </Container>
  );
}
