import { TrendNews } from '../../types';
import { createElement } from '../../utils/createElement';
import styles from './NewsBar.module.css';

interface HeadlineProps {
  trendNews: TrendNews;
}

export default class Headline {
  props;
  element;
  press;
  newsLink;

  constructor(props: HeadlineProps) {
    this.props = props;
    this.element = createElement('DIV', { class: styles.headline });
    this.press = createElement('SPAN', { class: 'title-sm' });
    this.newsLink = createElement('A', { class: `body-sm ${styles.link}` });
    this.render();
  }

  render() {
    this.setState();
    this.element.append(this.press, this.newsLink);
  }

  setState() {
    const { media, title, link } = this.props.trendNews;

    this.press.textContent = media;
    this.newsLink.textContent = title;
    this.newsLink.setAttribute('href', link);
  }

  updateState(newState: HeadlineProps) {
    const { trendNews } = newState;

    if (this.props.trendNews !== trendNews) {
      this.props = newState;
      this.setState();
    }
  }
}
