import React, { useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import {
  ChevronDown,
  Plus,
  Minus,
  HelpCircle,
  AlertCircle,
} from "lucide-react";

// ===========================================
// TYPES & INTERFACES
// ===========================================

export type AccordionVariant =
  | "default"
  | "bordered"
  | "ghost"
  | "filled"
  | "card"
  | "minimal"
  | "modern";
export type AccordionSize = "xs" | "sm" | "md" | "lg" | "xl";
export type AccordionIconType =
  | "chevron"
  | "plus"
  | "custom"
  | "none"
  | "arrow"
  | "dot";
export type AccordionAnimation =
  | "default"
  | "smooth"
  | "spring"
  | "bounce"
  | "slide";

export interface AccordionItemProps {
  value: string;
  title: string;
  children: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
  badge?: string | number;
  subtitle?: string;
  priority?: "low" | "medium" | "high" | "urgent";
  status?: "active" | "inactive" | "pending" | "completed";
}

export interface CustomAccordionProps {
  // Dữ liệu và cấu hình cơ bản
  variant?: AccordionVariant;
  size?: AccordionSize;
  iconType?: AccordionIconType;
  customIcon?: React.ReactNode;
  animation?: AccordionAnimation;

  // Hành vi accordion
  type?: "single" | "multiple";
  collapsible?: boolean;
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;

  // Styling và hiệu ứng
  className?: string;
  fullWidth?: boolean;
  animated?: boolean;
  gradient?: boolean;
  shadow?: boolean;
  rounded?: boolean;

  // Advanced features
  searchable?: boolean;
  draggable?: boolean;
  numbered?: boolean;
  timeline?: boolean;

  // Children
  children: React.ReactNode;
}

// ===========================================
// EXTENDED USE CASES & EXAMPLES
// ===========================================

/**
 * =================== TRƯỜNG HỢP SỬ DỤNG MỞ RỘNG ===================
 *
 * 1. FAQ SECTION - Câu hỏi thường gặp
 * Mục đích: Giảm support tickets, cải thiện UX
 * Đặc điểm: Search, categorization, vote helpful
 *
 * <CustomAccordion variant="card" searchable iconType="plus">
 *   <AccordionItem
 *     value="shipping"
 *     title="How long does shipping take?"
 *     icon={<ShoppingCart />}
 *     badge="Popular"
 *   >
 *     Standard shipping takes 3-5 business days...
 *   </AccordionItem>
 * </CustomAccordion>
 *
 * 2. PRODUCT SPECIFICATION - Chi tiết kỹ thuật
 * Mục đích: Hiển thị thông tin chi tiết không làm rối layout
 * Đặc điểm: Grouped sections, technical data
 *
 * <CustomAccordion variant="modern" size="lg">
 *   <AccordionItem title="Technical Specifications" icon={<Settings />}>
 *     <SpecTable data={techSpecs} />
 *   </AccordionItem>
 *   <AccordionItem title="Compatibility" icon={<Zap />}>
 *     <CompatibilityList />
 *   </AccordionItem>
 * </CustomAccordion>
 *
 * 3. SETTINGS PANEL - Cài đặt ứng dụng
 * Mục đích: Tổ chức settings theo nhóm logic
 * Đặc điểm: Nested settings, toggle controls
 *
 * <CustomAccordion variant="minimal" type="multiple">
 *   <AccordionItem title="Privacy Settings" icon={<Users />}>
 *     <PrivacyToggles />
 *   </AccordionItem>
 *   <AccordionItem title="Notifications" badge="3 new">
 *     <NotificationSettings />
 *   </AccordionItem>
 * </CustomAccordion>
 *
 * 4. COURSE CURRICULUM - Chương trình học
 * Mục đích: Hiển thị cấu trúc khóa học
 * Đặc điểm: Progress tracking, locked content
 *
 * <CustomAccordion variant="timeline" numbered>
 *   <AccordionItem
 *     title="Introduction to React"
 *     status="completed"
 *     icon={<BookOpen />}
 *   >
 *     <LessonList lessons={introLessons} />
 *   </AccordionItem>
 *   <AccordionItem
 *     title="Advanced Hooks"
 *     status="active"
 *     badge="In Progress"
 *   >
 *     <LessonList lessons={hooksLessons} />
 *   </AccordionItem>
 * </CustomAccordion>
 *
 * 5. PRICING TIERS - Bảng giá chi tiết
 * Mục đích: So sánh features giữa các gói
 * Đặc điểm: Feature comparison, highlight differences
 *
 * <CustomAccordion variant="card" shadow>
 *   <AccordionItem
 *     title="Basic Plan - $9/month"
 *     subtitle="Perfect for individuals"
 *     badge="Popular"
 *   >
 *     <FeatureList features={basicFeatures} />
 *   </AccordionItem>
 * </CustomAccordion>
 *
 * 6. STEP-BY-STEP GUIDE - Hướng dẫn từng bước
 * Mục đích: Tutorial, onboarding process
 * Đặc điểm: Sequential flow, completion tracking
 *
 * <CustomAccordion variant="timeline" numbered animation="spring">
 *   <AccordionItem
 *     title="Create Account"
 *     status="completed"
 *     priority="high"
 *   >
 *     <SignupForm />
 *   </AccordionItem>
 * </CustomAccordion>
 *
 * 7. FILTER SIDEBAR - Bộ lọc sản phẩm
 * Mục đích: Filter products without page reload
 * Đặc điểm: Multiple selections, clear filters
 *
 * <CustomAccordion variant="minimal" type="multiple">
 *   <AccordionItem title="Price Range" icon={<Filter />}>
 *     <PriceSlider />
 *   </AccordionItem>
 *   <AccordionItem title="Categories" badge="5 selected">
 *     <CategoryCheckboxes />
 *   </AccordionItem>
 * </CustomAccordion>
 *
 * 8. RESTAURANT MENU - Menu nhà hàng
 * Mục đích: Organize dishes by category
 * Đặc điểm: Images, pricing, dietary info
 *
 * <CustomAccordion variant="card" gradient>
 *   <AccordionItem title="Appetizers" icon={<Star />}>
 *     <MenuItems category="appetizers" />
 *   </AccordionItem>
 * </CustomAccordion>
 *
 * 9. TROUBLESHOOTING GUIDE - Khắc phục sự cố
 * Mục đích: Self-service support
 * Đặc điểm: Error codes, solution steps
 *
 * <CustomAccordion variant="bordered" searchable>
 *   <AccordionItem
 *     title="Login Issues"
 *     icon={<AlertCircle />}
 *     priority="urgent"
 *   >
 *     <TroubleshootingSteps />
 *   </AccordionItem>
 * </CustomAccordion>
 *
 * 10. MOBILE NAVIGATION - Menu điều hướng mobile
 * Mục đích: Space-efficient navigation
 * Đặc điểm: Nested menus, touch-friendly
 *
 * <CustomAccordion variant="ghost" iconType="arrow">
 *   <AccordionItem title="Products" icon={<Menu />}>
 *     <SubNavigation items={productNav} />
 *   </AccordionItem>
 * </CustomAccordion>
 *
 * 11. FORM WIZARD - Form nhiều bước
 * Mục đích: Break complex forms into steps
 * Đặc điểm: Validation, progress indication
 *
 * <CustomAccordion variant="modern" numbered>
 *   <AccordionItem
 *     title="Personal Information"
 *     status="completed"
 *   >
 *     <PersonalInfoForm />
 *   </AccordionItem>
 * </CustomAccordion>
 *
 * 12. EVENT TIMELINE - Lịch sử sự kiện
 * Mục đích: Show chronological events
 * Đặc điểm: Timeline view, date sorting
 *
 * <CustomAccordion variant="timeline" size="lg">
 *   <AccordionItem
 *     title="Project Kickoff"
 *     subtitle="March 15, 2024"
 *   >
 *     <EventDetails />
 *   </AccordionItem>
 * </CustomAccordion>
 */

// ===========================================
// MAIN ACCORDION COMPONENT
// ===========================================

const CustomAccordion: React.FC<CustomAccordionProps> = ({
  variant = "default",
  size = "md",
  iconType = "chevron",
  customIcon,
  animation = "default",
  type = "single",
  // collapsible = true,
  defaultValue,
  value,
  onValueChange,
  className = "",
  fullWidth = false,
  animated = true,
  gradient = false,
  shadow = false,
  rounded = true,
  searchable = false,
  // draggable = false,
  numbered = false,
  timeline = false,
  children,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Variant styles with enhanced effects
  const variantClasses = {
    default: `
      border border-border-primary
      ${rounded ? "rounded-lg" : ""}
      divide-y divide-border-primary
      ${shadow ? "shadow-sm" : ""}
      ${gradient ? "bg-gradient-to-r from-background-elevated to-background-muted" : "bg-background-elevated"}
    `,
    bordered: `
      border-1 lg:border-2 border-border-secondary
      ${rounded ? "rounded-xl" : ""}
      divide-y divide-border-primary
      ${shadow ? "shadow-md" : ""}
      ${gradient ? "bg-gradient-to-br from-primary-light to-secondary-light" : "bg-background-elevated"}
    `,
    ghost: `
      space-y-2
      ${gradient ? "bg-gradient-to-b from-transparent to-background-muted/30" : ""}
    `,
    filled: `
      bg-background-muted
      ${rounded ? "rounded-lg" : ""}
      divide-y divide-border-primary
      ${shadow ? "shadow-inner" : ""}
      ${gradient ? "bg-gradient-to-br from-background-muted to-background-subtle" : ""}
    `,
    card: `
      bg-background-elevated border border-border-primary
      ${rounded ? "rounded-xl" : ""}
      ${shadow ? "shadow-lg" : "shadow-sm"}
      divide-y divide-border-muted
      ${gradient ? "bg-gradient-to-br from-background-elevated via-background-muted to-background-elevated" : ""}
    `,
    minimal: `
      border-l-4 border-primary
      pl-2 md:pl-3 lg:pl-4 space-y-1
      ${gradient ? "bg-gradient-to-r from-primary-light/50 to-transparent" : ""}
    `,
    modern: `
      bg-background-elevated border border-border-primary
      ${rounded ? "rounded-2xl" : ""}
      ${shadow ? "shadow-xl" : "shadow-md"}
      divide-y divide-border-muted
      backdrop-blur-sm
      ${gradient ? "bg-gradient-to-br from-background-elevated via-primary-light/30 to-secondary-light/30" : ""}
    `,
  };

  // Size configurations
  const sizeConfig = {
    xs: { container: "text-xs", spacing: "space-y-0.5" },
    sm: { container: "text-sm", spacing: "space-y-1" },
    md: { container: "text-base", spacing: "space-y-2" },
    lg: { container: "text-lg", spacing: "space-y-3" },
    xl: { container: "text-xl", spacing: "space-y-4" },
  };

  // Animation classes
  const animationClasses = {
    default: "transition-all duration-200",
    smooth: "transition-all duration-300 ease-in-out",
    spring: "transition-all duration-500 ease-out",
    bounce: "transition-all duration-400 ease-bounce",
    slide: "transition-all duration-250 ease-linear",
  };

  const containerClasses = [
    variantClasses[variant],
    sizeConfig[size].container,
    animated ? animationClasses[animation] : "",
    fullWidth ? "w-full" : "",
    variant === "ghost" ? sizeConfig[size].spacing : "",
    timeline
      ? "relative before:absolute before:left-4 before:top-0 before:bottom-0 before:w-0.5 before:bg-gray-300"
      : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // Filter children based on search
  const filteredChildren =
    searchable && searchTerm
      ? React.Children.toArray(children).filter((child) => {
          if (React.isValidElement(child) && child.props.title) {
            return child.props.title
              .toLowerCase()
              .includes(searchTerm.toLowerCase());
          }
          return true;
        })
      : React.Children.toArray(children);

  return (
    <div className="space-y-2 sm:space-y-3 md:space-y-4">
      {/* Search bar */}
      {searchable && (
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-2 py-1 pl-10 border rounded-lg sm:px-3 md:px-4 sm:py-2 md:py-3 border-border-primary focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <HelpCircle className="absolute left-3 top-2.5 w-4 h-4 text-text-muted" />
        </div>
      )}

      {type === "multiple" ? (
        <Accordion.Root
          type="multiple"
          defaultValue={defaultValue as string[]}
          value={value as string[]}
          onValueChange={onValueChange}
          className={containerClasses}
        >
          {filteredChildren.map((child, index) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, {
                variant,
                size,
                iconType,
                customIcon,
                animated,
                animation,
                numbered: numbered ? index + 1 : undefined,
                timeline,
                key: child.props.value || index,
              } as any);
            }
            return child;
          })}
        </Accordion.Root>
      ) : (
        <Accordion.Root
          type="single"
          defaultValue={defaultValue as string}
          value={value as string}
          onValueChange={onValueChange}
          className={containerClasses}
        >
          {filteredChildren.map((child, index) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, {
                variant,
                size,
                iconType,
                customIcon,
                animated,
                animation,
                numbered: numbered ? index + 1 : undefined,
                timeline,
                key: child.props.value || index,
              } as any);
            }
            return child;
          })}
        </Accordion.Root>
      )}
    </div>
  );
};

