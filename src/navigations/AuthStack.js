import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import Login from '../screens/Login';
import LoginEmail from '../screens/Login/email';
import Agreement from '../screens/Agreement';
import UserType from '../screens/UserType';
import Username from '../screens/Username';
import Email from '../screens/Email';
import Password from '../screens/Password';
import MobileAuth from '../screens/MobileAuth';

const CardStack = createStackNavigator();
function AuthCardStackScreen() {
  return (
    <CardStack.Navigator headerMode="none">
      <CardStack.Screen name="Login" component={Login} />
      <CardStack.Screen name="LoginEmail" component={LoginEmail} />
    </CardStack.Navigator>
  );
}

const AgreementStack = createStackNavigator();
function AgreementStackScreen() {
  return (
    <AgreementStack.Navigator>
      <AgreementStack.Screen name="Agreement" component={Agreement} />
    </AgreementStack.Navigator>
  );
}
const UserTypeStack = createStackNavigator();
function UserTypeStackScreen() {
  return (
    <UserTypeStack.Navigator>
      <UserTypeStack.Screen name="UserType" component={UserType} />
    </UserTypeStack.Navigator>
  );
}
const UsernameStack = createStackNavigator();
function UsernameStackScreen() {
  return (
    <UsernameStack.Navigator>
      <UsernameStack.Screen name="Username" component={Username} />
    </UsernameStack.Navigator>
  );
}
const EmailStack = createStackNavigator();
function EmailStackScreen() {
  return (
    <EmailStack.Navigator>
      <EmailStack.Screen name="Email" component={Email} />
    </EmailStack.Navigator>
  );
}
const PasswordStack = createStackNavigator();
function PasswordStackScreen() {
  return (
    <PasswordStack.Navigator>
      <PasswordStack.Screen name="Password" component={Password} />
    </PasswordStack.Navigator>
  );
}

const MobileAuthStack = createStackNavigator();
function MobileAuthStackScreen() {
  return (
    <MobileAuthStack.Navigator>
      <MobileAuthStack.Screen name="MobileAuth" component={MobileAuth} />
    </MobileAuthStack.Navigator>
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
      <Stack.Screen name="AgreementModal" component={AgreementStackScreen} />
      <Stack.Screen name="UserTypeModal" component={UserTypeStackScreen} />
      <Stack.Screen name="UsernameModal" component={UsernameStackScreen} />
      <Stack.Screen name="EmailModal" component={EmailStackScreen} />
      <Stack.Screen name="PasswordModal" component={PasswordStackScreen} />
      <Stack.Screen name="MobileAuthModal" component={MobileAuthStackScreen} />
    </Stack.Navigator>
  );
}
