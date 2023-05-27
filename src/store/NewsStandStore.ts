import { fetchNewsList, fetchPressList } from '../api';
import { NewsStandState } from '../types';

export const initialState: NewsStandState = {
  systemDate: new Date(),
  trendNewsList: await fetchNewsList(),
  allPressList: await fetchPressList(),
  leftNewsIndex: 0,
  rightNewsIndex: 0,
  TabOption: 'all',
  ViewerOption: 'grid',
  gridPressStartIndex: 0,
};
