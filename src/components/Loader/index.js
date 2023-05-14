import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import styles from './style';

const Loader = ({isLoading}) => {
  if (!isLoading) {
    return null;
  }

  return (
    <View style={styles.overlay}>
      <View style={styles.spinnerContainer}>
        <ActivityIndicator
          size="large"
          color="#FFBA33"
          style={styles.spinner}
        />
      </View>
    </View>
  );
};

export default Loader;
