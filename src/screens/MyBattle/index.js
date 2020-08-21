import React from 'react';
import {
  Container,
  Text,
  Header,
  Seperator,
  HView,
  Button,
  Image,
  Modal,
  Checkbox,
} from 'react-native-nuno-ui';
import {TouchableOpacity, View, FlatList} from 'react-native';
import Icons from '../../commons/Icons';
import {custom} from '../../config';
import ListItemBattle from '../../commons/ListItemBattle';
import FloatingButton from '../../commons/FloatingButton';
import Axios from 'axios';
import {logApi} from 'react-native-nuno-ui/funcs';
import { AppContext } from '../../context';

export default function MyBattle(props) {
  const context = React.useContext(AppContext);
  const [mybattle, setMybattle] = React.useState([]);

  React.useEffect(() => {
    get();
  }, []);
  const get = () => {
    Axios.get('myBattle')
      .then((res) => {
        logApi('myBattle', res.data);
        setMybattle(res.data);
      })
      .catch((err) => {
        logApi('myBattle error', err.response);
      });
  };
  const data = [
    {id: '0', status: 'waiting', level: '중수'},
    {id: '1', status: 'playing', level: '고수'},
    {id: '2', status: 'done', level: '프로', win: true},
    {id: '3', status: 'done', level: '프로', win: false},
    {id: '4', status: 'waiting', level: '프로', win: true},
    {id: '5', status: 'waiting', level: '프로', win: true},
    {id: '6', status: 'waiting', level: '프로', win: true},
    {id: 's', status: 'waiting', level: '프로', win: true},
  ];
  const renderItem = ({item, index}) => {
    return (
      <ListItemBattle
        onPress={async () => {
          props.navigation.navigate('BattleView', {
            baPk: item.baPk,
            refresh: () => get(),
          });
        }}
        item={item}
      />
    );
  };
  return (
    <Container>
      <Header
        left={'back'}
        title={'나의 배틀'}
        navigation={props.navigation}
        rightComponent={
          <TouchableOpacity
            onPress={() => null}
            style={{
              paddingHorizontal: 20,
              paddingVertical: 5,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text text={'일괄삭제'} color={'dimgray'} fontSize={17} />
          </TouchableOpacity>
        }
      />
      <FlatList
        data={mybattle}
        keyExtractor={(item) => JSON.stringify(item.baPk)}
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
