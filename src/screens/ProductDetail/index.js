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
// import {API_IMG} from '@env';
import {useDispatch} from 'react-redux';

// eslint-disable-next-line no-unused-vars
import {cartAction} from '../../redux/slices/cart';
import {getProductDetails} from '../../utils/https/products';

import global from '../../styles/global';
import styles from './style';
// import {ScrollView} from 'react-native-gesture-handler';

export default function ProductDetails({route}) {
  const navigation = useNavigation();
  // eslint-disable-next-line no-unused-vars
  const {id, name, price, category, img} = route.params;

  // REDUX
  // const cart = useSelector(state => state.cart.cart);
  // console.log(cart);
  const dispatch = useDispatch();

  const addItemToCart = item => {
    dispatch(cartAction.addToCart(item));
  };

  const [productData, setProductData] = useState([]);

  useEffect(() => {
    getProductDetails(id)
      .then(res => {
        setProductData(res.data.data[0]);
        // console.log(res.data.data[0]);
      })
      .catch(err => {
        console.log(err);
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
        <Text style={styles.descriptionText}>
          {/* Cold brewing is a method of brewing that combines ground coffee and cool
        water and uses time instead of heat to extract the flavor. It is brewed
        in small batches and steeped for as long as 48 hours. */}
          {productData.description}
        </Text>
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
