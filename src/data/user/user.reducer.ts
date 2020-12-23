import { UserActions } from "./user.actions";
import { UserState } from "./user.state";

export function userReducer(state: UserState, action: UserActions): UserState {
  switch(action.type) {
    case 'SET_DARK_MODE':
      return { ...state, darkMode: action.darkMode };
    case 'SET_HAS_SEEN_WELCOME':
        return { ...state, hasSeenWelcome: action.hasSeenWelcome };
    case 'SET_IS_LOGGEDIN':
      return { ...state, isLoggedin: action.loggedIn };
    case 'SET_DISPLAY_NAME':
      return { ...state, displayName: action.displayName };
    case 'SET_PHOTO_URL':
      return { ...state, photoURL: action.photoURL };
    case 'SET_USER_PREFERENCE':
      return { ...state, ...action.data };
    case 'SET_USER_PROFILE_SERVER':
      return { ...state, ...action.data };
  }
}
