import { Plugins } from '@capacitor/core';
import { UserProfileServer } from '../../models/UserProfileServer';

const { Storage } = Plugins;
const DARK_MODE = 'darkMode';
const HAS_SEEN_WELCOME = 'hasSeenWelcome';
const USER_CREDENTIALS = 'userCredentials';

export const loadUserData = async () => {
  const response: any = await Promise.all([
    Storage.get({ key: DARK_MODE }),
    Storage.get({ key: HAS_SEEN_WELCOME }),
    Storage.get({ key: USER_CREDENTIALS }),
  ]);

  const darkMode = await response[0].value === 'true';
  const hasSeenWelcome = await response[1].value === 'true';
  const userCredentials = await response[2].value;

  const data: any = {
    darkMode,
    hasSeenWelcome,
    userCredentials,
  }

  return data;
}

export const setDarkModeData = async (darkMode: boolean) => {
  await Storage.set({ key: DARK_MODE, value: JSON.stringify(darkMode)});
}

export const setHasSeenWelcomeData = async (hasSeenWelcome: boolean) => {
  await Storage.set({ key: HAS_SEEN_WELCOME, value: JSON.stringify(hasSeenWelcome)});
}

export const setUserCredentialsData = async (data: UserProfileServer) => {
  await Storage.set({ key: USER_CREDENTIALS, value: JSON.stringify(data)});
}
