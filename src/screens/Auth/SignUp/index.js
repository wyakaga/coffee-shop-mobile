/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {useRef, useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
  ImageBackground,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
// import {FormItem} from 'react-native-form-component';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {postRegist} from '../../../utils/https/auth';

import global from '../../../styles/global';
import styles from './style';

export default function Signup({}) {
  const navigation = useNavigation();

  const [formSignup, setFormSignup] = useState({
    email: '',
    password: '',
    phone_number: '',
  });
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [error, setError] = useState({
    email: '',
    password: '',
    phone_number: '',
  });

  console.log(formSignup.phone_number);

  const {emailInput, passwordInput, phoneInput} = useRef();

  const handleSignup = () => {
    const invalid = {email: '', password: '', phone_number: ''};

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/gm;
    const phoneRegex =
      /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/gm;

    if (!formSignup.email) {
      invalid.email = 'Email is required';
    } else if (!emailRegex.test(formSignup.email)) {
      invalid.email = 'Email is not valid';
    }

    if (!formSignup.password) {
      invalid.password = 'Password is required';
    }

    if (!formSignup.phone_number) {
      invalid.phone_number = 'Phone number is required';
    } else if (!phoneRegex.test(formSignup.phone_number)) {
      invalid.phone_number = 'Phone number is not valid';
    }

    setError({
      email: invalid.email,
      password: invalid.password,
      phone_number: invalid.phone_number,
    });

    if (
      invalid.email === '' &&
      invalid.password === '' &&
      invalid.phone_number === ''
    ) {
      postRegist(formSignup)
        .then(res => {
          Toast.show({
            type: 'success',
            text1: 'Account registered!',
            text2: 'Thank you!',
            position: 'top',
            visibilityTime: 1500,
            topOffset: 50,
          });
          setFormSignup({
            email: '',
            password: '',
            phone_number: '',
          });
          setTimeout(() => {
            navigation.navigate('Login');
          }, 2000);
        })
        .catch(err => {
          Toast.show({
            type: 'error',
            text1: err.response.data.msg,
            position: 'top',
            visibilityTime: 1500,
            topOffset: 50,
          });
          setFormSignup({
            email: '',
            password: '',
            phone_number: '',
          });
        });
    }
  };

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../../../images/signup_bg.png')}
        resizeMode="cover"
        style={styles.image}>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.overlay}>
          <Text style={styles.title}>Sign Up</Text>
          {/* Form start */}
          <View style={styles.signupForm}>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
              <TextInput
                onChangeText={text =>
                  setFormSignup({...formSignup, email: text})
                }
                value={formSignup.email}
                placeholder="Enter your email adress"
                placeholderTextColor={'white'}
                keyboardType="email-address"
                autoCapitalize="none"
                style={{color: 'white', fontFamily: 'Poppins-Regular'}}
                ref={emailInput}
              />
              <View
                style={{
                  borderBottomWidth: 2,
                  borderBottomColor: '#9F9F9F',
                  marginTop: 1,
                }}
              />
            </View>
            {error.email !== '' ? (
              <Text style={styles.errorMsg}>{error.email}</Text>
            ) : null}
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <TextInput
                  onChangeText={text =>
                    setFormSignup({...formSignup, password: text})
                  }
                  value={formSignup.password}
                  placeholder="Enter your new password"
                  secureTextEntry={!isPasswordShown}
                  asterik
                  placeholderTextColor={'white'}
                  autoCapitalize="none"
                  style={{color: 'white', fontFamily: 'Poppins-Regular'}}
                  ref={passwordInput}
                />
                <TouchableOpacity
                  onPress={() => setIsPasswordShown(!isPasswordShown)}>
                  <Icon
                    name={isPasswordShown ? 'eye-off' : 'eye'}
                    size={24}
                    color="gray"
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  borderBottomWidth: 2,
                  borderBottomColor: '#9F9F9F',
                  marginTop: 1,
                }}
              />
            </View>
            {error.password !== '' ? (
              <Text style={styles.errorMsg}>{error.password}</Text>
            ) : null}
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
              <TextInput
                onChangeText={text =>
                  setFormSignup({...formSignup, phone_number: text})
                }
                value={formSignup.phone_number}
                placeholder="Enter your phone number"
                placeholderTextColor={'white'}
                keyboardType="phone-pad"
                style={{color: 'white', fontFamily: 'Poppins-Regular'}}
                ref={phoneInput}
              />
              <View
                style={{
                  borderBottomWidth: 2,
                  borderBottomColor: '#9F9F9F',
                  marginTop: 1,
                }}
              />
            </View>
            {error.phone_number !== '' ? (
              <Text style={styles.errorMsg}>{error.phone_number}</Text>
            ) : null}
            {/* Form end */}

            <View style={{marginTop: 30, paddingBottom: 50}}>
              <Pressable>
                <Text
                  style={[global.btn_primary, styles.login]}
                  onPress={handleSignup}>
                  Create Account
                </Text>
              </Pressable>
              <Pressable style={{marginTop: 20}}>
                <View style={{position: 'relative'}}>
                  <Image
                    source={require('../../../images/google_logo.png')}
                    style={styles.google}
                  />
                  <Text style={[global.btn_primary, styles.loginGoogle]}>
                    Create with Google
                  </Text>
                </View>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>

      <Toast />
    </View>
  );
}
