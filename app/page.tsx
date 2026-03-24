'use client'

import AdsBanner from '@/components/sections/AdsBanner'
import BrandMarquee from '@/components/sections/BrandMarquee'
import CategorySection from '@/components/sections/CategorySection'
import HeroSection from '@/components/sections/HeroSection'
import { ProductCard } from '@/components/shared/ProductCard'
import { getProducts } from '@/lib/api'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { addToCart } from '@/lib/slices/cartSlice'
import type { Product } from '@/lib/slices/productsSlice'
import { setProducts } from '@/lib/slices/productsSlice'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Home() {
  const dispatch = useAppDispatch()
  const { items } = useAppSelector(state => state.products)
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const result = await getProducts()
        dispatch(setProducts(result.products))
        setFeaturedProducts(result.products.slice(0, 8))
      } catch (error) {
        console.error('Failed to load products:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [dispatch])



  const handleAddToCart = (product: Product) => {
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    }))
  }

  return (
    <>
      <main className="min-h-screen bg-[#F6F6F6]">
        <HeroSection />
        <BrandMarquee />
        <AdsBanner />
        <CategorySection />
        {/* FEATURED PRODUCTS */}
        <section id="featured" className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="text-center mb-12">
              <h2 style={{ fontSize: 'clamp(26px, 5vw, 58px)' }} className="text-3xl font-n md:text-4xl font-bold text-foreground mb-4">Featured Products</h2>
              <p className="text-muted-foreground text-lg">Check out our bestsellers</p>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="border border-border rounded-2xl p-4 animate-pulse">
                    <div className="aspect-square bg-muted rounded-xl mb-4" />
                    <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredProducts.map(product => (
                  <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
                ))}
              </div>
            )}

            <div className="text-center mt-12">
              <Link
                href="/products"
                className="inline-block px-8 py-3 border-2 border-primary rounded-2xl bg-primary text-primary-foreground transition-colors font-semibold"
              >
                View All Products
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
