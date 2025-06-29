import React from "react";

interface SkeletonProps {
  count?: number;
}

const LecturerSkeleton: React.FC<SkeletonProps> = ({ count = 4 }) => {
  return (
    <div className="grid grid-cols-2 gap-4 p-4 bg-background-subtle">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden bg-card-bg shadow-lg rounded-2xl animate-pulse"
        >
          {/* Header with gradient background */}
          <div className="flex items-center h-32 gap-4 p-4 bg-gradient-to-r from-error via-accent to-secondary">
            {/* Avatar skeleton */}
            <div className="flex-shrink-0 w-16 h-16 rounded-full bg-white/30"></div>

            {/* Name and title skeleton */}
            <div className="flex-1 space-y-2">
              <div className="w-48 h-5 rounded-lg bg-white/40"></div>
              <div className="w-56 h-3 rounded-lg bg-white/30"></div>
            </div>
          </div>

          {/* Content area */}
          <div className="p-4 space-y-4">
            {/* Email skeleton */}
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-background-muted rounded"></div>
              <div className="w-48 h-3 bg-background-muted rounded"></div>
            </div>

            {/* Chuyên ngành section */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-background-muted rounded"></div>
                <div className="w-24 h-4 bg-background-muted rounded"></div>
              </div>
              <div className="ml-6 space-y-1">
                <div className="w-16 h-3 bg-background-muted rounded"></div>
                <div className="w-20 h-3 bg-background-muted rounded"></div>
              </div>
            </div>

            {/* Vị trí section */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-background-muted rounded"></div>
                <div className="w-20 h-4 bg-background-muted rounded"></div>
              </div>
              <div className="ml-6">
                <div className="h-3 bg-background-muted rounded w-80"></div>
              </div>
            </div>

            {/* Lĩnh vực nghiên cứu section */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-accent/40 rounded"></div>
                <div className="h-4 bg-background-muted rounded w-36"></div>
              </div>
              <div className="p-3 rounded-lg bg-accent/10">
                <div className="space-y-1">
                  <div className="w-full h-3 bg-background-muted rounded"></div>
                  <div className="w-3/4 h-3 bg-background-muted rounded"></div>
                  <div className="w-1/2 h-3 bg-background-muted rounded"></div>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2 pt-2">
              <div className="w-3 h-3 bg-success/40 rounded-xl"></div>
              <div className="w-3 h-3 bg-error/40 rounded-xl"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LecturerSkeleton;
