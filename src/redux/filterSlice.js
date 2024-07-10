import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  filter: {
    type: 'bouquets',
    minPrice: '',
    maxPrice: '',
    category: '',
  }
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    updateFilter(state, action) {
      state.filter = action.payload;
    },

  }
});

export const {updateFilter} = filterSlice.actions

export default filterSlice.reducer