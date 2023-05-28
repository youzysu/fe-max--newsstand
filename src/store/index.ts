import { fetchNewsList, fetchPressList } from '../api';
import { Action, NewsStandState, Subscriber } from '../types';

const initialState: NewsStandState = {
  systemDate: new Date(),
  trendNewsList: await fetchNewsList(),
  allPressList: await fetchPressList(),
  newsRollerTick: 0,
  leftNewsIndex: 0,
  rightNewsIndex: 1,
  TabOption: 'all',
  ViewerOption: 'grid',
  gridPressStartIndex: 0,
};

const newsStandReducer = (state: NewsStandState, action: Action) => {
  switch (action.type) {
    case 'ROLLING_NEWS': {
      const newsRollerTick = state.newsRollerTick + 1;
      const isRightRolling = newsRollerTick % 2 === 0;
      const leftNewsIndex = isRightRolling ? state.leftNewsIndex : state.leftNewsIndex + 2;
      const rightNewsIndex = isRightRolling ? state.rightNewsIndex + 2 : state.rightNewsIndex;
      const newState = {
        ...state,
        newsRollerTick: newsRollerTick,
        leftNewsIndex: leftNewsIndex,
        rightNewsIndex: rightNewsIndex,
      };
      return newState;
    }
    case 'SELECT_ALL_TAB': {
      const newState = { ...state, TabOption: 'all' as const };
      return newState;
    }
    case 'SELECT_SUBSCRIBED_TAB': {
      const newState = { ...state, TabOption: 'subscribe' as const };
      return newState;
    }
    case 'SELECT_GRID_VIEW': {
      const newState = { ...state, ViewerOption: 'grid' as const };
      return newState;
    }
    case 'SELECT_LIST_VIEW': {
      const newState = { ...state, ViewerOption: 'list' as const };
      return newState;
    }
    default: {
      throw Error(`Unknown action: ${action.type}`);
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

  const getState = () => initialState;

  return { getState, dispatch, register };
};

export const { getState, dispatch, register } = createStore(
  newsStandReducer,
  Object.freeze(initialState)
);
