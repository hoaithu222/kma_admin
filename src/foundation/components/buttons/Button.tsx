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
  | "gradientFire"
  | "glassmorphism"
  | "modernBlue"
  | "modernPurple"
  | "modernGreen"
  | "modernOrange"
  | "modernCyan"
  | "neonBlue"
  | "neonPink"
  | "neonGreen"
  | "elegantBlack"
  | "elegantWhite"
  | "rainbow"
  | "ocean"
  | "sunset"
  | "forest"
  | "midnight"
  | "aurora"
  | "cosmic"
  | "cyber"
  | "borderGlow"
  | "borderGradient"
  | "borderAnimated"
  | "borderRainbow"
  | "borderPulse"
  | "borderNeon"
  | "borderElectric"
  | "borderGlowing"
  | "borderShimmer"
  | "borderMoving"
  | "borderFire"
  | "borderIce"
  | "borderGold";

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
      "bg-gradient-to-r from-primary via-primary-dark to-primary-light text-white border-transparent hover:from-primary-dark hover:to-primary disabled:bg-primary-light disabled:text-disabled",
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
    glassmorphism:
      "bg-background-overlay backdrop-blur-lg border border-white/30 text-gray-800 hover:bg-background-overlay hover:shadow-lg transition-all duration-300",
    modernBlue:
      "bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-transparent hover:from-blue-600 hover:to-indigo-700 hover:shadow-lg hover:scale-105 transition-all duration-300",
    modernPurple:
      "bg-gradient-to-r from-purple-500 to-pink-600 text-white border-transparent hover:from-purple-600 hover:to-pink-700 hover:shadow-lg hover:scale-105 transition-all duration-300",
    modernGreen:
      "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-transparent hover:from-green-600 hover:to-emerald-700 hover:shadow-lg hover:scale-105 transition-all duration-300",
    modernOrange:
      "bg-gradient-to-r from-orange-500 to-red-600 text-white border-transparent hover:from-orange-600 hover:to-red-700 hover:shadow-lg hover:scale-105 transition-all duration-300",
    modernCyan:
      "bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-transparent hover:from-cyan-600 hover:to-blue-700 hover:shadow-lg hover:scale-105 transition-all duration-300",
    neonBlue:
      "bg-blue-600 text-white border-2 border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:shadow-[0_0_30px_rgba(59,130,246,0.8)] hover:scale-105 transition-all duration-300",
    neonPink:
      "bg-pink-600 text-white border-2 border-pink-400 shadow-[0_0_20px_rgba(236,72,153,0.5)] hover:shadow-[0_0_30px_rgba(236,72,153,0.8)] hover:scale-105 transition-all duration-300",
    neonGreen:
      "bg-green-600 text-white border-2 border-green-400 shadow-[0_0_20px_rgba(34,197,94,0.5)] hover:shadow-[0_0_30px_rgba(34,197,94,0.8)] hover:scale-105 transition-all duration-300",
    elegantBlack:
      "bg-gradient-to-r from-gray-800 to-black text-white border-transparent hover:from-black hover:to-gray-900 hover:shadow-xl hover:scale-105 transition-all duration-300",
    elegantWhite:
      "bg-gradient-to-r from-white to-gray-100 text-gray-800 border border-gray-200 hover:from-gray-50 hover:to-white hover:shadow-xl hover:scale-105 transition-all duration-300",
    rainbow:
      "bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 text-white border-transparent hover:shadow-xl hover:scale-105 transition-all duration-300 animate-pulse",
    ocean:
      "bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white border-transparent hover:from-blue-500 hover:to-blue-700 hover:shadow-[0_8px_32px_rgba(59,130,246,0.4)] hover:scale-105 transition-all duration-300",
    sunset:
      "bg-gradient-to-r from-orange-400 via-pink-500 to-red-500 text-white border-transparent hover:from-orange-500 hover:to-red-600 hover:shadow-[0_8px_32px_rgba(251,146,60,0.4)] hover:scale-105 transition-all duration-300",
    forest:
      "bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white border-transparent hover:from-green-500 hover:to-green-700 hover:shadow-[0_8px_32px_rgba(34,197,94,0.4)] hover:scale-105 transition-all duration-300",
    midnight:
      "bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white border-transparent hover:from-indigo-800 hover:to-pink-800 hover:shadow-[0_8px_32px_rgba(99,102,241,0.4)] hover:scale-105 transition-all duration-300",
    aurora:
      "bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 text-white border-transparent hover:from-purple-500 hover:to-red-500 hover:shadow-[0_8px_32px_rgba(168,85,247,0.4)] hover:scale-105 transition-all duration-300",
    cosmic:
      "bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 text-white border-transparent hover:from-violet-700 hover:to-blue-700 hover:shadow-[0_8px_32px_rgba(124,58,237,0.4)] hover:scale-105 transition-all duration-300",
    cyber:
      "bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-500 text-white border-transparent hover:from-cyan-500 hover:to-blue-600 hover:shadow-[0_8px_32px_rgba(6,182,212,0.4)] hover:scale-105 transition-all duration-300",
    borderGlow:
      "bg-transparent border-2 border-blue-500 text-blue-500 hover:border-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] hover:text-blue-400 transition-all duration-300",
    borderGradient:
      "bg-transparent border-2 border-transparent bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-border text-transparent bg-clip-text hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] transition-all duration-300",
    borderAnimated:
      "relative bg-transparent border-2 border-gray-300 text-gray-700 hover:border-transparent hover:text-white overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-500 before:via-purple-500 before:to-pink-500 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300 before:-z-10",
    borderRainbow:
      "relative bg-transparent border-2 text-gray-800 hover:text-white overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-red-500 before:via-yellow-500 before:via-green-500 before:via-blue-500 before:to-purple-500 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300 before:-z-10 after:absolute after:inset-0.5 after:bg-white after:rounded-md after:-z-10",
    borderPulse:
      "bg-transparent border-2 border-blue-500 text-blue-500 hover:border-blue-400 hover:text-blue-400 animate-pulse hover:shadow-[0_0_30px_rgba(59,130,246,0.8)] transition-all duration-300",
    borderNeon:
      "bg-black border-2 border-cyan-400 text-cyan-400 hover:border-cyan-300 hover:text-cyan-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.6),inset_0_0_20px_rgba(34,211,238,0.1)] transition-all duration-300",
    borderElectric:
      "bg-transparent border-2 border-purple-500 text-purple-500 hover:border-pink-500 hover:text-pink-500 hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] transition-all duration-300 animate-pulse",
    borderGlowing:
      "relative bg-transparent border-2 border-blue-500 text-blue-500 hover:text-white overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-500 before:to-purple-600 before:opacity-0 hover:before:opacity-100 before:transition-all before:duration-500 before:-z-10 hover:border-transparent hover:shadow-[0_0_30px_rgba(59,130,246,0.8)]",
    borderShimmer:
      "relative bg-transparent border-2 border-gray-300 text-gray-700 overflow-hidden before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white before:to-transparent before:opacity-20 hover:before:left-[100%] before:transition-all before:duration-700",
    borderMoving:
      "relative bg-transparent border-2 text-gray-800 overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-500 before:via-purple-500 before:to-pink-500 before:bg-[length:400%_400%] before:animate-gradient-x before:opacity-100 after:absolute after:inset-0.5 after:bg-white after:rounded-md after:-z-10",
    borderFire:
      "bg-transparent border-2 border-orange-500 text-orange-500 hover:border-red-500 hover:text-red-500 hover:shadow-[0_0_25px_rgba(251,146,60,0.6)] transition-all duration-300 animate-pulse",
    borderIce:
      "bg-transparent border-2 border-cyan-300 text-cyan-600 hover:border-blue-400 hover:text-blue-600 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all duration-300",
    borderGold:
      "bg-transparent border-2 border-yellow-400 text-yellow-600 hover:border-yellow-300 hover:text-yellow-500 hover:shadow-[0_0_20px_rgba(250,204,21,0.6)] transition-all duration-300",
    borderSilver:
      "bg-transparent border-2 border-gray-400 text-gray-600 hover:border-gray-300 hover:text-gray-500 hover:shadow-[0_0_20px_rgba(156,163,175,0.6)] transition-all duration-300",
    borderHolographic:
      "relative bg-transparent border-2 text-gray-800 overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-pink-500 before:via-purple-500 before:via-blue-500 before:via-green-500 before:to-yellow-500 before:bg-[length:400%_100%] before:animate-gradient-x before:opacity-100 after:absolute after:inset-0.5 after:bg-white after:rounded-md after:-z-10 hover:after:bg-gray-50",
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
