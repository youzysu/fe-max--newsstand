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

interface MoveGridAction {
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

interface SelectGridViewAction {
  type: 'SELECT_GRID_VIEW';
}

interface SelectListViewAction {
  type: 'SELECT_LIST_VIEW';
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

interface SaveSubscribePressListAction {
  type: 'SAVE_SUBSCRIBE_PRESS_LIST';
}

interface MoveListAction {
  type: 'MOVE_LIST';
  payload: PositionType;
}

interface MoveCategoryAction {
  type: 'MOVE_CATEGORY';
  payload: { categoryId: string };
}

interface MoveSubscribePressListAction {
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
  | SaveSubscribePressListAction
  | GetSubscribePressListAction
  | FetchGridPressListAction
  | FetchNewsListAction
  | SubscribePressAction
  | MoveGridAction
  | RollingNewsAction
  | ChangeTabAction
  | SelectGridViewAction
  | SelectListViewAction;
