/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, Pressable, ImageBackground} from 'react-native';
import global from '../../../styles/global';
import styles from './style';

export default function GetStarted({navigation}) {
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../../../images/getstarted_bg.png')}
        resizeMode="cover"
        style={styles.image}>
        <View style={styles.overlay}>
          <View style={styles.textGroup}>
            <Text style={styles.title}>Welcome!</Text>
            <Text style={styles.desc}>
              Get a cup of coffee for free every {'\n'}sunday morning
            </Text>
          </View>
          <View style={styles.buttonGroup}>
            <Pressable>
              <Text
                style={[global.btn_primary, styles.signup]}
                onPress={() => {
                  navigation.navigate('Signup');
                }}>
                Create New Account
              </Text>
            </Pressable>
            <Pressable>
              <Text
                style={[global.btn_primary, styles.login]}
                onPress={() => {
                  navigation.navigate('Login');
                }}>
                Login
              </Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
