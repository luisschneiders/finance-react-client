import { createSelector } from 'reselect';
import { Period } from '../../models/Period';
import { AppState } from '../app/app.state';

const getUserProfileServerData = (state: AppState) => state.sessionsReducer.userProfile;
const getHomeTimeTransitionData = (state: AppState) => state.sessionsReducer.homeTimeTransition;
const getExpensesTimeTransitionData = (state: AppState) => state.sessionsReducer.expensesTimeTransition;

export const getUserProfileServer = createSelector(
  getUserProfileServerData,
  (userProfile: any) => {
    return userProfile;
  }
);

export const getHomeTimeTransition = createSelector(
  getHomeTimeTransitionData,
  (homeTimeTransition: string) => {
    return homeTimeTransition;
  }
);

export const getExpensesTimeTransition = createSelector(
  getExpensesTimeTransitionData,
  (expensesTimeTransition: Period) => {
    return expensesTimeTransition;
  }
);
