import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FavoritesState } from '../../types';

const initialState: FavoritesState = {
  favoriteProductIds: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const index = state.favoriteProductIds.indexOf(productId);
      
      if (index >= 0) {
        // Remove from favorites
        state.favoriteProductIds.splice(index, 1);
      } else {
        // Add to favorites
        state.favoriteProductIds.push(productId);
      }
    },
    addToFavorites: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      if (!state.favoriteProductIds.includes(productId)) {
        state.favoriteProductIds.push(productId);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const index = state.favoriteProductIds.indexOf(productId);
      if (index >= 0) {
        state.favoriteProductIds.splice(index, 1);
      }
    },
    clearFavorites: (state) => {
      state.favoriteProductIds = [];
    },
    setFavorites: (state, action: PayloadAction<number[]>) => {
      state.favoriteProductIds = action.payload;
    },
  },
});

export const {
  toggleFavorite,
  addToFavorites,
  removeFromFavorites,
  clearFavorites,
  setFavorites,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;
