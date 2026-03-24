'use client'

import { api } from '@/lib/api'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPosts = async () => {
      const { posts: blogPosts } = await api.getBlogPosts()
      setPosts(blogPosts)
      setLoading(false)
    }
    loadPosts()
  }, [])

  return (
    <>
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="border-b border-border bg-card py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <h1 className="text-4xl font-n md:text-5xl font-semibold text-foreground mb-4 text-balance">
              Blog & Insights
            </h1>
            <p className="text-lg text-muted-foreground text-balance">
              Discover tips, trends, and stories from our community
            </p>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="border border-border rounded-lg overflow-hidden animate-pulse">
                  <div className="aspect-video bg-muted" />
                  <div className="p-6">
                    <div className="h-4 bg-muted rounded w-1/2 mb-4" />
                    <div className="h-6 bg-muted rounded w-full mb-4" />
                    <div className="h-4 bg-muted rounded w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link key={post.id} href={`/blog/${post.id}`}>
                  <article className="border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-colors group cursor-pointer">
                    {/* Image */}
                    <div className="relative border-b aspect-video bg-muted overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full font-medium">
                          {post.category}
                        </span>
                        <span className="text-xs text-muted-foreground">{post.date}</span>
                      </div>

                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-1">
                        {post.title}
                      </h3>

                      <p className="text-sm line-clamp-1 text-muted-foreground mb-4">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <span className="text-sm font-medium text-foreground">{post.author}</span>
                        <span className="text-primary text-sm">Read More →</span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Newsletter CTA */}
        <section className="border-y border-border bg-card py-16 md:py-24">
          <div className="max-w-2xl mx-auto px-4 md:px-8 text-center">
            <h2 className="text-3xl font-semibold text-foreground mb-4">Stay Updated</h2>
            <p className="text-lg text-muted-foreground mb-8">Get the latest blog posts delivered to your inbox</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>

    </>
  )
}
