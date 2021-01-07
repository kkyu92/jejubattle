import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import {Text} from '../react-native-nuno-ui';
import Battle from '../screens/Battle';
import Facility from '../screens/Facility';
import Icons from '../commons/Icons';
import {custom} from '../config';
import FacilityList from '../screens/Facility/List';
import BattleEdit from '../screens/Battle/Edit';
import BattleView from '../screens/Battle/View';
import FacilityView from '../screens/Facility/View';
import TravelView from '../screens/Travel/View';
import EventView from '../screens/Event/View';
import Ad from '../screens/Ad';
import MyBattle from '../screens/MyBattle';
import RandomBox from '../screens/Battle/RandomBox';
import WishList from '../screens/WishList';
import Search from '../screens/Search';
import CoinCharge from '../screens/CoinCharge';
import PurchaseHistory from '../screens/PurchaseHistory';

const Tab = createBottomTabNavigator();
function TabStackScreen() {
  return (
    <Tab.Navigator
      headerMode="none"
      initialRouteName="Home"
      tabBarOptions={{
        style: {
          elevation: 0,
          borderTopColor: 'lightgray',
        },
      }}>
      <Tab.Screen
        name="Battle"
        component={Battle}
        options={{
          tabBarLabel: ({focused}) => (
            <Text
              text={'스포츠배틀'}
              fontSize={11}
              color={focused ? custom.themeColor : 'darkgray'}
            />
          ),
          tabBarIcon: ({focused}) => (
            <Icons
              name={'icon-sportsbattle-16'}
              color={focused ? custom.themeColor : 'darkgray'}
              size={16}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: ({focused}) => (
            <Text
              text={'메인'}
              fontSize={11}
              color={focused ? custom.themeColor : 'darkgray'}
            />
          ),
          tabBarIcon: ({focused}) => (
            <Icons
              name={'icon-home-16'}
              color={focused ? custom.themeColor : 'darkgray'}
              size={16}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Facility"
        component={Facility}
        options={{
          tabBarLabel: ({focused}) => (
            <Text
              text={'운동시설'}
              fontSize={11}
              color={focused ? 'orange' : 'darkgray'}
            />
          ),
          tabBarIcon: ({focused}) => (
            <Icons
              name={'icon-facility-16'}
              color={focused ? custom.themeColor : 'darkgray'}
              size={16}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const BottomTabStack = createStackNavigator();
export default function BottomTabStackScreen() {
  return (
    <BottomTabStack.Navigator
      headerMode={'none'}
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <BottomTabStack.Screen name="TabStack" component={TabStackScreen} />

      {/* Cards */}
      <BottomTabStack.Screen name="Search" component={Search} />
      <BottomTabStack.Screen name="FacilityList" component={FacilityList} />
      <BottomTabStack.Screen name="FacilityView" component={FacilityView} />
      <BottomTabStack.Screen name="TravelView" component={TravelView} />
      <BottomTabStack.Screen name="EventView" component={EventView} />
      <BottomTabStack.Screen name="Ad" component={Ad} />
      <BottomTabStack.Screen name="MyBattle" component={MyBattle} />
      <BottomTabStack.Screen name="BattleEdit" component={BattleEdit} />
      <BottomTabStack.Screen name="BattleView" component={BattleView} />
      <BottomTabStack.Screen name="RandomBox" component={RandomBox} />
      <BottomTabStack.Screen name="WishList" component={WishList} />
      <BottomTabStack.Screen name="CoinCharge" component={CoinCharge} />
      <BottomTabStack.Screen
        name="PurchaseHistory"
        component={PurchaseHistory}
      />
    </BottomTabStack.Navigator>
  );
}
