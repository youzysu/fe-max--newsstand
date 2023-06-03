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

  constructor(private props: GridProps) {
    this.props = props;
    this.element = createElement('TD', { class: styles.grid });
    this.pressIcon = createElement('IMG', {
      class: styles.pressIcon,
      src: this.props.press.icon,
      alt: this.props.press.name,
    });
    this.overlay = createElement('DIV', { class: styles.overlay });
    this.subscribeButton = new SubscribeButton({
      pressName: this.props.press.name,
      isSubscribed: this.props.isSubscribed,
    });
    this.render();
    this.setEvent();
  }

  private render() {
    this.setProps();
    this.appendChildren();
  }

  private setProps() {
    const { press } = this.props;
    this.element.dataset.pressName = press.name;
  }

  private setEvent() {
    this.element.addEventListener('mouseenter', () => this.showSubscribeButton());
    this.element.addEventListener('mouseleave', () => this.hideSubscribeButton());
  }

  private hideSubscribeButton() {
    this.element.removeChild(this.element.lastChild!);
  }

  private showSubscribeButton() {
    this.element.appendChild(this.overlay);
  }

  private appendChildren() {
    this.overlay.appendChild(this.subscribeButton.getElement());
    this.element.appendChild(this.pressIcon);
  }

  public updateProps(newState: GridProps) {
    if (this.props.isSubscribed === newState.isSubscribed) {
      return;
    }

    this.props = newState;
    this.subscribeButton.updateProps({ pressName: this.props.press.name, isSubscribed: this.props.isSubscribed });
  }

  public getElement() {
    return this.element;
  }
}
