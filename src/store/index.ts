import { NewsStandState, Subscriber } from 'types';
import { Action, Dispatch, ThunkAction } from 'types/Action';
import { newsStandReducer } from './newsStandReducer';

const initialState: NewsStandState = {
  systemDate: new Date(),
  trendNewsList: [],
  pressIconList: [],
  leftNewsIndex: 0,
  rightNewsIndex: 1,
  tabOption: 'all',
  viewerOption: 'grid',
  gridPressStartIndex: 0,
  categoryPressList: [],
  pressArticleMap: new Map(),
  currentCategoryPress: {
    categoryIndex: 0,
    pressIndex: 0,
  },
  subscribePressList: [],
  currentSubscribedPressIndex: 0,
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

  const thunk = (next: Dispatch) => (action: Action | ThunkAction) => {
    if (typeof action === 'function') {
      return action(next);
    }
    return next(action);
  };

  const thunkDispatch = thunk(dispatch);

  return { getState, register, dispatch: thunkDispatch };
};

export const { getState, dispatch, register } = createStore(newsStandReducer, Object.freeze(initialState));
