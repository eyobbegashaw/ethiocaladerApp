export interface UserProfile {
  name: string;
  baptismalName: string;
  avatarInitials: string;
  bio: string;
  parish: string;
}

export interface FavoriteItem {
  id: string;
  type: 'feast' | 'saint' | 'reading' | 'date';
  titleAmharic: string;
  titleEnglish: string;
  description?: string;
  dateEth: { month: number; day: number; year?: number };
  savedAt: string;
  note?: string;
}

export interface AppSettings {
  language: 'am' | 'en';
  themeMode: 'light' | 'dark' | 'system';
  fontSize: 'small' | 'medium' | 'large' | 'xlarge';
  showGeezNumerals: boolean;
  fastingNotifications: boolean;
  saintCommemorations: boolean;
}

const STORAGE_KEYS = {
  PROFILE: 'eotc_user_profile',
  SETTINGS: 'eotc_app_settings',
  FAVORITES: 'eotc_favorites',
};

const defaultProfile: UserProfile = {
  name: 'Eyob Begashaw',
  baptismalName: 'ወልደ ገብርኤል',
  avatarInitials: 'EB',
  bio: 'Orthodox Tewahedo faithful & developer',
  parish: 'Holy Trinity / ቅድስት ሥላሴ',
};

const defaultSettings: AppSettings = {
  language: 'am',
  themeMode: 'system',
  fontSize: 'medium',
  showGeezNumerals: true,
  fastingNotifications: true,
  saintCommemorations: true,
};

// Safe offline storage that works seamlessly on Web, React Native, and mobile
export const offlineStorage = {
  getProfile: (): UserProfile => {
    try {
      const data = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEYS.PROFILE) : null;
      return data ? { ...defaultProfile, ...JSON.parse(data) } : defaultProfile;
    } catch {
      return defaultProfile;
    }
  },

  saveProfile: (profile: UserProfile): void => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
      }
    } catch (e) {
      console.warn('Error saving profile offline:', e);
    }
  },

  getSettings: (): AppSettings => {
    try {
      const data = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEYS.SETTINGS) : null;
      return data ? { ...defaultSettings, ...JSON.parse(data) } : defaultSettings;
    } catch {
      return defaultSettings;
    }
  },

  saveSettings: (settings: Partial<AppSettings>): AppSettings => {
    try {
      const current = offlineStorage.getSettings();
      const updated = { ...current, ...settings };
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
      }
      return updated;
    } catch {
      return defaultSettings;
    }
  },

  getFavorites: (): FavoriteItem[] => {
    try {
      const data = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEYS.FAVORITES) : null;
      if (data) return JSON.parse(data);
      // Bundled default sample favorites
      return [
        {
          id: 'fav-1',
          type: 'feast',
          titleAmharic: 'መስቀል',
          titleEnglish: 'Finding of the True Cross',
          description: 'የክቡር መስቀል መታሰቢያ በዓል',
          dateEth: { month: 1, day: 17 },
          savedAt: new Date().toISOString(),
          note: 'Annual celebration with Demera',
        },
        {
          id: 'fav-2',
          type: 'saint',
          titleAmharic: 'ቅድስት ድንግል ማርያም',
          titleEnglish: 'Saint Virgin Mary',
          description: 'የእመቤታችን የቅድስት ድንግል ማርያም ወርሃዊ መታሰቢያ',
          dateEth: { month: 1, day: 21 },
          savedAt: new Date().toISOString(),
          note: '21st of every Ethiopian month',
        },
      ];
    } catch {
      return [];
    }
  },

  saveFavorites: (favorites: FavoriteItem[]): void => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
      }
    } catch (e) {
      console.warn('Error saving favorites offline:', e);
    }
  },

  toggleFavorite: (item: Omit<FavoriteItem, 'id' | 'savedAt'>): { added: boolean; list: FavoriteItem[] } => {
    const list = offlineStorage.getFavorites();
    const existingIndex = list.findIndex(
      (f) =>
        f.titleAmharic === item.titleAmharic &&
        f.dateEth.month === item.dateEth.month &&
        f.dateEth.day === item.dateEth.day
    );

    let updated: FavoriteItem[];
    let added = false;
    if (existingIndex >= 0) {
      updated = list.filter((_, i) => i !== existingIndex);
    } else {
      const newItem: FavoriteItem = {
        ...item,
        id: `fav-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        savedAt: new Date().toISOString(),
      };
      updated = [newItem, ...list];
      added = true;
    }
    offlineStorage.saveFavorites(updated);
    return { added, list: updated };
  },

  isFavorite: (titleAmharic: string, month: number, day: number): boolean => {
    const list = offlineStorage.getFavorites();
    return list.some(
      (f) => f.titleAmharic === titleAmharic && f.dateEth.month === month && f.dateEth.day === day
    );
  },

  resetAll: (): void => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(STORAGE_KEYS.PROFILE);
        localStorage.removeItem(STORAGE_KEYS.SETTINGS);
        localStorage.removeItem(STORAGE_KEYS.FAVORITES);
      }
    } catch (e) {
      console.warn('Reset error:', e);
    }
  },
};
