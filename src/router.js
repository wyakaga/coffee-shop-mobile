import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import SplashScreen from 'react-native-splash-screen';

import store, {persistor} from './redux/store';

import Auth from './screens/Auth';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import Products from './screens/Products';
import ProductDetails from './screens/ProductDetail';
import EditProfile from './screens/EditProfile';
import EditUserImage from './screens/EditUserImage';
import EditPwd from './screens/EditPwd';
import Cart from './screens/Cart';
import DeliveryMethod from './screens/Checkout';
import Payment from './screens/Payment';
import History from './screens/History';
import ChatRoom from './screens/Communication/Chatroom';

import ProductDetailHeader from './components/ProductDetailHeader';
import CustomHeader from './components/CustomHeader';

const Stack = createStackNavigator();

function Router() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Auth"
              component={Auth}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Home"
              component={BottomTabNavigator}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Products"
              component={Products}
              // options={{
              //   title: 'Products',
              //   headerStyle: {
              //     backgroundColor: '#f2f2f2',
              //   },
              // }}
              options={({navigation, route}) => ({
                // eslint-disable-next-line react/no-unstable-nested-components
                header: props => (
                  <CustomHeader
                    {...props}
                    navigation={navigation}
                    isText={true}
                    text="Favorite Products"
                    bgColor="#f2f2f2"
                  />
                ),
              })}
            />
            <Stack.Screen
              name="ProductDetail"
              component={ProductDetails}
              options={({navigation, route}) => ({
                // eslint-disable-next-line react/no-unstable-nested-components
                header: props => (
                  <ProductDetailHeader {...props} navigation={navigation} />
                ),
              })}
            />
            <Stack.Screen
              name="EditProfile"
              component={EditProfile}
              options={{title: 'Edit Profile'}}
            />
            <Stack.Screen
              name="EditUserImage"
              component={EditUserImage}
              options={{title: 'Edit Image'}}
            />
            <Stack.Screen
              name="EditPwd"
              component={EditPwd}
              options={{title: 'Edit Password'}}
            />
            <Stack.Screen
              name="Cart"
              component={Cart}
              options={{title: 'Cart'}}
            />
            <Stack.Screen
              name="DeliveryMethod"
              component={DeliveryMethod}
              options={{title: 'Checkout'}}
            />
            <Stack.Screen
              name="Payment"
              component={Payment}
              options={{headerTitle: ''}}
            />
            <Stack.Screen
              name="History"
              component={History}
              options={{headerTitle: '', headerShown: false}}
            />
            <Stack.Screen
              name="ChatRoom"
              component={ChatRoom}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default Router;
