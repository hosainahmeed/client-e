'use client'

import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-border bg-accent">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">EC</span>
              </div>
              <span className="font-bold text-lg">Store</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Premium products for the modern lifestyle. Quality, style, and value in every purchase.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-bold text-foreground mb-6">Shop</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/products" className="text-muted-foreground hover:text-foreground hover:font-semibold transition-all duration-200">All Products</Link></li>
              <li><Link href="/categories" className="text-muted-foreground hover:text-foreground hover:font-semibold transition-all duration-200">Categories</Link></li>
              <li><Link href="/products" className="text-muted-foreground hover:text-foreground hover:font-semibold transition-all duration-200">New Arrivals</Link></li>
              <li><Link href="/products" className="text-muted-foreground hover:text-foreground hover:font-semibold transition-all duration-200">Sale Items</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold text-foreground mb-6">Company</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="text-muted-foreground hover:text-foreground hover:font-semibold transition-all duration-200">About Us</Link></li>
              <li><Link href="/blog" className="text-muted-foreground hover:text-foreground hover:font-semibold transition-all duration-200">Blog</Link></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-foreground hover:font-semibold transition-all duration-200">Careers</Link></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-foreground hover:font-semibold transition-all duration-200">Press</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold text-foreground mb-6">Support</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="text-muted-foreground hover:text-foreground hover:font-semibold transition-all duration-200">Contact Us</Link></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-foreground hover:font-semibold transition-all duration-200">Shipping Info</Link></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-foreground hover:font-semibold transition-all duration-200">Returns</Link></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-foreground hover:font-semibold transition-all duration-200">FAQ</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
          <p className="text-muted-foreground">&copy; 2024 Modern Store. All rights reserved.</p>
          <div className="flex items-center gap-8">
            <a href="#" className="text-muted-foreground hover:text-foreground hover:font-semibold transition-all duration-200">Twitter</a>
            <a href="#" className="text-muted-foreground hover:text-foreground hover:font-semibold transition-all duration-200">Instagram</a>
            <a href="#" className="text-muted-foreground hover:text-foreground hover:font-semibold transition-all duration-200">Facebook</a>
            <a href="#" className="text-muted-foreground hover:text-foreground hover:font-semibold transition-all duration-200">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
