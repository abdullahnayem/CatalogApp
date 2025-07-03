import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LoginRequest, LoginResponse, Product, ProductsResponse } from '../types';

const BASE_URL = 'https://dummyjson.com';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      // Add auth token if available
      const state = getState() as any;
      const token = state.auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      headers.set('content-type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Product', 'User'],
  endpoints: (builder) => ({
    // Authentication endpoints
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    
    // Product endpoints
    getProducts: builder.query<ProductsResponse, { limit?: number; skip?: number; search?: string }>({
      query: ({ limit = 30, skip = 0, search }) => {
        let url = `/products?limit=${limit}&skip=${skip}`;
        if (search) {
          url = `/products/search?q=${encodeURIComponent(search)}&limit=${limit}&skip=${skip}`;
        }
        return url;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.products.map(({ id }) => ({ type: 'Product' as const, id })),
              { type: 'Product', id: 'LIST' },
            ]
          : [{ type: 'Product', id: 'LIST' }],
    }),
    
    getProductById: builder.query<Product, number>({
      query: (id) => `/products/${id}`,
      providesTags: (result, error, id) => [{ type: 'Product', id }],
    }),
    
    getProductCategories: builder.query<string[], void>({
      query: () => '/products/categories',
    }),
    
    getProductsByCategory: builder.query<ProductsResponse, { category: string; limit?: number; skip?: number }>({
      query: ({ category, limit = 30, skip = 0 }) => 
        `/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`,
      providesTags: (result) =>
        result
          ? [
              ...result.products.map(({ id }) => ({ type: 'Product' as const, id })),
              { type: 'Product', id: 'LIST' },
            ]
          : [{ type: 'Product', id: 'LIST' }],
    }),
  }),
});

export const {
  useLoginMutation,
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetProductCategoriesQuery,
  useGetProductsByCategoryQuery,
} = apiSlice;
