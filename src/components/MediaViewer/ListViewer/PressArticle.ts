import { createElement } from '@utils/index';
import styles from './ListViewer.module.css';

export default class PressArticle {
  private element = createElement('DIV', { class: styles.pressNews });

  constructor() {}

  public getElement() {
    return this.element;
  }
}
