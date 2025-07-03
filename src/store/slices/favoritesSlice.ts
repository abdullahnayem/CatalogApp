import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FavoritesState } from '../../types';
import { favoritesStorage } from '../../utils';

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
      
      // Save to AsyncStorage
      favoritesStorage.saveFavorites(state.favoriteProductIds);
    },
    addToFavorites: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      if (!state.favoriteProductIds.includes(productId)) {
        state.favoriteProductIds.push(productId);
        favoritesStorage.saveFavorites(state.favoriteProductIds);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const index = state.favoriteProductIds.indexOf(productId);
      if (index >= 0) {
        state.favoriteProductIds.splice(index, 1);
        favoritesStorage.saveFavorites(state.favoriteProductIds);
      }
    },
    clearFavorites: (state) => {
      state.favoriteProductIds = [];
      favoritesStorage.clearFavorites();
    },
    setFavorites: (state, action: PayloadAction<number[]>) => {
      state.favoriteProductIds = action.payload;
      // Don't save to storage here as this is used for loading from storage
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
