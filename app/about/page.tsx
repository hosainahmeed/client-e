import Link from 'next/link'

export default function AboutPage() {
  return (
    <>
      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="border-b border-border bg-card py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <h1 className="text-4xl md:text-5xl font-semibold text-foreground mb-4">About Us</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              We're passionate about delivering premium products and exceptional customer experiences
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-semibold text-foreground mb-4">Our Story</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Founded in 2020, our company began with a simple mission: to provide access to high-quality, sustainable products that enhance everyday life. We started small, but our commitment to excellence and customer satisfaction has helped us grow into the trusted brand you see today.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Every product in our collection is carefully curated to meet our rigorous standards for quality, design, and sustainability. We believe that style and responsibility go hand in hand.
              </p>
            </div>
            <div className="aspect-square bg-muted rounded-lg border border-border overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=600&fit=crop"
                alt="Our team"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="border-y border-border bg-card py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <h2 className="text-3xl font-semibold text-foreground mb-12 text-center">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: 'Quality', description: 'We never compromise on the quality of our products' },
                { title: 'Sustainability', description: 'We are committed to environmental responsibility' },
                { title: 'Customer First', description: 'Your satisfaction is our top priority' },
              ].map((value) => (
                <div key={value.title} className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <div className="w-6 h-6 bg-primary rounded-full" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: '50K+', label: 'Happy Customers' },
              { number: '1000+', label: 'Products' },
              { number: '30+', label: 'Days Return Policy' },
              { number: '100%', label: 'Satisfaction Guaranteed' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-4xl font-bold text-primary mb-2">{stat.number}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="border-y border-border bg-card py-12 md:py-16">
          <div className="max-w-2xl mx-auto px-4 md:px-8 text-center">
            <h2 className="text-3xl font-semibold text-foreground mb-4">Join Our Community</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Experience the difference quality and care can make
            </p>
            <Link
              href="/products"
              className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium"
            >
              Shop Now
            </Link>
          </div>
        </section>
      </main>

    </>
  )
}
