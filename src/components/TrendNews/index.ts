import { BASE_API_DOMAIN, fetchJSON } from '../../api';
import { createElement } from '../../utils/createElement';
import Component from '../base';
import NewsBar from './NewsBar';
import styles from './trendNews.module.css';

export default class TrendNews extends Component {
  async initState() {
    const TREND_API_PATH = new URL('trend', BASE_API_DOMAIN);
    const trendNewsData = await fetchJSON(TREND_API_PATH);

    return { leftList: trendNewsData.slice(0, 5), rightList: trendNewsData.slice(5) };
  }

  getTemplate(): HTMLElement[] {
    const { leftList, rightList } = this.state;

    const leftBarElement = createElement('SECTION', { class: styles.newsBar });
    const rightBarElement = createElement('SECTION', { class: styles.newsBar });

    new NewsBar(leftBarElement, { newsData: leftList });
    new NewsBar(rightBarElement, { newsData: rightList });

    return [leftBarElement, rightBarElement];
  }
}
