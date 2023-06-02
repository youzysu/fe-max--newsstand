import { PressInfo, TrendNews } from 'types';

// TODO: PressName type 만들기
interface SubscribePressAction {
  type: 'CHANGE_PRESS_SUBSCRIBING';
  payload: { pressName: string };
}

interface MoveGridAction {
  type: 'MOVE_GRID';
  payload: { type: 'left' | 'right' };
}

interface RollingNewsAction {
  type: 'ROLLING_NEWS';
  payload: { currentHeadlineIndex: number };
}

interface SelectAllTabAction {
  type: 'SELECT_ALL_TAB';
}

interface SelectListTabAction {
  type: 'SELECT_SUBSCRIBED_TAB';
}

interface SelectGridViewAction {
  type: 'SELECT_GRID_VIEW';
}

interface SelectListViewAction {
  type: 'SELECT_LIST_VIEW';
}

interface FetchNewsListAction {
  type: 'FETCH_NEWS_LIST_SUCCESS';
  payload: { trendNewsList: TrendNews[] };
}

interface FetchPressListAction {
  type: 'FETCH_PRESS_LIST';
  payload: { allPressList: PressInfo[] };
}

interface FetchSubscribePressListAction {
  type: 'FETCH_SUBSCRIBE_PRESS_LIST';
  payload: { subscribePressList: { [key: string]: boolean } };
}

export type Action =
  | FetchSubscribePressListAction
  | FetchPressListAction
  | FetchNewsListAction
  | SubscribePressAction
  | MoveGridAction
  | RollingNewsAction
  | SelectAllTabAction
  | SelectListTabAction
  | SelectGridViewAction
  | SelectListViewAction;
