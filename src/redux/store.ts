import { configureStore } from '@reduxjs/toolkit';
import filterSlice from './slices/filterSlice';
import cartSlice from './slices/cartSlice';
import pizzasSlice from './slices/pizzasSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    filterSlice,
    cartSlice,
    pizzasSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch; // Export a hook that can be reused to resolve types
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
