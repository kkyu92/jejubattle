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
import {screenWidth} from '../../styles';
import FirstScreen from './FirstScreen';
import SecondScreen from './SecondScreen';
import ThirdScreen from './ThirdScreen';

export default function GuideStart(props) {
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
    return null;
  };
  const renderScene = ({route}) => {
    switch (route.key) {
      case '1':
        return <FirstScreen />;
      case '2':
        return <SecondScreen />;
      case '3':
        return <ThirdScreen navigation={props.navigation} />;
    }
  };
  return loading === true ? (
    <Loader />
  ) : (
    <Container>
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
