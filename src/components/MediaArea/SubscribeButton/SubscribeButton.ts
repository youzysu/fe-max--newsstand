import { dispatch } from '@store/index';
import { createElement } from '@utils/index';
import styles from './SubscribeButton.module.css';

interface SubscribeButtonProps {
  pressName: string;
  isSubscribed: boolean;
}

export default class SubscribeButton {
  private element;

  constructor(private props: SubscribeButtonProps) {
    this.props = props;
    this.element = createElement('BUTTON', { class: styles.subscribeButton, 'data-press-name': this.props.pressName });
    this.setProps();
    this.setEvent();
  }

  private setEvent() {
    this.element.addEventListener('click', () =>
      dispatch({ type: 'CHANGE_PRESS_SUBSCRIBING', payload: { pressName: this.props.pressName } })
    );
  }

  private setProps() {
    const { isSubscribed } = this.props;
    isSubscribed ? this.element.classList.add(styles.subscribed) : this.element.classList.remove(styles.subscribed);
  }

  public updateProps(newState: SubscribeButtonProps) {
    if (this.props.isSubscribed === newState.isSubscribed) {
      return;
    }

    this.props = newState;
    this.setProps();
  }

  public getElement() {
    return this.element;
  }
}
