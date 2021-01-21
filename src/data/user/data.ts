import { Plugins } from '@capacitor/core';
import {
  DARK_MODE,
  HAS_SEEN_WELCOME,
} from '../../constants/Storage';

const { Storage } = Plugins;

export const getStorageDarkMode = async () => {
  const response: any = await Storage.get({ key: DARK_MODE });
  return response.value === 'true';
}

export const setStorageDarkMode = async (darkMode: boolean) => {
  await Storage.set({ key: DARK_MODE, value: JSON.stringify(darkMode)});
}

export const getStorageHasSeenWelcome = async () => {
  const response: any = await Storage.get({ key: HAS_SEEN_WELCOME });
  return response.value === 'true';
}

export const setStorageHasSeenWelcome = async (hasSeenWelcome: boolean) => {
  await Storage.set({ key: HAS_SEEN_WELCOME, value: JSON.stringify(hasSeenWelcome)});
}
