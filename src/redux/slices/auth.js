import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    save: (prevState, action) => {
      return {
        ...prevState,
        data: action.payload,
      };
    },
    delete: () => {
      return initialState;
    },
  },
});

export const authAction = {...authSlice.actions};
export default authSlice.reducer;
