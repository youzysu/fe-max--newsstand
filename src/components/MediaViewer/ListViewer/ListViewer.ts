import { fetchArticleList } from '@api/index';
import { dispatch } from '@store/index';
import { createElement } from '@utils/index';
import { CategoryPress, PressArticleInfo, SubscribePressList, TabOption, currentCategoryPressInfo } from 'types';
import FieldTab from './FieldTab';
import styles from './ListViewer.module.css';
import PressArticle from './PressArticle';

interface ListViewerProps {
  tabOption: TabOption;
  categoryPressList: CategoryPress[];
  pressArticleMap: Map<string, PressArticleInfo>;
  currentCategoryPress: currentCategoryPressInfo;
  subscribePressList: SubscribePressList;
  currentSubscribedPressIndex: number;
}

export default class ListView {
  public readonly element = createElement('DIV', { class: styles.listViewer });
  private fieldTab = new FieldTab();
  private pressArticle = new PressArticle();

  constructor() {
    this.element.append(this.fieldTab.element, this.pressArticle.element);
    this.componentDidMount();
  }

  private componentDidMount() {
    dispatch(fetchArticleList());
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
    const { tabOption, categoryPressList, currentCategoryPress, subscribePressList } = listViewerProps;
    this.fieldTab.render(listViewerProps);

    const currentCategory = categoryPressList[currentCategoryPress.categoryIndex];
    const currentPress = currentCategory.pressList[currentCategoryPress.pressIndex];
    this.pressArticle.render({ tabOption, currentPress, subscribePressList });
  }

  private renderSubscribedPress(listViewerProps: ListViewerProps) {
    const { tabOption, pressArticleMap, currentSubscribedPressIndex, subscribePressList } = listViewerProps;
    const currentPress = pressArticleMap.get(subscribePressList[currentSubscribedPressIndex]);

    this.fieldTab.render(listViewerProps);
    this.pressArticle.render({ tabOption, currentPress, subscribePressList });
  }
}
