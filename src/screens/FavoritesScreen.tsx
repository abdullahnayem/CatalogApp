import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useGetProductsQuery } from '../services/api';
import { toggleFavorite } from '../store/slices/favoritesSlice';
import { RootState, AppDispatch } from '../store';
import { RootStackParamList, Product } from '../types';
import ProductCard from '../components/ProductCard';

type FavoritesScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const FavoritesScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<FavoritesScreenNavigationProp>();
  const favoriteProductIds = useSelector((state: RootState) => state.favorites.favoriteProductIds);

  const { data: productsData } = useGetProductsQuery({
    limit: 100, // Get more products to ensure we have the favorited ones
    skip: 0,
  });

  // Filter products to show only favorites
  const favoriteProducts = productsData?.products.filter(product =>
    favoriteProductIds.includes(product.id)
  ) || [];

  const handleToggleFavorite = (productId: number) => {
    dispatch(toggleFavorite(productId));
  };

  const handleProductPress = (productId: number) => {
    navigation.navigate('ProductDetails', { productId });
  };

  const renderProduct = ({ item }: { item: Product }) => (
    <ProductCard
      product={item}
      isFavorite={true} // All products in this screen are favorites
      onToggleFavorite={handleToggleFavorite}
      onPress={() => handleProductPress(item.id)}
    />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Icon name="favorite-border" size={64} color="#ccc" />
      <Text style={styles.emptyTitle}>No Favorites Yet</Text>
      <Text style={styles.emptySubtitle}>
        Start adding products to your favorites by tapping the heart icon
      </Text>
      <TouchableOpacity 
        style={styles.browseButton}
        onPress={() => navigation.navigate('MainTabs')}
      >
        <Text style={styles.browseButtonText}>Browse Products</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {favoriteProducts.length === 0 ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={favoriteProducts}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
            <View style={styles.header}>
              <Text style={styles.headerTitle}>My Favorites</Text>
              <Text style={styles.headerSubtitle}>
                {favoriteProducts.length} {favoriteProducts.length === 1 ? 'item' : 'items'}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  listContainer: {
    paddingHorizontal: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 30,
  },
  browseButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  browseButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default FavoritesScreen;
