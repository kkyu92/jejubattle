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
} from '../../react-native-nuno-ui';
import {View, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import Icons from '../../commons/Icons';
import {custom} from '../../config';
import ListItem from '../../commons/ListItem';
import {screenWidth, screenHeight} from '../../styles';

export default function Archive(props) {
  const [modalVisible, setModalVisible] = React.useState(false);
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
  const showDetail = () => {
    setModalVisible(true);
  };
  const renderItem = ({item, index}) => {
    return (
      <View
        style={{
          marginLeft: index % 3 === 0 ? 20 : 10,
          marginRight: index % 3 === 2 ? 20 : 10,
        }}>
        <TouchableOpacity
          onPress={() => showDetail()}
          style={{
            borderColor: 'lightgray',
            borderWidth: 1,
            borderRadius: 10,
            alignItems: 'center',
            padding: 10,
          }}>
          <Image
            height={Math.floor(((screenWidth - 140) / 3) * 0.9)}
            width={Math.floor((screenWidth - 140) / 3)}
            uri={'https://homepages.cae.wisc.edu/~ece533/images/airplane.png'}
            onPress={() => showDetail()}
            resizeMode={'cover'}
          />
          <View style={{position: 'absolute', top: 5, right: 5}}>
            <Button text={'D-2'} color={'#FE491B'} size={'small'} />
          </View>
        </TouchableOpacity>
        <View
          style={{
            padding: 10,
            // alignItems: 'center',
            width: Math.floor((screenWidth - 80) / 3),
            marginBottom: 20,
          }}>
          <Text
            text={'STARBUCKS 카페아이스 아메리카노 TALL'}
            fontSize={13}
            fontWeight={'500'}
            color={'gray'}
          />
        </View>
      </View>
    );
  };
  return (
    <Container>
      <Header left={'close'} title={'보관함'} navigation={props.navigation} />
      <Seperator height={20} />
      <View style={{padding: 20}}>
        <Text text={'미사용 상품'} fontSize={18} fontWeight={'bold'} />
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={3}
        // ListEmptyComponent={<Empty />}
        // ListHeaderComponent={FlatListHeader()}
        // refreshing={pullToRefresh}
        // onRefresh={() => {
        //   setIsLast(false);
        //   setPullToRefresh(true);
        // }}
      />
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 5,
            maxHeight: screenHeight - 100,
          }}>
          <ScrollView style={{padding: 10}}>
            <Image
              height={230}
              width={Math.floor(screenWidth - 110)}
              borderRadius={8}
              uri={'https://homepages.cae.wisc.edu/~ece533/images/airplane.png'}
              // onPress={() => null}
              resizeMode={'cover'}
            />

            <View style={{padding: 10, alignItems: 'center'}}>
              <Button size={'medium'} text={'사용완료'} color={'lightgray'} />
            </View>
            <View style={{padding: 10, alignItems: 'center'}}>
              <Text
                text={'상품코드 : 1234567890'}
                fontWeight={'bold'}
                fontSize={22}
              />
              <Text
                text={'[교환권] 스타벅스 카페아이스아메리카노 TALL'}
                color={'dimgray'}
                fontSize={18}
              />
            </View>
            <View style={{paddingVertical: 30, alignItems: 'center'}}>
              <Text
                text={'사용기한: 2020년 00월 00일 ~ 2020년 00년 00일'}
                color={'gray'}
                fontSize={15}
              />
            </View>
            <Seperator line />
            <View style={{paddingVertical: 30, alignItems: 'center'}}>
              <Text
                text={
                  '상품상세내용이들어갈자리입니다상품상세내용이들어갈자리입니다상품상세내용이들어갈자리입니다상품상세내용이들어갈자리입니다상품상세내용이들어갈자리입니다상품상세내용이들어갈자리입니다상품상세내용이들어갈자리입니다상품상세내용이들어갈자리입니다상품상세내용이들어갈자리입니다상품상세내용이들어갈자리입니다상품상세내용이들어갈자리입니다상품상세내용이들어갈자리입니다상품상세내용이들어갈자리입니다상품상세내용이들어갈자리입니다상품상세내용이들어갈자리입니다'
                }
                color={'dimgray'}
                fontSize={16}
              />
            </View>
          </ScrollView>
          <View style={{padding: 10}}>
            <Button
              text={'삭제하기'}
              onPress={() => null}
              color={custom.themeColor}
              stretch
            />
          </View>
        </View>
      </Modal>
    </Container>
  );
}
