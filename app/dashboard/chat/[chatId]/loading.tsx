export default function Loading() {
  const numSkeletons = Math.floor(Math.random() * 5) + 2; // Random number between 2-6

  return (
    <div className="flex-1 flex flex-col p-4 gap-4 bg-gradient-to-b from-gray-900/50 via-black/50 to-gray-900/50 backdrop-blur-sm relative">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-cyan-600/5 rounded-full mix-blend-screen filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-purple-600/5 rounded-full mix-blend-screen filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Message loading skeletons */}
      <div className="relative z-10 flex-1 space-y-6 max-w-4xl mx-auto w-full">
        {[...Array(numSkeletons)].map((_, i) => (
          <div key={i} className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-700 to-gray-800 animate-pulse relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full animate-pulse delay-300"></div>
            </div>
            <div className="flex-1 space-y-3">
              <div className="h-4 w-24 bg-gradient-to-r from-gray-700 to-gray-800 rounded animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gradient-to-r from-gray-700 to-gray-800 rounded animate-pulse" style={{width: `${60 + Math.random() * 40}%`}}></div>
                <div className="h-4 bg-gradient-to-r from-gray-700 to-gray-800 rounded animate-pulse" style={{width: `${40 + Math.random() * 50}%`}}></div>
                {i % 2 === 0 && (
                  <div className="h-4 bg-gradient-to-r from-gray-700 to-gray-800 rounded animate-pulse" style={{width: `${30 + Math.random() * 40}%`}}></div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input box loading skeleton */}
      <div className="relative z-10 max-w-4xl mx-auto w-full">
        <div className="h-16 bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm rounded-2xl animate-pulse border border-gray-700 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl animate-pulse delay-500"></div>
          <div className="absolute left-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-r from-gray-600 to-gray-700 rounded-lg animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
