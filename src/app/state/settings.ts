import { atom } from 'jotai';

const STORAGE_KEY = 'settings';
export type MessageSpacing = '0' | '100' | '200' | '300' | '400' | '500';
export type MessageLayout = 0 | 1 | 2;

export interface Settings {
  themeIndex: number;
  useSystemTheme: boolean;
  isMarkdown: boolean;
  editorToolbar: boolean;
  twitterEmoji: boolean;

  isPeopleDrawer: boolean;
  memberSortFilterIndex: number;
  enterForNewline: boolean;
  messageLayout: MessageLayout;
  messageSpacing: MessageSpacing;
  hideMembershipEvents: boolean;
  hideNickAvatarEvents: boolean;
  mediaAutoLoad: boolean;
  urlPreview: boolean;
  encUrlPreview: boolean;
  showHiddenEvents: boolean;

  showNotifications: boolean;
  isNotificationSounds: boolean;
}

const defaultSettings: Settings = {
  themeIndex: 0,
  useSystemTheme: true,
  isMarkdown: true,
  editorToolbar: false,
  twitterEmoji: false,

  isPeopleDrawer: true,
  memberSortFilterIndex: 0,
  enterForNewline: false,
  messageLayout: 0,
  messageSpacing: '400',
  hideMembershipEvents: false,
  hideNickAvatarEvents: true,
  mediaAutoLoad: true,
  urlPreview: true,
  encUrlPreview: false,
  showHiddenEvents: false,

  showNotifications: true,
  isNotificationSounds: true,
};

export const getSettings = () => {
  if (typeof window === 'undefined') return {} as Settings;

  const settings = localStorage.getItem(STORAGE_KEY);
  if (settings === null) return defaultSettings;
  return {
    ...defaultSettings,
    ...(JSON.parse(settings) as Settings),
  };
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
