import { PRESS_COUNT_OF_GRID_TABLE } from '@constant/index';
import { createElement } from '@utils/index';
import { PressProps } from 'types';
import styles from './GridViewer.module.css';

interface GridViewerProps {
  pressList: PressProps[];
  startIndex: number;
}

export default class GridViewer {
  private element;
  private gridRows;
  private grids;
  private gridIcons;
  private GRID_ROW_COUNT = 4;

  constructor(private props: GridViewerProps) {
    this.props = props;
    this.element = createElement('TABLE', { class: styles.gridTable });
    this.gridRows = Array.from({ length: this.GRID_ROW_COUNT }, () =>
      createElement('TR', { class: styles.gridRow })
    );
    this.grids = Array.from({ length: PRESS_COUNT_OF_GRID_TABLE }, () =>
      createElement('TD', { class: styles.grid })
    );
    this.gridIcons = Array.from({ length: PRESS_COUNT_OF_GRID_TABLE }, () =>
      createElement('IMG', { class: styles.pressIcon })
    );
    this.render();
  }

  private render() {
    this.setProps();
    this.appendChildren();
  }

  private setProps() {
    const { pressList, startIndex } = this.props;
    const { grids, gridIcons } = this;
    const endIndex = startIndex + PRESS_COUNT_OF_GRID_TABLE;
    const currentPressList = pressList.slice(startIndex, endIndex);

    currentPressList.forEach((press, index) => {
      const gridIcon = gridIcons[index];
      const grid = grids[index];
      gridIcon.setAttribute('src', press.src);
      gridIcon.setAttribute('alt', press.alt);
      grid.dataset.pressId = index.toString();
      grid.dataset.pressName = press.alt;
    });
  }

  private appendChildren() {
    const { element, gridRows, grids, gridIcons, GRID_ROW_COUNT } = this;
    const PRESS_COUNT_PER_ROW = PRESS_COUNT_OF_GRID_TABLE / GRID_ROW_COUNT;

    grids.forEach((grid, index) => {
      grid.append(gridIcons[index]);
    });

    gridRows.forEach((gridRow, index) => {
      const curRowStartIndex = index * PRESS_COUNT_PER_ROW;
      const curRowEndIndex = index * PRESS_COUNT_PER_ROW + PRESS_COUNT_PER_ROW;
      gridRow.append(...grids.slice(curRowStartIndex, curRowEndIndex));
    });

    element.append(...gridRows);
  }

  public updateProps(newState: GridViewerProps) {
    const { gridIcons } = this;
    gridIcons.forEach((gridIcon) => {
      gridIcon.setAttribute('src', '');
      gridIcon.setAttribute('alt', '');
    });

    this.props = newState;
    this.setProps();
  }

  public getElement() {
    return this.element;
  }
}
