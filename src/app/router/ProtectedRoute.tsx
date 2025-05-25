import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { selectIsAuthenticated } from "@/features/auth/slice/auth.selector";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth,
}) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const location = useLocation();
  const isLoginPage = location.pathname.includes("/auth");

  // Nếu yêu cầu auth nhưng chưa đăng nhập và không phải trang login
  if (requireAuth && !isAuthenticated && !isLoginPage) {
    return <Navigate to="/auth" replace />;
  }

  // Nếu đã đăng nhập nhưng đang ở trang login
  if (isAuthenticated && isLoginPage) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
