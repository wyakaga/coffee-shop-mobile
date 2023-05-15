/* eslint-disable react-native/no-inline-styles */
import {React, useEffect, useState, useMemo} from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
  TextInput,
  ToastAndroid,
} from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import {useNavigation} from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {useSelector} from 'react-redux';
import {DateTime} from 'luxon';

import {getUserById, patchUserProfile} from '../../utils/https/auth';

import Loader from '../../components/Loader';

import global from '../../styles/global';
import styles from './style';

export default function EditProfile() {
  const navigation = useNavigation();

  // User Profile Data
  const [userData, setUserData] = useState([]);
  // User profile form update start
  const [editProfileForm, setEditProfilForm] = useState({
    display_name: userData.display_name || '',
    birth_date: '',
    address: '',
    gender: '',
    img: '',
  });
  // radio button
  const [selectedId, setSelectedId] = useState(
    userData.length && userData.gender !== 'male' ? '2' : '1',
  );
  // date picker
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // Image picker
  // const [imagePreview, setImagePreview] = useState(null);

  const id = useSelector(state => state.auth.data?.data?.id);

  const token = useSelector(state => state.auth.data?.token);

  function getDayWithSuffix(day) {
    if (day >= 11 && day <= 13) {
      return `${day}th`;
    } else {
      const lastDigit = day % 10;
      switch (lastDigit) {
        case 1:
          return `${day}st`;
        case 2:
          return `${day}nd`;
        case 3:
          return `${day}rd`;
        default:
          return `${day}th`;
      }
    }
  }

  useEffect(() => {
    setIsLoading(true);
    getUserById(id, token)
      .then(res => {
        setUserData(res.data.data[0]);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isImg = () => {
    if (userData && userData.img) {
      return (
        <Image
          source={{
            uri: userData.img,
          }}
          style={styles.hero}
        />
      );
    }
    return (
      <Image
        source={require('../../images/profile-placeholder.webp')}
        style={styles.hero}
      />
    );
  };

  const radioButtons = useMemo(
    () => [
      {
        id: '1',
        label: 'Male',
        value: 'Male',
      },
      {
        id: '2',
        label: 'Female',
        value: 'Female',
      },
    ],
    [],
  );

  const onRadioPress = value => {
    setSelectedId(value);
    let genderValue = value === '2' ? 'female' : 'male';
    setEditProfilForm({...editProfileForm, gender: genderValue});
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    const formattedDate = DateTime.fromISO(currentDate.toISOString()).toFormat(
      'yyyy-MM-dd',
    );
    setShow(false);
    setDate(currentDate);
    setEditProfilForm({...editProfileForm, birth_date: formattedDate});
    setIsChanged(true);
  };

  const showMode = currentMode => {
    // eslint-disable-next-line no-undef
    if (Platform.OS === 'android') {
      setShow(false);
      // for iOS, add a button that closes the picker
    }
    setShow(true);
    setMode(currentMode);
  };
  const showDatepicker = () => {
    showMode('date');
  };

  // Handle submit
  const handleSubmit = () => {
    setIsChanged(false);

    patchUserProfile(
      id,
      token,
      editProfileForm.address,
      editProfileForm.display_name,
      editProfileForm.birth_date,
      editProfileForm.gender,
      editProfileForm.img,
    )
      .then(res => {
        ToastAndroid.show('Update success!', ToastAndroid.SHORT);
        setTimeout(() => {
          navigation.navigate('Profile');
        }, 500);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View
      style={[
        global.px_container,
        {
          display: 'flex',
          alignItems: 'flex-start',
          backgroundColor: 'white',
          flex: 1,
        },
      ]}>
      {isLoading && <Loader isLoading={isLoading} />}

      {/* Bio start */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: '100%',
          marginTop: 20,
          marginBottom: 10,
          position: 'relative',
        }}>
        {/* {isImg()} */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            width: '100%',
            marginTop: 20,
            marginBottom: 20,
            position: 'relative',
          }}>
          {isImg()}
          <Pressable
            onPress={() => {
              navigation.navigate('EditUserImage');
            }}>
            <Image
              source={require('../../images/edit.png')}
              style={styles.edit}
            />
          </Pressable>
        </View>
      </View>
      {/* Bio end */}

      {/* Edit profile start */}
      <ScrollView showsVerticalScrollIndicator={false} style={{width: '100%'}}>
        <Text style={styles.input}>Name :</Text>
        <TextInput
          onChangeText={text => {
            setEditProfilForm({...editProfileForm, display_name: text});
          }}
          defaultValue={
            userData.display_name === null ? 'Anonymous' : userData.display_name
          }
        />
        <View
          style={{
            borderBottomWidth: 0.8,
            borderBottomColor: '#9F9F9F',
            marginTop: 10,
          }}
        />

        <RadioGroup
          radioButtons={radioButtons}
          onPress={value => onRadioPress(value)}
          selectedId={selectedId}
          containerStyle={{marginTop: 20}}
          layout="row"
        />

        <Text style={styles.input}>Email Adress :</Text>
        <TextInput
          keyboardType="email-address"
          autoCapitalize="none"
          defaultValue={
            userData.email === null ? 'anonymous@anonymous.com' : userData.email
          }
        />
        <View
          style={{
            borderBottomWidth: 0.8,
            borderBottomColor: '#9F9F9F',
            marginTop: 10,
          }}
        />

        <Text style={styles.input}>Phone Number :</Text>
        <TextInput
          // onChangeText={text =>
          //   setEditProfilForm({...editProfileForm, phone_number: text})
          // }
          keyboardType="phone-pad"
          // placeholder="Enter your phone number"
          defaultValue={
            userData.phone_number === ''
              ? 'No Phone Number'
              : userData.phone_number
          }
        />
        <View
          style={{
            borderBottomWidth: 0.8,
            borderBottomColor: '#9F9F9F',
            marginTop: 10,
          }}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View>
            <Text style={styles.input}>Date of Birth</Text>
            <TextInput
              defaultValue={
                userData.birth_date === null
                  ? DateTime.fromJSDate(date).toFormat('MMMM ') +
                    getDayWithSuffix(DateTime.fromJSDate(date).day) +
                    DateTime.fromJSDate(date).toFormat(', yyyy')
                  : isChanged === true
                  ? DateTime.fromJSDate(date).toFormat('MMMM ') +
                    getDayWithSuffix(DateTime.fromJSDate(date).day) +
                    DateTime.fromJSDate(date).toFormat(', yyyy')
                  : DateTime.fromISO(userData.birth_date).toFormat('MMMM ') +
                    getDayWithSuffix(
                      DateTime.fromISO(userData.birth_date).day,
                    ) +
                    DateTime.fromISO(userData.birth_date).toFormat(', yyyy')
              }
            />
          </View>
          <Pressable onPress={showDatepicker}>
            <Fontisto name="date" color={'#6A4029'} size={24} />
          </Pressable>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              onChange={onChange}
            />
          )}
        </View>

        <View
          style={{
            borderBottomWidth: 0.8,
            borderBottomColor: '#9F9F9F',
            marginTop: 10,
          }}
        />

        <Text style={styles.input}>Delivery Adress :</Text>
        <TextInput
          onChangeText={text =>
            setEditProfilForm({...editProfileForm, address: text})
          }
          // placeholder="Enter your address"
          defaultValue={
            userData.address === null
              ? 'No Address Available'
              : userData.address
          }
        />
        <View
          style={{
            borderBottomWidth: 0.8,
            borderBottomColor: '#9F9F9F',
            marginTop: 10,
          }}
        />
        <Pressable onPress={handleSubmit}>
          <Text style={[global.btn_primary, styles.saveChange]}>
            Save and Update
          </Text>
        </Pressable>
      </ScrollView>
      {/* Edit profile end */}
    </View>
  );
}
