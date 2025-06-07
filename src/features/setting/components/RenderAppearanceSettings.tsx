import { Monitor, Sun, Moon, Palette } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { setAppearance } from "@/app/store/slices/settings";
import { toggleTheme } from "@/app/store/slices/theme";

const RenderAppearanceSettings = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme);
  const settings = useAppSelector((state) => state.settings);

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-lg shadow-sm bg-background-surface">
        <h3 className="flex items-center mb-4 text-lg font-semibold text-text-primary">
          <Palette className="w-5 h-5 mr-2 text-accent" />
          Giao diện
        </h3>

        <div className="space-y-6">
          <div>
            <label className="block mb-3 text-sm font-medium text-text-secondary">
              Chủ đề
            </label>
            <div className="grid grid-cols-3 gap-4">
              <div
                onClick={() => dispatch(toggleTheme())}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${theme === "light" ? "border-secondary bg-secondary-light" : "border-border-primary hover:border-border-secondary"}`}
              >
                <div className="flex items-center mb-2 space-x-2">
                  <Sun className="w-4 h-4 text-text-primary" />
                  <span className="font-medium text-text-primary">Sáng</span>
                </div>
                <div className="p-2 border rounded bg-background-surface border-border-primary">
                  <div className="h-2 mb-1 rounded bg-background-muted"></div>
                  <div className="h-2 rounded bg-background-subtle"></div>
                </div>
              </div>

              <div
                onClick={() => dispatch(toggleTheme())}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${theme === "dark" ? "border-secondary bg-secondary-light" : "border-border-primary hover:border-border-secondary"}`}
              >
                <div className="flex items-center mb-2 space-x-2">
                  <Moon className="w-4 h-4 text-text-primary" />
                  <span className="font-medium text-text-primary">Tối</span>
                </div>
                <div className="p-2 border rounded bg-background-elevated border-border-primary">
                  <div className="h-2 mb-1 rounded bg-background-muted"></div>
                  <div className="h-2 rounded bg-background-subtle"></div>
                </div>
              </div>

              <div
                onClick={() => dispatch(toggleTheme())}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${theme === "auto" ? "border-secondary bg-secondary-light" : "border-border-primary hover:border-border-secondary"}`}
              >
                <div className="flex items-center mb-2 space-x-2">
                  <Monitor className="w-4 h-4 text-text-primary" />
                  <span className="font-medium text-text-primary">Tự động</span>
                </div>
                <div className="p-2 border rounded border-border-primary bg-gradient-to-r from-background-surface to-background-elevated">
                  <div className="h-2 mb-1 rounded bg-background-muted"></div>
                  <div className="h-2 rounded bg-background-subtle"></div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block mb-3 text-sm font-medium text-text-secondary">
              Màu chủ đạo
            </label>
            <div className="flex space-x-3">
              {[
                "primary",
                "secondary",
                "accent",
                "success",
                "warning",
                "error",
              ].map((color) => (
                <div
                  key={color}
                  onClick={() =>
                    dispatch(setAppearance({ primaryColor: color }))
                  }
                  className={`w-8 h-8 rounded-full cursor-pointer border-2 border-background-surface shadow-md bg-${color} hover:scale-110 transition-transform ${
                    settings.appearance.primaryColor === color
                      ? "ring-2 ring-secondary"
                      : ""
                  }`}
                ></div>
              ))}
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-text-secondary">
              Kích thước font
            </label>
            <select
              value={settings.appearance.fontSize}
              onChange={(e) =>
                dispatch(setAppearance({ fontSize: e.target.value as any }))
              }
              className="w-full px-3 py-2 border rounded-md border-border-primary focus:outline-none focus:ring-2 focus:ring-secondary bg-background-surface text-text-primary"
            >
              <option value="small">Nhỏ</option>
              <option value="medium">Trung bình</option>
              <option value="large">Lớn</option>
              <option value="xlarge">Rất lớn</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RenderAppearanceSettings;