// ===========================================
// ENHANCED ACCORDION ITEM COMPONENT
// ===========================================

const AccordionItem: React.FC<
  AccordionItemProps & {
    variant?: AccordionVariant;
    size?: AccordionSize;
    iconType?: AccordionIconType;
    customIcon?: React.ReactNode;
    animated?: boolean;
    animation?: AccordionAnimation;
    numbered?: number;
    timeline?: boolean;
  }
> = ({
  value,
  title,
  children,
  disabled = false,
  icon,
  badge,
  subtitle,
  priority = "medium",
  status = "active",
  variant = "default",
  size = "md",
  iconType = "chevron",
  customIcon,
  animated = true,
  animation = "default",
  numbered,
  timeline,
}) => {
  // Size configurations
  const sizeClasses = {
    xs: {
      trigger: "px-2 py-1.5 text-xs",
      content: "px-2 pb-2 text-xs",
      icon: "w-3 h-3",
      badge: "text-xs px-1 py-0.5",
    },
    sm: {
      trigger: "px-3 py-2 text-sm",
      content: "px-3 pb-3 text-sm",
      icon: "w-3 h-3",
      badge: "text-xs px-1.5 py-0.5",
    },
    md: {
      trigger: "px-4 py-3 text-base",
      content: "px-4 pb-4 text-base",
      icon: "w-4 h-4",
      badge: "text-xs px-2 py-1",
    },
    lg: {
      trigger: "px-5 py-4 text-lg",
      content: "px-5 pb-5 text-lg",
      icon: "w-5 h-5",
      badge: "text-sm px-2.5 py-1",
    },
    xl: {
      trigger: "px-6 py-5 text-xl",
      content: "px-6 pb-6 text-xl",
      icon: "w-6 h-6",
      badge: "text-sm px-3 py-1.5",
    },
  };

  // Priority colors
  const priorityColors = {
    low: "text-success bg-success/10 border-success/20",
    medium: "text-primary bg-primary/10 border-primary/20",
    high: "text-warning bg-warning/10 border-warning/20",
    urgent: "text-error bg-error/10 border-error/20",
  };

  // Status indicators
  const statusIndicators = {
    active: "w-2 h-2 bg-success rounded-full",
    inactive: "w-2 h-2 bg-text-muted rounded-full",
    pending: "w-2 h-2 bg-warning rounded-full animate-pulse",
    completed: "w-2 h-2 bg-primary rounded-full",
  };

  // Animation classes
  const animationClasses = {
    default: "transition-all duration-200",
    smooth: "transition-all duration-300 ease-in-out",
    spring: "transition-all duration-500 ease-out",
    bounce: "transition-all duration-400 ease-bounce",
    slide: "transition-all duration-250 ease-linear",
  };

  // Render accordion icon
  const renderIcon = () => {
    if (iconType === "none") return null;

    const iconClasses = `${sizeClasses[size].icon} ${animated ? animationClasses[animation || "default"] : ""} group-data-[state=open]:rotate-180`;

    if (iconType === "custom" && customIcon) {
      return <div className={iconClasses}>{customIcon}</div>;
    }

    if (iconType === "plus") {
      return (
        <div
          className={`${sizeClasses[size].icon} ${animated ? animationClasses[animation || "default"] : ""}`}
        >
          <Plus className="group-data-[state=open]:hidden" />
          <Minus className="hidden group-data-[state=open]:block" />
        </div>
      );
    }

    if (iconType === "arrow") {
      return (
        <ChevronDown
          className={iconClasses.replace("rotate-180", "rotate-90")}
        />
      );
    }

    if (iconType === "dot") {
      return (
        <div
          className={`${sizeClasses[size].icon} ${animated ? animationClasses[animation || "default"] : ""}`}
        >
          <div className="w-2 h-2 bg-current rounded-full group-data-[state=open]:scale-125" />
        </div>
      );
    }

    return <ChevronDown className={iconClasses} />;
  };

  const triggerClasses = [
    "flex items-center justify-between w-full text-left group",
    "hover:bg-background-muted focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    sizeClasses[size].trigger,
    variant === "ghost" ? "rounded-lg hover:bg-background-subtle" : "",
    variant === "modern"
      ? "hover:bg-gradient-to-r hover:from-primary-light hover:to-secondary-light"
      : "",
    animated ? animationClasses[animation || "default"] : "",
    timeline ? "relative" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const contentClasses = [
    "overflow-hidden",
    animated
      ? "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Accordion.Item value={value} disabled={disabled} className="relative">
      {/* Timeline connector */}
      {timeline && numbered && (
        <div className="absolute left-0 z-10 flex items-center justify-center w-4 h-4 text-xs font-medium border-2 rounded-full md:w-6 md:h-6 md:text-sm lg:w-8 lg:h-8 lg:text-sm bg-background-elevated border-border-primary top-3">
          {numbered}
        </div>
      )}

      <Accordion.Header>
        <Accordion.Trigger className={triggerClasses}>
          <div className="flex items-center flex-1 min-w-0 space-x-3">
            {/* Status indicator */}
            <div className={statusIndicators[status]} />

            {/* Custom icon */}
            {icon && <div className="flex-shrink-0">{icon}</div>}

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium truncate md:text-lg lg:text-xl text-text-primary">
                  {title}
                </span>

                {/* Badge */}
                {badge && (
                  <span
                    className={`
                      ${sizeClasses[size].badge}
                      ${priorityColors[priority]}
                      border rounded-full font-medium
                      text-xs md:text-sm lg:text-base
                    `}
                  >
                    {badge}
                  </span>
                )}

                {/* Priority indicator */}
                {priority === "urgent" && (
                  <AlertCircle className="w-4 h-4 text-error animate-pulse" />
                )}
              </div>

              {/* Subtitle */}
              {subtitle && (
                <p className="mt-1 text-xs truncate md:text-sm lg:text-base text-text-secondary">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          {renderIcon()}
        </Accordion.Trigger>
      </Accordion.Header>

      <Accordion.Content className={contentClasses}>
        <div className={sizeClasses[size].content}>{children}</div>
      </Accordion.Content>
    </Accordion.Item>
  );
};

export { CustomAccordion as Accordion, AccordionItem };
export default CustomAccordion;
