import { createSelector } from 'reselect';
import { AppState } from '../app/app.state';
import { NewsCategory, News } from '../../models/News';
import { groupBy } from '../../util/groupBy';

const getNewsData = (state: AppState) => state.newsReducer.news;

const getIdParam = (_state: AppState, props: any) => {
  return props.match.params['id'];
};

export const getNews = createSelector(
  getNewsData,
  (news: News) => {
    return news;
  }
);

export const getNewsByGroup = createSelector(
  getNewsData,
  (data: NewsCategory[]) => {
    if (!data) {
      return null;
    }

    // Because the original data is not grouped by 'category',
    // we need to do it here.
    const groups: NewsCategory[] = [];
    const customData: any = groupBy(data, 'category');
    Object.keys(customData).forEach((key: string) => {
      groups.push(customData[key]);
    });

    // Assign the new array group to the News
    const news: News = Object.assign({}, {
      groups
    });
    return news;
  }
);

export const getNewsById = createSelector(
  getNewsData, getIdParam,
  (news: NewsCategory[], id: number) => {
    if (news && news.length > 0) {
      return news.find((n: any) => n.id.toString() === id);
    }
  }
);
