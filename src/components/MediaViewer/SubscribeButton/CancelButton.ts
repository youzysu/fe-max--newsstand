import { createElement } from '@utils/index';
import styles from './SubscribeButton.module.css';

export default class CancelButton {
  public readonly element = createElement('BUTTON', { class: styles.cancel });

  constructor() {
    this.setEvent();
  }

  public render(pressName: string) {
    this.setPressName(pressName);
  }

  private setEvent() {
    this.element.addEventListener('click', () => this.showSubscribeCancelModal());
  }

  private showSubscribeCancelModal() {}

  private setPressName(pressName: string) {
    this.element.setAttribute('data-press-name', pressName);
  }
}
