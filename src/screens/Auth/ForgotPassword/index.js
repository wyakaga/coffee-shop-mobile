/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {sendOTP, forgotPwd} from '../../../utils/https/auth';

import global from '../../../styles/global';
import styles from './style';

export default function ForgotPassword({navigation}) {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [error, setError] = useState({email: '', otp: '', password: ''});

  const handleOTP = () => {
    const invalid = {email: ''};

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/gm;

    if (!email) {
      invalid.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      invalid.email = 'Email is not valid';
    }

    setError({email: invalid.email});

    if (invalid.email === '') {
      sendOTP(email)
        .then(res => {
          Toast.show({
            type: 'success',
            text1: 'OTP has been sent',
            text2: 'Check your email inbox',
            position: 'top',
            visibilityTime: 1500,
            topOffset: 50,
          });
          setIsClicked(true);
        })
        .catch(err => {
          Toast.show({
            type: 'error',
            text1: err.response.data.msg,
            position: 'top',
            visibilityTime: 1500,
            topOffset: 50,
          });
        });
    }
  };

  const handleForgot = () => {
    const invalid = {otp: '', password: ''};

    if (!otp) {
      invalid.otp = 'OTP is required';
    }

    if (!password) {
      invalid.password = 'Password is required';
    }

    setError({otp: invalid.otp, password: invalid.password});

    if (invalid.otp === '' && invalid.password === '') {
      forgotPwd(email, otp, password)
        .then(res => {
          Toast.show({
            type: 'success',
            text1: 'Successfully changed password',
            position: 'top',
            visibilityTime: 1500,
            topOffset: 50,
          });
          setIsClicked(false);
        })
        .catch(err => {
          Toast.show({
            type: 'error',
            text1: err.response.data.msg,
            position: 'top',
            visibilityTime: 1500,
            topOffset: 50,
          });
        });
    }
  };

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        resizeMode="cover"
        source={require('../../../images/forgot_bg.png')}
        style={styles.image}>
        <View style={styles.overlay}>
          <View style={{backgroundColor: 'rgba(255,255,255,0.1)', flex: 1}}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.title}>Don’t {'\n'}Worry!</Text>
              <Text style={styles.desc}>
                Enter your email adress to get {'\n'}reset password link
              </Text>
              {isClicked === false ? (
                <SafeAreaView
                  style={{width: '90%', marginTop: 40, marginHorizontal: 20}}>
                  <View
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}>
                    <TextInput
                      onChangeText={text => setEmail(text)}
                      value={email}
                      placeholder="Enter your email adress"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      placeholderTextColor={'white'}
                      style={{color: 'white', fontFamily: 'Poppins-Regular'}}
                    />
                    <View
                      style={{
                        borderBottomWidth: 2,
                        borderBottomColor: '#9F9F9F',
                        marginTop: 5,
                      }}
                    />
                  </View>
                  {error.email !== '' ? (
                    <Text style={styles.errorMsg}>{error.email}</Text>
                  ) : null}
                </SafeAreaView>
              ) : (
                <SafeAreaView
                  style={{width: '90%', marginTop: 40, marginHorizontal: 20}}>
                  <View
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}>
                    <TextInput
                      onChangeText={text => setOtp(text)}
                      value={otp}
                      placeholder="Enter your OTP code"
                      placeholderTextColor={'white'}
                      autoCapitalize="none"
                      style={{color: 'white', fontFamily: 'Poppins-Regular'}}
                    />
                    <View
                      style={{
                        borderBottomWidth: 2,
                        borderBottomColor: '#9F9F9F',
                        marginTop: 5,
                      }}
                    />
                  </View>
                  {error.otp !== '' ? (
                    <Text style={styles.errorMsg}>{error.otp}</Text>
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
                        onChangeText={text => setPassword(text)}
                        value={password}
                        placeholder="Enter your new password"
                        secureTextEntry={!isPasswordShown}
                        asterik
                        placeholderTextColor={'white'}
                        autoCapitalize="none"
                        style={{color: 'white', fontFamily: 'Poppins-Regular'}}
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
                        marginTop: 5,
                      }}
                    />
                  </View>
                  {error.password !== '' ? (
                    <Text style={styles.errorMsg}>{error.password}</Text>
                  ) : null}
                </SafeAreaView>
              )}

              <Pressable
                onPress={isClicked === false ? handleOTP : handleForgot}>
                <Text style={[global.btn_primary, styles.send]}>Send</Text>
              </Pressable>

              <Text style={styles.desc}>Haven’t received any link?</Text>
              <Pressable onPress={() => setIsClicked(false)}>
                <Text style={[global.btn_primary, styles.resend]}>
                  Resend Link
                </Text>
              </Pressable>
            </ScrollView>
          </View>
        </View>
      </ImageBackground>
      <Toast />
    </View>
  );
}
