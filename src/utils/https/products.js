import axios from 'axios';
import Config from 'react-native-config';
import mime from 'mime';

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

export const createProduct = (
  name,
  price,
  img,
  category,
  description,
  token,
) => {
  const body = new FormData();

  body.append('name', name);
  body.append('price', price);
  body.append('img', {
    uri: img,
    name: img.split('/').pop(),
    type: mime.getType(img),
  });
  body.append('category_id', category);
  body.append('description', description);

  const url = `${baseUrl}/products`;

  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  };

  return axios.post(url, body, config);
};

export const editProduct = (img, name, price, description, id, token) => {
  const body = new FormData();

  if (img) {
    body.append('img', {
      uri: img,
      name: img.split('/').pop(),
      type: mime.getType(img),
    });
  }
  body.append('name', name);
  body.append('price', price);
  body.append('description', description);

  const url = `${baseUrl}/products/${id}`;

  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  };

  return axios.patch(url, body, config);
};
