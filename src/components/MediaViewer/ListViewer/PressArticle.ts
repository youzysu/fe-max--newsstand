import { createElement } from '@utils/index';
import styles from './ListViewer.module.css';

export default class PressArticle {
  public readonly element = createElement('DIV', { class: styles.pressNews });

  constructor() {}

  public render() {}
}
