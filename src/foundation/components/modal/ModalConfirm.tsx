interface ModalConfirmProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  type?: "default" | "danger" | "warning" | "success";
  loading?: boolean;
}
const ModalConfirm = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Xác nhận",
  message = "Bạn có chắc chắn muốn thực hiện hành động này?",
  confirmText = "Xác nhận",
  cancelText = "Hủy",
  type = "default", // default, danger, warning, success
  loading = false,
}: ModalConfirmProps) => {
  if (!isOpen) return null;

  const getTypeStyles = () => {
    switch (type) {
      case "danger":
        return {
          confirmBtn: "bg-error hover:bg-button-danger-hover focus:ring-error",
          icon: "⚠️",
        };
      case "warning":
        return {
          confirmBtn: "bg-warning hover:bg-accent-dark focus:ring-warning",
          icon: "⚠️",
        };
      case "success":
        return {
          confirmBtn: "bg-success hover:bg-success focus:ring-success",
          icon: "✅",
        };
      default:
        return {
          confirmBtn: "bg-primary hover:bg-primary-dark focus:ring-primary",
          icon: "❓",
        };
    }
  };

  const typeStyles = getTypeStyles();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="fixed inset-0 transition-opacity bg-modal-overlay"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md mx-4 transition-all transform rounded-lg bg-modal-bg shadow-modal-shadow">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-modal-header-border">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{typeStyles.icon}</span>
            <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="transition-colors text-text-muted hover:text-text-primary"
          >
            <svg
              className="w-6 h-6"
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
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="leading-relaxed text-text-secondary">{message}</p>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 space-x-3 border-t border-modal-header-border">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 text-sm font-medium transition-colors border rounded-md text-text-primary bg-button-ghost-bg border-border-primary hover:bg-button-ghost-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`px-4 py-2 text-sm font-medium text-text-on-primary rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${typeStyles.confirmBtn}`}
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <svg
                  className="w-4 h-4 text-text-on-primary animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Đang xử lý...</span>
              </div>
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirm;
