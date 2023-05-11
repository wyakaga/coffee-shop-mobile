import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  delivery: '',
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.cart.find(item => item.id === action.payload.id);
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.cart.push({...action.payload, quantity: 1});
      }
    },
    removeFromCart: (state, action) => {
      const removeFromCart = state.cart.filter(
        item => item.id !== action.payload.id,
      );
      state.cart = removeFromCart;
    },
    incrementQuantity: (state, action) => {
      const itemInCart = state.cart.find(item => item.id === action.payload.id);
      itemInCart.quantity++;
    },
    decrementQuantity: (state, action) => {
      const itemInCart = state.cart.find(item => item.id === action.payload.id);
      if (itemInCart === 1) {
        const removeFromCart = state.cart.filter(
          item => item.id !== action.payload.id,
        );
        state.cart = removeFromCart;
      } else {
        itemInCart.quantity--;
      }
    },
    deliveryMethod: (prevState, action) => {
      return {...prevState, delivery: action.payload};
    },
    resetCart: () => {
      return initialState;
    },
  },
});

export const cartAction = {...cartSlice.actions};
export default cartSlice.reducer;
