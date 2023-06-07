import { dispatch } from '@store/index';
import { createElement } from '@utils/index';
import { PositionType, TrendNews } from 'types';
import Headline from './Headline';
import styles from './NewsBar.module.css';

interface AutoRollingNewsProps {
  trendNewsList: TrendNews[];
  index: number;
}

interface AutoRollingNewsState {
  isRolling: boolean;
  animationWaitingTime: number;
}

export default class AutoRollingNews {
  private element = createElement('SECTION', { class: styles.autoRollingNews });
  private wrapper = createElement('DIV', { class: styles.wrapper });
  private currentHeadline = new Headline();
  private nextHeadline = new Headline();
  private state: AutoRollingNewsState = { isRolling: true, animationWaitingTime: 0 };
  private type;

  constructor({ type }: PositionType) {
    this.type = type;
    this.wrapper.append(this.currentHeadline.getElement(), this.nextHeadline.getElement());
    this.element.append(this.wrapper);
    this.setEvent();
  }

  private setEvent() {
    this.element.addEventListener('transitionend', () => {
      dispatch({ type: 'ROLLING_NEWS', payload: { type: this.type } });
      this.wrapper.classList.toggle(styles.rolling);
    });
    this.element.addEventListener('mouseenter', () => (this.state.isRolling = false));
    this.element.addEventListener('mouseleave', () => (this.state.isRolling = true));
  }

  public render(props: AutoRollingNewsProps) {
    const { trendNewsList, index } = props;

    this.currentHeadline.render({ trendNews: trendNewsList[index] });
    this.nextHeadline.render({
      trendNews: trendNewsList[(index + 2) % trendNewsList.length],
    });
  }

  public startRolling(timeStamp: number) {
    if (!this.state.animationWaitingTime) {
      this.state.animationWaitingTime = timeStamp;
    }

    const rollingInterval = timeStamp - this.state.animationWaitingTime;
    if (this.state.isRolling && rollingInterval > 5000) {
      this.wrapper.classList.toggle(styles.rolling);
      this.state.animationWaitingTime = 0;
    }

    requestAnimationFrame((timeStamp: number) => this.startRolling(timeStamp));
  }

  public getElement() {
    return this.element;
  }
}
