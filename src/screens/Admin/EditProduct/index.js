/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
  TextInput,
  Modal,
  PermissionsAndroid,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import Toast from 'react-native-toast-message';
import ReactModal from 'react-native-modal';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {getProductDetails, editProduct} from '../../../utils/https/products';

import Loader from '../../../components/Loader';

import global from '../../../styles/global';
import styles from './style';

export default function EditProduct({route}) {
  const navigation = useNavigation();

  const userToken = useSelector(state => state.auth.data?.token);

  // eslint-disable-next-line no-unused-vars
  const {id, name, price, category, img} = route.params;

  const [productData, setProductData] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [productImage, setProductImage] = useState(null);
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
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

  const isImg = () => {
    if (productData && img) {
      return (
        <>
          {imagePreview ? (
            <Image source={{uri: imagePreview}} style={styles.hero} />
          ) : (
            <Image source={{uri: img}} style={styles.hero} />
          )}
        </>
      );
    }
    return (
      <>
        {imagePreview ? (
          <Image source={{uri: imagePreview}} style={styles.hero} />
        ) : (
          <Image
            source={require('../../../images/product-placeholder.webp')}
            style={styles.hero}
          />
        )}
      </>
    );
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
    setImagePreview(null);
    setProductImage(null);
    setProductName('');
    setProductPrice('');
    setProductDescription('');
  };

  const onProductPriceChange = text => {
    const numericValue = text.replace(/[^0-9]/g, '');
    setProductPrice(numericValue);
  };

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
          setProductImage(result.path);
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
        setProductImage(result.path);
      }
    } catch (error) {
      console.log('Error taking image:', error);
    }
  };

  const editProductHandler = () => {
    editProduct(
      productImage,
      productName,
      productPrice,
      productDescription,
      id,
      userToken,
    )
      .then(() => {
        Toast.show({
          type: 'success',
          text1: 'Successfully edit product',
          position: 'top',
          visibilityTime: 5000,
          topOffset: 50,
        });
      })
      .catch(err => {
        Toast.show({
          type: 'error',
          text1: err.response.data.msg,
          position: 'top',
          visibilityTime: 5000,
          topOffset: 50,
        });
      });
  };

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
          <Fontisto
            name="angle-left"
            color={'black'}
            size={22}
            onPress={() => {
              navigation.goBack();
            }}
            style={styles.chevron}
          />
        </Pressable>
        <Pressable onPress={() => setIsModalVisible(true)} style={styles.cart}>
          <Icon
            name="trash-can-outline"
            color={'white'}
            size={24}
            style={styles.cartImg}
          />
        </Pressable>
      </View>

      <View style={styles.imgContainer}>
        {isImg()}
        <Pressable
          onPress={() => setModalVisible(true)}
          style={styles.addImage}>
          <Icon name="plus-thick" size={30} color="white" />
        </Pressable>
      </View>

      <View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
          <TextInput
            defaultValue={name}
            placeholderTextColor={'#9F9F9F'}
            style={styles.title}
            onChangeText={text => setProductName(text)}
          />
          <View
            style={{
              borderBottomWidth: 2,
              borderBottomColor: '#9F9F9F',
              marginTop: 1,
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
          <TextInput
            defaultValue={`IDR ${price.toLocaleString('id-ID')}`}
            placeholderTextColor={'#9F9F9F'}
            style={styles.price}
            keyboardType="numeric"
            onChangeText={onProductPriceChange}
          />
          <View
            style={{
              borderBottomWidth: 2,
              borderBottomColor: '#9F9F9F',
              marginTop: 1,
            }}
          />
        </View>
        <Text style={styles.deliveryInfo}>Delivery info</Text>
        <Text style={styles.deliveryText}>
          Delivered only on monday until friday from 1 pm to 7 pm
        </Text>
        <Text style={styles.description}>Description</Text>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
          <TextInput
            defaultValue={productData.description}
            placeholderTextColor={'#9F9F9F'}
            style={styles.descriptionText}
            multiline
            onChangeText={text => setProductDescription(text)}
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

      {/* Save change */}
      <Pressable
        onPress={editProductHandler}
        style={{marginBottom: 50, width: '100%'}}>
        <Text style={[global.btn_primary, styles.saveChange]}>Save change</Text>
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

      <ReactModal
        isVisible={isModalVisible}
        animationIn={'zoomIn'}
        animationOut={'zoomOut'}>
        <View
          style={{
            // flex: 1,
            backgroundColor: '#fff',
            paddingVertical: 20,
            width: '95%',
            borderRadius: 15,
            marginLeft: 10,
          }}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 28,
                fontFamily: 'Poppins-SemiBold',
                paddingBottom: 10,
              }}>
              Remove changes
            </Text>
            <Icon name="alert-circle" color={'#DC143C'} size={100} />
            <Text style={{fontSize: 16.5, fontFamily: 'Poppins-Regular'}}>
              Are you sure?
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: 20,
            }}>
            <Pressable
              style={{
                backgroundColor: '#04AA6D',
                paddingHorizontal: 40,
                paddingVertical: 15,
                borderRadius: 20,
                marginRight: 10,
                elevation: 3,
              }}
              onPress={() => setIsModalVisible(!isModalVisible)}>
              <Text style={{color: 'white', fontFamily: 'Poppins-Regular'}}>
                NO
              </Text>
            </Pressable>
            <Pressable
              style={{
                backgroundColor: '#DC143C',
                paddingHorizontal: 40,
                paddingVertical: 15,
                borderRadius: 20,
                marginLeft: 10,
                elevation: 3,
              }}
              onPress={toggleModal}>
              <Text style={{color: 'white', fontFamily: 'Poppins-Regular'}}>
                YES
              </Text>
            </Pressable>
          </View>
        </View>
      </ReactModal>
      {/* Modal end */}

      <Toast />
    </ScrollView>
  );
}
