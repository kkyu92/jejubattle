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
  Checkbox,
  Modal,
} from 'react-native-nuno-ui';
import {View, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import Icons from '../../commons/Icons';
import {custom} from '../../config';
import ListItem from '../../commons/ListItem';
import {screenWidth} from '../../styles';
import { share } from 'react-native-nuno-ui/funcs';

export default function EventView(props) {
  const data = [{id: '0'}, {id: '1'}, {id: '2'}, {id: '3'}];
  const FlatListHeader = () => {
    return (
      <View>
        <View style={{padding: 20}}>
          <Image
            height={Math.floor((screenWidth - 40) * 1.6)}
            width={Math.floor(screenWidth - 40)}
            // borderRadius={10}
            uri={props.route.params.item.imgUrl}
            resizeMode={'contain'}
          />
        </View>
        <HView style={{paddingHorizontal: 20, justifyContent: 'flex-end'}}>
          <Icons name={'icon-like-12'} size={18} color={'gray'} />
          <Seperator width={5} />
          <Text
            text={props.route.params.item.evLikeCnt}
            fontSize={14}
            color={'gray'}
          />
        </HView>
        <Seperator marginTop={20} line />
        <View style={{padding: 20}}>
          <HView>
            <Text text={'댓글'} fontSize={18} fontWeight={'bold'} />
            <Text text={`(0)`} fontSize={15} color={'gray'} />
          </HView>
        </View>
      </View>
    );
  };
  const renderItem = ({item, index}) => {
    return (
      <View>
        <HView
          style={{
            padding: 20,
          }}>
          <View style={{flex: 1}}>
            <Text
              text={
                '이 이벤트 짱이었어요! 덕분에 제주에서 좋은 추억 남긴 것 같아 모두에게 추천하고싶습니다!'
              }
              fontSize={15}
            />
            <Text text={'20.05.11 10:21'} color={'gray'} fontSize={14} />
          </View>
          <Seperator width={20} />
          <View>
            <Image
              height={50}
              width={50}
              borderRadius={25}
              uri={'https://homepages.cae.wisc.edu/~ece533/images/airplane.png'}
              onPress={() => props.navigation.navigate('EventView')}
              resizeMode={'cover'}
            />
            <Text text={'소소한***'} color={'gray'} fontSize={13} />
          </View>
        </HView>
        <Seperator line />
      </View>
    );
  };

  return (
    <Container>
      <Header
        left={'close'}
        title={'이벤트'}
        navigation={props.navigation}
        rightComponent={
          <HView>
            <TouchableOpacity
              onPress={() => null}
              style={{paddingHorizontal: 5, paddingVertical: 5}}>
              <Icons name={'icon-bookmark-20'} size={20} color={'black'} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                share(
                  `https://jejubattle.com/event/${props.route.params.item.evPk}`,
                  '',
                )
              }
              style={{paddingHorizontal: 20, paddingVertical: 5}}>
              <Icons name={'icon-share-20'} size={20} color={'black'} />
            </TouchableOpacity>
          </HView>
        }
      />

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        // ListEmptyComponent={<Empty />}
        ListHeaderComponent={FlatListHeader()}
        // refreshing={pullToRefresh}
        // onRefresh={() => {
        //   setIsLast(false);
        //   setPullToRefresh(true);
        // }}
      />
    </Container>
  );
}
