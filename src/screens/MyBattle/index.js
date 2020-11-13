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
} from '../../react-native-nuno-ui';
import {TouchableOpacity, View, FlatList} from 'react-native';
import Icons from '../../commons/Icons';
import {custom} from '../../config';
import ListItemBattle from '../../commons/ListItemBattle';
import FloatingButton from '../../commons/FloatingButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Axios from 'axios';
import {logApi} from '../../react-native-nuno-ui/funcs';
import {AppContext} from '../../context';

export default function MyBattle(props) {
  const context = React.useContext(AppContext);
  const [mybattle, setMybattle] = React.useState([]);
  const [pullToRefresh, setPullToRefresh] = React.useState(true);
  const [edit, setEdit] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [moredone, setMoredone] = React.useState(false);

  React.useEffect(() => {
    pullToRefresh && get(1, true);
    console.log('reFresh');
    setMoredone(false);
    setPage(1);
  }, [pullToRefresh]);

  const get = (page, refresh) => {
    Axios.post('myBattle', {pageNum: page})
      .then((res) => {
        let myList = res.data;
        const list = myList.map((item) => ({
          ...item,
        }));
        logApi('myBattle', res.data);
        if (refresh) {
          setMybattle(res.data);
        } else {
          setMybattle((old) => [...old, ...list]);
        }
        if (res.data.length === 10) {
          Axios.post('myBattle', {pageNum: page + 1}).then(async (res) => {
            if (res.data.length === 0) {
              setMoredone(true);
            }
          });
        } else {
          setMoredone(true);
        }
        setPullToRefresh(false);
      })
      .catch((err) => {
        logApi('myBattle error', err.response);
        setPullToRefresh(false);
      });
  };
  const deleteMyBattle = (data) => {
    if (!data) {
      data = mybattle.filter((e) => e.checked).map((e) => ({baPk: e.baPk}));
    }
    Axios.post('myBattleDelete', data)
      .then((res) => {
        logApi('myBattleDelete', res.data);
        get(1, true);
      })
      .catch((err) => {
        logApi('myBattleDelete error', err.response);
      });
  };
  const handleCheck = (index) => {
    const temp = [...mybattle];
    temp[index].checked = !temp[index].checked;
    setMybattle(temp);
  };
  const renderItem = ({item, index}) => {
    return (
      <ListItemBattle
        item={item}
        editMode={edit}
        index={index}
        handleCheck={handleCheck}
        navigation={props.navigation}
        refresh={() => get(1, true)}
        deleteMyBattle={deleteMyBattle}
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
            onPress={() => setEdit(!edit)}
            style={{
              paddingHorizontal: 20,
              paddingVertical: 5,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            {/* <Text text={'일괄삭제'} color={'dimgray'} fontSize={17} /> */}
            <MaterialIcons
              name={'delete'}
              size={24}
              color={custom.themeColor}
            />
          </TouchableOpacity>
        }
      />
      <FlatList
        data={mybattle}
        keyExtractor={(item) => JSON.stringify(item.baPk)}
        renderItem={renderItem}
        // ListEmptyComponent={<Empty />}
        // ListHeaderComponent={FlatListHeader()}
        refreshing={pullToRefresh}
        onRefresh={() => {
          // setIsLast(false);
          setPullToRefresh(true);
        }}
        onEndReached={() => {
          if (!moredone) {
            console.log('more endReched!');
            setPage(page + 1);
            get(page + 1, false);
          } else {
            console.log('finish endReched!');
          }
        }}
      />
      {edit && (
        <View>
          <Seperator line />
          <HView style={{paddingHorizontal: 20, paddingVertical: 10}}>
            <Button
              text={'취소'}
              color={'white'}
              onPress={() => setEdit(false)}
              size={'large'}
            />
            <Seperator width={20} />
            <View style={{flex: 1}}>
              <Button
                text={'삭제'}
                color={custom.themeColor}
                onPress={() => deleteMyBattle()}
                size={'large'}
                stretch
              />
            </View>
          </HView>
          <Seperator bottom />
        </View>
      )}
    </Container>
  );
}
