import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage keys
export const STORAGE_KEYS = {
  USER_TOKEN: 'userToken',
  USER_DATA: 'userData',
  FAVORITE_PRODUCT_IDS: 'favoriteProductIds',
} as const;

// Auth storage utilities
export const authStorage = {
  async saveAuthData(user: any, token: string) {
    try {
      await Promise.all([
        AsyncStorage.setItem(STORAGE_KEYS.USER_TOKEN, token),
        AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user)),
      ]);
    } catch (error) {
      console.error('Error saving auth data:', error);
    }
  },

  async getAuthData() {
    try {
      const [token, userData] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.USER_TOKEN),
        AsyncStorage.getItem(STORAGE_KEYS.USER_DATA),
      ]);

      if (token && userData) {
        return {
          token,
          user: JSON.parse(userData),
        };
      }
      return null;
    } catch (error) {
      console.error('Error getting auth data:', error);
      return null;
    }
  },

  async clearAuthData() {
    try {
      await Promise.all([
        AsyncStorage.removeItem(STORAGE_KEYS.USER_TOKEN),
        AsyncStorage.removeItem(STORAGE_KEYS.USER_DATA),
      ]);
    } catch (error) {
      console.error('Error clearing auth data:', error);
    }
  },
};

// Favorites storage utilities
export const favoritesStorage = {
  async saveFavorites(favoriteIds: number[]) {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEYS.FAVORITE_PRODUCT_IDS,
        JSON.stringify(favoriteIds)
      );
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  },

  async getFavorites(): Promise<number[]> {
    try {
      const favorites = await AsyncStorage.getItem(STORAGE_KEYS.FAVORITE_PRODUCT_IDS);
      return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
      console.error('Error getting favorites:', error);
      return [];
    }
  },

  async clearFavorites() {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.FAVORITE_PRODUCT_IDS);
    } catch (error) {
      console.error('Error clearing favorites:', error);
    }
  },
};

// Date/time utilities
export const formatTimestamp = (timestamp: Date): string => {
  return timestamp.toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
};

// Validation utilities
export const validation = {
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  isValidPassword(password: string): boolean {
    return password.length >= 6;
  },

  isValidUsername(username: string): boolean {
    return username.length >= 3;
  },
};

// Currency formatting
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

// Debounce utility for search
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};
