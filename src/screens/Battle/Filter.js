import React from 'react';
import {
  Container,
  Text,
  Header,
  Seperator,
  HView,
  Button,
  Image,
  Checkbox,
} from '../../react-native-nuno-ui';
import {TouchableOpacity, View, ScrollView} from 'react-native';
import {custom} from '../../config';
import Axios from 'axios';
import {logApi} from '../../react-native-nuno-ui/funcs';
import {AppContext} from '../../context';
import {sports1Table} from '../../constants';
import {screenWidth} from '../../styles';

export default function BattleFilter(props) {
  const context = React.useContext(AppContext);
  const [boCode, setBoCode] = React.useState(props.route.params.boCode);
  const [baCode, setBaCode] = React.useState(props.route.params.baCode);
  const [bmCode, setBmCode] = React.useState(props.route.params.bmCode);
  const [blCode, setBlCode] = React.useState(props.route.params.blCode);
  const [bpCode, setBpCode] = React.useState(props.route.params.bpCode);
  const [sports, setSports] = React.useState([]);
  const [caCode, setCaCode] = React.useState(props.route.params.caCode);

  React.useEffect(() => {
    Axios.post('sportsList', {})
      .then((res) => {
        logApi('sportsList', res.data);
        let temp = [...res.data.gojiList];
        temp = temp.map((e, i) => {
          return {...e, icon: sports1Table[i].icon};
        });
        setSports(temp);
      })
      .catch((err) => {
        logApi('sportsList error', err.response);
      });
    console.log(props.route.params);
    console.log(
      `정렬::: ${boCode}
      \n배틀상태::: ${baCode}
      \n게임형태::: ${bmCode}
      \n실력::: ${blCode}
      \n공개여부::: ${bpCode}
      \n종목선택::: ${caCode}`,
    );
  }, []);
  const handleSports = (e) => {
    const temp = [...caCode];
    const found = temp.map((t) => t.code).indexOf(e.code);
    if (found === -1) {
      temp.push(e);
    } else {
      temp.splice(found, 1);
    }
    setCaCode(temp);
  };
  const apply = () => {
    let code = [];
    caCode.map((e) => {
      code.push({
        code: e.code,
      });
    });
    console.log(JSON.stringify(code));
    props.navigation.navigate('Battle', {
      boCode,
      baCode,
      bmCode,
      blCode,
      bpCode,
      // caCode,
      caCode: code,
    });
  };
  const reset = () => {
    setBoCode(1);
    setBaCode(0);
    setBmCode(0);
    setBlCode(0);
    setBpCode(0);
    setCaCode([]);
  };
  return (
    <Container>
      <Header
        left={'close'}
        title={'필터'}
        navigation={props.navigation}
        rightComponent={
          <TouchableOpacity
            onPress={reset}
            style={{
              paddingHorizontal: 20,
              paddingVertical: 5,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text text={'초기화'} color={custom.themeColor} fontSize={17} />
          </TouchableOpacity>
        }
      />
      <ScrollView>
        <View style={{padding: 20}}>
          <Seperator height={20} />
          <Text text={'정렬'} fontWeight={'bold'} fontSize={18} />
          <Seperator height={10} />
          <HView style={{flexWrap: 'wrap'}}>
            <View style={{paddingVertical: 10, paddingRight: 20}}>
              <Checkbox
                label={'등록순'}
                checked={boCode === 1}
                onPress={() => setBoCode(1)}
              />
            </View>
            <View style={{paddingVertical: 10, paddingRight: 20}}>
              <Checkbox
                label={'날짜순'}
                checked={boCode === 2}
                onPress={() => setBoCode(2)}
              />
            </View>
            <View style={{paddingVertical: 10, paddingRight: 20}}>
              <Checkbox
                label={'내 위치순'}
                checked={boCode === 3}
                onPress={() => setBoCode(3)}
              />
            </View>
          </HView>

          <Seperator height={20} />
          <Text text={'배틀상태'} fontWeight={'bold'} fontSize={16} />
          <Seperator height={10} />
          <HView style={{flexWrap: 'wrap'}}>
            <View style={{paddingVertical: 10, paddingRight: 20}}>
              <Checkbox
                label={'전체'}
                checked={baCode === 0}
                onPress={() => setBaCode(0)}
              />
            </View>
            <View style={{paddingVertical: 10, paddingRight: 20}}>
              <Checkbox
                label={'대기중'}
                checked={baCode === 1}
                onPress={() => setBaCode(1)}
              />
            </View>
            <View style={{paddingVertical: 10, paddingRight: 20}}>
              <Checkbox
                label={'배틀준비'}
                checked={baCode === 2}
                onPress={() => setBaCode(2)}
              />
            </View>
            <View style={{paddingVertical: 10, paddingRight: 20}}>
              <Checkbox
                label={'배틀중'}
                checked={baCode === 3}
                onPress={() => setBaCode(3)}
              />
            </View>
          </HView>

          <Seperator height={20} />
          <Text text={'게임형태'} fontWeight={'bold'} fontSize={16} />
          <Seperator height={10} />
          <HView style={{flexWrap: 'wrap'}}>
            <View style={{paddingVertical: 10, paddingRight: 20}}>
              <Checkbox
                label={'전체'}
                checked={bmCode === 0}
                onPress={() => setBmCode(0)}
              />
            </View>
            <View style={{paddingVertical: 10, paddingRight: 20}}>
              <Checkbox
                label={'개인전'}
                checked={bmCode === 1}
                onPress={() => setBmCode(1)}
              />
            </View>
            <View style={{paddingVertical: 10, paddingRight: 20}}>
              <Checkbox
                label={'팀전'}
                checked={bmCode === 2}
                onPress={() => setBmCode(2)}
              />
            </View>
          </HView>

          <Seperator height={20} />
          <Text text={'실력'} fontWeight={'bold'} fontSize={16} />
          <Seperator height={10} />
          <HView style={{flexWrap: 'wrap'}}>
            <View style={{paddingVertical: 10, paddingRight: 20}}>
              <Checkbox
                label={'전체'}
                checked={blCode === 0}
                onPress={() => setBlCode(0)}
              />
            </View>
            <View style={{paddingVertical: 10, paddingRight: 20}}>
              <Checkbox
                label={'초보'}
                checked={blCode === 1}
                onPress={() => setBlCode(1)}
              />
            </View>
            <View style={{paddingVertical: 10, paddingRight: 20}}>
              <Checkbox
                label={'중수'}
                checked={blCode === 2}
                onPress={() => setBlCode(2)}
              />
            </View>
            <View style={{paddingVertical: 10, paddingRight: 20}}>
              <Checkbox
                label={'고수'}
                checked={blCode === 3}
                onPress={() => setBlCode(3)}
              />
            </View>
            <View style={{paddingVertical: 10, paddingRight: 20}}>
              <Checkbox
                label={'프로'}
                checked={blCode === 4}
                onPress={() => setBlCode(4)}
              />
            </View>
          </HView>

          <Seperator height={20} />
          <Text text={'공개여부'} fontWeight={'bold'} fontSize={16} />
          <Seperator height={10} />
          <HView style={{flexWrap: 'wrap'}}>
            <View style={{paddingVertical: 10, paddingRight: 20}}>
              <Checkbox
                label={'전체'}
                checked={bpCode === 0}
                onPress={() => setBpCode(0)}
              />
            </View>
            <View style={{paddingVertical: 10, paddingRight: 20}}>
              <Checkbox
                label={'공개'}
                checked={bpCode === 1}
                onPress={() => setBpCode(1)}
              />
            </View>
            <View style={{paddingVertical: 10, paddingRight: 20}}>
              <Checkbox
                label={'비공개'}
                checked={bpCode === 2}
                onPress={() => setBpCode(2)}
              />
            </View>
          </HView>

          <Seperator height={20} />
          <Text text={'종목선택'} fontWeight={'bold'} fontSize={16} />
          <HView style={{flexWrap: 'wrap'}}>
            {sports.map((e, i) => {
              return (
                <TouchableOpacity onPress={() => handleSports(e)} key={i}>
                  <View
                    style={{
                      padding: 10,
                      alignItems: 'center',
                      opacity:
                        caCode.map((s) => s.code).indexOf(e.code) === -1
                          ? 0.3
                          : 1,
                    }}>
                    <Image
                      local
                      height={Math.floor((screenWidth - 140) / 5)}
                      width={Math.floor((screenWidth - 140) / 5)}
                      uri={e.icon}
                      resizeMode={'contain'}
                    />
                    <Seperator height={10} />
                    <Text text={e.name} fontSize={14} />
                  </View>
                </TouchableOpacity>
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
          text={'적용하기'}
          onPress={apply}
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
