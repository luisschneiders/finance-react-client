import { createSelector } from "reselect";
import { AppState } from "../app/app.state";

const getData = (state: AppState) => state.summaryReducer.summary;

export const getSummary = createSelector(
  getData,
  (summary: any) => {
    return summary;
  }
);