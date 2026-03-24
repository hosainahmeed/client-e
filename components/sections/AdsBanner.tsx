const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
      </svg>
    ),
    eyebrow: 'Limited Time',
    title: 'Summer Sale',
    desc: 'Up to 50% off on selected items',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
    eyebrow: 'No Minimum',
    title: 'Free Shipping',
    desc: 'On all orders over $50',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
      </svg>
    ),
    eyebrow: 'Hassle Free',
    title: 'Easy Returns',
    desc: '30-day money back guarantee',
  },
]

function AdsBanner() {
  return (
    <section className="relative overflow-hidden py-8 sm:py-10 md:py-12">

      {/* Subtle noise texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1  divide-x divide-white/40 lg:grid-cols-3  bg-white/6 rounded-xl sm:rounded-2xl overflow-hidden border border-white/6">
          {features.map((f, i) => (
            <div
              key={i}
              className="group relative bg-[#0f0f0f]/90 px-4 sm:px-5 md:px-6 lg:px-8 py-4 sm:py-5 md:py-6 lg:py-7 xl:py-9 flex flex-col sm:flex-row items-start gap-3 sm:gap-4 transition-colors duration-300"
            >
              {/* Hover glow spot */}
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.04),transparent_70%)]" />

              {/* Icon */}
              <div className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-lg sm:rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 group-hover:text-white group-hover:border-white/20 group-hover:bg-white/10 transition-all duration-300">
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" stroke="currentColor" strokeWidth={1.5}>
                  {f.icon.props.children}
                </svg>
              </div>

              {/* Text */}
              <div className="min-w-0 flex-1">
                <p className="text-[9px] sm:text-[10px] font-semibold tracking-[0.15em] sm:tracking-[0.18em] uppercase text-white/30 mb-1">
                  {f.eyebrow}
                </p>
                <p
                  className="text-base sm:text-lg lg:text-xl font-bold text-white leading-tight mb-1"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {f.title}
                </p>
                <p className="text-xs sm:text-sm text-white/45 leading-snug">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AdsBanner