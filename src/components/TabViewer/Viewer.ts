import { dispatch } from '@store/index';
import { createElement } from '@utils/index';
import { ViewerOption } from 'types';
import styles from './TabViewer.module.css';

interface ViewerProps {
  viewerOption: ViewerOption;
}

export default class Viewer {
  public readonly element;
  public readonly gridViewerButton;
  public readonly listViewerButton;

  constructor() {
    this.element = createElement('div', { class: styles.viewer });
    this.listViewerButton = createElement('button', { class: styles.listViewerButton });
    this.gridViewerButton = createElement('button', { class: styles.gridViewerButton });
    this.element.append(this.listViewerButton, this.gridViewerButton);
    this.setEvent();
  }

  private setEvent() {
    this.listViewerButton.addEventListener('click', () =>
      dispatch({ type: 'CHANGE_VIEWER', payload: { viewerOption: 'list' } })
    );
    this.gridViewerButton.addEventListener('click', () =>
      dispatch({ type: 'CHANGE_VIEWER', payload: { viewerOption: 'grid' } })
    );
  }

  public render({ viewerOption }: ViewerProps) {
    switch (viewerOption) {
      case 'grid':
        this.gridViewerButton.classList.add(styles.active);
        this.listViewerButton.classList.remove(styles.active);
        break;
      case 'list':
        this.gridViewerButton.classList.remove(styles.active);
        this.listViewerButton.classList.add(styles.active);
        break;
    }
  }
}
