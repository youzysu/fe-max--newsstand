import { createElement } from '@utils/index';
import FieldTab from './FieldTab';
import { ListViewerProps } from './ListViewer';
import styles from './ListViewer.module.css';
import PressArticle from './PressArticle';

export default class ListView {
  public readonly element = createElement('DIV', { class: styles.listView });
  private fieldTab = new FieldTab();
  private pressArticle = new PressArticle();

  constructor() {
    this.element.append(this.fieldTab.element, this.pressArticle.element);
  }

  public render({ categoryPressList, currentCategoryPress, subscribePressList }: ListViewerProps) {
    const currentCategory = categoryPressList[currentCategoryPress.categoryIndex];
    const currentPress = currentCategory.pressList[currentCategoryPress.pressIndex];

    this.fieldTab.render({ categoryPressList, currentCategoryPress });
    this.pressArticle.render({ currentPress, subscribePressList });
  }
}
