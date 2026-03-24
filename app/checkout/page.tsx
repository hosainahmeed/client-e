'use client'

import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { clearCart } from '@/lib/slices/cartSlice'
import { addOrder } from '@/lib/slices/userSlice'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function CheckoutPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { items, totalPrice } = useAppSelector(state => state.cart)
  const { isAuthenticated } = useAppSelector(state => state.user)
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
  })
  const [loading, setLoading] = useState(false)

  if (items.length === 0) {
    return (
      <>
        <main className="min-h-screen bg-background py-16">
          <div className="max-w-2xl mx-auto px-4 md:px-8 text-center">
            <h1 className="text-3xl font-semibold text-foreground mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">Add items to your cart before proceeding to checkout</p>
            <Link
              href="/products"
              className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
            >
              Return to Products
            </Link>
          </div>
        </main>

      </>
    )
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmitStep = (e: React.FormEvent, nextStep: number) => {
    e.preventDefault()
    setCurrentStep(nextStep)
  }

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000))

    dispatch(addOrder({
      id: `ORD-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      total: totalPrice,
      status: 'pending',
    }))

    dispatch(clearCart())
    setLoading(false)
    router.push('/order-success')
  }

  return (
    <>
      <main className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b border-border bg-card py-8">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <h1 className="text-3xl md:text-4xl font-semibold text-foreground">Checkout</h1>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              {/* Progress Steps */}
              <div className="mb-12">
                <div className="flex items-center justify-between">
                  {[1, 2, 3].map((step) => (
                    <div key={step} className="flex items-center flex-1">
                      <button
                        onClick={() => step < currentStep && setCurrentStep(step)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${currentStep >= step
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                          }`}
                      >
                        {step < currentStep ? '✓' : step}
                      </button>
                      {step < 3 && (
                        <div
                          className={`flex-1 h-1 mx-2 ${currentStep > step ? 'bg-primary' : 'bg-muted'
                            }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-4 text-sm">
                  <span className={currentStep >= 1 ? 'text-foreground font-medium' : 'text-muted-foreground'}>
                    Shipping
                  </span>
                  <span className={currentStep >= 2 ? 'text-foreground font-medium' : 'text-muted-foreground'}>
                    Billing
                  </span>
                  <span className={currentStep >= 3 ? 'text-foreground font-medium' : 'text-muted-foreground'}>
                    Payment
                  </span>
                </div>
              </div>

              {/* Step 1: Shipping */}
              {currentStep === 1 && (
                <form onSubmit={(e) => handleSubmitStep(e, 2)} className="space-y-6">
                  <h2 className="text-2xl font-semibold text-foreground mb-6">Shipping Address</h2>

                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">State/Province</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">ZIP/Postal Code</label>
                      <input
                        type="text"
                        name="zip"
                        value={formData.zip}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Country</label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 pt-8">
                    <Link
                      href="/cart"
                      className="px-8 py-3 border border-border rounded-lg hover:bg-muted transition-colors font-medium"
                    >
                      Back to Cart
                    </Link>
                    <button
                      type="submit"
                      className="flex-1 px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium"
                    >
                      Continue to Billing
                    </button>
                  </div>
                </form>
              )}

              {/* Step 2: Billing (Same as Shipping) */}
              {currentStep === 2 && (
                <form onSubmit={(e) => handleSubmitStep(e, 3)} className="space-y-6">
                  <h2 className="text-2xl font-semibold text-foreground mb-6">Billing Address</h2>
                  <p className="text-sm text-muted-foreground mb-4">Same as shipping address (mock)</p>

                  <div className="flex gap-4 pt-8">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="px-8 py-3 border border-border rounded-lg hover:bg-muted transition-colors font-medium"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </form>
              )}

              {/* Step 3: Payment */}
              {currentStep === 3 && (
                <form onSubmit={handlePlaceOrder} className="space-y-6">
                  <h2 className="text-2xl font-semibold text-foreground mb-6">Payment Method</h2>

                  <div>
                    <label className="block text-sm font-medium mb-2">Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Expiry Date</label>
                      <input
                        type="text"
                        name="cardExpiry"
                        value={formData.cardExpiry}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        required
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">CVC</label>
                      <input
                        type="text"
                        name="cardCVC"
                        value={formData.cardCVC}
                        onChange={handleInputChange}
                        placeholder="123"
                        required
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                      />
                    </div>
                  </div>

                  <div className="border border-border rounded-lg p-4 bg-card">
                    <p className="text-sm text-muted-foreground">This is a demo checkout. No real payment will be processed.</p>
                  </div>

                  <div className="flex gap-4 pt-8">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="px-8 py-3 border border-border rounded-lg hover:bg-muted transition-colors font-medium"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                    >
                      {loading ? 'Processing...' : 'Place Order'}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="border border-border rounded-lg p-6 sticky top-24">
                <h3 className="text-xl font-semibold text-foreground mb-6">Order Summary</h3>

                <div className="space-y-4 mb-6 pb-6 border-b border-border max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.name} × {item.quantity}
                      </span>
                      <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium">Free</span>
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between items-center">
                    <span className="font-semibold">Total</span>
                    <span className="text-2xl font-bold text-primary">${totalPrice.toFixed(2)}</span>
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
