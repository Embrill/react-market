import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchPizzas } from './asyncActions';
import { PizzaItems, PizzaSliceState, StatusEnum } from './types';

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

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
