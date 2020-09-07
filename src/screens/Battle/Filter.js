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
  const [filter1, setFilter1] = React.useState(1);
  const [filter2, setFilter2] = React.useState(1);
  const [filter3, setFilter3] = React.useState(1);
  const [filter4, setFilter4] = React.useState(1);
  const [filter5, setFilter5] = React.useState(1);
  const [sports, setSports] = React.useState([]);
  const [selectedSports, setSelectedSports] = React.useState([]);

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
  }, []);
  const handleSports = (e) => {
    const temp = [...selectedSports];
    const found = temp.map((t) => t.code).indexOf(e.code);
    if (found === -1) {
      temp.push(e);
    } else {
      temp.splice(found, 1);
    }
    setSelectedSports(temp);
  };
  const apply = () => {
    props.navigation.goBack();
  };
  const reset = () => {
    setFilter1(1);
    setFilter2(1);
    setFilter3(1);
    setFilter4(1);
    setFilter5(1);
    setSelectedSports([]);
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
                checked={filter1 === 1}
                onPress={() => setFilter1(1)}
              />
            </View>
            <View style={{paddingVertical: 10, paddingRight: 20}}>
              <Checkbox
                label={'날짜순'}
                checked={filter1 === 2}
                onPress={() => setFilter1(2)}
              />
            </View>
            <View style={{paddingVertical: 10, paddingRight: 20}}>
              <Checkbox
                label={'내 위치순'}
                checked={filter1 === 3}
                onPress={() => setFilter1(3)}
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
                checked={filter2 === 1}
                onPress={() => setFilter2(1)}
              />
            </View>
            <View style={{paddingVertical: 10, paddingRight: 20}}>
              <Checkbox
                label={'대기중'}
                checked={filter2 === 2}
                onPress={() => setFilter2(2)}
              />
            </View>
            <View style={{paddingVertical: 10, paddingRight: 20}}>
              <Checkbox
                label={'배틀준비'}
                checked={filter2 === 3}
                onPress={() => setFilter2(3)}
              />
            </View>
            <View style={{paddingVertical: 10, paddingRight: 20}}>
              <Checkbox
                label={'배틀중'}
                checked={filter2 === 4}
                onPress={() => setFilter2(4)}
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
                checked={filter3 === 1}
                onPress={() => setFilter3(1)}
              />
            </View>
            <View style={{paddingVertical: 10, paddingRight: 20}}>
              <Checkbox
                label={'개인전'}
                checked={filter3 === 2}
                onPress={() => setFilter3(2)}
              />
            </View>
            <View style={{paddingVertical: 10, paddingRight: 20}}>
              <Checkbox
                label={'팀전'}
                checked={filter3 === 3}
                onPress={() => setFilter3(3)}
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
                checked={filter4 === 1}
                onPress={() => setFilter4(1)}
              />
            </View>
            <View style={{paddingVertical: 10, paddingRight: 20}}>
              <Checkbox
                label={'초보'}
                checked={filter4 === 2}
                onPress={() => setFilter4(2)}
              />
            </View>
            <View style={{paddingVertical: 10, paddingRight: 20}}>
              <Checkbox
                label={'중수'}
                checked={filter4 === 3}
                onPress={() => setFilter4(3)}
              />
            </View>
            <View style={{paddingVertical: 10, paddingRight: 20}}>
              <Checkbox
                label={'고수'}
                checked={filter4 === 4}
                onPress={() => setFilter4(4)}
              />
            </View>
            <View style={{paddingVertical: 10, paddingRight: 20}}>
              <Checkbox
                label={'프로'}
                checked={filter4 === 5}
                onPress={() => setFilter4(5)}
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
                checked={filter5 === 1}
                onPress={() => setFilter5(1)}
              />
            </View>
            <View style={{paddingVertical: 10, paddingRight: 20}}>
              <Checkbox
                label={'공개'}
                checked={filter5 === 2}
                onPress={() => setFilter5(2)}
              />
            </View>
            <View style={{paddingVertical: 10, paddingRight: 20}}>
              <Checkbox
                label={'비공개'}
                checked={filter5 === 3}
                onPress={() => setFilter5(3)}
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
                        selectedSports.map((s) => s.code).indexOf(e.code) === -1
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
