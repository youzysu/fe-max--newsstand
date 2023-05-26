import { createElement } from '../../utils/createElement';
import Tab from './Tab';
import styles from './TabViewer.module.css';
import Viewer from './Viewer';

interface TabViewerProps {
  TabOption: 'all' | 'subscribe';
  ViewerOption: 'grid' | 'list';
}

export default class TabViewer {
  element;
  tab;
  viewer;

  constructor(private props: TabViewerProps) {
    this.props = props;
    this.element = createElement('DIV', { class: styles.tabViewer });
    this.tab = new Tab({ TabOption: this.props.TabOption });
    this.viewer = new Viewer({ ViewerOption: this.props.ViewerOption });
    this.render();
  }

  render() {
    this.element.append(this.tab.element, this.viewer.element);
  }
}
