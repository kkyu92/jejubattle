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

export default function FacilityList(props) {
  const [filterVisible, setFilterVisible] = React.useState(false);
  const [filter1, setFilter1] = React.useState(0);
  const [filter2, setFilter2] = React.useState(0);
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
  React.useEffect(() => {
    getList();
  }, []);
  const getList = () => {
    Axios.post(props.route.params.endpoint, {
      code: props.route.params.code,
      clCode: filter2,
      orderType: filter1,
    })
      .then((res) => {
        logApi(props.route.params.endpoint, res.data);
      })
      .catch((err) => {
        logApi(props.route.params.endpoint + ' error', err.response);
      });
  }
  const renderItem = () => {
    return (
      <ListItem onPress={() => props.navigation.navigate('FacilityView')} />
    );
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
        title={'구기종목'}
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
            <Text text={'축구'} fontSize={17} color={'gray'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => null}
            style={{paddingVertical: 15, paddingHorizontal: 10}}>
            <Text text={'농구'} fontSize={17} color={'gray'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => null}
            style={{paddingVertical: 15, paddingHorizontal: 10}}>
            <Text text={'야구'} fontSize={17} color={'gray'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => null}
            style={{paddingVertical: 15, paddingHorizontal: 10}}>
            <Text text={'골프'} fontSize={17} color={'gray'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => null}
            style={{paddingVertical: 15, paddingHorizontal: 10}}>
            <Text text={'테니스'} fontSize={17} color={'gray'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => null}
            style={{paddingVertical: 15, paddingHorizontal: 10}}>
            <Text text={'배드민턴'} fontSize={17} color={'gray'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => null}
            style={{paddingVertical: 15, paddingHorizontal: 10}}>
            <Text text={'족구'} fontSize={17} color={'gray'} />
          </TouchableOpacity>
        </ScrollView>
      </View>
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
