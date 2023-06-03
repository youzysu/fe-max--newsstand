import { createElement } from '@utils/index';
import { PressInfo } from 'types';
import SubscribeButton from '../SubscribeButton/SubscribeButton';
import styles from './GridViewer.module.css';

interface GridProps {
  press: PressInfo;
  isSubscribed: boolean;
}

export default class Grid {
  private element;
  private pressIcon;
  private subscribeButton;
  private overlay;

  constructor() {
    this.element = createElement('TD', { class: styles.grid });
    this.pressIcon = createElement('IMG', { class: styles.pressIcon });
    this.element.appendChild(this.pressIcon);
    this.overlay = createElement('DIV', { class: styles.overlay });
    this.subscribeButton = new SubscribeButton();
    this.overlay.appendChild(this.subscribeButton.getElement());
    this.setEvent();
  }

  private setEvent() {
    this.element.addEventListener('mouseenter', () => this.showSubscribeButton());
    this.element.addEventListener('mouseleave', () => this.hideSubscribeButton());
  }

  private hideSubscribeButton() {
    this.element.removeChild(this.overlay);
  }

  private showSubscribeButton() {
    this.element.appendChild(this.overlay);
  }

  private setPressIcon(press: PressInfo) {
    this.pressIcon.setAttribute('src', press.icon);
    this.pressIcon.setAttribute('alt', press.name);
  }

  public render({ press, isSubscribed }: GridProps) {
    if (this.pressIcon.getAttribute('alt') !== press.name) {
      this.setPressIcon(press);
    }
    this.subscribeButton.render({ pressName: press.name, isSubscribed: isSubscribed });
  }

  public getElement() {
    return this.element;
  }
}
