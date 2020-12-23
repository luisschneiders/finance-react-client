import { SessionsActions } from './sessions.actions';
import { SessionsState } from './sessions.state';

export const sessionsReducer = (state: SessionsState, action: SessionsActions): SessionsState => {
  switch (action.type) {
    case 'SET_MENU_ENABLED': {
      return { ...state, menuEnabled: action.menuEnabled };
    }
  }
}
