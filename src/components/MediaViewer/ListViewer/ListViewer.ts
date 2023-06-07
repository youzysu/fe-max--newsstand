import { fetchArticleList } from '@api/index';
import { thunkDispatch } from '@store/index';
import { createElement } from '@utils/index';
import { ListViewerProps } from 'types';
import ViewerButton from '../ViewerButton/ViewerButton';
import ListView from './ListView';
import styles from './ListViewer.module.css';

export default class ListViewer {
  private element = createElement('DIV', { class: styles.listViewer });
  private listView = new ListView();
  private leftButton = new ViewerButton({ position: 'left', viewerType: 'list' });
  private rightButton = new ViewerButton({ position: 'right', viewerType: 'list' });

  constructor() {
    this.element.append(this.leftButton.getElement(), this.listView.getElement(), this.rightButton.getElement());
    this.componentDidMount();
  }

  private componentDidMount() {
    thunkDispatch(fetchArticleList());
  }

  public render({ categoryPressList }: ListViewerProps) {
    this.listView.render({ categoryPressList });
  }

  public getElement() {
    return this.element;
  }
}
