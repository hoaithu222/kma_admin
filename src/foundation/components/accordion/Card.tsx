import React from "react";

// ===========================================
// TYPES & INTERFACES
// ===========================================

export type CardVariant =
  | "default"
  | "outlined"
  | "elevated"
  | "ghost"
  | "gradient";
export type CardSize = "sm" | "md" | "lg" | "xl";
export type CardStatus = "default" | "success" | "error" | "warning" | "info";

export interface CardProps {
  // Nội dung
  children: React.ReactNode;

  // Header section
  title?: string;
  subtitle?: string;
  headerIcon?: React.ReactNode;
  headerActions?: React.ReactNode;

  // Footer section
  footer?: React.ReactNode;

  // Styling
  variant?: CardVariant;
  size?: CardSize;
  status?: CardStatus;
  className?: string;

  // Behavior
  clickable?: boolean;
  hoverable?: boolean;
  disabled?: boolean;
  loading?: boolean;

  // Events
  onClick?: () => void;
  onDoubleClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;

  // Layout
  fullWidth?: boolean;
  noPadding?: boolean;

  // Accessibility
  role?: string;
  "aria-label"?: string;
  tabIndex?: number;
}

// ===========================================
// MAIN CARD COMPONENT
// ===========================================

/**
 * TRƯỜNG HỢP SỬ DỤNG CARD:
 *
 * 1. Product Cards - Hiển thị sản phẩm trong danh sách
 *    <Card title="iPhone 15" subtitle="Apple" clickable hoverable>
 *      <img src="..." />
 *      <p>Price: $999</p>
 *    </Card>
 *
 * 2. User Profile Cards - Thông tin người dùng
 *    <Card
 *      title="John Doe"
 *      subtitle="Software Engineer"
 *      headerIcon={<UserIcon />}
 *      footer={<button>Connect</button>}
 *    >
 *      <Avatar />
 *      <ContactInfo />
 *    </Card>
 *
 * 3. Dashboard Widgets - Các widget trên dashboard
 *    <Card variant="elevated" title="Sales Stats">
 *      <Chart data={salesData} />
 *    </Card>
 *
 * 4. Article/Blog Cards - Bài viết, tin tức
 *    <Card clickable hoverable>
 *      <img src="article-image" />
 *      <h3>Article Title</h3>
 *      <p>Preview text...</p>
 *    </Card>
 *
 * 5. Feature Cards - Giới thiệu tính năng
 *    <Card variant="gradient" size="lg">
 *      <FeatureIcon />
 *      <h3>Feature Name</h3>
 *      <p>Description</p>
 *    </Card>
 *
 * 6. Pricing Cards - Bảng giá
 *    <Card variant="outlined" status="success">
 *      <PricingPlan />
 *      <PriceDisplay />
 *      <FeatureList />
 *    </Card>
 *
 * 7. Notification Cards - Thông báo
 *    <Card status="warning" size="sm">
 *      <AlertIcon />
 *      <NotificationContent />
 *    </Card>
 *
 * 8. Media Cards - Hiển thị hình ảnh, video
 *    <Card noPadding>
 *      <MediaPlayer />
 *      <MediaControls />
 *    </Card>
 *
 * 9. Form Cards - Các form trong card
 *    <Card title="Contact Form" variant="elevated">
 *      <FormFields />
 *      <SubmitButton />
 *    </Card>
 *
 * 10. Statistics Cards - Hiển thị số liệu thống kê
 *     <Card variant="filled" headerIcon={<ChartIcon />}>
 *       <StatNumber />
 *       <StatChart />
 *     </Card>
 */

