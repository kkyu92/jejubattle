import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import Login from '../screens/Login';
import Join from '../screens/Join';

const CardStack = createStackNavigator();
function AuthCardStackScreen() {
  return (
    <CardStack.Navigator headerMode="none">
      <CardStack.Screen name="Login" component={Login} />
      <CardStack.Screen name="Join" component={Join} />
      {/* <CardStack.Screen name="LoginEmail" component={LoginEmail} /> */}
    </CardStack.Navigator>
  );
}

const Stack = createStackNavigator();
export default function AuthStackScreen() {
  return (
    <Stack.Navigator
      headerMode="none"
      mode="modal"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
      }}>
      <Stack.Screen name="AuthCard" component={AuthCardStackScreen} />
      {/* <Stack.Screen name="AgreementModal" component={AgreementStackScreen} />
      <Stack.Screen name="UserTypeModal" component={UserTypeStackScreen} />
      <Stack.Screen name="UsernameModal" component={UsernameStackScreen} />
      <Stack.Screen name="EmailModal" component={EmailStackScreen} />
      <Stack.Screen name="PasswordModal" component={PasswordStackScreen} />
      <Stack.Screen name="MobileAuthModal" component={MobileAuthStackScreen} /> */}
    </Stack.Navigator>
  );
}
