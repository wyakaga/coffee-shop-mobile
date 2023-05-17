/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
  FlatList,
  TextInput,
  TouchableHighlight,
  RefreshControl,
} from 'react-native';
import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import debounce from 'lodash.debounce';

import {getProducts} from '../../utils/https/products';
import {getUserData} from '../../utils/https/auth';

import Navbar from '../../components/Navbar';
import Loader from '../../components/Loader';

import global from '../../styles/global';
import styles from './style';

export default function Home() {
  const navigation = useNavigation();

  const userRole = useSelector(state => state.auth.data?.data?.role_id);

  const [dataProducts, setDataProducts] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [filter, setFilter] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const [_, setUserData] = useState([]);

  const loadProducts = () => {
    setIsLoading(true);
    getProducts(filter, '', keyword, 10, null)
      .then(res => {
        setDataProducts(res.data.data);
        setIsLoading(false);
        setRefreshing(false);
      })
      .catch(err => {
        console.log(err);
        setDataProducts([]);
        setIsLoading(false);
        setRefreshing(false);
      });
  };

  useEffect(() => {
    loadProducts();
    getUserData(setUserData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword, filter]);

  const handleSearch = debounce(search => {
    setKeyword(search);
  }, 1000);

  const onRefresh = () => {
    setRefreshing(true);
    loadProducts();
  };

  const TABS = [
    {key: '', label: 'Favorite'},
    {key: 'coffee', label: 'Coffee'},
    {key: 'non coffee', label: 'Non Coffee'},
    {key: 'foods', label: 'Foods'},
    {key: 'add-on', label: 'Add-on'},
  ];

  return (
    <View style={[global.bg, {backgroundColor: 'white'}]}>
      {isLoading && <Loader isLoading={isLoading} />}
      <Navbar />
      {/* <StatusBar style="dark" /> */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Text style={styles.title}>A good coffee is {'\n'}a good day</Text>

        <View style={{position: 'relative'}}>
          <Image
            source={require('../../images/search.png')}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            onChangeText={handleSearch}
          />
        </View>
        {/* Product Card Start */}
        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.tabContainer}>
            {TABS.map(({key, label}) => (
              <TouchableHighlight
                key={key}
                underlayColor="#fff"
                onPress={() => setFilter(key)}
                style={[
                  styles.tab,
                  filter === key ? styles.activeTab : {},
                  key === '' ? styles.firstTab : {},
                ]}>
                <Text
                  style={[
                    styles.tabLabel,
                    filter === key ? styles.activeTabLabel : {},
                  ]}>
                  {label}
                </Text>
              </TouchableHighlight>
            ))}
          </ScrollView>

          <Text
            style={styles.seeMore}
            onPress={() => {
              navigation.navigate('Products');
            }}>
            See more
          </Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={dataProducts}
            style={{padding: 30}}
            renderItem={({item, index}) => {
              return (
                <Pressable
                  key={index}
                  style={styles.cardWrap}
                  onPress={() => {
                    navigation.navigate('ProductDetail', item);
                  }}
                  android_ripple={{
                    color: '#6A4029',
                    foreground: true,
                    borderless: true,
                    radius: 70,
                  }}>
                  <View style={styles.imgContainer}>
                    <Image
                      source={{uri: item.img}}
                      style={{
                        width: '100%',
                        height: '100%',
                        // position: 'absolute',
                        // top: 40,
                        // zIndex: 2,
                        // flex: 1,
                        resizeMode: 'cover',
                        borderWidth: 1,
                        borderColor: 'white',
                        borderRadius: 10,
                      }}
                    />
                    {userRole === 1 && (
                      <Pressable
                        onPress={() => {
                          navigation.navigate('EditProduct', item);
                        }}>
                        <Image
                          source={require('../../images/edit.png')}
                          style={styles.edit}
                        />
                      </Pressable>
                    )}
                  </View>
                  <View style={styles.card}>
                    <Text numberOfLines={2} style={styles.productTitle}>
                      {item.name}
                    </Text>
                    <Text
                      style={[
                        styles.productPrice,
                        {marginBottom: 25},
                      ]}>{`IDR ${item.price.toLocaleString('id-ID')}`}</Text>
                  </View>
                </Pressable>
              );
            }}
          />
          {/* Jangan gunakan scrolllview ketika berhubungan dengan data apalagi mapping data, gunakan flatlist */}
        </View>
        {/* Product Card End */}

        {/* Add Product Button Start */}
        {userRole === 1 && (
          <Pressable
            style={{width: '80%', alignSelf: 'center'}}
            onPress={() => navigation.navigate('CreateProduct')}>
            <Text style={[global.btn_primary, styles.addProduct]}>
              Add Product
            </Text>
          </Pressable>
        )}
        {/* Add Product Button End */}
      </ScrollView>
    </View>
  );
}
