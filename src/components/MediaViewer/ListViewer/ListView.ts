import { createElement } from '@utils/index';
import { ListViewerProps } from 'types';
import FieldTab from './FieldTab';
import styles from './ListViewer.module.css';
import PressNews from './PressNews';

export default class ListView {
  private element = createElement('DIV', { class: styles.listView });
  private fieldTab = new FieldTab();
  private pressNews = new PressNews();

  constructor() {
    this.element.append(this.fieldTab.getElement(), this.pressNews.getElement());
  }

  public render({ categoryPressList }: ListViewerProps) {
    this.fieldTab.render({ categoryPressList });
  }

  public getElement() {
    return this.element;
  }
}
