import { newsStandState } from '.';
import { NewsStandState } from '../types';

interface Action {
  type: string;
}

let state = newsStandState;
const subscribers = [];

function newsStandReducer(state: NewsStandState, action: Action) {
  switch (action.type) {
    case 'ROLLING_LEFT_NEWS': {
      const newState = { ...state, leftNewsIndex: state.leftNewsIndex + 1 };
      return newState;
    }
    case 'ROLLING_RIGHT_NEWS': {
      const newState = { ...state, rightNewsIndex: state.rightNewsIndex + 1 };
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
