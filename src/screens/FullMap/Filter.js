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

export default function FullMapFilter(props) {
  const [loading, setLoading] = React.useState(false);
  const [mapReady] = React.useState(props.route?.params?.mapReady);
  const [sports] = React.useState(props.route?.params?.caCode);
  const [selectedSports, setSelectedSports] = React.useState([]);
  const [clCode] = React.useState(props.route?.params?.clCode);
  const [selectedClCode, setSelectedClCode] = React.useState([]);
  const [checkAll, setCheckAll] = React.useState(false);
  const [checkAll2, setCheckAll2] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      if (props.route?.params?.selectCa) {
        let selectCa = props.route.params.selectCa;
        setSelectedSports(selectCa);
      }
      if (props.route?.params?.selectCl) {
        let selectCl = props.route.params.selectCl;
        setSelectedClCode(selectCl);
      }
      setLoading(false);
    }, 500);
  }, [props.route?.params?.selectCa, props.route?.params?.selectCl]);

  const handleCheckAllButton = () => {
    if (!checkAll) {
      const temp = [...sports.map((e) => e.code)];
      setSelectedSports(temp);
      setCheckAll(true);
    } else {
      setSelectedSports([]);
      setCheckAll(false);
    }
  };
  const handleSportsButton = (e) => {
    const temp = [...selectedSports];
    const found = temp.indexOf(e);
    if (found === -1) {
      temp.push(e);
    } else {
      temp.splice(found, 1);
    }
    setSelectedSports(temp);
    console.log('temp:::: ' + temp);
    console.log(`sports : ${sports}`);
    if (temp.length === sports.length) {
      setCheckAll(true);
    } else {
      setCheckAll(false);
    }
  };
  const handleCheckAll2Button = () => {
    if (!checkAll2) {
      const temp = [...clCode.map((e) => e.code)];
      setSelectedClCode(temp);
      setCheckAll2(true);
    } else {
      setSelectedClCode([]);
      setCheckAll2(false);
    }
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
    if (temp.length === 4) {
      setCheckAll2(true);
    } else {
      setCheckAll2(false);
    }
  };
  const settingFinish = () => {
    console.log(`selectedSports : ${selectedSports}`);
    console.log(`selectedClCode : ${selectedClCode}`);
    if (selectedSports.length === 0) {
      showToast(`종목을 선택해주세요.`);
    } else if (selectedClCode.length === 0) {
      showToast(`유형을 선택해주세요.`);
    } else {
      props.navigation.navigate('FullMap', {
        itemList: selectedSports,
        typeList: selectedClCode,
      });
    }
  };

  return loading === true ? (
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
          <Text text={'종목'} fontSize={18} fontWeight={'bold'} />
          <Seperator height={20} />
          <HView style={{flexWrap: 'wrap'}}>
            <View style={{marginRight: 5, marginBottom: 5}}>
              <Button
                text={'전체'}
                size={'medium'}
                paddingHorizontal={30}
                paddingVertical={15}
                color={
                  checkAll || sports.length === selectedSports.length
                    ? custom.themeColor
                    : 'white'
                }
                onPress={() => handleCheckAllButton()}
              />
            </View>
            {sports.map((e, i) => {
              return (
                <View style={{marginRight: 5, marginBottom: 5}} key={i}>
                  <Button
                    text={e.name}
                    paddingHorizontal={30}
                    paddingVertical={15}
                    size={'medium'}
                    color={
                      selectedSports.indexOf(e.code) === -1
                        ? 'white'
                        : custom.themeColor
                    }
                    onPress={() => handleSportsButton(e.code)}
                  />
                </View>
              );
            })}
          </HView>
        </View>
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
                color={
                  checkAll2 || 4 === selectedClCode.length
                    ? custom.themeColor
                    : 'white'
                }
                onPress={() => handleCheckAll2Button()}
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
          onPress={() => settingFinish()}
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
