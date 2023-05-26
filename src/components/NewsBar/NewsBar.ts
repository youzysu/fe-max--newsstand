import { TrendNews } from '../../types';
import { createElement } from '../../utils/createElement';
import AutoRollingNews from './AutoRollingNews';
import AutoRollingTimer from './AutoRollingTimer';
import styles from './NewsBar.module.css';

interface NewsBarProps {
  leftNews: TrendNews[];
  rightNews: TrendNews[];
  leftIndex: number;
  rightIndex: number;
}

export default class NewsBar {
  element;
  leftRollingNews;
  rightRollingNews;

  constructor(props: NewsBarProps) {
    this.element = createElement('DIV', { class: styles.newsBar });
    this.leftRollingNews = new AutoRollingNews({
      trendNewsList: props.leftNews,
      index: props.leftIndex,
    });
    this.rightRollingNews = new AutoRollingNews({
      trendNewsList: props.rightNews,
      index: props.rightIndex,
    });
    new AutoRollingTimer(this.leftRollingNews, this.rightRollingNews);
    this.render();
  }

  render() {
    this.element.append(this.leftRollingNews.element, this.rightRollingNews.element);
  }

  updateState(newState: NewsBarProps) {
    this.leftRollingNews.updateState({
      trendNewsList: newState.leftNews,
      index: newState.leftIndex,
    });
    this.rightRollingNews.updateState({
      trendNewsList: newState.rightNews,
      index: newState.rightIndex,
    });
  }
}
