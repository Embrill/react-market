import { configureStore, combineReducers } from '@reduxjs/toolkit';
import filterSlice from './filter/slice';
import cartSlice from './cart/slice';
import pizzasSlice from './pizza/slice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// redux-persist для сохранения в local-storage
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

// Объединение reducers
const rootReducer = combineReducers({
  filterSlice,
  cartSlice,
  pizzasSlice,
});

// config persist
const persistConfig = {
  key: 'root',
  storage, // или storage: storage - тоже самое
  blacklist: ['filterSlice'], // Какие слайсы не будут сохраняться
  whitelist: ['cartSlice'], // Какие слайсы будут сохраняться
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch; // Export a hook that can be reused to resolve types
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
