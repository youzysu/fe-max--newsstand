import { fetchNewsList, fetchPressList } from '../api';
import { NewsStandState } from '../types';
import { chunkPress } from '../utils/chunk';

const allPressList = await fetchPressList();

export const initialState: NewsStandState = {
  systemDate: new Date(),
  trendNewsList: await fetchNewsList(),
  allPressList: allPressList,
  leftNewsIndex: 0,
  rightNewsIndex: 0,
  TabOption: 'all',
  ViewerOption: 'grid',
  gridViewerPress: chunkPress(allPressList),
  gridPageIndex: 0,
};
