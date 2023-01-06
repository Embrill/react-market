import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IParams, PizzaItems } from './types';

// ЗАПРОС НА БЕКЕНД
// Асинхронный action запрос

// Также есть вариант типизациии, сделав createAsyncThunk<PizzaItems[], IParams>('pizza/fetchPizzasStatus', ...
export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params: IParams, thunkAPI) => {
  const { categoryUrl, ascOrDescUrl, searchUrl, pageCurrent, sortValues } = params;
  const { data } = await axios.get<PizzaItems[]>(
    `https://633e73820dbc3309f3b5d032.mockapi.io/photo_collections?page=${pageCurrent}&limit=4&${categoryUrl}&sortBy=${sortValues.sortProperty}&order=${ascOrDescUrl}${searchUrl}`
  );

  return data; // as PizzaItems[] - как другой вариант типизации
});
