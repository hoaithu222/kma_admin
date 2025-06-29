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
        <div className="w-20 h-20 border-4 border-secondary-light rounded-full animate-spin"></div>

        {/* Inner counter-rotating border */}
        <div
          className="absolute w-16 h-16 border-4 border-transparent rounded-full top-2 left-2 border-t-secondary border-r-secondary-dark animate-spin"
          style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
        ></div>

        {/* Center icon */}
        <div className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-secondary-dark">
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
          <div className="flex items-center justify-center w-8 h-8 transition-colors bg-secondary-light/20 rounded-lg hover:bg-secondary-light/40">
            <Cpu className="w-4 h-4 text-secondary" />
          </div>
        </div>
        <div
          className="flex flex-col items-center space-y-2 animate-fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="flex items-center justify-center w-8 h-8 transition-colors bg-secondary-dark/20 rounded-lg hover:bg-secondary-dark/40">
            <Database className="w-4 h-4 text-secondary-dark" />
          </div>
        </div>
        <div
          className="flex flex-col items-center space-y-2 animate-fade-in"
          style={{ animationDelay: "0.6s" }}
        >
          <div className="flex items-center justify-center w-8 h-8 transition-colors bg-accent/20 rounded-lg hover:bg-accent/40">
            <Network className="w-4 h-4 text-accent" />
          </div>
        </div>
      </div>

      {/* Loading Message */}
      <div
        className="mt-6 text-center animate-fade-in"
        style={{ animationDelay: "0.8s" }}
      >
        <p className="font-medium text-text-secondary">{message}</p>
        <p className="mt-1 text-sm text-text-muted">
          Academy of Cryptography Techniques
        </p>
      </div>

      {/* Progress Bar */}
      <div className="w-48 h-1 mt-4 overflow-hidden bg-background-muted rounded-full">
        <div className="h-full rounded-full bg-gradient-to-r from-secondary to-secondary-dark animate-pulse"></div>
      </div>
    </div>
  );
};

export default PageLoader;
