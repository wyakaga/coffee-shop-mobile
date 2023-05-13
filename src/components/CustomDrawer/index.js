/* eslint-disable react-native/no-inline-styles */
import {React, useEffect, useState} from 'react';
import {Image, Text, View, Pressable, ToastAndroid} from 'react-native';
import {
  DrawerContentScrollView,
  // DrawerItemList,
} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';

import {getUserById, logout} from '../../utils/https/auth';
import {authAction} from '../../redux/slices/auth';
// import {API_IMG} from '@env';

import styles from './style';

export default function CustomDrawer() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const idUser = useSelector(state => state.auth.data?.data?.id);
  const token = useSelector(state => state.auth.data.token);

  // console.log(idUser);

  const [userData, setUserData] = useState([]);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetch]);

  const getUserData = () => {
    getUserById(idUser, token)
      .then(res => {
        setUserData(res.data.data);
        setTimeout(() => {
          setRefetch(!refetch);
        }, 2000);
      })
      .catch(err => {
        console.log(err);
      });

    // try {
    //   // const jsonValue = await AsyncStorage.getItem('@userData');
    //   // if (jsonValue != null) {
    //   //   // const idUser = JSON.parse(jsonValue).data.id;
    //   //   // const token = JSON.parse(jsonValue).token;
    //   // }
    // } catch (e) {
    //   console.log(e);
    // }
  };

  const isImg = () => {
    if (userData.length && userData[0].img !== null) {
      return <Image source={{uri: userData[0].img}} style={styles.hero} />;
    } else {
      return (
        <Image
          source={require('../../images/profile-placeholder.webp')}
          style={styles.hero}
        />
      );
    }
  };

  const handleLogout = () => {
    logout(token)
      .then(res => {
        dispatch(authAction.delete());
        ToastAndroid.show('Logged out!', ToastAndroid.SHORT);
        setTimeout(() => {
          navigation.navigate('Auth', {screen: 'Welcome'});
        }, 500);
      })
      .catch(err => {
        console.log(err);
      });

    // try {
    //   await AsyncStorage.removeItem('@userData');
    //   setTimeout(() => {
    //     navigation.navigate('Auth', {screen: 'Welcome'});
    //   }, 500);
    // } catch (e) {
    //   console.log(e);
    // }
  };
  return (
    <DrawerContentScrollView
      showsVerticalScrollIndicator={false}
      style={styles.container}>
      {/* Bio start */}
      <View style={styles.containerHero}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            width: '100%',
            marginTop: 55,
            marginBottom: 20,
            position: 'relative',
          }}>
          {isImg()}
          {/* <Image source={require('../../images/ava.png')} style={styles.hero} /> */}
        </View>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            marginTop: -10,
          }}>
          <Text style={styles.name}>{`${
            userData.length && userData[0].first_name !== null
              ? userData[0].first_name
              : 'Anonymous'
          } ${
            userData.length && userData[0].last_name !== null
              ? userData[0].last_name
              : 'Anonymous'
          }`}</Text>
          <Text style={styles.email}>
            {userData.length && userData[0].email}
          </Text>
          <Text style={styles.phone}>
            {userData.length && userData[0].phone_number}
          </Text>
        </View>
      </View>
      {/* Bio end */}

      {/* Navigation start */}
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'flex-start',
          marginTop: 30,
        }}>
        <Pressable
          style={{flexDirection: 'row', paddingLeft: 30}}
          onPress={() => navigation.navigate('EditProfile')}>
          <Image source={require('../../images/editProfile.png')} />
          <Text style={styles.itemList}>Edit Profile</Text>
        </Pressable>
        <View style={styles.lineBottom} />

        <Pressable
          style={{flexDirection: 'row', paddingLeft: 30}}
          onPress={() => navigation.navigate('Products')}>
          <Image source={require('../../images/allMenu.png')} />
          <Text style={styles.itemList}>All Menu</Text>
        </Pressable>
        <View style={styles.lineBottom} />

        <Pressable
          style={{flexDirection: 'row', paddingLeft: 30}}
          onPress={() => navigation.navigate('Home')}>
          <Image source={require('../../images/privacy_policy.png')} />
          <Text style={styles.itemList}>Privacy policy</Text>
        </Pressable>
        <View style={styles.lineBottom} />

        <Pressable
          style={{flexDirection: 'row', paddingLeft: 30}}
          onPress={() => navigation.navigate('Home')}>
          <Image source={require('../../images/security.png')} />
          <Text style={styles.itemList}>Security</Text>
        </Pressable>
        <View style={styles.lineBottom} />

        <Pressable
          style={{
            flexDirection: 'row',
            paddingLeft: 20,
            paddingTop: 120,
            paddingBottom: 30,
          }}
          onPress={handleLogout}>
          <Text style={styles.itemList}>Sign Out</Text>
          <Image
            source={require('../../images/brown_right_arrow.png')}
            style={{marginTop: 5, marginLeft: 8}}
          />
        </Pressable>
      </View>
      {/* Navigation end */}
    </DrawerContentScrollView>
  );
}
