import { newsStandState } from '.';
import { NewsStandState } from '../types';

interface Action {
  type: string;
  payload: object;
}

let state = newsStandState;
const subscribers = [];

function newsStandReducer(state: NewsStandState, action: Action) {
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
}

export const dispatch = (action: Action) => {
  state = newsStandReducer(state, action);
  subscribers.forEach((subscriber) => subscriber(state));
};

export function register(subscriber) {
  subscribers.push(subscriber);
}
