const LoadingSkeleton = ({ count = 3 }) => {
  return (
    <div className="max-w-4xl p-4 mx-auto space-y-6">
      {/* Navigation tabs skeleton */}
      <div className="flex mb-6 space-x-4">
        <div className="w-24 h-10 bg-gray-300 rounded-full animate-pulse"></div>
        <div className="h-10 bg-gray-200 rounded-full w-36 animate-pulse"></div>
      </div>

      {/* News cards skeleton */}
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden bg-white border border-gray-200 rounded-lg animate-pulse"
        >
          <div className="flex flex-col md:flex-row">
            {/* Image skeleton */}
            <div className="w-full h-48 bg-gray-300 md:w-1/3 md:h-40"></div>

            {/* Content skeleton */}
            <div className="flex-1 p-6">
              {/* Category tag */}
              <div className="inline-block w-20 h-6 mb-3 bg-red-200 rounded-full"></div>

              {/* Title */}
              <div className="mb-4 space-y-2">
                <div className="w-full h-6 bg-gray-300 rounded"></div>
                <div className="w-4/5 h-6 bg-gray-300 rounded"></div>
              </div>

              {/* Subtitle */}
              <div className="w-3/4 h-4 mb-4 bg-gray-200 rounded"></div>

              {/* Meta info */}
              <div className="flex items-center mb-4 space-x-4">
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 bg-blue-200 rounded-full"></div>
                  <div className="w-16 h-4 bg-gray-200 rounded"></div>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 bg-green-200 rounded-full"></div>
                  <div className="w-20 h-4 bg-gray-200 rounded"></div>
                </div>
              </div>

              {/* Button */}
              <div className="w-24 h-10 bg-blue-200 rounded-lg"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default LoadingSkeleton;
