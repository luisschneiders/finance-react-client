import { ActionType } from '../../util/types';
import { SUMMARY_APP_SET } from '../actionTypes';
import { fetchSummaryData } from './data';

export const setAppSummary = (id: number, year: number) => async (dispatch: React.Dispatch<any>) => {
  const data = await fetchSummaryData(id, year);
  return ({
    type: SUMMARY_APP_SET,
    data
  } as const);
}

export type SummaryActions =
  | ActionType<typeof setAppSummary>
