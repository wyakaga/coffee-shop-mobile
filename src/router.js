/* eslint-disable react-native/no-inline-styles */
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
import CreateProduct from './screens/Admin/CreateProduct';
import EditProduct from './screens/Admin/EditProduct';
import ManageOrder from './screens/Admin/ManageOrder';
import ReportDashboard from './screens/Admin/ReportDashboard';

// import ProductDetailHeader from './components/ProductDetailHeader';
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
                    textStyle={{
                      marginTop: 45,
                      fontSize: 17,
                      fontFamily: 'Poppins-Black',
                      color: '#000000',
                      textAlign: 'center',
                    }}
                    bgColor="#f2f2f2"
                  />
                ),
              })}
            />
            <Stack.Screen
              name="ProductDetail"
              component={ProductDetails}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="EditProfile"
              component={EditProfile}
              // options={{title: 'Edit Profile'}}
              options={({navigation, route}) => ({
                // eslint-disable-next-line react/no-unstable-nested-components
                header: props => (
                  <CustomHeader
                    {...props}
                    navigation={navigation}
                    isText={false}
                    bgColor="white"
                  />
                ),
              })}
            />
            <Stack.Screen
              name="EditUserImage"
              component={EditUserImage}
              // options={{title: 'Edit Image'}}
              options={({navigation, route}) => ({
                // eslint-disable-next-line react/no-unstable-nested-components
                header: props => (
                  <CustomHeader
                    {...props}
                    navigation={navigation}
                    isText={false}
                    bgColor="white"
                  />
                ),
              })}
            />
            <Stack.Screen
              name="EditPwd"
              component={EditPwd}
              // options={{title: 'Edit Password'}}
              options={({navigation, route}) => ({
                // eslint-disable-next-line react/no-unstable-nested-components
                header: props => (
                  <CustomHeader
                    {...props}
                    navigation={navigation}
                    isText={false}
                    bgColor="white"
                  />
                ),
              })}
            />
            <Stack.Screen
              name="Cart"
              component={Cart}
              // options={{title: 'Cart'}}
              options={({navigation, route}) => ({
                // eslint-disable-next-line react/no-unstable-nested-components
                header: props => (
                  <CustomHeader
                    {...props}
                    navigation={navigation}
                    isText={true}
                    text="Cart"
                    textStyle={{
                      marginTop: 45,
                      marginLeft: 100,
                      fontSize: 17,
                      fontFamily: 'Poppins-Black',
                      color: '#000000',
                      textAlign: 'center',
                    }}
                    bgColor="#f2f2f2"
                  />
                ),
              })}
            />
            <Stack.Screen
              name="DeliveryMethod"
              component={DeliveryMethod}
              // options={{title: 'Checkout'}}
              options={({navigation, route}) => ({
                // eslint-disable-next-line react/no-unstable-nested-components
                header: props => (
                  <CustomHeader
                    {...props}
                    navigation={navigation}
                    isText={true}
                    text="Checkout"
                    textStyle={{
                      marginTop: 45,
                      marginLeft: 70,
                      fontSize: 17,
                      fontFamily: 'Poppins-Black',
                      color: '#000000',
                      textAlign: 'center',
                    }}
                    bgColor="#f2f2f2"
                  />
                ),
              })}
            />
            <Stack.Screen
              name="Payment"
              component={Payment}
              // options={{headerTitle: ''}}
              options={({navigation, route}) => ({
                // eslint-disable-next-line react/no-unstable-nested-components
                header: props => (
                  <CustomHeader
                    {...props}
                    navigation={navigation}
                    isText={true}
                    text="Payment"
                    textStyle={{
                      marginTop: 45,
                      marginLeft: 70,
                      fontSize: 17,
                      fontFamily: 'Poppins-Black',
                      color: '#000000',
                      textAlign: 'center',
                    }}
                    bgColor="#f2f2f2"
                  />
                ),
              })}
            />
            <Stack.Screen
              name="History"
              component={History}
              // options={{headerTitle: '', headerShown: false}}
              options={({navigation, route}) => ({
                // eslint-disable-next-line react/no-unstable-nested-components
                header: props => (
                  <CustomHeader
                    {...props}
                    navigation={navigation}
                    isText={false}
                    bgColor="#f2f2f2"
                  />
                ),
              })}
            />
            <Stack.Screen
              name="ChatRoom"
              component={ChatRoom}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="CreateProduct"
              component={CreateProduct}
              options={({navigation, route}) => ({
                // eslint-disable-next-line react/no-unstable-nested-components
                header: props => (
                  <CustomHeader
                    {...props}
                    navigation={navigation}
                    isText={true}
                    text="New Product"
                    textStyle={{
                      marginTop: 45,
                      marginLeft: 60,
                      fontSize: 17,
                      fontFamily: 'Poppins-Bold',
                      color: '#000000',
                      textAlign: 'center',
                    }}
                    bgColor="white"
                  />
                ),
              })}
            />
            <Stack.Screen
              name="EditProduct"
              component={EditProduct}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ManageOrder"
              component={ManageOrder}
              options={({navigation, route}) => ({
                // eslint-disable-next-line react/no-unstable-nested-components
                header: props => (
                  <CustomHeader
                    {...props}
                    navigation={navigation}
                    isText={true}
                    text="Customer Order"
                    textStyle={{
                      marginTop: 45,
                      marginLeft: 60,
                      fontSize: 17,
                      fontFamily: 'Poppins-Bold',
                      color: '#000000',
                      textAlign: 'center',
                    }}
                    bgColor="white"
                  />
                ),
              })}
            />
            <Stack.Screen
              name="SalesChart"
              component={ReportDashboard}
              options={({navigation, route}) => ({
                // eslint-disable-next-line react/no-unstable-nested-components
                header: props => (
                  <CustomHeader
                    {...props}
                    navigation={navigation}
                    isText={true}
                    text="Sales Chart"
                    textStyle={{
                      marginTop: 45,
                      marginLeft: 60,
                      fontSize: 17,
                      fontFamily: 'Poppins-Bold',
                      color: '#000000',
                      textAlign: 'center',
                    }}
                    bgColor="white"
                  />
                ),
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default Router;
