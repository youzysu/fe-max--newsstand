import { createElement } from '../../utils/createElement';
import styles from './header.module.css';

interface HeaderProps {
  currentTime: Date;
}

export default class Header {
  element;
  title;
  date;

  constructor(private props: HeaderProps) {
    this.props = props;
    this.element = createElement('HEADER', { class: styles.header });
    this.title = createElement('A', { class: styles.title, href: '#' });
    this.date = createElement('SPAN', { class: `${styles.todaysDate} body-md` });
    this.render();
  }

  render() {
    this.setTitle();
    this.setDate();
    this.element.append(this.title, this.date);
  }

  setTitle() {
    const logoIcon = createElement('IMG', {
      alt: '뉴스 스탠드 아이콘',
      src: '/newspaper.svg',
    });
    const titleText = createElement('H1', { class: 'display' });
    titleText.textContent = '뉴스스탠드';

    this.title.append(logoIcon, titleText);
  }

  setDate() {
    const { currentTime } = this.props;
    const koreanDateFormat = new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      weekday: 'long',
    }).format(currentTime);

    this.date.textContent = koreanDateFormat;
  }

  updateState(newState: HeaderProps) {
    const { currentTime } = newState;

    if (this.props.currentTime !== currentTime) {
      this.props = newState;
      this.setDate();
    }
  }
}
