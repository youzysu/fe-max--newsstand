import { PRESS_COUNT_OF_GRID_TABLE } from '@constant/index';
import { shuffleArray } from '@utils/index';
import { NewsStandState } from 'types';
import { Action } from 'types/Action';
import { getNextCategoryPress, getPrevCategoryPress } from './utils';

export const newsStandReducer = (state: NewsStandState, action: Action): NewsStandState => {
  switch (action.type) {
    case 'MOVE_SUBSCRIBE_PRESS_LIST': {
      const { type } = action.payload;
      const isRightMoving = type === 'right';
      const nextSubscribePressIndex = isRightMoving
        ? state.currentSubscribedPressIndex + 1
        : state.currentSubscribedPressIndex - 1;
      const newState = {
        ...state,
        currentSubscribedPressIndex:
          nextSubscribePressIndex < 0
            ? state.subscribePressList.length - 1
            : nextSubscribePressIndex % state.subscribePressList.length,
      };
      return newState;
    }
    case 'FETCH_ARTICLE_LIST_SUCCESS': {
      const { categoryPressList, pressArticleMap } = action.payload;
      const shufflePressList = categoryPressList.map((category) => {
        const shuffled = (category.pressList = shuffleArray(category.pressList));
        return { categoryName: category.categoryName, pressList: shuffled };
      });
      const newState = { ...state, categoryPressList: shufflePressList, pressArticleMap: pressArticleMap };
      return newState;
    }
    case 'FETCH_NEWS_LIST_SUCCESS': {
      const { trendNewsList } = action.payload;
      const newState = { ...state, trendNewsList: trendNewsList };
      return newState;
    }
    case 'FETCH_GRID_PRESS_LIST_SUCCESS': {
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
      if (!pressName) {
        return state;
      }
      const prevSubscribeState: boolean = state.subscribePressList.includes(pressName);
      const updatedSubscribeState = prevSubscribeState
        ? state.subscribePressList.filter((name) => name !== pressName)
        : [...state.subscribePressList, pressName];
      const newState = {
        ...state,
        subscribePressList: [...updatedSubscribeState],
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
    // Refactor: 아래 둘 합치기
    case 'CHANGE_SUBSCRIBE_PRESS_TAB': {
      const { pressId } = action.payload;
      const newState = { ...state, tabOption: 'subscribe' as const, currentSubscribedPressIndex: Number(pressId) };
      return newState;
    }
    case 'MOVE_CATEGORY': {
      const { categoryId } = action.payload;
      const nextCategoryPress = { categoryIndex: Number(categoryId), pressIndex: 0 };
      const newState = { ...state, currentCategoryPress: nextCategoryPress };

      return newState;
    }
    case 'MOVE_LIST': {
      const { type } = action.payload;
      switch (type) {
        case 'right': {
          const { currentCategoryPress, categoryPressList } = state;
          const nextCategoryPress = getNextCategoryPress(currentCategoryPress, categoryPressList);

          const newState = { ...state, currentCategoryPress: nextCategoryPress };
          return newState;
        }
        case 'left': {
          const { currentCategoryPress, categoryPressList } = state;
          const prevCategoryPress = getPrevCategoryPress(currentCategoryPress, categoryPressList);

          const newState = { ...state, currentCategoryPress: prevCategoryPress };
          return newState;
        }
      }
      break;
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
      const viewerOption = tabOption === 'all' ? ('grid' as const) : ('list' as const);
      const newState = { ...state, tabOption: tabOption, viewerOption: viewerOption };
      return newState;
    }
    case 'CHANGE_VIEWER': {
      const { viewerOption } = action.payload;
      const newState = { ...state, viewerOption: viewerOption };
      return newState;
    }
    // default: {
    //   throw new Error(`Unhandled action type: ${action.type}`);
    // }
  }
};
