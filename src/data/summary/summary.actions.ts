import { ActionType } from '../../util/types';
import { loadSummaryData } from './data';
import { SummaryState } from './summary.state';

export const getAppSummary = (id: number, year: number) => async (dispatch: React.Dispatch<any>) => {
  const data = await loadSummaryData(id, year);
  dispatch(setSummaryData(data));
}

export const setSummaryData = (data: Partial<SummaryState>) => ({
  type: 'SET_SUMMARY_DATA',
  data
} as const);

export type SummaryActions =
  | ActionType<typeof setSummaryData>
