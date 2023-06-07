import { createElement } from '@utils/index';
import FieldTab from './FieldTab';
import { ListViewerProps } from './ListViewer';
import styles from './ListViewer.module.css';
import PressArticle from './PressArticle';

export default class ListView {
  private element = createElement('DIV', { class: styles.listView });
  private fieldTab = new FieldTab();
  private pressArticle = new PressArticle();

  constructor() {
    this.element.append(this.fieldTab.getElement(), this.pressArticle.getElement());
  }

  public render({ categoryPressList, currentCategoryPress }: ListViewerProps) {
    this.fieldTab.render({ categoryPressList, currentCategoryPress });
  }

  public getElement() {
    return this.element;
  }
}
