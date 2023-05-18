/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Text, View, Image, Pressable} from 'react-native';
import {useSelector} from 'react-redux';
import {SwipeListView} from 'react-native-swipe-list-view';
import Octicons from 'react-native-vector-icons/Octicons';

import {
  getPendingTransaction,
  manageTransaction,
} from '../../../utils/https/transaction';

import Loader from '../../../components/Loader';

import global from '../../../styles/global';
import styles from './style';

export default function ManageOrder() {
  const token = useSelector(state => state.auth.data?.token);

  const [dataTransaction, setDataTransaction] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getPendingTransaction(token)
      .then(res => {
        setDataTransaction(res.data.data);
        setIsLoading(false);
      })
      .catch(err => {
        if (err?.response?.status === 404) {
          setDataTransaction([]);
          setIsLoading(false);
        }
      });
  }, [token]);

  const onButtonPress = historyId => {
    manageTransaction(token, historyId)
      .then(() => {
        setIsLoading(true);
        getPendingTransaction(token).then(res => {
          setDataTransaction(res.data.data);
          setIsLoading(false);
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  const renderItem = ({item}) => (
    <View style={styles.card}>
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

  const renderHiddenItem = ({item}) => (
    <View style={[styles.card, {justifyContent: 'flex-end', paddingRight: 25}]}>
      {/* <Text style={{color: 'red'}}>Done</Text> */}
      <Pressable
        onPress={() => onButtonPress(item.history_id)}
        style={{
          backgroundColor: '#6A4029',
          borderRadius: 100,
          height: 50,
          width: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Octicons name="check" size={30} color={'white'} />
      </Pressable>
    </View>
  );

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
      {isLoading && <Loader />}

      {/* no transaction start */}
      {dataTransaction.length < 1 && (
        <>
          <Image
            source={require('../../../images/nohistory.png')}
            style={{marginTop: 40, marginRight: 20}}
          />
          <Text
            style={{
              marginTop: 25,
              textAlign: 'center',
              fontSize: 28,
              // fontWeight: '900',
              fontFamily: 'Poppins-Black',
            }}>
            No transactions yet
          </Text>
        </>
      )}
      {/* no transaction end */}

      {dataTransaction.length > 0 && (
        <View style={{flexDirection: 'row', columnGap: 10, marginVertical: 20}}>
          <Image source={require('../../../images/swipe-icon.png')} />
          <Text>swipe on an item when it’s done</Text>
        </View>
      )}

      <SwipeListView
        showsVerticalScrollIndicator={false}
        data={dataTransaction}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-75}
        swipeToOpenPercent={120}
      />
    </View>
  );
}
