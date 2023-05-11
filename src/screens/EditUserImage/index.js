/* eslint-disable react-native/no-inline-styles */
import {React, useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  Pressable,
  // SafeAreaView,
  ToastAndroid,
  Button,
  PermissionsAndroid,
} from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import ImagePicker from 'react-native-image-crop-picker';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import * as ImagePicker from 'react-native-image-picker';
// import RNFetchBlob from 'rn-fetch-blob';

import {getUserById, patchUserProfile} from '../../utils/https/auth';

import global from '../../styles/global';
import styles from './style';

export default function EditUserImage() {
  const navigation = useNavigation();

  // User Profile Data
  const [userData, setUserData] = useState([]);
  // User profile form update start
  const [editProfileForm, setEditProfilForm] = useState({
    display_name: '',
    // phone_number: '',
    birth_date: '',
    address: '',
    gender: '',
    img: null,
  });
  // Image picker
  const [imagePreview, setImagePreview] = useState(null);

  const id = useSelector(state => state.auth.data?.data?.id);

  const token = useSelector(state => state.auth.data?.token);

  //*log for testing
  // console.log(editProfileForm.img);

  useEffect(() => {
    getUserById(id, token).then(res => {
      setUserData(res.data.data[0]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const getUserData = async () => {
  //   try {
  //     const jsonValue = await AsyncStorage.getItem('@userData');
  //     if (jsonValue != null) {
  //       const idUser = JSON.parse(jsonValue).data.id;

  //       getUserById(idUser, token).then(res => {
  //         setUserData(res.data.data[0]);
  //       });
  //     }
  //   } catch (e) {
  //     // console.log(e)
  //   }
  // };

  const isImg = () => {
    if (userData.profile_image != null) {
      return (
        <>
          {imagePreview ? (
            <Image source={{uri: imagePreview}} style={styles.hero} />
          ) : (
            <Image source={{uri: userData.img}} style={styles.hero} />
          )}
        </>
      );
    } else {
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
    }
  };

  // Handle submit
  const handleSubmit = () => {
    // const body = new FormData();
    // body.append('display_name', editProfileForm.display_name);
    // body.append('phone_number', editProfileForm.phone_number);
    // body.append(
    //   'birth_date',
    //   DateTime.fromISO(date.toISOString()).toFormat('yyyy-MM-dd'),
    // );
    // body.append('address', editProfileForm.address);
    // body.append('gender', editProfileForm.gender);
    // body.append('profile_image', {
    //   uri: editProfileForm.profile_image,
    //   type: 'image/jpeg',
    //   name: 'profile.jpg',
    // });

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
        // setTimeout(() => {
        //   navigation.navigate('Profile');
        // }, 500);
        console.log(res.data);
      })
      .catch(err => console.log(err));
  };

  // const pickImage = async () => {
  //   try {
  //     // Request permission to access device's gallery
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
  //       {
  //         title: 'Gallery Permission',
  //         message: 'App needs access to your gallery',
  //         buttonNeutral: 'Ask Me Later',
  //         buttonNegative: 'Cancel',
  //         buttonPositive: 'OK',
  //       },
  //     );

  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       let result = await ImagePicker.openPicker({
  //         mediaType: 'photo',
  //         multiple: false,
  //         cropping: true,
  //         width: 400,
  //         height: 300,
  //         cropperCircleOverlay: false,
  //         freeStyleCropEnabled: true,
  //       });
  //       if (!result.cancelled) {
  //         console.log(result);
  //         setImagePreview(result.path);
  //         setEditProfilForm({
  //           ...editProfileForm,
  //           img: result.path,
  //         });
  //       }
  //     } else {
  //       console.log('Gallery permission denied');
  //     }
  //   } catch (error) {
  //     console.log('Error picking image:', error);
  //   }
  // };

  // const pickImage = async () => {
  //   try {
  //     // Request permission to access device's gallery
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
  //       {
  //         title: 'Gallery Permission',
  //         message: 'App needs access to your gallery',
  //         buttonNeutral: 'Ask Me Later',
  //         buttonNegative: 'Cancel',
  //         buttonPositive: 'OK',
  //       },
  //     );

  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       let result = await ImagePicker.openPicker({
  //         mediaType: 'photo',
  //         multiple: false,
  //         cropping: true,
  //         width: 400,
  //         height: 300,
  //         cropperCircleOverlay: false,
  //         freeStyleCropEnabled: true,
  //       });
  //       if (!result.cancelled) {
  //         // Convert image to base64 string
  //         let base64Image = await RNFetchBlob.fs.readFile(
  //           result.path,
  //           'base64',
  //         );

  //         // Update editProfileForm state with base64 string
  //         setEditProfilForm({
  //           ...editProfileForm,
  //           img: `data:${result.mime};base64,${base64Image}`,
  //         });
  //         setImagePreview(`data:${result.mime};base64,${base64Image}`);
  //       }
  //     } else {
  //       console.log('Gallery permission denied');
  //     }
  //   } catch (error) {
  //     console.log('Error picking image:', error);
  //   }
  // };

  const pickImage = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 400,
      maxHeight: 300,
      quality: 0.5,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        console.log(response);
        setImagePreview(response.assets[0].uri);
        setEditProfilForm({
          ...editProfileForm,
          img: response.assets[0].uri,
        });
      }
    });
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
          img: result.path,
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
          {/* <Pressable
            onPress={() => {
              navigation.navigate('EditUserImage');
            }}>
            <Image
              source={require('../../images/edit.png')}
              style={styles.edit}
            />
          </Pressable> */}
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
          {/* <Pressable onPress={TakeImage}>
            <Text style={[global.btn_primary, styles.takePhoto]}>
              Take Photo
            </Text>
          </Pressable> */}
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
