import { createSelector } from 'reselect';
import { AppState } from '../app/app.state';

const getIdParam = (_state: AppState, props: any) => {
  return props.match.params['id'];
};

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
