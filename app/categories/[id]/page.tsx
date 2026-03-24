'use client'

import { ProductCard } from '@/components/shared/ProductCard'
import { getProducts } from '@/lib/api'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { addToCart } from '@/lib/slices/cartSlice'
import type { Product } from '@/lib/slices/productsSlice'
import { setProducts } from '@/lib/slices/productsSlice'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const categoryMap: Record<string, { name: string; icon: string; color: string; description: string }> = {
  '1': { name: 'Electronics', icon: '⚡', color: 'from-blue-400 to-blue-200', description: 'Latest tech gadgets and electronics' },
  '2': { name: 'Fashion', icon: '👕', color: 'from-pink-400 to-pink-200', description: 'Trendy clothing and accessories' },
  '3': { name: 'Home', icon: '🏠', color: 'from-orange-400 to-orange-200', description: 'Home decor and furniture' },
  '4': { name: 'Sports', icon: '⚽', color: 'from-green-400 to-green-200', description: 'Sports equipment and apparel' },
}

export default function CategoryPage({ params }: { params: { id: string } }) {
  const dispatch = useAppDispatch()
  const { items } = useAppSelector(state => state.products)
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const category = categoryMap[params.id] || categoryMap['1']

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    }))
  }

  useEffect(() => {
    const loadCategoryProducts = async () => {
      try {
        const result = await getProducts()
        dispatch(setProducts(result.products))
        // Simulate filtering products by category
        setCategoryProducts(result.products.slice(0, 12))
      } catch (error) {
        console.error('Failed to load products:', error)
      } finally {
        setLoading(false)
      }
    }

    loadCategoryProducts()
  }, [dispatch, params.id])

  return (
    <>
      <main className="min-h-screen bg-background">
        {/* Category Header */}
        <section className={`bg-linear-to-br ${category.color} py-16 md:py-20 border-b-4 border-white/30`}>
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="space-y-4">
              <p className="text-7xl md:text-8xl  transition-transform duration-300">{category.icon}</p>
              <h1 className="text-5xl md:text-6xl font-bold text-foreground">{category.name}</h1>
              <p className="text-lg text-foreground/80 max-w-2xl font-medium">{category.description}</p>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-2">Our Products</h2>
                <p className="text-muted-foreground">{categoryProducts.length} items available</p>
              </div>
              <Link
                href="/products"
                className="text-primary hover:text-primary-dark transition-colors font-semibold flex items-center gap-2"
              >
                Browse all
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="border border-border rounded-2xl p-4 animate-pulse">
                    <div className="aspect-square bg-muted rounded-xl mb-4" />
                    <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {categoryProducts.map(product => (
                  <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
                ))}
              </div>
            )}

            {!loading && categoryProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground mb-4">No products found in this category</p>
                <Link
                  href="/products"
                  className="inline-block px-8 py-3 border-2 border-primary text-primary rounded-2xl hover:bg-primary hover:text-primary-foreground transition-colors font-semibold"
                >
                  Browse All Products
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>


    </>
  )
}
