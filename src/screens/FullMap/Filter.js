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
} from 'react-native-nuno-ui';
import {View, TouchableOpacity, ScrollView} from 'react-native';
import {ShadowStyle, screenWidth} from '../../styles';
import Icons from '../../commons/Icons';
import Axios from 'axios';
import {logApi} from 'react-native-nuno-ui/funcs';
import {custom} from '../../config';
import ActionSheet from 'react-native-actions-sheet';
import ListItem from '../../commons/ListItem';

const actionSheetRef = React.createRef();

export default function FullMapFilter(props) {
  const [sports, setSports] = React.useState([]);
  const [selectedSports, setSelectedSports] = React.useState([]);

  React.useEffect(() => {
    Axios.post('sportsList', {})
      .then((res) => {
        logApi('sportsList', res.data);
        setSports(res.data.gojiList);
      })
      .catch((err) => {
        logApi('sportsList error', err.response);
      });
  }, []);
  const handleButton = (e) => {
    const temp = [...selectedSports];
    const found = temp.indexOf(e);
    if (found === -1) {
      temp.push(e);
    } else {
      temp.splice(found, 1);
    }
    setSelectedSports(temp);
  };
  return (
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
                color={'white'}
                onPress={() => null}
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
                    onPress={() => handleButton(e.code)}
                  />
                </View>
              );
            })}
          </HView>
        </View>
        <View style={{padding: 20}}>
          <Text text={'유형'} fontSize={18} fontWeight={'bold'} />
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
          onPress={() => props.navigation.goBack()}
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