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
		// Добавление товара в корзину
		addItem: (state, action) => {
			const findItem = state.items.find((obj) => obj.id === action.payload.id);

			// При дублировании товара, то добавляется count, а не дублируется новый item
			if (findItem) {
				findItem.count++;
			} else {
				state.items.push({
					...action.payload,
					count: 1,
				});
			}

			// Общая сумма в корзину
			state.totalPrice = state.items.reduce((sum, obj) => {
				return obj.price * obj.count + sum;
			}, 0);
		},

		minusItem: (state, action) => {
			const findItem = state.items.find((obj) => obj.id === action.payload);
			if (findItem) {
				findItem.count--;
				// Вычисление суммы при удалении товара из корзины
				state.totalPrice = state.items.reduce((sum, obj) => {
					return obj.price * obj.count + sum;
				}, 0);
			}
		},

		removeItem: (state, action) => {
			state.items = state.items.filter((obj) => obj.id !== action.payload);

			// Вычисление суммы при удалении КАТЕГОРИИ товара из корзины
			state.totalPrice = state.items.reduce((sum, obj) => {
				return obj.price * obj.count + sum;
			}, 0);
		},

		clearItems: (state) => {
			state.items = [];
			state.totalPrice = 0;
		},
	},
});

// Селектор, который помогает нам сокращать код - is the best practice
export const selectorCart = (state) => state.cartSlice;

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
