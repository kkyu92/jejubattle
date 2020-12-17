import React from 'react';
import {
  Container,
  Text,
  Header,
  Seperator,
  HView,
  Image,
  Loader,
} from '../../react-native-nuno-ui';
import {TouchableOpacity, View} from 'react-native';
import {custom, SOCKET_URL} from '../../config';
import {TabView} from 'react-native-tab-view';
import FindBattle from './FindBattle';
import ReadyBattle from './ReadyBattle';
import FinishBattle from './FinishBattle';
import {screenWidth} from '../../styles';

export default function Guide(props) {
  const initialLayout = {width: screenWidth};
  const [loading, setLoading] = React.useState(true);
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: '1', title: '배틀찾기'},
    {key: '2', title: '배틀준비'},
    {key: '3', title: '배틀완료'},
  ]);

  React.useEffect(() => {
    setLoading(true);
    setIndex(0);
    setLoading(false);
  }, []);

  const renderTabBar = (tabprops) => {
    return (
      <HView
        style={{
          justifyContent: 'space-between',
          borderBottomColor: 'lightgray',
          borderBottomWidth: 1,
          backgroundColor: 'white',
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
              onPress={() => {
                console.log('onIndexChange', i);
                if (i === 1) {
                  // FIND_BATTLE
                } else if (i === 2) {
                  // READY_BATTLE
                } else {
                  // FINISH_BATTLE
                }
                setIndex(i);
              }}>
              {index === i ? (
                <Text
                  text={route.title}
                  color={custom.themeColor}
                  fontWeight={'bold'}
                  fontSize={17}
                />
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
        return <FindBattle />;
      case '2':
        return <ReadyBattle />;
      case '3':
        return <FinishBattle />;
    }
  };
  return loading === true ? (
    <Loader />
  ) : (
    <Container>
      <Header left={'back'} title={'가이드'} navigation={props.navigation} />
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
