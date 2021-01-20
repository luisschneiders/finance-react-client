import { SessionsActions } from './sessions.actions';
import { SessionsState } from './sessions.state';

export const sessionsReducer = (state: SessionsState, action: SessionsActions): SessionsState => {
  switch (action.type) {
    case 'SET_MENU_ENABLED': {
      return { ...state, menuEnabled: action.menuEnabled };
    }
    case 'SET_USER_PROFILE_SERVER':
      return { ...state, userProfile: action.userProfileServer };
  }
}
