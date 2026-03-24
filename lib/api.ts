import { mockProducts, blogPosts } from './mockData'
import type { Product } from './slices/productsSlice'

// This service layer abstracts API calls and can easily be replaced with real endpoints

export const api = {
  // Products
  getProducts: async (filters?: {
    category?: string
    priceRange?: [number, number]
    sizes?: string[]
    colors?: string[]
    sortBy?: 'newest' | 'price-low' | 'price-high' | 'rating'
    page?: number
    limit?: number
  }): Promise<{ products: Product[]; total: number }> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))

    let filtered = [...mockProducts]

    // Apply filters
    if (filters?.category) {
      filtered = filtered.filter(p => p.category === filters.category)
    }

    if (filters?.priceRange) {
      const [min, max] = filters.priceRange
      filtered = filtered.filter(p => p.price >= min && p.price <= max)
    }

    if (filters?.colors && filters.colors.length > 0) {
      filtered = filtered.filter(p =>
        p.colors && p.colors.some(c => filters.colors?.includes(c))
      )
    }

    // Apply sorting
    if (filters?.sortBy) {
      switch (filters.sortBy) {
        case 'price-low':
          filtered.sort((a, b) => a.price - b.price)
          break
        case 'price-high':
          filtered.sort((a, b) => b.price - a.price)
          break
        case 'rating':
          filtered.sort((a, b) => b.rating - a.rating)
          break
        case 'newest':
        default:
          // Keep original order
          break
      }
    }

    // Pagination
    const page = filters?.page || 1
    const limit = filters?.limit || 12
    const start = (page - 1) * limit
    const end = start + limit

    const paginatedProducts = filtered.slice(start, end)

    return {
      products: paginatedProducts,
      total: filtered.length,
    }
  },

  getProductById: async (id: string): Promise<Product | null> => {
    await new Promise(resolve => setTimeout(resolve, 200))
    return mockProducts.find(p => p.id === id) || null
  },

  getCategories: async (): Promise<string[]> => {
    await new Promise(resolve => setTimeout(resolve, 100))
    const categories = new Set(mockProducts.map(p => p.category))
    return Array.from(categories)
  },

  // Blog
  getBlogPosts: async (page?: number, limit?: number) => {
    await new Promise(resolve => setTimeout(resolve, 300))
    const p = page || 1
    const l = limit || 10
    const start = (p - 1) * l
    const end = start + l
    return {
      posts: blogPosts.slice(start, end),
      total: blogPosts.length,
    }
  },

  getBlogPostById: async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 200))
    return blogPosts.find(p => p.id === id) || null
  },

  // Orders (mock)
  createOrder: async (orderData: {
    items: any[]
    shippingAddress: any
    paymentMethod: string
    total: number
  }) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    return {
      id: `ORD-${Date.now()}`,
      status: 'pending',
      date: new Date().toISOString(),
      ...orderData,
    }
  },

  // Search
  searchProducts: async (query: string): Promise<Product[]> => {
    await new Promise(resolve => setTimeout(resolve, 200))
    const lowerQuery = query.toLowerCase()
    return mockProducts.filter(
      p =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery) ||
        p.category.toLowerCase().includes(lowerQuery)
    )
  },
}

// Named exports for convenience
export const getProducts = (filters?: Parameters<typeof api.getProducts>[0]) => api.getProducts(filters)
export const getProductById = (id: string) => api.getProductById(id)
export const getCategories = () => api.getCategories()
export const getBlogPosts = (page?: number, limit?: number) => api.getBlogPosts(page, limit)
export const getBlogPostById = (id: string) => api.getBlogPostById(id)
export const createOrder = (orderData: Parameters<typeof api.createOrder>[0]) => api.createOrder(orderData)
export const searchProducts = (query: string) => api.searchProducts(query)
