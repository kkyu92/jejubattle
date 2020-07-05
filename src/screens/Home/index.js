import React from 'react';
import {
  Container,
  Text,
  Header,
  ImageCarousel,
  Modal,
  ImageViewer,
  HView,
  Seperator,
  Carousel,
  Image,
} from 'react-native-nuno-ui';
import {TouchableOpacity, View} from 'react-native';
import Icons from '../../commons/Icons';
import BattleComponent from './BattleComponent';
import { custom } from '../../config';
import { ScrollView } from 'react-native-gesture-handler';

export default function Home(props) {
  const [imageViewer, setImageViewer] = React.useState(false);
  return (
    <Container>
      <Header
        leftComponent={
          <View style={{paddingHorizontal: 20, paddingVertical: 5}}>
            <Image
              local
              uri={require('../../../assets/img/icon-hamburger.png')}
              height={20}
              width={20}
              resizeMode={'cover'}
              onPress={() => props.navigation.toggleDrawer()}
            />
          </View>
        }
        rightComponent={
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Search')}
            style={{paddingHorizontal: 20, paddingVertical: 5}}>
            <Icons name="icon-search-16" size={20} color={'black'} />
          </TouchableOpacity>
        }
        title={'제주배틀박스'}
        navigation={props.navigation}
      />
      <ImageCarousel
        data={[
          'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
          'https://homepages.cae.wisc.edu/~ece533/images/arctichare.png',
          'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80',
        ]}
        height={170}
        onPress={() => setImageViewer(true)}
      />

      {/* View Carousel */}
      <Carousel
        data={[<BattleComponent />, <BattleComponent />, <BattleComponent />, <BattleComponent />, <BattleComponent />, <BattleComponent />, <BattleComponent />, <BattleComponent />]}
        dotColor={custom.themeColor}
        paginationContainerStyle={{bottom: 0}}
      />

      <Seperator height={30} />

      {/* recommand facility */}
      <HView style={{justifyContent: 'space-between', paddingHorizontal: 20}}>
        <Text text={'추천 운동시설'} fontSize={22} fontWeight={'bold'} />
        <TouchableOpacity onPress={() => null}>
          <Icons name={'icon-map-24'} size={24} color={'gray'} />
        </TouchableOpacity>
      </HView>
      <Seperator height={30} />
      <ScrollView horizontal={true} style={{paddingLeft: 20}}>
        <Image
          height={105}
          width={140}
          borderRadius={4}
          uri={'https://homepages.cae.wisc.edu/~ece533/images/airplane.png'}
          onPress={() => null}
          resizeMode={'cover'}
        />
        <Seperator width={20} />
        <Image
          height={105}
          width={140}
          borderRadius={4}
          uri={'https://homepages.cae.wisc.edu/~ece533/images/airplane.png'}
          onPress={() => null}
          resizeMode={'cover'}
        />
        <Seperator width={20} />
        <Image
          height={105}
          width={140}
          borderRadius={4}
          uri={'https://homepages.cae.wisc.edu/~ece533/images/airplane.png'}
          onPress={() => null}
          resizeMode={'cover'}
        />
        <Seperator width={20} />
        <Image
          height={105}
          width={140}
          borderRadius={4}
          uri={'https://homepages.cae.wisc.edu/~ece533/images/airplane.png'}
          onPress={() => null}
          resizeMode={'cover'}
        />
        <Seperator width={20} />
      </ScrollView>
      {/* modal */}
      <Modal
        isVisible={imageViewer}
        fullScreen={true}
        onBackdropPress={() => setImageViewer(false)}>
        <ImageViewer
          data={[
            'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
            'https://homepages.cae.wisc.edu/~ece533/images/arctichare.png',
            'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80',
          ]}
          enableSwipeDown={true}
          onSwipeDown={() => setImageViewer(false)}
        />
      </Modal>
    </Container>
  );
}
