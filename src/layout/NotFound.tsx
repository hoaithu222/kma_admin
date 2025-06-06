import { useLocation } from "react-router-dom";
import { useEffect } from "react";

import { Home, ArrowLeft, Search } from "lucide-react";
import Card from "@/foundation/components/accordion/Card";
import Button from "@/foundation/components/buttons/Button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-background via-muted/20 to-accent/20">
      <div className="text-center animate-fade-in">
        <Card className="max-w-2xl p-8 mx-auto border-0 shadow-2xl md:p-12 bg-card/80 backdrop-blur-sm">
          {/* 404 Number with gradient */}
          <div className="relative mb-8">
            <h1 className="font-bold text-transparent text-8xl md:text-9xl bg-gradient-to-r from-primary via-accent to-destructive bg-clip-text animate-scale-in">
              404
            </h1>
            <div className="absolute inset-0 font-bold text-8xl md:text-9xl text-muted/10 blur-sm">
              404
            </div>
          </div>

          {/* Main message */}
          <div className="mb-8 space-y-4">
            <h2 className="text-2xl font-semibold md:text-3xl text-foreground">
              Trang không tồn tại
            </h2>
            <p className="max-w-md mx-auto text-lg leading-relaxed text-muted-foreground">
              Trang bạn đang tìm kiếm có thể đã bị xóa, đổi tên hoặc tạm thời
              không khả dụng.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button className="transition-all duration-300 shadow-lg group hover-scale hover:shadow-xl">
              <a href="/" className="flex items-center gap-2">
                <Home className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
                Về trang chủ
              </a>
            </Button>

            <Button
              onClick={() => window.history.back()}
              className="transition-all duration-300 group hover-scale"
            >
              <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
              Quay lại
            </Button>
          </div>

          {/* Decorative elements */}
          <div className="flex justify-center mt-12 space-x-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-primary animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </Card>

        {/* Floating search suggestion */}
        <div
          className="mt-8 animate-fade-in"
          style={{ animationDelay: "0.5s" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 text-sm rounded-full text-muted-foreground bg-muted/50 backdrop-blur-sm">
            <Search className="w-4 h-4" />
            Thử tìm kiếm nội dung khác?
          </div>
        </div>

        {/* Background decoration */}
        <div className="fixed inset-0 overflow-hidden -z-10">
          <div className="absolute w-64 h-64 rounded-full top-1/4 left-1/4 bg-primary/5 blur-3xl animate-pulse" />
          <div
            className="absolute rounded-full bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
