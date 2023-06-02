import { PRESS_COUNT_OF_GRID_TABLE } from '@constant/index';
import { createElement } from '@utils/index';
import { PressInfo } from 'types';
import { SubscribePressList } from './../../../types/index';
import Grid from './Grid';
import styles from './GridViewer.module.css';

interface GridViewerProps {
  pressList: PressInfo[];
  startIndex: number;
  subscribePressList: SubscribePressList;
}

export default class GridViewer {
  private element;
  private gridRows;
  private grids;
  private GRID_ROW_COUNT = 4;

  constructor(private props: GridViewerProps) {
    this.props = props;
    this.element = createElement('TABLE', { class: styles.gridTable });
    this.gridRows = Array.from({ length: this.GRID_ROW_COUNT }, () => createElement('TR', { class: styles.gridRow }));
    this.grids = this.props.pressList.map(
      (press: PressInfo) => new Grid({ press, isSubscribed: this.props.subscribePressList[press.name] })
    );
    this.render();
    this.setEvent();
  }

  private render() {
    this.appendGrids();
    this.element.append(...this.gridRows);
  }

  private appendGrids() {
    const { startIndex } = this.props;
    const endIndex = startIndex + PRESS_COUNT_OF_GRID_TABLE;
    const currentGridElements = this.grids.slice(startIndex, endIndex).map((grid) => grid.getElement());
    const PRESS_COUNT_PER_ROW = PRESS_COUNT_OF_GRID_TABLE / this.GRID_ROW_COUNT;

    this.gridRows.forEach((gridRow, index) => {
      const curRowStartIndex = index * PRESS_COUNT_PER_ROW;
      const curRowEndIndex = index * PRESS_COUNT_PER_ROW + PRESS_COUNT_PER_ROW;
      gridRow.append(...currentGridElements.slice(curRowStartIndex, curRowEndIndex));
    });
  }

  private setEvent() {
    const gridSelector = `.${styles.grid}`;
    this.addEvent('mouseover', gridSelector, (eventTarget) => this.showSubscribeButton(eventTarget));
    this.addEvent('mouseout', gridSelector, (eventTarget) => this.showSubscribeButton(eventTarget));
  }

  private showSubscribeButton(eventTarget: Element) {
    eventTarget.classList.toggle(styles.active);
  }

  private addEvent(eventType: keyof HTMLElementEventMap, selector: string, handlerCallback: (e: Element) => void) {
    this.element.addEventListener(eventType, (e) => {
      const target = e.target;
      if (!(target instanceof HTMLElement)) return;

      const closestElement = target.closest(selector);
      if (!closestElement) return;
      handlerCallback(closestElement);
    });
  }

  public updateProps(newState: GridViewerProps) {
    const { startIndex, subscribePressList } = newState;

    if (this.props.startIndex !== startIndex) {
      this.gridRows.forEach((gridRow) => (gridRow.innerHTML = ''));
      this.props = newState;
      this.appendGrids();
    }

    if (this.props.subscribePressList !== subscribePressList) {
      this.props = newState;

      this.grids.forEach((grid, idx) => {
        const press = this.props.pressList[idx];
        grid.updateProps({ press: press, isSubscribed: subscribePressList[press.name] });
      });
    }
  }

  public getElement() {
    return this.element;
  }
}
