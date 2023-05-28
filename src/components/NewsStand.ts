import { NewsStandState } from '../types';
import { createElement } from '../utils/createElement';
import GridViewer from './GridViewer';
import Header from './Header';
import NewsBar from './NewsBar';
import styles from './NewsStand.module.css';
import TabViewer from './TabViewer';

export default class NewsStand {
  element;
  header;
  newsBar;
  tabViewer;
  gridViewer;

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
      TabOption: this.props.TabOption,
      ViewerOption: this.props.ViewerOption,
    });
    this.gridViewer = new GridViewer({
      pressList: this.props.allPressList,
      startIndex: this.props.gridPressStartIndex,
    });
    this.render();
  }

  updateState(newState: NewsStandState) {
    this.newsBar.updateState({
      newsList: newState.trendNewsList,
      leftIndex: newState.leftNewsIndex,
      rightIndex: newState.rightNewsIndex,
    });
  }

  render() {
    this.element.append(
      this.header.element,
      this.newsBar.element,
      this.tabViewer.element,
      this.gridViewer.element
    );
  }
}
