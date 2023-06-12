import { fetchArticleList } from '@api/index';
import { thunkDispatch } from '@store/index';
import { createElement } from '@utils/index';
import { CategoryPress, PressArticleInfo, SubscribePressList, TabOption, currentCategoryPressInfo } from 'types';
import ViewerButton from '../ViewerButton/ViewerButton';
import ListView from './ListView';
import styles from './ListViewer.module.css';

export interface ListViewerProps {
  tabOption: TabOption;
  categoryPressList: CategoryPress[];
  pressArticleMap: Map<string, PressArticleInfo>;
  currentCategoryPress: currentCategoryPressInfo;
  subscribePressList: SubscribePressList;
  currentSubscribedPressIndex: number;
}

export default class ListViewer {
  public readonly element = createElement('DIV', { class: styles.listViewer });
  private listView = new ListView();
  private leftButton = new ViewerButton({ position: 'left', viewerType: 'list' });
  private rightButton = new ViewerButton({ position: 'right', viewerType: 'list' });

  constructor() {
    this.element.append(this.leftButton.element, this.listView.element, this.rightButton.element);
    this.componentDidMount();
  }

  private componentDidMount() {
    thunkDispatch(fetchArticleList());
  }

  public render(listViewerProps: ListViewerProps) {
    this.listView.render(listViewerProps);
  }
}
