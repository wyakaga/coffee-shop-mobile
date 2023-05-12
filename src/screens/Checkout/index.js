/* eslint-disable react-native/no-inline-styles */
import React, {useState, useMemo} from 'react';
import {Text, View, ScrollView, Pressable} from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {cartAction} from '../../redux/slices/cart';

import global from '../../styles/global';
import styles from './style';

export default function DeliveryMethod({route}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {totalPriceState} = route.params;

  const [selectedId, setSelectedId] = useState('');

  const radioButtons = useMemo(
    () => [
      {
        id: '1',
        label: 'Door delivery',
        value: '1',
      },
      {
        id: '2',
        label: 'Pick up at store',
        value: '2',
      },
      {
        id: '3',
        label: 'Dine in',
        value: '3',
      },
    ],
    [],
  );

  function onPressRadioButton(value) {
    setSelectedId(value);
  }

  const handleConfirm = () => {
    navigation.navigate('Payment', {totalPriceState: totalPriceState});
    dispatch(cartAction.deliveryMethod(selectedId));
  };

  return (
    <ScrollView
      style={[
        global.px_container,
        {
          display: 'flex',
          // alignItems: 'flex-start',
          backgroundColor: '#F2F2F2',
          flex: 1,
        },
      ]}>
      <Text style={styles.title}>Delivery</Text>

      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 30}}>
        <Text style={styles.address}>Address details</Text>
        <Text
          style={styles.change}
          onPress={() => navigation.navigate('EditProfile')}>
          change
        </Text>
      </View>
      <View style={[styles.card]}>
        <Text style={{fontSize: 17, fontFamily: 'Poppins-Medium'}}>
          Iskandar Street
        </Text>
        <Text style={{fontSize: 15, fontFamily: 'Poppins-Regular'}}>
          Km 5 refinery road oppsite republic road, effurun, Jakarta
        </Text>
        <Text style={{fontSize: 15, fontFamily: 'Poppins-Regular'}}>
          +62 81348287878
        </Text>
      </View>

      <Text style={[styles.delivery, {marginTop: 30}]}>Delivery methods</Text>
      <View style={[styles.card, {height: 135}]}>
        <RadioGroup
          radioButtons={radioButtons}
          onPress={value => onPressRadioButton(value)}
          containerStyle={styles.radioButtons}
          selectedId={selectedId}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 35,
          justifyContent: 'space-between',
          width: '100%',
        }}>
        <Text style={styles.total}>Total</Text>
        <Text style={styles.price}>{`IDR ${totalPriceState.toLocaleString(
          'id-ID',
        )}`}</Text>
      </View>

      <Pressable>
        <Text
          style={[global.btn_primary, styles.confirmAndCheckout]}
          onPress={handleConfirm}>
          Confirm and Checkout
        </Text>
      </Pressable>
    </ScrollView>
  );
}
