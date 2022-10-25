import { createSlice } from '@reduxjs/toolkit';

// Состояние для сортировки
const initialState = {
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
    setCategoryId: (state, action) => {
      state.categoryId = action.payload;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    setSort: (state, action) => {
      state.sortSlice = action.payload;
    },
    setPageCurrent: (state, action) => {
      state.pageCurrent = action.payload;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
  },
});

// Селектор
export const selectorFilter = (state) => state.filterSlice;

export const { setCategoryId, setSort, setPageCurrent, setSortOrder, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;
