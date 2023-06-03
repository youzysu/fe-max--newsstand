import { dispatch } from '@store/index';
import { createElement } from '@utils/index';
import styles from './TabViewer.module.css';

interface TabProps {
  tabOption: 'all' | 'subscribe';
}

export default class Tab {
  private element;
  private allTabButton;
  private subscribeTabButton;

  constructor() {
    this.element = createElement('DIV', { class: styles.tab });
    this.allTabButton = createElement('BUTTON', { class: `body-md ${styles.allPressButton}` });
    this.subscribeTabButton = createElement('BUTTON', {
      class: `body-md ${styles.subscribedPressButton}`,
    });
    this.element.append(this.allTabButton, this.subscribeTabButton);
    this.setButtons();
    this.setEvent();
  }

  private setEvent() {
    this.allTabButton.addEventListener('click', () => dispatch({ type: 'CHANGE_TAB', payload: { tabOption: 'all' } }));
    this.subscribeTabButton.addEventListener('click', () =>
      dispatch({ type: 'CHANGE_TAB', payload: { tabOption: 'subscribe' } })
    );
  }

  private setButtons() {
    this.allTabButton.textContent = '전체 언론사';
    this.subscribeTabButton.textContent = '내가 구독한 언론사';
  }

  public render({ tabOption }: TabProps) {
    if (tabOption === 'all') {
      this.allTabButton.className = `title-md ${styles.active}`;
      return;
    }
    if (tabOption === 'subscribe') {
      this.subscribeTabButton.className = `title-md ${styles.active}`;
    }
  }

  public getElement() {
    return this.element;
  }
}
