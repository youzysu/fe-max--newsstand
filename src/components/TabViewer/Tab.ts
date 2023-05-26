import { createElement } from '../../utils/createElement';
import styles from './TabViewer.module.css';

interface TabProps {
  TabOption: 'all' | 'subscribe';
}

export default class Tab {
  element;
  allTabButton;
  subscribeTabButton;

  constructor(private props: TabProps) {
    this.props = props;
    this.element = createElement('DIV', { class: styles.tab });
    this.allTabButton = createElement('BUTTON', { class: `body-md ${styles.allPressButton}` });
    this.subscribeTabButton = createElement('BUTTON', {
      class: `body-md ${styles.subscribedPressButton}`,
    });
    this.render();
  }

  updateState(newState: TabProps) {
    const { TabOption } = newState;
    if (TabOption === this.props.TabOption) {
      return;
    }
    this.props = newState;
    this.setState();
  }

  setState() {
    const { TabOption } = this.props;
    this.setAllTabButton(TabOption);
    this.setSubscribeTabButton(TabOption);
  }

  setAllTabButton(TabOption: TabProps['TabOption']) {
    this.allTabButton.textContent = '전체 언론사';
    if (TabOption === 'all') {
      this.allTabButton.className = `title-md ${styles.active}`;
    }
  }

  setSubscribeTabButton(TabOption: TabProps['TabOption']) {
    this.subscribeTabButton.textContent = '내가 구독한 언론사';
    if (TabOption === 'subscribe') {
      this.subscribeTabButton.className = `title-md ${styles.active}`;
    }
  }

  render() {
    this.setState();
    this.element.append(this.allTabButton, this.subscribeTabButton);
  }
}
