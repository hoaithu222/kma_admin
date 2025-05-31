import React from "react";
import { Loader2, Check, X, AlertTriangle } from "lucide-react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outlined"
  | "text"
  | "outlinedSecondary"
  | "textSecondary"
  | "success"
  | "danger"
  | "warning"
  | "gradientPrimary"
  | "gradientSubtle"
  | "gradientCool"
  | "gradientDark"
  | "gradientInverse"
  | "gradientFire";

export type ButtonSize = "small" | "medium" | "large" | "xl";

export type ButtonShape = "default" | "round" | "square";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
  fullWidth?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
  height?: string | number;
  loading?: boolean;
  elevated?: boolean;
}

const Button = ({
  variant = "primary",
  size = "medium",
  shape = "default",
  disabled = false,
  loading = false,
  className = "",
  children,
  fullWidth = false,
  iconLeft,
  iconRight,
  height,
  elevated = false,
  ...props
}: ButtonProps) => {
  // Base classes for all buttons
  const baseClasses =
    "flex items-center justify-center focus:outline-none focus:ring-0 transition-colors box-border text-nowrap focus:ring-transparent";

  // Shape classes
  const shapeClasses = {
    default: "rounded-lg",
    round: "rounded-full",
    square: "rounded-none",
  };

  // Variant classes
  const variantClasses = {
    primary:
      "bg-primary text-on-primary border-transparent hover:bg-primary-dark disabled:bg-primary-light disabled:text-disabled",
    secondary:
      "bg-secondary text-on-secondary border-transparent hover:bg-secondary-dark disabled:bg-secondary-light disabled:text-disabled",
    outlined:
      "bg-transparent border border-primary text-primary hover:border-primary-dark disabled:bg-gray-200 disabled:text-disabled",
    text: "bg-transparent text-primary hover:underline disabled:bg-gray-200 disabled:text-disabled",
    textSecondary: "bg-transparent text-secondary hover:opacity-90",
    outlinedSecondary:
      "bg-transparent border border-secondary text-secondary hover:border-info focus:border-info hover:opacity-90",
    success:
      "bg-success text-on-success border-transparent hover:bg-success-dark disabled:bg-success-light disabled:text-disabled",
    danger:
      "bg-error text-on-error border-transparent hover:bg-error-dark disabled:bg-error-light disabled:text-disabled",
    warning:
      "bg-warning text-on-warning border-transparent hover:bg-warning-dark disabled:bg-warning-light disabled:text-disabled",
    gradientPrimary:
      "bg-gradient-to-r from-primary via-primary-dark to-primary-darker text-white border-transparent hover:from-primary-dark hover:to-primary disabled:bg-primary-light disabled:text-disabled",
    gradientSubtle:
      "bg-gradient-to-r from-secondary via-secondary-light to-secondary-dark text-on-secondary border-transparent hover:from-secondary-dark hover:to-secondary-light disabled:bg-secondary-light disabled:text-disabled",
    gradientCool:
      "bg-gradient-to-r from-secondary via-primary to-primary-dark text-white border-transparent hover:from-primary-dark hover:to-primary disabled:bg-primary-light disabled:text-disabled",
    gradientDark:
      "bg-gradient-to-r from-primary-dark to-primary-darker text-white border-transparent hover:from-primary-darker hover:to-primary disabled:bg-primary-light disabled:text-disabled",
    gradientInverse:
      "bg-gradient-to-r from-gray-700 to-gray-900 text-white border-transparent hover:from-gray-900 hover:to-gray-700 disabled:bg-gray-300 disabled:text-disabled",
    gradientFire:
      "bg-gradient-to-r from-red-500 to-orange-500 text-white border-transparent hover:from-orange-600 hover:to-red-600 disabled:bg-red-200 disabled:text-disabled",
  };

  // Size-specific styling
  const sizeClasses = {
    small:
      shape === "round" || shape === "square"
        ? "w-4 h-4 md:w-6 md:h-6 lg:h-8 lg:w-8 text-xs md:text-sm lg:text-base p-0"
        : "h-6 md:h-7 lg:h-8 px-2 md:px-2.5 lg:px-3 text-xs md:text-sm lg:text-base",
    medium:
      shape === "round" || shape === "square"
        ? "h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10 text-xs md:text-sm lg:text-base p-0"
        : "h-8 md:h-9 lg:h-10 min-w-[100px] px-2 md:px-3 lg:px-4 text-xs md:text-sm lg:text-base",
    large:
      shape === "round" || shape === "square"
        ? "h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 text-xs md:text-sm lg:text-base p-0"
        : "h-8 md:h-9 lg:h-10 min-w-[100px] px-2 md:px-3 lg:px-4 text-xs md:text-sm lg:text-base",
    xl:
      shape === "round" || shape === "square"
        ? "h-12 w-12 md:h-14 md:w-14 lg:h-16 lg:w-16 text-xs md:text-sm lg:text-base p-0"
        : "h-10 md:h-11 lg:h-12 min-w-[100px] px-2 md:px-3 lg:px-4 text-xs md:text-sm lg:text-base",
  };

  // Combine all classes
  const buttonClasses = [
    baseClasses,
    shapeClasses[shape],
    variantClasses[variant],
    sizeClasses[size],
    fullWidth ? "w-full" : "",
    elevated ? "shadow-md hover:shadow-lg" : "",
    disabled || loading ? "cursor-not-allowed opacity-50" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // Custom style for height override
  const buttonStyle = height
    ? {
        height: typeof height === "number" ? `${height}px` : height,
        width:
          (shape === "round" || shape === "square") &&
          typeof height === "number"
            ? `${height}px`
            : shape === "round" || shape === "square"
              ? height
              : undefined,
      }
    : {};

  // Get appropriate icon for variant
  const getVariantIcon = () => {
    switch (variant) {
      case "success":
        return <Check className="w-4 h-4" />;
      case "danger":
        return <X className="w-4 h-4" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const variantIcon = getVariantIcon();

  return (
    <button
      type="button"
      className={buttonClasses}
      style={buttonStyle}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          {children && <span className="ml-2">{children}</span>}
        </>
      ) : (
        <>
          {iconLeft && (
            <span className={children ? "mr-2" : ""}>{iconLeft}</span>
          )}
          {variantIcon && !iconLeft && !children && !iconRight
            ? variantIcon
            : null}
          {children}
          {iconRight && (
            <span className={children ? "ml-2" : ""}>{iconRight}</span>
          )}
        </>
      )}
    </button>
  );
};
export default Button;
