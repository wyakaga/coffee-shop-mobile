/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
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
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {cartAction} from '../../redux/slices/cart';
import {getProductDetails} from '../../utils/https/products';

import Loader from '../../components/Loader';

import global from '../../styles/global';
import styles from './style';

export default function ProductDetails({route}) {
  const navigation = useNavigation();

  const cart = useSelector(state => state.cart.cart);
  const userRole = useSelector(state => state.auth.data?.data?.role_id);

  const {id, name, price, category, img} = route.params;

  // REDUX
  // const cart = useSelector(state => state.cart.cart);
  // console.log(cart);
  const dispatch = useDispatch();

  const addItemToCart = item => {
    dispatch(cartAction.addToCart(item));
  };

  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getProductDetails(id)
      .then(res => {
        setProductData(res.data.data[0]);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  }, [id]);

  return (
    <ScrollView
      style={[
        global.px_container,
        {
          display: 'flex',
          backgroundColor: '#FFFFFF',
          flex: 1,
        },
      ]}
      contentContainerStyle={{
        alignItems: 'center',
      }}
      showsVerticalScrollIndicator={false}>
      {isLoading && <Loader isLoading={isLoading} />}

      <View style={styles.navbar}>
        <Pressable onPress={() => navigation.goBack()}>
          <Image
            source={require('../../images/chevron-left.png')}
            style={styles.chevron}
          />
        </Pressable>
        {userRole === 1 ? (
          <Pressable
            onPress={() =>
              navigation.navigate('EditProduct', {
                id,
                name,
                price,
                category,
                img,
              })
            }
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

      {/* <ScrollView horizontal>
                <Text>Choose a size</Text>
            </ScrollView> */}

      <View style={styles.imgContainer}>
        <Image
          source={{
            uri: img,
          }}
          style={styles.hero}
        />
      </View>

      <View>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.price}>{`IDR ${price.toLocaleString(
          'id-ID',
        )}`}</Text>
        <Text style={styles.deliveryInfo}>Delivery info</Text>
        <Text style={styles.deliveryText}>
          Delivered only on monday until friday from 1 pm to 7 pm
        </Text>
        <Text style={styles.description}>Description</Text>
        <Text style={styles.descriptionText}>{productData.description}</Text>
      </View>

      {/* Add to cart */}
      <Pressable
        onPress={() => {
          // navigation.navigate('Cart', { id, title, price, category, productImage })
          addItemToCart(route.params);
          navigation.navigate('Cart');
        }}
        style={{marginBottom: 50}}>
        <Text style={[global.btn_primary, styles.addToCart]}>Add to cart</Text>
      </Pressable>
    </ScrollView>
  );
}
