import { dispatch } from '@store/index';
import { createElement } from '@utils/index';
import { PressInfo } from 'types';
import styles from './SubscribeButton.module.css';

interface SubscribeButtonProps {
  pressName: string;
  isSubscribed: boolean;
}

export default class SubscribeButton {
  public readonly element = createElement('BUTTON', { class: styles.subscribe });

  constructor() {
    this.setEvent();
  }

  private setEvent() {
    this.element.addEventListener('click', () => {
      const pressName = this.element.getAttribute('data-press-name');
      dispatch({ type: 'CHANGE_PRESS_SUBSCRIBING', payload: { pressName: pressName! } });
    });
  }

  private setSubscribeType(isSubscribed: boolean) {
    isSubscribed ? this.element.classList.add(styles.subscribed) : this.element.classList.remove(styles.subscribed);
  }

  private setPressName(pressName: PressInfo['name']) {
    this.element.setAttribute('data-press-name', pressName);
  }

  public render({ pressName, isSubscribed }: SubscribeButtonProps) {
    this.setSubscribeType(isSubscribed);

    if (this.element.getAttribute('data-press-name') !== pressName) {
      this.setPressName(pressName);
    }
  }
}
