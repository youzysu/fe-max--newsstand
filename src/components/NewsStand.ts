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

  constructor(private props: NewsStandState) {
    this.props = props;
    this.element = createElement('DIV', { class: styles.newsStand });
    this.header = new Header({ currentTime: this.props.systemDate });
    this.newsBar = new NewsBar({
      newsList: this.props.trendNewsList,
      leftIndex: this.props.leftNewsIndex,
      rightIndex: this.props.rightNewsIndex,
    });
    this.tabViewer = new TabViewer({
      tabOption: this.props.tabOption,
      viewerOption: this.props.viewerOption,
    });
    this.mediaArea = new MediaArea({
      tabOption: this.props.tabOption,
      viewerOption: this.props.viewerOption,
      pressList: this.props.allPressList,
      startIndex: this.props.gridPressStartIndex,
      subscribePressList: this.props.subscribePressList,
    });
    this.render();
  }

  public updateProps(newState: NewsStandState) {
    this.newsBar.updateProps({
      newsList: newState.trendNewsList,
      leftIndex: newState.leftNewsIndex,
      rightIndex: newState.rightNewsIndex,
    });
    this.mediaArea.updateProps({
      tabOption: newState.tabOption,
      viewerOption: newState.viewerOption,
      pressList: newState.allPressList,
      startIndex: newState.gridPressStartIndex,
      subscribePressList: newState.subscribePressList,
    });
  }

  private render() {
    this.element.append(
      this.header.getElement(),
      this.newsBar.getElement(),
      this.tabViewer.getElement(),
      this.mediaArea.getElement()
    );
  }

  public getElement() {
    return this.element;
  }
}
