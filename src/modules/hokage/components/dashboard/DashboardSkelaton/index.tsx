const DashboardSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-card rounded-lg p-6 border border-gray-700"
          >
            <div className="h-4 bg-gray-600 rounded w-24 mb-4"></div>
            <div className="h-8 bg-gray-600 rounded w-16 mb-2"></div>
            <div className="h-3 bg-gray-600 rounded w-12"></div>
          </div>
        ))}
      </div>

      {/* Charts Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className="bg-card rounded-lg p-6 border border-gray-700"
          >
            <div className="h-6 bg-gray-600 rounded w-32 mb-4"></div>
            <div className="h-64 bg-gray-600 rounded"></div>
          </div>
        ))}
      </div>

      {/* More Charts Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className="bg-card rounded-lg p-6 border border-gray-700"
          >
            <div className="h-6 bg-gray-600 rounded w-32 mb-4"></div>
            <div className="h-64 bg-gray-600 rounded"></div>
          </div>
        ))}
      </div>

      {/* Recent Orders Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card rounded-lg p-6 border border-gray-700">
          <div className="h-6 bg-gray-600 rounded w-32 mb-4"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="flex justify-between py-3 border-b border-gray-700"
              >
                <div className="space-y-2">
                  <div className="h-4 bg-gray-600 rounded w-24"></div>
                  <div className="h-3 bg-gray-600 rounded w-32"></div>
                  <div className="h-3 bg-gray-600 rounded w-20"></div>
                </div>
                <div className="space-y-2 text-right">
                  <div className="h-4 bg-gray-600 rounded w-16"></div>
                  <div className="h-6 bg-gray-600 rounded w-20"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-lg p-6 border border-gray-700">
          <div className="h-6 bg-gray-600 rounded w-24 mb-4"></div>
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="flex justify-between py-3 border-b border-gray-700"
              >
                <div className="h-4 bg-gray-600 rounded w-20"></div>
                <div className="h-4 bg-gray-600 rounded w-12"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;