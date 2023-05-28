import { dispatch } from '../../store';
import { TrendNews } from '../../types';
import { createElement } from '../../utils/createElement';
import Headline from './Headline';
import styles from './NewsBar.module.css';

interface AutoRollingNewsProps {
  trendNewsList: TrendNews[];
  index: number;
}

export default class AutoRollingNews {
  props;
  element;
  wrapper;
  currentHeadline;
  nextHeadline;
  requestId;
  rollingStartTime;

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
    this.requestId = 0;
    this.rollingStartTime = 0;
    this.render();
    this.setEvent();
  }

  setEvent() {
    this.element.addEventListener('transitionend', () => {
      dispatch({ type: 'ROLLING_NEWS' });
      this.wrapper.classList.toggle(styles.rolling);
    });
  }

  render() {
    this.wrapper.append(this.currentHeadline.element, this.nextHeadline.element);
    this.element.append(this.wrapper);
  }

  updateState(newState: AutoRollingNewsProps) {
    const { trendNewsList, index } = newState;

    if (this.props.index !== index) {
      this.props = newState;
      this.currentHeadline.updateState({ trendNews: trendNewsList[index % trendNewsList.length] });
      this.nextHeadline.updateState({
        trendNews: trendNewsList[(index + 2) % trendNewsList.length],
      });
    }
  }

  startRolling(timeStamp: number) {
    if (!this.rollingStartTime) {
      this.rollingStartTime = timeStamp;
    }

    const currentTime = timeStamp - this.rollingStartTime;
    if (currentTime > 5000) {
      this.wrapper.classList.toggle(styles.rolling);
      this.rollingStartTime = 0;
    }

    this.requestId = requestAnimationFrame((timeStamp: number) => this.startRolling(timeStamp));
  }
}
