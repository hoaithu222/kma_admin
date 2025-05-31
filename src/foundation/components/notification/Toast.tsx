import React, { useState, createContext, useContext } from "react";
import * as Toast from "@radix-ui/react-toast";
import {
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  Info,
  X,
  Bell,
  Award,
  Calendar,
  Shield,
} from "lucide-react";

export type ToastType = "success" | "error" | "warning" | "info" | "default";
export type ToastPosition =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left"
  | "top-center"
  | "bottom-center";

interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  icon?: React.ReactNode;
  persistent?: boolean;
}

interface ToastContextType {
  addToast: (toast: Omit<ToastItem, "id">) => void;
  removeToast: (id: string) => void;
  clearAllToasts: () => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

interface ToastProviderProps {
  children: React.ReactNode;
  position?: ToastPosition;
  maxToasts?: number;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  position = "top-right",
  maxToasts = 5,
}) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = (toast: Omit<ToastItem, "id">) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: ToastItem = {
      ...toast,
      id,
      duration: toast.duration ?? (toast.persistent ? 0 : 5000),
    };

    setToasts((prev) => {
      const updated = [newToast, ...prev];
      return updated.slice(0, maxToasts);
    });

    // Auto remove toast if not persistent
    if (!toast.persistent && newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, newToast.duration);
    }
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const clearAllToasts = () => {
    setToasts([]);
  };

  const getToastIcon = (type: ToastType, customIcon?: React.ReactNode) => {
    if (customIcon) return customIcon;

    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case "info":
        return <Info className="w-5 h-5 text-blue-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const getToastStyles = (type: ToastType) => {
    switch (type) {
      case "success":
        return "border-green-200 bg-green-50 text-green-900";
      case "error":
        return "border-red-200 bg-red-50 text-red-900";
      case "warning":
        return "border-yellow-200 bg-yellow-50 text-yellow-900";
      case "info":
        return "border-blue-200 bg-blue-50 text-blue-900";
      default:
        return "border-gray-200 bg-white text-gray-900";
    }
  };

  const getPositionStyles = (index: number) => {
    const baseIndex = 1000;
    const offset = 60; // Reduced offset for mobile
    const mobileOffset = 70; // Specific offset for mobile

    const getOffset = () => {
      if (window.innerWidth < 640) {
        // sm breakpoint
        return mobileOffset;
      }
      return offset;
    };

    switch (position) {
      case "top-left":
        return {
          position: "fixed" as const,
          top: `${12 + index * getOffset()}px`,
          left: "12px",
          zIndex: baseIndex - index,
        };
      case "top-center":
        return {
          position: "fixed" as const,
          top: `${12 + index * getOffset()}px`,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: baseIndex - index,
        };
      case "top-right":
        return {
          position: "fixed" as const,
          top: `${12 + index * getOffset()}px`,
          right: "12px",
          zIndex: baseIndex - index,
        };
      case "bottom-left":
        return {
          position: "fixed" as const,
          bottom: `${12 + index * getOffset()}px`,
          left: "12px",
          zIndex: baseIndex - index,
        };
      case "bottom-center":
        return {
          position: "fixed" as const,
          bottom: `${12 + index * getOffset()}px`,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: baseIndex - index,
        };
      case "bottom-right":
        return {
          position: "fixed" as const,
          bottom: `${12 + index * getOffset()}px`,
          right: "12px",
          zIndex: baseIndex - index,
        };
      default:
        return {
          position: "fixed" as const,
          top: `${12 + index * getOffset()}px`,
          right: "12px",
          zIndex: baseIndex - index,
        };
    }
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast, clearAllToasts }}>
      {children}
      <Toast.Provider swipeDirection="right">
        {toasts.map((toast, index) => (
          <Toast.Root
            key={toast.id}
            className={`
              ${getToastStyles(toast.type)}
              p-3 sm:p-4 rounded-lg border shadow-lg w-[calc(100%-2rem)] sm:min-w-80 sm:max-w-md
              data-[state=open]:animate-slideIn
              data-[state=closed]:animate-slideOut
              data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]
              data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-transform
              data-[swipe=end]:animate-swipeOut
            `}
            duration={toast.duration}
            style={getPositionStyles(index)}
          >
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="flex-shrink-0">
                {getToastIcon(toast.type, toast.icon)}
              </div>

              <div className="flex-1 min-w-0">
                <Toast.Title className="text-xs font-medium sm:text-sm">
                  {toast.title}
                </Toast.Title>

                {toast.description && (
                  <Toast.Description className="mt-0.5 sm:mt-1 text-xs sm:text-sm opacity-90">
                    {toast.description}
                  </Toast.Description>
                )}

                {toast.action && (
                  <div className="mt-2 sm:mt-3">
                    <Toast.Action
                      className="inline-flex items-center px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-medium rounded-md bg-white/20 hover:bg-white/30 transition-colors"
                      altText={toast.action.label}
                      onClick={toast.action.onClick}
                    >
                      {toast.action.label}
                    </Toast.Action>
                  </div>
                )}
              </div>

              <Toast.Close className="flex-shrink-0 p-0.5 sm:p-1 transition-colors rounded-md hover:bg-black/10">
                <X className="w-3 h-3 sm:w-4 sm:h-4" />
              </Toast.Close>
            </div>
          </Toast.Root>
        ))}

        <Toast.Viewport />
      </Toast.Provider>
    </ToastContext.Provider>
  );
};

