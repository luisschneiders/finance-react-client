import { UserActions } from './user.actions';
import { UserState } from './user.state';

export function userReducer(state: UserState, action: UserActions): UserState {
  switch(action.type) {
    case 'SET_DARK_MODE':
      return { ...state, darkMode: action.darkMode };
    case 'SET_HAS_SEEN_WELCOME':
        return { ...state, hasSeenWelcome: action.hasSeenWelcome };
    case 'SET_IS_LOGGED_IN':
      return { ...state, isLoggedIn: action.isLoggedIn };
    case 'SET_DISPLAY_NAME':
      return { ...state, displayName: action.displayName };
    case 'SET_PHOTO_URL':
      return { ...state, photoURL: action.photoURL };
    case 'SET_USER_PROFILE_SERVER':
      return { ...state, userProfile: action.userProfileServer };
    case 'SET_HOME_TIME_TRANSITON':
      return { ...state, homeTimeTransition: action.homeTimeTransition };
    case 'SET_EXPENSES_TIME_TRANSITON':
      return { ...state, expensesTimeTransition: action.expensesTimeTransition };
  }
}
