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
  private element;
  private tab;
  private viewer;

  constructor() {
    this.element = createElement('DIV', { class: styles.tabViewer });
    this.tab = new Tab();
    this.viewer = new Viewer();
    this.element.append(this.tab.getElement(), this.viewer.getElement());
  }

  public render({ tabOption, viewerOption }: TabViewerProps) {
    this.tab.render({ tabOption });
    this.viewer.render({ viewerOption });
  }

  public getElement() {
    return this.element;
  }
}
