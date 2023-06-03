import { createElement } from '@utils/index';
import styles from './TabViewer.module.css';

interface ViewerProps {
  viewerOption: 'grid' | 'list';
}

export default class Viewer {
  private element;
  private gridViewerButton;
  private listViewerButton;

  constructor() {
    this.element = createElement('DIV', { class: styles.viewer });
    this.listViewerButton = createElement('BUTTON', { class: styles.listViewerButton });
    this.gridViewerButton = createElement('BUTTON', { class: styles.gridViewerButton });
    this.element.append(this.listViewerButton, this.gridViewerButton);
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

  public getElement() {
    return this.element;
  }
}
