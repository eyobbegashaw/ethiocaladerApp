import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  ThemeColors,
  lightTheme,
  darkTheme,
  FontSizeOption,
  fontScales,
  FontScale,
} from '../theme/colors';
import {
  offlineStorage,
  UserProfile,
  AppSettings,
  FavoriteItem,
} from '../database/storage';
import { translations, SupportedLanguage } from '../i18n/translations';
import { getFullEthiopianDate, EthiopianFullDate } from '../calendar/calendarCore';

export type MainTab = 'home' | 'calendar' | 'spiritual' | 'favorites' | 'profile';
export type SecondaryTool = 'converter' | 'fasting' | 'bahre-hasab' | 'about' | null;

interface AppContextType {
  // Theme
  theme: ThemeColors;
  themeMode: 'light' | 'dark' | 'system';
  isDark: boolean;
  setThemeMode: (mode: 'light' | 'dark' | 'system') => void;

  // Font Size
  fontSize: FontSizeOption;
  fontScale: FontScale;
  setFontSize: (size: FontSizeOption) => void;

  // Language & i18n
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string) => any;

  // User Profile
  profile: UserProfile;
  updateProfile: (updated: Partial<UserProfile>) => void;

  // Favorites
  favorites: FavoriteItem[];
  toggleFavorite: (item: Omit<FavoriteItem, 'id' | 'savedAt'>) => boolean;
  isFavorite: (titleAmharic: string, month: number, day: number) => boolean;
  clearFavorites: () => void;

  // Calendar Date State
  todayEth: EthiopianFullDate;
  refreshDate: () => void;

  // Navigation & Drawer
  activeTab: MainTab;
  setActiveTab: (tab: MainTab) => void;
  secondaryTool: SecondaryTool;
  openSecondaryTool: (tool: SecondaryTool) => void;
  closeSecondaryTool: () => void;
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;

  // Settings
  settings: AppSettings;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
  resetAllPreferences: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AppSettings>(() => offlineStorage.getSettings());
  const [profile, setProfile] = useState<UserProfile>(() => offlineStorage.getProfile());
  const [favorites, setFavorites] = useState<FavoriteItem[]>(() => offlineStorage.getFavorites());
  const [todayEth, setTodayEth] = useState<EthiopianFullDate>(() => getFullEthiopianDate(new Date()));
  const [activeTab, setActiveTab] = useState<MainTab>('home');
  const [secondaryTool, setSecondaryTool] = useState<SecondaryTool>(null);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  // System theme detection
  const [systemIsDark, setSystemIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => setSystemIsDark(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Update date every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setTodayEth(getFullEthiopianDate(new Date()));
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const isDark =
    settings.themeMode === 'dark' ||
    (settings.themeMode === 'system' && systemIsDark);

  const theme = isDark ? darkTheme : lightTheme;
  const fontScale = fontScales[settings.fontSize] || fontScales.medium;
  const language = settings.language;

  const t = (key: string): any => {
    const dict = translations[language] || translations.am;
    const keys = key.split('.');
    let curr: any = dict;
    for (const k of keys) {
      if (curr && typeof curr === 'object' && k in curr) {
        curr = curr[k];
      } else {
        return key;
      }
    }
    return curr;
  };

  const setThemeMode = (mode: 'light' | 'dark' | 'system') => {
    const updated = offlineStorage.saveSettings({ themeMode: mode });
    setSettings(updated);
  };

  const setFontSize = (size: FontSizeOption) => {
    const updated = offlineStorage.saveSettings({ fontSize: size });
    setSettings(updated);
  };

  const setLanguage = (lang: SupportedLanguage) => {
    const updated = offlineStorage.saveSettings({ language: lang });
    setSettings(updated);
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    const newProfile = { ...profile, ...updated };
    offlineStorage.saveProfile(newProfile);
    setProfile(newProfile);
  };

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    const updated = offlineStorage.saveSettings(newSettings);
    setSettings(updated);
  };

  const handleToggleFavorite = (item: Omit<FavoriteItem, 'id' | 'savedAt'>): boolean => {
    const result = offlineStorage.toggleFavorite(item);
    setFavorites(result.list);
    return result.added;
  };

  const handleIsFavorite = (titleAmharic: string, month: number, day: number): boolean => {
    return favorites.some(
      (f) => f.titleAmharic === titleAmharic && f.dateEth.month === month && f.dateEth.day === day
    );
  };

  const clearFavorites = () => {
    offlineStorage.saveFavorites([]);
    setFavorites([]);
  };

  const resetAllPreferences = () => {
    offlineStorage.resetAll();
    setSettings(offlineStorage.getSettings());
    setProfile(offlineStorage.getProfile());
    setFavorites(offlineStorage.getFavorites());
  };

  const refreshDate = () => {
    setTodayEth(getFullEthiopianDate(new Date()));
  };

  const openSecondaryTool = (tool: SecondaryTool) => {
    setSecondaryTool(tool);
    setDrawerOpen(false);
  };

  const closeSecondaryTool = () => {
    setSecondaryTool(null);
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        themeMode: settings.themeMode,
        isDark,
        setThemeMode,
        fontSize: settings.fontSize,
        fontScale,
        setFontSize,
        language,
        setLanguage,
        t,
        profile,
        updateProfile,
        favorites,
        toggleFavorite: handleToggleFavorite,
        isFavorite: handleIsFavorite,
        clearFavorites,
        todayEth,
        refreshDate,
        activeTab,
        setActiveTab,
        secondaryTool,
        openSecondaryTool,
        closeSecondaryTool,
        drawerOpen,
        setDrawerOpen,
        settings,
        updateSettings,
        resetAllPreferences,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
