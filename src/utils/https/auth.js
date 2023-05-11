import axios from 'axios';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import mime from 'mime';

const baseUrl = Config.API_URL;

export const postLogin = body => {
  const url = `${baseUrl}/auth`;
  return axios.post(url, body);
};

export const postRegist = body => {
  const url = `${baseUrl}/users`;
  return axios.post(url, body);
};

export const sendOTP = email => {
  const url = `${baseUrl}/auth/otp`;
  const body = {email};
  return axios.patch(url, body);
};

export const forgotPwd = (email, otp, password) => {
  const url = `${baseUrl}/auth/forgot`;
  const body = {email, otp, password};
  return axios.patch(url, body);
};

export const getUserById = (id, token) => {
  const url = `${baseUrl}/users/${id}`;
  const config = {headers: {Authorization: `Bearer ${token}`}};
  return axios.get(url, config);
};

export const patchUserProfile = (
  id,
  token,
  address,
  display_name,
  birth_date,
  gender,
  img,
) => {
  const body = new FormData();

  body.append('address', address);
  body.append('display_name', display_name);
  body.append('birth_date', birth_date);
  body.append('gender', gender);

  // body.append('img', img);

  const newImgUri = img.replace('file:///', 'file://');

  // console.log(img);

  body.append('img', {
    uri: img,
    type: mime.getType(newImgUri),
    name: newImgUri.split('/').pop(),
  });

  const url = `${baseUrl}/users/${id}`;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  };
  return axios.patch(url, body, config);
};

export const logout = token => {
  const url = `${baseUrl}/auth/logout`;
  const config = {headers: {Authorization: `Bearer ${token}`}};
  return axios.patch(url, null, config);
};

export const editPassword = (body, token) => {
  const url = `${baseUrl}/auth`;
  const config = {headers: {Authorization: `Bearer ${token}`}};
  return axios.patch(url, body, config);
};

export const getUserData = async setState => {
  try {
    const value = await AsyncStorage.getItem('@userData');
    if (value !== null) {
      setState(JSON.parse(value));
    }
  } catch (error) {
    console.log(error);
  }
};
