import { fetchNewsList, fetchPressList } from '../api';
import { Action, NewsStandState, Subscriber } from '../types';

const initialState: NewsStandState = {
  systemDate: new Date(),
  trendNewsList: await fetchNewsList(),
  allPressList: await fetchPressList(),
  leftNewsIndex: 0,
  rightNewsIndex: 0,
  TabOption: 'all',
  ViewerOption: 'grid',
  gridPressStartIndex: 0,
};

const newsStandReducer = (state: NewsStandState, action: Action) => {
  switch (action.type) {
    case 'ROLLING_NEWS': {
      const isLeftRolling = action.payload.direction === 'left';
      return isLeftRolling
        ? { ...state, leftNewsIndex: state.leftNewsIndex + 1 }
        : { ...state, rightNewsIndex: state.rightNewsIndex + 1 };
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
  let state = initialState;
  const subscribers: Subscriber[] = [];

  const dispatch = (action: Action) => {
    state = reducer(state, action);
    subscribers.forEach((subscriber) => subscriber(state));
  };

  const register = (subscriber: Subscriber) => {
    subscribers.push(subscriber);
  };

  const getState = () => state;

  return { getState, dispatch, register };
};

export const { getState, dispatch, register } = createStore(
  newsStandReducer,
  Object.freeze(initialState)
);
