import { ActionType } from '../../util/types';
import { APP_STORE_RESET } from '../actionTypes';
import { AppState } from './app.state';

export const setResetAppStore = (initialState: AppState) => async (dispatch: React.Dispatch<any>) => {
  return ({
    type: APP_STORE_RESET,
    initialState
  } as const);
};

export type AppActions =
  | ActionType<typeof setResetAppStore>
