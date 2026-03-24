import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  images: string[]
  category: string
  rating: number
  reviews: number
  inStock: boolean
  colors?: string[]
  sizes?: string[]
}

interface ProductsState {
  items: Product[]
  selectedProduct?: Product
  recentlyViewed: Product[]
  wishlist: string[]
  filters: {
    category?: string
    priceRange: [number, number]
    sizes?: string[]
    colors?: string[]
  }
  sortBy: 'newest' | 'price-low' | 'price-high' | 'rating'
  currentPage: number
  pageSize: number
}

const initialState: ProductsState = {
  items: [],
  recentlyViewed: [],
  wishlist: [],
  filters: {
    priceRange: [0, 1000],
  },
  sortBy: 'newest',
  currentPage: 1,
  pageSize: 12,
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload
    },
    setSelectedProduct: (state, action: PayloadAction<Product>) => {
      state.selectedProduct = action.payload
      // Add to recently viewed
      const exists = state.recentlyViewed.find((p) => p.id === action.payload.id)
      if (!exists) {
        state.recentlyViewed.unshift(action.payload)
        if (state.recentlyViewed.length > 5) {
          state.recentlyViewed.pop()
        }
      } else {
        state.recentlyViewed = state.recentlyViewed.filter((p) => p.id !== action.payload.id)
        state.recentlyViewed.unshift(action.payload)
      }
    },
    toggleWishlist: (state, action: PayloadAction<string>) => {
      const index = state.wishlist.indexOf(action.payload)
      if (index > -1) {
        state.wishlist.splice(index, 1)
      } else {
        state.wishlist.push(action.payload)
      }
    },
    setFilter: (state, action: PayloadAction<ProductsState['filters']>) => {
      state.filters = action.payload
      state.currentPage = 1
    },
    setSortBy: (state, action: PayloadAction<ProductsState['sortBy']>) => {
      state.sortBy = action.payload
      state.currentPage = 1
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    clearFilters: (state) => {
      state.filters = {
        priceRange: [0, 1000],
      }
      state.sortBy = 'newest'
      state.currentPage = 1
    },
  },
})

export const {
  setProducts,
  setSelectedProduct,
  toggleWishlist,
  setFilter,
  setSortBy,
  setCurrentPage,
  clearFilters,
} = productsSlice.actions

export default productsSlice.reducer
