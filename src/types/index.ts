// API Response Types
export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand?: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  images: string[];
  thumbnail: string;
}

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}

// App State Types
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface FavoritesState {
  favoriteProductIds: number[];
}

export interface RootState {
  auth: AuthState;
  favorites: FavoritesState;
}

// Navigation Types
export type RootStackParamList = {
  Login: undefined;
  MainTabs: undefined;
  ProductDetails: { productId: number };
};

export type BottomTabParamList = {
  Home: undefined;
  Favorites: undefined;
  Map: undefined;
};

// Component Props Types
export interface ProductCardProps {
  product: Product;
  onToggleFavorite: (productId: number) => void;
  isFavorite: boolean;
  onPress: () => void;
}

export interface TimestampDisplayProps {
  timestamp: string;
}

// Location Types
export interface Location {
  latitude: number;
  longitude: number;
}

export interface LocationError {
  code: number;
  message: string;
}
