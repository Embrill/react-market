import { createSlice } from '@reduxjs/toolkit';

// Состояние для сортировки
const initialState = {
	categoryId: 0,
	sortList: {
		name: 'Популярности',
		sortProperty: 'rating',
	},
};

const filterSlice = createSlice({
	name: 'filters',
	initialState: initialState,

	// filterSlice.actions
	reducers: {
		setCategoryId: (state, action) => {
			state.categoryId = action.payload;
		},
		setSort: (state, action) => {
			state.sortList = action.payload;
		},
	},
});

export const { setCategoryId, setSort } = filterSlice.actions;

export default filterSlice.reducer;
