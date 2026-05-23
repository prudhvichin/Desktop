/**
 * Skeleton loading card that matches GameCard layout
 */
export default function SkeletonCard() {
  return (
    <div className="glass-card overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="skeleton w-full aspect-video" />

      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        {/* Platform icons */}
        <div className="flex gap-2">
          <div className="skeleton w-5 h-5 rounded" />
          <div className="skeleton w-5 h-5 rounded" />
          <div className="skeleton w-5 h-5 rounded" />
        </div>

        {/* Title */}
        <div className="skeleton h-5 w-3/4 rounded" />

        {/* Genre tags */}
        <div className="flex gap-2">
          <div className="skeleton h-5 w-16 rounded-full" />
          <div className="skeleton h-5 w-20 rounded-full" />
        </div>

        {/* Rating & Date */}
        <div className="flex justify-between items-center">
          <div className="skeleton h-6 w-10 rounded" />
          <div className="skeleton h-4 w-20 rounded" />
        </div>
      </div>
    </div>
  );
}
