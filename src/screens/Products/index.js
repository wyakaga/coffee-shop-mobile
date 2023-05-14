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
  TouchableOpacity,
  Modal,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import debounce from 'lodash.debounce';

import {getProducts} from '../../utils/https/products';

import Loader from '../../components/Loader';

import global from '../../styles/global';
import styles from './style';

export default function Products() {
  const [dataProducts, setDataProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [order, setOrder] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState('');
  const [isNoData, setIsNoData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSearch = debounce(keyword => {
    setSearch(keyword);
    setPage(1);
  }, 1000);

  const handleNextPage = async () => {
    if (totalPage === page) {
      return;
    }

    const nextPage = page + 1;

    setIsLoading(true);

    try {
      const result = await getProducts(category, order, search, 6, nextPage);
      const mergedData = [...dataProducts, ...result.data.data];
      setDataProducts(mergedData);
      setPage(nextPage);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handlePrevPage = async () => {
    if (page === 1) {
      return;
    }

    const prevPage = page - 1;

    setIsLoading(true);

    try {
      const result = await getProducts(category, order, search, 6, prevPage);
      setDataProducts(result.data.data);
      setPage(prevPage);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleScroll = event => {
    const y = event.nativeEvent.contentOffset.y;
    if (y === 0 && page > 1) {
      // Reached top of list
      handlePrevPage();
    }
  };

  const debouncedHandleNextPage = debounce(handleNextPage, 1000);

  useEffect(() => {
    setIsLoading(true);
    getProducts(category, order, search, 6, page)
      .then(res => {
        setDataProducts(res.data.data);
        setTotalPage(res.data.meta.totalPage);
        setIsNoData(false);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err.message);
        if (err.response && err.response.status === 404) {
          setIsNoData(true);
          setIsLoading(false);
        }
      });
  }, [category, order, search, page]);

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
      {isLoading && <Loader isLoading={isLoading} />}
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

        <View style={{alignItems: 'flex-start', marginTop: 20, marginLeft: 30}}>
          <TouchableOpacity
            onPress={() => setIsModalVisible(true)}
            style={styles.btnSort}>
            <Text style={styles.btnSortText}>
              {order === ''
                ? 'Sort by'
                : `${order.charAt(0).toUpperCase()}${order.slice(1)}`}
            </Text>
          </TouchableOpacity>

          <Modal visible={isModalVisible} transparent animationType="slide">
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <TouchableOpacity
                  onPress={() => {
                    setOrder('');
                    setIsModalVisible(false);
                  }}>
                  <Text style={styles.modalItem}>Reset</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setOrder('cheapest');
                    setIsModalVisible(false);
                  }}>
                  <Text style={styles.modalItem}>Cheapest</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setOrder('priciest');
                    setIsModalVisible(false);
                  }}>
                  <Text style={styles.modalItem}>Priciest</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                  <Text style={styles.modalItem}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tabContainer}>
          {TABS.map(({key, label}) => (
            <TouchableHighlight
              key={key}
              underlayColor="#fff"
              onPress={() => {
                setCategory(key);
                setPage(1);
              }}
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
      {isNoData ? (
        <Text style={styles.notFound}>Products Not Found</Text>
      ) : (
        <FlatList
          style={{marginHorizontal: 5}}
          showsVerticalScrollIndicator={false}
          data={dataProducts}
          renderItem={({item, index}) => (
            <ProductCard item={item} index={index} />
          )}
          numColumns={2}
          horizontal={false}
          onEndReached={debouncedHandleNextPage}
          onEndReachedThreshold={0.1}
          onScroll={handleScroll}
        />
      )}
      {/* View all product end */}
    </View>
  );
}

function ProductCard({item, index}) {
  const navigation = useNavigation();

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
        <Text style={styles.productPrice}>{`IDR ${item.price.toLocaleString(
          'id-ID',
        )}`}</Text>
      </View>
    </Pressable>
  );
}
