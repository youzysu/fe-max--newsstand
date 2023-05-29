import { TrendNews } from '../../types';
import { createElement } from '../../utils';
import styles from './NewsBar.module.css';

interface HeadlineProps {
  trendNews: TrendNews;
}

export default class Headline {
  private props;
  private element;
  private press;
  private newsLink;

  constructor(props: HeadlineProps) {
    this.props = props;
    this.element = createElement('DIV', { class: styles.headline });
    this.press = createElement('SPAN', { class: 'title-sm' });
    this.newsLink = createElement('A', { class: `body-sm ${styles.link}` });
    this.render();
  }

  private render() {
    this.setProps();
    this.element.append(this.press, this.newsLink);
  }

  private setProps() {
    const { media, title, link } = this.props.trendNews;

    this.press.textContent = media;
    this.newsLink.textContent = title;
    this.newsLink.setAttribute('href', link);
  }

  public updateProps(newState: HeadlineProps) {
    const { trendNews } = newState;

    if (this.props.trendNews !== trendNews) {
      this.props = newState;
      this.setProps();
    }
  }

  public getElement() {
    return this.element;
  }
}
