import {
  setStorageDarkMode,
  setStorageHasSeenWelcome,
  setStorageHomeTimeTransition,
  getStorageDarkMode,
  getStorageHasSeenWelcome,
  getStorageHomeTimeTransition,
  setStorageExpensesTimeTransition
} from '../user/data';
import { ActionType } from '../../util/types';
import { Period } from '../../models/Period';

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

const homeTimeTransitionAction = (homeTimeTransition: string) => {
  return ({
    type: 'SET_HOME_TIME_TRANSITON',
    homeTimeTransition
  } as const);
}
const expensesTimeTransitionAction = (expensesTimeTransition: Period) => {
  return ({
    type: 'SET_EXPENSES_TIME_TRANSITON',
    expensesTimeTransition
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

export const setHomeTimeTransition = (homeTimeTransition: string) => async () => {
  await setStorageHomeTimeTransition(homeTimeTransition);
  return homeTimeTransitionAction(homeTimeTransition);
}

export const getHomeTimeTransition = () => async (dispatch: React.Dispatch<any>) => {
  const homeTimeTransition: string = await getStorageHomeTimeTransition();
  dispatch(homeTimeTransitionAction(homeTimeTransition));
}

export const setExpensesTimeTransition = (expensesTimeTransition: Period) => async () => {
  await setStorageExpensesTimeTransition(expensesTimeTransition);
  return expensesTimeTransitionAction(expensesTimeTransition);
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
  | ActionType<typeof setHomeTimeTransition>
  | ActionType<typeof setExpensesTimeTransition>
