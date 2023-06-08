import { PRESS_COUNT_OF_GRID_TABLE } from '@constant/index';
import { shuffleArray } from '@utils/index';
import { NewsStandState } from 'types';
import { Action } from 'types/Action';

export const newsStandReducer = (state: NewsStandState, action: Action): NewsStandState => {
  switch (action.type) {
    case 'FETCH_ARTICLE_LIST_SUCCESS': {
      const { categoryPressList } = action.payload;
      const shufflePressList = categoryPressList.map((category) => {
        const shuffled = (category.pressList = shuffleArray(category.pressList));
        return { categoryName: category.categoryName, pressList: shuffled };
      });
      const newState = { ...state, categoryPressList: shufflePressList };
      return newState;
    }
    case 'FETCH_NEWS_LIST_SUCCESS': {
      const { trendNewsList } = action.payload;
      const newState = { ...state, trendNewsList: trendNewsList };
      return newState;
    }
    case 'FETCH_PRESS_LIST_SUCCESS': {
      const { pressIconList } = action.payload;
      const newState = { ...state, pressIconList: shuffleArray(pressIconList) };
      return newState;
    }
    case 'GET_SUBSCRIBE_PRESS_LIST': {
      const { subscribePressList } = action.payload;
      const newState = { ...state, subscribePressList: subscribePressList };
      return newState;
    }
    case 'CHANGE_PRESS_SUBSCRIBING': {
      const { pressName } = action.payload;
      const prevSubscribeState: boolean = state.subscribePressList[pressName];
      const newState = {
        ...state,
        subscribePressList: { ...state.subscribePressList, [pressName]: !prevSubscribeState },
      };
      return newState;
    }
    case 'MOVE_GRID': {
      const { type } = action.payload;
      const nextStartIndex =
        type === 'left'
          ? state.gridPressStartIndex - PRESS_COUNT_OF_GRID_TABLE
          : state.gridPressStartIndex + PRESS_COUNT_OF_GRID_TABLE;
      const newState = { ...state, gridPressStartIndex: nextStartIndex };

      return newState;
    }
    case 'ROLLING_NEWS': {
      const { type } = action.payload;
      const isLeftRolling = type === 'left';
      const isRightRolling = type === 'right';
      const leftNewsIndex = isLeftRolling ? state.leftNewsIndex + 2 : state.leftNewsIndex;
      const rightNewsIndex = isRightRolling ? state.rightNewsIndex + 2 : state.rightNewsIndex;
      const newState = {
        ...state,
        leftNewsIndex: leftNewsIndex % state.trendNewsList.length,
        rightNewsIndex: rightNewsIndex % state.trendNewsList.length,
      };

      return newState;
    }
    case 'CHANGE_TAB': {
      const { tabOption } = action.payload;
      const newState = { ...state, tabOption: tabOption };
      return newState;
    }
    case 'CHANGE_VIEWER': {
      const { viewerOption } = action.payload;
      const newState = { ...state, viewerOption: viewerOption };
      return newState;
    }
    case 'SELECT_GRID_VIEW': {
      const newState = { ...state, viewerOption: 'grid' as const };
      return newState;
    }
    case 'SELECT_LIST_VIEW': {
      const newState = { ...state, viewerOption: 'list' as const };
      return newState;
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};
