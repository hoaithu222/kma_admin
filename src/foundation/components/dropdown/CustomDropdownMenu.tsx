import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  ChevronRight,
  Check,
  Circle,
  User,
  Settings,
  LogOut,
  Shield,
  Archive,
  Share,
  Download,
  Eye,
} from "lucide-react";

// ===========================================
// TYPES & INTERFACES
// ===========================================

export type DropdownVariant =
  | "default"
  | "dark"
  | "minimal"
  | "modern"
  | "academic";
export type DropdownSize = "sm" | "md" | "lg";
export type ItemType =
  | "item"
  | "separator"
  | "label"
  | "checkbox"
  | "radio"
  | "submenu";

export interface DropdownItemProps {
  type?: ItemType;
  children: React.ReactNode;
  icon?: React.ReactNode;
  shortcut?: string;
  disabled?: boolean;
  destructive?: boolean;
  checked?: boolean;
  onSelect?: () => void;
  className?: string;
}

export interface DropdownMenuProps {
  // Trigger
  trigger: React.ReactNode;

  // Content
  children: React.ReactNode;

  // Behavior
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  modal?: boolean;

  // Styling
  variant?: DropdownVariant;
  size?: DropdownSize;
  className?: string;

  // Positioning
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  alignOffset?: number;

  // Portal behavior
  portal?: boolean;
}

// ===========================================
// MAIN DROPDOWN MENU COMPONENT
// ===========================================

/**
 * TRƯỜNG HỢP SỬ DỤNG TRONG HỌC VIỆN KỸ THUẬT MẬT MÃ:
 *
 * 1. User Profile Menu - Avatar menu với logout, settings
 * 2. Course Actions - Enroll, bookmark, share course
 * 3. Assignment Options - Submit, save draft, preview
 * 4. Admin Controls - Manage users, courses, permissions
 * 5. Security Settings - 2FA, password change, session management
 * 6. Language/Theme Switcher - Multi-language support
 * 7. Notification Settings - Configure alerts, emails
 * 8. File Operations - Download, share, archive materials
 * 9. Student Management - Grade, feedback, progress tracking
 * 10. System Settings - Backup, maintenance, logs access
 */

const CustomDropdownMenu: React.FC<DropdownMenuProps> = ({
  trigger,
  children,
  open,
  onOpenChange,
  modal = true,
  variant = "default",
  size = "md",
  className = "",
  side = "bottom",
  align = "start",
  sideOffset = 4,
  alignOffset = 0,
  portal = true,
}) => {
  // Variant styles
  const variantStyles = {
    default: {
      content: "bg-background-elevated border border-border-primary shadow-lg",
      item: "text-text-primary hover:bg-background-muted focus:bg-background-muted",
      destructive: "text-error hover:bg-error-light focus:bg-error-light",
      disabled: "text-text-muted cursor-not-allowed",
      separator: "bg-border-primary",
      label: "text-text-secondary",
    },
    dark: {
      content:
        "bg-background-elevated border border-border-secondary shadow-xl",
      item: "text-text-primary hover:bg-background-muted focus:bg-background-muted",
      destructive: "text-error hover:bg-error-light focus:bg-error-light",
      disabled: "text-text-muted cursor-not-allowed",
      separator: "bg-border-secondary",
      label: "text-text-secondary",
    },
    minimal: {
      content: "bg-background-elevated border border-border-muted shadow-sm",
      item: "text-text-secondary hover:bg-background-muted focus:bg-background-muted",
      destructive: "text-error hover:bg-error-light focus:bg-error-light",
      disabled: "text-text-muted cursor-not-allowed",
      separator: "bg-border-muted",
      label: "text-text-muted",
    },
    modern: {
      content:
        "bg-background-elevated/95 backdrop-blur-xl border border-border-primary shadow-2xl",
      item: "text-text-primary hover:bg-primary-light focus:bg-primary-light",
      destructive: "text-error hover:bg-error-light focus:bg-error-light",
      disabled: "text-text-muted cursor-not-allowed",
      separator:
        "bg-gradient-to-r from-transparent via-border-primary to-transparent",
      label: "text-primary font-medium",
    },
    academic: {
      content: "bg-primary-light border border-primary shadow-lg",
      item: "text-primary hover:bg-primary focus:bg-primary",
      destructive: "text-error hover:bg-error-light focus:bg-error-light",
      disabled: "text-text-muted cursor-not-allowed",
      separator: "bg-primary",
      label: "text-primary font-semibold",
    },
  };

  // Size configurations
  const sizeStyles = {
    sm: {
      content: "min-w-32 rounded-lg p-1",
      item: "px-2 py-1.5 text-sm rounded-md",
      icon: "w-3 h-3",
      shortcut: "text-xs",
    },
    md: {
      content: "min-w-48 rounded-xl p-2",
      item: "px-3 py-2 text-sm rounded-lg",
      icon: "w-4 h-4",
      shortcut: "text-xs",
    },
    lg: {
      content: "min-w-56 rounded-xl p-3",
      item: "px-4 py-3 text-base rounded-lg",
      icon: "w-5 h-5",
      shortcut: "text-sm",
    },
  };

  const currentVariant = variantStyles[variant];
  const currentSize = sizeStyles[size];

  const contentClasses = [
    currentVariant.content,
    currentSize.content,
    "z-50 animate-in fade-in-0 zoom-in-95 duration-200 outline-none",
    "data-[state=open]:animate-in data-[state=closed]:animate-out",
    className,
  ].join(" ");

  const ContentComponent = portal ? DropdownMenu.Portal : React.Fragment;

  return (
    <DropdownMenu.Root open={open} onOpenChange={onOpenChange} modal={modal}>
      <DropdownMenu.Trigger asChild>{trigger}</DropdownMenu.Trigger>

      <ContentComponent>
        <DropdownMenu.Content
          className={contentClasses}
          side={side}
          align={align}
          sideOffset={sideOffset}
          alignOffset={alignOffset}
        >
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, {
                variant,
                size,
                variantStyles: currentVariant,
                sizeStyles: currentSize,
              } as any);
            }
            return child;
          })}
        </DropdownMenu.Content>
      </ContentComponent>
    </DropdownMenu.Root>
  );
};

