import { createElement } from '@utils/index';
import styles from './header.module.css';

interface HeaderProps {
  currentTime: Date;
}

export default class Header {
  public readonly element = createElement('header', { class: styles.header });
  private title = createElement('a', { class: styles.title, href: '#' });
  private date = createElement('span', { class: `${styles.todaysDate} body-md` });

  constructor() {
    this.element.append(this.title, this.date);
    this.setTitle();
    this.setEvent();
  }

  private setEvent() {
    this.title.addEventListener('click', () => window.history.go(0));
  }

  private setTitle() {
    const logoIcon = createElement('img', {
      alt: '뉴스 스탠드 아이콘',
      src: '/newspaper.svg',
    });
    const titleText = createElement('h1', { class: 'display' });
    titleText.textContent = '뉴스스탠드';

    this.title.append(logoIcon, titleText);
  }

  public render({ currentTime }: HeaderProps) {
    const newDateFormat = new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      weekday: 'long',
    }).format(currentTime);

    if (this.date.textContent !== newDateFormat) {
      this.date.textContent = newDateFormat;
    }
  }
}
