import { createElement } from '../../utils/createElement';
import Component from '../base';
import styles from './header.module.css';

export default class Header extends Component {
  getTemplate(): HTMLElement[] {
    const titleElement = createElement('A', { class: styles.title, href: '#' });
    const dateElement = createElement('DIV', { class: styles.todaysDate });
    new Title(titleElement);
    new TodaysDate(dateElement);

    return [titleElement, dateElement];
  }
}

class Title extends Component {
  getTemplate(): HTMLElement[] {
    const logoIcon = createElement('IMG', {
      alt: '뉴스 스탠드 아이콘',
      src: '/newspaper.svg',
    });
    const title = createElement('H1', { class: 'display' });
    title.textContent = '뉴스스탠드';

    return [logoIcon, title];
  }
}

interface TodaysDateState {
  [currentTime: string]: Date;
}

class TodaysDate extends Component {
  initState(): TodaysDateState {
    return { currentTime: new Date() };
  }

  getTemplate(): HTMLElement[] {
    const dateElement = createElement('SPAN', { class: 'body-md' });
    const koreanDateFormat = new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      weekday: 'long',
    }).format(this.state.currentTime);
    dateElement.textContent = koreanDateFormat;

    return [dateElement];
  }
}
