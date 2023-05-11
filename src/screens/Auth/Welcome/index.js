/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, Pressable, ImageBackground} from 'react-native';

import global from '../../../styles/global';
import styles from './style';

export default function Welcome({navigation}) {
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../../../images/welcome_bg.png')}
        resizeMode="cover"
        style={styles.image}>
        <View style={styles.overlay}>
          <Text style={styles.text}>Coffee for Everyone</Text>
          <Pressable style={{paddingBottom: 30}}>
            <Text
              style={[global.btn_primary, styles.getStarted]}
              onPress={() => {
                navigation.navigate('GetStarted');
              }}>
              Get started
            </Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
}