// ===========================================
// DROPDOWN ITEM COMPONENTS
// ===========================================

const DropdownItem: React.FC<
  DropdownItemProps & {
    variant?: DropdownVariant;
    size?: DropdownSize;
    variantStyles?: any;
    sizeStyles?: any;
  }
> = ({
  type = "item",
  children,
  icon,
  shortcut,
  disabled = false,
  destructive = false,
  checked,
  onSelect,
  className = "",
  variantStyles,
  sizeStyles,
}) => {
  if (type === "separator") {
    return (
      <DropdownMenu.Separator
        className={`h-px my-1 ${variantStyles?.separator || "bg-border-primary"}`}
      />
    );
  }

  if (type === "label") {
    return (
      <DropdownMenu.Label
        className={`
          ${sizeStyles?.item || "px-3 py-2 text-sm"}
          ${variantStyles?.label || "text-text-secondary"}
          font-medium select-none
          ${className}
        `}
      >
        {children}
      </DropdownMenu.Label>
    );
  }

  const itemClasses = [
    sizeStyles?.item || "px-3 py-2 text-sm rounded-lg",
    "flex items-center justify-between cursor-pointer select-none transition-colors",
    "focus:outline-none",
    disabled
      ? variantStyles?.disabled || "text-text-muted cursor-not-allowed"
      : destructive
        ? variantStyles?.destructive || "text-error hover:bg-error-light"
        : variantStyles?.item || "text-text-primary hover:bg-background-muted",
    className,
  ].join(" ");

  if (type === "checkbox") {
    return (
      <DropdownMenu.CheckboxItem
        className={itemClasses}
        checked={checked}
        onCheckedChange={() => onSelect?.()}
        disabled={disabled}
      >
        <div className="flex items-center space-x-3">
          <DropdownMenu.ItemIndicator>
            <Check className={sizeStyles?.icon || "w-4 h-4"} />
          </DropdownMenu.ItemIndicator>
          {icon && <span className="flex-shrink-0">{icon}</span>}
          <span className="flex-1">{children}</span>
        </div>
        {shortcut && (
          <span
            className={`${sizeStyles?.shortcut || "text-xs"} text-text-muted`}
          >
            {shortcut}
          </span>
        )}
      </DropdownMenu.CheckboxItem>
    );
  }

  if (type === "radio") {
    return (
      <DropdownMenu.RadioItem
        className={itemClasses}
        value={children as string}
        disabled={disabled}
        onSelect={onSelect}
      >
        <div className="flex items-center space-x-3">
          <DropdownMenu.ItemIndicator>
            <Circle
              className={`${sizeStyles?.icon || "w-4 h-4"} fill-current`}
            />
          </DropdownMenu.ItemIndicator>
          {icon && <span className="flex-shrink-0">{icon}</span>}
          <span className="flex-1">{children}</span>
        </div>
        {shortcut && (
          <span
            className={`${sizeStyles?.shortcut || "text-xs"} text-text-muted`}
          >
            {shortcut}
          </span>
        )}
      </DropdownMenu.RadioItem>
    );
  }

  if (type === "submenu") {
    return (
      <DropdownMenu.Sub>
        <DropdownMenu.SubTrigger className={itemClasses} disabled={disabled}>
          <div className="flex items-center space-x-3">
            {icon && <span className="flex-shrink-0">{icon}</span>}
            <span className="flex-1">{children}</span>
          </div>
          <ChevronRight className={sizeStyles?.icon || "w-4 h-4"} />
        </DropdownMenu.SubTrigger>
        <DropdownMenu.Portal>
          <DropdownMenu.SubContent
            className={`
              ${variantStyles?.content || "bg-background-elevated border border-border-primary shadow-lg"}
              ${sizeStyles?.content || "min-w-48 rounded-xl p-2"}
              z-50 animate-in fade-in-0 zoom-in-95 duration-200
            `}
          >
            {/* Submenu content would be passed as children */}
          </DropdownMenu.SubContent>
        </DropdownMenu.Portal>
      </DropdownMenu.Sub>
    );
  }

  return (
    <DropdownMenu.Item
      className={itemClasses}
      onSelect={onSelect}
      disabled={disabled}
    >
      <div className="flex items-center space-x-3">
        {icon && <span className="flex-shrink-0">{icon}</span>}
        <span className="flex-1">{children}</span>
      </div>
      {shortcut && (
        <span
          className={`${sizeStyles?.shortcut || "text-xs"} text-text-muted`}
        >
          {shortcut}
        </span>
      )}
    </DropdownMenu.Item>
  );
};

