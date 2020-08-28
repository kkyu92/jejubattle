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
import Axios from 'axios';
import {logApi} from 'react-native-nuno-ui/funcs';
import {AppContext} from '../../context';
import {useIsFocused} from '@react-navigation/native';

export default function TravelList(props) {
  const context = React.useContext(AppContext);
  const [filterVisible, setFilterVisible] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState(0);
  const [travel, setTravel] = React.useState([]);
  const [orderType, setOrderType] = React.useState(0);
  const [category, setCategory] = React.useState([]);
  const isFocused = useIsFocused();
  let title;
  switch (props.route.params.faCode) {
    case 1:
      title = '추천코스';
      break;
    case 2:
      title = '맛집';
      break;
    case 3:
      title = '관광지';
      break;
    case 4:
      title = '체험';
      break;
    default:
      break;
  }
  const getTravelList = () => {
    Axios.post('travelList', {
      faCode: props.route.params.faCode,
      code: activeTab,
      orderType: orderType,
      lat: global.address.coords.latitude,
      lon: global.address.coords.longitude,
    })
      .then((res) => {
        logApi('travelList', props.route.params.faCode, res.data);
        setTravel(res.data.facility);
        res.data.category && setCategory(res.data.category);
      })
      .catch((err) => {
        logApi('travelList error', props.route.params.faCode, err.response);
      });
  };
  React.useEffect(() => {
    isFocused && getTravelList();
  }, [isFocused, activeTab]);
  const renderItem = ({item, index}) => {
    return (
      <ListItem
        onPress={() =>
          props.navigation.navigate('TravelView', {
            faPk: item.faPk,
            showScrap: props.route.params.faCode === 1 ? false : true,
          })
        }
        item={item}
        index={index}
        scrapOn={scrapOn}
        scrapOff={scrapOff}
        showScrap={props.route.params.faCode === 1 ? false : true}
      />
    );
  };
  const scrapOn = (item, index) => {
    Axios.post('scrapOn', {
      faPk: item.faPk,
      userPk: context.me.userPk,
    })
      .then((res) => {
        logApi('scrapOn', res.data);
        const temp = [...travel];
        temp[index].faScrapType = temp[index].faScrapType === 'Y' ? 'N' : 'Y';
        setTravel(temp);
      })
      .catch((err) => {
        logApi('scrapOn error', err.response);
      });
  };
  const scrapOff = (item, index) => {
    Axios.post('scrapOff', {
      faPk: item.faPk,
      userPk: context.me.userPk,
    })
      .then((res) => {
        logApi('scrapOff', res.data);
        const temp = [...travel];
        temp[index].faScrapType = temp[index].faScrapType === 'Y' ? 'N' : 'Y';
        setTravel(temp);
      })
      .catch((err) => {
        logApi('scrapOff error', err.response);
      });
  };
  return (
    <Container>
      <Header
        left={'close'}
        title={title}
        navigation={props.navigation}
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
        containerStyle={
          props.route.params.faCode === 2
            ? {borderBottomWidth: 0}
            : {borderBottomWidth: 1}
        }
      />
      {props.route.params.faCode === 2 ? (
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
              onPress={() => setActiveTab(0)}
              style={{
                paddingVertical: 15,
                paddingHorizontal: 10,
                borderBottomWidth: 3,
                borderBottomColor:
                  activeTab === 0 ? custom.themeColor : 'white',
              }}>
              <Text text={'전체'} fontSize={17} color={'gray'} />
            </TouchableOpacity>
            {category.map((e, i) => {
              return (
                <TouchableOpacity
                  key={e.code}
                  onPress={() => setActiveTab(e.code)}
                  style={{
                    paddingVertical: 15,
                    paddingHorizontal: 10,
                    borderBottomWidth: 3,
                    borderBottomColor:
                      activeTab === e.code ? custom.themeColor : 'white',
                  }}>
                  <Text text={e.name} fontSize={17} color={'gray'} />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      ) : (
        <Seperator height={20} />
      )}
      <FlatList
        data={travel}
        keyExtractor={(item) => JSON.stringify(item.faPk)}
        renderItem={renderItem}
        ItemSeparatorComponent={() => (
          <View style={{paddingLeft: 20}}>
            <Seperator line />
          </View>
        )}
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
            <HView style={{flexWrap: 'wrap'}}>
              <View style={{paddingVertical: 10, paddingRight: 20}}>
                <Checkbox
                  label={'전체'}
                  checked={orderType === 0}
                  onPress={() => setOrderType(0)}
                />
              </View>
              <View style={{paddingVertical: 10, paddingRight: 20}}>
                <Checkbox
                  label={'등록순'}
                  checked={orderType === 1}
                  onPress={() => setOrderType(1)}
                />
              </View>
              <View style={{paddingVertical: 10, paddingRight: 20}}>
                <Checkbox
                  label={'추천순'}
                  checked={orderType === 2}
                  onPress={() => setOrderType(2)}
                />
              </View>
              <View style={{paddingVertical: 10, paddingRight: 20}}>
                <Checkbox
                  label={'내 위치순'}
                  checked={orderType === 3}
                  onPress={() => setOrderType(3)}
                />
              </View>
              <View style={{paddingVertical: 10, paddingRight: 20}}>
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
              <Button
                text={'취소'}
                onPress={() => setFilterVisible(false)}
                color={'lightgray'}
                stretch
                size={'large'}
              />
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
                size={'large'}
                disable={false}
              />
            </View>
          </HView>
        </View>
      </Modal>
    </Container>
  );
}
