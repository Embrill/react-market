import { RootState } from '../store';

// Селектор
export const selectorPizzasData = (state: RootState) => state.persistedReducer.pizzasSlice;
