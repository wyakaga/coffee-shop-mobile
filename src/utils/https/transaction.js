import axios from 'axios';
import Config from 'react-native-config';

const baseUrl = Config.API_URL;

export const getHistory = token => {
  const url = `${baseUrl}/history`;
  const config = {headers: {Authorization: `Bearer ${token}`}};
  return axios.get(url, config);
};

export const createTransaction = (token, body) => {
  const url = `${baseUrl}/history/`;
  const config = {headers: {Authorization: `Bearer ${token}`}};
  return axios.post(url, body, config);
};
