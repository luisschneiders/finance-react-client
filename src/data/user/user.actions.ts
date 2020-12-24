import {
  setStorageDarkMode,
  getStorageUser,
  setStorageHasSeenWelcome,
  setStorageUserProfileServer
} from '../user/data';
import { ActionType } from '../../util/types';
import { UserState } from './user.state';
import { UserProfileServer } from '../../models/UserProfileServer';

export const setUserProfileServer = (data: UserProfileServer) => async (dispatch: React.Dispatch<any>) => {
  await setStorageUserProfileServer(data);
  return ({
    type: 'SET_USER_PROFILE_SERVER',
    data
  } as const);
}

export const setIsLoggedIn = (isLoggedin: boolean) => async (dispatch: React.Dispatch<any>) => {
  return ({
    type: 'SET_IS_LOGGEDIN',
    isLoggedin
  } as const);
}

export const setDarkMode = (darkMode: boolean) => async (dispatch: React.Dispatch<any>) => {
  await setStorageDarkMode(darkMode)
  return ({
   type: 'SET_DARK_MODE',
   darkMode
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

export const setHasSeenWelcome = (hasSeenWelcome: boolean) => async (dispatch: React.Dispatch<any>) => {
  await setStorageHasSeenWelcome(hasSeenWelcome);
  return ({
    type: 'SET_HAS_SEEN_WELCOME',
    hasSeenWelcome
  } as const);
}

export const getUserPreference = () => async (dispatch: React.Dispatch<any>) => {
  const data = await getStorageUser();
  dispatch(setUserPreference(data));
}

export const setUserPreference = (data: Partial<UserState>) => ({
  type: 'SET_USER_PREFERENCE',
  data
} as const);

export type UserActions =
  | ActionType<typeof setUserProfileServer>
  | ActionType<typeof setIsLoggedIn>
  | ActionType<typeof setDarkMode>
  | ActionType<typeof setDisplayName>
  | ActionType<typeof setPhotoURL>
  | ActionType<typeof setHasSeenWelcome>
  | ActionType<typeof setUserPreference>
