import React from 'react';
import {Text, View, Image, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './style';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

function ProductDetailHeader() {
  const navigation = useNavigation();

  // REDUX
  const cart = useSelector(state => state.cart.cart);
  const userRole = useSelector(state => state.auth.data?.data?.role_id);

  return (
    <View style={styles.navbar}>
      <Pressable onPress={() => navigation.goBack()}>
        <Image
          source={require('../../images/chevron-left.png')}
          style={styles.chevron}
        />
      </Pressable>
      {userRole === 1 ? (
        <Pressable
          onPress={() => navigation.navigate('EditProduct')}
          style={styles.cart}>
          <Icon
            name="pencil-outline"
            color={'black'}
            size={24}
            style={styles.cartImg}
          />
        </Pressable>
      ) : (
        <Pressable
          onPress={() => navigation.navigate('Cart')}
          style={styles.cart}>
          <Icon
            name="cart-outline"
            color={'black'}
            size={24}
            style={styles.cartImg}
          />
          {cart.length > 0 ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cart.length}</Text>
            </View>
          ) : (
            <></>
          )}
        </Pressable>
      )}
      {/* <Pressable
        onPress={() => navigation.navigate('Cart')}
        style={styles.cart}>
        <Icon
          name="cart-outline"
          color={'black'}
          size={24}
          style={styles.cartImg}
        />
        {cart.length > 0 ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{cart.length}</Text>
          </View>
        ) : (
          <></>
        )}
      </Pressable> */}
    </View>
  );
}

export default ProductDetailHeader;
