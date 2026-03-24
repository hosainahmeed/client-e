'use client'

import { useAppSelector } from '@/lib/hooks'
import Link from 'next/link'

export default function OrderSuccessPage() {
  const { orders } = useAppSelector(state => state.user)
  const lastOrder = orders[0]

  return (
    <>
      <main className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b border-border bg-card py-8">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <h1 className="text-3xl md:text-4xl font-semibold text-foreground">Order Confirmation</h1>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 md:px-8 py-16">
          {/* Success Message */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-green-100 border-2 border-green-300 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>

            <h2 className="text-3xl font-semibold text-foreground mb-3">Order Placed Successfully!</h2>
            <p className="text-lg text-muted-foreground mb-2">Thank you for your purchase</p>
            {lastOrder && (
              <p className="text-sm text-muted-foreground">Order ID: <span className="font-mono font-semibold text-foreground">{lastOrder.id}</span></p>
            )}
          </div>

          {/* Order Details */}
          {lastOrder && (
            <div className="border border-border rounded-lg p-8 mb-8 bg-card">
              <h3 className="text-lg font-semibold text-foreground mb-6">Order Details</h3>

              <div className="grid md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-border">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Order Number</p>
                  <p className="font-mono font-semibold text-foreground">{lastOrder.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Order Date</p>
                  <p className="font-semibold text-foreground">{lastOrder.date}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Status</p>
                  <p className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {lastOrder.status === 'pending' ? 'Processing' : lastOrder.status}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Amount</p>
                  <p className="text-2xl font-bold text-primary">${lastOrder.total.toFixed(2)}</p>
                </div>
              </div>

              {/* Next Steps */}
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">What's Next?</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-3">
                    <span className="text-primary font-semibold">1.</span>
                    <span className="text-muted-foreground">We're preparing your order for shipment</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-semibold">2.</span>
                    <span className="text-muted-foreground">You'll receive a shipping confirmation email</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-semibold">3.</span>
                    <span className="text-muted-foreground">Track your order in your account dashboard</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-4 flex-col sm:flex-row">
            <Link
              href="/products"
              className="flex-1 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium text-center"
            >
              Continue Shopping
            </Link>
            <Link
              href="/profile"
              className="flex-1 py-3 border border-border text-foreground rounded-lg hover:bg-muted transition-colors font-medium text-center"
            >
              View My Orders
            </Link>
          </div>

          {/* Info Box */}
          <div className="border border-border rounded-lg p-6 mt-8 bg-card">
            <h4 className="font-semibold text-foreground mb-3">Need Help?</h4>
            <p className="text-sm text-muted-foreground mb-4">
              If you have any questions about your order, please contact our customer support team.
            </p>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Email:</span> <a href="mailto:support@store.com" className="text-primary hover:underline">support@store.com</a></p>
              <p><span className="font-medium">Phone:</span> <a href="tel:+1234567890" className="text-primary hover:underline">+1 (234) 567-890</a></p>
              <p><span className="font-medium">Hours:</span> Monday - Friday, 9AM - 6PM EST</p>
            </div>
          </div>
        </div>
      </main>

    </>
  )
}
