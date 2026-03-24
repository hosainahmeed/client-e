import { IMAGE } from '@/constant/image.index'
import Image from 'next/image'
import Link from 'next/link'

function CategorySection() {
  const categories = [
    {
      id: 1,
      name: 'Electronics',
      img: IMAGE.electronics,
      label: 'Explore Tech',
      count: '240+ items',
      // aspect ratio class: landscape on mobile, portrait on sm+
      ratioClass: '[aspect-ratio:4/3] sm:[aspect-ratio:3/4]',
      staggerClass: '',
    },
    {
      id: 2,
      name: 'Fashion',
      img: IMAGE.fashion,
      label: 'Discover Style',
      count: '580+ items',
      ratioClass: '[aspect-ratio:4/3] sm:[aspect-ratio:3/4]',
      staggerClass: 'md:mt-10',
    },
    {
      id: 3,
      name: 'Home',
      img: IMAGE.home,
      label: 'Shop Décor',
      count: '310+ items',
      ratioClass: '[aspect-ratio:4/3] sm:[aspect-ratio:3/4]',
      staggerClass: '',
    },
    {
      id: 4,
      name: 'Sports',
      img: IMAGE.sport,
      label: 'Gear Up',
      count: '190+ items',
      ratioClass: '[aspect-ratio:4/3] sm:[aspect-ratio:3/4]',
      staggerClass: 'md:-mt-10',
    },
  ]

  return (
    <section className="py-12 sm:py-16 overflow-hidden relative">

      {/* Ambient glow — scales with screen */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 sm:w-96 sm:h-96 lg:w-150 lg:h-150 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* ── Header ── */}
        <div className="flex flex-row items-center justify-between mb-8 sm:mb-12 lg:mb-14 gap-3 sm:gap-4">

          <h2
            className="font-bold font-n text-black leading-none tracking-tight"
            style={{ fontSize: 'clamp(26px, 5vw, 58px)' }}
          >
            Shop by
            <br />
            <span
              className="text-transparent"
              style={{ WebkitTextStroke: '1px rgba(0,0,0,0.25)' }}
            >
              Category
            </span>
          </h2>

          <Link
            href="/categories"
            className="group self-start sm:self-auto flex items-center gap-2 text-xs sm:text-[13px] font-medium text-neutral-500 border border-black/10 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full hover:text-black hover:border-black/30 hover:bg-black/5 transition-all duration-300 whitespace-nowrap"
          >
            All categories
            <svg
              className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform duration-300 group-hover:translate-x-1"
              viewBox="0 0 14 14"
              fill="none"
            >
              <path
                d="M2 7h10M8 3l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.id}`}
              className={[
                'group relative overflow-hidden block bg-neutral-900',
                'rounded-xl sm:rounded-2xl',
                category.ratioClass,
                category.staggerClass,
              ].join(' ')}
            >
              {/* Image with zoom on hover */}
              <div className="absolute inset-0 transition-transform duration-700 ease-out">
                <Image
                  src={category.img}
                  alt={category.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-[filter] duration-700 group-hover:brightness-[0.65]"
                />
              </div>

              {/* Base gradient */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent z-10" />

              {/* Indigo hover tint */}
              <div className="absolute inset-0 bg-linear-to-t from-indigo-600/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

              {/* Border glow */}
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl border border-transparent group-hover:border-white/15 transition-colors duration-500 z-20 pointer-events-none" />

              {/* Count badge — top right */}
              <span className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 text-[9px] sm:text-[10px] font-medium tracking-widest uppercase text-white/60 bg-white/10 backdrop-blur-md border border-white/15 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full group-hover:text-white group-hover:bg-white/15 transition-all duration-300">
                {category.count}
              </span>

              {/* Card content — bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 lg:p-6 z-20">
                <h3
                  className="text-base sm:text-lg lg:text-xl font-bold text-white tracking-tight mb-0.5 leading-tight"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  {category.name}
                </h3>

                <p className="text-[11px] sm:text-xs text-white/40 mb-2 sm:mb-3 lg:mb-4 group-hover:text-white/60 transition-colors duration-300">
                  {category.count}
                </p>

                {/*
                  CTA:
                  - Mobile: always visible (no translate/opacity hide) — tap-friendly
                  - sm+: hidden by default, slides up on hover
                */}
                <span className="flex items-center gap-2 text-[10px] sm:text-[11px] font-medium tracking-[0.08em] uppercase text-indigo-300 sm:translate-y-2 sm:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="inline-block w-4 sm:w-5 h-px bg-indigo-300 group-hover:w-7 sm:group-hover:w-8 transition-all duration-300" />
                  {category.label}
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}

export default CategorySection