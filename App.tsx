import React, { useEffect } from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { Provider, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { store } from './src/store';
import { setUser } from './src/store/slices/authSlice';
import { setFavorites } from './src/store/slices/favoritesSlice';
import AppNavigator from './src/navigation/AppNavigator';

const AppContent: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      // Check for stored auth data
      const [userToken, userData, favoriteIds] = await Promise.all([
        AsyncStorage.getItem('userToken'),
        AsyncStorage.getItem('userData'),
        AsyncStorage.getItem('favoriteProductIds'),
      ]);

      if (userToken && userData) {
        const user = JSON.parse(userData);
        dispatch(setUser({ user, token: userToken }));
      }

      if (favoriteIds) {
        const favorites = JSON.parse(favoriteIds);
        dispatch(setFavorites(favorites));
      }
    } catch (error) {
      console.error('Error initializing app:', error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <AppNavigator />
    </View>
  );
};

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
