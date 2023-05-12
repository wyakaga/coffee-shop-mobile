/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, Image, Pressable, TextInput} from 'react-native';
import global from '../../../styles/global';
import styles from './style';
import {useNavigation} from '@react-navigation/native';

export default function Chat() {
  const navigation = useNavigation();
  const staff = [
    {
      name: 'Cheryn',
      chat: 'What beans do you use for making cold brew?',
      time: 'yesterday',
      profile_picture: '../../../images/chat/cheryn.png',
    },
    {
      name: 'Jason',
      chat: 'What is pinky promise? Is it made from coffee or strawberry?',
      time: '2 days ago',
      profile_picture: '../../../images/chat/jason.png',
    },
  ];

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
      <View style={{justifyContent: 'flex-start', width: '100%'}}>
        <Text style={styles.header}>Chat</Text>
      </View>
      <View style={{marginTop: 35}}>
        <Text style={styles.chooseStaff}>
          Choose a staff you want to talk with
        </Text>
      </View>
      {/* staff start */}
      <View
        style={{
          flexDirection: 'row',
          marginTop: 35,
          justifyContent: 'space-around',
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
          }}
        />
        <Image
          source={require('../../../images/chat/lou.png')}
          style={{
            width: 80,
            height: 80,
            borderRadius: 60,
            borderWidth: 1.5,
            borderColor: '#6A4029',
          }}
        />
        <Image
          source={require('../../../images/chat/jason.png')}
          style={{
            width: 80,
            height: 80,
            borderRadius: 60,
            borderWidth: 1.5,
            borderColor: '#6A4029',
          }}
        />
      </View>

      <View style={{position: 'relative'}}>
        <Image
          source={require('../../../images/search.png')}
          style={styles.searchIcon}
        />
        <TextInput style={styles.searchInput} placeholder="Search Chat" />
      </View>

      {/* staff end */}
      <View style={styles.cardWrap}>
        <Pressable
          style={styles.card}
          onPress={() => {
            navigation.navigate('ChatRoom');
          }}>
          <View style={{width: '20%'}}>
            <Image
              source={require('../../../images/chat/cheryn.png')}
              style={styles.hero}
            />
          </View>
          <View
            style={{
              width: '70%',
              justifyContent: 'space-around',
              height: '100%',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                alignItems: 'center',
                paddingRight: 10,
              }}>
              <Text style={{fontSize: 16, fontFamily: 'Poppins-Bold'}}>
                {staff[0].name}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: 'Poppins-Regular',
                  color: '#9A9A9D',
                }}>
                {staff[0].time}
              </Text>
            </View>
            <Text style={{fontFamily: 'Poppins-Regular'}}>{staff[0].chat}</Text>
          </View>
        </Pressable>

        <View style={styles.card}>
          <View style={{width: '20%'}}>
            <Image
              source={require('../../../images/chat/jason.png')}
              style={styles.hero}
            />
          </View>
          <View
            style={{
              width: '70%',
              justifyContent: 'space-around',
              height: '100%',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                alignItems: 'center',
                paddingRight: 10,
              }}>
              <Text style={{fontSize: 16, fontFamily: 'Poppins-Bold'}}>
                {staff[1].name}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: 'Poppins-Regular',
                  color: '#9A9A9D',
                }}>
                {staff[1].time}
              </Text>
            </View>
            <Text style={{fontFamily: 'Poppins-Regular'}}>{staff[1].chat}</Text>
          </View>
        </View>
      </View>

      <Text
        style={{
          color: '#9A9A9D',
          marginTop: 50,
          fontFamily: 'Poppins-Regular',
        }}>
        You have no conversation left
      </Text>
    </View>
  );
}
