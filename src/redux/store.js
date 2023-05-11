import {configureStore} from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import reducer from './slices';

const persistConfig = {
  key: 'coffee_shop',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: defaultMiddleware => {
    return defaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST, FLUSH, REHYDRATE, PAUSE, REGISTER, PURGE],
      },
    });
  },
});

export const persistor = persistStore(store);
export default store;
