import { createSlice } from '@reduxjs/toolkit';

// Состояние для сортировки
const initialState = {
	categoryId: 0,
	sortSlice: {
		name: 'Популярности',
		sortProperty: 'rating',
	},
	pageCurrent: 1,
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
			state.sortSlice = action.payload;
		},
		setPageCurrent: (state, action) => {
			state.pageCurrent = action.payload;
		},
	},
});

export const { setCategoryId, setSort, setPageCurrent } = filterSlice.actions;

export default filterSlice.reducer;
