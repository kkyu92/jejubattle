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

export default function Event(props) {
  const [modalVisible, setModalVisible] = React.useState(false);
  const data = [
    {id: '0'},
    {id: '1'},
    {id: '2'},
    {id: '3'},
  ];
  const showDetail = () => {
    setModalVisible(true);
  };
  const renderItem = ({item, index}) => {
    return (
      <View
        style={{
          padding: 20,
        }}>
        <Image
          height={Math.floor((screenWidth - 40) * 0.4)}
          width={Math.floor(screenWidth - 40)}
          borderRadius={10}
          uri={'https://homepages.cae.wisc.edu/~ece533/images/airplane.png'}
          onPress={() => props.navigation.navigate('EventView')}
          resizeMode={'cover'}
        />
        <Seperator height={20} />
        <Text text={'제주 들불축제'} fontWeight={'bold'} fontSize={18} />
        <Seperator height={10} />
        <Text
          text={'기간: 2020년 9월 2일 ~. 2020년 10월 1일'}
          color={'gray'}
          fontSize={14}
        />
      </View>
    );
  };
  return (
    <Container>
      <Header left={'close'} title={'이벤트'} navigation={props.navigation} />
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
    </Container>
  );
}
