import { RootState } from '../store';

// Селектор, который помогает нам сокращать код - is the best practice
export const selectorCart = (state: RootState) => state.persistedReducer.cartSlice;
