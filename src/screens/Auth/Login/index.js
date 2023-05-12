/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
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
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {postLogin} from '../../../utils/https/auth';
import {authAction} from '../../../redux/slices/auth';

import global from '../../../styles/global';
import styles from './style';

export default function Login() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [formLogin, setFormLogin] = useState({
    email: '',
    password: '',
  });
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [error, setError] = useState({email: '', password: ''});

  const {emailInput, passwordInput} = useRef();

  const handleLogin = () => {
    const invalid = {email: '', password: ''};

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/gm;

    if (!formLogin.email) {
      invalid.email = 'Email is required';
    } else if (!emailRegex.test(formLogin.email)) {
      invalid.email = 'Email is not valid';
    }

    if (!formLogin.password) {
      invalid.password = 'Password is required';
    }

    setError({email: invalid.email, password: invalid.password});

    if (invalid.email === '' && invalid.password === '') {
      postLogin(formLogin)
        .then(res => {
          dispatch(authAction.save(res.data));
          // ToastAndroid.show('Successfully login.', ToastAndroid.SHORT)
          Toast.show({
            type: 'success',
            text1: 'Login success!',
            text2: 'Have a good day 👋',
            position: 'top',
            visibilityTime: 1500,
            topOffset: 50,
          });
          setTimeout(() => {
            navigation.navigate('Home');
          }, 2000);
          setFormLogin({
            email: '',
            password: '',
          });
        })
        .catch(err => {
          Toast.show({
            type: 'error',
            text1: err.response.data.msg,
            position: 'top',
            visibilityTime: 1500,
            topOffset: 50,
          });
          // ToastAndroid.show(err.response.data.message, ToastAndroid.SHORT)
          setFormLogin({
            email: '',
            password: '',
          });
        });
    }
  };

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../../../images/login_bg.png')}
        style={styles.image}>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.overlay}>
          <Text style={styles.title}>Login</Text>
          <View style={styles.loginForm}>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
              <TextInput
                onChangeText={text => setFormLogin({...formLogin, email: text})}
                value={formLogin.email}
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
                    setFormLogin({...formLogin, password: text})
                  }
                  value={formLogin.password}
                  placeholder="Enter your password"
                  secureTextEntry={!isPasswordShown}
                  asterik
                  autoCapitalize="none"
                  placeholderTextColor={'white'}
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
            <Text
              style={{
                color: '#fff',
                // fontWeight: '700',
                fontFamily: 'Poppins-Bold',
                textDecorationLine: 'underline',
                marginTop: 10,
              }}
              onPress={() => {
                navigation.navigate('ForgotPassword');
              }}>
              Forgot password?
            </Text>
          </View>

          <View style={styles.buttonGroup}>
            <Pressable onPress={handleLogin}>
              <Text style={[global.btn_primary, styles.login]}>Login</Text>
            </Pressable>
            <View style={styles.borderGroup}>
              <View style={styles.borders} />
              <Text style={styles.borderText}>or login with</Text>
              <View style={styles.borders} />
            </View>
            <Pressable style={{marginTop: 20}}>
              <View style={{position: 'relative'}}>
                <Image
                  source={require('../../../images/google_logo.png')}
                  style={styles.google}
                />
                <Text style={[global.btn_primary, styles.loginGoogle]}>
                  Login with Google
                </Text>
              </View>
            </Pressable>
          </View>
        </ScrollView>
      </ImageBackground>
      <Toast />
    </View>
  );
}
