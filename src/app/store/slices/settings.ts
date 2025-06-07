import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SettingsState {
  language: string;
  timezone: string;
  systemName: string;
  systemUrl: string;
  notifications: {
    email: boolean;
    push: boolean;
    sound: boolean;
  };
  appearance: {
    fontSize: "small" | "medium" | "large" | "xlarge";
    primaryColor: string;
  };
  security: {
    twoFactor: boolean;
    autoLock: boolean;
    sessionTimeout: number;
  };
  database: {
    type: string;
    host: string;
    port: number;
    name: string;
  };
}

const initialState: SettingsState = {
  language: "vi",
  timezone: "Asia/Ho_Chi_Minh",
  systemName: "Hệ thống quản lý nội dung",
  systemUrl: "https://cms.example.com",
  notifications: {
    email: true,
    push: true,
    sound: true,
  },
  appearance: {
    fontSize: "medium",
    primaryColor: "primary",
  },
  security: {
    twoFactor: false,
    autoLock: true,
    sessionTimeout: 30,
  },
  database: {
    type: "MySQL",
    host: "localhost",
    port: 3306,
    name: "cms_database",
  },
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    setTimezone: (state, action: PayloadAction<string>) => {
      state.timezone = action.payload;
    },
    setSystemName: (state, action: PayloadAction<string>) => {
      state.systemName = action.payload;
    },
    setSystemUrl: (state, action: PayloadAction<string>) => {
      state.systemUrl = action.payload;
    },
    setNotifications: (
      state,
      action: PayloadAction<Partial<SettingsState["notifications"]>>
    ) => {
      state.notifications = { ...state.notifications, ...action.payload };
    },
    setAppearance: (
      state,
      action: PayloadAction<Partial<SettingsState["appearance"]>>
    ) => {
      state.appearance = { ...state.appearance, ...action.payload };
    },
    setSecurity: (
      state,
      action: PayloadAction<Partial<SettingsState["security"]>>
    ) => {
      state.security = { ...state.security, ...action.payload };
    },
    setDatabase: (
      state,
      action: PayloadAction<Partial<SettingsState["database"]>>
    ) => {
      state.database = { ...state.database, ...action.payload };
    },
    resetSettings: (_state) => {
      return initialState;
    },
  },
});

export const {
  setLanguage,
  setTimezone,
  setSystemName,
  setSystemUrl,
  setNotifications,
  setAppearance,
  setSecurity,
  setDatabase,
  resetSettings,
} = settingsSlice.actions;

export default settingsSlice.reducer;
