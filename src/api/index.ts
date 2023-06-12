import { CategoryPress, PressArticleInfo } from 'types';
import { Dispatch } from 'types/Action';

const port = 3000;
const BASE_API_DOMAIN = new URL(`http://localhost:${port}`);

const fetchJSON = async (url: URL) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};

export const fetchTrendNewsList = () => {
  return async (dispatch: Dispatch) => {
    try {
      const TREND_API_PATH = new URL('trend', BASE_API_DOMAIN);
      const trendNewsList = await fetchJSON(TREND_API_PATH);

      dispatch({ type: 'FETCH_NEWS_LIST_SUCCESS', payload: { trendNewsList: trendNewsList } });
    } catch (err) {
      // dispatch({ type: 'FETCH_NEWS_LIST_ERROR', error: err });
    }
  };
};

export const fetchGridPressList = () => {
  return async (dispatch: Dispatch) => {
    try {
      const PRESS_API_PATH = new URL('media', BASE_API_DOMAIN);
      const pressNewsData = await fetchJSON(PRESS_API_PATH);

      dispatch({ type: 'FETCH_GRID_PRESS_LIST_SUCCESS', payload: { pressIconList: pressNewsData } });
    } catch (err) {
      // dispatch({ type: 'FETCH_PRESS_LIST_ERROR', error: err });
    }
  };
};

export const fetchArticleList = () => {
  return async (dispatch: Dispatch) => {
    try {
      const PRESS_API_PATH = new URL('article', BASE_API_DOMAIN);
      const pressArticleData = await fetchJSON(PRESS_API_PATH);

      const pressArticleMap = new Map<string, PressArticleInfo>();
      const pressArticles = pressArticleData.map((pressArticle: CategoryPress) => pressArticle.pressList).flat();

      pressArticles.forEach((pressArticle: PressArticleInfo) => {
        const pressName = pressArticle.pressInfo.name;
        pressArticleMap.set(pressName, pressArticle);
      });

      dispatch({
        type: 'FETCH_ARTICLE_LIST_SUCCESS',
        payload: { categoryPressList: pressArticleData, pressArticleMap: pressArticleMap },
      });
    } catch (err) {
      // dispatch({ type: 'FETCH_ARTICLE_LIST_ERROR', error: err });
    }
  };
};
