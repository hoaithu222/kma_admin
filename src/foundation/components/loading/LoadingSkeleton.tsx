const LoadingSkeleton = ({ count = 3 }) => {
  return (
    <div className="p-4 mx-auto space-y-6 max-w-4xl">
      {/* Navigation tabs skeleton */}
      <div className="flex mb-6 space-x-4">
        <div className="w-24 h-10 rounded-full animate-pulse bg-background-muted"></div>
        <div className="w-36 h-10 rounded-full animate-pulse bg-background-subtle"></div>
      </div>

      {/* News cards skeleton */}
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-lg border animate-pulse bg-card-bg border-border-primary"
        >
          <div className="flex flex-col md:flex-row">
            {/* Image skeleton */}
            <div className="w-full h-48 bg-background-muted md:w-1/3 md:h-40"></div>

            {/* Content skeleton */}
            <div className="flex-1 p-6">
              {/* Category tag */}
              <div className="inline-block mb-3 w-20 h-6 rounded-full bg-error"></div>

              {/* Title */}
              <div className="mb-4 space-y-2">
                <div className="w-full h-6 rounded bg-background-muted"></div>
                <div className="w-4/5 h-6 rounded bg-background-muted"></div>
              </div>

              {/* Subtitle */}
              <div className="mb-4 w-3/4 h-4 rounded bg-background-subtle"></div>

              {/* Meta info */}
              <div className="flex items-center mb-4 space-x-4">
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 rounded-full bg-secondary"></div>
                  <div className="w-16 h-4 rounded bg-background-subtle"></div>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 rounded-full bg-success"></div>
                  <div className="w-20 h-4 rounded bg-background-subtle"></div>
                </div>
              </div>

              {/* Button */}
              <div className="w-24 h-10 rounded-lg bg-secondary-light"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default LoadingSkeleton;
