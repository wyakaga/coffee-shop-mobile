import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

import Welcome from './Welcome';
import GetStarted from './GetStarted';
import Login from './Login';
import Signup from './SignUp';
import ForgotPassword from './ForgotPassword';

const Stack = createStackNavigator();

export default function Auth() {
  const navigation = useNavigation();

  const userData = useSelector(state => state.auth.data);

  const getUserData = () => {
    if (userData.length < 1) {
      navigation.navigate('Auth', {screen: 'Welcome'});
      return;
    }

    navigation.replace('Home');
  };
  useEffect(() => {
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack.Navigator id="Auth">
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GetStarted"
        component={GetStarted}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
