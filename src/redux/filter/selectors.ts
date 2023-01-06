import { RootState } from '../store';

// Селектор
export const selectorFilter = (state: RootState) => state.persistedReducer.filterSlice;
