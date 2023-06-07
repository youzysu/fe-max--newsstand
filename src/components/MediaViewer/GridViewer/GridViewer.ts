import { createElement } from '@utils/index';
import { PressInfo, SubscribePressList } from 'types';
import ViewerButton from '../ViewerButton/ViewerButton';
import GridView from './GridView';
import styles from './GridViewer.module.css';

interface GridViewerProps {
  pressList: PressInfo[];
  startIndex: number;
  subscribePressList: SubscribePressList;
}

export default class GridViewer {
  public readonly element = createElement('DIV', { class: styles.gridViewer });
  private gridView = new GridView();
  private leftButton = new ViewerButton({ viewerType: 'grid', position: 'left' });
  private rightButton = new ViewerButton({ viewerType: 'grid', position: 'right' });

  constructor() {
    this.element.append(this.leftButton.element, this.gridView.element, this.rightButton.element);
  }

  public render({ pressList, startIndex, subscribePressList }: GridViewerProps) {
    this.gridView.render({ pressList, startIndex, subscribePressList });
    this.leftButton.render({ startIndex: startIndex });
    this.rightButton.render({ startIndex: startIndex });
  }
}
