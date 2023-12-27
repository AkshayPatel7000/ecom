import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  cart: {},
};

const slice = createSlice({
  name: 'Cart',
  initialState,
  reducers: {
    setCartItems: (state, action) => {
      state.cart = action.payload;
    },
  },
});

export const {setCartItems} = slice.actions;

export default slice.reducer;

export const selectCartItems = state => state.CartSlice.cart;
