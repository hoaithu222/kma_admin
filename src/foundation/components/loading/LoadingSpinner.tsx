import React from "react";
import { GraduationCap } from "lucide-react";

interface LoadingSpinnerProps {
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  className = "",
}) => {
  const sizeClasses = {
    xs: "w-4 h-4",
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  const iconSizes = {
    xs: "w-2 h-2",
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-6 h-6",
  };

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <div className="relative">
        {/* Outer ring */}
        <div
          className={`${sizeClasses[size]} border-2 border-secondary-light rounded-full animate-spin`}
        ></div>

        {/* Inner ring */}
        <div
          className={`absolute top-0.5 left-0.5 ${sizeClasses[size]} border-2 border-transparent border-t-secondary rounded-full animate-spin`}
          style={{
            animationDirection: "reverse",
            animationDuration: "0.8s",
            width: `calc(100% - 4px)`,
            height: `calc(100% - 4px)`,
          }}
        ></div>

        {/* Center icon */}
        <div className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          <GraduationCap
            className={`${iconSizes[size]} text-secondary animate-pulse`}
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
