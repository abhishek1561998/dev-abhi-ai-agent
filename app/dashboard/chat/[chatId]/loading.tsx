export default function Loading() {
  const numSkeletons = Math.floor(Math.random() * 5) + 2; // Random number between 2-6

  return (
    <div className="flex-1 flex flex-col p-4 gap-4">
      {/* Message loading skeletons */}
      <div className="flex-1 space-y-6">
        {[...Array(numSkeletons)].map((_, i) => (
          <div key={i} className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
              <div
                className={`h-${12 + i * 4} bg-gray-200 rounded animate-pulse`}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Input box loading skeleton */}
      <div className="h-12 bg-gray-200 rounded animate-pulse" />
    </div>
  );
}
