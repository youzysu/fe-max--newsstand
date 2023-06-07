import { createElement } from '@utils/index';
import { ListViewerProps } from 'types';
import CategoryTab from './CategoryTab';
import styles from './ListViewer.module.css';

export default class FieldTab {
  private CATEGORY_COUNT = 7;
  private element = createElement('DIV', { class: `${styles.fieldTab} body-sm` });
  private categoryTabs = Array.from({ length: this.CATEGORY_COUNT }, () => new CategoryTab());

  constructor() {
    this.element.append(...this.categoryTabs.map((categoryTab) => categoryTab.getElement()));
  }

  public render({ categoryPressList }: ListViewerProps) {
    this.categoryTabs.forEach((categoryTab, index) => {
      categoryTab.render({ categoryPress: categoryPressList[index] });
    });
  }

  public getElement() {
    return this.element;
  }
}
