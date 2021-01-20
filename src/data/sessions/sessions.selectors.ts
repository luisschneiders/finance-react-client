import { createSelector } from 'reselect';
import { AppState } from '../app/app.state';

const getUserProfileServerData = (state: AppState) => state.sessionsReducer.userProfile;

export const getUserProfileServer = createSelector(
  getUserProfileServerData,
  (userProfile: any) => {
    return userProfile;
  }
);