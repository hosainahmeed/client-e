'use client'

import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { setFilter, setSortBy, clearFilters } from '@/lib/slices/productsSlice'
import { useEffect, useState } from 'react'

interface FilterSidebarProps {
  categories: string[]
  onClose?: () => void
}

export function FilterSidebar({ categories, onClose }: FilterSidebarProps) {
  const dispatch = useAppDispatch()
  const { filters, sortBy } = useAppSelector(state => state.products)
  const [localFilters, setLocalFilters] = useState(filters)
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    category: true,
    size: false,
    color: false,
  })

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const handlePriceChange = (min: number, max: number) => {
    setLocalFilters(prev => ({
      ...prev,
      priceRange: [min, max],
    }))
  }

  const handleCategoryChange = (category: string) => {
    setLocalFilters(prev => ({
      ...prev,
      category: prev.category === category ? undefined : category,
    }))
  }

  const handleApplyFilters = () => {
    dispatch(setFilter(localFilters))
    onClose?.()
  }

  return (
    <div className="w-full md:w-64 border-r border-border bg-background p-4 md:p-6 max-h-[calc(100vh-80px)] overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-semibold text-lg">Filters</h2>
        <button
          onClick={() => dispatch(clearFilters())}
          className="text-xs text-primary hover:underline"
        >
          Clear All
        </button>
      </div>

      {/* Sort */}
      <div className="mb-6 pb-6 border-b border-border">
        <h3 className="font-medium text-sm mb-3 cursor-pointer" onClick={() => toggleSection('sort')}>
          Sort By
        </h3>
        <select
          value={sortBy}
          onChange={e => dispatch(setSortBy(e.target.value as any))}
          className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
        >
          <option value="newest">Newest</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>

      {/* Price */}
      <div className="mb-6 pb-6 border-b border-border">
        <h3
          className="font-medium text-sm mb-3 cursor-pointer flex items-center justify-between"
          onClick={() => toggleSection('price')}
        >
          Price Range
          <svg
            className={`w-4 h-4 transition-transform ${expandedSections.price ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </h3>

        {expandedSections.price && (
          <div className="space-y-3">
            <div>
              <label className="text-xs text-muted-foreground block mb-1">Min: ${localFilters.priceRange[0]}</label>
              <input
                type="range"
                min="0"
                max="1000"
                value={localFilters.priceRange[0]}
                onChange={e => handlePriceChange(Number(e.target.value), localFilters.priceRange[1])}
                className="w-full"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground block mb-1">Max: ${localFilters.priceRange[1]}</label>
              <input
                type="range"
                min="0"
                max="1000"
                value={localFilters.priceRange[1]}
                onChange={e => handlePriceChange(localFilters.priceRange[0], Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        )}
      </div>

      {/* Category */}
      <div className="mb-6 pb-6 border-b border-border">
        <h3
          className="font-medium text-sm mb-3 cursor-pointer flex items-center justify-between"
          onClick={() => toggleSection('category')}
        >
          Category
          <svg
            className={`w-4 h-4 transition-transform ${expandedSections.category ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </h3>

        {expandedSections.category && (
          <div className="space-y-2">
            {categories.map(category => (
              <label key={category} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={localFilters.category === category}
                  onChange={() => handleCategoryChange(category)}
                  className="w-4 h-4 border border-border rounded"
                />
                <span className="text-sm text-foreground">{category}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Apply Button (Mobile) */}
      <button
        onClick={handleApplyFilters}
        className="w-full md:hidden py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium text-sm"
      >
        Apply Filters
      </button>
    </div>
  )
}
