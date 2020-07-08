import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import BottomTabStackScreen from './BottomTabStack';
import {screenWidth} from '../styles';
import Drawer from '../screens/Drawer';
import Notification from '../screens/Notification';
import Search from '../screens/Search';
import MyInfo from '../screens/MyInfo';
import CoinCharge from '../screens/CoinCharge';
import PurchaseHistory from '../screens/PurchaseHistory';
import EditProfile from '../screens/EditProfile';
import WishList from '../screens/WishList';
import Archive from '../screens/Archive';
import Event from '../screens/Event';
import Notice from '../screens/Notice';
import CustomerCenter from '../screens/CustomerCenter';
import Setting from '../screens/Setting';
import EventView from '../screens/Event/View';
import TourInfo from '../screens/TourInfo';
import TourCourse from '../screens/TourInfo/TourCourse';
import TourCourseView from '../screens/TourInfo/TourCourseView';
import FoodStore from '../screens/FoodStore';
import FullMap from '../screens/FullMap';
import MyBattle from '../screens/MyBattle';

const LeftDrawerStack = createDrawerNavigator();
function LeftDrawerStackScreen() {
  return (
    <LeftDrawerStack.Navigator
      drawerPosition="left"
      drawerType="front"
      drawerStyle={{backgroundColor: 'white', width: screenWidth - 50}}
      drawerContent={(props) => <Drawer {...props} />}>
      <LeftDrawerStack.Screen
        name="BottomTabStack"
        component={BottomTabStackScreen}
      />
    </LeftDrawerStack.Navigator>
  );
}

const MyBattleStack = createStackNavigator();
function MyBattleStackScreen() {
  return (
    <MyBattleStack.Navigator
      headerMode="none"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
      }}>
      <MyBattleStack.Screen name="MyBattle" component={MyBattle} />
    </MyBattleStack.Navigator>
  );
}
const MyInfoStack = createStackNavigator();
function MyInfoStackScreen() {
  return (
    <MyInfoStack.Navigator
      headerMode="none"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
      }}>
      <MyInfoStack.Screen name="MyInfo" component={MyInfo} />
      <MyInfoStack.Screen name="CoinCharge" component={CoinCharge} />
      <MyInfoStack.Screen name="PurchaseHistory" component={PurchaseHistory} />
      <MyInfoStack.Screen name="EditProfile" component={EditProfile} />
    </MyInfoStack.Navigator>
  );
}
const TourInfoStack = createStackNavigator();
function TourInfoStackScreen() {
  return (
    <TourInfoStack.Navigator
      headerMode="none"
      screenOptions={{
        // cardOverlayEnabled: true,
        cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
      }}>
      <TourInfoStack.Screen name="TourInfo" component={TourInfo} />
      <TourInfoStack.Screen name="TourCourse" component={TourCourse} />
      <TourInfoStack.Screen name="TourCourseView" component={TourCourseView} />
      <TourInfoStack.Screen name="FoodStore" component={FoodStore} />
    </TourInfoStack.Navigator>
  );
}
const EventStack = createStackNavigator();
function EventStackScreen() {
  return (
    <EventStack.Navigator
      headerMode="none"
      screenOptions={{
        // cardOverlayEnabled: true,
        cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
      }}>
      <EventStack.Screen name="Event" component={Event} />
      <EventStack.Screen name="EventView" component={EventView} />
    </EventStack.Navigator>
  );
}

const Stack = createStackNavigator();
export default function AppStackScreen() {
  return (
    <Stack.Navigator
      headerMode="none"
      mode="modal"
      screenOptions={{
        // cardOverlayEnabled: true,
        cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
      }}>
      <Stack.Screen name="LeftDrawerStack" component={LeftDrawerStackScreen} />

      {/* Modal Stacks */}
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="MyBattleStack" component={MyBattleStackScreen} />
      <Stack.Screen name="MyInfoStack" component={MyInfoStackScreen} />
      <Stack.Screen name="TourInfoStack" component={TourInfoStackScreen} />
      <Stack.Screen name="WishList" component={WishList} />
      <Stack.Screen name="Archive" component={Archive} />
      <Stack.Screen name="EventStack" component={EventStackScreen} />
      <Stack.Screen name="Notice" component={Notice} />
      <Stack.Screen name="CustomerCenter" component={CustomerCenter} />
      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen name="FullMap" component={FullMap} />
    </Stack.Navigator>
  );
}
