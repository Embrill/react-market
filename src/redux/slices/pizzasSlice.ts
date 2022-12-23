import { RootState } from './../store';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { SortListItem } from '../../components/Sort';

// ЗАПРОС НА БЕКЕНД
// Асинхронный action запрос
interface IParams {
  categoryUrl: string;
  ascOrDescUrl: string;
  searchUrl: string;
  pageCurrent: number;
  sortSlice: SortListItem;
}

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params: IParams, thunkAPI) => {
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
  extraReducers: (builder) => {
    // Это сборник запроса, содержащий одновременно функции отлова ошибок, процесса загрузки и итогового завершения запроса
    // Выполнить действие внутри {} скобок
    // Если идет процес отправки на бекенд
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.items = [];
      state.status = 'loading';
    });
    // Запрос fetchPizzas, если упешный запрос, то (fulfilled)
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = 'succes';
    });
    // Если произошла ошибка
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = 'error';
      state.items = [];
      console.error('Произошла ошибка при получении данных');
    });
  },
});

// Селектор
export const selectorPizzasData = (state: RootState) => state.pizzasSlice;
export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
