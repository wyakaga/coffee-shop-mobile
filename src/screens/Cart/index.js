/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Text, View, Image, Pressable, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {cartAction} from '../../redux/slices/cart';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-toast-message';

import global from '../../styles/global';
import styles from './style';

export default function Cart() {
  const navigation = useNavigation();

  // REDUX
  var totalPrice = 0;
  const [totalPriceState, setTotalPriceState] = useState('');

  const cart = useSelector(state => state.cart.cart);

  const dispatch = useDispatch();

  const increaseQuantity = item => {
    dispatch(cartAction.incrementQuantity(item));
  };
  const decreaseQuantity = item => {
    if (item.quantity === 1) {
      dispatch(cartAction.removeFromCart(item));
      setTotalPriceState(null);
    } else {
      dispatch(cartAction.decrementQuantity(item));
    }
  };

  return (
    <View
      style={[
        global.px_container,
        {
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#F2F2F2',
          flex: 1,
        },
      ]}>
      {/* No order background */}
      {cart.length < 1 ? (
        <>
          <Image
            source={require('../../images/noorder.png')}
            style={{marginTop: 50, marginRight: 20}}
          />
          <Text
            style={{
              marginTop: 25,
              textAlign: 'center',
              fontSize: 28,
              // fontWeight: '900',
              fontFamily: 'Poppins-Black',
            }}>
            No orders yet
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
          <Pressable style={{marginTop: 180, width: '100%'}}>
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

      <View style={styles.cardWrap}>
        <FlatList
          style={{height: '65%'}}
          showsVerticalScrollIndicator={false}
          data={cart}
          renderItem={({item, index}) => {
            totalPrice += parseInt(item.price, 10) * item.quantity;
            setTotalPriceState(totalPrice);

            const price = parseInt(item.price, 10) * item.quantity;
            return (
              <View key={index} style={styles.card}>
                <View style={{width: '30%'}}>
                  <Image
                    source={{
                      uri: item.img,
                    }}
                    style={styles.hero}
                  />
                </View>

                <View style={{width: '40%'}}>
                  <Text style={styles.title}>{item.name}</Text>
                  <Text style={styles.price}>{`IDR ${price.toLocaleString(
                    'id-ID',
                  )}`}</Text>
                </View>

                {/* Quantity prodcut */}
                <View
                  style={{
                    width: '30%',
                    flexDirection: 'row',
                    backgroundColor: '#6A4029',
                    borderRadius: 10,
                    justifyContent: 'center',
                    paddingVertical: 6,
                  }}>
                  <Pressable onPress={() => decreaseQuantity(item)}>
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'white',
                        paddingHorizontal: 10,
                      }}>
                      -
                    </Text>
                  </Pressable>
                  <Pressable>
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'white',
                        paddingHorizontal: 10,
                        fontFamily: 'Poppins-Regular',
                      }}>
                      {item.quantity}
                    </Text>
                  </Pressable>
                  <Pressable onPress={() => increaseQuantity(item)}>
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'white',
                        paddingHorizontal: 10,
                      }}>
                      +
                    </Text>
                  </Pressable>
                </View>
              </View>
            );
          }}
        />
      </View>

      {totalPriceState ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'center',
          }}>
          <Text style={{fontFamily: 'Poppins-Medium', fontSize: 18}}>
            Total price:
          </Text>
          <Text
            style={{
              // fontWeight: '500',
              fontFamily: 'Poppins-Medium',
              fontSize: 15,
            }}>{`IDR ${totalPriceState.toLocaleString('id-ID')}`}</Text>
        </View>
      ) : (
        <></>
      )}

      {/* Scroll down if data length > 4 */}
      {cart.length > 4 ? (
        <>
          <Text style={{fontSize: 14, fontFamily: 'Poppins-Regular'}}>
            Swipe Up
          </Text>
          <Icon name="gesture-swipe-up" size={30} color="#895537" />
        </>
      ) : (
        <></>
      )}

      <Pressable style={{width: '110%', marginTop: 20}}>
        <Text
          style={[global.btn_primary, styles.addItem]}
          onPress={() => {
            navigation.navigate('Products');
          }}>
          Add more item
        </Text>
      </Pressable>
      <Pressable style={{width: '110%', marginTop: 10}}>
        <Text
          style={[global.btn_primary, styles.confirmAndCheckout]}
          onPress={() => {
            if (cart.length > 0) {
              navigation.navigate('DeliveryMethod', {
                totalPriceState: parseInt(totalPriceState, 10),
              });
            } else {
              Toast.show({
                type: 'error',
                text1: 'Sorry',
                text2: 'Please add product first!',
                position: 'top',
                visibilityTime: 1500,
                topOffset: 30,
              });
            }
          }}>
          Confirm and Checkout
        </Text>
      </Pressable>
      <Toast />
    </View>
  );
}
