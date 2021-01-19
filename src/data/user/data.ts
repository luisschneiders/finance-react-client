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

/**
 * Not in use
 */

// export const getStorageUser = async () => {
//   const response: any = await Promise.all([
//     Storage.get({ key: DARK_MODE }),
//     Storage.get({ key: HAS_SEEN_WELCOME }),
//     Storage.get({ key: USER_PROFILE_SERVER }),
//     Storage.get({ key: HOME_TIME_TRANSITION }),
//   ]);

//   const darkMode = await response[0].value === 'true';
//   const hasSeenWelcome = await response[1].value === 'true';
//   const userProfile = await response[2].value;
//   const homeTimeTransition = await response[3].value;

//   const data: any = {
//     darkMode,
//     hasSeenWelcome,
//     userProfile,
//     homeTimeTransition
//   }

//   return data;
// }

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
  return parseInt(response.value);
}

export const setStorageHomeTimeTransition = async (homeTimeTransition: number) => {
  await Storage.set({ key: HOME_TIME_TRANSITION, value: JSON.stringify(homeTimeTransition)});
}

export const setStorageExpensesTimeTransition = async (expensesTimeTransition: Period) => {
  await Storage.set({ key: EXPENSES_TIME_TRANSITION, value: JSON.stringify(expensesTimeTransition)});
} 
