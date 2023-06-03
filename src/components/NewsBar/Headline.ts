import { createElement } from '@utils/index';
import { TrendNews } from 'types';
import styles from './NewsBar.module.css';

interface HeadlineProps {
  trendNews: TrendNews;
}

export default class Headline {
  private element;
  private press;
  private newsLink;

  constructor() {
    this.element = createElement('DIV', { class: styles.headline });
    this.press = createElement('SPAN', { class: 'title-sm' });
    this.newsLink = createElement('A', { class: `body-sm ${styles.link}` });
    this.element.append(this.press, this.newsLink);
  }

  public render({ trendNews }: HeadlineProps) {
    const { media, title, link } = trendNews;

    if (this.press.textContent !== media) {
      this.press.textContent = media;
    }

    if (this.newsLink.textContent !== title) {
      this.newsLink.textContent = title;
    }

    if (this.newsLink.getAttribute('href') !== link) {
      this.newsLink.setAttribute('href', link);
    }
  }

  public getElement() {
    return this.element;
  }
}
