import { SummaryActions } from './summary.actions';
import { SummaryState } from './summary.state';

export const summaryReducer = (state: SummaryState, action: SummaryActions) : SummaryState => {
  switch (action.type) {
    case 'SET_APP_SUMMARY':
      {
        return { ...state, ...action.data };
      }
  }
}