// Helper functions for quick toast creation
export const createToast = {
  success: (
    title: string,
    description?: string,
    options?: Partial<ToastItem>
  ) => ({
    type: "success" as const,
    title,
    description,
    ...options,
  }),

  error: (
    title: string,
    description?: string,
    options?: Partial<ToastItem>
  ) => ({
    type: "error" as const,
    title,
    description,
    ...options,
  }),

  warning: (
    title: string,
    description?: string,
    options?: Partial<ToastItem>
  ) => ({
    type: "warning" as const,
    title,
    description,
    ...options,
  }),

  info: (
    title: string,
    description?: string,
    options?: Partial<ToastItem>
  ) => ({
    type: "info" as const,
    title,
    description,
    ...options,
  }),

  default: (
    title: string,
    description?: string,
    options?: Partial<ToastItem>
  ) => ({
    type: "default" as const,
    title,
    description,
    ...options,
  }),
};

// Pre-configured toast templates
export const toastTemplates = {
  // Success templates
  saved: () =>
    createToast.success("Đã lưu!", "Thay đổi của bạn đã được lưu thành công."),
  uploaded: () =>
    createToast.success("Tải lên thành công!", "Tệp đã được tải lên và xử lý."),
  deleted: () =>
    createToast.success("Đã xóa!", "Mục đã được xóa khỏi hệ thống."),
  copied: () =>
    createToast.success(
      "Đã sao chép!",
      "Nội dung đã được sao chép vào clipboard."
    ),

  // Error templates
  networkError: () =>
    createToast.error(
      "Lỗi mạng",
      "Không thể kết nối tới máy chủ. Vui lòng thử lại."
    ),
  unauthorized: () =>
    createToast.error(
      "Không có quyền truy cập",
      "Bạn không có quyền thực hiện hành động này."
    ),
  validationError: (field: string) =>
    createToast.error("Lỗi xác thực", `Trường "${field}" không hợp lệ.`),
  serverError: () =>
    createToast.error(
      "Lỗi máy chủ",
      "Đã xảy ra lỗi không mong muốn. Vui lòng thử lại sau."
    ),

  // Warning templates
  unsavedChanges: () =>
    createToast.warning(
      "Thay đổi chưa lưu",
      "Bạn có thay đổi chưa được lưu. Hãy lưu trước khi rời khỏi trang."
    ),
  lowStorage: () =>
    createToast.warning(
      "Dung lượng thấp",
      "Bộ nhớ thiết bị sắp đầy. Hãy xóa bớt tệp không cần thiết."
    ),
  sessionExpiring: () =>
    createToast.warning(
      "Phiên sắp hết hạn",
      "Phiên làm việc của bạn sẽ hết hạn trong 5 phút."
    ),

  // Info templates
  processing: () =>
    createToast.info("Đang xử lý...", "Yêu cầu của bạn đang được xử lý.", {
      persistent: true,
    }),
  newUpdate: () =>
    createToast.info(
      "Cập nhật mới",
      "Có phiên bản mới của ứng dụng. Hãy tải xuống để trải nghiệm tính năng mới."
    ),
  maintenance: () =>
    createToast.info(
      "Bảo trì hệ thống",
      "Hệ thống sẽ bảo trì vào 2:00 AM ngày mai."
    ),

  // Custom icon templates
  achievement: (title: string, description: string) =>
    createToast.success(title, description, {
      icon: <Award className="w-5 h-5 text-yellow-600" />,
    }),

  reminder: (title: string, description: string) =>
    createToast.info(title, description, {
      icon: <Calendar className="w-5 h-5 text-blue-600" />,
    }),

  security: (title: string, description: string) =>
    createToast.warning(title, description, {
      icon: <Shield className="w-5 h-5 text-orange-600" />,
    }),
};
