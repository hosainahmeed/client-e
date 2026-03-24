'use client'

import { FilterSidebarNew, type FilterState } from '@/components/shared/FilterSidebarNew'
import { Pagination } from '@/components/shared/Pagination'
import { ProductCard } from '@/components/shared/ProductCard'
import { getProducts } from '@/lib/api'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { addToCart } from '@/lib/slices/cartSlice'
import type { Product } from '@/lib/slices/productsSlice'
import { setCurrentPage } from '@/lib/slices/productsSlice'
import { useEffect, useState } from 'react'

export default function ProductsPage() {
  const dispatch = useAppDispatch()
  const { currentPage, pageSize } = useAppSelector(state => state.products)
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, 1000],
    ratings: [],
    sortBy: 'newest',
  })

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const result = await getProducts()
        setAllProducts(result.products)
        setFilteredProducts(result.products)
      } catch (error) {
        console.error('Failed to load products:', error)
      } finally {
        setLoading(false)
      }
    }
    loadProducts()
  }, [])

  useEffect(() => {
    let result = [...allProducts]

    if (filters.categories.length > 0) {
      result = result.filter(p =>
        filters.categories.some(cat => p.name.toLowerCase().includes(cat.toLowerCase()))
      )
    }

    result = result.filter(p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1])

    if (filters.ratings.length > 0) {
      result = result.filter(p => filters.ratings.some(rating => p.rating >= rating))
    }

    switch (filters.sortBy) {
      case 'price-low': result.sort((a, b) => a.price - b.price); break
      case 'price-high': result.sort((a, b) => b.price - a.price); break
      case 'rating': result.sort((a, b) => b.rating - a.rating); break
      case 'popular': result.sort((a, b) => b.reviews - a.reviews); break
      default: result.reverse()
    }

    setFilteredProducts(result)
    dispatch(setCurrentPage(1))
  }, [filters, allProducts, dispatch])

  const totalPages = Math.ceil(filteredProducts.length / pageSize)
  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    }))
  }

  const clearFilters = () =>
    setFilters({ categories: [], priceRange: [0, 1000], ratings: [], sortBy: 'newest' })

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.ratings.length > 0 ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 1000 ||
    filters.sortBy !== 'newest'

  return (
    <>
      <main className="min-h-screen bg-background">

        {/* ── Page Header ── */}
        <div className="relative overflow-hidden border-b border-border bg-linear-to-br from-primary/5 via-background to-accent">
          {/* Decorative background circles */}
          <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-accent/60 blur-2xl" />

          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-20">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-4 sm:mb-6">
              <a href="/" className="hover:text-foreground transition-colors">Home</a>
              <svg className="w-3 h-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-foreground font-medium">Products</span>
            </nav>

            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <h1
                  className="font-bold font-n text-foreground leading-none tracking-tight mb-2 sm:mb-3"
                  style={{ fontSize: 'clamp(32px, 6vw, 64px)' }}
                >
                  All Products
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground">
                  {loading
                    ? 'Loading products…'
                    : `${filteredProducts.length} premium products`}
                </p>
              </div>

              {/* Active filter count badge */}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="self-start sm:self-auto flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-full border border-primary/30 text-primary bg-primary/5 hover:bg-primary/10 transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Clear filters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── Main Content ── */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
          <div className="flex gap-6 lg:gap-8 items-start relative">

            {/* ── Filter Sidebar (desktop: sticky, mobile: overlay via FilterSidebarNew) ── */}
            <FilterSidebarNew
              isOpen={showFilters}
              onClose={() => setShowFilters(false)}
              onFilterChange={setFilters}
            />

            {/* ── Products column ── */}
            <div className="flex-1 min-w-0">

              {/* Toolbar: result count + mobile filter toggle */}
              <div className="flex items-center justify-between mb-5 sm:mb-6 gap-3">
                {!loading && filteredProducts.length > 0 && (
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Showing{' '}
                    <span className="font-semibold text-foreground">
                      {(currentPage - 1) * pageSize + 1}
                    </span>
                    {' '}–{' '}
                    <span className="font-semibold text-foreground">
                      {Math.min(currentPage * pageSize, filteredProducts.length)}
                    </span>
                    {' '}of{' '}
                    <span className="font-semibold text-foreground">{filteredProducts.length}</span>
                  </p>
                )}
                {loading && (
                  <div className="h-4 w-40 rounded-full bg-muted animate-pulse" />
                )}

                {/* Mobile filter button — inline in toolbar */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="md:hidden flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-full border border-border bg-background hover:bg-muted transition-colors shrink-0"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  Filters
                  {hasActiveFilters && (
                    <span className="w-4 h-4 rounded-full bg-primary text-primary-foreground text-[9px] font-bold flex items-center justify-center">
                      {filters.categories.length + filters.ratings.length + (filters.sortBy !== 'newest' ? 1 : 0)}
                    </span>
                  )}
                </button>
              </div>

              {/* ── Loading skeleton ── */}
              {loading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div key={i} className="border border-border rounded-2xl p-4 animate-pulse">
                      <div className="aspect-square bg-muted rounded-xl mb-4" />
                      <div className="h-3.5 bg-muted rounded-full w-3/4 mb-2.5" />
                      <div className="h-3.5 bg-muted rounded-full w-1/2 mb-4" />
                      <div className="h-9 bg-muted rounded-xl w-full" />
                    </div>
                  ))}
                </div>
              )}

              {/* ── Empty state ── */}
              {!loading && filteredProducts.length === 0 && (
                <div className="flex flex-col items-center justify-center text-center py-24 sm:py-32 px-4">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-muted flex items-center justify-center mb-6">
                    <svg className="w-9 h-9 sm:w-11 sm:h-11 text-muted-foreground/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 103.5 3.5a7.5 7.5 0 0013.15 13.15z" />
                    </svg>
                  </div>
                  <p className="text-lg sm:text-xl font-semibold text-foreground mb-2"
                    style={{ fontFamily: 'Georgia, serif' }}>
                    No products found
                  </p>
                  <p className="text-sm text-muted-foreground mb-8 max-w-xs">
                    We couldn't find anything matching your current filters. Try broadening your search.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="px-6 py-2.5 rounded-full border-2 border-primary text-primary text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}

              {/* ── Product grid ── */}
              {!loading && filteredProducts.length > 0 && (
                <>
                  <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 mb-10 sm:mb-12">
                    {displayedProducts.map(product => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={handleAddToCart}
                      />
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={(page) => {
                        dispatch(setCurrentPage(page))
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                      }}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>


    </>
  )
}