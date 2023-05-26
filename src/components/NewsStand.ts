import { NewsStandState } from '../types';
import { createElement } from '../utils/createElement';
import Header from './Header';
import NewsBar from './NewsBar';
import styles from './NewsStand.module.css';
import TabViewer from './TabViewer/TabViewer';

export default class NewsStand {
  element;
  header;
  newsBar;
  tabViewer;

  constructor(private props: NewsStandState) {
    this.props = props;
    this.element = createElement('DIV', { class: styles.newsStand });
    this.header = new Header({ currentTime: this.props.systemDate });
    this.newsBar = new NewsBar({
      leftNews: this.props.trendNewsList.left,
      rightNews: this.props.trendNewsList.right,
      leftIndex: this.props.leftNewsIndex,
      rightIndex: this.props.rightNewsIndex,
    });
    this.tabViewer = new TabViewer({
      TabOption: this.props.TabOption,
      ViewerOption: this.props.ViewerOption,
    });
    this.render();
  }

  updateState(newState: NewsStandState) {
    this.newsBar.updateState({
      leftNews: newState.trendNewsList.left,
      rightNews: newState.trendNewsList.right,
      leftIndex: newState.leftNewsIndex,
      rightIndex: newState.rightNewsIndex,
    });
  }

  render() {
    this.element.append(this.header.element, this.newsBar.element, this.tabViewer.element);
  }
}
