import {combineReducers} from '@reduxjs/toolkit';

import cartSlice from './cart';
import authSlice from './auth';

const reducer = combineReducers({
  cart: cartSlice,
  auth: authSlice,
});

export default reducer;
