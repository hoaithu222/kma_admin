import { useAppDispatch, useAppSelector } from "@/app/store";
import { setSecurity } from "@/app/store/slices/settings";
import { AlertTriangle, Check, Eye, EyeOff, Info, Lock } from "lucide-react";
import { useState } from "react";

const RenderSecuritySettings = () => {
  const settings = useAppSelector((state) => state.settings);
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-lg shadow-sm bg-background-surface">
        <h3 className="flex items-center mb-4 text-lg font-semibold text-text-primary">
          <Lock className="w-5 h-5 mr-2 text-error" />
          Cài đặt bảo mật
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-background-muted">
            <div>
              <h4 className="font-medium text-text-primary">
                Xác thực 2 yếu tố (2FA)
              </h4>
              <p className="text-sm text-text-secondary">
                Tăng cường bảo mật tài khoản
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.security.twoFactor}
                onChange={(e) =>
                  dispatch(setSecurity({ twoFactor: e.target.checked }))
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-background-subtle peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-secondary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-background-muted">
            <div>
              <h4 className="font-medium text-text-primary">
                Khóa tự động phiên
              </h4>
              <p className="text-sm text-text-secondary">
                Tự động đăng xuất sau {settings.security.sessionTimeout} phút
                không hoạt động
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.security.autoLock}
                onChange={(e) =>
                  dispatch(setSecurity({ autoLock: e.target.checked }))
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-background-subtle peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-secondary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
            </label>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-text-secondary">
              Mật khẩu mới
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Nhập mật khẩu mới"
                className="w-full px-3 py-2 pr-10 border rounded-md border-border-primary focus:outline-none focus:ring-2 focus:ring-secondary bg-background-surface text-text-primary"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4 text-text-muted" />
                ) : (
                  <Eye className="w-4 h-4 text-text-muted" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 rounded-lg shadow-sm bg-background-surface">
        <h3 className="flex items-center mb-4 text-lg font-semibold text-text-primary">
          <AlertTriangle className="w-5 h-5 mr-2 text-warning" />
          Nhật ký bảo mật
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-success-light">
            <div className="flex items-center space-x-3">
              <Check className="w-4 h-4 text-success" />
              <span className="text-sm text-success-dark">
                Đăng nhập thành công từ 192.168.1.100
              </span>
            </div>
            <span className="text-xs text-text-muted">2 phút trước</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-warning-light">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-4 h-4 text-warning" />
              <span className="text-sm text-warning-dark">
                Cố gắng đăng nhập thất bại
              </span>
            </div>
            <span className="text-xs text-text-muted">15 phút trước</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary-light">
            <div className="flex items-center space-x-3">
              <Info className="w-4 h-4 text-secondary" />
              <span className="text-sm text-secondary-dark">
                Cập nhật cài đặt bảo mật
              </span>
            </div>
            <span className="text-xs text-text-muted">1 giờ trước</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenderSecuritySettings;
