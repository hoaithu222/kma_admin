import { useAppDispatch, useAppSelector } from "@/app/store";
import { setNotifications } from "@/app/store/slices/settings";
import { Bell, Mail, Smartphone, Volume2 } from "lucide-react";

const RenderNotificationSettings = () => {
  const settings = useAppSelector((state) => state.settings);
  const dispatch = useAppDispatch();

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-lg shadow-sm bg-background-surface">
        <h3 className="flex items-center mb-4 text-lg font-semibold text-text-primary">
          <Bell className="w-5 h-5 mr-2 text-warning" />
          Cài đặt thông báo
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-background-muted">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-secondary" />
              <div>
                <h4 className="font-medium text-text-primary">Email</h4>
                <p className="text-sm text-text-secondary">
                  Nhận thông báo qua email
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.email}
                onChange={(e) =>
                  dispatch(setNotifications({ email: e.target.checked }))
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-background-subtle peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-secondary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-background-muted">
            <div className="flex items-center space-x-3">
              <Smartphone className="w-5 h-5 text-success" />
              <div>
                <h4 className="font-medium text-text-primary">
                  Push Notification
                </h4>
                <p className="text-sm text-text-secondary">
                  Thông báo đẩy trên thiết bị
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.push}
                onChange={(e) =>
                  dispatch(setNotifications({ push: e.target.checked }))
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-background-subtle peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-secondary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-background-muted">
            <div className="flex items-center space-x-3">
              <Volume2 className="w-5 h-5 text-accent" />
              <div>
                <h4 className="font-medium text-text-primary">Âm thanh</h4>
                <p className="text-sm text-text-secondary">
                  Phát âm thanh khi có thông báo
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.sound}
                onChange={(e) =>
                  dispatch(setNotifications({ sound: e.target.checked }))
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-background-subtle peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-secondary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RenderNotificationSettings;
