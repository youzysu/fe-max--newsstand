import { createElement } from '@utils/index';
import { currentCategoryPressInfo } from 'types';
import CategoryTab from './CategoryTab';
import { ListViewerProps } from './ListViewer';
import styles from './ListViewer.module.css';

export default class FieldTab {
  private CATEGORY_COUNT = 7;
  public readonly element = createElement('DIV', { class: `${styles.fieldTab} body-sm` });
  private categoryTabs = Array.from({ length: this.CATEGORY_COUNT }, () => new CategoryTab());

  constructor() {
    this.element.append(...this.categoryTabs.map((categoryTab) => categoryTab.element));
  }

  public render({ categoryPressList, currentCategoryPress }: ListViewerProps) {
    this.categoryTabs.forEach((categoryTab, index) => {
      categoryTab.render({ categoryId: index, categoryPress: categoryPressList[index] });
    });
    this.setCategoryTabActivation(currentCategoryPress);
  }

  private setCategoryTabActivation({ categoryIndex, pressIndex }: currentCategoryPressInfo) {
    this.categoryTabs.forEach((categoryTab, index) => {
      index !== categoryIndex && categoryTab.inActivate();
      index === categoryIndex && categoryTab.activate(pressIndex);
    });
  }
}
