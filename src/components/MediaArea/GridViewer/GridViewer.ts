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

  constructor(private props: GridViewerProps) {
    this.props = props;
    this.element = createElement('TABLE', { class: styles.gridTable });
    this.gridRows = Array.from({ length: 4 }, () => createElement('TR', { class: styles.gridRow }));
    this.grids = Array.from({ length: 24 }, () => createElement('TD', { class: styles.grid }));
    this.gridIcons = Array.from({ length: 24 }, () =>
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
    const endIndex = startIndex + 24;
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
    const { element, gridRows, grids, gridIcons } = this;

    grids.forEach((grid, index) => {
      grid.append(gridIcons[index]);
    });
    gridRows.forEach((gridRow, index) => {
      gridRow.append(...grids.slice(index * 6, index * 6 + 6));
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
