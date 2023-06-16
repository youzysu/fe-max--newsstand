import { dispatch } from '@store/index';
import { createElement } from '@utils/index';
import { PressInfo, TabOption } from 'types';
import styles from './SubscribeButton.module.css';

interface SubscribeButtonProps {
  tabOption: TabOption;
  pressName: string;
  isSubscribed: boolean;
}

export default class SubscribeButton {
  public readonly element = createElement('BUTTON', { class: styles.subscribe });
  private onClick: (() => void) | undefined;

  constructor() {
    this.setEvent();
  }

  private setEvent() {
    this.element.addEventListener('click', () => this.onClick?.());
  }

  private setSubscribeType(isSubscribed: boolean) {
    isSubscribed ? this.element.classList.add(styles.subscribed) : this.element.classList.remove(styles.subscribed);
  }

  private setPressName(pressName: PressInfo['name']) {
    this.element.setAttribute('data-press-name', pressName);
  }

  public render({ tabOption, pressName, isSubscribed }: SubscribeButtonProps) {
    const onClickAction = {
      all: () => dispatch({ type: 'CHANGE_PRESS_SUBSCRIBING', payload: { pressName } }),
    };
    const clickEventHandler = onClickAction[tabOption];

    this.onClick = () => clickEventHandler();
    this.setSubscribeType(isSubscribed);
    this.setPressName(pressName);
  }
}
