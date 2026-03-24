'use client'

import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { applyCoupon, removeCoupon, removeFromCart, updateQuantity } from '@/lib/slices/cartSlice'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function CartPage() {
  const dispatch = useAppDispatch()
  const { items, totalPrice, totalItems, coupon } = useAppSelector(state => state.cart)
  const [couponCode, setCouponCode] = useState('')
  const [couponError, setCouponError] = useState('')

  const handleApplyCoupon = () => {
    // Mock coupon validation
    if (couponCode.toUpperCase() === 'SAVE10') {
      dispatch(applyCoupon({ code: 'SAVE10', discount: 10 }))
      setCouponCode('')
      setCouponError('')
    } else {
      setCouponError('Invalid coupon code')
    }
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discount = coupon ? subtotal * (coupon.discount / 100) : 0
  const total = subtotal - discount

  return (
    <>
      <main className="min-h-screen bg-background">
        {items.length === 0 ? (
          <div className="max-w-7xl flex items-center justify-center flex-col mx-auto px-4 md:px-8 py-16 text-center">

            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart-icon lucide-shopping-cart"><circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" /></svg>
            <h2 className="text-2xl font-semibold text-foreground mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">Add some items to get started</p>
            <Link
              href="/products"
              className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="border border-border rounded-lg overflow-hidden">
                  <div className="border-b border-border bg-card px-6 py-4">
                    <h2 className="font-semibold">Order Summary ({totalItems} items)</h2>
                  </div>

                  <div className="divide-y divide-border">
                    {items.map((item) => (
                      <div key={item.id} className="px-6 py-6 flex gap-6">
                        <Link href={`/products/${item.id}`}>
                          <div className="relative w-24 h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </Link>

                        <div className="flex-1">
                          <Link href={`/products/${item.id}`}>
                            <h3 className="font-semibold text-foreground hover:text-primary transition-colors mb-1">
                              {item.name}
                            </h3>
                          </Link>

                          {item.color && (
                            <p className="text-sm text-muted-foreground">Color: {item.color}</p>
                          )}
                          {item.size && (
                            <p className="text-sm text-muted-foreground">Size: {item.size}</p>
                          )}

                          <p className="text-lg font-semibold text-foreground mt-2">${item.price}</p>
                        </div>

                        <div className="flex flex-col items-end gap-4">
                          <button
                            onClick={() => dispatch(removeFromCart(item.id))}
                            className="text-sm text-destructive hover:underline"
                          >
                            Remove
                          </button>

                          <div className="flex items-center border border-border rounded-lg">
                            <button
                              onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                              className="px-3 py-1 hover:bg-muted transition-colors"
                            >
                              −
                            </button>
                            <span className="px-4 py-1 border-l border-r border-border">{item.quantity}</span>
                            <button
                              onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                              className="px-3 py-1 hover:bg-muted transition-colors"
                            >
                              +
                            </button>
                          </div>

                          <p className="font-semibold text-foreground">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Order Summary Sidebar */}
              <div className="lg:col-span-1">
                <div className="border border-border rounded-lg p-6 sticky top-24">
                  <h3 className="text-xl font-semibold text-foreground mb-6">Order Summary</h3>

                  {/* Coupon Input */}
                  <div className="mb-6 pb-6 border-b border-border">
                    <label className="block text-sm font-medium mb-2">Coupon Code</label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => {
                          setCouponCode(e.target.value.toUpperCase())
                          setCouponError('')
                        }}
                        placeholder="Enter code"
                        className="flex-1 px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
                      />
                      <button
                        onClick={handleApplyCoupon}
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity text-sm font-medium"
                      >
                        Apply
                      </button>
                    </div>
                    {couponError && <p className="text-xs text-destructive">{couponError}</p>}
                    {coupon && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-green-600">✓ {coupon.code} applied</span>
                        <button
                          onClick={() => dispatch(removeCoupon())}
                          className="text-xs text-muted-foreground hover:text-foreground"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                    <p className="text-xs text-muted-foreground mt-2">Tip: Try code "SAVE10"</p>
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between items-center text-green-600">
                        <span>Discount ({coupon?.discount}%)</span>
                        <span>-${discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-medium">{subtotal >= 50 ? 'Free' : '$10.00'}</span>
                    </div>
                    <div className="border-t border-border pt-3 flex justify-between items-center">
                      <span className="font-semibold">Total</span>
                      <span className="text-2xl font-bold text-primary">
                        ${(total + (subtotal < 50 ? 10 : 0)).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <Link
                    href="/checkout"
                    className="block w-full py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium text-center mb-3"
                  >
                    Proceed to Checkout
                  </Link>

                  {/* Continue Shopping */}
                  <Link
                    href="/products"
                    className="block w-full py-3 border border-border text-foreground rounded-lg hover:bg-muted transition-colors font-medium text-center"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

    </>
  )
}
