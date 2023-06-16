import { atom } from 'jotai';

const STORAGE_KEY = 'settings';
export interface Settings {
  themeIndex: number;
  useSystemTheme: boolean;
  isMarkdown: boolean;
  editorToolbar: boolean;
  isPeopleDrawer: boolean;

  hideMembershipEvents: boolean;
  hideNickAvatarEvents: boolean;

  showNotifications: boolean;
  isNotificationSounds: boolean;
}

const defaultSettings: Settings = {
  themeIndex: 0,
  useSystemTheme: true,
  isMarkdown: true,
  editorToolbar: false,
  isPeopleDrawer: true,

  hideMembershipEvents: false,
  hideNickAvatarEvents: true,

  showNotifications: true,
  isNotificationSounds: true,
};

export const getSettings = () => {
  if (typeof window === 'undefined') return {} as Settings;

  const settings = localStorage.getItem(STORAGE_KEY);
  if (settings === null) return defaultSettings;
  return JSON.parse(settings) as Settings;
};

export const setSettings = (settings: Settings) => {
  if (typeof window === 'undefined') return;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
};

const baseSettings = atom<Settings>(getSettings());
export const settingsAtom = atom<Settings, Settings>(
  (get) => get(baseSettings),
  (get, set, update) => {
    set(baseSettings, update);
    setSettings(update);
  }
);