const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  headerIcon,
  headerActions,
  footer,
  variant = "default",
  size = "md",
  status = "default",
  className = "",
  clickable = false,
  hoverable = false,
  disabled = false,
  loading = false,
  onClick,
  onDoubleClick,
  onMouseEnter,
  onMouseLeave,
  fullWidth = false,
  noPadding = false,
  role,
  "aria-label": ariaLabel,
  tabIndex,
}) => {
  // Variant styles
  const variantClasses = {
    default: "bg-background-elevated border border-border-primary shadow-sm",
    outlined: "bg-background-elevated border-2 border-border-secondary",
    elevated: "bg-background-elevated shadow-lg border border-border-muted",
    ghost: "bg-transparent border-0",
    gradient:
      "bg-gradient-to-br from-primary-light to-secondary-light border border-primary-light",
  };

  // Size styles với responsive design
  const sizeClasses = {
    sm: {
      card: "rounded-lg",
      padding: noPadding ? "" : "p-3",
      header: "p-3 pb-2",
      content: "px-3",
      footer: "px-3 pt-2 pb-3",
      headerSpacing: "-m-3 mb-3",
      footerSpacing: "-m-3 mt-3",
    },
    md: {
      card: "rounded-xl",
      padding: noPadding ? "" : "p-4 sm:p-5",
      header: "p-4 sm:p-5 pb-3",
      content: "px-4 sm:px-5",
      footer: "px-4 sm:px-5 pt-3 pb-4 sm:pb-5",
      headerSpacing: "-m-4 sm:-m-5 mb-4",
      footerSpacing: "-m-4 sm:-m-5 mt-4",
    },
    lg: {
      card: "rounded-xl",
      padding: noPadding ? "" : "p-5 sm:p-6",
      header: "p-5 sm:p-6 pb-4",
      content: "px-5 sm:px-6",
      footer: "px-5 sm:px-6 pt-4 pb-5 sm:pb-6",
      headerSpacing: "-m-5 sm:-m-6 mb-5",
      footerSpacing: "-m-5 sm:-m-6 mt-5",
    },
    xl: {
      card: "rounded-2xl",
      padding: noPadding ? "" : "p-6 sm:p-8",
      header: "p-6 sm:p-8 pb-6",
      content: "px-6 sm:px-8",
      footer: "px-6 sm:px-8 pt-6 pb-6 sm:pb-8",
      headerSpacing: "-m-6 sm:-m-8 mb-6",
      footerSpacing: "-m-6 sm:-m-8 mt-6",
    },
  };

  // Status styles
  const statusClasses = {
    default: "",
    success: "border-success bg-success/10",
    error: "border-error bg-error/10",
    warning: "border-warning bg-warning/10",
    info: "border-info bg-info/10",
  };

  // Interactive styles
  const interactiveClasses = {
    clickable:
      "cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
    hoverable:
      "transition-all duration-200 hover:shadow-md hover:-translate-y-0.5",
    disabled: "opacity-50 cursor-not-allowed pointer-events-none",
  };

  const cardClasses = [
    // Base styles
    "relative",
    variantClasses[variant],
    sizeClasses[size].card,
    sizeClasses[size].padding,

    // Status
    status !== "default" ? statusClasses[status] : "",

    // Interactive states
    clickable ? interactiveClasses.clickable : "",
    (hoverable || clickable) && !disabled ? interactiveClasses.hoverable : "",
    disabled ? interactiveClasses.disabled : "",

    // Layout
    fullWidth ? "w-full" : "",

    // Loading state
    loading ? "opacity-75" : "",

    // Custom className
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const hasHeader = title || subtitle || headerIcon || headerActions;

  // Handle keyboard events for accessibility
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (
      clickable &&
      !disabled &&
      (event.key === "Enter" || event.key === " ")
    ) {
      event.preventDefault();
      onClick?.();
    }
  };

  return (
    <div
      className={cardClasses}
      onClick={!disabled ? onClick : undefined}
      onDoubleClick={!disabled ? onDoubleClick : undefined}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onKeyDown={handleKeyDown}
      role={role || (clickable ? "button" : undefined)}
      aria-label={ariaLabel}
      tabIndex={clickable && !disabled ? (tabIndex ?? 0) : tabIndex}
      aria-disabled={disabled}
    >
      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-opacity-75 bg-background-elevated rounded-xl">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-6 h-6 border-b-2 rounded-full border-primary animate-spin"></div>
            <span className="text-sm text-text-secondary">Loading...</span>
          </div>
        </div>
      )}

      {/* Header Section */}
      {hasHeader && (
        <div
          className={`
          ${noPadding ? sizeClasses[size].header : sizeClasses[size].headerSpacing}
          border-b border-gray-200
        `}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start flex-1 min-w-0 space-x-3">
              {headerIcon && (
                <div className="flex-shrink-0 mt-0.5">{headerIcon}</div>
              )}
              <div className="flex-1 min-w-0">
                {title && (
                  <h3 className="text-lg font-semibold truncate text-text-primary">
                    {title}
                  </h3>
                )}
                {subtitle && (
                  <p className="mt-1 text-sm truncate text-text-secondary">
                    {subtitle}
                  </p>
                )}
              </div>
            </div>
            {headerActions && (
              <div className="flex-shrink-0 ml-3">{headerActions}</div>
            )}
          </div>
        </div>
      )}

      {/* Content Section */}
      <div className={noPadding ? sizeClasses[size].content : ""}>
        {children}
      </div>

      {/* Footer Section */}
      {footer && (
        <div
          className={`
          ${noPadding ? sizeClasses[size].footer : sizeClasses[size].footerSpacing}
          border-t border-gray-200
        `}
        >
          {footer}
        </div>
      )}
    </div>
  );
};

