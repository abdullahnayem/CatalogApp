import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useGetProductByIdQuery } from '../services/api';
import { toggleFavorite } from '../store/slices/favoritesSlice';
import { RootState, AppDispatch } from '../store';
import { RootStackParamList } from '../types';

type ProductDetailsRouteProp = RouteProp<RootStackParamList, 'ProductDetails'>;

const { width } = Dimensions.get('window');

const ProductDetailsScreen: React.FC = () => {
  const route = useRoute<ProductDetailsRouteProp>();
  const { productId } = route.params;
  const dispatch = useDispatch<AppDispatch>();
  const favoriteProductIds = useSelector((state: RootState) => state.favorites.favoriteProductIds);

  const {
    data: product,
    error,
    isLoading,
  } = useGetProductByIdQuery(productId);

  const isFavorite = favoriteProductIds.includes(productId);

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(productId));
  };

  const handleAddToCart = () => {
    Alert.alert(
      'Add to Cart',
      `Add ${product?.title} to cart?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Add', onPress: () => Alert.alert('Success', 'Product added to cart!') },
      ]
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading product details...</Text>
      </View>
    );
  }

  if (error || !product) {
    return (
      <View style={styles.errorContainer}>
        <Icon name="error" size={48} color="#FF3B30" />
        <Text style={styles.errorText}>Failed to load product details</Text>
      </View>
    );
  }

  const discountedPrice = product.price * (1 - product.discountPercentage / 100);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.thumbnail }}
          style={styles.mainImage}
          resizeMode="cover"
        />
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={handleToggleFavorite}
        >
          <Icon
            name={isFavorite ? 'favorite' : 'favorite-border'}
            size={24}
            color={isFavorite ? '#FF3B30' : '#666'}
          />
        </TouchableOpacity>
        {product.discountPercentage > 0 && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>
              -{product.discountPercentage.toFixed(0)}% OFF
            </Text>
          </View>
        )}
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.title}>{product.title}</Text>
        
        <View style={styles.ratingContainer}>
          <View style={styles.ratingStars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Icon
                key={star}
                name="star"
                size={16}
                color={star <= Math.floor(product.rating) ? '#FFD700' : '#E0E0E0'}
              />
            ))}
          </View>
          <Text style={styles.ratingText}>
            {product.rating.toFixed(1)} ({product.reviews?.length || 0} reviews)
          </Text>
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.currentPrice}>${discountedPrice.toFixed(2)}</Text>
          {product.discountPercentage > 0 && (
            <Text style={styles.originalPrice}>${product.price.toFixed(2)}</Text>
          )}
        </View>

        <View style={styles.stockContainer}>
          <Icon 
            name={product.stock > 0 ? 'check-circle' : 'cancel'} 
            size={16} 
            color={product.stock > 0 ? '#4CAF50' : '#FF3B30'} 
          />
          <Text style={[styles.stockText, { color: product.stock > 0 ? '#4CAF50' : '#FF3B30' }]}>
            {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{product.description}</Text>

        <View style={styles.detailsGrid}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Brand</Text>
            <Text style={styles.detailValue}>{product.brand || 'N/A'}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>SKU</Text>
            <Text style={styles.detailValue}>{product.sku}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Weight</Text>
            <Text style={styles.detailValue}>{product.weight} kg</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Warranty</Text>
            <Text style={styles.detailValue}>{product.warrantyInformation}</Text>
          </View>
        </View>

        {product.tags && product.tags.length > 0 && (
          <View style={styles.tagsContainer}>
            <Text style={styles.sectionTitle}>Tags</Text>
            <View style={styles.tags}>
              {product.tags.map((tag, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </View>

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[styles.addToCartButton, product.stock === 0 && styles.disabledButton]}
          onPress={handleAddToCart}
          disabled={product.stock === 0}
        >
          <Icon name="shopping-cart" size={20} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.addToCartText}>
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    marginTop: 15,
    textAlign: 'center',
  },
  imageContainer: {
    position: 'relative',
    height: 300,
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  favoriteButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 25,
    padding: 8,
  },
  discountBadge: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: '#FF3B30',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  discountText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  contentContainer: {
    padding: 20,
  },
  category: {
    fontSize: 14,
    color: '#007AFF',
    textTransform: 'uppercase',
    fontWeight: '600',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
    lineHeight: 30,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingStars: {
    flexDirection: 'row',
    marginRight: 8,
  },
  ratingText: {
    fontSize: 14,
    color: '#666',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  currentPrice: {
    fontSize: 28,
    fontWeight: '700',
    color: '#007AFF',
    marginRight: 12,
  },
  originalPrice: {
    fontSize: 18,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  stockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  stockText: {
    fontSize: 14,
    marginLeft: 6,
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
    marginTop: 8,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 20,
  },
  detailsGrid: {
    marginBottom: 20,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
    textAlign: 'right',
    flex: 1,
    marginLeft: 20,
  },
  tagsContainer: {
    marginBottom: 20,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#f0f0f0',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 12,
    color: '#666',
  },
  bottomContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  addToCartButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buttonIcon: {
    marginRight: 8,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProductDetailsScreen;
