import React from 'react';
import {
  Container,
  Text,
  Header,
  Seperator,
  HView,
  Image,
  Checkbox,
  Button,
  Modal,
} from 'react-native-nuno-ui';
import {TouchableOpacity, View, ScrollView, FlatList} from 'react-native';
import Icons from '../../commons/Icons';
import {custom} from '../../config';
import ActionSheet from 'react-native-actions-sheet';
import ListItem from '../../commons/ListItem';
import Axios from 'axios';
import { logApi } from 'react-native-nuno-ui/funcs';

export default function FoodStore(props) {
  const [filterVisible, setFilterVisible] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState(0);
  const [orderType, setOrderType] = React.useState(0);
  const [store, setStore] = React.useState([]);
  const [category, setCategory] = React.useState([]);
  React.useEffect(() => {
    getTravelList();
  }, []);
  const getTravelList = () => {
    Axios.post('travelList', {
      faCode: 2,
      code: activeTab,
      orderType: orderType,
      lat: global.address.coords.latitude,
      lon: global.address.coords.longitude,
    })
      .then((res) => {
        logApi('travelList 2', res.data);
        setStore(res.data.facility);
        setCategory(res.data.category);
      })
      .catch((err) => {
        logApi('travelList 2 error', err.response);
      });
  };
  const renderItem = ({item, index}) => {
    return (
      <ListItem
        onPress={() =>
          props.navigation.navigate('TourCourseView', {faPk: item.faPk})
        }
        item={item}
      />
    );
  };
  return (
    <Container>
      <Header
        left={'close'}
        rightComponent={
          <TouchableOpacity
            onPress={() => setFilterVisible(true)}
            style={{
              paddingHorizontal: 20,
              paddingVertical: 5,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Icons name="icon-filter-13" size={13} color={custom.themeColor} />
            <Seperator width={5} />
            <Text text={'필터'} color={custom.themeColor} fontSize={17} />
          </TouchableOpacity>
        }
        title={'맛집'}
        navigation={props.navigation}
        containerStyle={{borderBottomWidth: 0}}
      />
      <View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{
            paddingLeft: 10,
            borderBottomColor: 'lightgray',
            borderBottomWidth: 1,
          }}>
          <TouchableOpacity
            onPress={() => null}
            style={{
              paddingVertical: 15,
              paddingHorizontal: 10,
              borderBottomWidth: 3,
              borderBottomColor: custom.themeColor,
            }}>
            <Text text={'전체'} fontSize={17} color={'gray'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => null}
            style={{paddingVertical: 15, paddingHorizontal: 10}}>
            <Text text={'카페'} fontSize={17} color={'gray'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => null}
            style={{paddingVertical: 15, paddingHorizontal: 10}}>
            <Text text={'디저트'} fontSize={17} color={'gray'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => null}
            style={{paddingVertical: 15, paddingHorizontal: 10}}>
            <Text text={'제주전통식'} fontSize={17} color={'gray'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => null}
            style={{paddingVertical: 15, paddingHorizontal: 10}}>
            <Text text={'고깃집'} fontSize={17} color={'gray'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => null}
            style={{paddingVertical: 15, paddingHorizontal: 10}}>
            <Text text={'횟집'} fontSize={17} color={'gray'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => null}
            style={{paddingVertical: 15, paddingHorizontal: 10}}>
            <Text text={'일식'} fontSize={17} color={'gray'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => null}
            style={{paddingVertical: 15, paddingHorizontal: 10}}>
            <Text text={'중식'} fontSize={17} color={'gray'} />
          </TouchableOpacity>
        </ScrollView>
      </View>
      <FlatList
        data={store}
        keyExtractor={(item) => JSON.stringify(item.faPk)}
        renderItem={renderItem}
        // ListEmptyComponent={<Empty />}
        // ListHeaderComponent={FlatListHeader()}
        // refreshing={pullToRefresh}
        // onRefresh={() => {
        //   setIsLast(false);
        //   setPullToRefresh(true);
        // }}
      />
      <Modal
        isVisible={filterVisible}
        onBackdropPress={() => setFilterVisible(false)}>
        <View style={{padding: 20, backgroundColor: 'white', borderRadius: 10}}>
          <View style={{padding: 20}}>
            <View style={{alignItems: 'center'}}>
              <Text text={'필터'} fontWeight={'bold'} fontSize={18} />
            </View>
            <Seperator height={30} />
            <HView>
              <View style={{paddingVertical: 10, flex: 0.5}}>
                <Checkbox
                  label={'등록순'}
                  checked={orderType === 1}
                  onPress={() => setOrderType(1)}
                />
              </View>
              <View style={{paddingVertical: 10, flex: 0.5}}>
                <Checkbox
                  label={'추천순'}
                  checked={orderType === 2}
                  onPress={() => setOrderType(2)}
                />
              </View>
            </HView>
            <HView>
              <View style={{paddingVertical: 10, flex: 0.5}}>
                <Checkbox
                  label={'내 위치순'}
                  checked={orderType === 3}
                  onPress={() => setOrderType(3)}
                />
              </View>
              <View style={{paddingVertical: 10, flex: 0.5}}>
                <Checkbox
                  label={'평점순'}
                  checked={orderType === 4}
                  onPress={() => setOrderType(4)}
                />
              </View>
            </HView>
          </View>
          <HView style={{padding: 10}}>
            <View style={{flex: 1}}>
              <Button text={'취소'} onPress={() => setFilterVisible(false)} color={'lightgray'} stretch />
            </View>
            <Seperator width={10} />
            <View style={{flex: 1}}>
              <Button
                text={'적용하기'}
                onPress={() => {
                  setFilterVisible(false);
                  getTravelList();
                }}
                color={custom.themeColor}
                stretch
                disable={false}
              />
            </View>
          </HView>
        </View>
      </Modal>
    </Container>
  );
}
