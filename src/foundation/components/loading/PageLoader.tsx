import React from "react";
import { GraduationCap, Cpu, Database, Network } from "lucide-react";

interface PageLoaderProps {
  message?: string;
}

const PageLoader: React.FC<PageLoaderProps> = ({
  message = "Đang tải nội dung...",
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] py-12">
      {/* Main Spinner */}
      <div className="relative">
        {/* Outer rotating border */}
        <div className="w-20 h-20 border-4 border-blue-200 rounded-full animate-spin"></div>

        {/* Inner counter-rotating border */}
        <div
          className="absolute w-16 h-16 border-4 border-transparent rounded-full top-2 left-2 border-t-blue-600 border-r-indigo-600 animate-spin"
          style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
        ></div>

        {/* Center icon */}
        <div className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600">
            <GraduationCap className="w-4 h-4 text-white animate-pulse" />
          </div>
        </div>
      </div>

      {/* Tech Icons Animation */}
      <div className="flex mt-8 space-x-6">
        <div
          className="flex flex-col items-center space-y-2 animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="flex items-center justify-center w-8 h-8 transition-colors bg-blue-100 rounded-lg hover:bg-blue-200">
            <Cpu className="w-4 h-4 text-blue-600" />
          </div>
        </div>
        <div
          className="flex flex-col items-center space-y-2 animate-fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="flex items-center justify-center w-8 h-8 transition-colors bg-indigo-100 rounded-lg hover:bg-indigo-200">
            <Database className="w-4 h-4 text-indigo-600" />
          </div>
        </div>
        <div
          className="flex flex-col items-center space-y-2 animate-fade-in"
          style={{ animationDelay: "0.6s" }}
        >
          <div className="flex items-center justify-center w-8 h-8 transition-colors bg-purple-100 rounded-lg hover:bg-purple-200">
            <Network className="w-4 h-4 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Loading Message */}
      <div
        className="mt-6 text-center animate-fade-in"
        style={{ animationDelay: "0.8s" }}
      >
        <p className="font-medium text-gray-600">{message}</p>
        <p className="mt-1 text-sm text-gray-500">
          Academy of Cryptography Techniques
        </p>
      </div>

      {/* Progress Bar */}
      <div className="w-48 h-1 mt-4 overflow-hidden bg-gray-200 rounded-full">
        <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 animate-pulse"></div>
      </div>
    </div>
  );
};

export default PageLoader;
