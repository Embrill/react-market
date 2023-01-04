import { RootState } from './../store';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { SortListItem } from '../../components/Sort';

// ЗАПРОС НА БЕКЕНД
// Асинхронный action запрос
interface IParams {
  categoryUrl: string;
  ascOrDescUrl: string;
  searchUrl: string;
  pageCurrent: number;
  sortValues: SortListItem;
}

// Также есть вариант типизациии, сделав createAsyncThunk<PizzaItems[], IParams>('pizza/fetchPizzasStatus', ...
export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params: IParams, thunkAPI) => {
  const { categoryUrl, ascOrDescUrl, searchUrl, pageCurrent, sortValues } = params;
  const { data } = await axios.get<PizzaItems[]>(
    `https://633e73820dbc3309f3b5d032.mockapi.io/photo_collections?page=${pageCurrent}&limit=4&${categoryUrl}&sortBy=${sortValues.sortProperty}&order=${ascOrDescUrl}${searchUrl}`
  );

  return data; // as PizzaItems[] - как другой вариант типизации
});

type PizzaItems = {
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  typesPizza: number[];
  id: string;
  rating: number;
};

// Специальный объект со значениями
export enum StatusEnum {
  LOADING = 'loading',
  SUCCES = 'succes',
  ERROR = 'error',
}

interface PizzaSliceState {
  items: PizzaItems[];
  status: StatusEnum;
}

// Состояния
const initialState: PizzaSliceState = {
  items: [],
  status: StatusEnum.LOADING, // loading | succes | error
};

const pizzasSlice = createSlice({
  name: 'pizza',
  initialState: initialState,

  reducers: {
    setItems: (state, action: PayloadAction<PizzaItems[]>) => {
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
      state.status = StatusEnum.LOADING;
    });
    // Запрос fetchPizzas, если упешный запрос, то (fulfilled)
    builder.addCase(fetchPizzas.fulfilled, (state, action: PayloadAction<PizzaItems[]>) => {
      state.items = action.payload;
      state.status = StatusEnum.SUCCES;
    });
    // Если произошла ошибка
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = StatusEnum.ERROR;
      state.items = [];
      console.error('Произошла ошибка при получении данных');
    });
  },
});

// Селектор
export const selectorPizzasData = (state: RootState) => state.pizzasSlice;
export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
