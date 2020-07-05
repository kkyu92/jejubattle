/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {RootStackScreen} from './src/navigations';
import {createStackNavigator} from '@react-navigation/stack';
import {navigationRef} from './src/navigations/RootNavigation';
import { Nuno } from 'react-native-nuno-ui';
import { custom } from './src/config';

const Stack = createStackNavigator();

Nuno.init({
  themeColor: custom.themeColor,
  textColor: custom.textColor,
  headerTitleWeight: custom.headerTitleWeight,
});

const App: () => React$Node = () => {
  const colorScheme = useColorScheme();
  const [ready, setReady] = React.useState(false);

  const theme = {
    colors: {
      background: colorScheme === 'light' ? 'white' : 'black',
    },
  };

  let init = async () => {
    // …do multiple async tasks
    // await registerAppWithFCM();
    // await requestPermission();
    // await getToken();
    // await apiInit();
    // await locationInit();
  };

  React.useEffect(() => {
    if (!ready) {
      init().finally(() => {
        setReady(true);
        // dynamicLinks()
        //   .getInitialLink()
        //   .then(link => {
        //     console.log('dynamic link', link);
        //     saveDeeplink(link.url);
        //   });
      });
    }
  }, []);

  return (
    <NavigationContainer theme={theme} ref={navigationRef}>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Root" component={RootStackScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
