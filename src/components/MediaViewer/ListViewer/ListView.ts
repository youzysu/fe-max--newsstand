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

  public render(listViewerProps: ListViewerProps) {
    const { tabOption } = listViewerProps;
    switch (tabOption) {
      case 'all': {
        this.renderCategoryPress(listViewerProps);
        break;
      }
      case 'subscribe': {
        this.renderSubscribedPress(listViewerProps);
        break;
      }
    }
  }

  private renderCategoryPress(listViewerProps: ListViewerProps) {
    const { categoryPressList, currentCategoryPress, subscribePressList } = listViewerProps;
    this.fieldTab.render(listViewerProps);

    const currentCategory = categoryPressList[currentCategoryPress.categoryIndex];
    const currentPress = currentCategory.pressList[currentCategoryPress.pressIndex];
    this.pressArticle.render({ currentPress, subscribePressList });
  }

  private renderSubscribedPress(listViewerProps: ListViewerProps) {
    const { pressArticleMap, currentSubscribedPressIndex, subscribePressList } = listViewerProps;
    const currentPress = pressArticleMap.get(subscribePressList[currentSubscribedPressIndex]);

    this.fieldTab.render(listViewerProps);
    this.pressArticle.render({ currentPress, subscribePressList });
  }
}
