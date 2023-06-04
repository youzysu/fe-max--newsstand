import { dispatch } from '@store/index';
import { createElement } from '@utils/index';
import styles from './GridViewer.module.css';

interface GridButtonProps {
  startIndex: number;
}

export default class GridButton {
  private element;
  private type: 'left' | 'right';

  constructor({ type: type }: { type: 'left' | 'right' }) {
    this.type = type;
    const isLeftType = this.type === 'left';
    const styleType = isLeftType ? styles.left : styles.right;
    this.element = createElement('BUTTON', { class: `${styles.gridButton} ${styleType}` });
    this.setEvent();
  }

  private setEvent() {
    this.element.addEventListener('click', () => dispatch({ type: 'MOVE_GRID', payload: { type: this.type } }));
  }

  public render({ startIndex }: GridButtonProps) {
    const isFirstPage = startIndex === 0;
    const isLastPage = startIndex === 72;
    const isLeft = this.type === 'left';
    const isRight = this.type === 'right';

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
