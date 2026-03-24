import { IMAGE } from '@/constant/image.index'
import Image from 'next/image'
import Link from 'next/link'

function HeroSection() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 gap-2 md:gap-8 items-center">
          {/* top Content */}
          <div className="space-y-8">
            <div className="space-y-4 flex items-center gap-2 flex-col max-w-5xl mx-auto text-center justify-center">
              <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-xs font-semibold">
                Welcome to Modern Shopping
              </div>
              <h1
                style={{ fontFamily: 'neofolia' }}
                className="text-3xl md:text-6xl lg:text-7xl font-black text-foreground text-balance text-center max-w-5xl leading-tight font-n!"
              >
                Discover Premium Products
              </h1>
              <p className="text-sm md:text-lg lg:text-xl text-muted-foreground text-balance leading-relaxed">
                Shop from our curated collection of premium products. Fast shipping, competitive prices, and guaranteed satisfaction on every purchase.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/products"
                  className="px-8 py-4 bg-primary text-primary-foreground rounded-2xl hover:bg-primary-dark transition-all font-semibold text-center shadow-sm hover:shadow-md"
                >
                  Shop Now
                </Link>
                {/* <Link
                  href="#featured"
                  className="px-8 py-4 border-2 border-primary text-primary rounded-2xl hover:bg-primary hover:text-primary-foreground transition-all font-semibold text-center"
                >
                  View Featured
                </Link> */}
              </div>
            </div>



            {/* Stats */}
            {/* <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              <div className="space-y-1">
                <p className="text-3xl md:text-4xl font-bold text-primary">10K+</p>
                <p className="text-sm text-muted-foreground font-medium">Products</p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl md:text-4xl font-bold text-primary">50K+</p>
                <p className="text-sm text-muted-foreground font-medium">Customers</p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl md:text-4xl font-bold text-primary">24/7</p>
                <p className="text-sm text-muted-foreground font-medium">Support</p>
              </div>
            </div> */}
          </div>

          {/* bottom Visual */}
          <div className="relative pointer-events-none sm:-mt-16 flex w-full h-fit md:h-125 items-center justify-center">
            <Image src={IMAGE.hero_section} alt="Hero Section" width={1200} height={800} className='w-full h-full' />
          </div>
        </div>
      </div>
    </section >
  )
}

export default HeroSection