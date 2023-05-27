import { dispatch } from '../../store';
import AutoRollingNews from './AutoRollingNews';
import styles from './NewsBar.module.css';

// TODO: AutoRollingNews에서 Rolling 로직 구현하기
export default class AutoRollingTimer {
  startTime: number;
  leftRequestId: number | null;
  rightRequestId: number | null;

  constructor(
    private leftAutoRollingNews: AutoRollingNews,
    private rightAutoRollingNews: AutoRollingNews
  ) {
    this.startTime = 0;
    this.leftRequestId = null;
    this.rightRequestId = null;
    this.leftAutoRollingNews = leftAutoRollingNews;
    this.rightAutoRollingNews = rightAutoRollingNews;
    requestAnimationFrame((timeStamp) => this.autoLeftRolling(timeStamp));
    requestAnimationFrame((timeStamp) => this.autoRightRolling(timeStamp));
    this.setEvent();
  }

  // TODO: mouseenter 시 auto rolling을 멈추도록 구현 필요
  // TODO: mouseleave 시 auto rolling을 재개하도록 구현 필요
  setEvent() {
    this.leftAutoRollingNews.element.addEventListener('transitionend', () => {
      dispatch({ type: 'ROLLING_NEWS', payload: { direction: 'left' } });
      this.leftAutoRollingNews.wrapper.classList.toggle(styles.rolling);
    });
    this.rightAutoRollingNews.element.addEventListener('transitionend', () => {
      this.rightAutoRollingNews.wrapper.classList.toggle(styles.rolling);
      dispatch({ type: 'ROLLING_NEWS', payload: { direction: 'right' } });
    });
  }

  autoLeftRolling(timeStamp: number) {
    if (!this.startTime) {
      this.startTime = timeStamp;
    }

    const currentTime = timeStamp - this.startTime;
    if (currentTime > 5000) {
      this.leftAutoRollingNews.wrapper.classList.toggle(styles.rolling);
      this.startTime = 0;
    }

    this.leftRequestId = requestAnimationFrame((timeStamp) => this.autoLeftRolling(timeStamp));
  }

  // TODO: LeftRolling 1초 후에 RightRolling이 시작되도록 구현 필요
  autoRightRolling(timeStamp: number) {
    const currentTime = timeStamp - this.startTime;
    if (currentTime > 5000) {
      this.rightAutoRollingNews.wrapper.classList.toggle(styles.rolling);
    }

    this.rightRequestId = requestAnimationFrame((timeStamp) => this.autoRightRolling(timeStamp));
  }
}
