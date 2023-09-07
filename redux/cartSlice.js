import { createSlice } from '@reduxjs/toolkit';
const items =
  typeof window !== 'undefined' && localStorage.getItem('cartItems') !== null
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [];
const totalAmount =
  typeof window !== 'undefined' && localStorage.getItem('totalAmount') != null
    ? JSON.parse(localStorage.getItem('totalAmount'))
    : 0;
const initialState = {
  cartItems: items,
  totalAmount: totalAmount,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.id === newItem.id
      );

      if (!existingItem) {
        state.cartItems.push({
          id: newItem.id,
          image: newItem.image,
          price: newItem.price,
          title: newItem.title,
          quantity: 1,
          packaging: newItem.packaging,
          totalPrice: newItem.price,
          added: 'true',
          isFav: newItem.isFav,
          supplierName: newItem.supplier_name_slug,
        });
      } else {
        existingItem.quantity += 1;
        existingItem.totalPrice = Math.floor(
          Number(existingItem.totalPrice) + Number(newItem.price)
        );
      }

      state.totalAmount = state.cartItems.reduce(
        (total, item) =>
          Math.floor(total + Number(item.price) * Number(item.quantity)),
        0
      );
      localStorage.setItem(
        'cartItems',
        JSON.stringify(state.cartItems.map((item) => item))
      );
      localStorage.setItem('totalAmount', JSON.stringify(state.totalAmount));
    },

    increment: (state, action) => {
      const newItem = action.payload;
      const incItems = state.cartItems.find((item) => item.id === newItem.id);
      if (!incItems) {
        state.cartItems.push({
          id: newItem.id,
          image: newItem.image,
          price: newItem.price,
          title: newItem.title,
          quantity: 1,
          packaging: newItem.packaging,
          totalPrice: newItem.price,
          added: 'true',
          isFav: newItem.isFav,
          supplierName: newItem.supplier_name_slug,
        });
      } else {
        incItems.quantity += 1;
      }
      state.totalAmount = state.cartItems.reduce(
        (total, item) =>
          Math.floor(total + Number(item.price) * Number(item.quantity)),
        0
      );
      localStorage.setItem(
        'cartItems',
        JSON.stringify(state.cartItems.map((item) => item))
      );
      localStorage.setItem('totalAmount', JSON.stringify(state.totalAmount));
    },
    decrement: (state, action) => {
      const newItem = action.payload;
      const decItem = state.cartItems.find((item) => item.id === newItem.id);
      if (decItem.quantity === 1) {
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== decItem.id
        );
      } else {
        decItem.quantity -= 1;
      }

      state.totalAmount = state.cartItems.reduce(
        (total, item) =>
          Math.floor(total + Number(item.price) * Number(item.quantity)),
        0
      );
      localStorage.setItem(
        'cartItems',
        JSON.stringify(state.cartItems.map((item) => item))
      );
      localStorage.setItem('totalAmount', JSON.stringify(state.totalAmount));
    },
    removeItem: (state, action) => {
      const newItem = action.payload;
      const removeItem = state.cartItems.filter((item) => item.id !== newItem);
      state.cartItems = removeItem;

      state.totalAmount = state.cartItems.reduce(
        (total, item) =>
          Math.floor(total + Number(item.price) * Number(item.quantity)),
        0
      );
      localStorage.setItem(
        'cartItems',
        JSON.stringify(state.cartItems.map((item) => item))
      );
      localStorage.setItem('totalAmount', JSON.stringify(state.totalAmount));
    },
    removeAllFromCart: (state) => {
      state.cartItems = [];
      state.totalAmount = 0;
      localStorage.setItem(
        'cartItems',
        JSON.stringify(state.cartItems.map((item) => item))
      );
      localStorage.setItem('totalAmount', JSON.stringify(state.totalAmount));
    },
  },
});

export const {
  addItem,
  decrement,
  increment,
  removeItem,
  removeAllFromCart,
  addToast,
  removeToast,
} = cartSlice.actions;

export default cartSlice.reducer;
