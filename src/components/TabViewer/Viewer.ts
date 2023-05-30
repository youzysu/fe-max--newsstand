import { createElement } from '@utils/index';
import styles from './TabViewer.module.css';

interface ViewerProps {
  ViewerOption: 'grid' | 'list';
}

export default class Viewer {
  private element;
  private gridViewerButton;
  private listViewerButton;

  constructor(private props: ViewerProps) {
    this.props = props;
    this.element = createElement('DIV', { class: styles.viewer });
    this.listViewerButton = createElement('BUTTON', { class: styles.listViewerButton });
    this.gridViewerButton = createElement('BUTTON', { class: styles.gridViewerButton });
    this.render();
  }

  public updateProps(newState: ViewerProps) {
    const { ViewerOption } = newState;
    if (ViewerOption === this.props.ViewerOption) {
      return;
    }
    this.props = newState;
    this.setProps();
  }

  private setProps() {
    const { ViewerOption } = this.props;
    this.setViewerButton(ViewerOption);
  }

  private setViewerButton(ViewerOption: ViewerProps['ViewerOption']) {
    switch (ViewerOption) {
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

  private render() {
    this.setProps();
    this.element.append(this.listViewerButton, this.gridViewerButton);
  }

  public getElement() {
    return this.element;
  }
}
