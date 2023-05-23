import { BASE_API_DOMAIN, fetchJSON } from '../../api';
import { createElement } from '../../utils/createElement';
import Component from '../base';
import styles from './trendNews.module.css';

export default class TrendNews extends Component {
  async initState(): State {
    const TREND_API_PATH = new URL('trend', BASE_API_DOMAIN);
    const trendNewsData = await fetchJSON(TREND_API_PATH);

    return { newsList: trendNewsData };
  }

  getTemplate(): HTMLElement[] {
    const leftBarElement = createElement('SECTION', { class: styles.newsBar });
    const rightBarElement = createElement('SECTION', { class: styles.newsBar });

    // new NewsBar(leftBarElement);

    return [leftBarElement, rightBarElement];
  }
}
