import { dispatch } from '../../store/newsStandReducer';

export default class AutoRollingTimer {
  startTime: number;
  leftRequestId: number | null;
  rightRequestId: number | null;

  constructor(private leftAutoRollingNews: HTMLElement, private rightAutoRollingNews: HTMLElement) {
    this.startTime = 0;
    this.leftRequestId = null;
    this.rightRequestId = null;
    this.leftAutoRollingNews = leftAutoRollingNews;
    this.rightAutoRollingNews = rightAutoRollingNews;
    requestAnimationFrame(this.autoLeftRolling.bind(this));
    requestAnimationFrame(this.autoRightRolling.bind(this));
  }

  autoLeftRolling(timeStamp: number) {
    if (!this.startTime) {
      this.startTime = timeStamp;
    }

    const currentTime = timeStamp - this.startTime;
    if (currentTime > 5000) {
      dispatch({ type: 'ROLLING_LEFT_NEWS' });
      this.startTime = 0;
    }

    this.leftRequestId = requestAnimationFrame(this.autoLeftRolling.bind(this));
  }

  // TODO: LeftRolling 1초 후에 RightRolling이 시작되도록 구현 필요
  autoRightRolling(timeStamp: number) {
    const currentTime = timeStamp - this.startTime;
    if (currentTime > 5000) {
      dispatch({ type: 'ROLLING_RIGHT_NEWS' });
    }

    this.rightRequestId = requestAnimationFrame(this.autoRightRolling.bind(this));
  }

  // TODO: mouseenter 시 auto rolling을 멈추도록 구현 필요
  // TODO: mouseleave 시 auto rolling을 재개하도록 구현 필요
  // TODO: animation 효과 추가 필요
}
