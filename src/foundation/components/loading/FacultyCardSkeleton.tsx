const FacultyCardSkeleton = ({ count = 3 }) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="p-6 bg-card-bg border border-card-border shadow-md rounded-xl animate-pulse"
        >
          {/* Avatar */}
          <div className="flex items-start mb-4 space-x-4">
            <div className="flex-shrink-0 w-16 h-16 bg-background-muted rounded-2xl"></div>
            <div className="flex-1 min-w-0">
              {/* Name */}
              <div className="w-3/4 h-5 mb-2 bg-background-muted rounded"></div>
              {/* Position */}
              <div className="w-full h-4 mb-2 bg-secondary-light/40 rounded"></div>
            </div>
          </div>

          {/* Department and Email */}
          <div className="mb-4 space-y-3">
            {/* Department */}
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-success/40 rounded"></div>
              <div className="w-16 h-4 bg-background-subtle rounded"></div>
            </div>

            {/* Email */}
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-accent/40 rounded"></div>
              <div className="w-3/4 h-4 bg-background-subtle rounded"></div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6 space-y-2">
            <div className="w-full h-3 bg-background-subtle rounded"></div>
            <div className="w-5/6 h-3 bg-background-subtle rounded"></div>
            <div className="w-4/5 h-3 bg-background-subtle rounded"></div>
          </div>

          {/* Button */}
          <div className="w-full h-10 bg-secondary-light/40 rounded-lg"></div>
        </div>
      ))}
    </div>
  );
};

export default FacultyCardSkeleton;
