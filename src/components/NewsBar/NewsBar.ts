import { fetchTrendNewsList } from '@api/index';
import { dispatch } from '@store/index';
import { createElement } from '@utils/index';
import { TrendNews } from 'types';
import AutoRollingNews from './AutoRollingNews';
import styles from './NewsBar.module.css';

interface NewsBarProps {
  newsList: TrendNews[];
  leftIndex: number;
  rightIndex: number;
}

interface NewsBarState {
  rollingStartTime: number;
}

export default class NewsBar {
  public readonly element = createElement('div', { class: styles.newsBar });
  private leftRollingNews = new AutoRollingNews({ type: 'left' });
  private rightRollingNews = new AutoRollingNews({ type: 'right' });
  private state: NewsBarState = { rollingStartTime: 0 };

  constructor() {
    this.element.append(this.leftRollingNews.element, this.rightRollingNews.element);
    this.componentDidMount();
  }

  private componentDidMount() {
    requestAnimationFrame((timeStamp: number) => this.autoRolling(timeStamp));
    dispatch(fetchTrendNewsList());
  }

  private autoRolling(timeStamp: number) {
    if (!this.state.rollingStartTime) {
      this.state.rollingStartTime = timeStamp;
    }
    this.leftRollingNews.startRolling(timeStamp);

    if (timeStamp - this.state.rollingStartTime > 1000) {
      this.rightRollingNews.startRolling(timeStamp);
      this.state.rollingStartTime = 0;
    }

    requestAnimationFrame((timeStamp: number) => this.autoRolling(timeStamp));
  }

  public render({ newsList, leftIndex, rightIndex }: NewsBarProps) {
    this.leftRollingNews.render({
      trendNewsList: newsList,
      index: leftIndex,
    });
    this.rightRollingNews.render({
      trendNewsList: newsList,
      index: rightIndex,
    });
  }
}
