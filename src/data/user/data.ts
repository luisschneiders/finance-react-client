import { Plugins } from '@capacitor/core';
import {
  DARK_MODE,
  HAS_SEEN_WELCOME,
  USER_PROFILE_SERVER,
  HOME_TIME_TRANSITION,
  EXPENSES_TIME_TRANSITION
} from '../../constants/Storage';
import { Period } from '../../models/Period';
import { UserProfileServer } from '../../models/UserProfileServer';

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

export const getStorageUserProfileServer = async () => {
  const response: any  = await Storage.get({ key: USER_PROFILE_SERVER });
  const responseObj: any = JSON.parse(response.value);
  return responseObj;
}

export const setStorageUserProfileServer = async (data: UserProfileServer) => {
  await Storage.set({ key: USER_PROFILE_SERVER, value: JSON.stringify(data)});
}

export const getStorageHomeTimeTransition = async () => {
  const response: any = await Storage.get({ key: HOME_TIME_TRANSITION });
  return response.value;
}

export const setStorageHomeTimeTransition = async (homeTimeTransition: string) => {
  await Storage.set({ key: HOME_TIME_TRANSITION, value: JSON.stringify(homeTimeTransition)});
}

export const setStorageExpensesTimeTransition = async (expensesTimeTransition: Period) => {
  await Storage.set({ key: EXPENSES_TIME_TRANSITION, value: JSON.stringify(expensesTimeTransition)});
} 
