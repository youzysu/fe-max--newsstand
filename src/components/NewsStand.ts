import { createElement } from '../utils/createElement';
import Header from './Header';
import TrendNews from './TrendNews';
import Component from './base';
import styles from './newsstand.module.css';

export default class NewsStand extends Component {
  getTemplate(): HTMLElement[] {
    const headerElement = createElement('HEADER', { class: styles.header });
    const trendNewsElement = createElement('SECTION', { class: styles.trendNews });
    const mainElement = createElement('SECTION', { class: 'main' });

    new Header(headerElement);
    new TrendNews(trendNewsElement);

    return [headerElement, trendNewsElement, mainElement];
  }
}
