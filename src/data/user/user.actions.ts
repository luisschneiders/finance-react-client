import {
  setStorageDarkMode,
  setStorageHasSeenWelcome,
  getStorageDarkMode,
  getStorageHasSeenWelcome,
} from '../user/data';
import { ActionType } from '../../util/types';
import {
  USER_DARK_MODE_SET,
  USER_DISPLAY_NAME_SET,
  USER_HAS_SEEN_WELCOME_SET,
  USER_IS_LOGGED_IN_SET,
  USER_PHOTO_URL_SET
} from '../actionTypes';
import React from 'react';

const darkModeAction = (darkMode: boolean) => {
  return ({
    type: USER_DARK_MODE_SET,
    darkMode
  } as const);
}

const hasSeenWelcomeAction = (hasSeenWelcome: boolean) => {
  return ({
    type: USER_HAS_SEEN_WELCOME_SET,
    hasSeenWelcome
  } as const);
}

const setIsLoggedInAction = (isLoggedIn: boolean) => {
  return ({
    type: USER_IS_LOGGED_IN_SET,
    isLoggedIn
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

export const setIsLoggedIn = (isLoggedIn: boolean) => async (dispatch: React.Dispatch<any>) => {
  return setIsLoggedInAction(isLoggedIn);
}

export const setDisplayName = (displayName: string | null | undefined) => async (dispatch: React.Dispatch<any>) => {
  return ({
    type: USER_DISPLAY_NAME_SET,
    displayName
  } as const);
}

export const setPhotoURL = (photoURL: string | null | undefined) => async (dispatch: React.Dispatch<any>) => {
  return ({
    type: USER_PHOTO_URL_SET,
    photoURL
  } as const);
}

export type UserActions =
  | ActionType<typeof setIsLoggedIn>
  | ActionType<typeof setDarkMode>
  | ActionType<typeof setDisplayName>
  | ActionType<typeof setPhotoURL>
  | ActionType<typeof setHasSeenWelcome>
