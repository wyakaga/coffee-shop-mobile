/* eslint-disable react-native/no-inline-styles */
import {React, useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  Pressable,
  ToastAndroid,
  PermissionsAndroid,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {getUserById, patchUserProfile} from '../../utils/https/auth';

import Loader from '../../components/Loader';

import global from '../../styles/global';
import styles from './style';

export default function EditUserImage() {
  const navigation = useNavigation();

  // User Profile Data
  const [userData, setUserData] = useState([]);
  // User profile form update start
  const [editProfileForm, setEditProfilForm] = useState({
    display_name: '',
    birth_date: '',
    address: '',
    gender: '',
    img: null,
  });
  // Image picker
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const id = useSelector(state => state.auth.data?.data?.id);

  const token = useSelector(state => state.auth.data?.token);

  useEffect(() => {
    setIsLoading(true);
    getUserById(id, token)
      .then(res => {
        setUserData(res.data.data[0]);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isImg = () => {
    if (userData && userData.img) {
      return (
        <>
          {imagePreview ? (
            <Image source={{uri: imagePreview}} style={styles.hero} />
          ) : (
            <Image source={{uri: userData.img}} style={styles.hero} />
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
            source={require('../../images/profile-placeholder.webp')}
            style={styles.hero}
          />
        )}
      </>
    );
  };

  // Handle submit
  const handleSubmit = () => {
    patchUserProfile(
      id,
      token,
      editProfileForm.address,
      editProfileForm.display_name,
      editProfileForm.birth_date,
      editProfileForm.gender,
      editProfileForm.img,
    )
      .then(res => {
        ToastAndroid.show('Update success!', ToastAndroid.SHORT);
        setTimeout(() => {
          navigation.navigate('Profile');
        }, 500);
        console.log(res.data);
        setEditProfilForm({
          ...editProfileForm,
          img: null,
        });
      })
      .catch(err => {
        console.log(err);
        // console.log(err.response.data);
      });
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
          setEditProfilForm({
            ...editProfileForm,
            img: result,
          });
        }
      } else {
        console.log('Gallery permission denied');
      }
    } catch (error) {
      console.log('Error picking image:', error);
    }
  };

  const TakeImage = async () => {
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
        setEditProfilForm({
          ...editProfileForm,
          img: result,
        });
      }
    } catch (error) {
      console.log('Error taking image:', error);
    }
  };

  return (
    <View
      style={[
        global.px_container,
        {
          display: 'flex',
          alignItems: 'flex-start',
          backgroundColor: 'white',
          flex: 1,
        },
      ]}>
      {isLoading && <Loader isLoading={isLoading} />}

      {/* Bio start */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: '100%',
          marginTop: 20,
          marginBottom: 10,
          position: 'relative',
        }}>
        {/* {isImg()} */}
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
        </View>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <Pressable onPress={pickImage}>
            <Text style={[global.btn_primary, styles.choosePhoto]}>
              Choose Photo
            </Text>
          </Pressable>
          <Pressable onPress={TakeImage}>
            <Text style={[global.btn_primary, styles.takePhoto]}>
              Take Photo
            </Text>
          </Pressable>
        </View>
      </View>
      {/* Bio end */}

      <Pressable onPress={handleSubmit}>
        <Text style={[global.btn_primary, styles.saveChange]}>
          Save and Update
        </Text>
      </Pressable>
    </View>
  );
}
