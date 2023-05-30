import { createElement } from '@utils/index';
import styles from './header.module.css';

interface HeaderProps {
  currentTime: Date;
}

export default class Header {
  private element;
  private title;
  private date;

  constructor(private props: HeaderProps) {
    this.props = props;
    this.element = createElement('HEADER', { class: styles.header });
    this.title = createElement('A', { class: styles.title, href: '#' });
    this.date = createElement('SPAN', { class: `${styles.todaysDate} body-md` });
    this.render();
    this.setEvent();
  }

  private setEvent() {
    this.title.addEventListener('click', () => window.location.reload());
  }

  private render() {
    this.setTitle();
    this.setDate();
    this.element.append(this.title, this.date);
  }

  private setTitle() {
    const logoIcon = createElement('IMG', {
      alt: '뉴스 스탠드 아이콘',
      src: '/newspaper.svg',
    });
    const titleText = createElement('H1', { class: 'display' });
    titleText.textContent = '뉴스스탠드';

    this.title.append(logoIcon, titleText);
  }

  private setDate() {
    const { currentTime } = this.props;
    const koreanDateFormat = new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      weekday: 'long',
    }).format(currentTime);

    this.date.textContent = koreanDateFormat;
  }

  public updateProps(newState: HeaderProps) {
    const { currentTime } = newState;
    const newDate = new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      weekday: 'long',
    }).format(currentTime);

    if (this.date.textContent !== newDate) {
      this.props = newState;
      this.setDate();
    }
  }

  public getElement() {
    return this.element;
  }
}
