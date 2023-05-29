import { createElement } from '../../utils';
import Tab from './Tab';
import styles from './TabViewer.module.css';
import Viewer from './Viewer';

interface TabViewerProps {
  TabOption: 'all' | 'subscribe';
  ViewerOption: 'grid' | 'list';
}

export default class TabViewer {
  private element;
  private tab;
  private viewer;

  constructor(private props: TabViewerProps) {
    this.props = props;
    this.element = createElement('DIV', { class: styles.tabViewer });
    this.tab = new Tab({ TabOption: this.props.TabOption });
    this.viewer = new Viewer({ ViewerOption: this.props.ViewerOption });
    this.render();
  }

  private render() {
    this.element.append(this.tab.getElement(), this.viewer.getElement());
  }

  public getElement() {
    return this.element;
  }
}
