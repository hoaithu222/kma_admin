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
      "bg-button-primary-bg text-button-primary-text border-transparent hover:bg-button-primary-hover active:bg-button-primary-active disabled:bg-button-primary-disabled",
    secondary:
      "bg-button-secondary-bg text-button-secondary-text border-transparent hover:bg-button-secondary-hover active:bg-button-secondary-active",
    outlined:
      "bg-button-outline-bg border border-button-outline-border text-button-outline-text hover:bg-button-outline-hover active:bg-button-outline-active disabled:bg-background-muted disabled:text-text-disabled",
    text: "bg-button-ghost-bg text-text-primary hover:bg-button-ghost-hover active:bg-button-ghost-active disabled:bg-background-muted disabled:text-text-disabled",
    textSecondary:
      "bg-button-ghost-bg text-text-secondary hover:bg-button-ghost-hover active:bg-button-ghost-active",
    outlinedSecondary:
      "bg-button-outline-bg border border-button-outline-border text-button-outline-text hover:bg-button-outline-hover active:bg-button-outline-active",
    success:
      "bg-success text-text-on-primary border-transparent hover:bg-success-dark disabled:bg-success-light disabled:text-text-disabled",
    danger:
      "bg-button-danger-bg text-button-danger-text border-transparent hover:bg-button-danger-hover active:bg-button-danger-active disabled:bg-error-light disabled:text-text-disabled",
    warning:
      "bg-warning text-text-on-primary border-transparent hover:bg-warning-dark disabled:bg-warning-light disabled:text-text-disabled",
    gradientPrimary:
      "bg-gradient-to-r from-primary via-primary-dark to-primary-darker text-text-on-primary border-transparent hover:from-primary-dark hover:to-primary disabled:bg-primary-light disabled:text-text-disabled",
    gradientSubtle:
      "bg-gradient-to-r from-secondary via-secondary-light to-secondary-dark text-text-on-secondary border-transparent hover:from-secondary-dark hover:to-secondary-light disabled:bg-secondary-light disabled:text-text-disabled",
    gradientCool:
      "bg-gradient-to-r from-secondary via-primary to-primary-dark text-text-on-primary border-transparent hover:from-primary-dark hover:to-primary disabled:bg-primary-light disabled:text-text-disabled",
    gradientDark:
      "bg-gradient-to-r from-primary-dark to-warning text-text-on-primary border-transparent hover:from-primary-darker hover:to-primary disabled:bg-primary-light disabled:text-text-disabled",
    gradientInverse:
      "bg-gradient-to-r from-background-muted to-background-subtle text-text-on-primary border-transparent hover:from-background-subtle hover:to-background-muted disabled:bg-background-muted disabled:text-text-disabled",
    gradientFire:
      "bg-gradient-to-r from-error via-error-light to-error-dark text-text-on-primary border-transparent hover:from-error-dark hover:to-error disabled:bg-error-light disabled:text-text-disabled",
  };

  // Size-specific styling
  const sizeClasses = {
    small:
      shape === "round" || shape === "square"
        ? "h-8 w-8 text-sm p-0"
        : "h-8 px-3 text-sm",
    medium:
      shape === "round" || shape === "square"
        ? "h-10 w-10 text-base p-0"
        : "h-10 min-w-[100px] px-4 text-base",
    large:
      shape === "round" || shape === "square"
        ? "h-12 w-12 text-lg p-0"
        : "h-12 px-4 py-3 text-lg",
    xl:
      shape === "round" || shape === "square"
        ? "h-16 w-16 text-xl p-0"
        : "h-16 px-6 py-4 text-xl",
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
