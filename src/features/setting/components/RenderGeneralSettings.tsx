import { useAppDispatch, useAppSelector } from "@/app/store";
import {
  setLanguage,
  setSystemName,
  setSystemUrl,
  setTimezone,
} from "@/app/store/slices/settings";
import { Cpu, Globe, HardDrive, MemoryStick, Monitor } from "lucide-react";

const RenderGeneralSettings = () => {
  const settings = useAppSelector((state) => state.settings);
  const dispatch = useAppDispatch();

  return (
    <div className="space-y-6 rounded-lg">
      <div className="p-6 rounded-lg shadow-sm bg-background-surface ">
        <h3 className="flex items-center mb-4 text-lg font-semibold text-text-primary">
          <Globe className="w-5 h-5 mr-2 text-secondary" />
          Cài đặt chung
        </h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="block mb-2 text-sm font-medium text-text-secondary">
              Tên hệ thống
            </label>
            <input
              type="text"
              value={settings.systemName}
              onChange={(e) => dispatch(setSystemName(e.target.value))}
              className="w-full px-3 py-2 border rounded-md border-border-primary focus:outline-none focus:ring-2 focus:ring-secondary bg-background-surface text-text-primary"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-text-secondary">
              URL hệ thống
            </label>
            <input
              type="url"
              value={settings.systemUrl}
              onChange={(e) => dispatch(setSystemUrl(e.target.value))}
              className="w-full px-3 py-2 border rounded-md border-border-primary focus:outline-none focus:ring-2 focus:ring-secondary bg-background-surface text-text-primary"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-text-secondary">
              Múi giờ
            </label>
            <select
              value={settings.timezone}
              onChange={(e) => dispatch(setTimezone(e.target.value))}
              className="w-full px-3 py-2 border rounded-md border-border-primary focus:outline-none focus:ring-2 focus:ring-secondary bg-background-surface text-text-primary"
            >
              <option value="Asia/Ho_Chi_Minh">Việt Nam (UTC+7)</option>
              <option value="Asia/Bangkok">Bangkok (UTC+7)</option>
              <option value="Asia/Singapore">Singapore (UTC+8)</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-text-secondary">
              Ngôn ngữ mặc định
            </label>
            <select
              value={settings.language}
              onChange={(e) => dispatch(setLanguage(e.target.value))}
              className="w-full px-3 py-2 border rounded-md border-border-primary focus:outline-none focus:ring-2 focus:ring-secondary bg-background-surface text-text-primary"
            >
              <option value="vi">Tiếng Việt</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
      </div>

      <div className="p-6 rounded-lg shadow-sm bg-background-surface">
        <h3 className="flex items-center mb-4 text-lg font-semibold text-text-primary">
          <Monitor className="w-5 h-5 mr-2 text-success" />
          Hiệu suất hệ thống
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="p-4 rounded-lg bg-secondary-light">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-dark">
                  CPU Usage
                </p>
                <p className="text-2xl font-bold text-secondary">45%</p>
              </div>
              <Cpu className="w-8 h-8 text-secondary" />
            </div>
          </div>
          <div className="p-4 rounded-lg bg-success-light">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-success-dark">Memory</p>
                <p className="text-2xl font-bold text-success">67%</p>
              </div>
              <MemoryStick className="w-8 h-8 text-success" />
            </div>
          </div>
          <div className="p-4 rounded-lg bg-accent-light">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-accent-dark">Storage</p>
                <p className="text-2xl font-bold text-accent">23%</p>
              </div>
              <HardDrive className="w-8 h-8 text-accent" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenderGeneralSettings;
