import { createElement } from '../../utils/createElement';
import styles from './TabViewer.module.css';

interface ViewerProps {
  ViewerOption: 'grid' | 'list';
}

export default class Viewer {
  element;
  gridViewerButton;
  listViewerButton;

  constructor(private props: ViewerProps) {
    this.props = props;
    this.element = createElement('DIV', { class: styles.viewer });
    this.listViewerButton = createElement('BUTTON', { class: styles.listViewerButton });
    this.gridViewerButton = createElement('BUTTON', { class: styles.gridViewerButton });
    this.render();
  }

  updateState(newState: ViewerProps) {
    const { ViewerOption } = newState;
    if (ViewerOption === this.props.ViewerOption) {
      return;
    }
    this.props = newState;
    this.setState();
  }

  setState() {
    const { ViewerOption } = this.props;
    this.setViewerButton(ViewerOption);
  }

  setViewerButton(ViewerOption: ViewerProps['ViewerOption']) {
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

  render() {
    this.setState();
    this.element.append(this.listViewerButton, this.gridViewerButton);
  }
}
