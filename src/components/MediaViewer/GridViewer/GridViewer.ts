import { fetchGridPressList } from '@api/index';
import { PRESS_COUNT_OF_GRID_TABLE } from '@constant/index';
import { dispatch } from '@store/index';
import { createElement } from '@utils/index';
import { PressArticleInfo, PressInfo, TabOption } from 'types';
import { SubscribePressList } from '../../../types/index';
import Grid from './Grid';
import styles from './GridViewer.module.css';

interface GridViewerProps {
  tabOption: TabOption;
  pressList: PressInfo[];
  startIndex: number;
  pressArticleMap: Map<string, PressArticleInfo>;
  subscribePressList: SubscribePressList;
}

export default class GridViewer {
  private GRID_ROW_COUNT = 4;
  private PRESS_COUNT_PER_ROW = PRESS_COUNT_OF_GRID_TABLE / this.GRID_ROW_COUNT;
  public readonly element = createElement('table', { class: styles.gridTable });
  private gridRows = Array.from({ length: this.GRID_ROW_COUNT }, () => createElement('tr', { class: styles.gridRow }));
  private grids = Array.from({ length: PRESS_COUNT_OF_GRID_TABLE }, () => new Grid());

  constructor() {
    this.element.append(...this.gridRows);
    this.componentDidMount();
  }

  componentDidMount() {
    dispatch(fetchGridPressList());
  }

  public render(gridViewerProps: GridViewerProps) {
    const { tabOption } = gridViewerProps;

    switch (tabOption) {
      case 'all': {
        this.renderAllPressGrids(gridViewerProps);
        break;
      }
      case 'subscribe': {
        this.renderSubscribedPress(gridViewerProps);
        break;
      }
    }
  }

  renderSubscribedPress(gridViewerProps: GridViewerProps) {
    const { tabOption, pressArticleMap, subscribePressList } = gridViewerProps;
    const currentPressList = subscribePressList.map((pressName) => pressArticleMap.get(pressName)?.pressInfo!);

    this.renderSubscribeGrids(tabOption, currentPressList, subscribePressList);
    this.renderGridRows();
  }

  renderAllPressGrids({ tabOption, pressList, startIndex, subscribePressList }: GridViewerProps) {
    const endIndex = startIndex + PRESS_COUNT_OF_GRID_TABLE;
    const currentPressList = pressList.slice(startIndex, endIndex);

    this.renderAllGrids(tabOption, currentPressList, subscribePressList);
    this.renderGridRows();
  }

  private renderAllGrids(tabOption: TabOption, currentPressList: PressInfo[], subscribePressList: SubscribePressList) {
    this.grids.forEach((grid, index) => {
      const currentPress = currentPressList[index];
      grid.render({ tabOption, press: currentPress, isSubscribed: subscribePressList.includes(currentPress.name) });
    });
  }

  private renderSubscribeGrids(
    tabOption: TabOption,
    currentPressList: PressInfo[],
    subscribePressList: SubscribePressList
  ) {
    this.grids.forEach((grid) => grid.dropPrevProps());

    currentPressList.forEach((press, index) => {
      const currentGrid = this.grids[index];
      currentGrid.render({ tabOption, press, isSubscribed: subscribePressList.includes(press.name) });
    });
  }

  private renderGridRows() {
    const currentGridElements = this.grids.map((grid) => grid.element);

    this.gridRows.forEach((gridRow, index) => {
      const curRowStartIndex = index * this.PRESS_COUNT_PER_ROW;
      const curRowEndIndex = index * this.PRESS_COUNT_PER_ROW + this.PRESS_COUNT_PER_ROW;
      gridRow.append(...currentGridElements.slice(curRowStartIndex, curRowEndIndex));
    });
  }
}
