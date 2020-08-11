import React from 'react';
import {
  Container,
  Header,
  Text,
  Image,
  HView,
  Seperator,
  TextInput,
} from 'react-native-nuno-ui';
import {View, ScrollView, TouchableOpacity, FlatList, Platform} from 'react-native';
import Icons from '../../commons/Icons';
import {custom} from '../../config';
import ListItem from '../../commons/ListItem';
import Axios from 'axios';
import {
  logApi,
  saveRecentKeyword,
  getRecentKeyword,
  removeRecentKeyword,
} from 'react-native-nuno-ui/funcs';
import {AppContext} from '../../context';

export default function Search(props) {
  const context = React.useContext(AppContext);
  const [stickyHeaderIndices, setStickyHeaderIndices] = React.useState([]);
  const [keyword, setKeyword] = React.useState('');
  const [result, setResult] = React.useState([]);
  const [recentKeywords, setRecentKeywords] = React.useState([]);

  React.useEffect(() => {
    getKeywords();
  }, []);
  const getKeywords = async () => {
    const temp = await getRecentKeyword();
    setRecentKeywords(temp);
  };
  const getList = (key) => {
    Axios.post('search', {
      keyword: key,
    })
      .then(async (res) => {
        logApi('search', res.data);
        let temp = [];
        let stickyIndex = [];
        if (res.data.goji.length > 0) {
          stickyIndex.push(0);
          temp.push({
            faPk: 1000000000,
            title: '운동시설',
            cnt: res.data.goji.length,
          });
          temp = temp.concat(res.data.goji);
        }
        if (res.data.recommend.length > 0) {
          stickyIndex.push(temp.length);
          temp.push({
            faPk: 2000000000,
            title: '추천코스',
            cnt: res.data.recommend.length,
          });
          temp = temp.concat(res.data.recommend);
        }
        setResult(temp);
        setStickyHeaderIndices(stickyIndex);

        const k = await saveRecentKeyword(key, 5);
        setRecentKeywords(k);
      })
      .catch((err) => {
        logApi('search error', err.response);
      });
  };

  const renderItems = ({item, index}) => {
    if (item.title) {
      return (
        <HView style={{padding: 20, backgroundColor: 'white'}}>
          <Text fontSize={16} fontWeight={'bold'} text={item.title} />
          <Text fontSize={16} text={'에서의 검색결과'} />
          <Text fontSize={16} text={`(${item.cnt})`} color={'gray'} />
        </HView>
      );
    } else {
      return (
        <ListItem
          onPress={() =>
            props.navigation.navigate('FacilityView', {faPk: item.faPk})
          }
          item={item}
          index={index}
          scrapOn={scrapOn}
          scrapOff={scrapOff}
          showScrap={true}
        />
      );
    }
  };
  const scrapOn = (item, index) => {
    Axios.post('scrapOn', {
      faPk: item.faPk,
      userPk: context.me.userPk,
    })
      .then((res) => {
        logApi('scrapOn', res.data);
        const temp = [...result];
        temp[index].faScrapType = temp[index].faScrapType === 'Y' ? 'N' : 'Y';
        setResult(temp);
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
        const temp = [...result];
        temp[index].faScrapType = temp[index].faScrapType === 'Y' ? 'N' : 'Y';
        setResult(temp);
      })
      .catch((err) => {
        logApi('scrapOff error', err.response);
      });
  };
  return (
    <Container>
      <Header
        leftComponent={
          <View style={{paddingHorizontal: 20, paddingVertical: 5}}>
            <Icons name="icon-search-16" size={20} color={custom.themeColor} />
          </View>
        }
        right={'close'}
        centerComponent={
          <View style={{flex: 1}}>
            <TextInput
              value={keyword}
              onChangeText={(e) => setKeyword(e)}
              borderWidth={0}
              returnKeyType={'search'}
              returnKeyLabel={'검색'}
              onSubmitEditing={() => getList(keyword)}
              placeholder={'검색하실 키워드를 입력해주세요.'}
              clearButtonMode={'while-editing'}
            />
          </View>
        }
        navigation={props.navigation}
      />
      <HView>
        <View style={{padding: 20}}>
          <Text text={'최근 검색어'} color={'gray'} fontSize={13} />
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {recentKeywords.map((e, i) => {
            return (
              <TouchableOpacity
                key={i}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: 'whitesmoke',
                  padding: 10,
                  borderRadius: 4,
                  marginRight: 10,
                }}
                onPress={() => {
                  setKeyword(e.keyword);
                  getList(e.keyword);
                }}>
                <Text text={e.keyword} color={'dimgray'} fontSize={14} />
                <Seperator width={8} />
                <TouchableOpacity
                  onPress={async () => {
                    const temp = await removeRecentKeyword(e.keyword);
                    setRecentKeywords(temp);
                  }}>
                  <Icons name={'icon-cancel-7'} size={7} />
                </TouchableOpacity>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </HView>

      <FlatList
        data={result}
        keyExtractor={(item) => JSON.stringify(item.faPk)}
        renderItem={renderItems}
        stickyHeaderIndices={
          Platform.OS === 'ios' ? stickyHeaderIndices : undefined
        }
        ItemSeparatorComponent={(e) => {
          console.log('ItemSeparatorComponent', e);
          if (e.leadingItem.title) {
            return null;
          } else {
            return (
              <View style={{paddingLeft: 20}}>
                <Seperator line />
              </View>
            );
          }
        }}
        // ListEmptyComponent={<Empty />}
        // ListHeaderComponent={FlatListHeader()}
        // refreshing={pullToRefresh}
        // onRefresh={() => {
        //   setIsLast(false);
        //   setPullToRefresh(true);
        // }}
      />
      {/* <Seperator height={10} color={'whitesmoke'} /> */}
    </Container>
  );
}
