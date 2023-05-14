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
} from 'react-native';
import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
// import {StatusBar} from 'expo-status-bar';
import debounce from 'lodash.debounce';

import {getProducts} from '../../utils/https/products';
import {getUserData} from '../../utils/https/auth';

import Navbar from '../../components/Navbar';
import Loader from '../../components/Loader';

import global from '../../styles/global';
import styles from './style';

export default function Home() {
  const navigation = useNavigation();
  const [dataProducts, setDataProducts] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [filter, setFilter] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const [_, setUserData] = useState([]);

  const loadProducts = () => {
    setIsLoading(true);
    getProducts(filter, '', keyword, 10, null)
      .then(res => {
        setDataProducts(res.data.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setDataProducts([]);
        setIsLoading(false);
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

      <ScrollView showsVerticalScrollIndicator={false}>
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
      </ScrollView>
    </View>
  );
}
