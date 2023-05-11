/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {editPassword} from '../../utils/https/auth';

import global from '../../styles/global';
import styles from './style';

const EditPwd = () => {
  const navigation = useNavigation();

  const token = useSelector(state => state.auth.data?.token);

  const [formEditPwd, setFormEditPwd] = useState({
    oldPwd: '',
    newPwd: '',
  });
  const [isPasswordShown1, setIsPasswordShown1] = useState(false);
  const [isPasswordShown2, setIsPasswordShown2] = useState(false);
  const [error, setError] = useState({oldPwd: '', newPwd: ''});

  const {oldPasswordInput, newPasswordInput} = useRef();

  const handleEditPwd = () => {
    const invalid = {oldPwd: '', newPwd: ''};

    if (!formEditPwd.oldPwd) {
      invalid.oldPwd = 'Old password is required';
    }

    if (!formEditPwd.newPwd) {
      invalid.password = 'New password is required';
    }

    setError({
      oldPwd: invalid.oldPwd,
      newPwd: invalid.newPwd,
    });

    if (invalid.oldPwd === '' && invalid.newPwd === '') {
      editPassword(formEditPwd, token)
        .then(res => {
          Toast.show({
            type: 'success',
            text1: 'Succesfully edit password',
            position: 'top',
            visibilityTime: 1500,
            topOffset: 50,
          });
          setTimeout(() => {
            navigation.navigate('Profile');
          }, 2000);
          setFormEditPwd({
            oldPwd: '',
            newPwd: '',
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
          setFormEditPwd({
            oldPwd: '',
            newPwd: '',
          });
        });
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.overlay}>
      <View style={styles.loginForm}>
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
                setFormEditPwd({...formEditPwd, oldPwd: text})
              }
              value={formEditPwd.oldPwd}
              placeholder="Enter your old password"
              secureTextEntry={!isPasswordShown1}
              asterik
              autoCapitalize="none"
              placeholderTextColor={'black'}
              style={{color: 'black'}}
              ref={oldPasswordInput}
            />
            <TouchableOpacity
              onPress={() => setIsPasswordShown1(!isPasswordShown1)}>
              <Icon
                name={isPasswordShown1 ? 'eye-off' : 'eye'}
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
        {error.oldPwd !== '' ? (
          <Text style={styles.errorMsg}>{error.oldPwd}</Text>
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
                setFormEditPwd({...formEditPwd, newPwd: text})
              }
              value={formEditPwd.newPwd}
              placeholder="Enter your new password"
              secureTextEntry={!isPasswordShown2}
              asterik
              autoCapitalize="none"
              placeholderTextColor={'black'}
              style={{color: 'black'}}
              ref={newPasswordInput}
            />
            <TouchableOpacity
              onPress={() => setIsPasswordShown2(!isPasswordShown2)}>
              <Icon
                name={isPasswordShown2 ? 'eye-off' : 'eye'}
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
        {error.newPwd !== '' ? (
          <Text style={styles.errorMsg}>{error.newPwd}</Text>
        ) : null}
      </View>

      <View style={styles.buttonGroup}>
        <Pressable onPress={handleEditPwd}>
          <Text style={[global.btn_primary, styles.login]}>Change</Text>
        </Pressable>
      </View>
      <Toast />
    </ScrollView>
  );
};

export default EditPwd;
