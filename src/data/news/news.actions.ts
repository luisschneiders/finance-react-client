import { ActionType } from '../../util/types';
import { NEWS_SET } from '../actionTypes';
import { loadNewsData } from './data';
import { NewsState } from './news.state';

const setNewsAction = (data: Partial<NewsState>) => ({
  type: NEWS_SET,
  data
} as const);

export const setNews = () => async (dispatch: React.Dispatch<any>) => {
  const data = await loadNewsData();
  dispatch(setNewsAction(data));
}


export type NewsActions =
  | ActionType<typeof setNewsAction>
