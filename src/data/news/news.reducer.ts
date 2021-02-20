import { NEWS_SET } from '../actionTypes';
import { NewsActions } from './news.actions';
import { NewsState } from './news.state';

export const newsReducer = (state: NewsState, action: NewsActions): NewsState => {
  switch (action.type) {
    case NEWS_SET:
      return { ...state, ...action.data };
  }
}
