import { fetchPressList } from '@api/index';
import { PRESS_COUNT_OF_GRID_TABLE } from '@constant/index';
import { dispatch, thunkDispatch } from '@store/index';
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

interface GridViewerState {
  startIndex: number | null;
  subscribePressList: SubscribePressList;
}

export default class GridViewer {
  private element;
  private gridRows;
  private grids;
  private state: GridViewerState;
  private GRID_ROW_COUNT = 4;
  private PRESS_COUNT_PER_ROW = PRESS_COUNT_OF_GRID_TABLE / this.GRID_ROW_COUNT;

  constructor() {
    this.element = createElement('TABLE', { class: styles.gridTable });
    this.gridRows = Array.from({ length: this.GRID_ROW_COUNT }, () => createElement('TR', { class: styles.gridRow }));
    this.grids = Array.from({ length: PRESS_COUNT_OF_GRID_TABLE }, () => new Grid());
    this.state = { startIndex: null, subscribePressList: {} };
    this.element.append(...this.gridRows);
    this.componentDidMount();
  }

  componentDidMount() {
    thunkDispatch(fetchPressList());
    dispatch({
      type: 'GET_SUBSCRIBE_PRESS_LIST',
      payload: { subscribePressList: JSON.parse(localStorage.getItem('subscribePressList') || '{}') },
    });
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
    const currentGridElements = this.grids.map((grid) => grid.getElement());

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

  public getElement() {
    return this.element;
  }
}
