'use client'

import { IMAGE } from '@/constant/image.index'
import Image from 'next/image'
import Link from 'next/link'

export default function CategoriesPage() {
  const categories = [
    {
      id: 1,
      name: 'Electronics',
      icon: <Image src={IMAGE.electronics} alt="Fashion" width={100} height={100} />,
      color: 'from-blue-400 to-blue-200',
      description: 'Laptops, phones, tablets, and more tech products',
      count: 2500
    },
    {
      id: 2,
      name: 'Fashion',
      icon: <Image src={IMAGE.fashion} alt="Fashion" width={100} height={100} />,
      color: 'from-pink-400 to-pink-200',
      description: 'Clothing, shoes, and accessories for every style',
      count: 3200
    },
    {
      id: 3,
      name: 'Home',
      icon: <Image src={IMAGE.home} alt="Fashion" width={100} height={100} />,
      color: 'from-orange-400 to-orange-200',
      description: 'Furniture, decor, and home improvement items',
      count: 1800
    },
    {
      id: 4,
      name: 'Sports',
      icon: <Image src={IMAGE.sport} alt="Sports" width={100} height={100} />,
      color: 'from-green-400 to-green-200',
      description: 'Equipment, gear, and apparel for sports enthusiasts',
      count: 1200
    },
    {
      id: 5,
      name: 'Books',
      icon: <Image src={IMAGE.books} alt="Books" width={100} height={100} />,
      color: 'from-purple-400 to-purple-200',
      description: 'Fiction, non-fiction, educational, and more',
      count: 5000
    },
    {
      id: 6,
      name: 'Beauty',
      icon: '💄',
      color: 'from-red-400 to-red-200',
      description: 'Cosmetics, skincare, and beauty products',
      count: 800
    },
  ]

  return (
    <>
      <main className="min-h-screen bg-background">
        {/* Page Header */}
        <section className="bg-linear-to-br from-primary/5 via-background to-accent py-12 md:py-20">
          <div className="container mx-auto px-4 md:px-8">
            <div className="space-y-4">
              <h1 className="text-3xl font-n md:text-6xl font-bold text-foreground">All Categories</h1>
              <p className="text-xs md:text-base text-muted-foreground max-w-2xl">Browse our complete collection of premium products across multiple categories</p>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-16 md:py-28 bg-background">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map(category => (
                <Link
                  key={category.id}
                  href={`/categories/${category.id}`}
                  className="group"
                >
                  <div className={`bg-gradient-to-br ${category.color} rounded-2xl p-8 transition-all duration-300 hover:shadow-xl  border border-white/20 min-h-80 flex flex-col justify-between`}>
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <p className="text-8xl transition-transform duration-300">{category.icon}</p>
                        <span className="bg-background/90 text-foreground px-4 py-2 rounded-full text-sm font-bold">
                          {category.count}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-3xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {category.name}
                        </h3>
                        <p className="text-foreground/80 text-sm leading-relaxed">
                          {category.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all pt-4 border-t border-white/30">
                      <span>Explore</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>


    </>
  )
}
