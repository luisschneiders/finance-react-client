import { ActionType } from '../../util/types';
import { fetchSummaryData } from './data';

export const setAppSummary = (id: number, year: number) => async (dispatch: React.Dispatch<any>) => {
  const data = await fetchSummaryData(id, year);
  return ({
    type: 'SET_APP_SUMMARY',
    data
  } as const);
}

export type SummaryActions =
  | ActionType<typeof setAppSummary>
