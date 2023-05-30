import { createElement } from '@utils/index';
import { PressProps } from 'types';
import styles from './GridViewer.module.css';

interface GridViewerProps {
  pressList: PressProps[];
  startIndex: number;
}

export default class GridViewer {
  private element;
  private gridTable;
  private gridRows;
  private grids;
  private gridIcons;

  constructor(private props: GridViewerProps) {
    this.props = props;
    this.element = createElement('DIV', { class: styles.gridViewer });
    this.gridTable = createElement('TABLE', { class: styles.gridTable });
    this.gridRows = Array.from({ length: 4 }, () => createElement('TR', { class: styles.gridRow }));
    this.grids = Array.from({ length: 24 }, () => createElement('TD', { class: styles.grid }));
    this.gridIcons = Array.from({ length: 24 }, () =>
      createElement('IMG', { class: styles.pressIcon })
    );
    this.render();
  }

  private render() {
    this.setProps();

    const { element, gridTable, gridRows, grids, gridIcons } = this;
    gridTable.append(...gridRows);
    gridRows.forEach((gridRow, index) => {
      gridRow.append(...grids.slice(index * 6, index * 6 + 6));
    });
    grids.forEach((grid, index) => {
      grid.append(gridIcons[index]);
    });
    element.append(gridTable);
  }

  private setProps() {
    const { pressList, startIndex } = this.props;
    const { grids, gridIcons } = this;
    const endIndex = startIndex + 24;
    const gridPressList = pressList.slice(startIndex, endIndex);

    gridPressList.forEach((press, index) => {
      const gridIcon = gridIcons[index];
      const grid = grids[index];
      gridIcon.setAttribute('src', press.src);
      gridIcon.setAttribute('alt', press.alt);
      grid.dataset.pressId = index.toString();
      grid.dataset.pressName = press.alt;
    });
  }

  public updateProps(newState: GridViewerProps) {
    this.props = newState;
    this.setProps();
  }

  public getElement() {
    return this.element;
  }
}
