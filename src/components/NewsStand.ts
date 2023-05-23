import { createElement } from '../utils/createElement';
import Header from './Header';
import Component from './base';
import styles from './newsstand.module.css';

export default class NewsStand extends Component {
  getTemplate(): HTMLElement[] {
    const headerElement = createElement('HEADER', { class: styles.header });
    const trendNewsElement = createElement('SECTION', { class: 'trend' });
    const mainElement = createElement('SECTION', { class: 'main' });

    new Header(headerElement);

    return [headerElement, trendNewsElement, mainElement];
  }
}
