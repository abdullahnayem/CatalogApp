import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useGetProductsQuery } from '../services/api';
import { toggleFavorite } from '../store/slices/favoritesSlice';
import { logout } from '../store/slices/authSlice';
import { RootState, AppDispatch } from '../store';
import { RootStackParamList, Product } from '../types';
import ProductCard from '../components/ProductCard';
import TimestampDisplay from '../components/TimestampDisplay';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const HomeScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const favoriteProductIds = useSelector(
    (state: RootState) => state.favorites.favoriteProductIds,
  );
  const user = useSelector((state: RootState) => state.auth.user);

  const {
    data: productsData,
    error,
    isLoading,
    refetch,
  } = useGetProductsQuery({
    limit: 30,
    skip: 0,
    search: searchQuery.trim() || undefined,
  });

  // Use useCallback to prevent unnecessary re-renders
  const handleSearch = useCallback((text: string) => {
    setSearchQuery(text);
  }, []);

  const handleToggleFavorite = useCallback(
    (productId: number) => {
      dispatch(toggleFavorite(productId));
    },
    [dispatch],
  );

  const handleProductPress = useCallback(
    (productId: number) => {
      navigation.navigate('ProductDetails', { productId });
    },
    [navigation],
  );

  const handleLogout = useCallback(() => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => dispatch(logout()),
      },
    ]);
  }, [dispatch]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  // Memoize renderProduct to prevent unnecessary re-renders
  const renderProduct = useCallback(
    ({ item }: { item: Product }) => (
      <ProductCard
        product={item}
        isFavorite={favoriteProductIds.includes(item.id)}
        onToggleFavorite={handleToggleFavorite}
        onPress={() => handleProductPress(item.id)}
      />
    ),
    [favoriteProductIds, handleToggleFavorite, handleProductPress],
  );

  // Memoize renderHeader to prevent unnecessary re-renders
  const renderHeader = useCallback(
    () => (
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Text style={styles.welcomeText}>
            Welcome, {user?.firstName || 'User'}!
          </Text>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Icon name="logout" size={24} color="#007AFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <Icon
            name="search"
            size={20}
            color="#666"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            value={searchQuery}
            onChangeText={handleSearch}
            returnKeyType="search"
            autoCorrect={false}
            autoCapitalize="none"
            blurOnSubmit={false}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearchQuery('')}
              style={styles.clearButton}
            >
              <Icon name="clear" size={20} color="#666" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    ),
    [user?.firstName, handleLogout, searchQuery, handleSearch],
  );

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Icon name="error" size={48} color="#FF3B30" />
        <Text style={styles.errorText}>Failed to load products</Text>
        <TouchableOpacity style={styles.retryButton} onPress={refetch}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.timestampContainer}>
        <TimestampDisplay />
      </View>

      <FlatList
        data={productsData?.products || []}
        renderItem={renderProduct}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={renderHeader}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        removeClippedSubviews={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  timestampContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  header: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  logoutButton: {
    padding: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333',
  },
  clearButton: {
    padding: 5,
  },
  listContainer: {
    paddingHorizontal: 10,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#666',
    marginVertical: 15,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomeScreen;
