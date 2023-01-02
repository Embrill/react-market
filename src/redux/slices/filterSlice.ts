import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

type SortSlice = {
  name: string;
  sortProperty: 'rating' | 'price' | 'title';
};
interface FilterSliceState {
  searchValue: string;
  categoryId: number;
  sortSlice: SortSlice;
  pageCurrent: number;
  sortOrder: boolean;
}

// Состояние для сортировки
const initialState: FilterSliceState = {
  searchValue: '',
  categoryId: 0,
  sortSlice: {
    name: 'Популярности',
    sortProperty: 'rating',
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
    setSort: (state, action: PayloadAction<SortSlice>) => {
      state.sortSlice = action.payload;
    },
    setPageCurrent: (state, action: PayloadAction<number>) => {
      state.pageCurrent = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<boolean>) => {
      state.sortOrder = action.payload;
    },
  },
});

// Селектор
export const selectorFilter = (state: RootState) => state.filterSlice;

export const { setCategoryId, setSort, setPageCurrent, setSortOrder, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;
