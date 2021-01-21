import { Plugins } from '@capacitor/core';
import { USER_PROFILE_SERVER } from '../../constants/Storage';
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
