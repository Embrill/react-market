import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// ЗАПРОС НА БЕКЕНД
// Асинхронный action запрос
export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params, thunkAPI) => {
	const { categoryUrl, ascOrDescUrl, searchUrl, pageCurrent, sortSlice } = params;
	const response = await axios.get(
		`https://633e73820dbc3309f3b5d032.mockapi.io/photo_collections?page=${pageCurrent}&limit=4&${categoryUrl}&sortBy=${sortSlice.sortProperty}&order=${ascOrDescUrl}${searchUrl}`
	);

	return response.data;
});

// Состояния
const initialState = {
	items: [],
	status: 'loading', // loading | succes | error
};

const pizzasSlice = createSlice({
	name: 'pizza',
	initialState: initialState,

	reducers: {
		setItems: (state, action) => {
			state.items = action.payload;
		},
	},

	// Для запроса на бекенд
	extraReducers: {
		// Это сборник запроса, содержащий одновременно функции отлова ошибок, процесса загрузки и итогового завершения запроса
		// Выполнить действие внутри {} скобок
		// Если идет процес отправки на бекенд
		[fetchPizzas.pending]: (state, action) => {
			state.items = [];
			state.status = 'loading';
		},
		// Запрос fetchPizzas, если упешный запрос, то (fulfilled)
		[fetchPizzas.fulfilled]: (state, action) => {
			state.items = action.payload;
			state.status = 'succes';
		},
		// Если произошла ошибка
		[fetchPizzas.rejected]: (state, action) => {
			state.status = 'error';
			state.items = [];
			alert('Произошла ошибка при получении данных');
			console.error('Произошла ошибка при получении данных');
		},
	},
});

// Селектор
export const selectorPizzasData = (state) => state.pizzasSlice;
export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