// ===========================================
// CARD VARIANTS - Specialized Cards
// ===========================================

// Product Card - specialized for e-commerce
export const ProductCard: React.FC<{
  product: {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    rating?: number;
    reviews?: number;
    discount?: string;
  };
  onAddToCart?: (productId: string) => void;
  onWishlist?: (productId: string) => void;
  onClick?: (productId: string) => void;
}> = ({ product, onAddToCart, onWishlist, onClick }) => {
  return (
    <Card
      variant="outlined"
      hoverable
      clickable
      onClick={() => onClick?.(product.id)}
      headerActions={
        <button
          onClick={(e) => {
            e.stopPropagation();
            onWishlist?.(product.id);
          }}
          className="transition-colors text-text-muted hover:text-error"
        >
          ♡
        </button>
      }
      footer={
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart?.(product.id);
          }}
          className="w-full py-2 transition-colors rounded-lg text-text-on-primary bg-primary hover:bg-primary-dark"
        >
          Add to Cart
        </button>
      }
    >
      <div className="space-y-3">
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-48 rounded-lg"
          />
          {product.discount && (
            <span className="absolute px-2 py-1 text-xs rounded text-text-on-primary bg-error top-2 left-2">
              {product.discount}
            </span>
          )}
        </div>

        <div className="space-y-2">
          <h3 className="font-medium truncate text-text-primary">
            {product.name}
          </h3>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-primary">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm line-through text-text-muted">
                  ${product.originalPrice}
                </span>
              )}
            </div>
          </div>

          {product.rating && (
            <div className="flex items-center space-x-2">
              <div className="flex text-accent">
                {"★".repeat(Math.floor(product.rating))}
                {"☆".repeat(5 - Math.floor(product.rating))}
              </div>
              {product.reviews && (
                <span className="text-sm text-text-muted">
                  ({product.reviews})
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

// Stats Card - specialized for dashboards
export const StatsCard: React.FC<{
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: "increase" | "decrease";
  };
  icon?: React.ReactNode;
  color?: "blue" | "green" | "red" | "yellow" | "purple";
}> = ({ title, value, change, icon, color = "blue" }) => {
  const colorClasses = {
    blue: "bg-blue-50 border-blue-200 text-blue-600",
    green: "bg-green-50 border-green-200 text-green-600",
    red: "bg-red-50 border-red-200 text-red-600",
    yellow: "bg-yellow-50 border-yellow-200 text-yellow-600",
    purple: "bg-purple-50 border-purple-200 text-purple-600",
  };

  return (
    <Card variant="outlined" className={colorClasses[color]}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">{value}</p>
          {change && (
            <p
              className={`text-sm mt-1 ${
                change.type === "increase" ? "text-green-600" : "text-red-600"
              }`}
            >
              {change.type === "increase" ? "↗" : "↘"}{" "}
              {Math.abs(change.value)}%
            </p>
          )}
        </div>
        {icon && <div className="text-4xl opacity-20">{icon}</div>}
      </div>
    </Card>
  );
};

export default Card;
