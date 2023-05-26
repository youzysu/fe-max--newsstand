import { fetchNewsList } from '../api';
import { NewsStandState } from '../types';

export const initialState: NewsStandState = {
  systemDate: new Date(),
  trendNewsList: await fetchNewsList(),
  leftNewsIndex: 0,
  rightNewsIndex: 0,
  TabOption: 'all',
  ViewerOption: 'grid',
};
