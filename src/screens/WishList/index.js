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
} from '../../react-native-nuno-ui';
import {View, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import Icons from '../../commons/Icons';
import {custom} from '../../config';
import ListItem from '../../commons/ListItem';
import Axios from 'axios';
import {logApi} from '../../react-native-nuno-ui/funcs';
import {useIsFocused} from '@react-navigation/native';
import {AppContext} from '../../context';

export default function WishList(props) {
  const context = React.useContext(AppContext);
  const [edit, setEdit] = React.useState(false);
  const [wishList, setWishList] = React.useState([]);
  const [checkAll, setCheckAll] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [moredone, setMoredone] = React.useState(false);
  const isFocused = useIsFocused();

  React.useEffect(() => {
    isFocused && get(1);
  }, [isFocused]);
  const get = (page) => {
    Axios.post('wishList', {pageNum: page})
      .then(async (res) => {
        let notiList = res.data;
        const list = notiList.map((item) => ({
          ...item,
          checked: false,
        }));
        logApi('wishList', res.data);
        setWishList((old) => [...old, ...list]);
        if (res.data.length === 10) {
          Axios.post('wishList', {pageNum: page + 1}).then(async (res) => {
            if (res.data.length === 0) {
              setMoredone(true);
            }
          });
        } else {
          setMoredone(true);
        }
      })
      .catch((err) => {
        logApi('wishList error', err.response);
      });
  };
  const renderItem = ({item, index}) => {
    return (
      <ListItem
        editMode={edit}
        onPress={() =>
          props.navigation.navigate('FacilityView', {
            faPk: item.faPk,
          })
        }
        item={item}
        index={index}
        scrapOn={scrapOn}
        scrapOff={scrapOff}
        handleCheck={handleCheck}
        showScrap={true}
      />
    );
  };
  const handleCheck = (index) => {
    const temp = [...wishList];
    temp[index].checked = !temp[index].checked;
    setWishList(temp);
  };
  const deleteAll = () => {
    const body = wishList.filter((f) => f.checked).map((e) => ({faPk: e.faPk}));
    Axios.post('wishDelete', body)
      .then((res) => {
        logApi('wishDelete', res.data);
        get(1);
      })
      .catch((err) => {
        logApi('wishDelete error', err.response);
      });
  };
  const scrapOn = (item, index) => {
    Axios.post('scrapOn', {
      faPk: item.faPk,
      userPk: context.me.userPk,
    })
      .then((res) => {
        logApi('scrapOn', res.data);
        const temp = [...wishList];
        temp[index].faScrapType = temp[index].faScrapType === 'Y' ? 'N' : 'Y';
        setWishList(temp);
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
        const temp = [...wishList];
        temp[index].faScrapType = temp[index].faScrapType === 'Y' ? 'N' : 'Y';
        setWishList(temp);
      })
      .catch((err) => {
        logApi('scrapOff error', err.response);
      });
  };
  return (
    <Container>
      <Header
        left={'back'}
        title={'위시리스트'}
        rightComponent={
          <HView>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('FullMap', {
                  wishList: true,
                  // wishList 장소의 좌표값들 필요함
                })
              }
              style={{paddingHorizontal: 20, paddingVertical: 5}}>
              <Icons
                name={'icon-map-24'}
                size={20}
                color={edit ? 'gray' : 'black'}
              />
            </TouchableOpacity>
            {/* <TouchableOpacity
              onPress={!edit ? () => setEdit(true) : null}
              activeOpacity={edit ? 1 : 0.5}
              style={{paddingRight: 20, paddingLeft: 10, paddingVertical: 5}}>
              <Text
                text={'편집'}
                fontSize={16}
                fontWeight={'500'}
                color={edit ? 'gray' : 'black'}
              />
            </TouchableOpacity> */}
          </HView>
        }
        navigation={props.navigation}
      />
      {edit && (
        <HView
          style={{
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            paddingTop: 20,
          }}>
          <Checkbox
            multiple
            label={'모두선택'}
            checked={checkAll}
            onPress={() => {
              let temp = [...wishList];
              temp = temp.map((e) => ({...e, checked: !checkAll}));
              setWishList(temp);
              setCheckAll(!checkAll);
            }}
            size={'large'}
          />
          <Text
            text={'1개 선택됨'}
            fontWeight={'500'}
            fontSize={14}
            color={'dimgray'}
          />
        </HView>
      )}
      <FlatList
        data={wishList}
        keyExtractor={(item) => JSON.stringify(item.faPk)}
        renderItem={renderItem}
        ItemSeparatorComponent={() => (
          <View style={{paddingLeft: 20}}>
            <Seperator line />
          </View>
        )}
        onEndReached={() => {
          if (!moredone) {
            console.log('more endReched!');
            setPage(page + 1);
            get(page + 1);
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
                onPress={() => deleteAll()}
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
