import { createElement } from '@utils/index';
import Tab from './Tab';
import styles from './TabViewer.module.css';
import Viewer from './Viewer';

interface TabViewerProps {
  tabOption: 'all' | 'subscribe';
  viewerOption: 'grid' | 'list';
}

export default class TabViewer {
  private element;
  private tab;
  private viewer;

  constructor(private props: TabViewerProps) {
    this.props = props;
    this.element = createElement('DIV', { class: styles.tabViewer });
    this.tab = new Tab({ tabOption: this.props.tabOption });
    this.viewer = new Viewer({ ViewerOption: this.props.viewerOption });
    this.render();
  }

  private render() {
    this.element.append(this.tab.getElement(), this.viewer.getElement());
  }

  public getElement() {
    return this.element;
  }
}
