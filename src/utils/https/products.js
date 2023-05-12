import axios from 'axios';
import Config from 'react-native-config';

const baseUrl = Config.API_URL;

export const getProducts = (category, order, search, limit, page) => {
  let url = `${baseUrl}/products`;

  if (category) {
    url += `?category=${category}`;
  }
  if (order) {
    url += `${category ? '&' : '?'}order=${order}`;
  }
  if (search) {
    url += `${category || order ? '&' : '?'}search=${search}`;
  }
  if (limit) {
    url += `${category || order || search ? '&' : '?'}limit=${limit}`;
  }
  if (page) {
    url += `${category || order || search || limit ? '&' : '?'}page=${page}`;
  }

  return axios.get(url);
};

export const getProductDetails = id => {
  const url = `${baseUrl}/products/${id}`;
  return axios.get(url);
};
