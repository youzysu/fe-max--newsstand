import { fetchNewsList, fetchPressList, fetchSubscribePressList } from '@api/index';
import { PRESS_COUNT_OF_GRID_TABLE } from '@constant/index';
import { deepFreeze, shuffleArray } from '@utils/index';
import { NewsStandState, Subscriber } from 'types';
import { Action } from 'types/Action';

const initialState: NewsStandState = {
  systemDate: new Date(),
  trendNewsList: await fetchNewsList(),
  allPressList: shuffleArray(await fetchPressList()),
  leftNewsIndex: 0,
  rightNewsIndex: 1,
  tabOption: 'all',
  viewerOption: 'grid',
  gridPressStartIndex: 0,
  subscribePressList: await fetchSubscribePressList(),
};

const newsStandReducer = (state: NewsStandState, action: Action): NewsStandState => {
  switch (action.type) {
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
      const { currentHeadlineIndex } = action.payload;
      const isLeftRolling = currentHeadlineIndex % 2 === 0;
      const isRightRolling = currentHeadlineIndex % 2 === 1;
      const leftNewsIndex = isLeftRolling ? state.leftNewsIndex + 2 : state.leftNewsIndex;
      const rightNewsIndex = isRightRolling ? state.rightNewsIndex + 2 : state.rightNewsIndex;
      const newState = {
        ...state,
        leftNewsIndex: leftNewsIndex,
        rightNewsIndex: rightNewsIndex,
      };

      return newState;
    }
    case 'SELECT_ALL_TAB': {
      const newState = { ...state, tabOption: 'all' as const };
      return newState;
    }
    case 'SELECT_SUBSCRIBED_TAB': {
      const newState = { ...state, tabOption: 'subscribe' as const };
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
  }
};

const createStore = (
  reducer: (state: NewsStandState, action: Action) => NewsStandState,
  initialState: NewsStandState
) => {
  let _state = initialState;
  const subscribers: Subscriber[] = [];

  const dispatch = (action: Action) => {
    _state = reducer(_state, action);
    subscribers.forEach((subscriber) => subscriber(_state));
  };

  const register = (subscriber: Subscriber) => {
    subscribers.push(subscriber);
  };

  const getState = () => _state;

  return { getState, dispatch, register };
};

export const { getState, dispatch, register } = createStore(
  newsStandReducer,
  deepFreeze(initialState)
);
