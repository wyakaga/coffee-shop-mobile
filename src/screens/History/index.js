/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Text, View, Image, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {SwipeListView} from 'react-native-swipe-list-view';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';

import {getHistory, deleteHistory} from '../../utils/https/transaction';

import Loader from '../../components/Loader';

import global from '../../styles/global';
import styles from './style';

export default function History() {
  const navigation = useNavigation();

  const token = useSelector(state => state.auth.data?.token);

  const [dataHistory, setDataHistory] = useState([]);
  const [historyDataId, setHistoryDataId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getHistory(token)
      .then(res => {
        setDataHistory(res.data.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  }, [token]);

  const onButtonPress = historyId => {
    deleteHistory(token, historyId)
      .then(() => {
        setIsLoading(true);
        getHistory(token).then(res => {
          setDataHistory(res.data.data);
          setIsLoading(false);
        });
        setModalVisible(!isModalVisible);
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
        onPress={() => {
          setHistoryDataId(item.history_id);
          setModalVisible(true);
        }}
        style={{
          backgroundColor: '#6A4029',
          borderRadius: 100,
          height: 50,
          width: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Octicons name="trash" size={30} color={'white'} />
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

      <SwipeListView
        showsVerticalScrollIndicator={false}
        data={dataHistory}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-75}
        swipeToOpenPercent={120}
      />

      {/* Modal start */}
      <Modal
        isVisible={isModalVisible}
        animationIn={'zoomIn'}
        animationOut={'zoomOut'}>
        <View
          style={{
            // flex: 1,
            backgroundColor: '#fff',
            paddingVertical: 20,
            width: '95%',
            borderRadius: 15,
            marginLeft: 10,
          }}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 28,
                fontFamily: 'Poppins-SemiBold',
                paddingBottom: 10,
              }}>
              Delete history item
            </Text>
            <Icon
              name="alert-circle"
              color={'#DC143C'}
              size={100}
              style={styles.cart}
            />
            <Text style={{fontSize: 16.5, fontFamily: 'Poppins-Regular'}}>
              Are you sure?
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: 20,
            }}>
            <Pressable
              style={{
                backgroundColor: '#04AA6D',
                paddingHorizontal: 40,
                paddingVertical: 15,
                borderRadius: 20,
                marginRight: 10,
                elevation: 3,
              }}
              onPress={() => setModalVisible(!isModalVisible)}>
              <Text style={{color: 'white', fontFamily: 'Poppins-Regular'}}>
                NO
              </Text>
            </Pressable>
            <Pressable
              style={{
                backgroundColor: '#DC143C',
                paddingHorizontal: 40,
                paddingVertical: 15,
                borderRadius: 20,
                marginLeft: 10,
                elevation: 3,
              }}
              onPress={() => onButtonPress(historyDataId)}>
              <Text style={{color: 'white', fontFamily: 'Poppins-Regular'}}>
                YES
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      {/* Modal end */}

      {/* <FlatList
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
      /> */}

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
