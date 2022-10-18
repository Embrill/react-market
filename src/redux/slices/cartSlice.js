import { createSlice } from '@reduxjs/toolkit';

// Состояние для сортировки
const initialState = {
	totalPrice: 0,
	items: [],
};

const cartSlice = createSlice({
	name: 'cart',
	initialState: initialState,

	// filterSlice.actions
	reducers: {
		addItem: (state, action) => {
			state.items.push(action.payload);
		},
		removeItem: (state, action) => {
			state.items.filter((obj) => obj.id !== action.payload);
		},
		clearItems: (state) => {
			state.items = [];
		},
	},
});

export const { addItem, removeItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
