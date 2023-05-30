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

  constructor(private props: GridViewerProps) {
    this.props = props;
    this.element = createElement('TABLE', { class: styles.gridViewer });
    this.gridRows = Array.from({ length: 4 }, () => createElement('TR', { class: styles.gridRow }));
    this.grids = Array.from({ length: 24 }, () => createElement('TD', { class: styles.grid }));
    this.render();
  }

  private render() {
    this.setProps();
    this.element.append(...this.gridRows);
  }

  private setProps() {
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

  public updateProps(newState: GridViewerProps) {
    this.props = newState;
    this.setProps();
  }

  public getElement() {
    return this.element;
  }
}
