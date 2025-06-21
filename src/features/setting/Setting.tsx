import { useState } from "react";
import {
  Settings,
  User,
  Shield,
  Database,
  Mail,
  Bell,
  Palette,
  Server,
  Save,
} from "lucide-react";

import { useDispatch } from "react-redux";
import { resetSettings } from "@/app/store/slices/settings";
import RenderGeneralSettings from "./components/RenderGeneralSettings";
import RenderSecuritySettings from "./components/RenderSecuritySettings";
import RenderDatabaseSettings from "./components/RenderDatabaseSettings";
import RenderAppearanceSettings from "./components/RenderAppearanceSettings";
import RenderSystemSettings from "./components/RenderSystemSettings";
import RenderNotificationSettings from "./components/RenderNotificationSettings";

const Setting = () => {
  const [activeTab, setActiveTab] = useState("general");
  const dispatch = useDispatch();

  const tabs = [
    { id: "general", name: "Tổng quan", icon: Settings },
    { id: "users", name: "Người dùng", icon: User },
    { id: "security", name: "Bảo mật", icon: Shield },
    { id: "database", name: "Cơ sở dữ liệu", icon: Database },
    { id: "email", name: "Email", icon: Mail },
    { id: "notifications", name: "Thông báo", icon: Bell },
    { id: "appearance", name: "Giao diện", icon: Palette },
    { id: "system", name: "Hệ thống", icon: Server },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "general":
        return <RenderGeneralSettings />;
      case "security":
        return <RenderSecuritySettings />;
      case "database":
        return <RenderDatabaseSettings />;
      case "appearance":
        return <RenderAppearanceSettings />;
      case "notifications":
        return <RenderNotificationSettings />;
      case "system":
        return <RenderSystemSettings />;
      default:
        return <RenderGeneralSettings />;
    }
  };

  return (
    <div className="overflow-auto p-6 min-h-screen bg-background-base hidden-scrollbar">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h2 className="mb-2 text-3xl font-bold text-text-primary">
            Cài đặt hệ thống
          </h2>
          <p className="text-text-secondary">
            Quản lý và cấu hình các tùy chọn hệ thống
          </p>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="p-4 rounded-lg shadow-sm bg-background-surface">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-3 text-left rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? "bg-secondary-light text-secondary border-l-4 border-secondary"
                        : "text-text-secondary hover:bg-background-muted hover:text-text-primary"
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span className="font-medium">{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {renderTabContent()}

            {/* Save Button */}
            <div className="flex justify-end mt-6 space-x-4">
              <button
                onClick={() => dispatch(resetSettings())}
                className="px-6 py-2 rounded-lg border transition-colors text-text-secondary border-border-primary hover:bg-background-muted"
              >
                Hủy bỏ
              </button>
              <button className="flex items-center px-6 py-2 space-x-2 rounded-lg transition-colors text-text-on-primary bg-secondary hover:bg-secondary-dark">
                <Save className="w-4 h-4" />
                <span>Lưu cài đặt</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
