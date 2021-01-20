import { UserProfileServer } from '../../models/UserProfileServer';
import { ActionType } from '../../util/types';
import { getStorageUserProfileServer, setStorageUserProfileServer } from '../user/data';

const userProfileServerAction = (userProfileServer: UserProfileServer) => {
  return ({
    type: 'SET_USER_PROFILE_SERVER',
    userProfileServer
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


export type SessionsActions =
  | ActionType<typeof setMenuEnabled>
  | ActionType<typeof setUserProfileServer>
