import { createElement } from '../../utils/createElement';
import Component from '../base';

export default class NewsBar extends Component {
  initState(): State {
    return { currentIndex: 0 };
  }

  getTemplate(): HTMLElement[] {
    const { currentIndex } = this.state;
    const { newsData } = this.props;

    const media = createElement('SPAN', { class: 'title-sm' });
    media.textContent = newsData[currentIndex].media;

    const title = createElement('SPAN', { class: 'body-sm' });
    title.textContent = newsData[currentIndex].title;

    const newsLink = createElement('A', { href: newsData[currentIndex].link });
    newsLink.append(title);

    return [media, newsLink];
  }
}
