import { createSelector } from 'reselect';
import { AppState } from '../app/app.state';

const getIdParam = (_state: AppState, props: any) => {
  return props.match.params['id'];
};
const getIsLoggedInData = (state: AppState) => state.userReducer.isLoggedIn;
const getHasSeenWelcomeData = (state: AppState) => state.userReducer.hasSeenWelcome;

export const getUserPreference = (state: AppState) => state.userReducer;

export const getFavouriteNewsId = createSelector(
  getUserPreference, getIdParam,
  (usePreference: any, id: string) => {
    if (usePreference.favouriteNews) {
      const news: any[] = JSON.parse(usePreference.favouriteNews);
      return news.find((n: string) => n.toString() === id);
    } else {
      return false
    }
  }
);

export const getIsLoggedIn = createSelector(
  getIsLoggedInData,
  (isLoggedIn: boolean) => {
    return isLoggedIn;
  }
);

export const getHasSeenWelcome = createSelector(
  getHasSeenWelcomeData,
  (hasSeenWelcome: boolean) => {
    return hasSeenWelcome;
  }
);
