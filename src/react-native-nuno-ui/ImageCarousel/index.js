import React from 'react';
import {Modal, TouchableOpacity, View} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {screenWidth} from '../style';
import FastImage from 'react-native-fast-image';
import ImageViewer from '../ImageViewer';
import {getStatusBarHeight, isIphoneX} from 'react-native-iphone-x-helper';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default ({
  autoPlay,
  adIndex,
  navigation,
  data,
  onPress,
  width,
  height,
  loop,
  dotColor,
  disableTouch,
  borderRadius,
  paginationContainerStyle,
}) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [imageViewer, setImageViewer] = React.useState(false);
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={
          adIndex
            ? () => {
                navigation.navigate('Ad', {adPk: item.adPk}),
                  console.log('adPk: ' + item.adPk);
              }
            : disableTouch
            ? () => null
            : onPress
            ? () => onPress()
            : () => setImageViewer(true)
        }
        activeOpacity={!disableTouch ? 0.5 : 1}>
        <FastImage
          source={adIndex ? {uri: item.imgUrl} : {uri: item}}
          style={{
            width: width || screenWidth,
            height: height || Math.floor((screenWidth / 3) * 2),
            borderRadius: borderRadius || 0,
          }}
          resizeMode={'contain'}
        />
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <Carousel
        autoplay={autoPlay === true ? true : false}
        autoplayDelay={1000}
        autoplayInterval={3000}
        data={data}
        renderItem={renderItem}
        sliderWidth={width || screenWidth}
        itemWidth={width || screenWidth}
        inactiveSlideScale={1}
        loop={loop}
        onSnapToItem={(index) => setActiveIndex(index)}
      />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={activeIndex}
        dotColor={dotColor || 'orange'}
        inactiveDotColor={'lightgray'}
        inactiveDotScale={1}
        inactiveDotOpacity={1}
        dotStyle={{
          width: 6,
          height: 6,
          borderRadius: 3,
          padding: 0,
        }}
        dotContainerStyle={{
          marginHorizontal: 2, // dot사이의 거리
        }}
        containerStyle={{
          paddingVertical: 10,
          ...paginationContainerStyle,
        }}
      />
      <Modal
        visible={imageViewer}
        transparent={true}
        hardwareAccelerated={true}
        animationType={'slide'}
        onRequestClose={() => {
          setImageViewer(false);
        }}>
        <ImageViewer
          data={data}
          enableSwipeDown={true}
          onSwipeDown={() => setImageViewer(false)}
        />
        <TouchableOpacity
          onPress={() => setImageViewer(false)}
          style={{
            position: 'absolute',
            top: 20 + (isIphoneX() ? getStatusBarHeight() : 0),
            right: 20,
          }}>
          <AntDesign name={'close'} size={20} color={'white'} />
        </TouchableOpacity>
      </Modal>
    </View>
  );
};
