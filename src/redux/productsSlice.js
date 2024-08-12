import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    getProductsSuccess: (state, action) => {
      state.products = action.payload;
    }
  },
});
export const { getProductsSuccess } = productsSlice.actions;
export default productsSlice.reducer;