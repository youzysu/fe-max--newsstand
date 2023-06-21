import { expect, test } from 'vitest';
import { newsStandReducer } from './../src/store/newsStandReducer';

test('CHANGE_TAB: 전체 언론사는 그리드 보기를 기본으로 한다.', () => {
  const action = { type: 'CHANGE_TAB', payload: { tabOption: 'all' } };
  const prevState = {
    tabOption: null,
    viewerOption: null,
  };
  const newState = {
    tabOption: 'all',
    viewerOption: 'grid',
  };
  expect(newsStandReducer(prevState, action)).toEqual(newState);
});

test('CHANGE_TAB: 내가 구독한 언론사는 리스트 보기를 기본으로 한다.', () => {
  const action = { type: 'CHANGE_TAB', payload: { tabOption: 'subscribe' } };
  const prevState = {
    tabOption: null,
    viewerOption: null,
  };
  const newState = {
    tabOption: 'subscribe',
    viewerOption: 'list',
  };
  expect(newsStandReducer(prevState, action)).toEqual(newState);
});
