import { Plugins } from '@capacitor/core';
import { UserProfileServer } from '../../models/UserProfileServer';

const { Storage } = Plugins;
const DARK_MODE = 'darkMode';
const HAS_SEEN_WELCOME = 'hasSeenWelcome';
const USER_CREDENTIALS = 'userProfile';

export const getStorageUser = async () => {
  const response: any = await Promise.all([
    Storage.get({ key: DARK_MODE }),
    Storage.get({ key: HAS_SEEN_WELCOME }),
    Storage.get({ key: USER_CREDENTIALS }),
  ]);

  const darkMode = await response[0].value === 'true';
  const hasSeenWelcome = await response[1].value === 'true';
  const userProfile = await response[2].value;

  const data: any = {
    darkMode,
    hasSeenWelcome,
    userProfile,
  }

  return data;
}

export const setStorageDarkMode = async (darkMode: boolean) => {
  await Storage.set({ key: DARK_MODE, value: JSON.stringify(darkMode)});
}

export const setStorageHasSeenWelcome = async (hasSeenWelcome: boolean) => {
  await Storage.set({ key: HAS_SEEN_WELCOME, value: JSON.stringify(hasSeenWelcome)});
}

export const setStorageUserProfileServer = async (data: UserProfileServer) => {
  await Storage.set({ key: USER_CREDENTIALS, value: JSON.stringify(data)});
}
