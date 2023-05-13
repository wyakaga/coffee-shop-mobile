/* eslint-disable react-native/no-inline-styles */
import {
  Text,
  View,
  // ScrollView,
  Image,
  Pressable,
  FlatList,
  // TextInput,
  // Button,
  // ToastAndroid,
} from 'react-native';
import Modal from 'react-native-modal';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector, useDispatch} from 'react-redux';

import {createTransaction} from '../../utils/https/transaction';
import {cartAction} from '../../redux/slices/cart';

import global from '../../styles/global';
import styles from './style';

export default function Payment({route}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {totalPriceState} = route.params;

  // REDUX
  const cartRedux = useSelector(state => state.cart);
  const cart = cartRedux.cart;

  const token = useSelector(state => state.auth.data.token);

  // Summary start
  const subtotal = totalPriceState;
  const tax = totalPriceState * 0.1;
  const total = subtotal + tax;
  // Summary end

  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handlePayment = () => {
    const dataShopping = cartRedux.cart.map(item => {
      const {price, quantity, id} = item;
      return {
        product_id: id,
        size_id: 1,
        qty: quantity,
        subtotal: price * quantity,
      };
    });

    const body = {
      status_id: 1,
      promo_id: 1,
      payment_id: 1,
      delivery_id: cartRedux.delivery,
      products: dataShopping,
    };

    createTransaction(token, body)
      .then(res => {
        console.log(res.data);
        dispatch(cartAction.resetCart());
        navigation.navigate('Home');
      })
      .then(err => {
        console.log(err);
      });
  };

  return (
    <View
      style={[
        global.px_container,
        {
          display: 'flex',
          alignItems: 'flex-start',
          backgroundColor: '#F2F2F2',
          flex: 1,
        },
      ]}>
      <Text style={styles.title}>Payment Methods</Text>
      <Image source={require('../../images/card.png')} style={styles.hero} />

      {/* Detail list start */}
      <FlatList
        style={{marginVertical: 12}}
        showsVerticalScrollIndicator={false}
        data={cart}
        renderItem={({item, index}) => {
          const priceTimesQuantity = (
            item.price * item.quantity
          ).toLocaleString('id-ID');
          return (
            <View key={index}>
              <View style={styles.lineBottom} />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                  justifyContent: 'space-around',
                  width: '100%',
                }}>
                <View style={{width: '35%'}}>
                  <Text
                    style={
                      styles.product
                    }>{`${item.quantity} ${item.name}`}</Text>
                  <Text style={styles.size}>Regular</Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    width: '62%',
                  }}>
                  <Text
                    style={styles.price}>{`IDR ${priceTimesQuantity}`}</Text>
                </View>
              </View>
            </View>
          );
        }}
      />
      {/* Detail list end */}

      {/* Scroll down if data length > 4 */}
      {/* {cart.length > 3 ? (
        <View
          style={{
            justifyContent: 'center',
            width: '100%',
            alignItems: 'center',
            marginBottom: -17,
          }}>
          <Text style={{fontSize: 14, fontFamily: 'Poppins-Regular'}}>
            Swipe Up
          </Text>
          <Icon name="gesture-swipe-up" size={30} color="#895537" />
        </View>
      ) : (
        <></>
      )} */}

      {/* Summary start */}
      <View style={{marginBottom: 20}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 20,
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'Poppins-Regular',
              color: '#000000',
            }}>
            Subtotal
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'Poppins-Regular',
              color: '#000000',
            }}>{`IDR ${subtotal.toLocaleString('id-ID')}`}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 20,
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'Poppins-Regular',
              color: '#000000',
            }}>
            Tax
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'Poppins-Regular',
              color: '#000000',
            }}>{`IDR ${tax.toLocaleString('id-ID')}`}</Text>
        </View>
      </View>
      {/* Summary end */}

      {/* Total start */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          marginBottom: 20,
        }}>
        <Text
          style={{fontSize: 20, fontFamily: 'Poppins-Bold', color: '#000000'}}>
          Total
        </Text>
        <Text
          style={{
            fontSize: 20,
            // fontWeight: '700',
            fontFamily: 'Poppins-Bold',
            color: '#000000',
          }}>{`IDR ${total.toLocaleString('id-ID')}`}</Text>
      </View>
      {/* Total end */}

      <Pressable style={{marginTop: -20, marginBottom: 25}}>
        <Text
          style={[global.btn_primary, styles.confirmAndCheckout]}
          // onPress={() => { navigation.navigate('History')}}
          onPress={toggleModal}>
          Pay Now
        </Text>
      </Pressable>

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
              Confirm your order
            </Text>
            <Icon
              name="alert-circle-check"
              color={'green'}
              size={100}
              style={styles.cart}
            />
            <Text
              style={{
                fontSize: 16.5,
                fontFamily: 'Poppins-Regular',
              }}>{`Total transaction : IDR ${total.toLocaleString(
              'id-ID',
            )}`}</Text>
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
                backgroundColor: '#ccc',
                paddingHorizontal: 40,
                paddingVertical: 15,
                borderRadius: 20,
                marginRight: 10,
                elevation: 3,
              }}
              onPress={toggleModal}>
              <Text style={{fontFamily: 'Poppins-Regular'}}>NO</Text>
            </Pressable>
            <Pressable
              style={{
                backgroundColor: '#04AA6D',
                paddingHorizontal: 40,
                paddingVertical: 15,
                borderRadius: 20,
                marginLeft: 10,
                elevation: 3,
              }}
              onPress={handlePayment}>
              <Text style={{color: 'white', fontFamily: 'Poppins-Regular'}}>
                YES
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      {/* Modal end */}
    </View>
  );
}
