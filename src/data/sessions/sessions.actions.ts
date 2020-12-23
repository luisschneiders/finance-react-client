import { ActionType } from '../../util/types';

export const setMenuEnabled = (menuEnabled: boolean) => ({
  type: 'SET_MENU_ENABLED',
  menuEnabled
} as const);

export type SessionsActions =
  | ActionType<typeof setMenuEnabled>
