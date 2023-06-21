import {
  CategoryPress,
  PositionType,
  PressArticleInfo,
  PressInfo,
  SubscribePressList,
  TabOption,
  TrendNews,
  ViewerOption,
} from 'types';

interface ChangeViewerAction {
  type: 'CHANGE_VIEWER';
  payload: { viewerOption: ViewerOption };
}

interface SubscribePressAction {
  type: 'CHANGE_PRESS_SUBSCRIBING';
  payload: { pressName: string };
}

export interface MoveGridAction {
  type: 'MOVE_GRID';
  payload: PositionType;
}

interface RollingNewsAction {
  type: 'ROLLING_NEWS';
  payload: PositionType;
}

interface ChangeTabAction {
  type: 'CHANGE_TAB';
  payload: { tabOption: TabOption };
}

interface FetchArticleListAction {
  type: 'FETCH_ARTICLE_LIST_SUCCESS';
  payload: { categoryPressList: CategoryPress[]; pressArticleMap: Map<string, PressArticleInfo> };
}

interface FetchNewsListAction {
  type: 'FETCH_NEWS_LIST_SUCCESS';
  payload: { trendNewsList: TrendNews[] };
}

interface FetchGridPressListAction {
  type: 'FETCH_GRID_PRESS_LIST_SUCCESS';
  payload: { pressIconList: PressInfo[] };
}

interface GetSubscribePressListAction {
  type: 'GET_SUBSCRIBE_PRESS_LIST';
  payload: { subscribePressList: SubscribePressList };
}

export interface MoveListAction {
  type: 'MOVE_LIST';
  payload: PositionType;
}

interface MoveCategoryAction {
  type: 'MOVE_CATEGORY';
  payload: { categoryId: string };
}

export interface MoveSubscribePressListAction {
  type: 'MOVE_SUBSCRIBE_PRESS_LIST';
  payload: PositionType;
}

interface ChangeSubscribePressTabAction {
  type: 'CHANGE_SUBSCRIBE_PRESS_TAB';
  payload: { pressId: string };
}

export type Dispatch = (action: Action) => void;

export type ThunkAction = (dispatch: Dispatch) => void;

export type Action =
  | ChangeSubscribePressTabAction
  | MoveSubscribePressListAction
  | MoveCategoryAction
  | MoveListAction
  | FetchArticleListAction
  | ChangeViewerAction
  | GetSubscribePressListAction
  | FetchGridPressListAction
  | FetchNewsListAction
  | SubscribePressAction
  | MoveGridAction
  | RollingNewsAction
  | ChangeTabAction;

// export interface ActionMap {
//   CHANGE_VIEWER: { viewerOption: ViewerOption };
//   CHANGE_PRESS_SUBSCRIBING: { pressName: string };
//   MOVE_GRID: PositionType;
//   ROLLING_NEWS: PositionType;
//   CHANGE_TAB: { tabOption: TabOption };
//   FETCH_ARTICLE_LIST_SUCCESS: { categoryPressList: CategoryPress[]; pressArticleMap: Map<string, PressArticleInfo> };
//   FETCH_NEWS_LIST_SUCCESS: { trendNewsList: TrendNews[] };
//   FETCH_GRID_PRESS_LIST_SUCCESS: { pressIconList: PressInfo[] };
//   GET_SUBSCRIBE_PRESS_LIST: { subscribePressList: SubscribePressList };
//   MOVE_LIST: PositionType;
//   MOVE_CATEGORY: { categoryId: string };
//   MOVE_SUBSCRIBE_PRESS_LIST: PositionType;
//   CHANGE_SUBSCRIBE_PRESS_TAB: { pressId: string };
// }

// export type Dispatch<T extends keyof ActionMap> = (action: Action<T>) => void;

// export type ThunkAction<T extends keyof ActionMap> = (dispatch: Dispatch<T>) => void;

// export type Action<T extends keyof ActionMap> = { type: T } & { payload: ActionMap[T] };
