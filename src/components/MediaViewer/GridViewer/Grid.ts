import { createElement } from '@utils/index';
import { PressInfo, TabOption } from 'types';
import SubscribeButton from '../SubscribeButton/SubscribeButton';
import styles from './GridViewer.module.css';

interface GridProps {
  tabOption: TabOption;
  press: PressInfo;
  isSubscribed: boolean;
}

export default class Grid {
  public readonly element = createElement('TD', { class: styles.grid });
  private pressIcon = createElement('IMG', { class: styles.pressIcon });
  private subscribeButton = new SubscribeButton();
  private overlay = createElement('DIV', { class: styles.overlay });

  constructor() {
    this.element.appendChild(this.pressIcon);
    this.overlay.appendChild(this.subscribeButton.element);
    this.setEvent();
  }

  private setEvent() {
    this.element.addEventListener('mouseenter', () => this.showSubscribeButton());
    this.element.addEventListener('mouseleave', () => this.hideSubscribeButton());
  }

  private hideSubscribeButton() {
    if (!this.pressIcon.getAttribute('src')) {
      return;
    }
    this.element.removeChild(this.overlay);
  }

  private showSubscribeButton() {
    if (!this.pressIcon.getAttribute('src')) {
      return;
    }
    this.element.appendChild(this.overlay);
  }

  private setPressIcon(press: PressInfo) {
    this.pressIcon.setAttribute('src', press.icon);
    this.pressIcon.setAttribute('alt', press.name);
  }

  public render({ tabOption, press, isSubscribed }: GridProps) {
    this.setPressIcon(press);
    this.subscribeButton.render({ tabOption, pressName: press.name, isSubscribed: isSubscribed });
  }

  public dropPrevProps() {
    this.pressIcon.removeAttribute('src');
    this.pressIcon.removeAttribute('alt');
  }
}
