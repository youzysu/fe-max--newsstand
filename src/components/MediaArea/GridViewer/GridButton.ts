import { dispatch } from '@store/index';
import { createElement } from '@utils/index';
import styles from './GridViewer.module.css';

interface GridButtonProps {
  startIndex: number;
  type: 'left' | 'right';
}

export default class GridButton {
  private element;

  constructor(private props: GridButtonProps) {
    this.element = createElement('BUTTON', { class: styles.gridButton });
    this.setProps();
    this.setEvent();
  }

  private setEvent() {
    this.element.addEventListener('click', () =>
      dispatch({ type: 'MOVE_GRID', payload: { type: this.props.type } })
    );
  }

  public updateProps(newState: GridButtonProps) {
    this.props.startIndex = newState.startIndex;
    this.setProps();
  }

  private setProps() {
    const { startIndex, type } = this.props;
    const isLeft = type === 'left';
    const isRight = type === 'right';
    const isFirstPage = startIndex === 0;
    const isLastPage = startIndex === 72;

    if (isLeft) {
      this.element.classList.add(styles.left);
    } else {
      this.element.classList.add(styles.right);
    }

    if ((isLeft && isFirstPage) || (isRight && isLastPage)) {
      this.element.classList.add(styles.disabled);
    } else {
      this.element.classList.remove(styles.disabled);
    }
  }

  public getElement() {
    return this.element;
  }
}
