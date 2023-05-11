import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import Home from '../screens/home';
import Profile from '../screens/Profile';
import DrawerNavigator from './DrawerNavigator';
import Chat from '../screens/Communication/Chat';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator({isLoggin, setIsLoggin}) {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeTab"
        component={DrawerNavigator}
        options={{
          headerShown: false,
          tabBarLabel: '',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          ),
          tabBarActiveTintColor: 'brown',
          tabBarIconStyle: {marginTop: 20},
          tabBarItemStyle: {paddingLeft: 5},
          tabBarStyle: {height: 55},
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarLabel: '',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color, size}) => (
            <Icon name="account" color={color} size={size} />
          ),
          tabBarActiveTintColor: 'brown',
          tabBarIconStyle: {marginTop: 20, marginLeft: 80},
          tabBarStyle: {height: 55},
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          headerShown: false,
          tabBarLabel: '',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color, size}) => (
            <Icon name="chat-processing" color={color} size={size} />
          ),
          tabBarActiveTintColor: 'brown',
          tabBarIconStyle: {marginTop: 20},
          // tabBarHideOnKeyboard: true,
          tabBarItemStyle: {paddingRight: 5},
          tabBarStyle: {height: 55},
        }}
      />
    </Tab.Navigator>
  );
}
