import { fetchPressList } from '@api/index';
import { PRESS_COUNT_OF_GRID_TABLE } from '@constant/index';
import { thunkDispatch } from '@store/index';
import { createElement } from '@utils/index';
import { PressInfo } from 'types';
import { SubscribePressList } from '../../../types/index';
import Grid from './Grid';
import styles from './GridViewer.module.css';

interface GridViewerProps {
  pressList: PressInfo[];
  startIndex: number;
  subscribePressList: SubscribePressList;
}

interface GridViewerState {
  startIndex: number | null;
  subscribePressList: SubscribePressList;
}

export default class GridView {
  private GRID_ROW_COUNT = 4;
  private PRESS_COUNT_PER_ROW = PRESS_COUNT_OF_GRID_TABLE / this.GRID_ROW_COUNT;
  public readonly element = createElement('TABLE', { class: styles.gridTable });
  private gridRows = Array.from({ length: this.GRID_ROW_COUNT }, () => createElement('TR', { class: styles.gridRow }));
  private grids = Array.from({ length: PRESS_COUNT_OF_GRID_TABLE }, () => new Grid());
  private state: GridViewerState = { startIndex: null, subscribePressList: {} };

  constructor() {
    this.element.append(...this.gridRows);
    this.componentDidMount();
  }

  componentDidMount() {
    thunkDispatch(fetchPressList());
  }

  public render({ pressList, startIndex, subscribePressList }: GridViewerProps) {
    const endIndex = startIndex + PRESS_COUNT_OF_GRID_TABLE;
    const currentPressList = pressList.slice(startIndex, endIndex);

    if (this.state.startIndex !== startIndex) {
      this.renderGrids(currentPressList, subscribePressList);
      this.dropPrevGrids();
      this.renderGridRows();
      this.state.startIndex = startIndex;
    }

    if (this.state.subscribePressList !== subscribePressList) {
      this.renderGrids(currentPressList, subscribePressList);
      this.state.subscribePressList = subscribePressList;
    }
  }

  private renderGridRows() {
    const currentGridElements = this.grids.map((grid) => grid.element);

    this.gridRows.forEach((gridRow, index) => {
      const curRowStartIndex = index * this.PRESS_COUNT_PER_ROW;
      const curRowEndIndex = index * this.PRESS_COUNT_PER_ROW + this.PRESS_COUNT_PER_ROW;
      gridRow.append(...currentGridElements.slice(curRowStartIndex, curRowEndIndex));
    });
  }

  private renderGrids(currentPressList: PressInfo[], subscribePressList: SubscribePressList) {
    this.grids.forEach((grid, index) => {
      const currentPress = currentPressList[index];
      grid.render({ press: currentPress, isSubscribed: subscribePressList[currentPress.name] });
    });
  }

  private dropPrevGrids() {
    this.gridRows.forEach((gridRow) => (gridRow.innerHTML = ''));
  }
}
