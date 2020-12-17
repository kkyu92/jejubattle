import React from 'react';
import {
  Map,
  Seperator,
  HView,
  TextInput,
  Image,
  Text,
  Button,
  Container,
  Header,
  Loader,
} from '../../react-native-nuno-ui';
import {View, TouchableOpacity, ScrollView} from 'react-native';
import {ShadowStyle, screenWidth} from '../../styles';
import Icons from '../../commons/Icons';
import Axios from 'axios';
import {logApi, showToast} from '../../react-native-nuno-ui/funcs';
import {custom} from '../../config';
import ActionSheet from 'react-native-actions-sheet';
import ListItem from '../../commons/ListItem';

const actionSheetRef = React.createRef();

export default function FullMapFilterAll(props) {
  const [loading, setLoading] = React.useState(true);
  const [mapReady] = React.useState(props.route?.params?.mapReady);

  const [sports] = React.useState(props.route?.params?.caCode);
  const [clCode] = React.useState(props.route?.params?.clCode);
  const [selectedClCode, setSelectedClCode] = React.useState([]);
  const [health] = React.useState(props.route?.params?.healthCode);
  const [eat] = React.useState(props.route?.params?.eatCode);
  const [view] = React.useState(props.route?.params?.viewCode);
  const [play] = React.useState(props.route?.params?.playCode);

  const [checkAll, setCheckAll] = React.useState(false);
  const [checkAll2, setCheckAll2] = React.useState(false);

  const [category, setCategory] = React.useState([
    {code: 1, name: '맛집'},
    {code: 2, name: '관광지'},
    {code: 3, name: '체험'},
    {code: 4, name: '구기종목'},
    {code: 5, name: '건강운동'},
  ]);
  const [selectedCategory, setSelectedCategory] = React.useState([]);
  const [item, setItem] = React.useState([]);
  const [selectedItem, setSelectedItem] = React.useState([]);
  const [type, setType] = React.useState([]);
  const [selectedType, setSelectedType] = React.useState([]);

  React.useState(() => {
    setLoading(false);
  }, []);
  React.useEffect(() => {
    console.log('selected category');
    setCheckAll(false);
    setCheckAll2(false);
    setSelectedItem([]);
    setSelectedClCode([]);
    if (selectedCategory.length !== 0) {
      setLoading(true);
      if (selectedCategory[0] === 1) {
        setItem(eat);
        setType();
      } else if (selectedCategory[0] === 2) {
        setItem(view);
        setType();
      } else if (selectedCategory[0] === 3) {
        setItem(play);
        setType();
      } else if (selectedCategory[0] === 4) {
        setItem(sports);
        setType(clCode);
      } else if (selectedCategory[0] === 5) {
        setItem(health);
        setType();
      } else {
        console.log(selectedCategory);
        showToast('또 뭔 카테고리 추가?', 2000, 'center');
      }
      setLoading(false);
    }
  }, [selectedCategory]);

  const handleCategoryButton = (e) => {
    const temp = [];
    temp.push(e);
    setSelectedCategory(temp);
  };
  const handleItemsButton = (e) => {
    const temp = [...selectedItem];
    const found = temp.indexOf(e);
    if (found === -1) {
      temp.push(e);
    } else {
      temp.splice(found, 1);
    }
    setSelectedItem(temp);
  };
  const handleClCodeButton = (e) => {
    const temp = [...selectedClCode];
    const found = temp.indexOf(e);
    if (found === -1) {
      temp.push(e);
    } else {
      temp.splice(found, 1);
    }
    setSelectedClCode(temp);
  };

  React.useEffect(() => {
    if (checkAll) {
      const temp = [...item.map((e) => e.code)];
      setSelectedItem(temp);
    } else {
      setSelectedItem([]);
    }
  }, [checkAll]);
  React.useEffect(() => {
    if (checkAll2) {
      const temp = [...clCode.map((e) => e.code)];
      setSelectedClCode(temp);
    } else {
      setSelectedClCode([]);
    }
  }, [checkAll2]);
  return loading ? (
    <Loader />
  ) : (
    <Container>
      <Header
        left={'close'}
        title={'카테고리 검색'}
        navigation={props.navigation}
      />
      <ScrollView>
        <View style={{padding: 20}}>
          <Seperator height={20} />
          <Text text={'카테고리'} fontSize={18} fontWeight={'bold'} />
          <Seperator height={20} />
          <HView style={{flexWrap: 'wrap'}}>
            {category.map((e, i) => {
              return (
                <View style={{marginRight: 5, marginBottom: 5}} key={i}>
                  <Button
                    text={e.name}
                    paddingHorizontal={30}
                    paddingVertical={15}
                    size={'medium'}
                    color={
                      selectedCategory.indexOf(e.code) === -1
                        ? 'white'
                        : custom.themeColor
                    }
                    onPress={() => handleCategoryButton(e.code)}
                  />
                </View>
              );
            })}
          </HView>
        </View>
        {selectedCategory.length !== 0 && (
          <View style={{padding: 20}}>
            <Seperator height={20} />
            <Text text={'항목'} fontSize={18} fontWeight={'bold'} />
            <Seperator height={20} />
            <HView style={{flexWrap: 'wrap'}}>
              <View style={{marginRight: 5, marginBottom: 5}}>
                <Button
                  text={'전체'}
                  size={'medium'}
                  paddingHorizontal={30}
                  paddingVertical={15}
                  color={checkAll ? custom.themeColor : 'white'}
                  onPress={() => setCheckAll(!checkAll)}
                />
              </View>
              {item.map((e, i) => {
                return (
                  <View style={{marginRight: 5, marginBottom: 5}} key={i}>
                    <Button
                      text={e.name}
                      paddingHorizontal={30}
                      paddingVertical={15}
                      size={'medium'}
                      color={
                        selectedItem.indexOf(e.code) === -1
                          ? 'white'
                          : custom.themeColor
                      }
                      onPress={() => handleItemsButton(e.code)}
                    />
                  </View>
                );
              })}
            </HView>
          </View>
        )}
        {selectedCategory[0] === 4 && (
          <View style={{padding: 20}}>
            <Text text={'유형'} fontSize={18} fontWeight={'bold'} />
            <Seperator height={20} />
            <HView style={{flexWrap: 'wrap'}}>
              <View style={{marginRight: 5, marginBottom: 5}}>
                <Button
                  text={'전체'}
                  size={'medium'}
                  paddingHorizontal={30}
                  paddingVertical={15}
                  color={checkAll2 ? custom.themeColor : 'white'}
                  onPress={() => setCheckAll2(!checkAll2)}
                />
              </View>
              {clCode.map((e, i) => {
                return (
                  <View style={{marginRight: 5, marginBottom: 5}} key={i}>
                    <Button
                      text={e.name}
                      paddingHorizontal={30}
                      paddingVertical={15}
                      size={'medium'}
                      color={
                        selectedClCode.indexOf(e.code) === -1
                          ? 'white'
                          : custom.themeColor
                      }
                      onPress={() => handleClCodeButton(e.code)}
                    />
                  </View>
                );
              })}
            </HView>
          </View>
        )}
      </ScrollView>
      <HView
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderTopColor: 'lightgray',
          borderTopWidth: 1,
        }}>
        <Button
          text={'설정하기'}
          onPress={() =>
            props.navigation.navigate('FullMap', {
              itemList: selectedItem,
              typeList: selectedClCode,
            })
          }
          color={custom.themeColor}
          disable={false}
          size={'large'}
          stretch
        />
      </HView>
      <Seperator bottom />
    </Container>
  );
}
// props.navigation.navigate(
//   'FullMap',
//   mapReady === 'aroundme'
//     ? {
//         aroundme: true,
//         itemList: selectedItem,
//         typeList: selectedClCode,
//       }
//     : mapReady === 'facilitySearch'
//     ? {
//         facilitySearch: true,
//         itemList: selectedItem,
//         typeList: selectedClCode,
//       }
//     : mapReady === 'noSearch'
//     ? {
//         noSearch: true,
//         itemList: selectedItem,
//         typeList: selectedClCode,
//       }
//     : mapReady === 'noSearchFilter'
//     ? {
//         noSearchFilter: true,
//         itemList: selectedItem,
//         typeList: selectedClCode,
//       }
//     : {
//         battleChatLink: true,
//         itemList: selectedItem,
//         typeList: selectedClCode,
//       },
// )
// }
