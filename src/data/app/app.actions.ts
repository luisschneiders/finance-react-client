import { ActionType } from '../../util/types';
import { AppState } from './app.state';

export const setResetAppStore = (initialState: AppState) => async (dispatch: React.Dispatch<any>) => {
  return ({
    type: 'SET_RESET_APP_STORE',
    initialState
  } as const);
};

export type AppActions =
  | ActionType<typeof setResetAppStore>
