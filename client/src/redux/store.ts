import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import {
  persistReducer,
  FLUSH,
  PAUSE,
  PERSIST,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import api from './api';

const authPersistConfig = {
  key: 'auth',
  storage: storage,
};

export interface RootState {
  auth: AuthState;
}

const persistedAuthReducer = persistReducer(authPersistConfig, authSlice);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware),
});

const persistor = persistStore(store);

export { store, persistor };
