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
import {logApi} from 'react-native-nuno-ui/funcs';
import { useIsFocused } from '@react-navigation/native';
import { AppContext } from '../../context';

export default function FacilityList(props) {
  const context = React.useContext(AppContext);
  const [filterVisible, setFilterVisible] = React.useState(false);
  const [tab] = React.useState(props.route.params.tablist || []);
  const [activeTab, setActiveTab] = React.useState(props.route.params.code);
  const [filter1, setFilter1] = React.useState(0);
  const [filter2, setFilter2] = React.useState(0);
  const [keyword, setKeyword] = React.useState('');
  const [list, setList] = React.useState([]);
  const isFocused = useIsFocused();

  React.useEffect(() => {
    isFocused && getList();
  }, [activeTab, isFocused]);
  const getList = () => {
    Axios.post(props.route.params.endpoint, {
      code: activeTab,
      clCode: filter2,
      orderType: filter1,
      keyword: keyword,
    })
      .then((res) => {
        logApi(props.route.params.endpoint, res.data);
        setList(res.data);
      })
      .catch((err) => {
        logApi(props.route.params.endpoint + ' error', err.response);
      });
  };
  const renderItem = ({item, index}) => {
    return (
      <ListItem
        onPress={() =>
          props.navigation.navigate('FacilityView', {
            faPk: item.faPk,
          })
        }
        item={item}
        index={index}
        scrapOn={scrapOn}
        scrapOff={scrapOff}
        showScrap={true}
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
        const temp = [...list];
        temp[index].faScrapType = temp[index].faScrapType === 'Y' ? 'N' : 'Y';
        setList(temp);
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
        const temp = [...list];
        temp[index].faScrapType = temp[index].faScrapType === 'Y' ? 'N' : 'Y';
        setList(temp);
      })
      .catch((err) => {
        logApi('scrapOff error', err.response);
      });
  };
  return (
    <Container>
      <Header
        left={'back'}
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
        title={props.route.params.title}
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
            onPress={() => setActiveTab(0)}
            style={{
              paddingVertical: 15,
              paddingHorizontal: 10,
              borderBottomWidth: activeTab === 0 ? 3 : undefined,
              borderBottomColor:
                activeTab === 0 ? custom.themeColor : undefined,
            }}>
            <Text
              text={'전체'}
              fontSize={17}
              color={activeTab === 0 ? custom.themeColor : 'gray'}
              fontWeight={activeTab === 0 ? 'bold' : undefined}
            />
          </TouchableOpacity>
          {tab.map((e) => {
            return (
              <TouchableOpacity
                key={e.code}
                onPress={() => setActiveTab(e.code)}
                style={{
                  paddingVertical: 15,
                  paddingHorizontal: 10,
                  borderBottomWidth: activeTab === e.code ? 3 : undefined,
                  borderBottomColor:
                    activeTab === e.code ? custom.themeColor : undefined,
                }}>
                <Text
                  text={e.name}
                  fontSize={17}
                  color={activeTab === e.code ? custom.themeColor : 'gray'}
                  fontWeight={activeTab === e.code ? 'bold' : undefined}
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      <FlatList
        data={list}
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
            <Seperator height={20} />
            <HView>
              <View style={{paddingVertical: 10, flex: 0.5}}>
                <Checkbox
                  label={'등록순'}
                  checked={filter1 === 1}
                  onPress={() => setFilter1(1)}
                />
              </View>
              <View style={{paddingVertical: 10, flex: 0.5}}>
                <Checkbox
                  label={'추천순'}
                  checked={filter1 === 2}
                  onPress={() => setFilter1(2)}
                />
              </View>
            </HView>
            <HView>
              <View style={{paddingVertical: 10, flex: 0.5}}>
                <Checkbox
                  label={'내 위치순'}
                  checked={filter1 === 3}
                  onPress={() => setFilter1(3)}
                />
              </View>
              <View style={{paddingVertical: 10, flex: 0.5}}>
                <Checkbox
                  label={'평점순'}
                  checked={filter1 === 4}
                  onPress={() => setFilter1(4)}
                />
              </View>
            </HView>
            <Seperator height={30} />
            <HView>
              <View style={{paddingVertical: 10, flex: 0.5}}>
                <Checkbox
                  label={'학교운동장'}
                  checked={filter2 === 1}
                  onPress={() => setFilter2(1)}
                />
              </View>
              <View style={{paddingVertical: 10, flex: 0.5}}>
                <Checkbox
                  label={'체육공원'}
                  checked={filter2 === 2}
                  onPress={() => setFilter2(2)}
                />
              </View>
            </HView>
            <HView>
              <View style={{paddingVertical: 10, flex: 0.5}}>
                <Checkbox
                  label={'공공체육시설'}
                  checked={filter2 === 3}
                  onPress={() => setFilter2(3)}
                />
              </View>
              <View style={{paddingVertical: 10, flex: 0.5}}>
                <Checkbox
                  label={'사설체육시설'}
                  checked={filter2 === 4}
                  onPress={() => setFilter2(4)}
                />
              </View>
            </HView>
          </View>
          <HView style={{padding: 10}}>
            <View style={{flex: 1}}>
              <Button
                text={'취소'}
                onPress={() => setFilterVisible(false)}
                color={'gray'}
                stretch
              />
            </View>
            <Seperator width={10} />
            <View style={{flex: 1}}>
              <Button
                text={'적용하기'}
                onPress={() => {
                  getList();
                  setFilterVisible(false);
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
