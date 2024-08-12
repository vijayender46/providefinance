import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
        state.items.push({ ...action.payload, quantity: 1 });
    },
    clearCart: (state) => {
        state.items = [];
      },
  },
});
export const { addToCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;