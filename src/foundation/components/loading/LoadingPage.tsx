import React from "react";
import { GraduationCap, Shield, Lock } from "lucide-react";

interface LoadingProps {
  text?: string;
  size?: "sm" | "md" | "lg";
}

const LoadingPage: React.FC<LoadingProps> = ({
  text = "Đang tải...",
  size = "md",
}) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Main Loading Animation */}
      <div className="relative">
        {/* Outer Ring */}
        <div className="absolute inset-0 border-4 border-blue-200 rounded-full animate-spin"></div>

        {/* Inner Ring */}
        <div
          className="absolute border-4 border-transparent rounded-full inset-2 border-t-blue-600 border-r-indigo-600 animate-spin"
          style={{ animationDirection: "reverse", animationDuration: "1s" }}
        ></div>

        {/* Center Icon */}
        <div
          className={`${sizeClasses[size]} relative flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full text-white shadow-lg`}
        >
          <GraduationCap className="w-6 h-6 animate-pulse" />
        </div>
      </div>

      {/* Academy Logo Animation */}
      <div className="flex mt-8 space-x-4">
        <div
          className="flex items-center justify-center w-10 h-10 text-white rounded-full bg-gradient-to-r from-blue-500 to-blue-600 animate-bounce"
          style={{ animationDelay: "0s" }}
        >
          <Shield className="w-5 h-5" />
        </div>
        <div
          className="flex items-center justify-center w-10 h-10 text-white rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600 animate-bounce"
          style={{ animationDelay: "0.2s" }}
        >
          <Lock className="w-5 h-5" />
        </div>
        <div
          className="flex items-center justify-center w-10 h-10 text-white rounded-full bg-gradient-to-r from-purple-500 to-purple-600 animate-bounce"
          style={{ animationDelay: "0.4s" }}
        >
          <GraduationCap className="w-5 h-5" />
        </div>
      </div>

      {/* Loading Text */}
      <div className="mt-6 text-center">
        <h2 className="mb-2 text-xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text">
          Học Viện Kỹ Thuật Mật Mã
        </h2>
        <p className={`${textSizeClasses[size]} text-gray-600 animate-pulse`}>
          {text}
        </p>
      </div>

      {/* Progress Dots */}
      <div className="flex mt-4 space-x-2">
        <div
          className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"
          style={{ animationDelay: "0.3s" }}
        ></div>
        <div
          className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"
          style={{ animationDelay: "0.6s" }}
        ></div>
      </div>

      {/* Additional Academy Branding */}
      <div className="absolute text-center bottom-8">
        <p className="text-sm text-gray-500">
          Academy of Cryptography Techniques
        </p>
      </div>
    </div>
  );
};

export default LoadingPage;
