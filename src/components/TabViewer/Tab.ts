import { dispatch } from '@store/index';
import { createElement } from '@utils/index';
import { TabOption } from 'types';
import styles from './TabViewer.module.css';

interface TabProps {
  tabOption: TabOption;
}

export default class Tab {
  private basicClassName = 'body-md';
  private activeClassName = `title-md ${styles.active}`;
  public readonly element = createElement('div', { class: styles.tab });
  public readonly allTabButton = createElement('button', { class: this.basicClassName });
  public readonly subscribeTabButton = createElement('button', { class: this.basicClassName });

  constructor() {
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
      this.subscribeTabButton.className = this.basicClassName;
      this.allTabButton.className = this.activeClassName;
      return;
    }
    if (tabOption === 'subscribe') {
      this.allTabButton.className = this.basicClassName;
      this.subscribeTabButton.className = this.activeClassName;
    }
  }
}
