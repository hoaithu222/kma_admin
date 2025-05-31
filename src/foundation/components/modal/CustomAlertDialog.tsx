import React from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { AlertTriangle, Check, Info, AlertCircle } from "lucide-react";

// ===========================================
// TYPES & INTERFACES
// ===========================================

export type AlertVariant =
  | "default"
  | "destructive"
  | "warning"
  | "info"
  | "success";
export type AlertSize = "sm" | "md" | "lg" | "xl";

export interface CustomAlertDialogProps {
  // Visibility control
  open?: boolean;
  onOpenChange?: (open: boolean) => void;

  // Content
  title: string;
  description?: string;
  children?: React.ReactNode;

  // Actions
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;

  // Styling
  variant?: AlertVariant;
  size?: AlertSize;
  className?: string;

  // Behavior
  destructive?: boolean;
  showIcon?: boolean;
  showCancel?: boolean;
  confirmLoading?: boolean;
  cancelLoading?: boolean;

  // Trigger
  trigger?: React.ReactNode;
}

// ===========================================
// MAIN ALERT DIALOG COMPONENT
// ===========================================

/**
 * TRƯỜNG HỢP SỬ DỤNG TRONG HỌC VIỆN KỸ THUẬT MẬT MÃ:
 *
 * 1. Xóa dữ liệu quan trọng (sinh viên, khóa học, chứng chỉ)
 * 2. Xác nhận thao tác bảo mật (reset password, revoke access)
 * 3. Thông báo cảnh báo bảo mật
 * 4. Xác nhận nộp bài thi/assignment
 * 5. Thông báo hết hạn session
 * 6. Xác nhận thay đổi quyền truy cập
 * 7. Thông báo vi phạm chính sách bảo mật
 */

