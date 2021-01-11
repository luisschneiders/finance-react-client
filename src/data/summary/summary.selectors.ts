import { createSelector } from 'reselect';
import { AppState } from '../app/app.state';

const getSummaryData = (state: AppState) => state.summaryReducer.summary;

export const getSummary = createSelector(
  getSummaryData,
  (summary: any) => {
    return summary;
  }
);