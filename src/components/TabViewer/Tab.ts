import { createElement } from '@utils/index';
import styles from './TabViewer.module.css';

interface TabProps {
  tabOption: 'all' | 'subscribe';
}

export default class Tab {
  private element;
  private allTabButton;
  private subscribeTabButton;

  constructor(private props: TabProps) {
    this.props = props;
    this.element = createElement('DIV', { class: styles.tab });
    this.allTabButton = createElement('BUTTON', { class: `body-md ${styles.allPressButton}` });
    this.subscribeTabButton = createElement('BUTTON', {
      class: `body-md ${styles.subscribedPressButton}`,
    });
    this.render();
  }

  public updateProps(newState: TabProps) {
    const { tabOption } = newState;
    if (tabOption === this.props.tabOption) {
      return;
    }
    this.props = newState;
    this.setProps();
  }

  private setProps() {
    const { tabOption } = this.props;
    this.setAllTabButton(tabOption);
    this.setSubscribeTabButton(tabOption);
  }

  private setAllTabButton(tabOption: TabProps['tabOption']) {
    this.allTabButton.textContent = '전체 언론사';
    if (tabOption === 'all') {
      this.allTabButton.className = `title-md ${styles.active}`;
    }
  }

  private setSubscribeTabButton(tabOption: TabProps['tabOption']) {
    this.subscribeTabButton.textContent = '내가 구독한 언론사';
    if (tabOption === 'subscribe') {
      this.subscribeTabButton.className = `title-md ${styles.active}`;
    }
  }

  private render() {
    this.setProps();
    this.element.append(this.allTabButton, this.subscribeTabButton);
  }

  public getElement() {
    return this.element;
  }
}
