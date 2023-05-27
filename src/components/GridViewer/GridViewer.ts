import { PressProps } from '../../types';
import { createElement } from '../../utils/createElement';
import styles from './GridViewer.module.css';

interface GridViewerProps {
  pressList: PressProps[];
  startIndex: number;
}

export default class GridViewer {
  element;
  gridRows;
  grids;

  constructor(private props: GridViewerProps) {
    this.props = props;
    this.element = createElement('TABLE', { class: styles.gridViewer });
    this.gridRows = Array.from({ length: 4 }, () => createElement('TR', { class: styles.gridRow }));
    this.grids = Array.from({ length: 24 }, () => createElement('TD', { class: styles.grid }));
    this.render();
  }

  render() {
    this.setState();
    this.element.append(...this.gridRows);
  }

  setState() {
    const { pressList, startIndex } = this.props;
    const { gridRows, grids } = this;
    const endIndex = startIndex + 24;
    const gridPressList = pressList.slice(startIndex, endIndex);

    grids.forEach((grid, index) => {
      const press = gridPressList[index];
      grid.append(
        createElement('IMG', { class: styles.pressIcon, src: press.src, alt: press.alt })
      );
    });
    gridRows.forEach((gridRow, index) => {
      gridRow.append(...grids.slice(index * 6, index * 6 + 6));
    });
  }

  updateState(newState: GridViewerProps) {
    this.props = newState;
    this.setState();
  }
}
