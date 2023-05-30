import { dispatch } from '@store/index';
import { createElement } from '@utils/index';
import { TrendNews } from 'types';
import Headline from './Headline';
import styles from './NewsBar.module.css';

interface AutoRollingNewsProps {
  trendNewsList: TrendNews[];
  index: number;
}

export default class AutoRollingNews {
  private props;
  private element;
  private wrapper;
  private currentHeadline;
  private nextHeadline;
  private rollingStartTime;
  private isRolling;

  constructor(props: AutoRollingNewsProps) {
    this.props = props;
    this.element = createElement('SECTION', { class: styles.autoRollingNews });
    this.wrapper = createElement('DIV', { class: styles.wrapper });
    this.currentHeadline = new Headline({
      trendNews: props.trendNewsList[props.index % props.trendNewsList.length],
    });
    this.nextHeadline = new Headline({
      trendNews: props.trendNewsList[(props.index + 2) % props.trendNewsList.length],
    });
    this.rollingStartTime = 0;
    this.isRolling = true;
    this.render();
    this.setEvent();
  }

  private setEvent() {
    this.element.addEventListener('transitionend', () => {
      dispatch({ type: 'ROLLING_NEWS', payload: { currentHeadlineIndex: this.props.index } });
      this.wrapper.classList.toggle(styles.rolling);
    });
    this.element.addEventListener('mouseenter', () => (this.isRolling = false));
    this.element.addEventListener('mouseleave', () => (this.isRolling = true));
  }

  private render() {
    this.wrapper.append(this.currentHeadline.getElement(), this.nextHeadline.getElement());
    this.element.append(this.wrapper);
  }

  public updateProps(newState: AutoRollingNewsProps) {
    const { trendNewsList, index } = newState;

    if (this.props.index !== index) {
      this.props = newState;
      this.currentHeadline.updateProps({ trendNews: trendNewsList[index % trendNewsList.length] });
      this.nextHeadline.updateProps({
        trendNews: trendNewsList[(index + 2) % trendNewsList.length],
      });
    }
  }

  public startRolling(timeStamp: number) {
    if (!this.rollingStartTime) {
      this.rollingStartTime = timeStamp;
    }

    const currentTime = timeStamp - this.rollingStartTime;
    if (this.isRolling && currentTime > 5000) {
      this.wrapper.classList.toggle(styles.rolling);
      this.rollingStartTime = 0;
    }

    requestAnimationFrame((timeStamp: number) => this.startRolling(timeStamp));
  }

  public getElement() {
    return this.element;
  }
}
