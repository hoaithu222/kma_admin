import { RefreshCw, Server, Trash2 } from "lucide-react";

const RenderSystemSettings = () => (
  <div className="space-y-6">
    <div className="p-6 rounded-lg shadow-sm bg-background-surface">
      <h3 className="flex items-center mb-4 text-lg font-semibold text-text-primary">
        <Server className="w-5 h-5 mr-2 text-text-secondary" />
        Thông tin hệ thống
      </h3>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm font-medium text-text-secondary">
              Phiên bản:
            </span>
            <span className="text-sm text-text-primary">v2.1.4</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-medium text-text-secondary">
              Cập nhật cuối:
            </span>
            <span className="text-sm text-text-primary">15/05/2024</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-medium text-text-secondary">
              Uptime:
            </span>
            <span className="text-sm text-success">5 ngày 12 giờ</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm font-medium text-text-secondary">
              PHP Version:
            </span>
            <span className="text-sm text-text-primary">8.2.1</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-medium text-text-secondary">
              MySQL:
            </span>
            <span className="text-sm text-text-primary">8.0.32</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-medium text-text-secondary">
              Server:
            </span>
            <span className="text-sm text-text-primary">Apache/2.4.54</span>
          </div>
        </div>
      </div>
    </div>

    <div className="p-6 rounded-lg shadow-sm bg-background-surface">
      <h3 className="mb-4 text-lg font-semibold text-text-primary">
        Bảo trì hệ thống
      </h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <button className="flex items-center justify-center p-4 space-x-2 transition-colors rounded-lg text-text-on-primary bg-warning hover:bg-warning-dark">
          <RefreshCw className="w-4 h-4" />
          <span>Khởi động lại</span>
        </button>
        <button className="flex items-center justify-center p-4 space-x-2 transition-colors rounded-lg text-text-on-primary bg-error hover:bg-error-dark">
          <Trash2 className="w-4 h-4" />
          <span>Xóa cache</span>
        </button>
      </div>
    </div>
  </div>
);
export default RenderSystemSettings;
