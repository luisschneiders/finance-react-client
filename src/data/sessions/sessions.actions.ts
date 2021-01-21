import { Period } from '../../models/Period';
import { UserProfileServer } from '../../models/UserProfileServer';
import { ActionType } from '../../util/types';
import {
  getStorageHomeTimeTransition,
  getStorageUserProfileServer,
  setStorageExpensesTimeTransition,
  setStorageHomeTimeTransition,
  setStorageUserProfileServer
} from '../sessions/data';

const userProfileServerAction = (userProfileServer: UserProfileServer) => {
  return ({
    type: 'SET_USER_PROFILE_SERVER',
    userProfileServer
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

export const setMenuEnabled = (menuEnabled: boolean) => ({
  type: 'SET_MENU_ENABLED',
  menuEnabled
} as const);

export const setUserProfileServer = (userProfileServer: UserProfileServer) => async () => {
  await setStorageUserProfileServer(userProfileServer);
  return userProfileServerAction(userProfileServer);
}

export const getUserProfileServer = () => async (dispatch: React.Dispatch<any>) => {
  const userProfileServer: UserProfileServer = await getStorageUserProfileServer();
  dispatch(userProfileServerAction(userProfileServer));
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


export type SessionsActions =
  | ActionType<typeof setMenuEnabled>
  | ActionType<typeof setUserProfileServer>
  | ActionType<typeof setHomeTimeTransition>
  | ActionType<typeof setExpensesTimeTransition>
