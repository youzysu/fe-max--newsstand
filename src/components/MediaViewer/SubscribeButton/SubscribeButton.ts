import { createElement } from '@utils/index';
import { PressInfo } from 'types';
import styles from './SubscribeButton.module.css';

interface SubscribeButtonProps {
  pressName: string;
  isSubscribed: boolean;
}

export default class SubscribeButton {
  public readonly element = createElement('button', { class: styles.subscribe });

  private setSubscribeType(isSubscribed: boolean) {
    isSubscribed ? this.element.classList.add(styles.subscribed) : this.element.classList.remove(styles.subscribed);
  }

  private setPressName(pressName: PressInfo['name']) {
    this.element.setAttribute('data-press-name', pressName);
  }

  public render({ pressName, isSubscribed }: SubscribeButtonProps) {
    this.setSubscribeType(isSubscribed);
    this.setPressName(pressName);
  }
}
