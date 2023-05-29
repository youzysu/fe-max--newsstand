import { TrendNews } from '../../types';
import { createElement } from '../../utils';
import AutoRollingNews from './AutoRollingNews';
import styles from './NewsBar.module.css';

interface NewsBarProps {
  newsList: TrendNews[];
  leftIndex: number;
  rightIndex: number;
}

export default class NewsBar {
  private element;
  private leftRollingNews;
  private rightRollingNews;
  private rollingStartTime;

  constructor(props: NewsBarProps) {
    this.element = createElement('DIV', { class: styles.newsBar });
    this.leftRollingNews = new AutoRollingNews({
      trendNewsList: props.newsList,
      index: props.leftIndex,
    });
    this.rightRollingNews = new AutoRollingNews({
      trendNewsList: props.newsList,
      index: props.rightIndex,
    });
    requestAnimationFrame((timeStamp: number) => this.autoRolling(timeStamp));
    this.rollingStartTime = 0;
    this.render();
  }

  private autoRolling(timeStamp: number) {
    if (!this.rollingStartTime) {
      this.rollingStartTime = timeStamp;
    }
    this.leftRollingNews.startRolling(timeStamp);

    if (timeStamp - this.rollingStartTime > 1000) {
      this.rightRollingNews.startRolling(timeStamp);
      this.rollingStartTime = 0;
    }

    requestAnimationFrame((timeStamp: number) => this.autoRolling(timeStamp));
  }

  private render() {
    this.element.append(this.leftRollingNews.getElement(), this.rightRollingNews.getElement());
  }

  public updateProps(newState: NewsBarProps) {
    this.leftRollingNews.updateProps({
      trendNewsList: newState.newsList,
      index: newState.leftIndex,
    });
    this.rightRollingNews.updateProps({
      trendNewsList: newState.newsList,
      index: newState.rightIndex,
    });
  }

  public getElement() {
    return this.element;
  }
}
