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
import ViewMoreText from 'react-native-view-more-text';
import Axios from 'axios';
import {logApi} from 'react-native-nuno-ui/funcs';

export default function ReviewComponent(props) {
  const context = React.useContext(AppContext);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);

  const renderViewMore = (onPress) => {
    return (
      <View style={{alignItems: 'flex-end'}}>
        <TouchableOpacity onPress={onPress} style={{padding: 10}}>
          <Text text={'+ 더보기'} fontSize={14} color={custom.themeColor} />
        </TouchableOpacity>
      </View>
    );
  };
  const renderViewLess = (onPress) => {
    return null;
    // return (
    //   <TouchableOpacity
    //     onPress={onPress}
    //     style={{padding: 10, position: 'absolute', right: 0, bottom: -34}}>
    //     <Text text={'- 숨기기'} fontSize={14} color={custom.themeColor} />
    //   </TouchableOpacity>
    // );
  };
  return (
    <View>
      <HView style={{padding: 20, alignItems: 'flex-start'}}>
        <View style={{marginTop: 10, alignItems: 'center'}}>
          {props.data.userImgUrl ? (
            <Image
              height={50}
              width={50}
              borderRadius={25}
              uri={props.data.userImgUrl}
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
          <Text text={props.data.userName} fontSize={13} color={'gray'} />
        </View>
        <Seperator width={20} />
        <View style={{flex: 1}}>
          <HView>
            <StarRating
              disabled={true}
              maxStars={5}
              rating={props.data.reScope}
              starSize={11}
              emptyStarColor={custom.themeColor}
              halfStarEnabled={true}
              halfStarColor={custom.themeColor}
              fullStarColor={custom.themeColor}
            />
            <Seperator width={5} />
            <Text text={props.data.reScope} fontSize={14} color={'gray'} />
          </HView>
          <Seperator height={5} />
          {props.data.reImgUrl && (
            <ImageCarousel
              data={[props.data.reImgUrl]}
              height={Math.floor(screenWidth - 110) * 0.6}
              width={Math.floor(screenWidth - 110)}
              borderRadius={5}
            />
          )}
          <Seperator height={6} />
          <ViewMoreText
            numberOfLines={2}
            renderViewMore={renderViewMore}
            renderViewLess={renderViewLess}>
            <Text text={props.data.reContent} fontSize={15} color={'dimgray'} />
          </ViewMoreText>
          <Seperator height={6} />
          <HView style={{minWidth: 110}}>
            <Text
              text={props.data.reUpdatetime}
              fontSize={14}
              color={'darkgray'}
            />
            <Seperator width={20} />
            {props.data.userPk !== context.me.userPk && (
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate('Report', {
                    type: 2,
                    userPk: props.data.userPk,
                    userName: props.data.userName,
                    userImgUrl: props.data.userImgUrl,
                    rePk: props.data.rePk,
                    reContent: props.data.reContent,
                    reDate: props.data.reUpdatetime,
                  })
                }
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icons name={'icon-declare-15'} size={15} color={'orangered'} />
                <Seperator width={5} />
                <Text text={'신고'} fontSize={14} color={'darkgray'} />
              </TouchableOpacity>
            )}
          </HView>
          <Seperator height={10} />
          {props.data.userPk === context.me.userPk && (
            <HView>
              <Button
                text={'수정'}
                size={'medium'}
                color={'white'}
                onPress={() =>
                  props.navigation.navigate('ReviewEdit', {
                    rePk: props.data.rePk,
                    reScope: props.data.reScope,
                    reContent: props.data.reContent,
                    file: props.data.reImgUrl,
                    refresh: props.refresh,
                  })
                }
              />
              <Seperator width={10} />
              <Button
                text={'삭제'}
                size={'medium'}
                color={'white'}
                onPress={() => {
                  setShowDeleteModal(true);
                }}
              />
            </HView>
          )}
        </View>
      </HView>

      <Modal
        isVisible={showDeleteModal}
        onBackdropPress={() => {
          setShowDeleteModal(false);
        }}>
        <View style={{padding: 20, backgroundColor: 'white', borderRadius: 10}}>
          <View style={{padding: 20}}>
            <View style={{alignItems: 'center'}}>
              <Text text={'알림'} fontWeight={'bold'} fontSize={18} />
            </View>
          </View>
          <Seperator height={10} />
          <View style={{alignItems: 'center'}}>
            <Text text={'리뷰를 삭제하시겠습니까?'} fontSize={16} />
          </View>
          <Seperator height={20} />
          <HView>
            <View style={{flex: 1}}>
              <Button
                text={'취소'}
                color={'gray'}
                onPress={() => {
                  setShowDeleteModal(false);
                }}
                size={'large'}
                stretch
              />
            </View>
            <Seperator width={20} />
            <View style={{flex: 1}}>
              <Button
                text={'확인'}
                color={custom.themeColor}
                onPress={() => {
                  props.delReview(props.data.rePk);
                  setShowDeleteModal(false);
                }}
                size={'large'}
                stretch
              />
            </View>
          </HView>
        </View>
      </Modal>
    </View>
  );
}
