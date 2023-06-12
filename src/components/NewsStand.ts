import { dispatch, getState } from '@store/index';
import { createElement } from '@utils/index';
import { NewsStandState } from 'types';
import Header from './Header';
import MediaViewer from './MediaViewer';
import NewsBar from './NewsBar';
import styles from './NewsStand.module.css';
import TabViewer from './TabViewer';

export default class NewsStand {
  public readonly element = createElement('DIV', { class: styles.newsStand });
  private header = new Header();
  private newsBar = new NewsBar();
  private tabViewer = new TabViewer();
  private mediaViewer = new MediaViewer();

  constructor() {
    this.element.append(this.header.element, this.newsBar.element, this.tabViewer.element, this.mediaViewer.element);
    this.componentDidMount();
    this.setEvent();
  }

  public render(state: NewsStandState) {
    this.header.render({ currentTime: state.systemDate });
    this.newsBar.render({
      newsList: state.trendNewsList,
      leftIndex: state.leftNewsIndex,
      rightIndex: state.rightNewsIndex,
    });
    this.tabViewer.render({
      tabOption: state.tabOption,
      viewerOption: state.viewerOption,
    });
    this.mediaViewer.render({
      tabOption: state.tabOption,
      viewerOption: state.viewerOption,
      pressList: state.pressIconList,
      startIndex: state.gridPressStartIndex,
      subscribePressList: state.subscribePressList,
      categoryPressList: state.categoryPressList,
      currentCategoryPress: state.currentCategoryPress,
      pressArticleMap: state.pressArticleMap,
      currentSubscribedPressIndex: state.currentSubscribedPressIndex,
    });
  }

  private setEvent() {
    window.addEventListener('beforeunload', this.saveSubscribePressList);
  }

  private componentDidMount() {
    dispatch({
      type: 'GET_SUBSCRIBE_PRESS_LIST',
      payload: { subscribePressList: JSON.parse(localStorage.getItem('subscribePressList') || '[]') },
    });
  }

  private saveSubscribePressList() {
    const subscribePressList = getState().subscribePressList;
    localStorage.setItem('subscribePressList', JSON.stringify(subscribePressList));
  }
}
