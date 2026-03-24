'use client'

import { useState } from 'react'

interface FilterSidebarNewProps {
  onFilterChange: (filters: FilterState) => void
  isOpen?: boolean
  onClose?: () => void
}

export interface FilterState {
  categories: string[]
  priceRange: [number, number]
  ratings: number[]
  sortBy: string
}

const defaultFilters: FilterState = {
  categories: [],
  priceRange: [0, 1000],
  ratings: [],
  sortBy: 'newest',
}

export function FilterSidebarNew({ onFilterChange, isOpen = true, onClose }: FilterSidebarNewProps) {
  const [filters, setFilters] = useState<FilterState>(defaultFilters)
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    rating: true,
    sort: true,
  })

  const categories = ['Electronics', 'Fashion', 'Home', 'Sports', 'Books']
  const ratings = [5, 4, 3, 2, 1]

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  const handleCategoryChange = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category]
    const newFilters = { ...filters, categories: newCategories }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handlePriceRangeChange = (type: 'min' | 'max', value: number) => {
    const [min, max] = filters.priceRange
    const newRange: [number, number] = type === 'min' ? [value, max] : [min, value]
    if (newRange[0] <= newRange[1]) {
      const newFilters = { ...filters, priceRange: newRange }
      setFilters(newFilters)
      onFilterChange(newFilters)
    }
  }

  const handleRatingChange = (rating: number) => {
    const newRatings = filters.ratings.includes(rating)
      ? filters.ratings.filter(r => r !== rating)
      : [...filters.ratings, rating]
    const newFilters = { ...filters, ratings: newRatings }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleSortChange = (value: string) => {
    const newFilters = { ...filters, sortBy: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleResetFilters = () => {
    setFilters(defaultFilters)
    onFilterChange(defaultFilters)
  }

  return (
    <>
      {/* ── Mobile backdrop ── */}
      <div
        className={[
          'fixed inset-0 bg-black/40 backdrop-blur-sm z-40',
          'md:hidden',
          'transition-opacity duration-300',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        ].join(' ')}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* ── Sidebar ──
            Mobile  : fixed, slides in from the LEFT, full viewport height, top-0
            Desktop : sticky column, no fixed positioning
      ── */}
      <aside
        className={[
          // ── Mobile: fixed drawer ──
          'fixed top-0 left-0 h-screen w-[min(320px,85vw)]',
          'bg-background border-r border-border',
          'overflow-y-auto overscroll-contain',
          'transition-transform duration-300 ease-in-out',
          'z-50',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          // ── Desktop: back to normal flow ──
          'md:static md:translate-x-0',
          'md:h-auto md:max-h-[calc(100vh-80px)]',
          'md:w-64 lg:w-72',
          'md:sticky md:top-20',
          'md:z-0',
          'md:rounded-2xl md:border md:border-border',
          'md:shadow-none',
        ].join(' ')}
      >
        {/* Header */}
        <div className="sticky top-0 bg-background border-b border-border px-5 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            <h3 className="text-base font-bold text-foreground">Filters</h3>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleResetFilters}
              className="text-xs font-semibold text-primary hover:text-primary/70 px-2 py-1 rounded-lg hover:bg-primary/5 transition-colors"
            >
              Reset all
            </button>
            {/* Close button — mobile only */}
            <button
              onClick={onClose}
              className="md:hidden p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              aria-label="Close filters"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable filter body */}
        <div className="p-5 space-y-1 pb-28 md:pb-6">

          {/* ── Sort ── */}
          <FilterSection
            title="Sort By"
            isOpen={expandedSections.sort}
            onToggle={() => toggleSection('sort')}
          >
            <div className="space-y-0.5 pt-1">
              {[
                { value: 'newest', label: 'Newest' },
                { value: 'popular', label: 'Most Popular' },
                { value: 'price-low', label: 'Price: Low to High' },
                { value: 'price-high', label: 'Price: High to Low' },
                { value: 'rating', label: 'Highest Rated' },
              ].map(option => (
                <label
                  key={option.value}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-accent transition-colors group"
                >
                  <input
                    type="radio"
                    name="sort"
                    value={option.value}
                    checked={filters.sortBy === option.value}
                    onChange={e => handleSortChange(e.target.value)}
                    className="w-4 h-4 accent-primary cursor-pointer shrink-0"
                  />
                  <span className="text-sm text-foreground font-medium">{option.label}</span>
                </label>
              ))}
            </div>
          </FilterSection>

          <Divider />

          {/* ── Categories ── */}
          <FilterSection
            title="Categories"
            isOpen={expandedSections.categories}
            onToggle={() => toggleSection('categories')}
          >
            <div className="space-y-0.5 pt-1">
              {categories.map(category => (
                <label
                  key={category}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-accent transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    className="w-4 h-4 rounded accent-primary cursor-pointer shrink-0"
                  />
                  <span className="text-sm text-foreground font-medium">{category}</span>
                  {filters.categories.includes(category) && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                  )}
                </label>
              ))}
            </div>
          </FilterSection>

          <Divider />

          {/* ── Price Range ── */}
          <FilterSection
            title="Price Range"
            isOpen={expandedSections.price}
            onToggle={() => toggleSection('price')}
          >
            <div className="pt-2 space-y-4">
              {/* Price badge */}
              <div className="flex items-center justify-between bg-primary/8 border border-primary/15 px-4 py-2.5 rounded-xl">
                <span className="text-xs text-muted-foreground font-medium">Range</span>
                <span className="text-sm font-bold text-primary">
                  ${filters.priceRange[0]} — ${filters.priceRange[1]}
                </span>
              </div>

              <div className="space-y-3 px-1">
                <div>
                  <div className="flex justify-between mb-1.5">
                    <label className="text-xs font-medium text-muted-foreground">Min</label>
                    <span className="text-xs font-semibold text-foreground">${filters.priceRange[0]}</span>
                  </div>
                  <input
                    type="range" min="0" max="1000"
                    value={filters.priceRange[0]}
                    onChange={e => handlePriceRangeChange('min', Number(e.target.value))}
                    className="w-full h-1.5 bg-border rounded-full appearance-none cursor-pointer accent-primary"
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-1.5">
                    <label className="text-xs font-medium text-muted-foreground">Max</label>
                    <span className="text-xs font-semibold text-foreground">${filters.priceRange[1]}</span>
                  </div>
                  <input
                    type="range" min="0" max="1000"
                    value={filters.priceRange[1]}
                    onChange={e => handlePriceRangeChange('max', Number(e.target.value))}
                    className="w-full h-1.5 bg-border rounded-full appearance-none cursor-pointer accent-primary"
                  />
                </div>
              </div>
            </div>
          </FilterSection>

          <Divider />

          {/* ── Rating ── */}
          <FilterSection
            title="Rating"
            isOpen={expandedSections.rating}
            onToggle={() => toggleSection('rating')}
          >
            <div className="space-y-0.5 pt-1">
              {ratings.map(rating => (
                <label
                  key={rating}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-accent transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={filters.ratings.includes(rating)}
                    onChange={() => handleRatingChange(rating)}
                    className="w-4 h-4 rounded accent-primary cursor-pointer shrink-0"
                  />
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} className={`w-3.5 h-3.5 ${i < rating ? 'fill-amber-400' : 'fill-muted'}`} viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                    <span className="text-xs text-muted-foreground ml-1">& up</span>
                  </div>
                </label>
              ))}
            </div>
          </FilterSection>

        </div>

        {/* ── Mobile sticky footer: Apply button ── */}
        <div className="hidden fixed bottom-0 left-0 w-[min(320px,85vw)] bg-background border-t border-border px-5 py-4 z-50">
          <button
            onClick={onClose}
            className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            Apply Filters
          </button>
        </div>
      </aside>
    </>
  )
}

/* ── Small reusable pieces ── */

function Divider() {
  return <div className="h-px bg-border mx-1 my-1" />
}

function FilterSection({
  title,
  isOpen,
  onToggle,
  children,
}: {
  title: string
  isOpen: boolean
  onToggle: () => void
  children: React.ReactNode
}) {
  return (
    <div className="py-1">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-1 py-2 hover:text-primary transition-colors group"
      >
        <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
          {title}
        </h4>
        <svg
          className={`w-3.5 h-3.5 text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && children}
    </div>
  )
}