const CustomAlertDialog: React.FC<CustomAlertDialogProps> = ({
  open,
  onOpenChange,
  title,
  description,
  children,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  variant = "default",
  size = "md",
  className = "",
  destructive = false,
  showIcon = true,
  showCancel = true,
  confirmLoading = false,
  cancelLoading = false,
  trigger,
}) => {
  // Variant configurations
  const variantConfig = {
    default: {
      icon: Info,
      iconColor: "text-primary",
      bgColor: "bg-primary-light",
      borderColor: "border-primary",
      buttonColor: "bg-primary hover:bg-primary-dark focus:ring-primary",
    },
    destructive: {
      icon: AlertTriangle,
      iconColor: "text-error",
      bgColor: "bg-error-light",
      borderColor: "border-error",
      buttonColor: "bg-error hover:bg-error-dark focus:ring-error",
    },
    warning: {
      icon: AlertCircle,
      iconColor: "text-warning",
      bgColor: "bg-warning-light",
      borderColor: "border-warning",
      buttonColor: "bg-warning hover:bg-warning-dark focus:ring-warning",
    },
    info: {
      icon: Info,
      iconColor: "text-info",
      bgColor: "bg-info-light",
      borderColor: "border-info",
      buttonColor: "bg-info hover:bg-info-dark focus:ring-info",
    },
    success: {
      icon: Check,
      iconColor: "text-success",
      bgColor: "bg-success-light",
      borderColor: "border-success",
      buttonColor: "bg-success hover:bg-success-dark focus:ring-success",
    },
  };

  // Size configurations
  const sizeConfig = {
    sm: {
      content: "max-w-sm",
      padding: "p-4",
      title: "text-lg",
      description: "text-sm",
      button: "px-3 py-1.5 text-sm",
      icon: "w-5 h-5",
    },
    md: {
      content: "max-w-md",
      padding: "p-6",
      title: "text-xl",
      description: "text-base",
      button: "px-4 py-2 text-sm",
      icon: "w-6 h-6",
    },
    lg: {
      content: "max-w-lg",
      padding: "p-8",
      title: "text-2xl",
      description: "text-lg",
      button: "px-6 py-3 text-base",
      icon: "w-7 h-7",
    },
    xl: {
      content: "max-w-xl",
      padding: "p-10",
      title: "text-3xl",
      description: "text-xl",
      button: "px-8 py-4 text-lg",
      icon: "w-8 h-8",
    },
  };

  const currentVariant = destructive
    ? variantConfig.destructive
    : variantConfig[variant];
  const currentSize = sizeConfig[size];
  const IconComponent = currentVariant.icon;

  const contentClasses = [
    "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
    "bg-background-elevated rounded-2xl shadow-2xl border",
    currentVariant.borderColor,
    currentSize.content,
    currentSize.padding,
    "z-50 focus:outline-none",
    "animate-in fade-in-0 zoom-in-95 duration-200",
    className,
  ].join(" ");

  const handleConfirm = () => {
    onConfirm?.();
    onOpenChange?.(false);
  };

  const handleCancel = () => {
    onCancel?.();
    onOpenChange?.(false);
  };

  return (
    <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger && <AlertDialog.Trigger asChild>{trigger}</AlertDialog.Trigger>}

      <AlertDialog.Portal>
        {/* Overlay */}
        <AlertDialog.Overlay className="fixed inset-0 duration-200 bg-black/50 backdrop-blur-sm animate-in fade-in-0" />

        {/* Content */}
        <AlertDialog.Content className={contentClasses}>
          {/* Header with Icon */}
          <div className="flex items-start mb-6 space-x-4">
            {showIcon && (
              <div
                className={`
                flex-shrink-0 rounded-full p-3
                ${currentVariant.bgColor}
              `}
              >
                <IconComponent
                  className={`${currentSize.icon} ${currentVariant.iconColor}`}
                />
              </div>
            )}

            <div className="flex-1 min-w-0">
              <AlertDialog.Title
                className={`
                font-bold text-text-primary leading-tight
                ${currentSize.title}
              `}
              >
                {title}
              </AlertDialog.Title>

              {description && (
                <AlertDialog.Description
                  className={`
                  mt-2 text-text-secondary leading-relaxed
                  ${currentSize.description}
                `}
                >
                  {description}
                </AlertDialog.Description>
              )}
            </div>
          </div>

          {/* Custom Content */}
          {children && (
            <div className="mb-6 text-text-secondary">{children}</div>
          )}

          {/* Actions */}
          <div className="flex justify-end space-x-3">
            {showCancel && (
              <AlertDialog.Cancel asChild>
                <button
                  onClick={handleCancel}
                  disabled={cancelLoading}
                  className={`
                    ${currentSize.button}
                    border border-border-primary rounded-lg font-medium text-text-secondary
                    hover:bg-background-muted focus:ring-2 focus:ring-border-primary focus:ring-offset-2
                    disabled:opacity-50 disabled:cursor-not-allowed
                    transition-all duration-200
                  `}
                >
                  {cancelLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-gray-300 rounded-full border-t-gray-600 animate-spin" />
                      <span>Loading...</span>
                    </div>
                  ) : (
                    cancelText
                  )}
                </button>
              </AlertDialog.Cancel>
            )}

            <AlertDialog.Action asChild>
              <button
                onClick={handleConfirm}
                disabled={confirmLoading}
                className={`
                  ${currentSize.button}
                  ${currentVariant.buttonColor}
                  rounded-lg font-medium text-white
                  focus:ring-2 focus:ring-offset-2
                  disabled:opacity-50 disabled:cursor-not-allowed
                  transition-all duration-200
                  shadow-lg hover:shadow-xl
                `}
              >
                {confirmLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 rounded-full border-white/30 border-t-white animate-spin" />
                    <span>Processing...</span>
                  </div>
                ) : (
                  confirmText
                )}
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

// ===========================================
// SPECIALIZED ALERT COMPONENTS
// ===========================================

// Security Alert - Cho các thông báo bảo mật
export const SecurityAlert: React.FC<
  Omit<CustomAlertDialogProps, "variant" | "showIcon">
> = (props) => (
  <CustomAlertDialog
    {...props}
    variant="warning"
    showIcon={true}
    title={props.title || "Security Alert"}
    confirmText={props.confirmText || "I Understand"}
  />
);

// Delete Confirmation - Cho việc xóa dữ liệu
export const DeleteConfirmation: React.FC<
  Omit<CustomAlertDialogProps, "destructive" | "variant">
> = (props) => (
  <CustomAlertDialog
    {...props}
    destructive={true}
    title={props.title || "Delete Confirmation"}
    confirmText={props.confirmText || "Delete"}
    cancelText={props.cancelText || "Cancel"}
  />
);

// Session Expired - Cho hết hạn phiên làm việc
export const SessionExpiredAlert: React.FC<
  Omit<CustomAlertDialogProps, "variant" | "showCancel">
> = (props) => (
  <CustomAlertDialog
    {...props}
    variant="warning"
    showCancel={false}
    title={props.title || "Session Expired"}
    confirmText={props.confirmText || "Login Again"}
  />
);

// Success Notification - Cho thông báo thành công
export const SuccessAlert: React.FC<Omit<CustomAlertDialogProps, "variant">> = (
  props
) => (
  <CustomAlertDialog
    {...props}
    variant="success"
    showCancel={false}
    title={props.title || "Success"}
    confirmText={props.confirmText || "OK"}
  />
);

export { CustomAlertDialog as AlertDialog };
export default CustomAlertDialog;
