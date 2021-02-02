import { UserActions } from './user.actions';
import { UserState } from './user.state';
import {
  USER_DARK_MODE_SET,
  USER_DISPLAY_NAME_SET,
  USER_HAS_SEEN_WELCOME_SET,
  USER_IS_LOGGED_IN_SET,
  USER_PHOTO_URL_SET
} from '../actionTypes';

export function userReducer(state: UserState, action: UserActions): UserState {
  switch(action.type) {
    case USER_DARK_MODE_SET:
      return { ...state, darkMode: action.darkMode };
    case USER_HAS_SEEN_WELCOME_SET:
        return { ...state, hasSeenWelcome: action.hasSeenWelcome };
    case USER_IS_LOGGED_IN_SET:
      return { ...state, isLoggedIn: action.isLoggedIn };
    case USER_DISPLAY_NAME_SET:
      return { ...state, displayName: action.displayName };
    case USER_PHOTO_URL_SET:
      return { ...state, photoURL: action.photoURL };
  }
}
