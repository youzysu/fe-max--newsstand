import { createElement } from '../utils/createElement';
import Header from './Header';

interface NewsStandProps {
  systemDate: Date;
}

export default class NewsStand {
  element;
  header;

  constructor(private props: NewsStandProps) {
    this.element = createElement('DIV', { class: 'newsStand' });
    this.header = new Header({ currentTime: props.systemDate });
    this.render();
  }

  render() {
    this.element.append(this.header.element);
  }
}
