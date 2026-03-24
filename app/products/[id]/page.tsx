'use client'

import { api } from '@/lib/api'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { addToCart } from '@/lib/slices/cartSlice'
import type { Product } from '@/lib/slices/productsSlice'
import { toggleWishlist } from '@/lib/slices/productsSlice'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function ProductDetailPage() {
  const params = useParams()
  const dispatch = useAppDispatch()
  const { wishlist } = useAppSelector(state => state.products)
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedColor, setSelectedColor] = useState<string>('')
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [quantity, setQuantity] = useState(1)
  const [mainImage, setMainImage] = useState('')
  const [showNotification, setShowNotification] = useState(false)

  const isWishlisted = product ? wishlist.includes(product.id) : false

  useEffect(() => {
    const loadProduct = async () => {
      const prod = await api.getProductById(params.id as string)
      if (prod) {
        setProduct(prod)
        setMainImage(prod.image)
        if (prod.colors) setSelectedColor(prod.colors[0])
        if (prod.sizes) setSelectedSize(prod.sizes[0])
      }
      setLoading(false)
    }
    loadProduct()
  }, [params.id])

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity,
        color: selectedColor || undefined,
        size: selectedSize || undefined,
      }))
      setShowNotification(true)
      setTimeout(() => setShowNotification(false), 3000)
    }
  }

  if (loading) {
    return (
      <>
        <main className="min-h-screen bg-background py-8">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="animate-pulse">
              <div className="aspect-square bg-muted rounded mb-8" />
              <div className="h-8 bg-muted rounded w-1/2 mb-4" />
              <div className="h-6 bg-muted rounded w-1/4" />
            </div>
          </div>
        </main>

      </>
    )
  }

  if (!product) {
    return (
      <>
        <main className="min-h-screen bg-background py-8">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <p className="text-center text-lg text-muted-foreground">Product not found</p>
          </div>
        </main>

      </>
    )
  }

  return (
    <>
      <main className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <div className="border-b border-border bg-card">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
            <div className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link>
              <span className="text-muted-foreground">/</span>
              <Link href="/products" className="text-muted-foreground hover:text-foreground transition-colors">Products</Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground font-medium">{product.name}</span>
            </div>
          </div>
        </div>

        {/* Product Detail */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Images */}
            <div>
              <div className="aspect-square bg-muted rounded-lg border border-border overflow-hidden mb-4">
                <Image
                  src={mainImage}
                  alt={product.name}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setMainImage(img)}
                    className={`aspect-square border rounded-lg overflow-hidden ${mainImage === img ? 'border-primary' : 'border-border'
                      }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} ${idx + 1}`}
                      width={150}
                      height={150}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Details */}
            <div>
              <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
              <h1 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating)
                        ? 'fill-primary'
                        : 'fill-muted stroke-border'
                        }`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
              </div>

              {/* Price */}
              <div className="mb-6 pb-6 border-b border-border">
                <p className="text-4xl font-semibold text-foreground">${product.price}</p>
                {product.inStock ? (
                  <p className="text-sm text-green-600 mt-2">In Stock</p>
                ) : (
                  <p className="text-sm text-red-600 mt-2">Out of Stock</p>
                )}
              </div>

              {/* Description */}
              <p className="text-lg text-muted-foreground mb-8">{product.description}</p>

              {/* Options */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-3">Color</label>
                  <div className="flex gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 border rounded-lg transition-colors ${selectedColor === color
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary'
                          }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-3">Size</label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 border rounded-lg transition-colors ${selectedSize === size
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary'
                          }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-8">
                <label className="block text-sm font-medium mb-3">Quantity</label>
                <div className="flex items-center border border-border rounded-lg w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-muted transition-colors"
                  >
                    −
                  </button>
                  <span className="px-6 py-2 border-l border-r border-border">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-muted transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 mb-8">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => dispatch(toggleWishlist(product.id))}
                  className="px-6 py-3 border border-border rounded-lg hover:bg-muted transition-colors"
                >
                  <svg
                    className={`w-5 h-5 ${isWishlisted ? 'fill-destructive text-destructive' : 'fill-none stroke-foreground'}`}
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>
              </div>

              {showNotification && (
                <div className="p-4 bg-green-100 border border-green-300 rounded-lg text-green-800 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Added to cart successfully!</span>
                </div>
              )}

              {/* Additional Info */}
              <div className="border-t border-border pt-8">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Shipping</p>
                    <p className="font-medium">Free over $50</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Returns</p>
                    <p className="font-medium">30 days</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Warranty</p>
                    <p className="font-medium">1 year</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

    </>
  )
}
