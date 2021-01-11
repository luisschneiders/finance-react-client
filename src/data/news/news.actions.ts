import { ActionType } from '../../util/types';
import { loadNewsData } from './data';
import { NewsState } from './news.state';

export const getNews = () => async (dispatch: React.Dispatch<any>) => {
  const data = await loadNewsData();
  dispatch(setNews(data));
}

export const setNews = (data: Partial<NewsState>) => ({
  type: 'SET_NEWS',
  data
} as const);

export type NewsActions =
  | ActionType<typeof setNews>
