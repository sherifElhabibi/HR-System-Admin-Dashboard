import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './cartSlice';
import favSlice from './favSlice';
import userSlice from './userSlice';

const store = configureStore({
  reducer: {
    cart: cartSlice,
    fav: favSlice,
    user: userSlice,
  },
});

export default store;
