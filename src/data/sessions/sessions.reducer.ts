import { SessionsActions } from './sessions.actions';
import { SessionsState } from './sessions.state';
import {
  SESSION_EXPENSES_TIME_TRANSITON_SET,
  SESSION_HOME_TIME_TRANSITON_SET,
  SESSION_MENU_ENABLED_SET,
  SESSION_TRANSACTIONS_TIME_TRANSITON_SET,
  SESSION_USER_PROFILE_SERVER_SET
} from '../actionTypes';

export const sessionsReducer = (state: SessionsState, action: SessionsActions): SessionsState => {
  switch (action.type) {
    case SESSION_MENU_ENABLED_SET:
      return { ...state, menuEnabled: action.menuEnabled };
    case SESSION_USER_PROFILE_SERVER_SET:
      return { ...state, userProfile: action.userProfileServer };
    case SESSION_HOME_TIME_TRANSITON_SET:
      return { ...state, homeTimeTransition: action.homeTimeTransition };
    case SESSION_EXPENSES_TIME_TRANSITON_SET:
      return { ...state, expensesTimeTransition: action.expensesTimeTransition };
    case SESSION_TRANSACTIONS_TIME_TRANSITON_SET:
      return { ...state, transactionsTimeTransition: action.transactionsTimeTransition };
  }
}
