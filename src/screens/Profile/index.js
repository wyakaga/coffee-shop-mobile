/* eslint-disable react-native/no-inline-styles */
import {React, useEffect, useState} from 'react';
// import {API_IMG} from '@env';
import {
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
  // FlatList,
  // TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

import {getUserById} from '../../utils/https/auth';

import Loader from '../../components/Loader';

import global from '../../styles/global';
import styles from './style';

export default function Profile() {
  const navigation = useNavigation();

  const id = useSelector(state => state.auth.data?.data?.id);

  const token = useSelector(state => state.auth.data?.token);

  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getUserById(id, token)
      .then(res => {
        setUserData(res.data.data[0]);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  }, [id, token]);

  const isImg = () => {
    if (userData && userData.img) {
      return (
        <Image
          source={{
            uri: userData.img,
          }}
          style={styles.hero}
        />
      );
    }
    return (
      <Image
        source={require('../../images/profile-placeholder.webp')}
        style={styles.hero}
      />
    );
  };

  return (
    <ScrollView
      style={[
        global.px_container,
        {
          display: 'flex',
          // alignItems: 'flex-start',
          backgroundColor: '#F2F2F2',
          flex: 1,
        },
      ]}
      contentContainerStyle={{
        alignItems: 'flex-start',
      }}
      showsVerticalScrollIndicator={false}>
      {isLoading && <Loader isLoading={isLoading} />}

      <Text style={[styles.header, {marginBottom: 27}]}>My profile</Text>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          marginBottom: 10,
        }}>
        <Text style={{fontSize: 18, fontWeight: '700', color: '#000000'}}>
          Your Information
        </Text>
        <Text
          style={{fontSize: 15, color: '#6A4029'}}
          onPress={() => {
            navigation.navigate('EditProfile');
          }}>
          edit
        </Text>
      </View>

      {/* Bio start */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          columnGap: 10,
          backgroundColor: 'white',
          width: '100%',
          paddingVertical: 20,
          paddingLeft: 20,
          borderRadius: 20,
        }}>
        <View
          style={{
            // flexDirection: 'row',
            // justifyContent: 'center',
            width: 80,
            height: 80,
            // marginTop: 20,
            // marginBottom: 20,
            // position: 'relative',
          }}>
          {isImg()}
          {/* <Pressable
          onPress={() => {
            navigation.navigate('EditProfile');
          }}>
          <Image
            source={require('../../images/edit.png')}
            style={styles.edit}
          />
        </Pressable> */}
        </View>
        <View
          style={{
            flexDirection: 'column',
            // alignItems: 'center',
            // width: '100%',
            // marginBottom: 20,
          }}>
          <Text style={{fontSize: 18, fontWeight: '800', color: '#000000'}}>
            {userData.display_name}
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: '400',
              opacity: 0.65,
              color: '#6A4029',
            }}>
            {userData.email}
          </Text>
          <View style={styles.lineBottom} />
          <Text
            style={{
              fontSize: 15,
              fontWeight: '400',
              opacity: 0.65,
              color: '#6A4029',
            }}>
            {userData.phone_number}
          </Text>
          <View style={styles.lineBottom} />
          <Text
            style={{
              fontSize: 15,
              fontWeight: '400',
              opacity: 0.65,
              width: '78%',
              flexWrap: 'wrap',
              color: '#6A4029',
            }}>
            {userData.address}
          </Text>
        </View>
      </View>

      {/* Bio end */}

      <Pressable
        style={styles.card}
        onPress={() => {
          navigation.navigate('History');
        }}>
        <Text
          style={{
            fontWeight: '700',
            fontSize: 18,
            paddingRight: 80,
            color: '#000000',
          }}>
          Order History
        </Text>
        <Image source={require('../../images/rightArrow.png')} />
      </Pressable>
      <Pressable
        style={styles.card}
        onPress={() => navigation.navigate('EditPwd')}>
        <Text
          style={{
            fontWeight: '700',
            fontSize: 18,
            paddingRight: 75,
            color: '#000000',
          }}>
          Edit Password
        </Text>
        <Image source={require('../../images/rightArrow.png')} />
      </Pressable>
      <View style={styles.card}>
        <Text
          style={{
            fontWeight: '700',
            fontSize: 18,
            paddingRight: 155,
            color: '#000000',
          }}>
          FAQ
        </Text>
        <Image source={require('../../images/rightArrow.png')} />
      </View>
      <View style={[styles.card, {marginBottom: 30}]}>
        <Text
          style={{
            fontWeight: '700',
            fontSize: 18,
            paddingRight: 155,
            color: '#000000',
          }}>
          Help
        </Text>
        <Image source={require('../../images/rightArrow.png')} />
      </View>

      <Pressable>
        <Text style={[global.btn_primary, styles.saveChange]}>Save Change</Text>
      </Pressable>
    </ScrollView>
  );
}
