import { NewsStandState } from '../types';
import { createElement } from '../utils/createElement';
import Header from './Header';
import NewsBar from './NewsBar';
import styles from './NewsStand.module.css';

export default class NewsStand {
  element;
  header;
  newsBar;

  constructor(private props: NewsStandState) {
    this.element = createElement('DIV', { class: styles.newsStand });
    this.header = new Header({ currentTime: props.systemDate });
    this.newsBar = new NewsBar({
      leftNews: props.trendNewsList.left,
      rightNews: props.trendNewsList.right,
      leftIndex: props.leftNewsIndex,
      rightIndex: props.rightNewsIndex,
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
    this.element.append(this.header.element, this.newsBar.element);
  }
}
