import { TrendNews } from '../../types';
import { createElement } from '../../utils/createElement';
import styles from './NewsBar.module.css';

interface AutoRollingNewsProps {
  trendNewsList: TrendNews[];
  index: number;
}

interface HeadlineProps {
  trendNews: TrendNews;
}

export default class AutoRollingNews {
  props;
  element;
  wrapper;
  currentHeadline;
  nextHeadline;
  rollingStartTime: null | number;

  constructor(props: AutoRollingNewsProps) {
    this.props = props;
    this.rollingStartTime = null;
    this.element = createElement('SECTION', { class: styles.autoRollingNews });
    this.wrapper = createElement('DIV', { class: styles.wrapper });
    this.currentHeadline = new Headline({ trendNews: props.trendNewsList[props.index % 5] });
    this.nextHeadline = new Headline({ trendNews: props.trendNewsList[(props.index + 1) % 5] });
    this.render();
  }

  render() {
    this.wrapper.append(this.currentHeadline.element, this.nextHeadline.element);
    this.element.append(this.wrapper);
  }

  updateState(newState: AutoRollingNewsProps) {
    const { trendNewsList, index } = newState;

    if (this.props.index !== index) {
      this.props = newState;
      this.currentHeadline.updateState({ trendNews: trendNewsList[index % 5] });
      this.nextHeadline.updateState({ trendNews: trendNewsList[(index + 1) % 5] });
    }
  }
}

class Headline {
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
    const { press, title, link } = this.props.trendNews;

    this.press.textContent = press;
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
