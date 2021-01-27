import { Plugins } from '@capacitor/core';
import {
  EXPENSES_TIME_TRANSITION,
  HOME_TIME_TRANSITION,
  TRANSACTIONS_TIME_TRANSITION,
  USER_PROFILE_SERVER
} from '../../constants/Storage';
import { Period } from '../../models/Period';
import { UserProfileServer } from '../../models/UserProfileServer';

const { Storage } = Plugins;

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
export const setStorageTransactionsTimeTransition = async (transactionsTimeTransition: Period) => {
  await Storage.set({ key: TRANSACTIONS_TIME_TRANSITION, value: JSON.stringify(transactionsTimeTransition)});
}
