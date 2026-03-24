'use client'

import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import type { Product } from '@/lib/slices/productsSlice'
import { toggleWishlist } from '@/lib/slices/productsSlice'
import Image from 'next/image'
import Link from 'next/link'

interface ProductCardProps {
  product: Product
  onAddToCart?: (product: Product) => void
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const dispatch = useAppDispatch()
  const { wishlist } = useAppSelector(state => state.products)
  const isWishlisted = wishlist.includes(product.id)

  return (
    <div className="border border-border rounded-2xl overflow-hidden transition-all duration-300 group">
      {/* Image */}
      <Link href={`/products/${product.id}`}>
        <div className="relative w-full aspect-square bg-muted overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover  transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-semibold">Out of Stock</span>
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <p className="text-xs text-muted-foreground mb-2">{product.category}</p>

        {/* Name */}
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-2 mb-2">
            {product.name}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-1 mb-3">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-3 h-3 ${i < Math.floor(product.rating)
                  ? 'fill-primary'
                  : 'fill-muted stroke-border'
                  }`}
                viewBox="0 0 20 20"
              >
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-semibold text-foreground">${product.price}</span>
          <button
            onClick={() => dispatch(toggleWishlist(product.id))}
            className="p-2 hover:bg-accent rounded-2xl transition-all duration-200 "
            title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <svg
              className={`w-5 h-5 transition-all ${isWishlisted ? 'fill-destructive text-destructive' : 'fill-none stroke-foreground hover:stroke-destructive'}`}
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => onAddToCart?.(product)}
          disabled={!product.inStock}
          className="w-full py-3 bg-primary text-primary-foreground rounded-2xl hover:bg-primary-dark transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground font-semibold text-sm"
        >
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  )
}
