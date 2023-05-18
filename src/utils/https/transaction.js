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

export const deleteHistory = (token, historyId) => {
  const url = `${baseUrl}/history/${historyId}`;
  const config = {headers: {Authorization: `Bearer ${token}`}};
  return axios.delete(url, config);
};

export const getPendingTransaction = token => {
  const url = `${baseUrl}/history/status`;
  const config = {headers: {Authorization: `Bearer ${token}`}};
  return axios.get(url, config);
};

export const manageTransaction = (token, historyId) => {
  const url = `${baseUrl}/history/change-status/${historyId}`;
  const config = {headers: {Authorization: `Bearer ${token}`}};
  return axios.patch(url, null, config);
};

export const getMonthlyReport = token => {
  const url = `${baseUrl}/history/monthly-report`;
  const config = {headers: {Authorization: `Bearer ${token}`}};
  return axios.get(url, config);
};

export const getDailyAverage = token => {
  const url = `${baseUrl}/history/daily-transactions`;
  const config = {headers: {Authorization: `Bearer ${token}`}};
  return axios.get(url, config);
};
