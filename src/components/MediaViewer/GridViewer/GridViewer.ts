import { createElement } from '@utils/index';
import { PressInfo, SubscribePressList } from 'types';
import GridView from './GridView';
import styles from './GridViewer.module.css';
import GridViewerButton from './GridViewerButton';

interface GridViewerProps {
  pressList: PressInfo[];
  startIndex: number;
  subscribePressList: SubscribePressList;
}

export default class GridViewer {
  private element = createElement('DIV', { class: styles.gridViewer });
  private gridView = new GridView();
  private gridLeftButton = new GridViewerButton({ type: 'left' });
  private gridRightButton = new GridViewerButton({ type: 'right' });

  constructor() {
    this.element.append(
      this.gridLeftButton.getElement(),
      this.gridView.getElement(),
      this.gridRightButton.getElement()
    );
  }

  public render({ pressList, startIndex, subscribePressList }: GridViewerProps) {
    this.gridView.render({ pressList, startIndex, subscribePressList });
    this.gridLeftButton.render({ startIndex: startIndex });
    this.gridRightButton.render({ startIndex: startIndex });
  }

  public getElement() {
    return this.element;
  }
}
