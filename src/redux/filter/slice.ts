import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterSliceState, SortPropertyEnum, TSortValues } from './types';

// Состояние для сортировки
const initialState: FilterSliceState = {
  searchValue: '',
  categoryId: 0,
  sortValues: {
    name: 'Популярности',
    sortProperty: SortPropertyEnum.RATING,
  },
  pageCurrent: 1,
  // Сортировка по возрастанию или убыванию
  sortOrder: false,
};

const filterSlice = createSlice({
  name: 'filters',
  initialState: initialState,

  // filterSlice.actions
  reducers: {
    setCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setSort: (state, action: PayloadAction<TSortValues>) => {
      state.sortValues = action.payload;
    },
    setPageCurrent: (state, action: PayloadAction<number>) => {
      state.pageCurrent = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<boolean>) => {
      state.sortOrder = action.payload;
    },
  },
});

export const { setCategoryId, setSort, setPageCurrent, setSortOrder, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;
