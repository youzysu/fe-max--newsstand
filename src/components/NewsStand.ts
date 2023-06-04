import { createElement } from '@utils/index';
import { NewsStandState } from 'types';
import Header from './Header';
import MediaArea from './MediaArea';
import NewsBar from './NewsBar';
import styles from './NewsStand.module.css';
import TabViewer from './TabViewer';

export default class NewsStand {
  private element;
  private header;
  private newsBar;
  private tabViewer;
  private mediaArea;

  constructor() {
    this.element = createElement('DIV', { class: styles.newsStand });
    this.header = new Header();
    this.newsBar = new NewsBar();
    this.tabViewer = new TabViewer();
    this.mediaArea = new MediaArea();
    this.element.append(
      this.header.getElement(),
      this.newsBar.getElement(),
      this.tabViewer.getElement(),
      this.mediaArea.getElement()
    );
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
    this.mediaArea.render({
      tabOption: state.tabOption,
      viewerOption: state.viewerOption,
      pressList: state.allPressList,
      startIndex: state.gridPressStartIndex,
      subscribePressList: state.subscribePressList,
    });
  }

  public getElement() {
    return this.element;
  }
}