// ===========================================
// SPECIALIZED DROPDOWN COMPONENTS
// ===========================================

// User Profile Dropdown
export const UserProfileDropdown: React.FC<{
  user: { name: string; email: string; avatar?: string };
  onProfile?: () => void;
  onSettings?: () => void;
  onLogout?: () => void;
  variant?: DropdownVariant;
}> = ({ user, onProfile, onSettings, onLogout, variant = "default" }) => (
  <CustomDropdownMenu
    variant={variant}
    trigger={
      <button className="flex items-center p-2 space-x-2 rounded-lg hover:bg-background-muted">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary">
          <User className="w-4 h-4 text-text-on-primary" />
        </div>
        <span className="text-sm font-medium text-text-primary">
          {user.name}
        </span>
      </button>
    }
  >
    <DropdownItem type="label">{user.email}</DropdownItem>
    <DropdownItem type="separator">{""}</DropdownItem>
    <DropdownItem icon={<User />} onSelect={onProfile}>
      Profile
    </DropdownItem>
    <DropdownItem icon={<Settings />} onSelect={onSettings}>
      Settings
    </DropdownItem>
    <DropdownItem icon={<Shield />}>Security</DropdownItem>
    <DropdownItem type="separator">{""}</DropdownItem>
    <DropdownItem icon={<LogOut />} destructive onSelect={onLogout}>
      Logout
    </DropdownItem>
  </CustomDropdownMenu>
);

// Course Actions Dropdown
export const CourseActionsDropdown: React.FC<{
  courseId: string;
  enrolled?: boolean;
  onEnroll?: () => void;
  onBookmark?: () => void;
  onShare?: () => void;
  onDownload?: () => void;
}> = ({ enrolled, onEnroll, onBookmark, onShare, onDownload }) => (
  <CustomDropdownMenu
    variant="academic"
    trigger={
      <button className="p-2 rounded-lg hover:bg-background-muted">
        <Settings className="w-4 h-4 text-text-primary" />
      </button>
    }
  >
    {!enrolled && (
      <DropdownItem icon={<User />} onSelect={onEnroll}>
        Enroll Course
      </DropdownItem>
    )}
    <DropdownItem icon={<Archive />} onSelect={onBookmark}>
      Bookmark
    </DropdownItem>
    <DropdownItem icon={<Share />} onSelect={onShare}>
      Share Course
    </DropdownItem>
    <DropdownItem icon={<Download />} onSelect={onDownload}>
      Download Materials
    </DropdownItem>
  </CustomDropdownMenu>
);

// Admin Controls Dropdown
export const AdminControlsDropdown: React.FC<{
  onManageUsers?: () => void;
  onManageCourses?: () => void;
  onSystemSettings?: () => void;
  onSecurityLogs?: () => void;
}> = ({ onManageUsers, onManageCourses, onSystemSettings, onSecurityLogs }) => (
  <CustomDropdownMenu
    variant="dark"
    trigger={
      <button className="p-2 rounded-lg text-text-on-primary bg-background-elevated hover:bg-background-muted">
        <Shield className="w-4 h-4" />
      </button>
    }
  >
    <DropdownItem type="label">Admin Controls</DropdownItem>
    <DropdownItem type="separator">{""}</DropdownItem>
    <DropdownItem icon={<User />} onSelect={onManageUsers}>
      Manage Users
    </DropdownItem>
    <DropdownItem icon={<Archive />} onSelect={onManageCourses}>
      Manage Courses
    </DropdownItem>
    <DropdownItem icon={<Settings />} onSelect={onSystemSettings}>
      System Settings
    </DropdownItem>
    <DropdownItem icon={<Eye />} onSelect={onSecurityLogs}>
      Security Logs
    </DropdownItem>
  </CustomDropdownMenu>
);

export { CustomDropdownMenu as DropdownMenu, DropdownItem };
export default CustomDropdownMenu;
