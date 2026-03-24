'use client'

import { api } from '@/lib/api'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function BlogDetailPage() {
  const params = useParams()
  const [post, setPost] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPost = async () => {
      const blogPost = await api.getBlogPostById(params.id as string)
      setPost(blogPost)
      setLoading(false)
    }
    loadPost()
  }, [params.id])

  if (loading) {
    return (
      <>
        <main className="min-h-screen bg-background py-8">
          <div className="max-w-3xl mx-auto px-4 md:px-8 animate-pulse">
            <div className="aspect-video bg-muted rounded mb-8" />
            <div className="h-10 bg-muted rounded w-3/4 mb-4" />
            <div className="h-6 bg-muted rounded w-1/2" />
          </div>
        </main>

      </>
    )
  }

  if (!post) {
    return (
      <>
        <main className="min-h-screen bg-background py-8">
          <div className="max-w-3xl mx-auto px-4 md:px-8 text-center">
            <p className="text-lg text-muted-foreground">Post not found</p>
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
          <div className="container mx-auto px-4 md:px-8 py-4">
            <div className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link>
              <span className="text-muted-foreground">/</span>
              <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">Blog</Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground font-medium line-clamp-1">{post.title}</span>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="border-b border-border">
          <div className="max-w-3xl mx-auto px-4 md:px-8">
            <div className="aspect-video relative bg-muted rounded-lg overflow-hidden mt-8 mb-8">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <article className="container mx-auto px-4 md:px-8 py-12">
          {/* Meta */}
          <div className="mb-8 pb-8 border-b border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full font-medium">
                {post.category}
              </span>
              <span className="text-sm text-muted-foreground">{post.date}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-semibold text-foreground mb-4 text-balance">
              {post.title}
            </h1>

            <p className="text-lg text-muted-foreground mb-4">{post.excerpt}</p>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                {post.author?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-medium text-foreground">{post.author}</p>
                <p className="text-sm text-muted-foreground">Published {post.date}</p>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="prose prose-sm md:prose-base max-w-none mb-12">
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {post.content}
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Key Takeaways</h2>
            <ul className="space-y-3 mb-8">
              <li className="flex gap-3">
                <span className="text-primary font-bold mt-1">•</span>
                <span className="text-muted-foreground">Quality products enhance your daily lifestyle and well-being</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold mt-1">•</span>
                <span className="text-muted-foreground">Sustainable choices make a positive environmental impact</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold mt-1">•</span>
                <span className="text-muted-foreground">Investing in timeless pieces creates a lasting wardrobe</span>
              </li>
            </ul>

            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">Conclusion</h2>
            <p className="text-muted-foreground leading-relaxed">
              Thank you for reading this article. We hope you found it valuable and inspiring. Visit our blog regularly for more insights and tips to enhance your shopping experience and lifestyle.
            </p>
          </div>

          {/* Share Section */}
          <div className="border-y border-border py-8 mb-12">
            <h3 className="font-semibold text-foreground mb-4">Share this article</h3>
            <div className="flex gap-3">
              <button className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors text-sm font-medium">
                Twitter
              </button>
              <button className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors text-sm font-medium">
                Facebook
              </button>
              <button className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors text-sm font-medium">
                LinkedIn
              </button>
              <button className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors text-sm font-medium">
                Copy Link
              </button>
            </div>
          </div>

          {/* CTA */}
          <div className="border border-border rounded-lg p-8 bg-card text-center">
            <h3 className="text-2xl font-semibold text-foreground mb-3">Ready to shop?</h3>
            <p className="text-muted-foreground mb-6">Discover the products mentioned in this article</p>
            <Link
              href="/products"
              className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium"
            >
              Browse Products
            </Link>
          </div>
        </article>
      </main>

    </>
  )
}
