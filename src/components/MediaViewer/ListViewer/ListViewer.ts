import { fetchArticleList } from '@api/index';
import { thunkDispatch } from '@store/index';
import { createElement } from '@utils/index';
import { CategoryPress, currentCategoryPressInfo } from 'types';
import ViewerButton from '../ViewerButton/ViewerButton';
import ListView from './ListView';
import styles from './ListViewer.module.css';

export interface ListViewerProps {
  categoryPressList: CategoryPress[];
  currentCategoryPress: currentCategoryPressInfo;
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

  public render({ categoryPressList, currentCategoryPress }: ListViewerProps) {
    this.listView.render({ categoryPressList, currentCategoryPress });
  }
}
