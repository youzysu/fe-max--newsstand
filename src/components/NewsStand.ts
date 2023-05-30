import { createElement } from '@utils/index';
import { NewsStandState } from 'types';
import GridViewer from './GridViewer';
import Header from './Header';
import NewsBar from './NewsBar';
import styles from './NewsStand.module.css';
import TabViewer from './TabViewer';

export default class NewsStand {
  private element;
  private header;
  private newsBar;
  private tabViewer;
  private gridViewer;

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
    this.gridViewer = new GridViewer({
      pressList: this.props.allPressList,
      startIndex: this.props.gridPressStartIndex,
    });
    this.render();
  }

  public updateProps(newState: NewsStandState) {
    this.newsBar.updateProps({
      newsList: newState.trendNewsList,
      leftIndex: newState.leftNewsIndex,
      rightIndex: newState.rightNewsIndex,
    });
  }

  private render() {
    this.element.append(
      this.header.getElement(),
      this.newsBar.getElement(),
      this.tabViewer.getElement(),
      this.gridViewer.getElement()
    );
  }

  public getElement() {
    return this.element;
  }
}
