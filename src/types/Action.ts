import { PressInfo, TrendNews } from 'types';

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
  payload: { type: 'left' | 'right' };
}

interface ChangeTabAction {
  type: 'CHANGE_TAB';
  payload: { tabOption: 'all' | 'subscribe' };
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
  type: 'FETCH_PRESS_LIST_SUCCESS';
  payload: { allPressList: PressInfo[] };
}

interface GetSubscribePressListAction {
  type: 'GET_SUBSCRIBE_PRESS_LIST';
  payload: { subscribePressList: { [key: string]: boolean } };
}

interface SaveSubscribePressListAction {
  type: 'SAVE_SUBSCRIBE_PRESS_LIST';
}

export type Dispatch = (action: Action) => void;

export type ThunkAction = (dispatch: Dispatch) => void;

export type Action =
  | SaveSubscribePressListAction
  | GetSubscribePressListAction
  | FetchPressListAction
  | FetchNewsListAction
  | SubscribePressAction
  | MoveGridAction
  | RollingNewsAction
  | ChangeTabAction
  | SelectGridViewAction
  | SelectListViewAction;
