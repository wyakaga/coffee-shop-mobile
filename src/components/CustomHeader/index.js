import React from 'react';
import {Text, View, Image, Pressable} from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

import styles from './style';

function CustomHeader(props) {
  const navigation = useNavigation();

  const {isText, text, bgColor, textStyle} = props;

  return (
    <View style={[styles.navbar, {backgroundColor: bgColor}]}>
      <Pressable onPress={() => navigation.goBack()}>
        <Image
          source={require('../../images/chevron-left.png')}
          style={styles.chevron}
        />
      </Pressable>
      {isText === true ? <Text style={textStyle}>{text}</Text> : <></>}
    </View>
  );
}

export default CustomHeader;
