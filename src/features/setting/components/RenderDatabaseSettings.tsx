import { Database, Download, RefreshCw, Upload } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { setDatabase } from "@/app/store/slices/settings";

const RenderDatabaseSettings = () => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state) => state.settings);

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-lg shadow-sm bg-background-surface">
        <h3 className="flex items-center mb-4 text-lg font-semibold text-text-primary">
          <Database className="w-5 h-5 mr-2 text-accent" />
          Cấu hình cơ sở dữ liệu
        </h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="block mb-2 text-sm font-medium text-text-secondary">
              Loại database
            </label>
            <select
              value={settings.database.type}
              onChange={(e) => dispatch(setDatabase({ type: e.target.value }))}
              className="w-full px-3 py-2 border rounded-md border-border-primary focus:outline-none focus:ring-2 focus:ring-secondary bg-background-surface text-text-primary"
            >
              <option>MySQL</option>
              <option>PostgreSQL</option>
              <option>MongoDB</option>
              <option>SQLite</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-text-secondary">
              Host
            </label>
            <input
              type="text"
              value={settings.database.host}
              onChange={(e) => dispatch(setDatabase({ host: e.target.value }))}
              className="w-full px-3 py-2 border rounded-md border-border-primary focus:outline-none focus:ring-2 focus:ring-secondary bg-background-surface text-text-primary"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-text-secondary">
              Port
            </label>
            <input
              type="number"
              value={settings.database.port}
              onChange={(e) =>
                dispatch(setDatabase({ port: parseInt(e.target.value) }))
              }
              className="w-full px-3 py-2 border rounded-md border-border-primary focus:outline-none focus:ring-2 focus:ring-secondary bg-background-surface text-text-primary"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-text-secondary">
              Tên database
            </label>
            <input
              type="text"
              value={settings.database.name}
              onChange={(e) => dispatch(setDatabase({ name: e.target.value }))}
              className="w-full px-3 py-2 border rounded-md border-border-primary focus:outline-none focus:ring-2 focus:ring-secondary bg-background-surface text-text-primary"
            />
          </div>
        </div>
      </div>

      <div className="p-6 rounded-lg shadow-sm bg-background-surface">
        <h3 className="mb-4 text-lg font-semibold text-text-primary">
          Sao lưu & Phục hồi
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <button className="flex items-center justify-center p-4 space-x-2 transition-colors rounded-lg text-text-on-primary bg-secondary hover:bg-secondary-dark">
            <Download className="w-4 h-4" />
            <span>Sao lưu ngay</span>
          </button>
          <button className="flex items-center justify-center p-4 space-x-2 transition-colors rounded-lg text-text-on-primary bg-success hover:bg-success-dark">
            <Upload className="w-4 h-4" />
            <span>Phục hồi</span>
          </button>
          <button className="flex items-center justify-center p-4 space-x-2 transition-colors rounded-lg text-text-on-primary bg-accent hover:bg-accent-dark">
            <RefreshCw className="w-4 h-4" />
            <span>Đồng bộ</span>
          </button>
        </div>

        <div className="p-4 mt-4 rounded-lg bg-background-muted">
          <h4 className="mb-2 font-medium text-text-primary">
            Sao lưu tự động
          </h4>
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">
              Sao lưu hàng ngày lúc 2:00 AM
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-background-subtle peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-secondary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenderDatabaseSettings;
