/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Text, View, Image, Pressable, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

import {getHistory} from '../../utils/https/transaction';

import global from '../../styles/global';
import styles from './style';

export default function History() {
  const navigation = useNavigation();

  const token = useSelector(state => state.auth.data?.token);

  const [dataHistory, setDataHistory] = useState([]);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    // getUserData();
    getHistory(token)
      .then(res => {
        setDataHistory(res.data.data);
        setTimeout(() => {
          setRefetch(!refetch);
        }, 2500);
      })
      .catch(err => {
        console.log(err);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetch]);

  return (
    <View
      style={[
        global.px_container,
        {
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#F2F2F2',
          flex: 1,
          // marginTop: 40,
        },
      ]}>
      {/* No history background */}
      {dataHistory.length < 1 ? (
        <>
          <Image
            source={require('../../images/nohistory.png')}
            style={{marginTop: 20, marginRight: 20}}
          />
          <Text
            style={{
              marginTop: 25,
              textAlign: 'center',
              fontSize: 28,
              // fontWeight: '900',
              fontFamily: 'Poppins-Black',
            }}>
            No history yet
          </Text>
          <Text
            style={{
              marginTop: 10,
              textAlign: 'center',
              fontSize: 17,
              // fontWeight: '400',
              fontFamily: 'Poppins-Regular',
              opacity: 0.57,
            }}>
            Hit the brown button down {'\n'}below to create an order
          </Text>
          <Pressable style={{marginTop: 220, width: '100%'}}>
            <Text
              style={[global.btn_primary, styles.startOrdering]}
              onPress={() => {
                navigation.navigate('Products');
              }}>
              Start Ordering
            </Text>
          </Pressable>
        </>
      ) : (
        <></>
      )}
      {/* end */}

      <FlatList
        showsVerticalScrollIndicator={false}
        style={{paddingBottom: 50, marginBottom: 10}}
        data={dataHistory}
        renderItem={({item, index}) => {
          return (
            <View key={index} style={styles.card}>
              <View style={{flex: 1}}>
                <Image
                  source={{
                    uri: item.img,
                  }}
                  style={styles.hero}
                />
              </View>
              <View style={{flex: 1}}>
                <Text style={styles.title}>{`${item.name}`}</Text>
                <Text style={styles.price}>{`IDR ${item.price.toLocaleString(
                  'id-ID',
                )}`}</Text>
                <Text style={styles.status}>{item.time}</Text>
              </View>
            </View>
          );
        }}
      />

      {/* Scroll down if data length > 4 */}
      {/* {dataHistory.length > 5 ? (
        <View style={{marginTop: 15}}>
          <Text style={{fontSize: 14, fontFamily: 'Poppins-Regular'}}>
            Swipe Up
          </Text>
          <Icon name="gesture-swipe-up" size={30} color="#895537" />
        </View>
      ) : (
        <></>
      )} */}

      {/* <Pressable style={{marginTop: 15, marginBottom: 25}}>
        <Text
          style={[global.btn_primary, styles.backToHome]}
          onPress={() => {
            navigation.navigate('Home');
          }}>
          Back
        </Text>
      </Pressable> */}
    </View>
  );
}
