import React from 'react';
import {
  Text,
  View,
  // ScrollView,
  Image,
  Pressable,
  // FlatList,
  // TextInput,
} from 'react-native';
// import {MaterialCommunityIcons} from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import global from '../../styles/global';
import styles from './style';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

function Navbar() {
  const navigation = useNavigation();

  // REDUX
  const cart = useSelector(state => state.cart.cart);
  return (
    <View style={styles.navbar}>
      <Pressable onPress={() => navigation.openDrawer()}>
        <Image
          source={require('../../images/hamburgerButton.png')}
          style={styles.hamburger}
        />
      </Pressable>
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
    </View>
  );
}

export default Navbar;
