export function SkeletonLoader() {
  return (
    <div className="border border-border rounded-lg overflow-hidden">
      {/* Image skeleton */}
      <div className="w-full aspect-square bg-muted animate-pulse" />

      {/* Content skeleton */}
      <div className="p-4">
        {/* Category */}
        <div className="h-3 bg-muted rounded w-20 mb-2 animate-pulse" />

        {/* Title */}
        <div className="h-4 bg-muted rounded w-full mb-2 animate-pulse" />
        <div className="h-4 bg-muted rounded w-3/4 mb-3 animate-pulse" />

        {/* Description */}
        <div className="h-3 bg-muted rounded w-full mb-3 animate-pulse" />

        {/* Rating */}
        <div className="h-4 bg-muted rounded w-32 mb-4 animate-pulse" />

        {/* Price and Wishlist */}
        <div className="flex items-center justify-between mb-4">
          <div className="h-6 bg-muted rounded w-24 animate-pulse" />
          <div className="w-5 h-5 bg-muted rounded animate-pulse" />
        </div>

        {/* Button */}
        <div className="h-10 bg-muted rounded-lg animate-pulse" />
      </div>
    </div>
  )
}

export function ProductGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonLoader key={i} />
      ))}
    </div>
  )
}
