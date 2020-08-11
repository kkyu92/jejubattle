import React from 'react';
import {
  Container,
  Text,
  Header,
  Seperator,
  HView,
  Button,
  TextInput,
  Picker,
  DateTime,
  Checkbox,
  Image,
} from 'react-native-nuno-ui';
import {TouchableOpacity, View, FlatList} from 'react-native';
import Icons from '../../commons/Icons';
import {custom} from '../../config';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {TabView} from 'react-native-tab-view';
import {screenWidth} from '../../styles';
import TabBattleDetail from './TabBattleDetail';
import TabBattleChat from './TabBattleChat';
import MatchMember from '../../commons/MatchMember';
import Axios from 'axios';
import {logApi} from 'react-native-nuno-ui/funcs';

const initialLayout = {width: screenWidth};

export default function BattleView(props) {
  const [showMatchMember, setShowMatchMember] = React.useState(true);
  const [index, setIndex] = React.useState(0);
  const [info, setInfo] = React.useState({});
  const [routes] = React.useState([
    {key: '1', title: '배틀상세내용'},
    {key: '2', title: '배틀 톡'},
  ]);
  React.useEffect(() => {
    get();
  }, []);
  const get = () => {
    Axios.get(`getBattle/${props.route.params.baPk}`)
      .then((res) => {
        logApi('getBattle', res.data);
        setInfo(res.data);
      })
      .catch((err) => {
        logApi('getBattle error', err.response);
      });
  };
  const renderTabBar = (tabprops) => {
    return (
      <HView
        style={{
          justifyContent: 'space-between',
          borderBottomColor: 'lightgray',
          borderBottomWidth: 1,
        }}>
        {tabprops.navigationState.routes.map((route, i) => {
          return (
            <TouchableOpacity
              style={{
                flex: 1,
                alignItems: 'center',
                paddingVertical: 15,
                borderBottomColor: custom.themeColor,
                borderBottomWidth: index === i ? 3 : 0,
              }}
              key={i}
              onPress={() => setIndex(i)}>
              {index === i ? (
                <Text text={route.title} fontWeight={'bold'} fontSize={17} />
              ) : (
                <Text text={route.title} color={'gray'} fontSize={17} />
              )}
            </TouchableOpacity>
          );
        })}
      </HView>
    );
  };
  const renderScene = ({route}) => {
    switch (route.key) {
      case '1':
        return <TabBattleDetail navigation={props.navigation} info={info} />;
      case '2':
        return <TabBattleChat navigation={props.navigation} info={info} />;
    }
  };
  return (
    <Container>
      <Header
        left={'back'}
        title={info.baSubject}
        navigation={props.navigation}
      />
      <View style={{alignItems: 'flex-end', padding: 20}}>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={() => setShowMatchMember(!showMatchMember)}>
          <Text text={'접기'} fontWeight={'500'} fontSize={14} />
          <Seperator width={10} />
          {/* <Icons name={'icon-folding-27'} size={23} color={'dimgray'} /> */}
          {showMatchMember ? (
            <Image
              local
              uri={require('../../../assets/img/icon-fold.png')}
              height={27}
              width={27}
              resizeMode={'cover'}
            />
          ) : (
            <Image
              local
              uri={require('../../../assets/img/icon-fold.png')}
              height={27}
              width={27}
              resizeMode={'cover'}
            />
          )}
        </TouchableOpacity>
      </View>
      {showMatchMember && info.teamA && (
        <MatchMember
          teamA={info.teamA}
          teamB={info.teamB}
          navigation={props.navigation}
        />
      )}
      <Seperator height={20} />
      <TabView
        lazy
        renderTabBar={renderTabBar}
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
      />
    </Container>
  );
}
