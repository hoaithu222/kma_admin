import clsx from "clsx";
import logo from "@/assets/logo.png";
import Button from "@/foundation/components/buttons/Button";
import { User, Lock, School, Sparkles } from "lucide-react";
import FloatingInput from "@/foundation/components/inputs/FloatingInput";
import { IRequestLogin } from "@/core/api/auth/types";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const { isLoadingLogin, onSubmitLogin } = useAuth();
  const [data, setData] = useState<IRequestLogin>({
    username: "",
    password: "",
    active: true,
    role: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-100px)] p-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute rounded-full -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-blue-200/30 to-purple-200/30 blur-3xl"></div>
        <div className="absolute rounded-full -bottom-8 -left-8 w-96 h-96 bg-gradient-to-tr from-indigo-200/20 to-pink-200/20 blur-3xl"></div>
        <div className="absolute w-32 h-32 rounded-full top-1/2 left-1/4 bg-gradient-to-r from-cyan-200/40 to-blue-200/40 blur-2xl"></div>
      </div>

      <div
        className={clsx(
          "w-full max-w-lg mx-auto",
          "bg-white/80 backdrop-blur-xl",
          "border border-white/20",
          "rounded-3xl shadow-2xl shadow-indigo-500/10",
          "p-8 lg:p-12",
          "relative overflow-hidden",
          "transform transition-all duration-500 hover:shadow-3xl hover:shadow-indigo-500/20"
        )}
      >
        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/60 via-transparent to-indigo-50/30"></div>

        {/* Logo with enhanced styling */}
        <div className="absolute -right-6 -top-6 opacity-10">
          <School className="w-32 h-32 text-indigo-600" />
        </div>

        <div className="relative z-10">
          {/* Logo section */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur opacity-20"></div>
              <img
                src={logo}
                alt="logo"
                className="relative w-20 h-20 shadow-lg lg:w-24 lg:h-24 rounded-2xl ring-4 ring-white/50"
              />
              <div className="absolute -top-1 -right-1">
                <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Header section */}
          <div className="mb-10 space-y-4 text-center">
            <h2 className="text-3xl font-bold leading-tight text-transparent lg:text-4xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 bg-clip-text">
              Chào mừng trở lại!
            </h2>
            <div className="space-y-2">
              <h4 className="text-xl font-medium text-gray-700">
                Hệ thống quản lý website
              </h4>
              <p className="leading-relaxed text-gray-500">
                Đăng nhập để truy cập vào bảng điều khiển quản trị của bạn
              </p>
            </div>

            {/* Decorative line */}
            <div className="flex items-center justify-center mt-6">
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-indigo-300 to-transparent"></div>
              <div className="w-2 h-2 mx-4 bg-indigo-400 rounded-full"></div>
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-indigo-300 to-transparent"></div>
            </div>
          </div>

          {/* Form */}
          <form
            className="space-y-8"
            onSubmit={(e) => {
              e.preventDefault();
              onSubmitLogin(data);
            }}
          >
            <div className="space-y-6">
              <div className="relative group">
                <FloatingInput
                  label="Tên đăng nhập"
                  fullWidth
                  iconRight={
                    <User className="w-5 h-5 text-indigo-500 transition-colors group-focus-within:text-indigo-600" />
                  }
                  className="transition-all duration-300 border-gray-200 bg-white/70 backdrop-blur rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                  name="username"
                  value={data.username}
                  onChange={handleChange}
                />
              </div>

              <div className="relative group">
                <FloatingInput
                  label="Mật khẩu"
                  showPasswordToggle
                  fullWidth
                  iconRight={
                    <Lock className="w-5 h-5 text-indigo-500 transition-colors group-focus-within:text-indigo-600" />
                  }
                  className="transition-all duration-300 border-gray-200 bg-white/70 backdrop-blur rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Enhanced submit button */}
            <div className="pt-4">
              <Button
                variant="secondary"
                size="large"
                disabled={isLoadingLogin}
                type="submit"
                className={clsx(
                  "w-full py-4 px-8 rounded-xl font-semibold text-lg",
                  "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700",
                  "text-white shadow-lg shadow-indigo-500/25",
                  "transform transition-all duration-300",
                  "hover:scale-[1.02] hover:shadow-xl hover:shadow-indigo-500/30",
                  "focus:outline-none focus:ring-4 focus:ring-indigo-500/50",
                  "disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none",
                  "relative overflow-hidden group"
                )}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isLoadingLogin ? (
                    <>
                      <div className="w-5 h-5 border-2 rounded-full border-white/30 border-t-white animate-spin"></div>
                      Đang đăng nhập...
                    </>
                  ) : (
                    <>
                      Đăng nhập
                      <div className="transition-transform transform group-hover:translate-x-1">
                        →
                      </div>
                    </>
                  )}
                </span>
                {/* Button shine effect */}
                <div className="absolute inset-0 transition-transform duration-1000 -translate-x-full skew-x-12 group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
              </Button>
            </div>
          </form>
          <div className="flex items-center justify-center gap-1 mt-6">
            <p>Nếu chưa có tài khoản vui lòng</p>
            <Link
              to="/register"
              className="font-semibold text-indigo-600 hover:underline"
            >
              đăng kí
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
