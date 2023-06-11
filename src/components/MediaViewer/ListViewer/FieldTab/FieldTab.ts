import { createElement } from '@utils/index';
import { currentCategoryPressInfo } from 'types';
import { ListViewerProps } from '../ListViewer';
import CategoryTab from './CategoryTab';
import styles from './FieldTab.module.css';

interface FieldTabProps {
  categoryPressList: ListViewerProps['categoryPressList'];
  currentCategoryPress: currentCategoryPressInfo;
}

export default class FieldTab {
  private CATEGORY_COUNT = 7;
  public readonly element = createElement('DIV', { class: `${styles.fieldTab} body-sm` });
  private categoryTabs = Array.from({ length: this.CATEGORY_COUNT }, () => new CategoryTab());

  constructor() {
    this.element.append(...this.categoryTabs.map((categoryTab) => categoryTab.element));
  }

  public render({ categoryPressList, currentCategoryPress }: FieldTabProps) {
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
