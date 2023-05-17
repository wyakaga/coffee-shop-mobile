/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  TextInput,
  TouchableHighlight,
  Modal,
  PermissionsAndroid,
} from 'react-native';
import {useSelector} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-toast-message';

import {createProduct} from '../../../utils/https/products';

import global from '../../../styles/global';
import styles from './style';

export default function CreateProduct() {
  const userToken = useSelector(state => state.auth.data?.token);

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const pickImage = async () => {
    try {
      // Request permission to access device's gallery
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        {
          title: 'Gallery Permission',
          message: 'App needs access to your gallery',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        let result = await ImagePicker.openPicker({
          mediaType: 'photo',
          multiple: false,
          cropping: true,
          width: 400,
          height: 300,
          cropperCircleOverlay: false,
          freeStyleCropEnabled: true,
        });
        if (!result.cancelled) {
          console.log(result);
          setImagePreview(result.path);
          setImage(result.path);
        }
      } else {
        console.log('Gallery permission denied');
      }
    } catch (error) {
      console.log('Error picking image:', error);
    }
  };

  const takeImage = async () => {
    try {
      let result = await ImagePicker.openCamera({
        mediaType: 'photo',
        cropping: true,
        width: 400,
        height: 300,
        cropperCircleOverlay: false,
        freeStyleCropEnabled: true,
      });
      if (!result.cancelled) {
        setImagePreview(result.path);
        setImage(result.path);
      }
    } catch (error) {
      console.log('Error taking image:', error);
    }
  };

  const saveProductHandler = () => {
    createProduct(name, price, image, category, description, userToken)
      .then(() => {
        Toast.show({
          type: 'success',
          text1: 'Successfully create product',
          position: 'top',
          visibilityTime: 3000,
          topOffset: 50,
        });
      })
      .catch(err => {
        Toast.show({
          type: 'error',
          text1: err.response.data.msg,
          position: 'top',
          visibilityTime: 3000,
          topOffset: 50,
        });
      });
  };

  const isImg = () => {
    if (imagePreview) {
      return <Image style={styles.hero} source={{uri: imagePreview}} />;
    }

    return (
      <Image
        style={styles.hero}
        source={require('../../../images/product-placeholder.webp')}
      />
    );
  };

  const TABS = [
    {key: 1, label: 'Coffee'},
    {key: 2, label: 'Non Coffee'},
    {key: 3, label: 'Foods'},
    {key: 4, label: 'Add-on'},
  ];

  return (
    <ScrollView
      style={[
        global.px_container,
        {
          display: 'flex',
          // alignItems: 'flex-start',
          backgroundColor: 'white',
          flex: 1,
        },
      ]}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{alignItems: 'flex-start'}}>
      {/* Add product start */}

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: '100%',
          marginTop: 20,
          marginBottom: 10,
          position: 'relative',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            width: '100%',
            marginTop: 20,
            marginBottom: 20,
            position: 'relative',
          }}>
          {isImg()}
          <Pressable
            onPress={() => setModalVisible(true)}
            style={styles.addImage}>
            <Icon name="plus-thick" size={30} color="white" />
          </Pressable>
        </View>
      </View>

      <View style={{width: '100%'}}>
        <View>
          <Text style={styles.input}>Name</Text>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
            <TextInput
              placeholder="Input the product name min. 30 characters"
              placeholderTextColor={'#9F9F9F'}
              style={{color: 'black', fontFamily: 'Poppins-Regular'}}
              onChangeText={text => setName(text)}
            />
            <View
              style={{
                borderBottomWidth: 2,
                borderBottomColor: '#9F9F9F',
                marginTop: 1,
              }}
            />
          </View>
        </View>
        <View>
          <Text style={styles.input}>Price</Text>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
            <TextInput
              placeholder="Input the product price"
              placeholderTextColor={'#9F9F9F'}
              keyboardType="number-pad"
              style={{color: 'black', fontFamily: 'Poppins-Regular'}}
              onChangeText={text => setPrice(text)}
            />
            <View
              style={{
                borderBottomWidth: 2,
                borderBottomColor: '#9F9F9F',
                marginTop: 1,
              }}
            />
          </View>
        </View>
        <View>
          <Text style={styles.input}>Description</Text>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
            <TextInput
              placeholder="Describe your product min. 150 characters"
              placeholderTextColor={'#9F9F9F'}
              style={{color: 'black', fontFamily: 'Poppins-Regular'}}
              onChangeText={text => setDescription(text)}
            />
            <View
              style={{
                borderBottomWidth: 2,
                borderBottomColor: '#9F9F9F',
                marginTop: 1,
              }}
            />
          </View>
        </View>
        <View>
          <Text style={styles.input}>Category</Text>
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
      </View>

      <Pressable
        disabled={
          image && name && price && description && category ? false : true
        }
        style={{width: '80%', alignSelf: 'center'}}
        onPress={saveProductHandler}>
        <Text
          style={[
            global.btn_primary,
            styles.saveProduct,
            (!image || !name || !price || !description || !category) &&
              styles.disabledButtonStyle,
          ]}>
          Save product
        </Text>
      </Pressable>

      {/* Modal start */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            rowGap: 20,
          }}>
          <Pressable style={{width: '80%'}} onPress={pickImage}>
            <Text style={[global.btn_primary, styles.choosePhoto]}>
              Choose Photo
            </Text>
          </Pressable>
          <Pressable style={{width: '80%'}} onPress={takeImage}>
            <Text style={[global.btn_primary, styles.takePhoto]}>
              Take Photo
            </Text>
          </Pressable>

          <Pressable onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.closeHandler}>Close</Text>
          </Pressable>
        </View>
      </Modal>
      {/* Modal end */}

      {/* Add product end */}
      <Toast />
    </ScrollView>
  );
}
