import React from 'react';
import {
  Container,
  Text,
  Header,
  Seperator,
  HView,
  Image,
} from '../../react-native-nuno-ui';
import {TouchableOpacity, View, ScrollView, FlatList} from 'react-native';
import Icons from '../../commons/Icons';
import {ShadowStyle, screenWidth} from '../../styles';
import Axios from 'axios';
import {logApi} from '../../react-native-nuno-ui/funcs';
import {sports1Table, sports2Table} from '../../constants';

export default function Facility(props) {
  const [sports1, setSports1] = React.useState([]);
  const [sports2, setSports2] = React.useState([]);

  React.useEffect(() => {
    Axios.post('sportsList', {})
      .then((res) => {
        logApi('sportsList success', res.data);
        let temp1 = [...res.data.gojiList];
        let temp2 = [...res.data.healthList];
        temp1 = temp1.map((e, i) => {
          return {...e, icon: sports1Table[i].icon};
        });
        temp2 = temp2.map((e, i) => {
          return {...e, icon: sports2Table[i].icon};
        });
        setSports1(temp1);
        setSports2(temp2);
      })
      .catch((err) => {
        logApi('sportsList error', err.response);
      });
  }, []);
  const renderItemCategory = ({item}) => {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <Image
          local
          height={Math.floor((screenWidth - 180) / 5)}
          width={Math.floor((screenWidth - 180) / 5)}
          uri={item.icon}
          onPress={() =>
            props.navigation.navigate('FacilityList', {
              title: '구기종목',
              endpoint: 'gojiList',
              code: item.code,
              tablist: sports1,
            })
          }
          resizeMode={'contain'}
        />
        <Seperator height={10} />
        <Text text={item.name} fontSize={12} />
        <Seperator height={10} />
      </View>
    );
  };
  const renderItemHealth = ({item}) => {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <Image
          local
          height={Math.floor((screenWidth - 180) / 5)}
          width={Math.floor((screenWidth - 180) / 5)}
          uri={item.icon}
          onPress={() =>
            props.navigation.navigate('FacilityList', {
              title: '건강운동',
              endpoint: 'healthList',
              code: item.code,
              tablist: sports2,
            })
          }
          resizeMode={'contain'}
        />
        <Seperator height={10} />
        <Text text={item.name} fontSize={12} />
      </View>
    );
  };
  return (
    <Container>
      <Header
        leftComponent={
          <View style={{paddingHorizontal: 20, paddingVertical: 5}}>
            <Image
              local
              uri={require('../../../assets/img/icon-hamburger.png')}
              height={20}
              width={20}
              resizeMode={'cover'}
              onPress={() => props.navigation.toggleDrawer()}
            />
          </View>
        }
        rightComponent={
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Search')}
            style={{paddingHorizontal: 20, paddingVertical: 5}}>
            <Icons name="icon-search-16" size={20} color={'black'} />
          </TouchableOpacity>
        }
        title={'운동시설'}
        navigation={props.navigation}
      />
      <View style={{backgroundColor: 'whitesmoke', flex: 1}}>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 8,
            margin: 20,
            padding: 20,
            ...ShadowStyle,
          }}>
          <Text text={'구기종목'} fontWeight={'bold'} fontSize={21} />
          <Seperator height={30} />
          <FlatList
            data={sports1}
            keyExtractor={(item) => JSON.stringify(item.code)}
            renderItem={renderItemCategory}
            numColumns={5}
          />
        </View>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 8,
            margin: 20,
            padding: 20,
            ...ShadowStyle,
          }}>
          <Text text={'건강운동'} fontWeight={'bold'} fontSize={21} />
          <Seperator height={30} />
          <FlatList
            data={sports2}
            keyExtractor={(item) => JSON.stringify(item.code)}
            renderItem={renderItemHealth}
            numColumns={5}
          />
        </View>
      </View>
    </Container>
  );
}
