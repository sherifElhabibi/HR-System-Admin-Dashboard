import { createSlice } from '@reduxjs/toolkit';
const items =
  typeof window !== 'undefined' && localStorage.getItem('favItems') !== null
    ? JSON.parse(localStorage.getItem('favItems'))
    : [];
const furnitureItems =
  typeof window !== 'undefined' &&
  localStorage.getItem('favFurnitureItems') !== null
    ? JSON.parse(localStorage.getItem('favFurnitureItems'))
    : [];
const initialState = {
  favItems: items,
  favFurnitureItems: furnitureItems,
  totalQuantity: 0,
  isFav: false,
};

const favSlice = createSlice({
  name: 'fav',
  initialState,
  reducers: {
    addToFav: (state, action) => {
      const newItem = action.payload;
      const existItem = state.favItems.find((item) => item.id == newItem.id);
      if (!existItem) {
        state.favItems.push({
          id: newItem.id,
          image: newItem.image,
          price: newItem.price,
          title: newItem.title,
          packaging: newItem.packaging,
          totalPrice: newItem.price,
          added: newItem.added,
          isFav: 'true',
          supplierName: newItem.supplier_name_slug,
        });
      } else {
        const newItem = action.payload;
        state.favItems = state.favItems.filter(
          (item) => item.id !== newItem.id
        );
      }
      localStorage.setItem('favItems', JSON.stringify(state.favItems));
    },
    removeFromFav: (state, action) => {
      const newItem = action.payload;
      state.favItems = state.favItems.filter((item) => item.id !== newItem);
      localStorage.setItem('favItems', JSON.stringify(state.favItems));
    },
    addToFavFurniture: (state, action) => {
      const newItem = action.payload;
      const existItemFurniture = state.favFurnitureItems.find(
        (item) => item.id == newItem.id
      );
      if (!existItemFurniture) {
        state.favFurnitureItems.push({
          id: newItem.id,
          image: newItem.image,
          price: newItem.price,
          title: newItem.title,
          totalPrice: newItem.price,
          isFav: 'true',
          category: newItem.category,
          supplierName: newItem.supplierName,
        });
      } else {
        const newItem = action.payload;
        state.favFurnitureItems = state.favFurnitureItems.filter(
          (item) => item.id !== newItem.id
        );
      }
      localStorage.setItem(
        'favFurnitureItems',
        JSON.stringify(state.favFurnitureItems)
      );
    },
    removeFromFavFurniture: (state, action) => {
      const newItem = action.payload;
      state.favFurnitureItems = state.favFurnitureItems.filter(
        (item) => item.id !== newItem
      );
      localStorage.setItem(
        'favFurnitureItems',
        JSON.stringify(state.favFurnitureItems)
      );
    },
    removeAllFromFavFurniture: (state) => {
      state.favFurnitureItems = [];
      localStorage.setItem(
        'favFurnitureItems',
        JSON.stringify(state.favFurnitureItems.map((item) => item))
      );
    },
  },
});

export const {
  addToFav,
  removeFromFav,
  addToFavFurniture,
  removeFromFavFurniture,
  removeAllFromFavFurniture,
} = favSlice.actions;

export default favSlice.reducer;
