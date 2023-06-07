import { getState } from '@store/index';
import { createElement } from '@utils/index';
import { NewsStandState } from 'types';
import Header from './Header';
import MediaViewer from './MediaViewer';
import NewsBar from './NewsBar';
import styles from './NewsStand.module.css';
import TabViewer from './TabViewer';

export default class NewsStand {
  private element = createElement('DIV', { class: styles.newsStand });
  private header = new Header();
  private newsBar = new NewsBar();
  private tabViewer = new TabViewer();
  private mediaViewer = new MediaViewer();

  constructor() {
    this.element.append(
      this.header.getElement(),
      this.newsBar.getElement(),
      this.tabViewer.getElement(),
      this.mediaViewer.getElement()
    );
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
    });
  }

  private setEvent() {
    window.addEventListener('beforeunload', this.saveSubscribePressList);
  }

  private saveSubscribePressList() {
    const subscribePressList = getState().subscribePressList;
    localStorage.setItem('subscribePressList', JSON.stringify(subscribePressList));
  }

  public getElement() {
    return this.element;
  }
}
