/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
  FlatList,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Fontisto from 'react-native-vector-icons/Fontisto';

import global from '../../../styles/global';
import styles from './style';

export default function ChatRoom() {
  const navigation = useNavigation();

  return (
    <View
      style={[
        global.px_container,
        {
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#F2F2F2',
          flex: 1,
        },
      ]}>
      <Fontisto
        name="angle-left"
        size={22}
        style={{position: 'absolute', left: 40, top: 85}}
        onPress={() => {
          alert('press');
        }}
      />
      <View
        style={{
          flexDirection: 'column',
          marginTop: 25,
          alignItems: 'center',
          width: '100%',
        }}>
        <Image
          source={require('../../../images/chat/cheryn.png')}
          style={{
            width: 80,
            height: 80,
            borderRadius: 60,
            borderWidth: 1.5,
            borderColor: '#6A4029',
            marginTop: 30,
          }}
        />
        <Text style={{fontSize: 17, fontWeight: '700', marginTop: 20}}>
          Cheryn
        </Text>
      </View>
      <View style={styles.lineBottom} />

      {/* Chat start */}
      <View style={[styles.cardWrap, {marginTop: 15}]}>
        <View style={{flexDirection: 'row'}}>
          <View style={{width: '20%'}}>
            <Image
              source={require('../../../images/chat/cheryn.png')}
              style={styles.hero}
            />
          </View>
          <View
            style={[
              styles.card,
              {width: '70%', backgroundColor: '#6A4029', padding: 15},
            ]}>
            <Text
              style={{color: 'white', lineHeight: 20, textAlign: 'justify'}}>
              Hey, welcome to Coffee Time! Today is Sunday and you know what?
              You will get a cup of coffee free only at 7 to 9 AM. If you still
              have some questions to ask, let me know. Have a wonderful day!
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            width: '100%',
            paddingHorizontal: 22,
          }}>
          <Text style={{marginTop: 13, color: '#9F9F9F'}}>12.00 PM</Text>
        </View>
      </View>

      <View style={styles.cardWrap}>
        <View style={{flexDirection: 'row'}}>
          <View style={[styles.card, {width: '70%', padding: 15}]}>
            <Text style={{lineHeight: 20, textAlign: 'justify'}}>
              Hey, what beans do you use for making cold brew? Can I request the
              beans?
            </Text>
          </View>
          <View style={{width: '20%', marginLeft: 15}}>
            <Image
              source={require('../../../images/ava.webp')}
              style={styles.hero}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            width: '100%',
            paddingHorizontal: 22,
          }}>
          <Text style={{marginTop: 13, color: '#9F9F9F'}}>12.04 PM</Text>
        </View>
      </View>

      <View style={styles.cardWrap}>
        <View style={{flexDirection: 'row'}}>
          <View style={{width: '20%'}}>
            <Image
              source={require('../../../images/chat/cheryn.png')}
              style={styles.hero}
            />
          </View>
          <View
            style={[
              styles.card,
              {width: '70%', backgroundColor: '#6A4029', padding: 15},
            ]}>
            <Text
              style={{color: 'white', lineHeight: 20, textAlign: 'justify'}}>
              Thank you for asking. Yup, you can request the beans, what beans
              do you like?
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            width: '100%',
            paddingHorizontal: 22,
          }}>
          <Text style={{marginTop: 13, color: '#9F9F9F'}}>12.10 PM</Text>
        </View>
      </View>
      {/* Chat end */}

      <View style={{position: 'absolute', bottom: 20}}>
        <Image
          source={require('../../../images/camera.png')}
          style={styles.cameraIcon}
        />
        <TextInput style={styles.searchInput} placeholder="Type a message..." />
      </View>
    </View>
  );
}
