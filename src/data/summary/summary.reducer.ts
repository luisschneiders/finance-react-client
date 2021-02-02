import { SUMMARY_APP_SET } from '../actionTypes';
import { SummaryActions } from './summary.actions';
import { SummaryState } from './summary.state';

export const summaryReducer = (state: SummaryState, action: SummaryActions) : SummaryState => {
  switch (action.type) {
    case SUMMARY_APP_SET:
      {
        return { ...state, ...action.data };
      }
  }
}
