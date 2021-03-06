import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import Login from '../screens/Login';
import Join from '../screens/Join';
import Webview from '../screens/Webview';

const Stack = createStackNavigator();
export default function AuthStackScreen() {
  return (
    <Stack.Navigator
      headerMode="none"
      mode="modal"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Join" component={Join} />
      <Stack.Screen name="Webview" component={Webview} />
    </Stack.Navigator>
  );
}
