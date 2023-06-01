import { createElement } from '@utils/index';
import { PressProps } from 'types';
import SubscribeButton from '../SubscribeButton/SubscribeButton';
import styles from './GridViewer.module.css';

interface GridProps {
  press: PressProps;
  isSubscribed: boolean;
}

export default class Grid {
  private element;
  private pressIcon;
  private subscribeButton;
  private subscribeInfo;

  constructor(private props: GridProps) {
    this.props = props;
    this.element = createElement('TD', { class: styles.grid });
    this.subscribeInfo = createElement('DIV', { class: styles.subscribeInfo });
    this.subscribeButton = new SubscribeButton({
      pressName: this.props.press['name'],
      isSubscribed: this.props.isSubscribed,
    });
    this.pressIcon = createElement('IMG', {
      class: styles.pressIcon,
      src: this.props.press.icon,
      alt: this.props.press.name,
    });
    this.render();
  }

  private render() {
    this.setProps();
    this.appendChildren();
  }

  private setProps() {
    const { press } = this.props;
    this.element.dataset.pressName = press.name;
  }

  private appendChildren() {
    this.element.appendChild(this.pressIcon);
    this.element.appendChild(this.subscribeInfo);
    this.subscribeInfo.appendChild(this.subscribeButton.getElement());
  }

  public getElement() {
    return this.element;
  }
}
