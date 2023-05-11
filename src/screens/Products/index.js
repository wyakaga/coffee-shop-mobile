/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  Pressable,
  TextInput,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import debounce from 'lodash.debounce';

import {getProducts} from '../../utils/https/products';

import global from '../../styles/global';
import styles from './style';

export default function Products() {
  const navigation = useNavigation();

  const [dataProductsLeft, setDataProductsLeft] = useState([]);
  const [dataProductsRight, setDataProductsRight] = useState([]);
  const [dataProducts, setDataProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [order, setOrder] = useState('');
  const [search, setSearch] = useState('');

  const handleSearch = debounce(search => {
    setSearch(search);
  }, 1000);

  useEffect(() => {
    // const limitPage = '15';
    getProducts('', '', 7, 1)
      .then(res => {
        // console.log(Math.floor(res.data.data.length / 2));
        setDataProductsLeft(res.data.data);
      })
      .catch(err => console.log(err.message));

    getProducts('', '', 7, 2)
      .then(res => {
        // console.log(Math.floor(res.data.data.length / 2));
        setDataProductsRight(res.data.data);
      })
      .catch(err => console.log(err.message));

    getProducts(category, order, search, 25, '')
      .then(res => {
        setDataProducts(res.data.data);
      })
      .catch(err => console.log(err.message));
  }, [category, order, search]);

  const TABS = [
    {key: '', label: 'Favorite'},
    {key: 'coffee', label: 'Coffee'},
    {key: 'non coffee', label: 'Non Coffee'},
    {key: 'foods', label: 'Foods'},
    {key: 'add-on', label: 'Add-on'},
  ];

  return (
    <View
      style={[
        global.bg,
        {
          backgroundColor: 'white',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          marginTop: 30,
          paddingTop: 30,
        },
      ]}>
      <Text style={styles.title}>Choose your favorite</Text>

      <View>
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

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tabContainer}>
          {TABS.map(({key, label}) => (
            <TouchableHighlight
              key={key}
              underlayColor="#fff"
              onPress={() => setCategory(key)}
              style={[
                styles.tab,
                category === key ? styles.activeTab : {},
                key === '' ? styles.firstTab : {},
              ]}>
              <Text
                style={[
                  styles.tabLabel,
                  category === key ? styles.activeTabLabel : {},
                ]}>
                {label}
              </Text>
            </TouchableHighlight>
          ))}
        </ScrollView>
      </View>

      {/* View all product start */}
      <FlatList
        style={{marginHorizontal: 100}}
        showsVerticalScrollIndicator={false}
        data={dataProducts}
        renderItem={({item, index}) => {
          return (
            <Pressable
              key={index}
              style={styles.cardWrap}
              onPress={() => navigation.navigate('ProductDetail', item)}
              android_ripple={{
                color: '#6A4029',
                foreground: true,
                borderless: true,
                radius: 40,
              }}>
              <View style={styles.imgContainer}>
                <Image
                  source={{
                    uri: item.img,
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    // position: 'absolute',
                    // marginTop: 10,
                    // zIndex: 2,
                    resizeMode: 'cover',
                    borderRadius: 100,
                  }}
                />
              </View>
              <View style={styles.card}>
                <Text style={styles.productTitle}>{item.name}</Text>
                <Text
                  style={styles.productPrice}>{`IDR ${item.price.toLocaleString(
                  'id-ID',
                )}`}</Text>
              </View>
            </Pressable>
          );
        }}
      />
      {/* Left content start */}
      {/* <FlatList
        style={{marginLeft: 10, marginBottom: -280, marginTop: 30}}
        showsVerticalScrollIndicator={false}
        data={dataProductsLeft}
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
                radius: 40,
              }}>
              <View style={styles.imgContainer}>
                <Image
                  source={{
                    uri: item.img,
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    // position: 'absolute',
                    // marginTop: 10,
                    // zIndex: 2,
                    resizeMode: 'cover',
                    borderRadius: 100,
                  }}
                />
              </View>
              <View style={styles.card}>
                <Text style={styles.productTitle}>{item.name}</Text>
                <Text
                  style={styles.productPrice}>{`IDR ${item.price.toLocaleString(
                  'id-ID',
                )}`}</Text>
              </View>
            </Pressable>
          );
        }}
      /> */}
      {/* left content end */}
      {/* right content start */}
      {/* <FlatList
        style={{marginLeft: 190, marginTop: -115, marginBottom: 15}}
        showsVerticalScrollIndicator={false}
        data={dataProductsRight}
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
                radius: 40,
              }}>
              <View style={styles.imgContainer}>
                <Image
                  source={{
                    uri: item.img,
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    // position: 'absolute',
                    // marginTop: 10,
                    // zIndex: 2,
                    resizeMode: 'cover',
                    borderRadius: 100,
                  }}
                />
              </View>
              <View style={styles.card}>
                <Text style={styles.productTitle}>{item.name}</Text>
                <Text
                  style={styles.productPrice}>{`IDR ${item.price.toLocaleString(
                  'id-ID',
                )}`}</Text>
              </View>
            </Pressable>
          );
        }} */}
      {/* /> */}
      {/* right content end */}
      {/* View all product end */}
    </View>
  );
}
