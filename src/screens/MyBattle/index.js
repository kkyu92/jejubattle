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
  Loader,
} from '../../react-native-nuno-ui';
import {TouchableOpacity, View, FlatList, Alert} from 'react-native';
import Icons from '../../commons/Icons';
import {custom} from '../../config';
import ListItemBattle from '../../commons/ListItemBattle';
import FloatingButton from '../../commons/FloatingButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Axios from 'axios';
import {logApi, showToast} from '../../react-native-nuno-ui/funcs';
import {AppContext} from '../../context';
import Spinner from 'react-native-loading-spinner-overlay';
import {useIsFocused} from '@react-navigation/native';

export default function MyBattle(props) {
  const context = React.useContext(AppContext);
  const [mybattle, setMybattle] = React.useState([]);
  const [pullToRefresh, setPullToRefresh] = React.useState(true);
  const [edit, setEdit] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [moredone, setMoredone] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const isFocused = useIsFocused();

  React.useEffect(() => {
    setLoading(true);
    get(1, true);
    console.log('isFocused');
    setMoredone(false);
    setPage(1);
    setTimeout(() => {
      setLoading(false);
    }, 100);
  }, [isFocused]);

  React.useEffect(() => {
    pullToRefresh && get(1, true);
    console.log('pullToReFresh');
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
        myBattle={true}
        editMode={edit}
        index={index}
        handleCheck={handleCheck}
        navigation={props.navigation}
        refresh={() => get(1, true)}
        deleteMyBattle={deleteMyBattle}
      />
    );
  };
  return loading === true ? (
    <Loader />
  ) : (
    <Container>
      <Header
        left={'back'}
        title={'나의 배틀'}
        navigation={props.navigation}
        rightComponent={
          <TouchableOpacity
            onPress={() => {
              setEdit(!edit),
                Alert.alert(
                  '완료된 배틀만 삭제할 수 있습니다.',
                  '현재 진행중인 배틀은 직접 나가주세요!',
                  [
                    {
                      text: '확인',
                      onPress: () => console.log('cancel'),
                    },
                  ],
                );
            }}
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
                onPress={() =>
                  mybattle.filter((e) => e.checked).map((e) => ({baPk: e.baPk}))
                    .length !== 0
                    ? Alert.alert(
                        '선택한 배틀을 삭제합니다',
                        '해당 방 정보가 모두 삭제되며 복구할 수 없습니다.\n아직보상을 받지않은 경우 보상을 받을 수 없습니다.',
                        [
                          {
                            text: '취소',
                            onPress: () => console.log('cancel'),
                          },
                          {
                            text: '삭제',
                            onPress: () => deleteMyBattle(),
                          },
                        ],
                      )
                    : showToast('선택한 배틀방이 없습니다.', 2000, 'center')
                }
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
