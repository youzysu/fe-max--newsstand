import { createElement } from '@utils/index';
import { TabOption, ViewerOption } from 'types';
import Tab from './Tab';
import styles from './TabViewer.module.css';
import Viewer from './Viewer';

interface TabViewerProps {
  tabOption: TabOption;
  viewerOption: ViewerOption;
}

export default class TabViewer {
  public readonly element = createElement('DIV', { class: styles.tabViewer });
  public readonly tab = new Tab();
  public readonly viewer = new Viewer();

  constructor() {
    this.element.append(this.tab.element, this.viewer.element);
  }

  public render({ tabOption, viewerOption }: TabViewerProps) {
    this.tab.render({ tabOption });
    this.viewer.render({ viewerOption });
  }
}
