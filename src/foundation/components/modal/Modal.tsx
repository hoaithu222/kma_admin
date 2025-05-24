import React from "react";
import * as Dialog from "@radix-ui/react-dialog";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  description?: string;
  size?: "small" | "medium" | "large" | "xlarge" | "fullscreen";
  position?: "center" | "top" | "bottom";
  showCloseButton?: boolean;
  closeOnBackdropClick?: boolean;
  backdrop?: "dark" | "light" | "blur" | "none";
  animation?: "fade" | "slide" | "scale" | "none";
  className?: string;
  overlayClassName?: string;
  contentClassName?: string;
  headerClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  maxHeight?: string;
  scrollable?: boolean;
  fullHeight?: boolean;
  preventClose?: boolean;
}

const Modal = ({
  children,
  isOpen,
  onOpenChange,
  title,
  description,
  size = "medium",
  className = "",
  showCloseButton = true,
  closeOnBackdropClick = true,
  backdrop = "dark",
  animation = "fade",

  overlayClassName = "z-50",
  contentClassName = "z-50",
  headerClassName = "",
  bodyClassName = "",
  footerClassName = "",
  header,
  footer,
  maxHeight = "90vh",
  scrollable = false,
  fullHeight = false,
  preventClose = false,
}: ModalProps) => {
  // Size classes
  const getSizeClasses = () => {
    switch (size) {
      case "small":
        return "w-full max-w-sm";
      case "medium":
        return "w-full max-w-md";
      case "large":
        return "w-full max-w-2xl";
      case "xlarge":
        return "w-full max-w-4xl";
      case "fullscreen":
        return "w-screen h-screen max-w-none max-h-none rounded-none";
      default:
        return "w-full max-w-md";
    }
  };

  // Position classes
  // const getPositionClasses = () => {
  //   if (size === "fullscreen") return "items-center justify-center";

  //   switch (position) {
  //     case "top":
  //       return "items-start justify-center pt-16";
  //     case "bottom":
  //       return "items-end justify-center pb-16";
  //     case "center":
  //     default:
  //       return "items-center justify-center";
  //   }
  // };

  // Backdrop classes
  const getBackdropClasses = () => {
    const base = "fixed inset-0";
    switch (backdrop) {
      case "light":
        return `${base} bg-background-overlay`;
      case "blur":
        return `${base} bg-modal-overlay backdrop-blur-sm`;
      case "none":
        return `${base} bg-transparent`;
      case "dark":
      default:
        return `${base} bg-modal-overlay`;
    }
  };

  // Animation classes
  const getAnimationClasses = () => {
    const base = "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2";

    switch (animation) {
      case "slide":
        return `${base} data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] duration-200`;
      case "scale":
        return `${base} data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-200`;
      case "none":
        return base;
      case "fade":
      default:
        return `${base} data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-200`;
    }
  };

  const handlePointerDownOutside = (e: Event) => {
    if (!closeOnBackdropClick) {
      e.preventDefault();
    }
  };

  const handleEscapeKeyDown = (e: KeyboardEvent) => {
    if (preventClose) {
      e.preventDefault();
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Overlay
          className={`
            ${getBackdropClasses()}
            ${className}
            data-[state=open]:animate-in data-[state=closed]:animate-out
            data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
            ${overlayClassName}
            outline-none
            overflow-y-auto
          `}
        />

        {/* Content */}
        <Dialog.Content
          className={`
            ${getAnimationClasses()}
            ${getSizeClasses()}
            ${fullHeight && size !== "fullscreen" ? "h-full" : ""}
            bg-modal-bg rounded-lg shadow-xl border border-subtle
            focus:outline-none focus:ring-2 focus:ring-subtle focus:ring-offset-2
            ${size === "fullscreen" ? "" : "p-0"}
            ${contentClassName}
          `}
          style={{
            maxHeight: size !== "fullscreen" ? maxHeight : undefined,
            ...(size === "fullscreen"
              ? {}
              : { transform: "translate(-50%, -50%)" }),
          }}
          onPointerDownOutside={handlePointerDownOutside}
          onEscapeKeyDown={handleEscapeKeyDown}
        >
          {/* Header */}
          {(title || header || showCloseButton) && (
            <div
              className={`
              flex items-center justify-between p-4 border-b border-modal-header-border
              ${size === "fullscreen" ? "px-6 py-4" : ""}
              ${headerClassName}
            `}
            >
              <div className="flex-1 min-w-0">
                {header ? (
                  header
                ) : (
                  <div>
                    {title && (
                      <Dialog.Title className="text-lg font-semibold truncate text-text-primary">
                        {title}
                      </Dialog.Title>
                    )}
                    {description && (
                      <Dialog.Description className="mt-1 text-sm text-text-secondary">
                        {description}
                      </Dialog.Description>
                    )}
                  </div>
                )}
              </div>

              {showCloseButton && (
                <Dialog.Close
                  className="p-1 ml-4 transition-colors rounded-md text-text-muted hover:text-text-primary hover:bg-modal-close-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  aria-label="Close modal"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </Dialog.Close>
              )}
            </div>
          )}

          {/* Body */}
          <div
            className={`
              ${(title || header || showCloseButton) && footer ? "flex-1" : ""}
              ${scrollable ? "overflow-y-auto" : ""}
              ${!title && !header && !showCloseButton && !footer ? "p-4" : "p-4"}
              ${size === "fullscreen" ? "px-6 py-4" : ""}
              ${bodyClassName}
            `}
          >
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div
              className={`
              p-4 border-t border-modal-header-border bg-background-muted
              ${size === "fullscreen" ? "px-6 py-4 rounded-none" : "rounded-b-lg"}
              ${footerClassName}
            `}
            >
              {footer}
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
export default Modal;
