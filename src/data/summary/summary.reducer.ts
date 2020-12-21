import { SummaryActions } from "./summary.actions";
import { SummaryState } from "./summary.state";

export const summaryReducer = (state: SummaryState, action: SummaryActions) : SummaryState => {
  switch (action.type) {
    case 'SET_SUMMARY_DATA':
      {
        return { ...state, ...action.data };
      }
  }
}
