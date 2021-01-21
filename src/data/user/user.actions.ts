import {
  setStorageDarkMode,
  setStorageHasSeenWelcome,
  getStorageDarkMode,
  getStorageHasSeenWelcome,
} from '../user/data';
import { ActionType } from '../../util/types';

const darkModeAction = (darkMode: boolean) => {
  return ({
    type: 'SET_DARK_MODE',
    darkMode
  } as const);
}

const hasSeenWelcomeAction = (hasSeenWelcome: boolean) => {
  return ({
    type: 'SET_HAS_SEEN_WELCOME',
    hasSeenWelcome
  } as const);
}

export const setDarkMode = (darkMode: boolean) => async () => {
  await setStorageDarkMode(darkMode);
  return darkModeAction(darkMode);
}

export const getDarkMode = () => async (dispatch: React.Dispatch<any>) => {
  const darkMode: boolean = await getStorageDarkMode();
  dispatch(darkModeAction(darkMode));
}

export const setHasSeenWelcome = (hasSeenWelcome: boolean) => async () => {
  await setStorageHasSeenWelcome(hasSeenWelcome);
  return hasSeenWelcomeAction(hasSeenWelcome);
}

export const getHasSeenWelcome = () => async (dispatch: React.Dispatch<any>) => {
  const hasSeenWelcome: boolean = await getStorageHasSeenWelcome();
  dispatch(hasSeenWelcomeAction(hasSeenWelcome));
}

export const setIsLoggedIn = (isLoggedIn: boolean) => async () => {
  return ({
    type: 'SET_IS_LOGGED_IN',
    isLoggedIn
  } as const);
}

export const setDisplayName = (displayName: string | null | undefined) => async (dispatch: React.Dispatch<any>) => {
  return ({
    type: 'SET_DISPLAY_NAME',
    displayName
  } as const);
}

export const setPhotoURL = (photoURL: string | null | undefined) => async (dispatch: React.Dispatch<any>) => {
  return ({
    type: 'SET_PHOTO_URL',
    photoURL
  } as const);
}

export type UserActions =
  | ActionType<typeof setIsLoggedIn>
  | ActionType<typeof setDarkMode>
  | ActionType<typeof setDisplayName>
  | ActionType<typeof setPhotoURL>
  | ActionType<typeof setHasSeenWelcome>
